import type { ID } from "@/types/common";

export interface RestaurantLocation {
  id: ID;
  name: string;
  address: string;
  neighborhood: string;
  phone: string;
  email: string;
  hours: string;
  imageUrl: string;
  mapImageUrl: string;
  features: string[];
  description: string;
}
