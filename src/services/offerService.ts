import { offers } from "@/data/offers";
import { serviceSuccess, type ServiceResponse } from "@/services/contracts";
import type { Offer } from "@/types/offer";

/** Lists active offer copy through the future offers service boundary. */
export async function listOffers(): Promise<ServiceResponse<Offer[]>> {
  return serviceSuccess(offers);
}
