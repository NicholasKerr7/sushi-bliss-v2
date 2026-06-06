import type { GiftExperience, GiftState } from "@/types/gift";

export const giftExperiences: GiftExperience[] = [
  {
    category: "Omakase",
    deliveryNote: "Delivered instantly by email with a printable gift pass.",
    description:
      "Chef's curated multi-course omakase journey with flexible booking.",
    id: "counter-omakase-gift",
    image: {
      alt: "Omakase counter experience",
      publicUrl: "/assets/gallery/elegant-sushi-bar-with-amber-lighting.webp",
    },
    inclusions: [
      "Chef's curated multi-course omakase journey",
      "Two guest digital gift pass",
      "Recipient booking concierge",
    ],
    priceCents: 18000,
    title: "Omakase Experience",
  },
  {
    category: "Premium",
    deliveryNote: "Scheduled delivery available for celebrations.",
    description:
      "An intimate dining experience in a private room with concierge support.",
    id: "seasonal-tasting-gift",
    image: {
      alt: "Private dining room",
      publicUrl: "/assets/gallery/intimate-upscale-dining-room-setting.webp",
    },
    inclusions: [
      "Private dining experience",
      "Celebration occasion notes",
      "Flexible recipient booking",
    ],
    priceCents: 25000,
    title: "Private Dining",
  },
  {
    category: "Class",
    deliveryNote: "Email gift card with recipient booking support.",
    description: "Learn from our master chefs in an immersive sushi class.",
    id: "bliss-experience-credit",
    image: {
      alt: "Sushi master class",
      publicUrl: "/assets/gallery/precision-in-sushi-preparation.webp",
    },
    inclusions: [
      "Hands-on chef instruction",
      "Seasonal sushi tasting",
      "Take-home technique card",
    ],
    priceCents: 15000,
    title: "Sushi Master Class",
  },
];

export const defaultGiftState: GiftState = {
  confirmations: [],
};
