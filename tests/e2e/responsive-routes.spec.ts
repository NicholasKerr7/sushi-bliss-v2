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
  "/reservations",
  "/support",
] as const;

const routePaths = ["/", ...customerRoutePaths, "/admin"] as const;

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
      bodyScrollbarWidth: body.scrollbarWidth,
      htmlScrollBehavior: html.scrollBehavior,
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
}

test.describe("responsive route health", () => {
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
        const response = await page.goto(routePath);

        expect(response?.status(), `${routePath} should load`).toBeLessThan(
          400,
        );
        await expectNoFrameworkErrorOverlay(page);
        await expect(page.locator("main, section").first()).toBeVisible();
        await expectNoHorizontalOverflow(page, routePath);
        await expectGlobalScrollPolicy(page, routePath);
      });
    }

    expect(consoleErrors, "routes should not log browser errors").toEqual([]);
  });
});
