import { mockLoyaltyAccount } from "@/data/mockUser";
import type {
  LoyaltyState,
  LoyaltyTierDefinition,
  LoyaltyTransaction,
  ReferralProgress,
  Reward,
} from "@/types/loyalty";

export const loyaltyTiers: LoyaltyTierDefinition[] = [
  {
    benefits: ["Priority pickup windows", "Birthday hand roll"],
    id: "jade",
    label: "Jade",
    minimumPoints: 0,
  },
  {
    benefits: ["Chef counter waitlist", "Monthly sake pairing"],
    id: "gold",
    label: "Gold",
    minimumPoints: 1500,
  },
  {
    benefits: ["Omakase preview invites", "Private dining concierge"],
    id: "omakase",
    label: "Omakase",
    minimumPoints: 3000,
  },
];

export const rewards: Reward[] = [
  {
    category: "dining",
    description: "Redeem for a chef-selected hand roll on any pickup order.",
    id: "hand-roll-reward",
    imageUrl: "/assets/menu/sushi/spicy-tuna-roll.webp",
    isAvailable: true,
    pointsCost: 450,
    terms: "Valid once per order. Cannot be combined with another reward.",
    title: "Chef Hand Roll",
  },
  {
    category: "upgrade",
    description: "Add a seasonal sake pairing flight to a dine-in reservation.",
    id: "sake-flight-upgrade",
    imageUrl: "/assets/editorial/luxurious-japanese-sake-still-life.webp",
    isAvailable: true,
    pointsCost: 900,
    terms: "Reservation required. Guests must be 21+ with valid ID.",
    title: "Sake Flight Upgrade",
  },
  {
    category: "experience",
    description: "Reserve early access to the next seasonal omakase preview.",
    id: "omakase-preview-access",
    imageUrl: "/assets/editorial/premium-sushi-preparation-still-life.webp",
    isAvailable: true,
    pointsCost: 1600,
    terms: "Subject to seat availability. One redemption per member.",
    title: "Omakase Preview Access",
  },
  {
    category: "upgrade",
    description: "Unlock a premium toro garnish on your next nigiri set.",
    id: "toro-garnish",
    imageUrl: "/assets/menu/sushi/deluxe-toro-caviar-nigiri.webp",
    isAvailable: false,
    pointsCost: 2200,
    terms: "Temporarily paused while seasonal toro allocation is limited.",
    title: "Toro Garnish Upgrade",
  },
];

export const initialLoyaltyTransactions: LoyaltyTransaction[] = [
  {
    createdAt: "2026-06-04T21:05:00.000Z",
    id: "loyalty-earned-live-order",
    label: "Mock order SB-260604-LIVE",
    orderId: "mock-active-order",
    points: 64,
    type: "earn",
  },
  {
    createdAt: "2026-06-03T23:20:00.000Z",
    id: "loyalty-earned-past-order",
    label: "Mock order SB-260604-PAST",
    orderId: "mock-completed-order",
    points: 43,
    type: "earn",
  },
];

export const defaultLoyaltyState: LoyaltyState = {
  account: mockLoyaltyAccount,
  redeemedRewards: [],
  transactions: initialLoyaltyTransactions,
};

export const referralProgress: ReferralProgress = {
  code: "SB-84217",
  completedInvites: 3,
  invitedGuests: 10,
  milestones: [
    {
      completed: true,
      count: 1,
      label: "First invited guest ordered",
    },
    {
      completed: true,
      count: 3,
      label: "Three guests completed checkout",
    },
    {
      completed: false,
      count: 10,
      label: "Ten guest orders unlock omakase points",
    },
  ],
  rewardPoints: 500,
};
