import type { GiftExperience, GiftState } from "@/types/gift";

export const giftExperiences: GiftExperience[] = [
  {
    category: "Omakase",
    deliveryNote: "Delivered instantly by email with a printable gift pass.",
    description:
      "A polished gift pass for a chef-led counter tasting with flexible booking.",
    id: "counter-omakase-gift",
    image: {
      alt: "Luxury sushi gift box",
      publicUrl:
        "/assets/brand/gift-cards/luxury-sushi-with-gift-box-elegance.webp",
    },
    inclusions: [
      "Counter Signature tasting credit",
      "Welcome tea service",
      "Recipient booking concierge",
    ],
    priceCents: 14500,
    title: "Counter Omakase Gift",
  },
  {
    category: "Premium",
    deliveryNote: "Scheduled delivery available for celebrations.",
    description:
      "A premium tasting credit with sake-pairing flexibility and a ceremonial gift note.",
    id: "seasonal-tasting-gift",
    image: {
      alt: "Premium gift box with red ribbon",
      publicUrl:
        "/assets/brand/gift-cards/premium-gift-box-with-red-ribbon.webp",
    },
    inclusions: [
      "Seasonal Mastery tasting credit",
      "Optional sake pairing upgrade",
      "Printed occasion message",
    ],
    priceCents: 21500,
    title: "Seasonal Tasting Gift",
  },
  {
    category: "Flexible",
    deliveryNote: "Email gift card with recipient booking support.",
    description:
      "A flexible Sushi Bliss experience credit for pickup, reservations, or omakase.",
    id: "bliss-experience-credit",
    image: {
      alt: "Elegant gift card with red ribbon",
      publicUrl:
        "/assets/brand/gift-cards/elegant-gift-card-with-red-ribbon.webp",
    },
    inclusions: [
      "Flexible dining credit",
      "Menu, reservation, or gift checkout use",
      "Concierge support",
    ],
    priceCents: 10000,
    title: "Bliss Experience Credit",
  },
];

export const defaultGiftState: GiftState = {
  confirmations: [],
};
