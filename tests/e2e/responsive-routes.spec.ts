import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const customerRoutePaths = [
  "/about",
  "/chefs",
  "/favorites",
  "/gifts",
  "/home",
  "/locations",
  "/loyalty",
  "/menu",
  "/notifications",
  "/offers",
  "/omakase",
  "/orders",
  "/profile",
  "/recently-viewed",
  "/reservations",
  "/support",
] as const;

const routePaths = ["/", ...customerRoutePaths, "/admin"] as const;
const minimumScrollableOverflow = 24;
const wideMobileFrameRoutePaths = [
  "/chefs",
  "/home",
  "/loyalty",
  "/menu",
  "/orders",
  "/profile",
] as const;
const wideMobileFrameWidths = [
  { expectedMin: 428, width: 480 },
  { expectedMin: 500, width: 560 },
  { expectedMin: 580, width: 640 },
  { expectedMin: 630, width: 720 },
  { expectedMin: 630, width: 767 },
] as const;

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

async function getVisibleMobileFrameMetrics(page: Page) {
  return page.evaluate(() => {
    const isVisible = (element: Element) => {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();

      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        rect.width > 1 &&
        rect.height > 1
      );
    };
    const frame = Array.from(document.querySelectorAll(".mobile-frame")).find(
      isVisible,
    );

    if (!frame) {
      return null;
    }

    const rect = frame.getBoundingClientRect();

    return {
      left: Math.round(rect.left),
      width: Math.round(rect.width),
    };
  });
}

async function expectGlobalScrollPolicy(page: Page, routePath: string) {
  const policy = await page.evaluate(() => {
    const html = getComputedStyle(document.documentElement);
    const body = getComputedStyle(document.body);

    return {
      bodyOverscrollBehaviorY: body.overscrollBehaviorY,
      bodyScrollbarWidth: body.scrollbarWidth,
      htmlScrollBehavior: html.scrollBehavior,
      htmlOverscrollBehaviorY: html.overscrollBehaviorY,
      htmlScrollbarWidth: html.scrollbarWidth,
    };
  });

  expect(
    policy.htmlScrollBehavior,
    `${routePath} should keep smooth page scrolling`,
  ).toBe("smooth");
  expect(
    [policy.htmlScrollbarWidth, policy.bodyScrollbarWidth],
    `${routePath} should hide visible page scrollbars`,
  ).toContain("none");
  expect(
    [policy.htmlOverscrollBehaviorY, policy.bodyOverscrollBehaviorY],
    `${routePath} should allow vertical scroll chaining on the page root`,
  ).not.toContain("none");
}

async function waitForStableDocumentHeight(page: Page) {
  let previousHeight = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  let stableSamples = 0;

  for (let index = 0; index < 10; index += 1) {
    await page.waitForTimeout(50);

    const currentHeight = await page.evaluate(
      () => document.documentElement.scrollHeight,
    );

    if (Math.abs(currentHeight - previousHeight) <= 1) {
      stableSamples += 1;
      if (stableSamples >= 3) {
        return;
      }
    } else {
      stableSamples = 0;
      previousHeight = currentHeight;
    }
  }
}

async function expectDocumentScrollsWhenOverflowing(
  page: Page,
  routePath: string,
) {
  await page.evaluate(() =>
    window.scrollTo({ behavior: "instant", left: 0, top: 0 }),
  );
  await waitForStableDocumentHeight(page);

  const initialMetrics = await page.evaluate(() => {
    const root = document.documentElement;

    return {
      bodyLocked:
        document.documentElement.classList.contains("scroll-locked") ||
        document.body.classList.contains("scroll-locked"),
      clientHeight: root.clientHeight,
      maxScrollY: root.scrollHeight - root.clientHeight,
      scrollHeight: root.scrollHeight,
    };
  });

  expect(
    initialMetrics.bodyLocked,
    `${routePath} should not leave the page body scroll-locked`,
  ).toBe(false);

  if (initialMetrics.maxScrollY <= minimumScrollableOverflow) {
    return;
  }

  const viewport = page.viewportSize();
  if (viewport) {
    await page.mouse.move(viewport.width / 2, viewport.height / 2);
  }

  await page.mouse.wheel(0, Math.min(640, initialMetrics.maxScrollY));
  await page.waitForTimeout(100);

  const postWheelMetrics = await page.evaluate(() => {
    const root = document.documentElement;

    return {
      maxScrollY: root.scrollHeight - root.clientHeight,
      scrollY: window.scrollY,
    };
  });

  if (postWheelMetrics.maxScrollY <= minimumScrollableOverflow) {
    return;
  }

  await expect
    .poll(() => page.evaluate(() => window.scrollY), {
      message: `${routePath} should respond to vertical page scrolling`,
    })
    .toBeGreaterThan(0);

  await page.evaluate(() =>
    window.scrollTo({
      left: 0,
      top: document.documentElement.scrollHeight,
    }),
  );

  await expect
    .poll(
      () =>
        page.evaluate(() => {
          const root = document.documentElement;

          return root.scrollHeight - root.clientHeight - window.scrollY;
        }),
      {
        message: `${routePath} should allow scrolling near the bottom of long pages`,
      },
    )
    .toBeLessThanOrEqual(4);
}

test.describe("responsive route health", () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
  });

  test("renders core routes without layout overflow or framework errors", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });
    page.on("pageerror", (error) => {
      consoleErrors.push(error.message);
    });

    for (const routePath of routePaths) {
      await test.step(`check ${routePath}`, async () => {
        const response = await page.goto(routePath, {
          waitUntil: "domcontentloaded",
        });

        expect(response?.status(), `${routePath} should load`).toBeLessThan(
          400,
        );
        await expectNoFrameworkErrorOverlay(page);
        await expect(page.locator("main, section").first()).toBeVisible();
        await expectNoHorizontalOverflow(page, routePath);
        await expectGlobalScrollPolicy(page, routePath);
        await expectDocumentScrollsWhenOverflowing(page, routePath);
      });
    }

    expect(consoleErrors, "routes should not log browser errors").toEqual([]);
  });

  test("bridges wide-mobile layouts before the tablet breakpoint", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name === "chromium-mobile",
      "Manual viewport resizing on the mobile device project reports scaled layout widths.",
    );

    for (const routePath of wideMobileFrameRoutePaths) {
      await test.step(`wide mobile frame ${routePath}`, async () => {
        for (const { expectedMin, width } of wideMobileFrameWidths) {
          await page.setViewportSize({ height: 900, width });
          await expect
            .poll(() => page.evaluate(() => window.innerWidth), {
              message: `${routePath} should resize to ${width}px`,
            })
            .toBe(width);
          await page.goto(routePath, { waitUntil: "networkidle" });

          await expect
            .poll(
              async () =>
                (await getVisibleMobileFrameMetrics(page))?.width ?? 0,
              {
                message: `${routePath} should expand the mobile frame at ${width}px`,
              },
            )
            .toBeGreaterThanOrEqual(expectedMin);

          const frame = await getVisibleMobileFrameMetrics(page);

          expect(
            frame?.width,
            `${routePath} should expand the mobile frame at ${width}px`,
          ).toBeGreaterThanOrEqual(expectedMin);
          expect(
            frame?.width,
            `${routePath} should keep a readable large-phone measure at ${width}px`,
          ).toBeLessThanOrEqual(640);
          await expectNoHorizontalOverflow(page, routePath);
        }

        await page.setViewportSize({ height: 1024, width: 768 });
        await page.goto(routePath, { waitUntil: "networkidle" });

        await expect
          .poll(() => getVisibleMobileFrameMetrics(page), {
            message: `${routePath} should hand off to the tablet shell at 768px`,
          })
          .toBeNull();
        await expectNoHorizontalOverflow(page, routePath);
      });
    }
  });
});
