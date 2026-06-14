import type { LoyaltyAccount } from "@/types/loyalty";
import type { AppNotification } from "@/types/notification";
import type { UserProfile } from "@/types/user";

export const mockUser: UserProfile = {
  id: "guest-user",
  name: "Hiroshi Tanaka",
  email: "hiroshi.tanaka@example.com",
  phone: "+81 3-1234-5678",
  tier: "Gold",
  addresses: [
    {
      id: "home",
      label: "Kai Street",
      line1: "123 Kai Street",
      line2: "Apt 101",
      city: "Minato-ku",
      region: "Tokyo",
      postalCode: "100-0001",
      isDefault: true,
    },
    {
      city: "Shibuya-ku",
      id: "office",
      label: "Shibuya Residence",
      line1: "456 Sakura Avenue",
      postalCode: "150-0002",
      region: "Tokyo",
    },
  ],
  paymentMethods: [
    {
      id: "visa-4242",
      brand: "Visa",
      label: "Personal",
      last4: "4242",
      expiresAt: "2027-08",
      billingPostalCode: "100-0001",
      isDefault: true,
    },
    {
      billingPostalCode: "150-0002",
      brand: "Mastercard",
      expiresAt: "2026-11",
      id: "mastercard-8888",
      label: "Business",
      last4: "8888",
    },
    {
      billingPostalCode: "100-0001",
      brand: "American Express",
      expiresAt: "2026-03",
      id: "amex-1005",
      label: "Omakase",
      last4: "1005",
    },
  ],
  preferences: {
    dietaryTags: ["No Preference"],
    fulfillmentMode: "delivery",
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
  points: 3250,
  tier: "gold",
  nextTierPoints: 4000,
  lifetimePoints: 3250,
  memberCode: "SB12567890",
};

export const mockNotifications: AppNotification[] = [
  {
    body: "Your guest profile is ready for the clean rebuild.",
    category: "support",
    createdAt: "2026-06-04T00:00:00.000Z",
    href: "/support",
    id: "welcome",
    relatedLabel: "Guest profile",
    title: "Welcome to Sushi Bliss",
    tone: "premium",
  },
];
