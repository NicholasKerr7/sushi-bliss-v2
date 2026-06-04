import type {
  CartAddOnDefinition,
  CartCustomizationGroup,
} from "@/types/order";

export const cartCustomizationGroups: CartCustomizationGroup[] = [
  {
    id: "wasabi",
    label: "Wasabi",
    options: [
      {
        id: "chef-balance",
        label: "Chef balance",
        description: "Prepared with the house standard.",
      },
      {
        id: "light",
        label: "Light",
        description: "A softer finish for delicate fish.",
      },
      {
        id: "extra",
        label: "Extra",
        description: "A brighter wasabi lift.",
      },
    ],
  },
  {
    id: "soy",
    label: "Soy",
    options: [
      {
        id: "house",
        label: "House soy",
        description: "Balanced umami and salt.",
      },
      {
        id: "low-sodium",
        label: "Low sodium",
        description: "Gentler seasoning on request.",
      },
      {
        id: "tamari",
        label: "Tamari",
        description: "Gluten-free soy-style finish.",
      },
    ],
  },
  {
    id: "cut",
    label: "Cut",
    options: [
      {
        id: "classic",
        label: "Classic",
        description: "Served in the chef's standard form.",
      },
      {
        id: "bite-size",
        label: "Bite-size",
        description: "Smaller pieces for sharing.",
      },
    ],
  },
];

export const cartAddOns: CartAddOnDefinition[] = [
  {
    id: "fresh-wasabi",
    label: "Fresh wasabi",
    description: "Freshly grated wasabi on the side.",
    priceCents: 250,
  },
  {
    id: "pickled-ginger",
    label: "Pickled ginger",
    description: "Extra house-pickled ginger.",
    priceCents: 100,
  },
  {
    id: "yuzu-kosho",
    label: "Yuzu kosho",
    description: "Citrus chile paste for richer cuts.",
    priceCents: 200,
  },
  {
    id: "osetra-caviar",
    label: "Osetra caviar",
    description: "A small spoon of premium roe.",
    premiumOnly: true,
    priceCents: 850,
  },
];
