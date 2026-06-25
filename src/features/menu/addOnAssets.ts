const addOnImageById: Record<string, string> = {
  "caviar-5g": "/assets/ingredients/caviar.webp",
  edamame: "/assets/food/edamame-in-a-rustic-bowl.webp",
  "edamame-side": "/assets/food/edamame-in-a-rustic-bowl.webp",
  "gold-flakes": "/assets/ingredients/gold-flakes.webp",
  "green-onion": "/assets/ingredients/green-onions.webp",
  "ikura-salmon-roe": "/assets/ingredients/ikura-salmon-roe.webp",
  "miso-soup-side": "/assets/food/steaming-miso-soup-in-a-dark-bowl.webp",
  "pickled-ginger-side": "/assets/ingredients/pickled-ginger.webp",
  "seaweed-salad-side": "/assets/ingredients/seaweed-salad.webp",
  "truffle-oil": "/assets/ingredients/truffle-oil.webp",
  "yuzu-zest": "/assets/ingredients/yuzu-zest.webp",
};

const compactAddOnLabelById: Record<string, string> = {
  "caviar-5g": "Caviar 5g",
  "green-onion": "Scallion",
  "ikura-salmon-roe": "Ikura roe",
};

/** Returns the best image asset for a menu add-on or side pairing. */
export function getAddOnImageSrc(addOnId: string) {
  return addOnImageById[addOnId] || "/assets/icons/plus-icon.png";
}

/** Shortens long add-on labels for compact option cards without changing cart data. */
export function getCompactAddOnLabel(addOnId: string, label: string) {
  return compactAddOnLabelById[addOnId] || label;
}
