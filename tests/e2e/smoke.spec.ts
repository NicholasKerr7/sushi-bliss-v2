import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

async function expectNoFrameworkErrorOverlay(page: Page) {
  await expect(
    page.locator(
      "[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay",
    ),
  ).toHaveCount(0);
}

test.describe("customer experience", () => {
  test("renders customer entry and supports menu add-to-cart", async ({
    page,
  }) => {
    await page.goto("/");

    await expectNoFrameworkErrorOverlay(page);
    await expect(page).toHaveTitle(/Sushi Bliss/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Sushi Bliss" }),
    ).toBeVisible();

    await page.goto("/menu");
    await expectNoFrameworkErrorOverlay(page);

    const menuSection = page.locator("#menu");
    const projectName = test.info().project.name;
    const isMobileProject = projectName.includes("mobile");
    const isTabletProject = projectName.includes("tablet");

    if (isMobileProject) {
      await expect(
        menuSection.getByRole("heading", { name: "Otoro Nigiri" }).first(),
      ).toBeVisible();

      await menuSection
        .getByRole("textbox", { name: "Search menu" })
        .fill("Otoro Nigiri");
      await expect(
        menuSection.getByRole("heading", { name: "Search & Filter" }),
      ).toBeVisible();
      await expect(menuSection.getByText(/1 results found/i)).toBeVisible();

      await menuSection
        .getByRole("button", { name: /Otoro Nigiri/i })
        .first()
        .click();
    } else if (isTabletProject) {
      await expect(
        menuSection.getByRole("heading", { name: "Otoro Nigiri" }).first(),
      ).toBeVisible();
      await expect(
        menuSection.getByRole("navigation", {
          name: "Tablet menu categories",
        }),
      ).toBeVisible();

      await menuSection.locator("#tablet-menu-search").fill("Otoro Nigiri");
      await expect(
        menuSection.getByRole("heading", { name: "Search & Filter" }),
      ).toBeVisible();
      await expect(menuSection.getByText(/1 results found/i)).toBeVisible();

      await menuSection
        .getByRole("button", { name: /Otoro Nigiri Premium fatty/i })
        .click();
    } else {
      await expect(
        menuSection.getByRole("heading", {
          name: /Exceptional\s+Japanese Cuisine/i,
        }),
      ).toBeVisible();

      await menuSection
        .getByPlaceholder("Search menu items...")
        .fill("Otoro Nigiri");
      await expect(
        menuSection.getByRole("heading", { name: "Otoro Nigiri" }).first(),
      ).toBeVisible();
      await expect(menuSection.getByText(/Showing\s+1\s+of/i)).toBeVisible();

      await menuSection
        .getByRole("button", { name: "Add Otoro Nigiri to cart" })
        .first()
        .click();

      const cartPanel = menuSection.getByRole("complementary");

      await expect(
        cartPanel.getByRole("heading", { exact: true, name: "Otoro Nigiri" }),
      ).toBeVisible();
      await expect(
        cartPanel.getByRole("button", { name: /View cart & checkout/i }),
      ).toBeVisible();
      return;
    }

    await expect(
      page.getByRole("dialog", { name: "Otoro Nigiri" }),
    ).toBeVisible();

    await page
      .getByRole("button", {
        name: isTabletProject ? "Add to Cart" : "Add 1 to cart",
      })
      .click();
    const cartDialog = page.getByRole("dialog", { name: "Cart" });

    await expect(cartDialog).toBeVisible();
    await expect(cartDialog.getByText("Otoro Nigiri")).toBeVisible();
    await expect(
      cartDialog.getByRole("button", { name: "Checkout" }),
    ).toBeVisible();
  });

  test("uses the shared tablet category layout for menu tabs", async ({
    page,
  }, testInfo) => {
    test.skip(
      !testInfo.project.name.includes("tablet"),
      "Tablet-only category surface check.",
    );

    const categoryChecks = [
      { filterLabel: "Style", name: "Rolls" },
      { filterLabel: "Cut", name: "Sashimi" },
      { filterLabel: "Feature", name: "Chef Specials" },
      { filterLabel: "Ingredient", name: "Vegetarian" },
      { filterLabel: "Fish", name: "Nigiri" },
    ] as const;

    await page.goto("/menu");
    await expectNoFrameworkErrorOverlay(page);

    const menuSection = page.locator("#menu");

    for (const category of categoryChecks) {
      await test.step(`open ${category.name}`, async () => {
        const categoryButton = menuSection
          .getByRole("button", { exact: true, name: category.name })
          .first();

        await categoryButton.click();
        await expect(categoryButton).toHaveAttribute("aria-pressed", "true");
        await expect(
          menuSection.getByRole("heading", {
            exact: true,
            name: category.name,
          }),
        ).toBeVisible();
        await expect(
          menuSection.getByRole("textbox", {
            name: `Search ${category.name}`,
          }),
        ).toBeVisible();
        await expect(
          menuSection.getByRole("button", {
            exact: true,
            name: category.filterLabel,
          }),
        ).toBeVisible();
        await expect(
          menuSection.getByText("Premium Ingredients"),
        ).toBeVisible();
      });
    }
  });

  test("opens the drinks category from the menu query string", async ({
    page,
  }) => {
    await page.goto("/menu?category=drinks");
    await expectNoFrameworkErrorOverlay(page);

    const menuSection = page.locator("#menu");

    await expect(
      menuSection.getByRole("heading", { exact: true, name: "Drinks" }),
    ).toBeVisible();
    await expect(
      menuSection
        .getByText(/Liquid Omakase|Beverage Pairings|Drink Type/i)
        .first(),
    ).toBeVisible();

    const drinksCategoryButton = menuSection
      .getByRole("button", { exact: true, name: "Drinks" })
      .first();

    await expect(drinksCategoryButton).toHaveAttribute("aria-pressed", "true");
    await expect
      .poll(
        () =>
          drinksCategoryButton.evaluate((element) => {
            const rect = element.getBoundingClientRect();

            return rect.left >= 0 && rect.right <= window.innerWidth;
          }),
        {
          message:
            "Drinks category should be visible when opened from the route",
        },
      )
      .toBe(true);
  });

  test("blocks restaurant-only drinks from desktop checkout", async ({
    page,
  }, testInfo) => {
    test.skip(
      !testInfo.project.name.includes("desktop"),
      "Desktop cart panel exercises the shared checkout compliance guard.",
    );

    await page.goto("/menu");
    await page.evaluate(() => {
      window.localStorage.setItem(
        "sushi-bliss:cart",
        JSON.stringify([
          {
            addOns: [],
            customizations: [],
            id: "japanese-dry-lager",
            menuItemId: "japanese-dry-lager",
            quantity: 1,
          },
        ]),
      );
      window.dispatchEvent(new Event("sushi-bliss:cart-changed"));
    });
    await page.reload();

    const menuSection = page.locator("#menu");

    await expect(menuSection.getByText("Japanese Dry Lager")).toBeVisible();
    await menuSection
      .getByRole("button", { name: /View cart & checkout/i })
      .click();

    await expect(
      page.getByRole("heading", { level: 1, name: "Checkout" }),
    ).toBeVisible();
    await expect(page.getByText("Restaurant-only drinks")).toBeVisible();
    await page
      .getByRole("button", { name: /Continue to review/i })
      .first()
      .click();
    await expect(
      page.getByText(/reserved for restaurant service/i),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Almost there/i }),
    ).toHaveCount(0);
  });

  test("uses working tablet gift delivery controls", async ({
    page,
  }, testInfo) => {
    test.skip(
      !testInfo.project.name.includes("tablet"),
      "Tablet-only gift checkout control check.",
    );

    await page.setViewportSize({ height: 1448, width: 1086 });
    await page.goto("/gifts");
    await expectNoFrameworkErrorOverlay(page);

    const giftsSection = page.locator("#gifts");

    await giftsSection
      .getByRole("button", { name: /Continue to review/i })
      .click();
    await expect(
      giftsSection.getByRole("heading", {
        name: /Give the gift of Exceptional/i,
      }),
    ).toBeVisible();

    await giftsSection.getByLabel("Send time").selectOption("15:00");
    await expect(
      giftsSection.locator("p").filter({ hasText: /^Scheduled email$/ }),
    ).toBeVisible();
    await expect(
      giftsSection.locator("p").filter({ hasText: /at 3:00 PM/ }),
    ).toBeVisible();

    await giftsSection
      .getByRole("button", { name: "View sample email" })
      .click();
    await expect(
      giftsSection.getByText("Your Sushi Bliss gift is ready"),
    ).toBeVisible();
    await expect(
      giftsSection.getByRole("button", { name: "Hide sample email" }),
    ).toBeVisible();
  });

  test("updates mobile home featured items from category rail", async ({
    page,
  }, testInfo) => {
    test.skip(
      !testInfo.project.name.includes("mobile"),
      "Mobile home category rail is hidden on wider layouts.",
    );

    await page.goto("/home");
    await expectNoFrameworkErrorOverlay(page);

    const featuredRail = page.locator("#mobile-featured-menu");

    await expect(
      featuredRail.getByRole("heading", { name: "Nigiri Picks" }),
    ).toBeVisible();
    await expect(
      featuredRail.getByRole("heading", { name: "Otoro Nigiri" }).first(),
    ).toBeVisible();

    await page
      .getByRole("button", { name: "Show Rolls featured items" })
      .click();
    await expect(
      featuredRail.getByRole("heading", { name: "Rolls Picks" }),
    ).toBeVisible();
    await expect(
      featuredRail.getByRole("heading", { name: "Dragon Roll" }).first(),
    ).toBeVisible();
    await expect(
      featuredRail.getByRole("link", { name: /Explore all Rolls items/i }),
    ).toHaveAttribute("href", "/menu?category=rolls");

    await page
      .getByRole("button", { name: "Show Sashimi featured items" })
      .click();
    await expect(
      featuredRail.getByRole("heading", { name: "Sashimi Picks" }),
    ).toBeVisible();
    await expect(
      featuredRail.getByRole("heading", { name: "Salmon Sashimi" }).first(),
    ).toBeVisible();
  });

  test("prefills liquid omakase reservation intent on desktop", async ({
    page,
  }, testInfo) => {
    test.skip(
      !testInfo.project.name.includes("desktop"),
      "Desktop reservation handoff validates the expanded reservation surface.",
    );

    await page.goto(
      "/reservations?intent=liquid-omakase&experience=chef-omakase&item=seasonal-sake-flight",
    );
    await expectNoFrameworkErrorOverlay(page);

    await expect(
      page.getByRole("heading", { name: /Choose your experience/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Chef's Counter Omakase/i }),
    ).toHaveAttribute("aria-pressed", "true");

    await page
      .getByRole("button", { name: /Continue to confirmation/i })
      .click();

    await expect(
      page.getByRole("heading", { name: /Review your reservation/i }),
    ).toBeVisible();
    await expect(page.getByText("Liquid Omakase")).toBeVisible();
    await expect(page.getByText(/Seasonal Sake Flight/i)).toBeVisible();
  });

  test("wires desktop support CTAs, socials, and FAQ previews", async ({
    page,
  }, testInfo) => {
    test.skip(
      !testInfo.project.name.includes("desktop"),
      "Desktop support CTA grid is hidden on narrower layouts.",
    );

    await page.goto("/support");
    await expectNoFrameworkErrorOverlay(page);

    await expect(
      page.getByRole("link", { name: /View on map/i }),
    ).toHaveAttribute("href", "/locations");
    await expect(page.getByRole("link", { name: /Call now/i })).toHaveAttribute(
      "href",
      "tel:+81312345678",
    );
    await expect(
      page.getByRole("link", { name: /Instagram/i }),
    ).toHaveAttribute("href", "https://www.instagram.com");
    await expect(page.getByRole("link", { name: /Facebook/i })).toHaveAttribute(
      "href",
      "https://www.facebook.com",
    );
    await expect(
      page.getByRole("link", { name: "Follow Sushi Bliss on X" }),
    ).toHaveAttribute("href", "https://x.com");
    await expect(
      page.getByRole("link", { name: /Tripadvisor/i }),
    ).toHaveAttribute("href", "https://www.tripadvisor.com");
    await expect(
      page
        .getByRole("link", { name: /Tripadvisor/i })
        .locator('img[src="/assets/icons/tripadvisor-icon.svg"]'),
    ).toBeVisible();
    await expect
      .poll(() =>
        page
          .locator(
            [
              'a[href="https://www.instagram.com"]',
              'a[href="https://www.facebook.com"]',
              'a[href="https://x.com"]',
              'a[href="https://www.tripadvisor.com"]',
            ].join(", "),
          )
          .evaluateAll((links) =>
            links.map((link) => link.textContent?.trim() || ""),
          ),
      )
      .toEqual(["", "", "", ""]);

    await page
      .getByRole("button", { name: /Track or reorder an order/i })
      .click();

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Track or reorder an order",
      }),
    ).toBeVisible();
  });

  test("opens the correct desktop help category articles", async ({
    page,
  }, testInfo) => {
    test.skip(
      !testInfo.project.name.includes("desktop"),
      "Desktop help category cards are hidden on narrower layouts.",
    );

    await page.goto("/support");
    await expectNoFrameworkErrorOverlay(page);

    const supportSection = page.locator("#support");

    await supportSection.getByRole("button", { name: "View all FAQs" }).click();
    await expect(
      supportSection.getByRole("heading", { name: /How can\s+we help/i }),
    ).toBeVisible();

    await supportSection
      .getByRole("button", { name: /Delivery\s+Fees, areas/i })
      .click();

    await expect(
      supportSection.getByRole("heading", {
        name: "Delivery timing and routing",
      }),
    ).toBeVisible();
    await expect(
      supportSection.getByText("Restaurant-only drinks stay blocked"),
    ).toBeVisible();
  });
});

test.describe("admin experience", () => {
  test("renders the admin dashboard and updates local controls", async ({
    page,
  }) => {
    await page.goto("/admin");

    await expectNoFrameworkErrorOverlay(page);
    await expect(page).toHaveTitle(/Sushi Bliss Admin/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Sushi Bliss admin" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Menu management" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Pause Ikura Gunkan" }).click();
    await expect(page.locator("#menu-admin").getByText("Paused")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Resume Ikura Gunkan" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Mark ready" }).click();
    await expect(
      page.getByText("SB-260604-LIVE moved to ready."),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Mark completed" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Close Sushi Bliss Ginza" }).click();
    await expect(
      page.getByRole("button", { name: "Open Sushi Bliss Ginza" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Mark contacted" }).click();
    await expect(page.getByText("Contacted")).toBeVisible();
  });
});
