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
      bodyLocked: document.body.classList.contains("overflow-hidden"),
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
});
