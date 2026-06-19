import type { RestaurantLocation } from "@/types/location";

export const locations: RestaurantLocation[] = [
  {
    address: "4-12 Ginza, Tokyo",
    description:
      "A rooftop dining room with lantern-lit city views, private booths, and a quiet omakase counter.",
    email: "ginza@sushibliss.example",
    features: ["Rooftop", "Private booths", "Omakase counter"],
    hours: "Mon - Sun, 5:00 PM - 11:00 PM",
    id: "tokyo-rooftop",
    imageUrl:
      "/assets/gallery/serene-illuminated-courtyard-with-red-blossoms.webp",
    mapImageUrl: "/assets/maps/map-ginza.webp",
    name: "Sushi Bliss Ginza",
    neighborhood: "Ginza",
    phone: "+81 3 0000 0000",
  },
  {
    address: "18 Lantern Lane, Shibuya, Tokyo",
    description:
      "An intimate sushi bar focused on chef interaction, premium nigiri, and sake-led pairings.",
    email: "bar@sushibliss.example",
    features: ["Chef counter", "Sake cellar", "Late seating"],
    hours: "Tue - Sun, 4:30 PM - 12:00 AM",
    id: "sushi-bar",
    imageUrl: "/assets/gallery/elegant-sushi-bar-with-amber-lighting.webp",
    mapImageUrl: "/assets/maps/map-shibuya.webp",
    name: "Sushi Bliss Shibuya",
    neighborhood: "Shibuya",
    phone: "+81 3 1111 1111",
  },
  {
    address: "7 Kintsugi Court, Chuo City, Tokyo",
    description:
      "A serene courtyard dining room for celebrations, tasting menus, and larger parties.",
    email: "courtyard@sushibliss.example",
    features: ["Garden room", "Celebrations", "Group dining"],
    hours: "Wed - Sun, 12:00 PM - 10:00 PM",
    id: "kintsugi-courtyard",
    imageUrl: "/assets/gallery/tranquil-courtyard-at-night.webp",
    mapImageUrl: "/assets/maps/map-location.webp",
    name: "Sushi Bliss Downtown",
    neighborhood: "Chuo City",
    phone: "+81 3 2222 2222",
  },
];
