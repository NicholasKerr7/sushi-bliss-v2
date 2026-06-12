import { readFile } from "node:fs/promises";
import path from "node:path";

import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

interface VisualReferenceTarget {
  name: string;
  projectName: string;
  referencePath: string;
  referenceSize: {
    height: number;
    width: number;
  };
  routePath: string;
  viewport: {
    height: number;
    width: number;
  };
  verify: (page: Page) => Promise<void>;
}

const visualReferenceTargets: VisualReferenceTarget[] = [
  {
    name: "mobile welcome",
    projectName: "chromium-mobile",
    referencePath: "public/assets/screenshots/mobile/mobile-01.png",
    referenceSize: { height: 1822, width: 863 },
    routePath: "/",
    viewport: { height: 911, width: 430 },
    verify: async (page) => {
      await expect(page.locator("#welcome")).toBeVisible();
      await expect(
        page.getByRole("heading", { level: 1, name: "Sushi Bliss" }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet home dashboard",
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-01-home-dashboard.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/home",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      await expect(page.locator("#home-dashboard")).toBeVisible();
      await expect(
        page.getByRole("heading", { level: 1, name: "Sushi Bliss" }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet menu overview",
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-03-menu-overview.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/menu",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const menuSection = page.locator("#menu");

      await expect(menuSection).toBeVisible();
      await expect(
        menuSection.getByRole("navigation", {
          name: "Tablet menu categories",
        }),
      ).toBeVisible();
      await expect(
        menuSection.getByRole("heading", { name: "Otoro Nigiri" }).first(),
      ).toBeVisible();
    },
  },
  {
    name: "desktop home dashboard",
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-01-home-dashboard.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/home",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      await expect(page.locator("#home-dashboard")).toBeVisible();
      await expect(
        page.getByRole("heading", { level: 1, name: "Sushi Bliss" }),
      ).toBeVisible();
    },
  },
  {
    name: "desktop menu overview",
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-02-menu-overview.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/menu",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const menuSection = page.locator("#menu");

      await expect(menuSection).toBeVisible();
      await expect(
        menuSection.getByRole("heading", { name: "Explore the menu" }),
      ).toBeVisible();
    },
  },
];

async function expectNoFrameworkErrorOverlay(page: Page) {
  await expect(
    page.locator(
      "[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay",
    ),
  ).toHaveCount(0);
}

async function expectNoHorizontalOverflow(page: Page, routePath: string) {
  const overflow = await page.evaluate(() => ({
    body: document.body.scrollWidth - document.body.clientWidth,
    document:
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  }));

  expect(
    Math.max(overflow.body, overflow.document),
    `${routePath} should not create horizontal overflow`,
  ).toBeLessThanOrEqual(1);
}

function getPngSize(buffer: Buffer) {
  const signature = buffer.subarray(1, 4).toString("ascii");

  expect(signature, "visual audit artifacts must be PNG files").toBe("PNG");

  return {
    height: buffer.readUInt32BE(20),
    width: buffer.readUInt32BE(16),
  };
}

test.describe("visual reference audit", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
  });

  for (const target of visualReferenceTargets) {
    test(`captures ${target.name} against reference artifact`, async ({
      page,
    }, testInfo) => {
      test.skip(
        testInfo.project.name !== target.projectName,
        `${target.name} is audited by ${target.projectName}`,
      );

      await page.setViewportSize(target.viewport);
      await page.goto(target.routePath);
      await page.waitForLoadState("networkidle");
      await page.waitForFunction(() => document.fonts.status === "loaded");

      await expectNoFrameworkErrorOverlay(page);
      await target.verify(page);
      await expectNoHorizontalOverflow(page, target.routePath);

      const currentScreenshot = await page.screenshot({
        animations: "disabled",
        fullPage: false,
        scale: "css",
      });
      const referenceScreenshot = await readFile(
        path.join(process.cwd(), target.referencePath),
      );
      const currentSize = getPngSize(currentScreenshot);
      const referenceSize = getPngSize(referenceScreenshot);
      const metadata = {
        currentSize,
        referencePath: target.referencePath,
        referenceSize,
        routePath: target.routePath,
        viewport: target.viewport,
      };

      expect(currentSize).toEqual(target.viewport);
      expect(referenceSize).toEqual(target.referenceSize);

      await testInfo.attach(`${target.name} current`, {
        body: currentScreenshot,
        contentType: "image/png",
      });
      await testInfo.attach(`${target.name} reference`, {
        body: referenceScreenshot,
        contentType: "image/png",
      });
      await testInfo.attach(`${target.name} metadata`, {
        body: Buffer.from(JSON.stringify(metadata, null, 2)),
        contentType: "application/json",
      });
    });
  }
});
