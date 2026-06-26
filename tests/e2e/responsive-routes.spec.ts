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
const narrowMobileWidths = [320, 375, 430] as const;
const releaseViewportMatrix = [
  { height: 740, label: "mobile 320", width: 320 },
  { height: 812, label: "mobile 375", width: 375 },
  { height: 932, label: "mobile 425", width: 425 },
  { height: 1194, label: "tablet 834", width: 834 },
  { height: 900, label: "laptop 1280", width: 1280 },
  { height: 1000, label: "desktop 1440", width: 1440 },
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

async function expectPageHasVisibleSurface(page: Page, routePath: string) {
  await expect
    .poll(
      () =>
        page.evaluate(() => {
          const isVisible = (element: Element) => {
            const style = window.getComputedStyle(element);
            const rect = element.getBoundingClientRect();

            return (
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              style.opacity !== "0" &&
              rect.bottom > 0 &&
              rect.right > 0 &&
              rect.top < window.innerHeight &&
              rect.left < window.innerWidth &&
              rect.width > 1 &&
              rect.height > 1
            );
          };
          const surfaces = Array.from(
            document.querySelectorAll<HTMLElement>("main, section"),
          );

          return surfaces.some(
            (surface) =>
              isVisible(surface) ||
              Array.from(
                surface.querySelectorAll(
                  "article, form, h1, h2, h3, p, a, button, img",
                ),
              ).some(isVisible),
          );
        }),
      {
        message: `${routePath} should render a visible app content surface`,
        timeout: 10_000,
      },
    )
    .toBe(true);
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

  const scrollMetrics = await page.evaluate((minimumOverflow) => {
    const root = document.scrollingElement || document.documentElement;
    const bodyLocked =
      document.documentElement.classList.contains("scroll-locked") ||
      document.body.classList.contains("scroll-locked");
    const getDocumentMaxScroll = () => root.scrollHeight - root.clientHeight;
    const tryDocumentScroll = () => {
      const maxScrollY = getDocumentMaxScroll();

      window.scrollTo({ behavior: "instant", left: 0, top: 0 });

      if (maxScrollY <= minimumOverflow) {
        return undefined;
      }

      window.scrollBy({
        behavior: "instant",
        left: 0,
        top: Math.min(640, maxScrollY),
      });

      if (window.scrollY <= 0) {
        return undefined;
      }

      window.scrollTo({
        behavior: "instant",
        left: 0,
        top: root.scrollHeight,
      });

      return {
        canScroll: true,
        kind: "document",
        maxScrollY,
        remainingDistance:
          root.scrollHeight - root.clientHeight - window.scrollY,
      };
    };

    const isVisible = (element: HTMLElement) => {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();

      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        rect.bottom > 0 &&
        rect.right > 0 &&
        rect.top < window.innerHeight &&
        rect.left < window.innerWidth &&
        rect.width > 1 &&
        rect.height > 1
      );
    };
    const isScrollable = (element: HTMLElement) => {
      const style = window.getComputedStyle(element);
      const overflowY = style.overflowY;
      const maxScrollY = element.scrollHeight - element.clientHeight;

      return (
        maxScrollY > minimumOverflow &&
        ["auto", "scroll", "overlay"].includes(overflowY) &&
        !element.closest("nav")
      );
    };
    const tryElementScroll = () => {
      const candidates = Array.from(
        document.querySelectorAll<HTMLElement>("body, main, section, div"),
      )
        .filter((element) => isVisible(element) && isScrollable(element))
        .sort(
          (a, b) =>
            b.scrollHeight - b.clientHeight - (a.scrollHeight - a.clientHeight),
        );

      for (const element of candidates) {
        const maxScrollY = element.scrollHeight - element.clientHeight;

        element.scrollTop = 0;
        element.scrollTop = Math.min(640, maxScrollY);

        if (element.scrollTop <= 0) {
          continue;
        }

        element.scrollTop = maxScrollY;

        return {
          canScroll: true,
          kind:
            element === document.body
              ? "body"
              : element.className || element.tagName.toLowerCase(),
          maxScrollY,
          remainingDistance:
            element.scrollHeight - element.clientHeight - element.scrollTop,
        };
      }

      return undefined;
    };
    const documentResult = tryDocumentScroll();
    const elementResult = documentResult || tryElementScroll();
    const hasOverflow =
      getDocumentMaxScroll() > minimumOverflow || Boolean(elementResult);

    return {
      bodyLocked,
      canScroll: Boolean(elementResult?.canScroll),
      hasOverflow,
      kind: elementResult?.kind,
      maxScrollY: elementResult?.maxScrollY ?? getDocumentMaxScroll(),
      remainingDistance: elementResult?.remainingDistance ?? 0,
    };
  }, minimumScrollableOverflow);

  expect(
    scrollMetrics.bodyLocked,
    `${routePath} should not leave the page body scroll-locked`,
  ).toBe(false);

  if (!scrollMetrics.hasOverflow) {
    return;
  }

  expect(
    scrollMetrics.canScroll,
    `${routePath} should allow vertical scrolling on the document or primary app surface`,
  ).toBe(true);

  expect(
    scrollMetrics.remainingDistance,
    `${routePath} should allow scrolling near the bottom of long pages via ${scrollMetrics.kind}`,
  ).toBeLessThanOrEqual(4);
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
        await expectPageHasVisibleSurface(page, routePath);
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
          await page.goto(routePath, { waitUntil: "domcontentloaded" });
          await expectPageHasVisibleSurface(page, routePath);

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
        await page.goto(routePath, { waitUntil: "domcontentloaded" });
        await expectPageHasVisibleSurface(page, routePath);

        await expect
          .poll(() => getVisibleMobileFrameMetrics(page), {
            message: `${routePath} should hand off to the tablet shell at 768px`,
          })
          .toBeNull();
        await expectNoHorizontalOverflow(page, routePath);
      });
    }
  });

  test("keeps narrow mobile routes contained and scrollable", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name === "chromium-mobile",
      "Manual viewport resizing on the mobile device project reports scaled layout widths.",
    );

    for (const width of narrowMobileWidths) {
      await test.step(`narrow mobile ${width}px`, async () => {
        await page.setViewportSize({ height: 760, width });

        for (const routePath of customerRoutePaths) {
          await test.step(`check ${routePath}`, async () => {
            await expect
              .poll(() => page.evaluate(() => window.innerWidth), {
                message: `${routePath} should resize to ${width}px`,
              })
              .toBe(width);

            const response = await page.goto(routePath, {
              waitUntil: "domcontentloaded",
            });

            expect(response?.status(), `${routePath} should load`).toBeLessThan(
              400,
            );
            await expectNoFrameworkErrorOverlay(page);
            await expectPageHasVisibleSurface(page, routePath);
            await expectNoHorizontalOverflow(page, routePath);
            await expectGlobalScrollPolicy(page, routePath);
            await expectDocumentScrollsWhenOverflowing(page, routePath);

            const frame = await getVisibleMobileFrameMetrics(page);

            if (frame) {
              expect(
                frame.left,
                `${routePath} mobile frame should stay inside the ${width}px viewport`,
              ).toBeGreaterThanOrEqual(0);
              expect(
                frame.width,
                `${routePath} mobile frame should fit the ${width}px viewport`,
              ).toBeLessThanOrEqual(width);
              expect(
                frame.width,
                `${routePath} mobile frame should remain usable at ${width}px`,
              ).toBeGreaterThanOrEqual(Math.min(280, width));
            }
          });
        }
      });
    }
  });

  test("covers the release viewport matrix for every route", async ({
    page,
  }, testInfo) => {
    test.skip(
      !testInfo.project.name.includes("desktop"),
      "Run the exact release matrix once; project-level tablet/mobile route checks cover device emulation.",
    );
    testInfo.setTimeout(180_000);

    const consoleErrors: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });
    page.on("pageerror", (error) => {
      consoleErrors.push(error.message);
    });

    for (const viewport of releaseViewportMatrix) {
      await test.step(viewport.label, async () => {
        await page.setViewportSize({
          height: viewport.height,
          width: viewport.width,
        });

        await expect
          .poll(() => page.evaluate(() => window.innerWidth), {
            message: `${viewport.label} should apply the requested viewport width`,
          })
          .toBe(viewport.width);

        for (const routePath of routePaths) {
          await test.step(`${viewport.label} ${routePath}`, async () => {
            const response = await page.goto(routePath, {
              waitUntil: "domcontentloaded",
            });

            expect(
              response?.status(),
              `${routePath} should load at ${viewport.label}`,
            ).toBeLessThan(400);
            await expectNoFrameworkErrorOverlay(page);
            await expectPageHasVisibleSurface(page, routePath);
            await expectNoHorizontalOverflow(page, routePath);
            await expectGlobalScrollPolicy(page, routePath);
            await expectDocumentScrollsWhenOverflowing(page, routePath);
          });
        }
      });
    }

    expect(
      consoleErrors,
      "release matrix should not log browser errors",
    ).toEqual([]);
  });

  test("keeps external new-tab links isolated", async ({ page }) => {
    for (const routePath of routePaths) {
      await test.step(`external links ${routePath}`, async () => {
        await page.goto(routePath, { waitUntil: "domcontentloaded" });
        await expectNoFrameworkErrorOverlay(page);

        const unsafeLinks = await page
          .locator('a[target="_blank"]')
          .evaluateAll((links) =>
            links
              .map((link) => ({
                href: link.getAttribute("href"),
                rel: link.getAttribute("rel") || "",
                text: link.textContent?.trim().replace(/\s+/g, " ") || "",
              }))
              .filter(({ rel }) => {
                const tokens = rel.split(/\s+/);

                return (
                  !tokens.includes("noopener") || !tokens.includes("noreferrer")
                );
              }),
          );

        expect(
          unsafeLinks,
          `${routePath} should protect target=_blank links`,
        ).toEqual([]);
      });
    }
  });
});
