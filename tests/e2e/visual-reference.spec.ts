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
    name: "tablet omakase experience",
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-21-omakase-experience.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/omakase",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      await expect(
        page.getByRole("heading", { name: /The Art of Omakase/i }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Choose your experience" }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: /Reserve your experience/i }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet omakase package review",
    prepare: openTabletOmakaseReview,
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-22-omakase-package-review.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/omakase",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      await expect(
        page.getByRole("heading", { name: "Omakase package review" }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Course preview" }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: /Continue to reservation/i }).first(),
      ).toBeVisible();
    },
  },
  {
    name: "tablet gift experience",
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-23-gift-experience.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/gifts",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      await expect(
        page.getByRole("heading", { name: /Gift an Experience/i }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "1. Choose gift experience" }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: /Continue to review/i }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet gift checkout",
    prepare: openTabletGiftCheckout,
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-24-gift-checkout.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/gifts",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      await expect(
        page.getByRole("heading", { name: /Give the gift of Exceptional/i }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Gift summary" }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: /Complete payment/i }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet gift confirmation",
    prepare: openTabletGiftConfirmation,
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-25-gift-confirmation.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/gifts",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      await expect(
        page.getByRole("heading", { name: "Gift confirmed" }),
      ).toBeVisible();
      await expect(page.getByText("Order reference")).toBeVisible();
      await expect(
        page.getByRole("button", { name: "View gift details" }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet loyalty dashboard",
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-26-loyalty-dashboard.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/loyalty",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const loyaltySection = page.locator("#loyalty");

      await expect(loyaltySection).toBeVisible();
      await expect(
        loyaltySection.getByRole("heading", {
          exact: true,
          name: "Rewards",
        }),
      ).toBeVisible();
      await expect(loyaltySection.getByText("Reward catalog")).toBeVisible();
    },
  },
  {
    name: "tablet member pass rewards",
    prepare: openTabletRewardDetails,
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-27-member-pass-rewards.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/loyalty",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const dialog = page.getByRole("dialog", { name: "Chef Hand Roll" });

      await expect(dialog).toBeVisible();
      await expect(dialog.getByText("Terms")).toBeVisible();
      await expect(
        dialog.getByRole("button", { name: /Redeem 450 points/i }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet profile dashboard",
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-28-profile-dashboard.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/profile",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const profileSection = page.locator("#profile");

      await expect(profileSection).toBeVisible();
      await expect(
        profileSection.getByRole("heading", { name: "Hiroshi Tanaka" }),
      ).toBeVisible();
      await expect(profileSection.getByText("Quick actions")).toBeVisible();
    },
  },
  {
    name: "tablet favorites",
    prepare: seedTabletFavorites,
    projectName: "chromium-tablet",
    referencePath: "public/assets/screenshots/tablet/tablet-29-favorites.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/favorites",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const favoritesSection = page.locator("#favorites");

      await expect(favoritesSection).toBeVisible();
      await expect(
        favoritesSection.getByRole("heading", { name: "My Favorites" }),
      ).toBeVisible();
      await expect(
        favoritesSection.getByRole("heading", { name: "Saved menu items" }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet account settings preferences",
    prepare: openTabletProfilePreferences,
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-30-account-settings-preferences.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/profile",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      await expect(
        page.getByRole("heading", { exact: true, name: "Preferences" }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Dining preferences" }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Saved cards" }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet contact",
    projectName: "chromium-tablet",
    referencePath: "public/assets/screenshots/tablet/tablet-31-contact.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/support",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const supportSection = page.locator("#support");

      await expect(supportSection).toBeVisible();
      await expect(
        supportSection.getByRole("heading", { name: "Contact" }),
      ).toBeVisible();
      await expect(
        supportSection.getByRole("heading", { name: "Send us a message" }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet help center",
    prepare: openTabletSupportHelpCenter,
    projectName: "chromium-tablet",
    referencePath: "public/assets/screenshots/tablet/tablet-32-help-center.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/support",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const supportSection = page.locator("#support");

      await expect(
        supportSection.getByRole("heading", { name: /How can we/i }),
      ).toBeVisible();
      await expect(supportSection.getByText("Popular topics")).toBeVisible();
    },
  },
  {
    name: "tablet faq article detail",
    prepare: openTabletFaqArticle,
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-33-faq-article-detail.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/support",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      await expect(
        page.getByRole("heading", { name: "Tracking your order" }),
      ).toBeVisible();
      await expect(page.getByText("How to track your order")).toBeVisible();
    },
  },
  {
    name: "tablet notifications center",
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-34-notifications-center.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/notifications",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const notificationsSection = page.locator("#notifications");

      await expect(notificationsSection).toBeVisible();
      await expect(
        notificationsSection.getByRole("heading", {
          name: "Notifications Center",
        }),
      ).toBeVisible();
      await expect(
        notificationsSection.getByRole("button", { name: "Mark all read" }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet notification detail",
    prepare: openTabletNotificationDetail,
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-35-notification-detail.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/notifications",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      await expect(
        page.getByRole("heading", { name: /Notification detail/i }),
      ).toBeVisible();
      await expect(page.getByText("Order is being prepared")).toBeVisible();
    },
  },
  {
    name: "tablet promotions offers",
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-36-promotions-offers.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/offers",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const offersSection = page.locator("#offers");

      await expect(offersSection).toBeVisible();
      await expect(
        offersSection.getByRole("heading", { name: /Promotions/i }),
      ).toBeVisible();
      await expect(offersSection.getByText("Current offers")).toBeVisible();
    },
  },
  {
    name: "tablet offer detail",
    prepare: openTabletOfferDetail,
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-37-offer-detail.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/offers",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      await expect(page.getByText("Offer detail")).toBeVisible();
      await expect(
        page.getByRole("heading", { name: /Terms & conditions/i }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet referral earn",
    prepare: openTabletReferralEarn,
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-38-referral-earn.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/loyalty",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      await expect(
        page.getByRole("heading", { name: /Referral & Earn/i }),
      ).toBeVisible();
      await expect(page.getByText("Your referral code")).toBeVisible();
    },
  },
  {
    name: "tablet about our story",
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-39-about-our-story.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/about",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const aboutSection = page.locator("#about");

      await expect(aboutSection).toBeVisible();
      await expect(
        aboutSection.getByRole("heading", { name: /Our Story/i }),
      ).toBeVisible();
      await expect(aboutSection.getByText("Our journey")).toBeVisible();
    },
  },
  {
    name: "tablet master chefs team",
    projectName: "chromium-tablet",
    referencePath:
      "public/assets/screenshots/tablet/tablet-40-master-chefs-team.png",
    referenceSize: { height: 1448, width: 1086 },
    routePath: "/chefs",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const chefsSection = page.locator("#chefs");

      await expect(chefsSection).toBeVisible();
      await expect(
        chefsSection.getByRole("heading", { name: /Master Chefs/i }),
      ).toBeVisible();
      await expect(
        chefsSection.getByRole("heading", {
          exact: true,
          name: "Hiroshi Tanaka",
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
        menuSection.getByRole("heading", {
          name: /Exceptional\s+Japanese Cuisine/i,
        }),
      ).toBeVisible();
      await expect(
        menuSection.getByRole("heading", { exact: true, name: "Your Cart" }),
      ).toBeVisible();
    },
  },
  {
    name: "desktop menu category nigiri",
    prepare: openDesktopNigiriCategory,
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-03-menu-category-nigiri.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/menu",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const menuSection = page.locator("#menu");

      await expect(
        menuSection.getByRole("heading", { exact: true, name: "Nigiri" }),
      ).toBeVisible();
      await expect(menuSection.getByText("Nigiri Menu")).toBeVisible();
      await expect(
        menuSection.getByRole("heading", { name: "Otoro Nigiri" }).first(),
      ).toBeVisible();
    },
  },
  {
    name: "desktop item detail otoro nigiri",
    prepare: openDesktopOtoroDetail,
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-04-item-detail-otoro-nigiri.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/menu",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      await expect(
        page.getByRole("heading", { name: "Otoro Nigiri" }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Add to Cart" }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Customize" }),
      ).toBeVisible();
    },
  },
  {
    name: "desktop item customization add ons",
    prepare: openDesktopOtoroCustomization,
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-05-item-customization-add-ons.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/menu",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      await expect(page.getByText("Your selection")).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Add-ons" }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: /Add to cart/i }),
      ).toBeVisible();
    },
  },
  {
    name: "desktop cart",
    prepare: seedDesktopCart,
    projectName: "chromium-desktop",
    referencePath: "public/assets/screenshots/desktop/desktop-06-cart.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/menu",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const menuSection = page.locator("#menu");

      const cartPanel = menuSection.getByRole("complementary");

      await expect(
        cartPanel.getByRole("heading", { exact: true, name: "Your Cart" }),
      ).toBeVisible();
      await expect(
        cartPanel.getByRole("heading", { exact: true, name: "Otoro Nigiri" }),
      ).toBeVisible();
      await expect(
        menuSection.getByRole("button", { name: /View cart & checkout/i }),
      ).toBeVisible();
    },
  },
  {
    name: "desktop checkout",
    prepare: openDesktopCheckout,
    projectName: "chromium-desktop",
    referencePath: "public/assets/screenshots/desktop/desktop-07-checkout.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/menu",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      await expect(
        page.getByRole("heading", { name: "Checkout" }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Fulfillment" }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: /Continue to review/i }).first(),
      ).toBeVisible();
    },
  },
  {
    name: "desktop checkout review",
    prepare: openDesktopCheckoutReview,
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-08-checkout-review.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/menu",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      await expect(page.getByText("Review your order")).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Almost there." }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: /Place order/i }),
      ).toBeVisible();
    },
  },
  {
    name: "desktop order confirmation",
    prepare: openDesktopOrderConfirmation,
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-09-order-confirmation.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/menu",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      await expect(
        page.getByRole("heading", { name: /Thank you/i }),
      ).toBeVisible();
      await expect(page.getByText("Order confirmation")).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Back to menu" }),
      ).toBeVisible();
    },
  },
  {
    name: "desktop orders dashboard",
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-10-orders-dashboard.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/orders",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const ordersSection = page.locator("#orders");

      await expect(ordersSection).toBeVisible();
      await expect(
        ordersSection.getByRole("heading", { exact: true, name: "Orders" }),
      ).toBeVisible();
      await expect(ordersSection.getByText("Active order")).toBeVisible();
      await expect(ordersSection.getByText("Past orders")).toBeVisible();
    },
  },
  {
    name: "desktop reservations main",
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-11-reservations-main.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/reservations",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const reservationsSection = page.locator("#reservations");

      await expect(reservationsSection).toBeVisible();
      await expect(
        reservationsSection.getByRole("heading", { name: /Reservations/i }),
      ).toBeVisible();
      await expect(
        reservationsSection.getByRole("heading", {
          name: /Choose your experience/i,
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
    name: "desktop choose reservation experience",
    prepare: openDesktopReservationExperience,
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-12-choose-reservation-experience.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/reservations",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const reservationsSection = page.locator("#reservations");

      await expect(
        reservationsSection.getByRole("heading", {
          name: /Choose your experience/i,
        }),
      ).toBeVisible();
      await expect(
        reservationsSection.getByRole("button", {
          name: /Continue to confirmation/i,
        }),
      ).toBeVisible();
    },
  },
  {
    name: "desktop reservation review",
    prepare: openDesktopReservationReview,
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-13-reservation-review.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/reservations",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const reservationsSection = page.locator("#reservations");

      await expect(
        reservationsSection.getByRole("heading", {
          name: /Review your reservation/i,
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
    name: "desktop reservation history",
    prepare: openDesktopReservationHistory,
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-14-reservation-history.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/reservations",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const reservationsSection = page.locator("#reservations");

      await expect(
        reservationsSection.getByRole("heading", {
          name: /Reservation history/i,
        }),
      ).toBeVisible();
      await expect(
        reservationsSection.getByRole("button", {
          name: /Modify reservation/i,
        }),
      ).toBeVisible();
      await expect(
        reservationsSection.getByText("Past reservations"),
      ).toBeVisible();
    },
  },
  {
    name: "desktop omakase experience",
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-15-omakase-experience.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/omakase",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const omakaseSection = page.locator("#omakase");

      await expect(omakaseSection).toBeVisible();
      await expect(
        omakaseSection.getByRole("heading", {
          exact: true,
          name: "Omakase",
        }),
      ).toBeVisible();
      await expect(
        omakaseSection.getByRole("heading", {
          exact: true,
          name: "Omakase packages",
        }),
      ).toBeVisible();
      await expect(
        omakaseSection.getByRole("button", { name: /Reserve omakase/i }),
      ).toBeVisible();
    },
  },
  {
    name: "desktop omakase package review",
    prepare: openDesktopOmakaseReview,
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-16-omakase-package-review.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/omakase",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const omakaseSection = page.locator("#omakase");

      await expect(
        omakaseSection.getByRole("heading", {
          name: /Omakase\s+Experience/i,
        }),
      ).toBeVisible();
      await expect(
        omakaseSection.getByText("Review your reservation"),
      ).toBeVisible();
      await expect(
        omakaseSection.getByRole("link", { name: /Confirm reservation/i }),
      ).toBeVisible();
    },
  },
  {
    name: "desktop loyalty dashboard",
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-17-loyalty-dashboard.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/loyalty",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const loyaltySection = page.locator("#loyalty");

      await expect(loyaltySection).toBeVisible();
      await expect(
        loyaltySection.getByRole("heading", { name: /Loyalty\s+Rewards/i }),
      ).toBeVisible();
      await expect(
        loyaltySection.getByText("Redeem your points"),
      ).toBeVisible();
      await expect(
        loyaltySection.getByRole("button", { name: /View benefits/i }),
      ).toBeVisible();
    },
  },
  {
    name: "desktop member pass rewards",
    prepare: openDesktopLoyaltyPassRewards,
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-18-member-pass-rewards.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/loyalty",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const loyaltySection = page.locator("#loyalty");

      await expect(
        loyaltySection.getByRole("heading", { name: /Your member pass/i }),
      ).toBeVisible();
      await expect(
        loyaltySection.getByRole("heading", {
          exact: true,
          name: "Available rewards",
        }),
      ).toBeVisible();
      await expect(
        loyaltySection.getByRole("navigation", { name: "Reward filters" }),
      ).toBeVisible();
    },
  },
  {
    name: "desktop profile dashboard",
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-19-profile-dashboard.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/profile",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const profileSection = page.locator("#profile");

      await expect(profileSection).toBeVisible();
      await expect(
        profileSection.getByRole("heading", { name: "Hiroshi Tanaka" }),
      ).toBeVisible();
      await expect(profileSection.getByText("Saved addresses")).toBeVisible();
      await expect(profileSection.getByText("Recent activity")).toBeVisible();
    },
  },
  {
    name: "desktop account settings preferences",
    prepare: openDesktopProfileSettings,
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-20-account-settings-preferences.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/profile",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const profileSection = page.locator("#profile");

      await expect(
        profileSection.getByRole("heading", {
          exact: true,
          name: "My Account",
        }),
      ).toBeVisible();
      await expect(
        profileSection.getByRole("heading", { name: "Personal information" }),
      ).toBeVisible();
      await expect(
        profileSection.getByRole("heading", { name: "Dietary preferences" }),
      ).toBeVisible();
      await expect(
        profileSection.getByRole("heading", { name: "Privacy & Security" }),
      ).toBeVisible();
      await expect(
        profileSection.getByRole("heading", { name: "Notifications" }),
      ).toBeVisible();
    },
  },
  {
    name: "desktop contact",
    projectName: "chromium-desktop",
    referencePath: "public/assets/screenshots/desktop/desktop-21-contact.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/support",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const supportSection = page.locator("#support");

      await expect(supportSection).toBeVisible();
      await expect(
        supportSection.getByRole("heading", { name: /Contact\s+Sushi Bliss/i }),
      ).toBeVisible();
      await expect(supportSection.getByText("Send us a message")).toBeVisible();
      await expect(
        supportSection.getByText("Frequently asked questions"),
      ).toBeVisible();
    },
  },
  {
    name: "desktop help center",
    prepare: openDesktopHelpCenter,
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-22-help-center.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/support",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const supportSection = page.locator("#support");

      await expect(
        supportSection.getByRole("heading", { name: /How can\s+we help/i }),
      ).toBeVisible();
      await expect(
        supportSection.getByText("Popular help topics"),
      ).toBeVisible();
      await expect(
        supportSection.getByRole("button", { name: "Contact support" }),
      ).toBeVisible();
    },
  },
  {
    name: "desktop notifications center",
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-23-notifications-center.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/notifications",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const notificationsSection = page.locator("#notifications");

      await expect(notificationsSection).toBeVisible();
      await expect(
        notificationsSection.getByRole("heading", {
          name: /Notifications\s+Center/i,
        }),
      ).toBeVisible();
      await expect(
        notificationsSection.getByText("Notification preferences"),
      ).toBeVisible();
      await expect(
        notificationsSection.getByRole("button", { name: "Mark all as read" }),
      ).toBeVisible();
    },
  },
  {
    name: "desktop favorites",
    prepare: seedDesktopFavorites,
    projectName: "chromium-desktop",
    referencePath: "public/assets/screenshots/desktop/desktop-24-favorites.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/favorites",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const favoritesSection = page.locator("#favorites");

      await expect(favoritesSection).toBeVisible();
      await expect(
        favoritesSection.getByRole("heading", { name: /Your\s+Favorites/i }),
      ).toBeVisible();
      await expect(
        favoritesSection.getByText("Your favorite summary"),
      ).toBeVisible();
      await expect(
        favoritesSection.getByText("Recommended for you"),
      ).toBeVisible();
    },
  },
  {
    name: "desktop promotions offers",
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-25-promotions-offers.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/offers",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const offersSection = page.locator("#offers");

      await expect(offersSection).toBeVisible();
      await expect(
        offersSection.getByRole("heading", {
          name: /Spring Omakase\s+Tasting Journey/i,
        }),
      ).toBeVisible();
      await expect(
        offersSection.getByText("Exclusive offers for you"),
      ).toBeVisible();
      await expect(offersSection.getByText("Redeem your offer")).toBeVisible();
    },
  },
  {
    name: "desktop referral earn",
    prepare: openDesktopReferralEarn,
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-26-referral-earn.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/loyalty",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const loyaltySection = page.locator("#loyalty");

      await expect(
        loyaltySection.getByRole("heading", { name: /Refer\s+&\s+Earn/i }),
      ).toBeVisible();
      await expect(
        loyaltySection.getByText("Your referral code"),
      ).toBeVisible();
      await expect(
        loyaltySection.getByText("Your referral activity"),
      ).toBeVisible();
    },
  },
  {
    name: "desktop locations",
    projectName: "chromium-desktop",
    referencePath: "public/assets/screenshots/desktop/desktop-27-locations.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/locations",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const locationsSection = page.locator("#locations");

      await expect(locationsSection).toBeVisible();
      await expect(
        locationsSection.getByRole("heading", { name: /Our\s+Locations/i }),
      ).toBeVisible();
      await expect(
        locationsSection.getByText("Sushi Bliss Downtown"),
      ).toBeVisible();
      await expect(locationsSection.getByText("Tokyo map")).toBeVisible();
    },
  },
  {
    name: "desktop gift experience",
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-28-gift-experience.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/gifts",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const giftsSection = page.locator("#gifts");

      await expect(giftsSection).toBeVisible();
      await expect(
        giftsSection.getByRole("heading", { name: /Gift an Experience/i }),
      ).toBeVisible();
      await expect(
        giftsSection.getByText("Choose your gift experience"),
      ).toBeVisible();
      await expect(
        giftsSection.getByRole("button", { name: /Continue to review/i }),
      ).toBeVisible();
    },
  },
  {
    name: "desktop gift checkout",
    prepare: openDesktopGiftCheckout,
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-29-gift-checkout.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/gifts",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const giftsSection = page.locator("#gifts");

      await expect(
        giftsSection.getByRole("heading", { name: "Gift Checkout" }),
      ).toBeVisible();
      await expect(giftsSection.getByText("Order summary")).toBeVisible();
      await expect(
        giftsSection.getByRole("button", { name: "Purchase gift" }),
      ).toBeVisible();
    },
  },
  {
    name: "desktop gift confirmation",
    prepare: openDesktopGiftConfirmation,
    projectName: "chromium-desktop",
    referencePath:
      "public/assets/screenshots/desktop/desktop-30-gift-confirmation.png",
    referenceSize: { height: 941, width: 1672 },
    routePath: "/gifts",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const giftsSection = page.locator("#gifts");

      await expect(
        giftsSection.getByRole("heading", {
          name: /Your gift has been confirmed/i,
        }),
      ).toBeVisible();
      await expect(giftsSection.getByText("Gift order")).toBeVisible();
      await expect(
        giftsSection.getByRole("button", { name: "Send another gift" }),
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

async function openTabletOmakaseReview(page: Page) {
  await expect(
    page.getByRole("button", { name: /Reserve your experience/i }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Reserve your experience/i }).click();
  await expect(
    page.getByRole("heading", { name: "Omakase package review" }),
  ).toBeVisible();
}

async function openTabletGiftCheckout(page: Page) {
  await expect(
    page.getByRole("button", { name: /Continue to review/i }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Continue to review/i }).click();
  await expect(
    page.getByRole("heading", { name: /Give the gift of Exceptional/i }),
  ).toBeVisible();
}

async function openTabletGiftConfirmation(page: Page) {
  await openTabletGiftCheckout(page);
  await expect(
    page.getByRole("button", { name: /Complete payment/i }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Complete payment/i }).click();
  await expect(
    page.getByRole("heading", { name: "Gift confirmed" }),
  ).toBeVisible();
}

async function openTabletRewardDetails(page: Page) {
  const loyaltySection = page.locator("#loyalty");

  await expect(
    loyaltySection.getByRole("button", { name: "Details" }).first(),
  ).toBeVisible();
  await loyaltySection.getByRole("button", { name: "Details" }).first().click();
  await expect(
    page.getByRole("dialog", { name: "Chef Hand Roll" }),
  ).toBeVisible();
}

async function seedTabletFavorites(page: Page) {
  await page.evaluate(() => {
    window.localStorage.setItem(
      "sushi-bliss:favorites",
      JSON.stringify([
        "otoro-nigiri",
        "spicy-tuna-roll",
        "salmon-sashimi",
        "dragon-roll",
      ]),
    );
    window.dispatchEvent(new Event("sushi-bliss:favorites-changed"));
  });
  await expect(page.getByText("Otoro Nigiri")).toBeVisible();
}

async function openTabletProfilePreferences(page: Page) {
  const profileSection = page.locator("#profile");

  await expect(
    profileSection.getByRole("button", { name: /Add new address/i }),
  ).toBeVisible();
  await profileSection
    .getByRole("button", { name: /Add new address/i })
    .click();
  await expect(
    page.getByRole("heading", { exact: true, name: "Preferences" }),
  ).toBeVisible();
}

async function openTabletSupportHelpCenter(page: Page) {
  const supportSection = page.locator("#support");

  await expect(
    supportSection.getByRole("button", { name: "Help center" }),
  ).toBeVisible();
  await supportSection.getByRole("button", { name: "Help center" }).click();
  await expect(
    supportSection.getByRole("heading", { name: /How can we/i }),
  ).toBeVisible();
}

async function openTabletFaqArticle(page: Page) {
  const supportSection = page.locator("#support");

  await openTabletSupportHelpCenter(page);
  await expect(
    supportSection.getByRole("button", { name: /Track or reorder an order/i }),
  ).toBeVisible();
  await supportSection
    .getByRole("button", { name: /Track or reorder an order/i })
    .click();
  await expect(
    page.getByRole("heading", { name: "Tracking your order" }),
  ).toBeVisible();
}

async function openTabletNotificationDetail(page: Page) {
  const notificationsSection = page.locator("#notifications");

  await expect(
    notificationsSection.getByRole("button", { name: "View" }).first(),
  ).toBeVisible();
  await notificationsSection
    .getByRole("button", { name: "View" })
    .first()
    .click();
  await expect(
    page.getByRole("heading", { name: /Notification detail/i }),
  ).toBeVisible();
}

async function openTabletOfferDetail(page: Page) {
  const offersSection = page.locator("#offers");

  await expect(
    offersSection.getByRole("button", { name: "View details" }),
  ).toBeVisible();
  await offersSection.getByRole("button", { name: "View details" }).click();
  await expect(page.getByText("Offer detail")).toBeVisible();
}

async function openTabletReferralEarn(page: Page) {
  const loyaltySection = page.locator("#loyalty");

  await expect(
    loyaltySection.getByRole("button", { name: "Referral & earn" }),
  ).toBeVisible();
  await loyaltySection.getByRole("button", { name: "Referral & earn" }).click();
  await expect(
    page.getByRole("heading", { name: /Referral & Earn/i }),
  ).toBeVisible();
}

async function openDesktopNigiriCategory(page: Page) {
  const menuSection = page.locator("#menu");

  await expect(
    menuSection.getByRole("navigation", { name: "Desktop menu categories" }),
  ).toBeVisible();
  await menuSection
    .getByRole("button", { exact: true, name: "Nigiri" })
    .click();
  await expect(
    menuSection.getByRole("heading", { exact: true, name: "Nigiri" }),
  ).toBeVisible();
}

async function openDesktopOtoroDetail(page: Page) {
  const menuSection = page.locator("#menu");

  await expect(
    menuSection.getByRole("button", { name: "View details for Otoro Nigiri" }),
  ).toBeVisible();
  await menuSection
    .getByRole("button", { name: "View details for Otoro Nigiri" })
    .first()
    .click();
  await expect(
    page.getByRole("heading", { name: "Otoro Nigiri" }),
  ).toBeVisible();
}

async function openDesktopOtoroCustomization(page: Page) {
  await openDesktopOtoroDetail(page);
  await page.getByRole("button", { name: "Customize" }).click();
  await page
    .getByRole("button", { name: /Increase Otoro Nigiri quantity/i })
    .click();
  await page.getByLabel(/Gold flakes/i).click();
  await page.getByLabel(/Miso soup/i).click();
  await expect(page.getByText("Your selection")).toBeVisible();
}

async function seedDesktopCart(page: Page) {
  const menuSection = page.locator("#menu");
  const itemNames = [
    "Otoro Nigiri",
    "Spicy Tuna Roll",
    "Salmon Sashimi",
    "Dragon Roll",
  ];

  for (const itemName of itemNames) {
    await expect(
      menuSection.getByRole("button", { name: `Add ${itemName} to cart` }),
    ).toBeVisible();
    await menuSection
      .getByRole("button", { name: `Add ${itemName} to cart` })
      .first()
      .click();
  }

  await expect(
    menuSection.getByRole("button", { name: /View cart & checkout/i }),
  ).toBeVisible();
}

async function openDesktopCheckout(page: Page) {
  await seedDesktopCart(page);
  await page
    .getByRole("button", { name: /View cart & checkout/i })
    .first()
    .click();
  await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();
}

async function openDesktopCheckoutReview(page: Page) {
  await openDesktopCheckout(page);
  await page
    .getByRole("button", { name: /Continue to review/i })
    .first()
    .click();
  await expect(page.getByText("Review your order")).toBeVisible();
}

async function openDesktopOrderConfirmation(page: Page) {
  await openDesktopCheckoutReview(page);
  await page.getByRole("button", { name: /Place order/i }).click();
  await expect(page.getByText("Order confirmation")).toBeVisible();
}

async function openDesktopReservationExperience(page: Page) {
  const reservationsSection = page.locator("#reservations");

  await expect(reservationsSection).toBeVisible();
  await reservationsSection
    .getByRole("button", { name: /Open experience chooser/i })
    .click();
  await expect(
    reservationsSection.getByRole("heading", {
      name: /Choose your experience/i,
    }),
  ).toBeVisible();
}

async function openDesktopReservationReview(page: Page) {
  const reservationsSection = page.locator("#reservations");

  await openDesktopReservationExperience(page);
  await reservationsSection
    .getByRole("button", { name: /Continue to confirmation/i })
    .click();
  await expect(
    reservationsSection.getByRole("heading", {
      name: /Review your reservation/i,
    }),
  ).toBeVisible();
}

async function openDesktopReservationHistory(page: Page) {
  const reservationsSection = page.locator("#reservations");

  await expect(reservationsSection).toBeVisible();
  await reservationsSection
    .getByRole("button", { name: /View history/i })
    .click();
  await expect(
    reservationsSection.getByRole("heading", {
      name: /Reservation history/i,
    }),
  ).toBeVisible();
}

async function openDesktopOmakaseReview(page: Page) {
  const omakaseSection = page.locator("#omakase");

  await expect(omakaseSection).toBeVisible();
  await omakaseSection
    .getByRole("button", { name: /Reserve omakase/i })
    .click();
  await expect(
    omakaseSection.getByRole("heading", {
      name: /Omakase\s+Experience/i,
    }),
  ).toBeVisible();
}

async function openDesktopLoyaltyPassRewards(page: Page) {
  const loyaltySection = page.locator("#loyalty");

  await expect(loyaltySection).toBeVisible();
  await loyaltySection.getByRole("button", { name: /View benefits/i }).click();
  await expect(
    loyaltySection.getByRole("heading", { name: /Your member pass/i }),
  ).toBeVisible();
}

async function openDesktopProfileSettings(page: Page) {
  const profileSection = page.locator("#profile");

  await expect(
    profileSection.getByRole("navigation", { name: "Profile dashboard tabs" }),
  ).toBeVisible();
  await profileSection.getByRole("button", { name: "Settings" }).click();
  await expect(
    profileSection.getByRole("heading", { exact: true, name: "My Account" }),
  ).toBeVisible();
}

async function openDesktopHelpCenter(page: Page) {
  const supportSection = page.locator("#support");

  await expect(
    supportSection.getByRole("button", { name: "View all FAQs" }),
  ).toBeVisible();
  await supportSection.getByRole("button", { name: "View all FAQs" }).click();
  await expect(
    supportSection.getByRole("heading", { name: /How can\s+we help/i }),
  ).toBeVisible();
}

async function seedDesktopFavorites(page: Page) {
  await page.evaluate(() => {
    window.localStorage.setItem(
      "sushi-bliss:favorites",
      JSON.stringify([
        "otoro-nigiri",
        "spicy-tuna-roll",
        "dragon-roll",
        "salmon-nigiri",
      ]),
    );
    window.dispatchEvent(new Event("sushi-bliss:favorites-changed"));
  });
  await expect(page.getByText("Otoro Nigiri")).toBeVisible();
}

async function openDesktopReferralEarn(page: Page) {
  const loyaltySection = page.locator("#loyalty");

  await expect(
    loyaltySection.getByRole("button", { name: "Invite friends" }),
  ).toBeVisible();
  await loyaltySection.getByRole("button", { name: "Invite friends" }).click();
  await expect(
    loyaltySection.getByRole("heading", { name: /Refer\s+&\s+Earn/i }),
  ).toBeVisible();
}

async function openDesktopGiftCheckout(page: Page) {
  const giftsSection = page.locator("#gifts");

  await expect(
    giftsSection.getByRole("button", { name: /Continue to review/i }),
  ).toBeVisible();
  await giftsSection
    .getByRole("button", { name: /Continue to review/i })
    .click();
  await expect(
    giftsSection.getByRole("heading", { name: "Gift Checkout" }),
  ).toBeVisible();
}

async function openDesktopGiftConfirmation(page: Page) {
  const giftsSection = page.locator("#gifts");

  await openDesktopGiftCheckout(page);
  await expect(
    giftsSection.getByRole("button", { name: "Purchase gift" }),
  ).toBeVisible();
  await giftsSection.getByRole("button", { name: "Purchase gift" }).click();
  await expect(
    giftsSection.getByRole("heading", {
      name: /Your gift has been confirmed/i,
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
