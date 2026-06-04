"use client";

import { useState } from "react";

import { mockUser } from "@/data/mockUser";
import type { UserProfile } from "@/types/user";

/** Provides mutable local profile state until Supabase auth/profile wiring exists. */
export function useProfile(initialProfile: UserProfile = mockUser) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  return {
    profile,
    setProfile,
  };
}
