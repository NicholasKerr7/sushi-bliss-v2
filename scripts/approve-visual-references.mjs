import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const diffDir = path.resolve(
  projectRoot,
  process.env.VISUAL_REFERENCE_DIFF_DIR ??
    path.join("test-results", "visual-reference-diffs"),
);
const shouldWrite = process.argv.includes("--yes");

function isInsideProject(filePath) {
  const relative = path.relative(projectRoot, filePath);

  return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
}

async function loadEntries() {
  const files = await readdir(diffDir);
  const metadataFiles = files.filter((file) => file.endsWith(".metadata.json"));

  return Promise.all(
    metadataFiles.map(async (metadataFile) => {
      const metadataPath = path.join(diffDir, metadataFile);
      const metadata = JSON.parse(await readFile(metadataPath, "utf8"));
      const stem = metadataFile.replace(/\.metadata\.json$/, "");
      const currentPath = path.join(diffDir, `${stem}.current.png`);
      const referencePath = path.resolve(projectRoot, metadata.referencePath);

      if (!isInsideProject(referencePath)) {
        throw new Error(
          `Refusing to write outside the project: ${referencePath}`,
        );
      }

      return {
        currentPath,
        diffRatio: metadata.diffRatio,
        name: metadata.targetName ?? stem,
        referencePath,
        referenceSize: metadata.referenceSize,
        routePath: metadata.routePath,
      };
    }),
  );
}

async function resizePng(page, imagePath, size) {
  const imageBase64 = (await readFile(imagePath)).toString("base64");

  const resizedBase64 = await page.evaluate(
    async ({ height, imageBase64, width }) => {
      const image = new Image();
      const imageLoaded = new Promise((resolve, reject) => {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", reject, { once: true });
      });

      image.src = `data:image/png;base64,${imageBase64}`;
      await imageLoaded;

      const canvas = document.createElement("canvas");
      canvas.height = height;
      canvas.width = width;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Unable to create a 2D canvas context.");
      }

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(image, 0, 0, width, height);

      return canvas
        .toDataURL("image/png")
        .replace(/^data:image\/png;base64,/, "");
    },
    {
      height: size.height,
      imageBase64,
      width: size.width,
    },
  );

  return Buffer.from(resizedBase64, "base64");
}

async function main() {
  const entries = await loadEntries();

  if (entries.length === 0) {
    throw new Error(
      `No visual diff metadata found in ${path.relative(projectRoot, diffDir)}.`,
    );
  }

  const sortedEntries = entries.sort((a, b) => b.diffRatio - a.diffRatio);

  console.log(
    `Found ${entries.length} visual reference artifact set${
      entries.length === 1 ? "" : "s"
    }.`,
  );
  console.log(
    `Largest drift: ${(sortedEntries[0].diffRatio * 100).toFixed(2)}% - ${
      sortedEntries[0].name
    } (${sortedEntries[0].routePath}).`,
  );

  if (!shouldWrite) {
    console.log(
      "Dry run only. Review test-results/visual-reference-diffs, then run npm run test:visual:approve to replace approved baselines.",
    );
    return;
  }

  const { chromium } = await import("@playwright/test");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    for (const entry of entries) {
      const resizedImage = await resizePng(
        page,
        entry.currentPath,
        entry.referenceSize,
      );

      await mkdir(path.dirname(entry.referencePath), { recursive: true });
      await writeFile(entry.referencePath, resizedImage);
    }
  } finally {
    await browser.close();
  }

  console.log(`Approved ${entries.length} visual reference baseline images.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
