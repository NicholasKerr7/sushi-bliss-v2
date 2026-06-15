import type { Offer } from "@/types/offer";

export const offers: Offer[] = [
  {
    accent: "premium",
    code: "SAVOR20",
    description:
      "A signature member offer for sushi sets, nigiri selections, and premium dinner orders.",
    eligibility: "All menu orders over $60 before tax and service fee.",
    expiresAt: "2026-06-16T03:59:00.000Z",
    id: "twenty-off-order",
    imageUrl: "/assets/editorial/hero-otoro-nigiri-no-red-moon.webp",
    subtitle: "Because you deserve something exceptional.",
    terms: [
      "Valid for pickup, delivery, or dine-in orders.",
      "One use per member profile.",
      "Cannot be combined with another percentage discount.",
    ],
    title: "20% Off Your Order",
  },
  {
    accent: "premium",
    code: "OMAKASE15",
    description:
      "Reserve a chef-led tasting or add premium nigiri to checkout and receive a fixed credit toward the experience.",
    eligibility: "Premium tasting menus and orders over $85.",
    expiresAt: "2026-07-15T03:59:00.000Z",
    id: "omakase-preview",
    imageUrl:
      "/assets/omakase/specialties/lead-chef-omakase-nigiri-flight.webp",
    subtitle: "$15 premium tasting credit",
    terms: [
      "Valid for pickup or dine-in tasting experiences.",
      "One use per member profile.",
      "Cannot be exchanged for cash.",
    ],
    title: "Omakase Preview",
  },
  {
    accent: "neutral",
    code: "LUNCH10",
    description:
      "Take 10% off chef-selected lunch orders placed before the afternoon rush.",
    eligibility: "Lunch orders placed before 2:00 PM.",
    expiresAt: "2026-07-01T18:00:00.000Z",
    id: "early-lunch",
    imageUrl: "/assets/food/sushi-rolls-with-warm-cinematic-glow.webp",
    subtitle: "10% off lunch orders before 2:00 PM.",
    terms: [
      "Valid daily from 11:00 AM to 2:00 PM.",
      "Discount applies before tax and service fee.",
      "Availability may vary by location.",
    ],
    title: "10% Off Lunch",
  },
  {
    accent: "premium",
    code: "POINTS2X",
    description:
      "Earn 2X Bliss Points on every qualifying order placed this week.",
    eligibility: "Active loyalty members placing pickup or delivery orders.",
    expiresAt: "2026-06-23T03:59:00.000Z",
    id: "double-points",
    imageUrl:
      "/assets/omakase/specialties/lead-chef-omakase-nigiri-flight.webp",
    subtitle: "Earn 2X Bliss Points on all orders this week.",
    terms: [
      "Points post after checkout is completed.",
      "Reward redemptions are excluded from bonus points.",
      "Member profile must be active before checkout.",
    ],
    title: "Double Points",
  },
  {
    accent: "neutral",
    code: "TUNAROLL",
    description:
      "Add a complimentary spicy tuna roll to qualifying pickup and delivery orders.",
    eligibility: "Checkout subtotals over $75 before tax and service fee.",
    expiresAt: "2026-06-21T03:59:00.000Z",
    id: "spicy-tuna-roll",
    imageUrl: "/assets/menu/sushi/spicy-tuna-roll.webp",
    subtitle: "Complimentary Spicy Tuna Roll on orders over $75.",
    terms: [
      "One complimentary roll per checkout.",
      "Cannot be combined with another complimentary item.",
      "Valid while daily roll allocation lasts.",
    ],
    title: "Free Spicy Tuna Roll",
  },
  {
    accent: "premium",
    code: "BIRTHDAY",
    description:
      "Celebrate with a complimentary dessert course during your birthday month.",
    eligibility: "Members with a birthday saved to their profile.",
    expiresAt: "2026-06-30T03:59:00.000Z",
    id: "birthday-treat",
    imageUrl:
      "/assets/editorial/elegant-matcha-mousse-with-golden-accents.webp",
    subtitle: "Enjoy a complimentary dessert during your birthday month.",
    terms: [
      "Valid once during the member birthday month.",
      "Dine-in reservation or pickup order required.",
      "Member profile must be active before redemption.",
    ],
    title: "Birthday Treat",
  },
  {
    accent: "neutral",
    code: "WEEKEND15",
    description:
      "Enjoy a weekend discount across chef-selected pickup and delivery orders.",
    eligibility: "Orders placed Saturday or Sunday.",
    expiresAt: "2026-07-01T03:59:00.000Z",
    id: "weekend-special",
    imageUrl: "/assets/pairings/dragon-roll-shichida-junmai.webp",
    subtitle: "Enjoy 15% off all orders Saturday & Sunday.",
    terms: [
      "Valid for pickup and delivery orders.",
      "Discount applies before tax and service fee.",
      "One weekend offer per checkout.",
    ],
    title: "15% Off Weekend",
  },
];
