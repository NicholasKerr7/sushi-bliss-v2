import { readFile } from "node:fs/promises";
import path from "node:path";

import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

interface VisualReferenceTarget {
  name: string;
  prepare?: (page: Page) => Promise<void>;
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
    name: "tablet item detail",
    prepare: openTabletOtoroDetail,
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-06-item-detail-expanded.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/menu",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const dialog = page.getByRole("dialog", { name: "Otoro Nigiri" });

      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("button", { name: "Add to Cart" }),
      ).toBeVisible();
      await expect(
        dialog.getByRole("button", { name: "Customize" }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet item customization",
    prepare: async (page) => {
      await openTabletOtoroDetail(page);
      await page.getByRole("button", { name: "Customize" }).click();
      await page.getByRole("button", { name: "Increase quantity" }).click();
      await page
        .locator('label[for="tablet-addon-otoro-nigiri-gold-flakes"]')
        .click();
      await page
        .locator('label[for="tablet-addon-otoro-nigiri-truffle-oil"]')
        .click();
      await page
        .locator('label[for="tablet-addon-otoro-nigiri-miso-soup-side"]')
        .click();
    },
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-07-item-customization-add-ons.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/menu",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      await expect(page.getByText("Customize order")).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Add-ons" }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: /Add to cart/i }).last(),
      ).toBeVisible();
    },
  },
  {
    name: "tablet cart",
    prepare: openTabletCartWithOtoro,
    projectName: "chromium-tablet",
    referencePath: "public/assets/screenshots/tablet/tablet-08-cart.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/menu",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const dialog = page.getByRole("dialog", { name: "Your Cart" });

      await expect(dialog).toBeVisible();
      await expect(dialog.getByText("Otoro Nigiri")).toBeVisible();
      await expect(
        dialog.getByRole("button", { name: "Proceed to checkout" }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet checkout delivery pickup",
    prepare: openTabletCheckoutDetails,
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-09-checkout-delivery-pickup.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/menu",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const dialog = page.getByRole("dialog", { name: "Checkout" });

      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("button", { name: /Delivery/i }),
      ).toBeVisible();
      await expect(
        dialog.getByRole("button", { name: /Continue to payment/i }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet checkout review confirm",
    prepare: openTabletCheckoutReview,
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-10-checkout-review-confirm.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/menu",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const dialog = page.getByRole("dialog", { name: "Review & Confirm" });

      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("button", { name: /Place order/i }),
      ).toBeVisible();
      await expect(
        dialog
          .getByRole("button", { name: "Back to cart" })
          .filter({ hasText: "Back to cart" }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet order confirmation",
    prepare: openTabletOrderConfirmation,
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-05-item-detail-otoro-nigiri.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/menu",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const dialog = page.getByRole("dialog", { name: "Thank you!" });

      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("heading", { name: "Thank you!" }),
      ).toBeVisible();
      await expect(
        dialog.getByRole("link", { name: /Track order/i }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet orders dashboard",
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-11-orders-dashboard.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/orders",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const ordersSection = page.locator("#orders");

      await expect(ordersSection).toBeVisible();
      await expect(
        ordersSection.getByRole("heading", { exact: true, name: "Orders" }),
      ).toBeVisible();
      await expect(
        ordersSection.getByRole("button", { name: "Track order" }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet live order tracking",
    prepare: openTabletLiveOrderTracking,
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-12-live-order-tracking.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/orders",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const ordersSection = page.locator("#orders");

      await expect(
        ordersSection.getByRole("heading", { name: "Live Order Tracking" }),
      ).toBeVisible();
      await expect(
        ordersSection.getByRole("button", { name: "Back to orders" }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet reservations main",
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-13-reservations-main.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/reservations",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const reservationsSection = page.locator("#reservations");

      await expect(reservationsSection).toBeVisible();
      await expect(
        reservationsSection.getByText("Crafted for You"),
      ).toBeVisible();
      await expect(
        reservationsSection.getByRole("button", { name: "Make a reservation" }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet choose reservation experience",
    prepare: openTabletReservationBooking,
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-14-choose-reservation-experience.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/reservations",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const reservationsSection = page.locator("#reservations");

      await expect(
        reservationsSection.getByRole("heading", {
          name: "Reservation Experience",
        }),
      ).toBeVisible();
      await expect(
        reservationsSection.getByRole("button", { name: "Continue to review" }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet reservation review",
    prepare: openTabletReservationReview,
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-15-reservation-review.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/reservations",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const reservationsSection = page.locator("#reservations");

      await expect(
        reservationsSection.getByRole("heading", {
          name: "Review Your Reservation",
        }),
      ).toBeVisible();
      await expect(
        reservationsSection.getByRole("button", {
          name: "Confirm reservation",
        }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet reservation confirmation",
    prepare: openTabletReservationConfirmation,
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-16-reservation-confirmation.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/reservations",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const reservationsSection = page.locator("#reservations");

      await expect(
        reservationsSection.getByRole("heading", {
          name: "Reservation Confirmed",
        }),
      ).toBeVisible();
      await expect(
        reservationsSection.getByRole("button", { name: "View reservations" }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet reservation history",
    prepare: openTabletReservationHistory,
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-17-reservation-history.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/reservations",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const reservationsSection = page.locator("#reservations");

      await expect(
        reservationsSection.getByRole("heading", {
          name: "Reservation History",
        }),
      ).toBeVisible();
      await expect(
        reservationsSection
          .getByRole("button", { name: /View details/i })
          .first(),
      ).toBeVisible();
    },
  },
  {
    name: "tablet modify reservation",
    prepare: openTabletModifyReservation,
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-18-modify-reservation.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/reservations",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const reservationsSection = page.locator("#reservations");

      await expect(
        reservationsSection.getByRole("heading", {
          name: "Reservation Experience",
        }),
      ).toBeVisible();
      await expect(reservationsSection.getByText("Editing")).toBeVisible();
      await expect(
        reservationsSection.getByRole("button", { name: "Cancel edit" }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet locations",
    projectName: "chromium-tablet",
    referencePath: "public/assets/screenshots/tablet/tablet-19-locations.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/locations",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const locationsSection = page.locator("#locations");

      await expect(locationsSection).toBeVisible();
      await expect(
        locationsSection.getByRole("heading", {
          exact: true,
          name: "Locations",
        }),
      ).toBeVisible();
      await expect(
        locationsSection.getByLabel("Search locations"),
      ).toBeVisible();
      await expect(
        locationsSection.getByText("Sushi Bliss Ginza"),
      ).toBeVisible();
    },
  },
  {
    name: "tablet cancel reservation",
    prepare: openTabletCancelReservation,
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-20-cancel-reservation.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/reservations",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const reservationsSection = page.locator("#reservations");

      await expect(
        reservationsSection.getByRole("heading", {
          name: "Cancel Reservation",
        }),
      ).toBeVisible();
      await expect(
        reservationsSection.getByRole("button", { name: "Keep reservation" }),
      ).toBeVisible();
      await expect(
        reservationsSection.getByRole("button", {
          name: "Cancel reservation",
        }),
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

async function openTabletOtoroDetail(page: Page) {
  const menuSection = page.locator("#menu");

  await expect(menuSection).toBeVisible();
  await expect(
    menuSection.getByRole("heading", { name: "Otoro Nigiri" }).first(),
  ).toBeVisible();
  await menuSection
    .getByRole("button", { name: /Otoro Nigiri Premium fatty/i })
    .first()
    .click();
  await expect(
    page.getByRole("dialog", { name: "Otoro Nigiri" }),
  ).toBeVisible();
}

async function openTabletCartWithOtoro(page: Page) {
  await openTabletOtoroDetail(page);
  await page.getByRole("button", { name: "Increase quantity" }).click();
  await page.getByRole("button", { name: "Add to Cart" }).click();
  await expect(page.getByRole("dialog", { name: "Your Cart" })).toBeVisible();
}

async function openTabletCheckoutDetails(page: Page) {
  await openTabletCartWithOtoro(page);
  await page.getByRole("button", { name: "Proceed to checkout" }).click();
  await expect(page.getByRole("dialog", { name: "Checkout" })).toBeVisible();
}

async function openTabletCheckoutReview(page: Page) {
  await openTabletCheckoutDetails(page);
  await page.getByRole("button", { name: /Continue to payment/i }).click();
  await expect(
    page.getByRole("dialog", { name: "Review & Confirm" }),
  ).toBeVisible();
}

async function openTabletOrderConfirmation(page: Page) {
  await openTabletCheckoutReview(page);
  await page.getByRole("button", { name: /Place order/i }).click();
  await expect(page.getByRole("dialog", { name: "Thank you!" })).toBeVisible();
}

async function openTabletLiveOrderTracking(page: Page) {
  const ordersSection = page.locator("#orders");

  await expect(
    ordersSection.getByRole("button", { name: "Track order" }),
  ).toBeVisible();
  await ordersSection.getByRole("button", { name: "Track order" }).click();
  await expect(
    ordersSection.getByRole("heading", { name: "Live Order Tracking" }),
  ).toBeVisible();
}

async function openTabletReservationBooking(page: Page) {
  const reservationsSection = page.locator("#reservations");

  await expect(
    reservationsSection.getByRole("button", { name: "Make a reservation" }),
  ).toBeVisible();
  await reservationsSection
    .getByRole("button", { name: "Make a reservation" })
    .click();
  await expect(
    reservationsSection.getByRole("heading", {
      name: "Reservation Experience",
    }),
  ).toBeVisible();
}

async function openTabletReservationReview(page: Page) {
  const reservationsSection = page.locator("#reservations");

  await openTabletReservationBooking(page);
  await reservationsSection
    .getByRole("button", { name: "Continue to review" })
    .click();
  await expect(
    reservationsSection.getByRole("heading", {
      name: "Review Your Reservation",
    }),
  ).toBeVisible();
}

async function openTabletReservationConfirmation(page: Page) {
  const reservationsSection = page.locator("#reservations");

  await openTabletReservationReview(page);
  await reservationsSection
    .getByRole("button", { name: "Confirm reservation" })
    .click();
  await expect(
    reservationsSection.getByRole("heading", {
      name: "Reservation Confirmed",
    }),
  ).toBeVisible();
}

async function openTabletReservationHistory(page: Page) {
  const reservationsSection = page.locator("#reservations");

  await expect(
    reservationsSection.getByRole("button", { name: "View all" }),
  ).toBeVisible();
  await reservationsSection.getByRole("button", { name: "View all" }).click();
  await expect(
    reservationsSection.getByRole("heading", {
      name: "Reservation History",
    }),
  ).toBeVisible();
}

async function openTabletModifyReservation(page: Page) {
  const reservationsSection = page.locator("#reservations");

  await expect(
    reservationsSection.getByRole("button", { name: "Modify reservation" }),
  ).toBeVisible();
  await reservationsSection
    .getByRole("button", { name: "Modify reservation" })
    .click();
  await expect(
    reservationsSection.getByRole("heading", {
      name: "Reservation Experience",
    }),
  ).toBeVisible();
}

async function openTabletCancelReservation(page: Page) {
  const reservationsSection = page.locator("#reservations");

  await expect(
    reservationsSection.getByRole("button", { name: "Cancel" }),
  ).toBeVisible();
  await reservationsSection.getByRole("button", { name: "Cancel" }).click();
  await expect(
    reservationsSection.getByRole("heading", {
      name: "Cancel Reservation",
    }),
  ).toBeVisible();
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
      await target.prepare?.(page);

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
