import { mockUser } from "@/data/mockUser";
import { serviceSuccess, type ServiceResponse } from "@/services/contracts";
import type { UserProfile } from "@/types/user";

/** Returns the active mock profile until Supabase Auth profiles are wired. */
export async function getCurrentProfile(): Promise<
  ServiceResponse<UserProfile>
> {
  return serviceSuccess(mockUser);
}
