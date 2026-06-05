import { giftExperiences } from "@/data/gifts";
import { serviceSuccess, type ServiceResponse } from "@/services/contracts";
import type { GiftExperience } from "@/types/gift";

/** Lists gift experiences through a future Supabase-ready service boundary. */
export async function listGiftExperiences(): Promise<
  ServiceResponse<GiftExperience[]>
> {
  return serviceSuccess(giftExperiences);
}
