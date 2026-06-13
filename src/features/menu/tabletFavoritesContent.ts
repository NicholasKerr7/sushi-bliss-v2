export const tabletSavedExperiences = [
  {
    date: "May 24, 2024",
    description:
      "An immersive multi-course journey crafted by our master chefs.",
    href: "/omakase",
    image: "/assets/gallery/intimate-upscale-dining-room-setting.webp",
    location: "Sushi Bliss Downtown",
    partySize: "2 Guests",
    time: "7:00 PM",
    title: "Chef's Omakase Experience",
  },
  {
    date: "May 24, 2024",
    description: "Hand-selected sake to elevate your sushi experience.",
    href: "/gifts",
    image: "/assets/editorial/sake-vase-set-black-gold-floral.webp",
    location: "Sushi Bliss Downtown",
    partySize: "2 Guests",
    time: "7:00 PM",
    title: "Premium Sake Pairing",
  },
  {
    date: "Aug 15, 2024",
    description: "Make your special day unforgettable.",
    href: "/reservations",
    image: "/assets/editorial/elegant-matcha-mousse-with-golden-accents.webp",
    location: "Sushi Bliss Downtown",
    partySize: "4 Guests",
    time: "8:00 PM",
    title: "Birthday Celebration",
  },
] as const;

export type TabletSavedExperience = (typeof tabletSavedExperiences)[number];

export const tabletFavoriteBenefits = [
  [
    "Premium ingredients",
    "Sourced Daily",
    "/assets/icons/floral-emblem-icon.png",
  ],
  [
    "Expert craftsmanship",
    "By Master Chefs",
    "/assets/icons/chef-crest-icon.png",
  ],
  [
    "Authentic experience",
    "Traditional. Refined.",
    "/assets/icons/user-icon.png",
  ],
  [
    "Exclusive reservations",
    "Priority for Members",
    "/assets/icons/takeaway-bag-icon.png",
  ],
] as const;
