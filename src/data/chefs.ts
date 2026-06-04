import { getChefs } from "@/lib/data";

export const chefs = getChefs();

export const chefById = new Map(chefs.map((chef) => [chef.id, chef]));
