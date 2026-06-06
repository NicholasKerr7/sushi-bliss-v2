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
  {
    accent: "neutral",
    code: "TUNAROLL",
    description:
      "Add a complimentary spicy tuna roll to qualifying pickup and delivery orders.",
    eligibility: "Checkout subtotals over $75 before tax and service fee.",
    expiresAt: "2026-06-10T03:59:00.000Z",
    id: "spicy-tuna-roll",
    imageUrl: "/assets/menu/sushi/spicy-tuna-roll.webp",
    subtitle: "Free spicy tuna roll",
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
    subtitle: "Complimentary dessert course",
    terms: [
      "Valid once during the member birthday month.",
      "Dine-in reservation or pickup order required.",
      "Member profile must be active before redemption.",
    ],
    title: "Birthday Treat",
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
    subtitle: "10% off lunch orders",
    terms: [
      "Valid daily from 11:00 AM to 2:00 PM.",
      "Discount applies before tax and service fee.",
      "Availability may vary by location.",
    ],
    title: "Early Lunch",
  },
];
