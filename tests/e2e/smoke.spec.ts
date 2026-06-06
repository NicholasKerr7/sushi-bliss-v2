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

    await expect(
      menuSection.getByRole("heading", { name: "Explore the menu" }),
    ).toBeVisible();

    await menuSection.locator("#menu-search").fill("Otoro Nigiri");
    await expect(
      menuSection.getByRole("heading", { name: "Otoro Nigiri" }),
    ).toBeVisible();
    await expect(menuSection.getByText(/Showing 1 item in All/i)).toBeVisible();

    await menuSection.getByRole("button", { name: "Details" }).click();
    await expect(
      page.getByRole("dialog", { name: "Otoro Nigiri" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Add 1 to cart" }).click();
    const cartDialog = page.getByRole("dialog", { name: "Cart" });

    await expect(cartDialog).toBeVisible();
    await expect(cartDialog.getByText("Otoro Nigiri")).toBeVisible();
    await expect(
      cartDialog.getByRole("button", { name: "Checkout" }),
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
