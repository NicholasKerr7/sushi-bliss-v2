import { getOmakaseExperience } from "@/lib/data";
import type {
  OmakasePackage,
  PremiumReservationCard,
  SakePairingOption,
} from "@/types/omakase";

export const omakaseExperience = getOmakaseExperience();

export const sakePairingOptions: SakePairingOption[] = [
  {
    description:
      "Three seasonal pours calibrated around fatty tuna, shellfish, and dessert.",
    id: "seasonal-sake-flight",
    label: "Seasonal sake flight",
    priceCents: 3000,
  },
  {
    description:
      "A quieter premium pairing with rare daiginjo selections and a dessert pour.",
    id: "rare-daiginjo-flight",
    label: "Rare daiginjo flight",
    priceCents: 6200,
  },
];

export const omakasePackages: OmakasePackage[] = [
  {
    accent: "premium",
    courses: [
      {
        description: "A composed seasonal opening bite with citrus and roe.",
        id: "seasonal-amuse",
        image: {
          alt: "Seasonal amuse bouche appetizer",
          publicUrl:
            "/assets/omakase/appetizers/bliss-seasonal-amuse-bouche-appetizer.webp",
        },
        label: "Opening",
        title: "Seasonal amuse",
      },
      {
        description: "A precise nigiri progression led by the chef counter.",
        id: "nigiri-flight",
        image: {
          alt: "Chef omakase nigiri flight",
          publicUrl:
            "/assets/omakase/specialties/lead-chef-omakase-nigiri-flight.webp",
        },
        label: "Signature",
        title: "Chef nigiri flight",
      },
      {
        description: "Matcha mousse with gold accents and a clean finish.",
        id: "matcha-finale",
        image: {
          alt: "Matcha mousse dessert with gold accents",
          publicUrl: "/assets/omakase/desserts/matcha-mousse-dessert.webp",
        },
        label: "Finale",
        title: "Matcha gold mousse",
      },
    ],
    description: "A refined journey through sushi fundamentals.",
    durationMinutes: 75,
    guestRange: { max: 4, min: 1 },
    id: "counter-signature",
    image: {
      alt: "Chef-led omakase nigiri on a dark counter",
      publicUrl:
        "/assets/omakase/specialties/lead-chef-omakase-nigiri-flight.webp",
    },
    inclusions: [
      "7 course counter tasting",
      "Chef fundamentals",
      "Welcome tea service",
    ],
    priceCents: 12000,
    subtitle: "7 courses",
    tier: "counter",
    title: "Essential",
  },
  {
    accent: "premium",
    courses: [
      {
        description: "Toro tartare with herbs and a restrained savory finish.",
        id: "toro-tartare",
        image: {
          alt: "Toro tartare omakase appetizer",
          publicUrl:
            "/assets/omakase/appetizers/harmony-toro-tartare-appetizer.webp",
        },
        label: "Opening",
        title: "Harmony toro tartare",
      },
      {
        description:
          "Sashimi and nigiri selections that move through texture and temperature.",
        id: "sashimi-selection",
        image: {
          alt: "Chef special sashimi selection",
          publicUrl:
            "/assets/omakase/specialties/chef-special-sashimi-selection.webp",
        },
        label: "Signature",
        title: "Seasonal sashimi arc",
      },
      {
        description: "Yuzu panna cotta with a bright, quiet finish.",
        id: "yuzu-panna-cotta",
        image: {
          alt: "Yuzu panna cotta dessert",
          publicUrl: "/assets/omakase/desserts/yuzu-panna-cotta-dessert.webp",
        },
        label: "Finale",
        title: "Yuzu panna cotta",
      },
    ],
    description:
      "An elevated experience featuring rare and seasonal selections.",
    durationMinutes: 90,
    guestRange: { max: 6, min: 2 },
    id: "seasonal-mastery",
    image: {
      alt: "Luxury seafood and wagyu omakase selection",
      publicUrl: "/assets/editorial/luxury-seafood-and-wagyu-selection.webp",
    },
    inclusions: [
      "10 course seasonal tasting",
      "Warm course interlude",
      "Printed course card",
    ],
    priceCents: 18000,
    subtitle: "10 courses",
    tier: "seasonal",
    title: "Premium",
  },
  {
    accent: "success",
    courses: [
      {
        description: "Caviar rice opening service for private-room pacing.",
        id: "caviar-rice",
        image: {
          alt: "Caviar rice omakase appetizer",
          publicUrl:
            "/assets/omakase/appetizers/mastery-caviar-rice-appetizer.webp",
        },
        label: "Opening",
        title: "Caviar rice",
      },
      {
        description: "A seared sushi specialty with wagyu, smoke, and truffle.",
        id: "seared-special",
        image: {
          alt: "Seared sushi omakase specialty",
          publicUrl:
            "/assets/omakase/specialties/sous-chef-seared-sushi-special.webp",
        },
        label: "Signature",
        title: "Seared wagyu sushi",
      },
      {
        description: "Dark chocolate matcha plated for celebrations.",
        id: "dark-matcha",
        image: {
          alt: "Dark chocolate matcha dessert",
          publicUrl:
            "/assets/omakase/desserts/dark-chocolate-matcha-dessert.webp",
        },
        label: "Finale",
        title: "Dark matcha dessert",
      },
    ],
    description:
      "The ultimate omakase journey. Exclusive, exquisite, unforgettable.",
    durationMinutes: 150,
    guestRange: { max: 8, min: 4 },
    id: "private-kintsugi",
    image: {
      alt: "Private omakase ingredients and gold accents",
      publicUrl:
        "/assets/editorial/gourmet-seafood-dish-with-golden-garnishes.webp",
    },
    inclusions: [
      "Private room tasting",
      "Concierge occasion notes",
      "Celebration dessert",
    ],
    priceCents: 25000,
    subtitle: "12+ courses",
    tier: "private",
    title: "Bliss Signature",
  },
];

export const premiumReservationCards: PremiumReservationCard[] = [
  {
    description:
      "Reserve chef-counter seats for the most direct omakase pacing.",
    href: "/reservations",
    id: "counter-reservation",
    image: {
      alt: "Elegant sushi bar with amber lighting",
      publicUrl: "/assets/gallery/elegant-sushi-bar-with-amber-lighting.webp",
    },
    label: "Counter",
    title: "Chef counter seats",
  },
  {
    description:
      "Use a private room for gifting, anniversaries, and small groups.",
    href: "/reservations",
    id: "private-room-reservation",
    image: {
      alt: "Intimate upscale dining room setting",
      publicUrl: "/assets/gallery/intimate-upscale-dining-room-setting.webp",
    },
    label: "Private room",
    title: "Kintsugi private room",
  },
];
