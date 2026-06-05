import type { Offer } from "@/types/offer";

export const offers: Offer[] = [
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
    code: "BLISS10",
    description:
      "A weekday member offer for signature rolls, nigiri sets, and chef-selected pickup orders.",
    eligibility: "Pickup orders placed Monday through Thursday.",
    expiresAt: "2026-06-30T03:59:00.000Z",
    id: "weekday-pickup",
    imageUrl: "/assets/gallery/elegant-sushi-bar-with-amber-lighting.webp",
    subtitle: "10% off weekday pickup",
    terms: [
      "Valid on subtotal before tax and service fee.",
      "One code per checkout.",
      "Availability may vary by location.",
    ],
    title: "Weekday Pickup",
  },
  {
    accent: "premium",
    code: "NICHISUSHI",
    description:
      "Share Sushi Bliss with a guest. Completed referral orders unlock points toward premium rewards.",
    eligibility: "New guest referrals using your member code.",
    expiresAt: "2026-08-01T03:59:00.000Z",
    id: "referral-gift",
    imageUrl: "/assets/editorial/sake-vase-set-gold-brush.webp",
    subtitle: "Earn 500 referral points",
    terms: [
      "Referral points post after the guest completes checkout.",
      "Guest must use the referral code before placing an order.",
      "Referral code cannot be used by the referring member.",
    ],
    title: "Referral Gift",
  },
];
