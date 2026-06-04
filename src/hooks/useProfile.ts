"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import { mockUser } from "@/data/mockUser";
import {
  applyProfileDetailsDraft,
  removeAddress,
  removePaymentMethod,
  setDefaultAddress,
  setDefaultPaymentMethod,
  updatePreferences as mergePreferences,
  upsertAddress,
  upsertPaymentMethod,
} from "@/lib/profile";
import {
  getProfileSnapshot,
  parseStoredProfile,
  readStoredProfile,
  subscribeToProfile,
  writeStoredProfile,
} from "@/lib/profileStorage";
import type {
  Address,
  PaymentMethod,
  ProfileDetailsDraft,
  UserPreferences,
  UserProfile,
} from "@/types/user";

type PreferencesUpdate =
  | Partial<UserPreferences>
  | ((preferences: UserPreferences) => UserPreferences);

/** Provides persisted local profile state until Supabase auth/profile wiring exists. */
export function useProfile(initialProfile: UserProfile = mockUser) {
  const snapshot = useSyncExternalStore(
    subscribeToProfile,
    getProfileSnapshot,
    () => JSON.stringify(initialProfile),
  );
  const profile = useMemo(
    () => parseStoredProfile(snapshot, initialProfile),
    [initialProfile, snapshot],
  );

  const updateProfile = useCallback(
    (updater: (profile: UserProfile) => UserProfile) => {
      writeStoredProfile(updater(readStoredProfile(initialProfile)));
    },
    [initialProfile],
  );

  const saveProfileDetails = useCallback(
    (draft: ProfileDetailsDraft) => {
      updateProfile((current) => applyProfileDetailsDraft(current, draft));
    },
    [updateProfile],
  );

  const saveAddress = useCallback(
    (address: Address) => {
      updateProfile((current) => ({
        ...current,
        addresses: upsertAddress(current.addresses, address),
      }));

      return address;
    },
    [updateProfile],
  );

  const deleteAddress = useCallback(
    (id: string) => {
      updateProfile((current) => ({
        ...current,
        addresses: removeAddress(current.addresses, id),
      }));
    },
    [updateProfile],
  );

  const makeDefaultAddress = useCallback(
    (id: string) => {
      updateProfile((current) => ({
        ...current,
        addresses: setDefaultAddress(current.addresses, id),
      }));
    },
    [updateProfile],
  );

  const savePaymentMethod = useCallback(
    (paymentMethod: PaymentMethod) => {
      updateProfile((current) => ({
        ...current,
        paymentMethods: upsertPaymentMethod(
          current.paymentMethods,
          paymentMethod,
        ),
      }));

      return paymentMethod;
    },
    [updateProfile],
  );

  const deletePaymentMethod = useCallback(
    (id: string) => {
      updateProfile((current) => ({
        ...current,
        paymentMethods: removePaymentMethod(current.paymentMethods, id),
      }));
    },
    [updateProfile],
  );

  const makeDefaultPaymentMethod = useCallback(
    (id: string) => {
      updateProfile((current) => ({
        ...current,
        paymentMethods: setDefaultPaymentMethod(current.paymentMethods, id),
      }));
    },
    [updateProfile],
  );

  const updateProfilePreferences = useCallback(
    (nextPreferences: PreferencesUpdate) => {
      updateProfile((current) => ({
        ...current,
        preferences:
          typeof nextPreferences === "function"
            ? nextPreferences(current.preferences)
            : mergePreferences(current.preferences, nextPreferences),
      }));
    },
    [updateProfile],
  );

  const resetProfile = useCallback(() => {
    writeStoredProfile(initialProfile);
  }, [initialProfile]);

  return {
    deleteAddress,
    deletePaymentMethod,
    makeDefaultAddress,
    makeDefaultPaymentMethod,
    profile,
    resetProfile,
    saveAddress,
    savePaymentMethod,
    saveProfileDetails,
    updateProfilePreferences,
  };
}
