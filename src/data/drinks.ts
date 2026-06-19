import { toImageReference } from "@/lib/assets";
import type {
  DrinkCategory,
  DrinkTastingProfile,
  MenuItem,
  MenuTastingProfile,
} from "@/types/menu";

interface DrinkDefinition {
  id: string;
  name: string;
  drinkCategory: DrinkCategory;
  priceCents: number;
  serving: string;
  abv?: number;
  ageRestricted?: boolean;
  description: string;
  ingredients: string[];
  chefNote: string;
  texture: string;
  image: string;
  tags: string[];
  tasting: DrinkTastingProfile;
  pairingItemIds?: string[];
}

const DRINK_IMAGE_BASE = "/assets/drinks/";
const DRINK_IMAGE_FALLBACK =
  "/assets/editorial/luxurious-japanese-sake-still-life.webp";

function clampProfileValue(value: number): number {
  return Math.min(96, Math.max(18, Math.round(value)));
}

function createFoodTastingFallback(
  profile: DrinkTastingProfile,
): MenuTastingProfile {
  return {
    buttery: clampProfileValue((profile.body + profile.aromatic) / 2),
    richness: clampProfileValue(profile.body),
    sweetness: clampProfileValue(100 - profile.dry),
    tenderness: clampProfileValue((profile.bright + profile.finish) / 2),
    umami: clampProfileValue((profile.dry + profile.finish) / 2),
  };
}

function createDrinkSearchText(item: Omit<MenuItem, "searchText">): string {
  return [
    item.name,
    item.category,
    item.categoryLabel,
    item.description,
    item.chefNote,
    item.texture,
    item.serving,
    item.drinkCategory,
    item.abv ? `${item.abv}% abv` : "",
    ...item.ingredients,
    ...item.tags,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function createDrinkItem(definition: DrinkDefinition): MenuItem {
  const normalized: Omit<MenuItem, "searchText"> = {
    abv: definition.abv,
    ageRestricted: definition.ageRestricted,
    beverageTastingNotes: definition.tasting,
    category: "drinks",
    categoryLabel: "Drinks",
    chefNote: definition.chefNote,
    description: definition.description,
    drinkCategory: definition.drinkCategory,
    id: definition.id,
    image: toImageReference(
      `${DRINK_IMAGE_BASE}${definition.image}`,
      definition.name,
      DRINK_IMAGE_FALLBACK,
    ),
    ingredients: definition.ingredients,
    itemType: "drink",
    name: definition.name,
    pairingItemIds: definition.pairingItemIds,
    priceCents: definition.priceCents,
    serving: definition.serving,
    tags: [
      "drink",
      definition.drinkCategory,
      ...definition.tags,
      ...(definition.ageRestricted ? ["alcohol"] : ["zero-proof"]),
    ],
    tastingNotes: createFoodTastingFallback(definition.tasting),
    texture: definition.texture,
  };

  return {
    ...normalized,
    searchText: createDrinkSearchText(normalized),
  };
}

const drinkDefinitions: DrinkDefinition[] = [
  {
    ageRestricted: true,
    description:
      "Three seasonal pours chosen to move from clean and mineral to softly floral.",
    drinkCategory: "flight",
    id: "seasonal-sake-flight",
    image: "seasonal-sake-flight.webp",
    ingredients: ["Junmai", "Ginjo", "Daiginjo"],
    name: "Seasonal Sake Flight",
    pairingItemIds: ["otoro-nigiri", "hamachi-nigiri", "salmon-sashimi"],
    priceCents: 3000,
    serving: "Three 2 oz pours",
    tags: ["featured", "sake", "pairing", "signature"],
    tasting: { aromatic: 76, body: 64, bright: 74, dry: 82, finish: 88 },
    texture: "Clean, layered, and bright",
    chefNote:
      "Begin with the lightest pour before moving into richer fish or brushed tare.",
  },
  {
    ageRestricted: true,
    description:
      "A rare daiginjo progression with polished rice, lifted aromatics, and long finish.",
    drinkCategory: "flight",
    id: "rare-daiginjo-flight",
    image: "rare-daiginjo-flight.webp",
    ingredients: ["Rare daiginjo", "Junmai daiginjo", "Limited ginjo"],
    name: "Rare Daiginjo Flight",
    pairingItemIds: ["uni-nigiri", "otoro-nigiri", "wagyu-aburi-nigiri"],
    priceCents: 6200,
    serving: "Three 2 oz pours",
    tags: ["premium", "sake", "pairing", "daiginjo"],
    tasting: { aromatic: 88, body: 70, bright: 82, dry: 88, finish: 94 },
    texture: "Perfumed, precise, and lingering",
    chefNote:
      "Best with premium nigiri where the sake can stay clean while the fish opens up.",
  },
  {
    abv: 15.5,
    ageRestricted: true,
    description:
      "A balanced ginjo with gentle fruit, soft grain, and a polished dry close.",
    drinkCategory: "sake",
    id: "kubota-senju-ginjo",
    image: "kubota-senju-ginjo.webp",
    ingredients: ["Ginjo sake", "Polished rice", "Spring water"],
    name: "Kubota Senju Ginjo",
    pairingItemIds: ["salmon-nigiri", "ebi-nigiri"],
    priceCents: 1200,
    serving: "Glass from $12 / carafe $44",
    tags: ["sake", "ginjo", "balanced"],
    tasting: { aromatic: 70, body: 68, bright: 64, dry: 78, finish: 82 },
    texture: "Smooth and measured",
    chefNote:
      "A versatile house pour for salmon, shrimp, and lightly brushed nigiri.",
  },
  {
    abv: 16,
    ageRestricted: true,
    description:
      "Junmai daiginjo with pear, melon, and a clean mineral finish.",
    drinkCategory: "sake",
    id: "dassai-45-junmai-daiginjo",
    image: "dassai-45-junmai-daiginjo.webp",
    ingredients: ["Junmai daiginjo", "Yamada Nishiki rice"],
    name: "Dassai 45 Junmai Daiginjo",
    pairingItemIds: ["hamachi-nigiri", "salmon-sashimi"],
    priceCents: 1400,
    serving: "Glass from $14 / carafe $52",
    tags: ["sake", "daiginjo", "floral"],
    tasting: { aromatic: 76, body: 62, bright: 78, dry: 84, finish: 86 },
    texture: "Silky and aromatic",
    chefNote:
      "A bright daiginjo that keeps delicate fish clean without washing out texture.",
  },
  {
    abv: 15.5,
    ageRestricted: true,
    description:
      "Flower-forward ginjo with cherry blossom lift and a crisp dry tail.",
    drinkCategory: "sake",
    id: "dewazakura-oka-ginjo",
    image: "dewazakura-oka-ginjo.webp",
    ingredients: ["Ginjo sake", "Polished rice", "Koji"],
    name: "Dewazakura Oka Ginjo",
    pairingItemIds: ["hamachi-nigiri", "vegetarian-temaki"],
    priceCents: 1300,
    serving: "Glass from $13 / carafe $48",
    tags: ["sake", "ginjo", "aromatic"],
    tasting: { aromatic: 86, body: 58, bright: 82, dry: 80, finish: 82 },
    texture: "Floral and lifted",
    chefNote: "Pour with clean, citrus-leaning plates or vegetable courses.",
  },
  {
    abv: 15.5,
    ageRestricted: true,
    description:
      "Dry, elegant junmai daiginjo with restrained fruit and a long mineral line.",
    drinkCategory: "sake",
    id: "hakkaisan-junmai-daiginjo",
    image: "hakkaisan-junmai-daiginjo.webp",
    ingredients: ["Junmai daiginjo", "Niigata rice", "Mountain water"],
    name: "Hakkaisan Junmai Daiginjo",
    pairingItemIds: ["tuna-nigiri", "otoro-nigiri"],
    priceCents: 1600,
    serving: "Glass from $16 / carafe $60",
    tags: ["sake", "premium", "dry"],
    tasting: { aromatic: 74, body: 72, bright: 72, dry: 88, finish: 90 },
    texture: "Dry and elegant",
    chefNote: "A precise match for bluefin where the finish should stay crisp.",
  },
  {
    abv: 15.9,
    ageRestricted: true,
    description:
      "Yamahai junmai with earth, smoke, and enough structure for richer courses.",
    drinkCategory: "sake",
    id: "tengumai-yamahai-junmai",
    image: "tengumai-yamahai-junmai.webp",
    ingredients: ["Yamahai junmai", "Koji", "Polished rice"],
    name: "Tengumai Yamahai Junmai",
    pairingItemIds: ["unagi-nigiri", "dragon-roll"],
    priceCents: 1400,
    serving: "Glass from $14 / carafe $52",
    tags: ["sake", "junmai", "earthy", "rich"],
    tasting: { aromatic: 72, body: 84, bright: 58, dry: 76, finish: 88 },
    texture: "Earthy and structured",
    chefNote:
      "Use it with eel, seared fish, or warm sauces that need a deeper backbone.",
  },
  {
    abv: 16,
    ageRestricted: true,
    description:
      "Junmai ginjo with snow pear, quiet florals, and a rounded finish.",
    drinkCategory: "sake",
    id: "yuki-no-bosha-junmai-ginjo",
    image: "yuki-no-bosha-junmai-ginjo.webp",
    ingredients: ["Junmai ginjo", "Akita rice", "Koji"],
    name: "Yuki No Bosha Junmai Ginjo",
    pairingItemIds: ["scallop-nigiri", "salmon-nigiri"],
    priceCents: 1500,
    serving: "Glass from $15 / carafe $56",
    tags: ["sake", "ginjo", "rounded"],
    tasting: { aromatic: 80, body: 68, bright: 70, dry: 78, finish: 86 },
    texture: "Rounded and graceful",
    chefNote:
      "A soft aromatic pour for scallop, salmon, and gently sweet shellfish.",
  },
  {
    abv: 18,
    ageRestricted: true,
    description:
      "Yuzu sake, shochu, blood orange, and smoked salt under a red moon glow.",
    drinkCategory: "cocktail",
    id: "akai-tsuki-red-moon",
    image: "akai-tsuki-red-moon-cocktail.webp",
    ingredients: ["Yuzu sake", "Shochu", "Blood orange", "Smoked salt"],
    name: "Akai Tsuki - Red Moon",
    pairingItemIds: ["spicy-tuna-roll", "dragon-roll"],
    priceCents: 1800,
    serving: "Coupe",
    tags: ["featured", "cocktail", "citrus", "signature"],
    tasting: { aromatic: 78, body: 70, bright: 90, dry: 62, finish: 82 },
    texture: "Bright, smoky, and vivid",
    chefNote:
      "The visual signature of the bar: citrus first, smoke second, red fruit last.",
  },
  {
    abv: 24,
    ageRestricted: true,
    description:
      "Japanese whisky, kokuto sugar, sesame bitters, and orange oil.",
    drinkCategory: "cocktail",
    id: "kintsugi-old-fashioned",
    image: "kintsugi-old-fashioned.webp",
    ingredients: ["Japanese whisky", "Kokuto sugar", "Sesame bitters"],
    name: "Kintsugi Old Fashioned",
    pairingItemIds: ["wagyu-aburi-nigiri", "unagi-nigiri"],
    priceCents: 2000,
    serving: "Rocks",
    tags: ["cocktail", "whisky", "rich"],
    tasting: { aromatic: 74, body: 88, bright: 42, dry: 70, finish: 92 },
    texture: "Deep, warm, and polished",
    chefNote:
      "A richer after-course drink for wagyu, eel, or anything finished with tare.",
  },
  {
    abv: 12,
    ageRestricted: true,
    description:
      "Shiso, gin, chilled soda, cucumber, and a clean mineral snap.",
    drinkCategory: "cocktail",
    id: "shiso-garden-highball",
    image: "shiso-garden-highball.webp",
    ingredients: ["Gin", "Shiso", "Cucumber", "Soda"],
    name: "Shiso Garden Highball",
    pairingItemIds: ["vegetarian-temaki", "hamachi-nigiri"],
    priceCents: 1700,
    serving: "Highball",
    tags: ["cocktail", "herbal", "bright"],
    tasting: { aromatic: 82, body: 46, bright: 88, dry: 72, finish: 76 },
    texture: "Tall, crisp, and herbal",
    chefNote:
      "A clean highball for cucumber, herbs, and lighter seasonal fish.",
  },
  {
    abv: 11,
    ageRestricted: true,
    description: "Sparkling sake, yuzu, citrus peel, and a dry, lifted finish.",
    drinkCategory: "cocktail",
    id: "yuzu-sake-spritz",
    image: "yuzu-sake-spritz.webp",
    ingredients: ["Sparkling sake", "Yuzu", "Citrus peel"],
    name: "Yuzu Sake Spritz",
    pairingItemIds: ["california-roll", "salmon-nigiri"],
    priceCents: 1700,
    serving: "Wine glass",
    tags: ["cocktail", "sparkling", "citrus"],
    tasting: { aromatic: 68, body: 48, bright: 92, dry: 66, finish: 78 },
    texture: "Effervescent and citrus-bright",
    chefNote:
      "An easy first glass when the table wants something bright but not sweet.",
  },
  {
    description:
      "Yuzu, ginger, jasmine tea, and sparkling mineral water with a citrus lift.",
    drinkCategory: "zero-proof",
    id: "moonlit-yuzu",
    image: "moonlit-yuzu-zero-proof.webp",
    ingredients: ["Yuzu", "Ginger", "Jasmine tea", "Sparkling water"],
    name: "Moonlit Yuzu",
    pairingItemIds: ["salmon-sashimi", "vegetarian-temaki"],
    priceCents: 1100,
    serving: "Tall glass",
    tags: ["featured", "zero-proof", "citrus", "sparkling"],
    tasting: { aromatic: 72, body: 38, bright: 94, dry: 48, finish: 70 },
    texture: "Sparkling, clean, and bright",
    chefNote:
      "A zero-proof reset that keeps citrus high and sweetness restrained.",
  },
  {
    description: "Fresh cucumber, shiso, tonic, and a salted citrus rim.",
    drinkCategory: "zero-proof",
    id: "shiso-cucumber-tonic",
    image: "shiso-cucumber-tonic-zero-proof.webp",
    ingredients: ["Cucumber", "Shiso", "Tonic", "Salted citrus"],
    name: "Shiso Cucumber Tonic",
    pairingItemIds: ["hamachi-nigiri", "cucumber-maki"],
    priceCents: 1100,
    serving: "Highball",
    tags: ["zero-proof", "herbal", "tonic"],
    tasting: { aromatic: 82, body: 34, bright: 82, dry: 58, finish: 72 },
    texture: "Cool, herbal, and crisp",
    chefNote:
      "Use it with clean fish, cucumber, and vegetable courses where freshness matters.",
  },
  {
    description:
      "Roasted hojicha, black sugar, oat foam, and a low-sweetness finish.",
    drinkCategory: "zero-proof",
    id: "hojicha-ember",
    image: "hojicha-ember-zero-proof.webp",
    ingredients: ["Hojicha", "Black sugar", "Oat foam"],
    name: "Hojicha Ember",
    pairingItemIds: ["unagi-nigiri", "dragon-roll"],
    priceCents: 1000,
    serving: "Rocks",
    tags: ["zero-proof", "tea", "roasted"],
    tasting: { aromatic: 76, body: 72, bright: 28, dry: 62, finish: 84 },
    texture: "Roasted, creamy, and grounded",
    chefNote: "A nonalcoholic match for warm, smoky, or sauce-brushed courses.",
  },
  {
    description:
      "Matcha, pear, oat milk, and soft foam for a plush zero-proof close.",
    drinkCategory: "zero-proof",
    id: "matcha-pear-cloud",
    image: "matcha-pear-cloud-zero-proof.webp",
    ingredients: ["Matcha", "Pear", "Oat milk", "Soft foam"],
    name: "Matcha Pear Cloud",
    pairingItemIds: ["tamago-nigiri", "vegetarian-temaki"],
    priceCents: 1200,
    serving: "Stemless glass",
    tags: ["zero-proof", "matcha", "creamy"],
    tasting: { aromatic: 78, body: 76, bright: 52, dry: 42, finish: 76 },
    texture: "Soft, creamy, and fragrant",
    chefNote:
      "Best after bright courses or alongside gently sweet tamago and vegetables.",
  },
  {
    description: "A focused green tea service poured hot at the table.",
    drinkCategory: "tea",
    id: "gyokuro-table-service",
    image: "gyokuro-table-service.webp",
    ingredients: ["Gyokuro", "Soft water"],
    name: "Gyokuro Table Service",
    pairingItemIds: ["otoro-nigiri", "uni-nigiri"],
    priceCents: 1200,
    serving: "Personal pot",
    tags: ["tea", "premium", "umami"],
    tasting: { aromatic: 82, body: 66, bright: 58, dry: 52, finish: 90 },
    texture: "Deep, green, and savory",
    chefNote:
      "A meditative tea for premium nigiri where umami should echo, not compete.",
  },
  {
    description:
      "Cold-brew sencha lifted with yuzu peel and a clean chilled finish.",
    drinkCategory: "tea",
    id: "cold-brew-yuzu-sencha",
    image: "cold-brew-yuzu-sencha.webp",
    ingredients: ["Sencha", "Yuzu peel", "Cold spring water"],
    name: "Cold-Brew Yuzu Sencha",
    pairingItemIds: ["salmon-nigiri", "hamachi-nigiri"],
    priceCents: 800,
    serving: "Chilled glass",
    tags: ["tea", "cold-brew", "citrus"],
    tasting: { aromatic: 72, body: 42, bright: 86, dry: 58, finish: 76 },
    texture: "Chilled, green, and bright",
    chefNote:
      "A clean nonalcoholic pairing for lunch, delivery, or the first course.",
  },
  {
    description:
      "Warm roasted green tea with nutty aroma and a gentle dry finish.",
    drinkCategory: "tea",
    id: "roasted-hojicha",
    image: "roasted-hojicha.webp",
    ingredients: ["Roasted hojicha", "Soft water"],
    name: "Roasted Hojicha",
    pairingItemIds: ["unagi-nigiri", "dragon-roll"],
    priceCents: 700,
    serving: "Personal pot",
    tags: ["tea", "roasted", "warm"],
    tasting: { aromatic: 78, body: 58, bright: 34, dry: 62, finish: 80 },
    texture: "Warm, nutty, and calm",
    chefNote:
      "A low-caffeine closer with enough roast for eel, sauce, and dessert notes.",
  },
  {
    abv: 5,
    ageRestricted: true,
    description: "Cold, crisp lager with a dry snap and fine carbonation.",
    drinkCategory: "beer-wine",
    id: "japanese-dry-lager",
    image: "japanese-dry-lager.webp",
    ingredients: ["Malted barley", "Rice", "Hops"],
    name: "Japanese Dry Lager",
    pairingItemIds: ["spicy-tuna-roll", "california-roll"],
    priceCents: 900,
    serving: "Bottle",
    tags: ["beer", "lager", "crisp"],
    tasting: { aromatic: 44, body: 46, bright: 70, dry: 82, finish: 68 },
    texture: "Cold, dry, and crisp",
    chefNote:
      "A simple, refreshing beer for rolls, fried textures, and spicy tuna.",
  },
  {
    abv: 12,
    ageRestricted: true,
    description:
      "Japanese sparkling wine with fine bubbles, orchard fruit, and dry finish.",
    drinkCategory: "beer-wine",
    id: "japanese-sparkling-wine",
    image: "japanese-sparkling-wine.webp",
    ingredients: ["Sparkling wine", "Orchard fruit notes"],
    name: "Japanese Sparkling Wine",
    pairingItemIds: ["salmon-sashimi", "scallop-nigiri"],
    priceCents: 1600,
    serving: "Glass",
    tags: ["wine", "sparkling", "dry"],
    tasting: { aromatic: 66, body: 54, bright: 88, dry: 78, finish: 82 },
    texture: "Fine bubbles and clean fruit",
    chefNote:
      "A bright alternative when the table wants bubbles with sashimi or shellfish.",
  },
];

export const drinkMenuItems = drinkDefinitions.map(createDrinkItem);
