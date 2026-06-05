import { defaultLoyaltyState, referralProgress, rewards } from "@/data/loyalty";
import { serviceSuccess, type ServiceResponse } from "@/services/contracts";
import type { LoyaltyState, ReferralProgress, Reward } from "@/types/loyalty";

/** Returns mock loyalty state through the future backend service boundary. */
export async function getLoyaltyState(): Promise<
  ServiceResponse<LoyaltyState>
> {
  return serviceSuccess(defaultLoyaltyState);
}

/** Lists rewards behind a boundary that can later validate Supabase row state. */
export async function listRewards(): Promise<ServiceResponse<Reward[]>> {
  return serviceSuccess(rewards);
}

/** Returns referral progress through a backend-ready typed service. */
export async function getReferralProgress(): Promise<
  ServiceResponse<ReferralProgress>
> {
  return serviceSuccess(referralProgress);
}
