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
  ],
  paymentMethods: [
    {
      id: "visa-4242",
      brand: "Visa",
      last4: "4242",
      expiresAt: "2028-12",
      isDefault: true,
    },
  ],
  preferences: {
    dietaryTags: ["no shellfish"],
    fulfillmentMode: "pickup",
    marketingOptIn: true,
    orderUpdates: true,
  },
};

export const mockLoyaltyAccount: LoyaltyAccount = {
  id: "loyalty-guest-user",
  userId: mockUser.id,
  points: 1840,
  tier: "gold",
  nextTierPoints: 3000,
};

export const mockNotifications: AppNotification[] = [
  {
    id: "welcome",
    title: "Welcome to Sushi Bliss",
    body: "Your guest profile is ready for the clean rebuild.",
    tone: "premium",
    createdAt: "2026-06-04T00:00:00.000Z",
  },
];
