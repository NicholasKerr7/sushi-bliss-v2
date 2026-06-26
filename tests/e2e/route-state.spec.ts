import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

interface RouteStateTarget {
  name: string;
  prepare?: (page: Page) => Promise<void>;
  projectName: string;
  routePath: string;
  viewport: {
    height: number;
    width: number;
  };
  verify: (page: Page) => Promise<void>;
}

const mobileViewport = { height: 911, width: 430 };

const routeStateTargets: RouteStateTarget[] = [
  {
    name: "mobile welcome",
    projectName: "chromium-mobile",
    routePath: "/",
    viewport: mobileViewport,
    verify: async (page) => {
      await expect(page.locator("#welcome")).toBeVisible();
      await expect(
        page.getByRole("heading", { level: 1, name: "Sushi Bliss" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile home dashboard",
    projectName: "chromium-mobile",
    routePath: "/home",
    viewport: mobileViewport,
    verify: async (page) => {
      const homeSection = page.locator("#home-dashboard");

      await expect(homeSection).toBeVisible();
      await expect(
        homeSection.getByRole("link", {
          name: /Japanese Artistry\.\s+Timeless Bliss\./i,
        }),
      ).toBeVisible();
      await expect(
        homeSection.getByRole("heading", { name: "Nigiri Picks" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile search filter",
    prepare: openMobileSearchFilter,
    projectName: "chromium-mobile",
    routePath: "/menu",
    viewport: mobileViewport,
    verify: async (page) => {
      const menuSection = page.locator("#menu");

      await expect(
        menuSection.getByRole("heading", { name: "Search & Filter" }),
      ).toBeVisible();
      await expect(
        menuSection.getByRole("heading", { name: "Chutoro Nigiri" }),
      ).toBeVisible();
      await expect(
        menuSection.getByRole("heading", { name: "Recent Searches" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile menu overview",
    prepare: seedMobileMenuOverviewCart,
    projectName: "chromium-mobile",
    routePath: "/menu",
    viewport: mobileViewport,
    verify: async (page) => {
      const menuSection = page.locator("#menu");

      await expect(menuSection).toBeVisible();
      await expect(
        menuSection.getByRole("navigation", {
          name: "Mobile menu categories",
        }),
      ).toBeVisible();
      await expect(
        menuSection.getByRole("heading", { name: "Popular Picks" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile menu category nigiri",
    prepare: openMobileNigiriCategory,
    projectName: "chromium-mobile",
    routePath: "/menu",
    viewport: mobileViewport,
    verify: async (page) => {
      const menuSection = page.locator("#menu");

      await expect(
        menuSection.getByRole("heading", { exact: true, name: "Nigiri" }),
      ).toBeVisible();
      await expect(
        menuSection.getByRole("heading", { name: "Otoro Nigiri" }).first(),
      ).toBeVisible();
      await expect(menuSection.getByText("Nigiri Experience")).toBeVisible();
    },
  },
  {
    name: "mobile item detail otoro nigiri",
    prepare: openMobileOtoroDetail,
    projectName: "chromium-mobile",
    routePath: "/menu",
    viewport: mobileViewport,
    verify: async (page) => {
      const dialog = page.getByRole("dialog", { name: "Otoro Nigiri" });

      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("button", { name: /Add 1 to cart/i }),
      ).toBeVisible();
      await expect(
        dialog.getByRole("button", { name: "Customize item" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile item customization",
    prepare: openMobileOtoroCustomization,
    projectName: "chromium-mobile",
    routePath: "/menu",
    viewport: mobileViewport,
    verify: async (page) => {
      const dialog = page.getByRole("dialog", {
        name: "Customize Otoro Nigiri",
      });

      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("heading", { name: "Customize Your Item" }),
      ).toBeVisible();
      await expect(
        dialog.getByRole("heading", { name: "Order summary" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile cart",
    prepare: openMobileCartWithSeededItems,
    projectName: "chromium-mobile",
    routePath: "/menu",
    viewport: mobileViewport,
    verify: async (page) => {
      const dialog = page.getByRole("dialog", { name: "Cart" });

      await expect(dialog).toBeVisible();
      await expect(dialog.getByText("Your Cart")).toBeVisible();
      await expect(
        dialog.getByRole("button", { name: "Checkout" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile checkout delivery pickup",
    prepare: openMobileCheckoutFulfillment,
    projectName: "chromium-mobile",
    routePath: "/menu",
    viewport: mobileViewport,
    verify: async (page) => {
      const dialog = page.getByRole("dialog", { name: "Checkout" });

      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("navigation", { name: "Checkout progress" }),
      ).toBeVisible();
      await expect(
        dialog.getByRole("button", { name: /Delivery/i }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile checkout address",
    prepare: openMobileCheckoutAddress,
    projectName: "chromium-mobile",
    routePath: "/menu",
    viewport: mobileViewport,
    verify: async (page) => {
      const dialog = page.getByRole("dialog", { name: "Checkout" });

      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("heading", { name: "Delivery address" }),
      ).toBeVisible();
      await expect(
        dialog.getByRole("button", { name: "Continue to payment" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile checkout payment",
    prepare: openMobileCheckoutPayment,
    projectName: "chromium-mobile",
    routePath: "/menu",
    viewport: mobileViewport,
    verify: async (page) => {
      const dialog = page.getByRole("dialog", { name: "Checkout" });

      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("heading", { name: "Payment method" }),
      ).toBeVisible();
      await expect(
        dialog.getByRole("button", { name: "Continue to review" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile checkout review",
    prepare: openMobileCheckoutReview,
    projectName: "chromium-mobile",
    routePath: "/menu",
    viewport: mobileViewport,
    verify: async (page) => {
      const dialog = page.getByRole("dialog", { name: "Checkout" });

      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("heading", { name: "Review your order" }),
      ).toBeVisible();
      await expect(
        dialog.getByRole("button", { name: /Place order/i }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile order confirmation",
    prepare: openMobileOrderConfirmation,
    projectName: "chromium-mobile",
    routePath: "/menu",
    viewport: mobileViewport,
    verify: async (page) => {
      const dialog = page.getByRole("dialog", { name: "Order confirmed" });

      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("heading", { name: /Order Confirmed/i }),
      ).toBeVisible();
      await expect(
        dialog.getByRole("link", { name: "Track order" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile orders dashboard",
    projectName: "chromium-mobile",
    routePath: "/orders",
    viewport: mobileViewport,
    verify: async (page) => {
      const ordersSection = page.locator("#orders");

      await expect(ordersSection).toBeVisible();
      await expect(
        ordersSection.getByRole("heading", { name: /My\s+Orders/i }),
      ).toBeVisible();
      await expect(
        ordersSection.getByRole("button", { name: "View Details" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile order details",
    prepare: openMobileOrderDetails,
    projectName: "chromium-mobile",
    routePath: "/orders",
    viewport: mobileViewport,
    verify: async (page) => {
      const ordersSection = page.locator("#orders");

      await expect(
        ordersSection.getByRole("heading", { name: "Order Details" }),
      ).toBeVisible();
      await expect(
        ordersSection.getByRole("heading", { name: "Ordered Items" }),
      ).toBeVisible();
      await expect(
        ordersSection.getByRole("button", { name: "Track Order" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile live order tracking",
    prepare: openMobileLiveOrderTracking,
    projectName: "chromium-mobile",
    routePath: "/orders",
    viewport: mobileViewport,
    verify: async (page) => {
      const ordersSection = page.locator("#orders");

      await expect(
        ordersSection.getByRole("heading", { name: "In Preparation" }),
      ).toBeVisible();
      await expect(ordersSection.getByText("ETA")).toBeVisible();
      await expect(
        ordersSection.getByRole("heading", { name: "Order Summary" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile reservations dashboard",
    projectName: "chromium-mobile",
    routePath: "/reservations",
    viewport: mobileViewport,
    verify: async (page) => {
      const reservationsSection = page.locator("#reservations");

      await expect(reservationsSection).toBeVisible();
      await expect(
        reservationsSection.getByRole("heading", { name: "Reservations" }),
      ).toBeVisible();
      await expect(
        reservationsSection.getByRole("button", { name: "Reserve a Table" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile reservation date time",
    prepare: openMobileReservationDateTime,
    projectName: "chromium-mobile",
    routePath: "/reservations",
    viewport: mobileViewport,
    verify: async (page) => {
      const reservationsSection = page.locator("#reservations");

      await expect(
        reservationsSection.getByRole("heading", {
          name: "Select Your Table Time",
        }),
      ).toBeVisible();
      await expect(
        reservationsSection.getByText("Available Times"),
      ).toBeVisible();
      await expect(
        reservationsSection.getByRole("button", {
          name: /Continue to Experience/i,
        }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile reservation experience",
    prepare: openMobileReservationExperience,
    projectName: "chromium-mobile",
    routePath: "/reservations",
    viewport: mobileViewport,
    verify: async (page) => {
      const reservationsSection = page.locator("#reservations");

      await expect(
        reservationsSection.getByRole("heading", { name: /Choose Your/i }),
      ).toBeVisible();
      await expect(
        reservationsSection.getByRole("button", { name: /Main Dining Room/i }),
      ).toBeVisible();
      await expect(
        reservationsSection.getByRole("button", {
          name: /Continue to Confirm/i,
        }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile reservation review",
    prepare: openMobileReservationReview,
    projectName: "chromium-mobile",
    routePath: "/reservations",
    viewport: mobileViewport,
    verify: async (page) => {
      const reservationsSection = page.locator("#reservations");

      await expect(
        reservationsSection.getByRole("heading", { name: "Confirmation" }),
      ).toBeVisible();
      await expect(
        reservationsSection.getByRole("heading", {
          name: "Reservation Summary",
        }),
      ).toBeVisible();
      await expect(
        reservationsSection.getByRole("button", {
          name: "Confirm Reservation",
        }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile loyalty dashboard",
    projectName: "chromium-mobile",
    routePath: "/loyalty",
    viewport: mobileViewport,
    verify: async (page) => {
      const loyaltySection = page.locator("#loyalty");

      await expect(loyaltySection).toBeVisible();
      await expect(loyaltySection.getByText("Bliss rewards")).toBeVisible();
      await expect(loyaltySection.getByText("Points balance")).toBeVisible();
      await expect(loyaltySection.getByText("Reward catalog")).toBeVisible();
    },
  },
  {
    name: "mobile available rewards",
    prepare: openMobileLoyaltyRewards,
    projectName: "chromium-mobile",
    routePath: "/loyalty",
    viewport: mobileViewport,
    verify: async (page) => {
      const loyaltySection = page.locator("#loyalty");

      await expect(loyaltySection.getByText("Reward catalog")).toBeVisible();
      await expect(
        loyaltySection.getByRole("heading", {
          name: "Available experiences",
        }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile member benefits",
    prepare: openMobileLoyaltyPass,
    projectName: "chromium-mobile",
    routePath: "/loyalty",
    viewport: mobileViewport,
    verify: async (page) => {
      const loyaltySection = page.locator("#loyalty");

      await expect(loyaltySection.getByText("Member pass")).toBeVisible();
      await expect(
        loyaltySection.getByText("Priority pickup windows"),
      ).toBeVisible();
    },
  },
  {
    name: "mobile points activity",
    prepare: openMobileLoyaltyActivity,
    projectName: "chromium-mobile",
    routePath: "/loyalty",
    viewport: mobileViewport,
    verify: async (page) => {
      const loyaltySection = page.locator("#loyalty");

      await expect(
        loyaltySection.getByRole("heading", { name: "Points activity" }),
      ).toBeVisible();
      await expect(
        loyaltySection.getByRole("heading", { name: "Redeemed rewards" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile member pass",
    prepare: openMobileLoyaltyPass,
    projectName: "chromium-mobile",
    routePath: "/loyalty",
    viewport: mobileViewport,
    verify: async (page) => {
      const loyaltySection = page.locator("#loyalty");

      await expect(loyaltySection.getByText("Member pass")).toBeVisible();
      await expect(loyaltySection.getByLabel(/QR code for/i)).toBeVisible();
    },
  },
  {
    name: "mobile profile dashboard",
    projectName: "chromium-mobile",
    routePath: "/profile",
    viewport: mobileViewport,
    verify: async (page) => {
      const profileSection = page.locator("#profile");

      await expect(profileSection).toBeVisible();
      await expect(
        profileSection.getByRole("heading", { name: "Hiroshi Tanaka" }),
      ).toBeVisible();
      await expect(profileSection.getByText("Saved addresses")).toBeVisible();
      await expect(profileSection.getByText("Payment methods")).toBeVisible();
    },
  },
  {
    name: "mobile saved addresses",
    prepare: openMobileProfileAddresses,
    projectName: "chromium-mobile",
    routePath: "/profile",
    viewport: mobileViewport,
    verify: async (page) => {
      const profileSection = page.locator("#profile");

      await expect(
        profileSection.getByRole("heading", {
          exact: true,
          name: "Addresses",
        }),
      ).toBeVisible();
      await expect(profileSection.getByText("Checkout ready")).toBeVisible();
      await expect(profileSection.getByText("Home")).toBeVisible();
    },
  },
  {
    name: "mobile add address",
    prepare: openMobileProfileAddAddress,
    projectName: "chromium-mobile",
    routePath: "/profile",
    viewport: mobileViewport,
    verify: async (page) => {
      const profileSection = page.locator("#profile");

      await expect(
        profileSection.getByRole("heading", { name: "Add address" }),
      ).toBeVisible();
      await expect(profileSection.getByLabel("Street")).toBeVisible();
      await expect(
        profileSection.getByRole("button", { name: "Save" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile payment methods",
    prepare: openMobileProfilePayments,
    projectName: "chromium-mobile",
    routePath: "/profile",
    viewport: mobileViewport,
    verify: async (page) => {
      const profileSection = page.locator("#profile");

      await expect(
        profileSection.getByRole("heading", { name: "Payments" }),
      ).toBeVisible();
      await expect(
        profileSection.getByText("Default card ready"),
      ).toBeVisible();
      await expect(
        profileSection.getByRole("heading", { name: "Visa ending 4242" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile add card",
    prepare: openMobileProfileAddPayment,
    projectName: "chromium-mobile",
    routePath: "/profile",
    viewport: mobileViewport,
    verify: async (page) => {
      const profileSection = page.locator("#profile");

      await expect(
        profileSection.getByRole("heading", { name: "Add payment" }),
      ).toBeVisible();
      await expect(profileSection.getByLabel("Last four")).toBeVisible();
      await expect(
        profileSection.getByRole("button", { name: "Save" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile notifications center",
    projectName: "chromium-mobile",
    routePath: "/notifications",
    viewport: mobileViewport,
    verify: async (page) => {
      const notificationsSection = page.locator("#notifications");

      await expect(notificationsSection).toBeVisible();
      await expect(
        notificationsSection.getByRole("heading", { name: /Alerts/i }),
      ).toBeVisible();
      await expect(
        notificationsSection.getByRole("toolbar", {
          name: "Notification filters",
        }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile dietary preferences",
    prepare: openMobileProfilePreferences,
    projectName: "chromium-mobile",
    routePath: "/profile",
    viewport: mobileViewport,
    verify: async (page) => {
      const profileSection = page.locator("#profile");

      await expect(
        profileSection.getByRole("heading", {
          name: "Preferences & Security",
        }),
      ).toBeVisible();
      await expect(
        profileSection.getByRole("heading", { name: "Dietary preferences" }),
      ).toBeVisible();
      await expect(
        profileSection.getByRole("button", { name: "Gluten-Free" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile reservation history",
    prepare: openMobileReservationHistory,
    projectName: "chromium-mobile",
    routePath: "/reservations",
    viewport: mobileViewport,
    verify: async (page) => {
      const reservationsSection = page.locator("#reservations");

      await expect(
        reservationsSection.getByRole("button", { name: "Past" }),
      ).toBeVisible();
      await expect(
        reservationsSection.getByRole("heading", {
          name: /Wednesday, June 3, 2026/i,
        }),
      ).toBeVisible();
      await expect(
        reservationsSection.getByRole("button", { name: "View" }).first(),
      ).toBeVisible();
    },
  },
  {
    name: "mobile reservation detail",
    prepare: openMobileReservationDetail,
    projectName: "chromium-mobile",
    routePath: "/reservations",
    viewport: mobileViewport,
    verify: async (page) => {
      const reservationsSection = page.locator("#reservations");

      await expect(
        reservationsSection.getByText("Reservation Details"),
      ).toBeVisible();
      await expect(
        reservationsSection.getByRole("button", {
          name: "Modify Reservation",
        }),
      ).toBeVisible();
      await expect(reservationsSection.getByText("Confirmation")).toBeVisible();
    },
  },
  {
    name: "mobile personal information",
    prepare: openMobileProfileAccount,
    projectName: "chromium-mobile",
    routePath: "/profile",
    viewport: mobileViewport,
    verify: async (page) => {
      const profileSection = page.locator("#profile");

      await expect(
        profileSection.getByRole("heading", { name: "Personal Information" }),
      ).toBeVisible();
      await expect(profileSection.getByLabel("Name")).toBeVisible();
      await expect(
        profileSection.getByRole("button", { name: "Save profile" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile account settings",
    prepare: openMobileProfilePreferences,
    projectName: "chromium-mobile",
    routePath: "/profile",
    viewport: mobileViewport,
    verify: async (page) => {
      const profileSection = page.locator("#profile");

      await expect(
        profileSection.getByRole("heading", {
          name: "Preferences & Security",
        }),
      ).toBeVisible();
      await expect(
        profileSection.getByRole("heading", { name: "Notifications" }),
      ).toBeVisible();
      await expect(
        profileSection.getByRole("button", { name: "Log out" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile privacy security",
    prepare: openMobileProfilePreferences,
    projectName: "chromium-mobile",
    routePath: "/profile",
    viewport: mobileViewport,
    verify: async (page) => {
      const profileSection = page.locator("#profile");

      await expect(
        profileSection.getByRole("heading", { name: "Privacy" }),
      ).toBeVisible();
      await expect(
        profileSection.getByRole("switch", { name: "Login alerts" }),
      ).toBeVisible();
      await expect(
        profileSection.getByRole("switch", { name: "Two-factor enabled" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile about story",
    projectName: "chromium-mobile",
    routePath: "/about",
    viewport: mobileViewport,
    verify: async (page) => {
      const aboutSection = page.locator("#about");

      await expect(aboutSection).toBeVisible();
      await expect(
        aboutSection.getByRole("heading", { name: "The Story" }),
      ).toBeVisible();
      await expect(
        aboutSection.getByRole("heading", { name: "Modern sushi house" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile contact support",
    projectName: "chromium-mobile",
    routePath: "/support",
    viewport: mobileViewport,
    verify: async (page) => {
      const supportSection = page.locator("#support");

      await expect(supportSection).toBeVisible();
      await expect(
        supportSection.getByRole("heading", { name: "Support & Help" }),
      ).toBeVisible();
      await expect(supportSection.getByText("Contact methods")).toBeVisible();
      await expect(
        supportSection.getByRole("button", { name: "Send request" }).first(),
      ).toBeVisible();
    },
  },
  {
    name: "mobile help center",
    projectName: "chromium-mobile",
    routePath: "/support",
    viewport: mobileViewport,
    verify: async (page) => {
      const supportSection = page.locator("#support");

      await expect(supportSection.getByText("Help articles")).toBeVisible();
      await expect(
        supportSection.getByRole("heading", {
          name: "Track or reorder an order",
        }),
      ).toBeVisible();
      await expect(
        supportSection.getByRole("button", { name: "Read" }).first(),
      ).toBeVisible();
    },
  },
  {
    name: "mobile support request",
    prepare: openMobileSupportRequest,
    projectName: "chromium-mobile",
    routePath: "/support",
    viewport: mobileViewport,
    verify: async (page) => {
      const supportSection = page.locator("#support");

      await expect(
        supportSection.getByRole("heading", { name: "Send A Note" }),
      ).toBeVisible();
      await expect(supportSection.getByLabel("Topic")).toBeVisible();
      await expect(
        supportSection.getByRole("button", { name: "Send request" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile faq article detail",
    prepare: openMobileSupportArticleDetail,
    projectName: "chromium-mobile",
    routePath: "/support",
    viewport: mobileViewport,
    verify: async (page) => {
      const supportSection = page.locator("#support");

      await expect(supportSection.getByText("Help article")).toBeVisible();
      await expect(
        supportSection.getByRole("heading", { name: "Change a reservation" }),
      ).toBeVisible();
      await expect(
        supportSection.getByRole("button", { name: "Ask concierge" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile notification detail",
    prepare: openMobileNotificationDetail,
    projectName: "chromium-mobile",
    routePath: "/notifications",
    viewport: mobileViewport,
    verify: async (page) => {
      const notificationsSection = page.locator("#notifications");

      await expect(
        notificationsSection.getByRole("heading").first(),
      ).toBeVisible();
      await expect(notificationsSection.getByText("Inbox state")).toBeVisible();
      await expect(
        notificationsSection.getByRole("button", { name: "Done" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile omakase landing",
    projectName: "chromium-mobile",
    routePath: "/omakase",
    viewport: mobileViewport,
    verify: async (page) => {
      const omakaseSection = page.locator("#omakase");

      await expect(omakaseSection).toBeVisible();
      await expect(
        omakaseSection.getByRole("heading", {
          name: /Omakase The Chef's Journey/i,
        }),
      ).toBeVisible();
      await expect(
        omakaseSection.getByText("Experience Preview"),
      ).toBeVisible();
      await expect(
        omakaseSection.getByRole("button", {
          name: /Choose Experience/i,
        }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile omakase package selection",
    prepare: openMobileOmakasePackageSelection,
    projectName: "chromium-mobile",
    routePath: "/omakase",
    viewport: mobileViewport,
    verify: async (page) => {
      const omakaseSection = page.locator("#omakase");

      await expect(
        omakaseSection.getByRole("heading", { name: "Premium" }).first(),
      ).toBeVisible();
      await expect(
        omakaseSection.getByRole("button", { name: /Premium/i }).first(),
      ).toHaveAttribute("aria-pressed", "true");
      await expect(
        omakaseSection.getByRole("button", {
          name: /Choose Experience/i,
        }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile omakase review",
    prepare: openMobileOmakaseReview,
    projectName: "chromium-mobile",
    routePath: "/omakase",
    viewport: mobileViewport,
    verify: async (page) => {
      const omakaseSection = page.locator("#omakase");

      await expect(
        omakaseSection.getByText("Reservation review"),
      ).toBeVisible();
      await expect(
        omakaseSection.getByText("Guests", { exact: true }),
      ).toBeVisible();
      await expect(
        omakaseSection.getByRole("link", { name: "Reserve" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile locations directory",
    projectName: "chromium-mobile",
    routePath: "/locations",
    viewport: mobileViewport,
    verify: async (page) => {
      const locationsSection = page.locator("#locations");

      await expect(
        locationsSection.getByRole("heading", { name: "Restaurant Locations" }),
      ).toBeVisible();
      await expect(
        locationsSection.getByPlaceholder("Search locations..."),
      ).toBeVisible();
      await expect(
        locationsSection.getByRole("button", { name: "View On Map" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile location detail",
    prepare: openMobileLocationDetail,
    projectName: "chromium-mobile",
    routePath: "/locations",
    viewport: mobileViewport,
    verify: async (page) => {
      const locationsSection = page.locator("#locations");

      await expect(
        locationsSection.getByText("Location Details"),
      ).toBeVisible();
      await expect(
        locationsSection.getByRole("heading", { name: "Sushi Bliss Ginza" }),
      ).toBeVisible();
      await expect(
        locationsSection.getByRole("link", { name: "Reserve this location" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile referral earn",
    prepare: openMobileReferralEarn,
    projectName: "chromium-mobile",
    routePath: "/loyalty",
    viewport: mobileViewport,
    verify: async (page) => {
      const loyaltySection = page.locator("#loyalty");

      await expect(
        loyaltySection.getByText("Referral code", { exact: true }),
      ).toBeVisible();
      await expect(
        loyaltySection.getByRole("button", { name: "Copy referral code" }),
      ).toBeVisible();
      await expect(loyaltySection.getByText("Next milestone")).toBeVisible();
    },
  },
  {
    name: "mobile gift experience",
    projectName: "chromium-mobile",
    routePath: "/gifts",
    viewport: mobileViewport,
    verify: async (page) => {
      const giftsSection = page.locator("#gifts");

      await expect(giftsSection).toBeVisible();
      await expect(
        giftsSection.getByRole("heading", { name: "Send Bliss" }),
      ).toBeVisible();
      await expect(giftsSection.getByText("Gift history")).toBeVisible();
      await expect(
        giftsSection.getByRole("button", { name: /Continue/i }).first(),
      ).toBeVisible();
    },
  },
  {
    name: "mobile gift selection",
    projectName: "chromium-mobile",
    routePath: "/gifts",
    viewport: mobileViewport,
    verify: async (page) => {
      const giftsSection = page.locator("#gifts");

      await expect(
        giftsSection
          .getByRole("heading", { name: "Omakase Experience" })
          .first(),
      ).toBeVisible();
      await expect(
        giftsSection.getByRole("button", { name: /Private Dining/i }),
      ).toBeVisible();
      await expect(
        giftsSection.getByRole("button", { name: /Sushi Master Class/i }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile gift checkout recipient",
    prepare: openMobileGiftCheckout,
    projectName: "chromium-mobile",
    routePath: "/gifts",
    viewport: mobileViewport,
    verify: async (page) => {
      const giftsSection = page.locator("#gifts");

      await expect(giftsSection.getByLabel("Recipient name")).toBeVisible();
      await expect(giftsSection.getByLabel("Recipient email")).toBeVisible();
      await expect(
        giftsSection.getByRole("button", { name: /Send gift/i }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile gift checkout payment",
    prepare: openMobileGiftCheckout,
    projectName: "chromium-mobile",
    routePath: "/gifts",
    viewport: mobileViewport,
    verify: async (page) => {
      const giftsSection = page.locator("#gifts");

      await expect(giftsSection.getByText("Payment")).toBeVisible();
      await expect(
        giftsSection.getByRole("button", { name: /Visa ending 4242/i }),
      ).toBeVisible();
      await expect(
        giftsSection.getByRole("button", { name: /Send gift/i }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile gift confirmation",
    prepare: openMobileGiftConfirmation,
    projectName: "chromium-mobile",
    routePath: "/gifts",
    viewport: mobileViewport,
    verify: async (page) => {
      const giftsSection = page.locator("#gifts");

      await expect(
        giftsSection.getByRole("heading", { name: "Pass Sent" }),
      ).toBeVisible();
      await expect(giftsSection.getByText("Gift confirmed")).toBeVisible();
      await expect(
        giftsSection.getByRole("button", { name: "Another" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile promotions offers",
    projectName: "chromium-mobile",
    routePath: "/offers",
    viewport: mobileViewport,
    verify: async (page) => {
      const offersSection = page.locator("#offers");

      await expect(
        offersSection.getByRole("heading", {
          name: "Promotions & Referrals",
        }),
      ).toBeVisible();
      await expect(offersSection.getByText("Current offers")).toBeVisible();
      await expect(
        offersSection.getByRole("button", {
          exact: true,
          name: "View details",
        }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile offer detail",
    prepare: openMobileOfferDetail,
    projectName: "chromium-mobile",
    routePath: "/offers",
    viewport: mobileViewport,
    verify: async (page) => {
      const offersSection = page.locator("#offers");

      await expect(
        offersSection.getByRole("heading", { name: "Omakase Preview" }),
      ).toBeVisible();
      await expect(offersSection.getByText("OMAKASE15")).toBeVisible();
      await expect(
        offersSection.getByRole("heading", { name: "Terms" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile favorites",
    prepare: seedMobileFavorites,
    projectName: "chromium-mobile",
    routePath: "/favorites",
    viewport: mobileViewport,
    verify: async (page) => {
      const favoritesSection = page.locator("#favorites");

      await expect(favoritesSection).toBeVisible();
      await expect(
        favoritesSection.getByRole("heading", { name: "Favorite Dishes" }),
      ).toBeVisible();
      await expect(
        favoritesSection.getByText("Saved signatures"),
      ).toBeVisible();
      await expect(
        favoritesSection.getByRole("button", {
          name: /Add \$12\.00/i,
        }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile saved item detail",
    prepare: openMobileSavedOtoroDetail,
    projectName: "chromium-mobile",
    routePath: "/menu",
    viewport: mobileViewport,
    verify: async (page) => {
      const dialog = page.getByRole("dialog", { name: "Otoro Nigiri" });

      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("button", { name: "Remove favorite" }),
      ).toBeVisible();
      await expect(
        dialog.getByRole("button", { name: /Add 1 to cart/i }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile recently viewed",
    projectName: "chromium-mobile",
    routePath: "/recently-viewed",
    viewport: mobileViewport,
    verify: async (page) => {
      const recentlyViewedSection = page.locator("#recently-viewed");

      await expect(recentlyViewedSection).toBeVisible();
      await expect(
        recentlyViewedSection.getByRole("heading", {
          name: "Recently Viewed",
        }),
      ).toBeVisible();
      await expect(recentlyViewedSection.getByText("Today")).toBeVisible();
      await expect(
        recentlyViewedSection.getByRole("button", { name: "Clear history" }),
      ).toBeVisible();
    },
  },
  {
    name: "mobile empty cart",
    prepare: openMobileEmptyCart,
    projectName: "chromium-mobile",
    routePath: "/menu",
    viewport: mobileViewport,
    verify: async (page) => {
      const dialog = page.getByRole("dialog", { name: "Cart" });

      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("heading", { name: "Your cart is empty" }),
      ).toBeVisible();
      await expect(
        dialog.getByRole("button", { name: "Browse Menu" }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet home dashboard",
    projectName: "chromium-tablet",
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
    name: "tablet search filter",
    prepare: openTabletSearchFilter,
    projectName: "chromium-tablet",
    routePath: "/menu",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const menuSection = page.locator("#menu");

      await expect(
        menuSection.getByRole("heading", { name: "Search & Filter" }),
      ).toBeVisible();
      await expect(
        menuSection.getByText("Recent Searches", { exact: true }).first(),
      ).toBeVisible();
      await expect(
        menuSection.getByRole("heading", { name: "Refine Your Search" }),
      ).toBeVisible();
      await expect(
        menuSection.getByRole("button", { exact: true, name: "Clear Search" }),
      ).toBeVisible();
    },
  },
  {
    name: "tablet menu overview",
    projectName: "chromium-tablet",
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
    name: "tablet menu category nigiri",
    prepare: openTabletNigiriCategory,
    projectName: "chromium-tablet",
    routePath: "/menu",
    viewport: { height: 1448, width: 1086 },
    verify: async (page) => {
      const menuSection = page.locator("#menu");

      await expect(
        menuSection.getByRole("heading", { exact: true, name: "Nigiri" }),
      ).toBeVisible();
      await expect(
        menuSection.getByRole("textbox", { name: "Search nigiri" }),
      ).toBeVisible();
      await expect(
        menuSection.getByRole("heading", { name: "Otoro Nigiri" }),
      ).toBeVisible();
      await expect(menuSection.getByText("Premium Ingredients")).toBeVisible();
    },
  },
  {
    name: "tablet item detail",
    prepare: openTabletOtoroDetail,
    projectName: "chromium-tablet",
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
    prepare: seedDesktopMenuOverviewCart,
    projectName: "chromium-desktop",
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
    prepare: openDesktopNigiriCategoryWithCart,
    projectName: "chromium-desktop",
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
  {
    name: "desktop about our story",
    projectName: "chromium-desktop",
    routePath: "/about",
    viewport: { height: 992, width: 1586 },
    verify: async (page) => {
      const aboutSection = page.locator("#about");

      await expect(aboutSection).toBeVisible();
      await expect(
        aboutSection.getByRole("heading", {
          name: /Crafted with Passion/i,
        }),
      ).toBeVisible();
      await expect(aboutSection.getByText("Our Philosophy")).toBeVisible();
    },
  },
  {
    name: "desktop master chefs team",
    projectName: "chromium-desktop",
    routePath: "/chefs",
    viewport: { height: 992, width: 1586 },
    verify: async (page) => {
      const chefsSection = page.locator("#chefs");

      await expect(chefsSection).toBeVisible();
      await expect(
        chefsSection.getByRole("heading", {
          name: /The Art Behind\s+Every Bite/i,
        }),
      ).toBeVisible();
      await expect(
        chefsSection.getByRole("heading", { name: "Chef Team" }),
      ).toBeVisible();
    },
  },
  {
    name: "desktop sourcing ingredients",
    prepare: openDesktopAboutSourcing,
    projectName: "chromium-desktop",
    routePath: "/about",
    viewport: { height: 992, width: 1586 },
    verify: async (page) => {
      const aboutSection = page.locator("#about");

      await expect(aboutSection.getByText("Trusted Sourcing.")).toBeVisible();
      await expect(aboutSection.getByText("Chef sourcing note")).toBeVisible();
    },
  },
  {
    name: "desktop restaurant atmosphere gallery",
    prepare: openDesktopAboutAtmosphere,
    projectName: "chromium-desktop",
    routePath: "/about",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const aboutSection = page.locator("#about");

      await expect(
        aboutSection.getByRole("heading", { name: /Our\s+Atmosphere/i }),
      ).toBeVisible();
      await expect(aboutSection.getByText("What to expect")).toBeVisible();
    },
  },
  {
    name: "desktop faq article detail",
    prepare: openDesktopFaqArticleDetail,
    projectName: "chromium-desktop",
    routePath: "/support",
    viewport: { height: 992, width: 1586 },
    verify: async (page) => {
      const supportSection = page.locator("#support");

      await expect(
        supportSection.getByRole("heading", {
          name: "How do reservations work?",
        }),
      ).toBeVisible();
      await expect(supportSection.getByText("Related articles")).toBeVisible();
    },
  },
  {
    name: "desktop notification detail",
    prepare: openDesktopNotificationDetail,
    projectName: "chromium-desktop",
    routePath: "/notifications",
    viewport: { height: 992, width: 1586 },
    verify: async (page) => {
      const notificationsSection = page.locator("#notifications");

      await expect(
        notificationsSection.getByRole("heading", { name: "Order Delivered" }),
      ).toBeVisible();
      await expect(
        notificationsSection.getByText("Order details"),
      ).toBeVisible();
      await expect(
        notificationsSection.getByText("Order follow-up"),
      ).toBeVisible();
    },
  },
  {
    name: "desktop offer detail",
    prepare: openDesktopOfferDetail,
    projectName: "chromium-desktop",
    routePath: "/offers",
    viewport: { height: 992, width: 1586 },
    verify: async (page) => {
      const offersSection = page.locator("#offers");

      await expect(
        offersSection.getByRole("heading", { name: "Sakura Dragon Roll" }),
      ).toBeVisible();
      await expect(offersSection.getByText("SAKURA20")).toBeVisible();
    },
  },
  {
    name: "desktop location detail",
    prepare: openDesktopLocationDetail,
    projectName: "chromium-desktop",
    routePath: "/locations",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const locationsSection = page.locator("#locations");

      await expect(
        locationsSection.getByRole("heading", {
          name: "Sushi Bliss Downtown",
        }),
      ).toBeVisible();
      await expect(locationsSection.getByText("Contact details")).toBeVisible();
    },
  },
  {
    name: "desktop modify reservation",
    prepare: openDesktopModifyReservation,
    projectName: "chromium-desktop",
    routePath: "/reservations",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const reservationsSection = page.locator("#reservations");

      await expect(
        reservationsSection.getByRole("heading", {
          name: "Modify Reservation",
        }),
      ).toBeVisible();
      await expect(
        reservationsSection.getByText("Change summary"),
      ).toBeVisible();
    },
  },
  {
    name: "desktop cancel reservation modal",
    prepare: openDesktopCancelReservationModal,
    projectName: "chromium-desktop",
    routePath: "/reservations",
    viewport: { height: 941, width: 1672 },
    verify: async (page) => {
      const dialog = page.getByRole("dialog", { name: "Cancel Reservation" });

      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("button", { name: "Keep reservation" }),
      ).toBeVisible();
      await expect(
        dialog.getByRole("button", { name: "Cancel reservation" }),
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

async function expectVisibleImagesLoaded(page: Page) {
  const getUnloadedVisibleImages = () =>
    page.evaluate(() =>
      Array.from(document.images)
        .filter((image) => {
          const rect = image.getBoundingClientRect();

          return (
            rect.bottom > 0 &&
            rect.right > 0 &&
            rect.top < window.innerHeight &&
            rect.left < window.innerWidth &&
            rect.width > 1 &&
            rect.height > 1
          );
        })
        .filter((image) => Boolean(image.currentSrc))
        .filter((image) => !image.complete || image.naturalWidth === 0)
        .map((image) => ({
          alt: image.alt,
          currentSrc: image.currentSrc,
          naturalWidth: image.naturalWidth,
          src: image.getAttribute("src"),
        })),
    );

  await expect
    .poll(getUnloadedVisibleImages, {
      message: "visible images should finish loading before route validation",
      timeout: 10000,
    })
    .toEqual([]);
}

/** Resets document scroll while preserving deliberate modal scroll states. */
async function normalizeRouteStateScroll(page: Page) {
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const scrollableElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main, section, aside, [data-radix-scroll-area-viewport]",
      ),
    ).filter((element) => !element.closest('[role="dialog"]'));

    for (const element of scrollableElements) {
      if (element.scrollHeight > element.clientHeight) {
        element.scrollTop = 0;
      }
    }
  });
}

async function openMobileSearchFilter(page: Page) {
  const menuSection = page.locator("#menu");
  const searchInput = menuSection.getByRole("textbox", {
    name: "Search menu",
  });

  await expect(searchInput).toBeVisible();
  await searchInput.fill("tuna");
  await expect(
    menuSection.getByRole("heading", { name: "Search & Filter" }),
  ).toBeVisible();
}

async function openMobileNigiriCategory(page: Page) {
  const menuSection = page.locator("#menu");

  await expect(
    menuSection.getByRole("navigation", { name: "Mobile menu categories" }),
  ).toBeVisible();
  await menuSection
    .getByRole("button", { exact: true, name: "Nigiri" })
    .click();
  await expect(
    menuSection.getByRole("heading", { exact: true, name: "Nigiri" }),
  ).toBeVisible();
}

async function openMobileOtoroDetail(page: Page) {
  const menuSection = page.locator("#menu");

  await expect(
    menuSection.getByRole("heading", { name: "Otoro Nigiri" }).first(),
  ).toBeVisible();
  await menuSection
    .getByRole("button", { name: /Otoro Nigiri/i })
    .first()
    .click();
  await expect(
    page.getByRole("dialog", { name: "Otoro Nigiri" }),
  ).toBeVisible();
}

async function openMobileOtoroCustomization(page: Page) {
  await openMobileOtoroDetail(page);
  await page
    .getByRole("dialog", { name: "Otoro Nigiri" })
    .getByRole("button", { name: "Customize item" })
    .click();

  const dialog = page.getByRole("dialog", { name: "Customize Otoro Nigiri" });

  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: "Customize Your Item" }),
  ).toBeVisible();
  await dialog.getByRole("button", { name: /Gold flakes/i }).click();
}

async function seedMobileCart(page: Page) {
  await page.evaluate(() => {
    const defaultCustomizations = [
      {
        groupId: "wasabi",
        groupLabel: "Wasabi",
        optionId: "chef-balance",
        optionLabel: "Chef balance",
      },
      {
        groupId: "soy",
        groupLabel: "Soy",
        optionId: "house",
        optionLabel: "House soy",
      },
      {
        groupId: "cut",
        groupLabel: "Cut",
        optionId: "classic",
        optionLabel: "Classic",
      },
    ];
    const customizationId = "cut:classic,soy:house,wasabi:chef-balance";
    const items = ["otoro-nigiri", "spicy-tuna-roll", "salmon-nigiri"].map(
      (menuItemId) => ({
        addOns: [],
        customizations: defaultCustomizations,
        id: `${menuItemId}|${customizationId}`,
        menuItemId,
        quantity: 1,
      }),
    );

    window.localStorage.setItem("sushi-bliss:cart", JSON.stringify(items));
    window.dispatchEvent(new Event("sushi-bliss:cart-changed"));
  });
}

async function seedMobileMenuOverviewCart(page: Page) {
  await page.evaluate(() => {
    const defaultCustomizations = [
      {
        groupId: "wasabi",
        groupLabel: "Wasabi",
        optionId: "chef-balance",
        optionLabel: "Chef balance",
      },
      {
        groupId: "soy",
        groupLabel: "Soy",
        optionId: "house",
        optionLabel: "House soy",
      },
      {
        groupId: "cut",
        groupLabel: "Cut",
        optionId: "classic",
        optionLabel: "Classic",
      },
    ];
    const customizationId = "cut:classic,soy:house,wasabi:chef-balance";
    const items = ["otoro-nigiri", "spicy-tuna-roll"].map((menuItemId) => ({
      addOns: [],
      customizations: defaultCustomizations,
      id: `${menuItemId}|${customizationId}`,
      menuItemId,
      quantity: 1,
    }));

    window.localStorage.setItem("sushi-bliss:cart", JSON.stringify(items));
    window.dispatchEvent(new Event("sushi-bliss:cart-changed"));
  });

  await expect(
    page.locator("#menu").getByRole("button", { name: /Open cart with/i }),
  ).toBeVisible();
}

async function openMobileCartWithSeededItems(page: Page) {
  const menuSection = page.locator("#menu");

  await seedMobileCart(page);
  await expect(
    menuSection.getByRole("button", { name: /Open cart/i }),
  ).toBeVisible();
  await menuSection.getByRole("button", { name: /Open cart/i }).click();
  await expect(page.getByRole("dialog", { name: "Cart" })).toBeVisible();
}

async function openMobileCheckoutFulfillment(page: Page) {
  const cartDialog = page.getByRole("dialog", { name: "Cart" });

  await openMobileCartWithSeededItems(page);
  await cartDialog.getByRole("button", { name: "Checkout" }).click();
  await expect(page.getByRole("dialog", { name: "Checkout" })).toBeVisible();
}

async function openMobileCheckoutAddress(page: Page) {
  const checkoutDialog = page.getByRole("dialog", { name: "Checkout" });

  await openMobileCheckoutFulfillment(page);
  await checkoutDialog.getByRole("button", { name: "Continue" }).click();
  await expect(
    checkoutDialog.getByRole("heading", { name: "Delivery address" }),
  ).toBeVisible();
}

async function openMobileCheckoutPayment(page: Page) {
  const checkoutDialog = page.getByRole("dialog", { name: "Checkout" });

  await openMobileCheckoutAddress(page);
  await checkoutDialog
    .getByRole("button", { name: "Continue to payment" })
    .click();
  await expect(
    checkoutDialog.getByRole("heading", { name: "Payment method" }),
  ).toBeVisible();
  await setMobileCheckoutRouteScroll(page, 24);
}

async function openMobileCheckoutReview(page: Page) {
  const checkoutDialog = page.getByRole("dialog", { name: "Checkout" });

  await openMobileCheckoutPayment(page);
  await checkoutDialog
    .getByRole("button", { name: "Continue to review" })
    .click();
  await expect(
    checkoutDialog.getByRole("heading", { name: "Review your order" }),
  ).toBeVisible();
  await setMobileCheckoutRouteScroll(page, "bottom");
}

/**
 * Pins the mobile checkout panel to deliberate review checkpoints after step changes.
 * React swaps step content while preserving the modal viewport, so explicit offsets
 * keep route states stable across isolated and full-suite runs.
 */
async function setMobileCheckoutRouteScroll(
  page: Page,
  position: "bottom" | number,
) {
  const scrollArea = page.locator(
    '[role="dialog"][aria-label="Checkout"] .smooth-scroll-area',
  );

  await expect(scrollArea).toBeVisible();
  await scrollArea.evaluate((element, nextPosition) => {
    element.scrollTop =
      nextPosition === "bottom"
        ? element.scrollHeight - element.clientHeight
        : nextPosition;
  }, position);
}

async function openMobileOrderConfirmation(page: Page) {
  const checkoutDialog = page.getByRole("dialog", { name: "Checkout" });

  await openMobileCheckoutReview(page);
  await checkoutDialog.getByRole("button", { name: /Place order/i }).click();
  await expect(
    page.getByRole("dialog", { name: "Order confirmed" }),
  ).toBeVisible();
}

async function openMobileOrderDetails(page: Page) {
  const ordersSection = page.locator("#orders");

  await expect(
    ordersSection.getByRole("button", { name: "View Details" }),
  ).toBeVisible();
  await expect(async () => {
    await ordersSection.getByRole("button", { name: "View Details" }).click();
    await expect(
      ordersSection.getByRole("heading", { name: "Order Details" }),
    ).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 10000 });
}

async function openMobileLiveOrderTracking(page: Page) {
  const ordersSection = page.locator("#orders");

  await openMobileOrderDetails(page);
  await expect(async () => {
    await ordersSection.getByRole("button", { name: "Track Order" }).click();
    await expect(
      ordersSection.getByRole("heading", { name: "In Preparation" }),
    ).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 10000 });
}

async function openMobileReservationDateTime(page: Page) {
  const reservationsSection = page.locator("#reservations");

  await expect(
    reservationsSection.getByRole("button", { name: "Reserve a Table" }),
  ).toBeVisible();
  await expect(async () => {
    await reservationsSection
      .getByRole("button", { name: "Reserve a Table" })
      .click({ force: true });
    await expect(
      reservationsSection.getByRole("heading", {
        name: "Select Your Table Time",
      }),
    ).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 10000 });
}

async function openMobileReservationExperience(page: Page) {
  const reservationsSection = page.locator("#reservations");

  await openMobileReservationDateTime(page);
  await reservationsSection
    .getByRole("button", { name: /Continue to Experience/i })
    .click();
  await expect(
    reservationsSection.getByRole("heading", { name: /Choose Your/i }),
  ).toBeVisible();
}

async function openMobileReservationReview(page: Page) {
  const reservationsSection = page.locator("#reservations");

  await openMobileReservationExperience(page);
  await reservationsSection
    .getByRole("button", { name: /Continue to Confirm/i })
    .click();
  await expect(
    reservationsSection.getByRole("heading", { name: "Confirmation" }),
  ).toBeVisible();
}

async function openMobileLoyaltyRewards(page: Page) {
  const loyaltySection = page.locator("#loyalty");

  await expect(
    loyaltySection.getByRole("button", { name: "Rewards" }),
  ).toBeVisible();
  await loyaltySection.getByRole("button", { name: "Rewards" }).click();
  await expect(
    loyaltySection.getByRole("heading", { name: "Available experiences" }),
  ).toBeVisible();
}

async function openMobileLoyaltyPass(page: Page) {
  const loyaltySection = page.locator("#loyalty");

  await expect(
    loyaltySection.getByRole("button", { name: "Pass" }),
  ).toBeVisible();
  await loyaltySection.getByRole("button", { name: "Pass" }).click();
  await expect(loyaltySection.getByText("Member pass")).toBeVisible();
}

async function openMobileLoyaltyActivity(page: Page) {
  const loyaltySection = page.locator("#loyalty");

  await expect(
    loyaltySection.getByRole("button", { name: "Activity" }),
  ).toBeVisible();
  await loyaltySection.getByRole("button", { name: "Activity" }).click();
  await expect(loyaltySection.getByText("Points activity")).toBeVisible();
}

async function openMobileProfileSurface(page: Page, name: string) {
  const profileSection = page.locator("#profile");
  const surfaceButton = profileSection.getByRole("button", { name }).first();

  await expect(surfaceButton).toBeVisible();
  await surfaceButton.scrollIntoViewIfNeeded();
  await surfaceButton.click();
}

async function openMobileProfileAddresses(page: Page) {
  const profileSection = page.locator("#profile");

  await openMobileProfileSurface(page, "Saved addresses");
  await expect(
    profileSection.getByRole("heading", { exact: true, name: "Addresses" }),
  ).toBeVisible();
}

async function openMobileProfileAddAddress(page: Page) {
  const profileSection = page.locator("#profile");

  await openMobileProfileAddresses(page);
  await profileSection.getByLabel("Add address").click();
  await expect(
    profileSection.getByRole("heading", { name: "Add address" }),
  ).toBeVisible();
}

async function openMobileProfilePayments(page: Page) {
  const profileSection = page.locator("#profile");

  await openMobileProfileSurface(page, "Payment methods");
  await expect(
    profileSection.getByRole("heading", { name: "Payments" }),
  ).toBeVisible();
}

async function openMobileProfileAddPayment(page: Page) {
  const profileSection = page.locator("#profile");

  await openMobileProfilePayments(page);
  await profileSection.getByLabel("Add payment method").click();
  await expect(
    profileSection.getByRole("heading", { name: "Add payment" }),
  ).toBeVisible();
}

async function openMobileProfilePreferences(page: Page) {
  const profileSection = page.locator("#profile");

  await openMobileProfileSurface(page, "Preferences & security");
  await expect(
    profileSection.getByRole("heading", { name: "Preferences & Security" }),
  ).toBeVisible();
}

async function openMobileReservationHistory(page: Page) {
  const reservationsSection = page.locator("#reservations");

  await expect(
    reservationsSection.getByRole("button", { name: "History" }),
  ).toBeVisible();
  await reservationsSection.getByRole("button", { name: "History" }).click();
  await expect(
    reservationsSection.getByRole("button", { name: "Past" }),
  ).toHaveAttribute("aria-pressed", "true");
}

async function openMobileReservationDetail(page: Page) {
  const reservationsSection = page.locator("#reservations");

  await expect(
    reservationsSection.getByRole("button", { name: "View Next" }),
  ).toBeVisible();
  await reservationsSection.getByRole("button", { name: "View Next" }).click();
  await expect(
    reservationsSection.getByText("Reservation Details"),
  ).toBeVisible();
}

async function openMobileProfileAccount(page: Page) {
  const profileSection = page.locator("#profile");

  await openMobileProfileSurface(page, "Account information");
  await expect(
    profileSection.getByRole("heading", { name: "Personal Information" }),
  ).toBeVisible();
}

async function openMobileSupportRequest(page: Page) {
  const supportSection = page.locator("#support");

  await expect(
    supportSection.getByRole("button", { name: "Send request" }).first(),
  ).toBeVisible();
  await supportSection
    .getByRole("button", { name: "Send request" })
    .first()
    .click();
  await expect(
    supportSection.getByRole("heading", { name: "Send A Note" }),
  ).toBeVisible();
}

async function openMobileSupportArticleDetail(page: Page) {
  const supportSection = page.locator("#support");
  const reservationArticleButton = supportSection
    .getByRole("button", { name: "Read" })
    .nth(1);

  await expect(async () => {
    await expect(reservationArticleButton).toBeVisible();
    await reservationArticleButton.click({ force: true });
    await expect(
      supportSection.getByText("Help article", { exact: true }),
    ).toBeVisible();
    await expect(
      supportSection.getByRole("heading", { name: "Change a reservation" }),
    ).toBeVisible();
    await expect(
      supportSection.getByRole("button", { name: "Ask concierge" }),
    ).toBeVisible();
  }).toPass();
}

async function openMobileNotificationDetail(page: Page) {
  const notificationsSection = page.locator("#notifications");
  const firstDetailsButton = notificationsSection
    .getByRole("button", { name: "Details" })
    .first();

  await expect(async () => {
    await expect(firstDetailsButton).toBeVisible();
    await firstDetailsButton.click({ force: true });
    await expect(
      notificationsSection.getByText("Inbox state", { exact: true }),
    ).toBeVisible();
    await expect(
      notificationsSection.getByRole("button", { name: "Done" }),
    ).toBeVisible();
  }).toPass();
}

async function openMobileOmakasePackageSelection(page: Page) {
  const omakaseSection = page.locator("#omakase");
  const premiumPackageButton = omakaseSection
    .getByRole("button", {
      name: /Luxury seafood and wagyu omakase selection.*Premium/i,
    })
    .first();

  await expect(async () => {
    await expect(premiumPackageButton).toBeVisible();
    await premiumPackageButton.click({ force: true });
    await expect(premiumPackageButton).toHaveAttribute("aria-pressed", "true");
  }).toPass();
}

async function openMobileOmakaseReview(page: Page) {
  const omakaseSection = page.locator("#omakase");

  await openMobileOmakasePackageSelection(page);
  await expect(
    omakaseSection.getByRole("button", {
      name: /Choose Experience/i,
    }),
  ).toBeVisible();
  await omakaseSection
    .getByRole("button", { name: /Choose Experience/i })
    .click();
  await expect(omakaseSection.getByText("Reservation review")).toBeVisible();
}

async function openMobileLocationDetail(page: Page) {
  const locationsSection = page.locator("#locations");

  await expect(
    locationsSection.getByLabel("View Sushi Bliss Ginza details"),
  ).toBeVisible();
  await expect(async () => {
    await locationsSection
      .getByLabel("View Sushi Bliss Ginza details")
      .click({ force: true });
    await expect(locationsSection.getByText("Location Details")).toBeVisible({
      timeout: 1000,
    });
  }).toPass({ timeout: 10000 });
}

async function openMobileReferralEarn(page: Page) {
  const loyaltySection = page.locator("#loyalty");

  await expect(
    loyaltySection.getByRole("button", { name: "Refer" }),
  ).toBeVisible();
  await loyaltySection.getByRole("button", { name: "Refer" }).click();
  await expect(
    loyaltySection.getByText("Referral code", { exact: true }),
  ).toBeVisible();
}

async function openMobileGiftCheckout(page: Page) {
  await page.goto("/gifts", { waitUntil: "domcontentloaded" });

  const giftsSection = page.locator("#gifts");
  const recipientNameField = giftsSection.getByLabel("Recipient name");
  const recipientEmailField = giftsSection.getByLabel("Recipient email");
  const continueButton = giftsSection
    .getByRole("button", { name: /Continue/i })
    .first();

  await expect(giftsSection).toBeVisible();
  await expect(
    giftsSection.getByRole("heading", { name: "Send Bliss" }),
  ).toBeVisible();

  await expect(async () => {
    if (await recipientNameField.isVisible().catch(() => false)) {
      return;
    }

    await expect(continueButton).toBeVisible();
    await continueButton.scrollIntoViewIfNeeded();
    await continueButton.click();
    await expect(recipientNameField).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 10000 });

  await expect(recipientNameField).toBeVisible();
  await expect(recipientEmailField).toBeVisible();
}

async function openMobileGiftConfirmation(page: Page) {
  const giftsSection = page.locator("#gifts");

  await openMobileGiftCheckout(page);
  await giftsSection.getByLabel("Recipient name").fill("Alex Johnson");
  await giftsSection.getByLabel("Recipient email").fill("alex@example.com");
  await giftsSection.getByRole("button", { name: /Send gift/i }).click();
  await expect(
    giftsSection.getByRole("heading", { name: "Pass Sent" }),
  ).toBeVisible();
}

async function openMobileOfferDetail(page: Page) {
  const offersSection = page.locator("#offers");
  const featuredOfferDetailsButton = offersSection.getByRole("button", {
    exact: true,
    name: "View details",
  });

  await expect(featuredOfferDetailsButton).toBeVisible();
  await featuredOfferDetailsButton.click();
  await expect(
    offersSection.getByRole("heading", { name: "Omakase Preview" }),
  ).toBeVisible();
}

async function seedMobileFavorites(page: Page) {
  await page.evaluate(() => {
    window.localStorage.setItem(
      "sushi-bliss:favorites",
      JSON.stringify(["otoro-nigiri", "uni-nigiri", "dragon-roll"]),
    );
    window.dispatchEvent(new Event("sushi-bliss:favorites-changed"));
  });
  await expect(page.getByText("Otoro Nigiri")).toBeVisible();
}

async function openMobileSavedOtoroDetail(page: Page) {
  await openMobileOtoroDetail(page);

  const dialog = page.getByRole("dialog", { name: "Otoro Nigiri" });

  await expect(
    dialog.getByRole("button", { name: "Save favorite" }),
  ).toBeVisible();
  await dialog.getByRole("button", { name: "Save favorite" }).click();
  await expect(
    dialog.getByRole("button", { name: "Remove favorite" }),
  ).toBeVisible();
}

async function openMobileEmptyCart(page: Page) {
  const menuSection = page.locator("#menu");
  const dialog = page.getByRole("dialog", { name: "Cart" });

  await expect(
    menuSection.getByRole("button", { name: "Add Otoro Nigiri to cart" }),
  ).toBeVisible();
  await menuSection
    .getByRole("button", { name: "Add Otoro Nigiri to cart" })
    .click();
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("button", { name: "Remove Otoro Nigiri" }),
  ).toBeVisible();
  await dialog.getByRole("button", { name: "Remove Otoro Nigiri" }).click();
  await expect(
    dialog.getByRole("heading", { name: "Your cart is empty" }),
  ).toBeVisible();
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

async function openTabletSearchFilter(page: Page) {
  const menuSection = page.locator("#menu");

  await expect(
    menuSection.getByRole("textbox", { name: "Search menu items" }),
  ).toBeVisible();
  await menuSection
    .getByRole("textbox", { name: "Search menu items" })
    .fill("tuna");
  await expect(
    menuSection.getByRole("heading", { name: "Search & Filter" }),
  ).toBeVisible();
}

async function openTabletNigiriCategory(page: Page) {
  const menuSection = page.locator("#menu");

  await expect(
    menuSection.getByRole("button", { name: "Nigiri" }).first(),
  ).toBeVisible();
  await menuSection.getByRole("button", { name: "Nigiri" }).first().click();
  await expect(
    menuSection.getByRole("heading", { exact: true, name: "Nigiri" }),
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
  const featuredOfferDetailsButton = offersSection.getByRole("button", {
    exact: true,
    name: "View details",
  });

  await expect(featuredOfferDetailsButton).toBeVisible();
  await featuredOfferDetailsButton.click();
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

async function openDesktopNigiriCategoryWithCart(page: Page) {
  await seedDesktopNigiriCategoryCart(page);
  await openDesktopNigiriCategory(page);
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

async function seedDesktopMenuOverviewCart(page: Page) {
  await page.evaluate(() => {
    const defaultCustomizations = [
      {
        groupId: "wasabi",
        groupLabel: "Wasabi",
        optionId: "chef-balance",
        optionLabel: "Chef balance",
      },
      {
        groupId: "soy",
        groupLabel: "Soy",
        optionId: "house",
        optionLabel: "House soy",
      },
      {
        groupId: "cut",
        groupLabel: "Cut",
        optionId: "classic",
        optionLabel: "Classic",
      },
    ];
    const customizationId = "cut:classic,soy:house,wasabi:chef-balance";
    const items = [
      ["otoro-nigiri", 2],
      ["spicy-tuna-roll", 1],
      ["salmon-nigiri", 1],
      ["dragon-roll", 1],
    ].map(([menuItemId, quantity]) => ({
      addOns: [],
      customizations: defaultCustomizations,
      id: `${menuItemId}|${customizationId}`,
      menuItemId,
      quantity,
    }));

    window.localStorage.setItem("sushi-bliss:cart", JSON.stringify(items));
    window.dispatchEvent(new Event("sushi-bliss:cart-changed"));
  });

  await expect(
    page
      .locator("#menu")
      .getByRole("complementary")
      .getByRole("heading", { exact: true, name: "Otoro Nigiri" }),
  ).toBeVisible();
}

async function seedDesktopNigiriCategoryCart(page: Page) {
  await page.evaluate(() => {
    const defaultCustomizations = [
      {
        groupId: "wasabi",
        groupLabel: "Wasabi",
        optionId: "chef-balance",
        optionLabel: "Chef balance",
      },
      {
        groupId: "soy",
        groupLabel: "Soy",
        optionId: "house",
        optionLabel: "House soy",
      },
      {
        groupId: "cut",
        groupLabel: "Cut",
        optionId: "classic",
        optionLabel: "Classic",
      },
    ];
    const customizationId = "cut:classic,soy:house,wasabi:chef-balance";
    const items = [
      ["otoro-nigiri", 1],
      ["spicy-tuna-roll", 1],
      ["salmon-nigiri", 1],
      ["tamago-nigiri", 1],
    ].map(([menuItemId, quantity]) => ({
      addOns: [],
      customizations: defaultCustomizations,
      id: `${menuItemId}|${customizationId}`,
      menuItemId,
      quantity,
    }));

    window.localStorage.setItem("sushi-bliss:cart", JSON.stringify(items));
    window.dispatchEvent(new Event("sushi-bliss:cart-changed"));
  });

  await expect(
    page
      .locator("#menu")
      .getByRole("complementary")
      .getByRole("heading", { exact: true, name: "Otoro Nigiri" }),
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

async function openDesktopAboutSourcing(page: Page) {
  const aboutSection = page.locator("#about");

  await expect(
    aboutSection.getByRole("button", { name: "Sourcing & Ingredients" }),
  ).toBeVisible();
  await aboutSection
    .getByRole("button", { name: "Sourcing & Ingredients" })
    .click();
  await expect(aboutSection.getByText("Trusted Sourcing.")).toBeVisible();
}

async function openDesktopAboutAtmosphere(page: Page) {
  const aboutSection = page.locator("#about");

  await expect(
    aboutSection.getByRole("button", { name: "Atmosphere" }),
  ).toBeVisible();
  await aboutSection.getByRole("button", { name: "Atmosphere" }).click();
  await expect(
    aboutSection.getByRole("heading", { name: /Our\s+Atmosphere/i }),
  ).toBeVisible();
}

async function openDesktopFaqArticleDetail(page: Page) {
  const supportSection = page.locator("#support");

  await openDesktopHelpCenter(page);
  await expect(
    supportSection.getByRole("button", { name: /Change a reservation/i }),
  ).toBeVisible();
  await supportSection
    .getByRole("button", { name: /Change a reservation/i })
    .click();
  await expect(
    supportSection.getByRole("heading", {
      name: "How do reservations work?",
    }),
  ).toBeVisible();
}

async function openDesktopNotificationDetail(page: Page) {
  const notificationsSection = page.locator("#notifications");

  await expect(
    notificationsSection.getByRole("button", { name: "Track order" }).first(),
  ).toBeVisible();
  await notificationsSection
    .getByRole("button", { name: "Track order" })
    .first()
    .click();
  await expect(
    notificationsSection.getByRole("heading", { name: "Order Delivered" }),
  ).toBeVisible();
}

async function openDesktopOfferDetail(page: Page) {
  const offersSection = page.locator("#offers");

  await expect(
    offersSection.getByRole("button", { name: "View offer details" }),
  ).toBeVisible();
  await offersSection
    .getByRole("button", { name: "View offer details" })
    .click();
  await expect(
    offersSection.getByRole("heading", { name: "Sakura Dragon Roll" }),
  ).toBeVisible();
}

async function openDesktopLocationDetail(page: Page) {
  const locationsSection = page.locator("#locations");

  await expect(
    locationsSection.getByRole("button", { name: "Details" }).first(),
  ).toBeVisible();
  await locationsSection
    .getByRole("button", { name: "Details" })
    .first()
    .click();
  await expect(
    locationsSection.getByRole("heading", {
      name: "Sushi Bliss Downtown",
    }),
  ).toBeVisible();
}

async function openDesktopModifyReservation(page: Page) {
  const reservationsSection = page.locator("#reservations");

  await openDesktopReservationHistory(page);
  await expect(
    reservationsSection.getByRole("button", { name: /Modify reservation/i }),
  ).toBeVisible();
  await reservationsSection
    .getByRole("button", { name: /Modify reservation/i })
    .click();
  await expect(
    reservationsSection.getByRole("heading", {
      name: "Modify Reservation",
    }),
  ).toBeVisible();
}

async function openDesktopCancelReservationModal(page: Page) {
  const reservationsSection = page.locator("#reservations");

  await openDesktopModifyReservation(page);
  await reservationsSection
    .getByRole("button", { name: "Cancel reservation" })
    .click();
  await expect(
    page.getByRole("dialog", { name: "Cancel Reservation" }),
  ).toBeVisible();
}

test.describe("route state audit", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
  });

  for (const target of routeStateTargets) {
    test(`validates ${target.name} route state`, async ({ page }, testInfo) => {
      test.skip(
        testInfo.project.name !== target.projectName,
        `${target.name} is audited by ${target.projectName}`,
      );

      await page.setViewportSize(target.viewport);
      await page.goto(target.routePath, { waitUntil: "domcontentloaded" });
      await page.waitForFunction(() => document.fonts.status === "loaded");
      await target.prepare?.(page);

      await expectNoFrameworkErrorOverlay(page);
      await target.verify(page);
      await normalizeRouteStateScroll(page);
      await expectVisibleImagesLoaded(page);
      await expectNoHorizontalOverflow(page, target.routePath);
    });
  }
});
