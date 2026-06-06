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
    id: "gold-flakes",
    label: "Gold flakes",
    description: "Delicate gold garnish for a celebratory finish.",
    priceCents: 300,
  },
  {
    id: "truffle-oil",
    label: "Truffle oil",
    description: "Aromatic truffle accent brushed tableside.",
    priceCents: 200,
  },
  {
    id: "caviar-5g",
    label: "Caviar (5g)",
    description: "Premium roe for richer nigiri and chef specials.",
    premiumOnly: true,
    priceCents: 600,
  },
  {
    id: "yuzu-zest",
    label: "Yuzu zest",
    description: "Bright citrus lift over the finished piece.",
    priceCents: 150,
  },
  {
    id: "ikura-salmon-roe",
    label: "Ikura (salmon roe)",
    description: "Briny salmon roe for a jewel-like finish.",
    premiumOnly: true,
    priceCents: 250,
  },
  {
    id: "green-onion",
    label: "Green onion",
    description: "Fresh green onion, sliced fine.",
    priceCents: 50,
  },
];
