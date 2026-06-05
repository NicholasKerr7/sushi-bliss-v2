import type { LoyaltyAccount } from "@/types/loyalty";
import type { AppNotification } from "@/types/notification";
import type { UserProfile } from "@/types/user";

export const mockUser: UserProfile = {
  id: "guest-user",
  name: "Guest Diner",
  email: "guest@sushibliss.example",
  phone: "+1 555 0100",
  tier: "Gold",
  addresses: [
    {
      id: "home",
      label: "Home",
      line1: "120 Sakura Street",
      city: "New York",
      region: "NY",
      postalCode: "10013",
      isDefault: true,
    },
    {
      city: "New York",
      id: "office",
      label: "Office",
      line1: "88 Pearl Street",
      line2: "Floor 14",
      postalCode: "10004",
      region: "NY",
    },
  ],
  paymentMethods: [
    {
      id: "visa-4242",
      brand: "Visa",
      label: "Personal",
      last4: "4242",
      expiresAt: "2028-12",
      billingPostalCode: "10013",
      isDefault: true,
    },
    {
      billingPostalCode: "10004",
      brand: "Mastercard",
      expiresAt: "2027-09",
      id: "mastercard-1881",
      label: "Business",
      last4: "1881",
    },
  ],
  preferences: {
    dietaryTags: ["no shellfish", "low sodium"],
    fulfillmentMode: "pickup",
    marketingOptIn: true,
    notifications: {
      conciergeMessages: true,
      offerAlerts: true,
      orderUpdates: true,
      reservationReminders: true,
      rewardAlerts: true,
    },
    privacy: {
      loginAlerts: true,
      personalizedRecommendations: true,
      shareDiningHistory: false,
      twoFactorEnabled: false,
    },
  },
};

export const mockLoyaltyAccount: LoyaltyAccount = {
  id: "loyalty-guest-user",
  userId: mockUser.id,
  points: 1840,
  tier: "gold",
  nextTierPoints: 3000,
  lifetimePoints: 1840,
  memberCode: "SB-GOLD-8421",
};

export const mockNotifications: AppNotification[] = [
  {
    body: "Your guest profile is ready for the clean rebuild.",
    category: "support",
    createdAt: "2026-06-04T00:00:00.000Z",
    href: "#support",
    id: "welcome",
    relatedLabel: "Guest profile",
    title: "Welcome to Sushi Bliss",
    tone: "premium",
  },
];
