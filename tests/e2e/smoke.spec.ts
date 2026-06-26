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
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expectNoFrameworkErrorOverlay(page);
    await expect(page).toHaveTitle(/Sushi Bliss/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Sushi Bliss" }),
    ).toBeVisible();

    await page.goto("/menu", { waitUntil: "domcontentloaded" });
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

  test("supports the tablet hero carousel controls", async ({
    page,
  }, testInfo) => {
    test.skip(
      !testInfo.project.name.includes("tablet"),
      "Tablet-only carousel control check.",
    );

    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/home", { waitUntil: "domcontentloaded" });
    await expectNoFrameworkErrorOverlay(page);

    const tabletHeroControls = page.getByRole("navigation", {
      name: "Tablet hero slides",
    });

    await expect(tabletHeroControls).toBeVisible();
    await expect(
      tabletHeroControls.getByRole("button", { name: "Show slide 1 of 4" }),
    ).toHaveAttribute("aria-current", "true");
    const tabletSecondSlide = tabletHeroControls.getByRole("button", {
      name: "Show slide 2 of 4",
    });

    await expect(async () => {
      await tabletSecondSlide.click({ force: true });
      await expect(tabletSecondSlide).toHaveAttribute("aria-current", "true");
    }).toPass();
  });

  test("supports the desktop hero carousel controls", async ({
    page,
  }, testInfo) => {
    test.skip(
      !testInfo.project.name.includes("desktop"),
      "Desktop-only carousel control check.",
    );

    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/home", { waitUntil: "domcontentloaded" });
    await expectNoFrameworkErrorOverlay(page);

    const desktopHeroControls = page.getByRole("navigation", {
      name: "Desktop hero slides",
    });

    await expect(desktopHeroControls).toBeVisible();
    await expect(
      desktopHeroControls.getByRole("button", { name: "Show slide 1 of 4" }),
    ).toHaveAttribute("aria-current", "true");
    const desktopSecondSlide = desktopHeroControls.getByRole("button", {
      name: "Show slide 2 of 4",
    });

    await expect(async () => {
      await desktopSecondSlide.click({ force: true });
      await expect(desktopSecondSlide).toHaveAttribute("aria-current", "true");
    }).toPass();
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

    await page.goto("/menu", { waitUntil: "domcontentloaded" });
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
    await page.goto("/menu?category=drinks", { waitUntil: "domcontentloaded" });
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

    await page.goto("/menu", { waitUntil: "domcontentloaded" });
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
    await page.goto("/gifts", { waitUntil: "domcontentloaded" });
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

    await page.goto("/home", { waitUntil: "domcontentloaded" });
    await expectNoFrameworkErrorOverlay(page);

    const featuredRail = page.locator("#mobile-featured-menu");

    await expect(
      featuredRail.getByRole("heading", { name: "Nigiri Picks" }),
    ).toBeVisible();
    await expect(
      featuredRail.getByRole("heading", { name: "Otoro Nigiri" }).first(),
    ).toBeVisible();

    const categoryRail = page.locator(
      '[aria-label="Featured menu categories"]',
    );
    const rollsButton = categoryRail.getByRole("button", {
      name: "Show Rolls featured items",
    });
    const sashimiButton = categoryRail.getByRole("button", {
      name: "Show Sashimi featured items",
    });

    await expect(async () => {
      await rollsButton.click();
      await expect(rollsButton).toHaveAttribute("aria-pressed", "true", {
        timeout: 1000,
      });
    }).toPass({ timeout: 10000 });
    await expect(
      featuredRail.getByRole("heading", { name: "Rolls Picks" }),
    ).toBeVisible();
    await expect(
      featuredRail.getByRole("heading", { name: "Dragon Roll" }).first(),
    ).toBeVisible();
    await expect(
      featuredRail.getByRole("link", { name: /Explore all Rolls items/i }),
    ).toHaveAttribute("href", "/menu?category=rolls");

    await expect(async () => {
      await sashimiButton.click();
      await expect(sashimiButton).toHaveAttribute("aria-pressed", "true", {
        timeout: 1000,
      });
    }).toPass({ timeout: 10000 });
    await expect(
      featuredRail.getByRole("heading", { name: "Sashimi Picks" }),
    ).toBeVisible();
    await expect(
      featuredRail.getByRole("heading", { name: "Salmon Sashimi" }).first(),
    ).toBeVisible();
  });

  test("fills the wide-mobile home featured grid", async ({
    page,
  }, testInfo) => {
    test.skip(
      !testInfo.project.name.includes("mobile"),
      "Wide-mobile featured grid is only relevant to the mobile layout.",
    );

    await page.setViewportSize({ height: 932, width: 425 });
    await page.goto("/home", { waitUntil: "domcontentloaded" });
    await expectNoFrameworkErrorOverlay(page);

    const featuredRail = page.locator("#mobile-featured-menu");

    await expect(
      featuredRail.getByRole("heading", { name: "Nigiri Picks" }),
    ).toBeVisible();
    await expect(
      featuredRail.getByRole("heading", { name: "Otoro Nigiri" }).first(),
    ).toBeVisible();
    await expect(
      featuredRail.getByRole("heading", { name: "Salmon Nigiri" }).first(),
    ).toBeVisible();
    await expect(
      featuredRail.getByRole("heading", { name: "Hamachi Nigiri" }).first(),
    ).toBeVisible();
    await expect(
      featuredRail.getByRole("heading", { name: "Scallop Nigiri" }).first(),
    ).toBeVisible();
  });

  test("fills wide-mobile profile shortcut grids", async ({
    page,
  }, testInfo) => {
    test.skip(
      !testInfo.project.name.includes("mobile"),
      "Wide-mobile profile grid check is only relevant to the mobile layout.",
    );

    await page.setViewportSize({ height: 932, width: 425 });
    await page.goto("/profile", { waitUntil: "domcontentloaded" });
    await expectNoFrameworkErrorOverlay(page);

    const commandCenter = page.locator(
      'section[aria-labelledby="mobile-profile-command-center-title"]',
    );
    const exploreDirectory = page.locator(
      'section[aria-labelledby="mobile-explore-directory-title"]',
    );

    await expect(
      commandCenter.getByRole("link", { name: "Support: Concierge" }),
    ).toBeVisible();
    await expect(
      exploreDirectory.getByRole("link", { name: /Profile Manage saved/i }),
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
      { waitUntil: "domcontentloaded" },
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

    await page.goto("/support", { waitUntil: "domcontentloaded" });
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
        .locator('img[src="/assets/icons/owl-icon.png"]'),
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

    await page.goto("/support", { waitUntil: "domcontentloaded" });
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

  test("uses specific desktop notification detail actions", async ({
    page,
  }, testInfo) => {
    test.skip(
      !testInfo.project.name.includes("desktop"),
      "Desktop notification detail rail is hidden on narrower layouts.",
    );

    await page.goto("/notifications", { waitUntil: "domcontentloaded" });
    await expectNoFrameworkErrorOverlay(page);

    const notificationSection = page.locator("#notifications");

    await notificationSection
      .getByRole("button", { name: "Track order" })
      .first()
      .click();

    await expect(
      notificationSection.getByRole("button", {
        name: "Back to notifications",
      }),
    ).toBeVisible();
    await expect(
      notificationSection.getByText("Order follow-up"),
    ).toBeVisible();
    await expect(
      notificationSection.getByRole("link", { name: "Track order" }),
    ).toHaveAttribute("href", "/orders");
  });
});

test.describe("admin experience", () => {
  test("desktop operations intelligence links into the workbench", async ({
    page,
  }, testInfo) => {
    test.skip(
      !testInfo.project.name.includes("desktop"),
      "The operations intelligence band is desktop-only.",
    );

    await page.goto("/admin", { waitUntil: "domcontentloaded" });
    await expectNoFrameworkErrorOverlay(page);

    const intelligence = page.locator(
      'section[aria-label="Admin operations intelligence"]',
    );

    await expect(intelligence).toBeVisible();
    await intelligence.getByRole("link", { name: "Manage Menu" }).click();
    await expect(
      page.getByRole("heading", { level: 2, name: "Manage Workbench" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 3, name: "Menu Management" }),
    ).toBeVisible();
  });

  test("renders the admin dashboard and supports workspace controls", async ({
    page,
  }) => {
    await page.goto("/admin", { waitUntil: "domcontentloaded" });

    await expectNoFrameworkErrorOverlay(page);
    await expect(page).toHaveTitle(/Sushi Bliss Admin/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Admin Dashboard" }),
    ).toBeVisible();
    await expect(page.getByText("Welcome back, Hiroshi Tanaka")).toBeVisible();

    const workspace = page.locator(
      'section[aria-labelledby="admin-operations-workspace-title"]',
    );

    await expect(
      workspace.getByRole("heading", { level: 2, name: "Order Management" }),
    ).toBeVisible();

    await workspace
      .getByRole("searchbox", { name: "Search admin workspace rows" })
      .fill("Michael");
    await expect(
      workspace.getByRole("button", { name: /Michael Chen/i }),
    ).toBeVisible();

    await workspace.getByRole("button", { name: /Michael Chen/i }).click();
    await expect(workspace.getByText("Michael Chen").first()).toBeVisible();

    const commandBoard = page.locator(
      'section[aria-labelledby="admin-insight-board-title"]',
    );
    const commandTab = page.getByRole("button", {
      name: "Open Command workbench",
    });

    await expect(async () => {
      await commandTab.click({ force: true });
      await expect(commandTab).toHaveAttribute("aria-pressed", "true");
      await expect(
        commandBoard.getByRole("heading", { name: "Live Orders" }),
      ).toBeVisible();
    }).toPass();
    await commandBoard
      .getByRole("button", { name: "Open Customer Signals" })
      .click();
    await commandBoard
      .getByRole("searchbox", { name: "Search command center records" })
      .fill("Alex");
    await commandBoard.getByRole("button", { name: /Alex Johnson/i }).click();
    await commandBoard.getByRole("button", { name: "Mark actioned" }).click();
    await expect(
      commandBoard.getByRole("button", { exact: true, name: "Actioned" }),
    ).toBeVisible();
    await commandBoard.getByRole("button", { name: "Pin record" }).click();
    await expect(
      commandBoard.getByRole("button", { exact: true, name: "Pinned" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Open Manage workbench" }).click();

    const domainConsole = page.locator(
      'section[aria-labelledby="admin-domain-console-title"]',
    );
    const workbenchPanel = page.getByTestId("admin-workbench-panel");
    const isDesktopProject = test.info().project.name.includes("desktop");

    await expect(
      domainConsole.getByRole("heading", { level: 3, name: "Control Rooms" }),
    ).toBeVisible();
    if (isDesktopProject) {
      await workbenchPanel.evaluate((element) => {
        element.scrollTop = element.scrollHeight;
      });
    }
    await domainConsole
      .getByRole("button", { name: "Open Menu Management detail" })
      .click();
    if (isDesktopProject) {
      await expect
        .poll(() => workbenchPanel.evaluate((element) => element.scrollTop))
        .toBe(0);
    }
    await expect(
      domainConsole.getByRole("heading", { level: 4, name: "Menu control" }),
    ).toBeVisible();
    await expect(
      domainConsole.getByText("Action history will appear here").first(),
    ).toBeVisible();
    await domainConsole
      .getByRole("button", { name: /Audit inactive item/i })
      .click();
    await expect(
      domainConsole.getByRole("button", {
        name: /Wagyu Tataki.*Pending/i,
      }),
    ).toBeVisible();
    await expect(
      domainConsole.getByText("Audit inactive item routed").first(),
    ).toBeVisible();
    await domainConsole.getByRole("button", { name: "Clear" }).click();
    await expect(
      domainConsole.getByText("Action history will appear here").first(),
    ).toBeVisible();

    await domainConsole
      .getByRole("button", { name: "Open Order Management detail" })
      .click();
    await expect(
      domainConsole.getByRole("heading", { level: 4, name: "Order control" }),
    ).toBeVisible();
    await domainConsole
      .getByRole("button", { name: /Prioritize kitchen order/i })
      .click();
    await expect(
      domainConsole.getByRole("heading", { level: 4, name: "#SB-2479" }),
    ).toBeVisible();
    await expect(
      domainConsole
        .getByText("Kitchen priority set for the next chef handoff.")
        .first(),
    ).toBeVisible();
    await domainConsole
      .getByRole("button", { name: /Complete delivery handoff/i })
      .click();
    await expect(
      domainConsole.getByRole("heading", { level: 4, name: "#SB-2477" }),
    ).toBeVisible();
    await expect(
      domainConsole
        .getByText("Courier handoff closed and receipt ready for review.")
        .first(),
    ).toBeVisible();

    await domainConsole
      .getByRole("button", { name: "Open Reservation Management detail" })
      .click();
    await expect(
      domainConsole.getByRole("heading", {
        level: 4,
        name: "Reservation control",
      }),
    ).toBeVisible();
    await domainConsole
      .getByRole("button", { name: /Confirm pending party/i })
      .click();
    await expect(
      domainConsole.getByRole("heading", { level: 4, name: "Liam Wilson" }),
    ).toBeVisible();
    await expect(
      domainConsole
        .getByText("Host confirmation completed for the evening seating plan.")
        .first(),
    ).toBeVisible();

    await domainConsole
      .getByRole("button", { name: "Open Offers Management detail" })
      .click();
    await expect(
      domainConsole.getByRole("heading", { level: 4, name: "Offer control" }),
    ).toBeVisible();
    await domainConsole
      .getByRole("button", { name: /Launch scheduled offer/i })
      .click();
    await expect(
      domainConsole.getByRole("heading", { level: 4, name: "Sashimi Night" }),
    ).toBeVisible();
    await expect(
      domainConsole
        .getByText("Campaign launched for the upcoming service window.")
        .first(),
    ).toBeVisible();
    await domainConsole
      .getByRole("button", { name: /Clean expired offer/i })
      .click();
    await expect(
      domainConsole.getByRole("heading", { level: 4, name: "New Customer" }),
    ).toBeVisible();
    await expect(
      domainConsole
        .getByText("Expired offer pinned for weekly campaign cleanup.")
        .first(),
    ).toBeVisible();

    await domainConsole
      .getByRole("button", { name: "Open Customer Overview detail" })
      .click();
    await expect(
      domainConsole.getByRole("heading", {
        level: 4,
        name: "Customer control",
      }),
    ).toBeVisible();
    await domainConsole
      .getByRole("button", { name: /Pin VIP follow-up/i })
      .click();
    await expect(
      domainConsole.getByRole("heading", { level: 4, name: "Alex Johnson" }),
    ).toBeVisible();
    await expect(
      domainConsole
        .getByText("Hospitality follow-up queued for the top guest segment.")
        .first(),
    ).toBeVisible();
    await domainConsole
      .getByRole("button", { name: /Review referral guest/i })
      .click();
    await expect(
      domainConsole.getByRole("heading", { level: 4, name: "Michael Chen" }),
    ).toBeVisible();
    await expect(
      domainConsole
        .getByText("Referral onboarding reviewed for the loyalty team.")
        .first(),
    ).toBeVisible();

    await domainConsole
      .getByRole("button", { name: "Open Analytics Summary detail" })
      .click();
    await expect(
      domainConsole.getByRole("heading", {
        level: 4,
        name: "Analytics control",
      }),
    ).toBeVisible();
    await domainConsole
      .getByRole("button", { name: /Pin revenue metric/i })
      .click();
    await expect(
      domainConsole.getByRole("heading", {
        level: 4,
        name: "Average Order Value",
      }),
    ).toBeVisible();
    await expect(
      domainConsole
        .getByText("Pinned for the weekly revenue performance note.")
        .first(),
    ).toBeVisible();
    await domainConsole
      .getByRole("button", { name: /Review guest metric/i })
      .click();
    await expect(
      domainConsole.getByRole("heading", {
        level: 4,
        name: "Customer Satisfaction",
      }),
    ).toBeVisible();
    await expect(
      domainConsole
        .getByText("Guest experience metric reviewed for weekly reporting.")
        .first(),
    ).toBeVisible();

    await domainConsole
      .getByRole("button", { name: "Open Locations Management detail" })
      .click();
    await expect(
      domainConsole.getByRole("heading", {
        level: 3,
        name: "Locations Management",
      }),
    ).toBeVisible();
    await expect(
      domainConsole.getByRole("heading", {
        level: 4,
        name: "Branch service board",
      }),
    ).toBeVisible();
    await domainConsole
      .getByRole("button", { name: /Stage branch handoff/i })
      .click();
    await expect(
      domainConsole.getByRole("button", { name: /Staged branch handoff/i }),
    ).toBeVisible();
    await expect(
      domainConsole.getByRole("heading", {
        level: 4,
        name: "Location control",
      }),
    ).toBeVisible();
    await domainConsole
      .getByRole("button", { name: /Review busiest branch/i })
      .click();
    await expect(
      domainConsole.getByRole("heading", {
        level: 4,
        name: "Sushi Bliss Downtown",
      }),
    ).toBeVisible();
    await expect(
      domainConsole
        .getByText("Service load reviewed for the current branch window.")
        .first(),
    ).toBeVisible();
    await domainConsole
      .getByRole("button", { name: /Sushi Bliss Westside/i })
      .click();
    await domainConsole
      .getByRole("button", { name: "Open record editor" })
      .click();

    const recordEditor = page.getByRole("dialog", {
      name: /Sushi Bliss Westside/i,
    });

    await recordEditor.getByLabel("Daily volume").fill("245 orders");
    await recordEditor
      .getByLabel("Location note")
      .fill("Yuki Tanaka is staging a tighter service handoff.");
    await recordEditor.getByRole("button", { name: "Save record" }).click();
    await expect(
      recordEditor.getByRole("button", { exact: true, name: "Saved" }),
    ).toBeVisible();
    await recordEditor
      .getByRole("button", { name: "Close record editor panel" })
      .click();
    await expect(domainConsole.getByText("245 orders").first()).toBeVisible();
    await domainConsole.getByRole("button", { name: "Mark reviewed" }).click();
    await expect(
      domainConsole.getByRole("button", { exact: true, name: "Reviewed" }),
    ).toBeVisible();
    await domainConsole.getByRole("button", { name: "Pin record" }).click();
    await expect(
      domainConsole.getByRole("button", { exact: true, name: "Pinned" }),
    ).toBeVisible();
    await domainConsole
      .getByRole("button", { name: "Open live workspace" })
      .click();
    await expect(
      workspace.getByRole("heading", {
        level: 2,
        name: "Locations Management",
      }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Open Manage workbench" }).click();
    await domainConsole
      .getByRole("button", { name: "Open Locations Management detail" })
      .click();
    await domainConsole
      .getByRole("button", { name: "Open location form" })
      .click();

    const formStudio = page.locator(
      'section[aria-labelledby="admin-form-studio-title"]',
    );

    await expect(
      formStudio.getByRole("heading", { level: 2, name: "Location Form" }),
    ).toBeVisible();
    await formStudio
      .getByRole("button", { name: "Open System Settings Form" })
      .click();
    await formStudio.getByLabel("Pickup lead time").fill("20 minutes");
    await formStudio.getByRole("button", { name: "Save changes" }).click();
    await expect(
      formStudio.getByText("Saved", { exact: true }).first(),
    ).toBeVisible();
    await formStudio.getByRole("button", { name: "Queue review" }).click();
    await expect(
      formStudio.getByRole("button", { exact: true, name: "Queued" }),
    ).toBeVisible();

    await page.getByRole("link", { name: "Menu Management" }).first().click();
    await expect(
      page.getByRole("heading", { level: 2, name: "Manage Workbench" }),
    ).toBeVisible();
    await expect(
      domainConsole.getByRole("heading", {
        level: 3,
        name: "Menu Management",
      }),
    ).toBeVisible();
    await expect(
      domainConsole.getByRole("heading", {
        level: 4,
        name: "Menu catalog board",
      }),
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: /Sushi Bliss/i }).first(),
    ).toBeVisible();
  });
});
