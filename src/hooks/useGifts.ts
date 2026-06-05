"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import { giftExperiences } from "@/data/gifts";
import { createGiftConfirmation, validateGiftCheckoutDraft } from "@/lib/gifts";
import {
  getGiftSnapshot,
  parseStoredGiftState,
  readStoredGiftState,
  subscribeToGifts,
  writeStoredGiftState,
} from "@/lib/giftStorage";
import type {
  GiftCheckoutDraft,
  GiftCheckoutResult,
  GiftConfirmation,
} from "@/types/gift";
import type { PaymentMethod } from "@/types/user";

/** Persists purchased gift experiences until backend order history exists. */
export function useGifts() {
  const snapshot = useSyncExternalStore(subscribeToGifts, getGiftSnapshot, () =>
    JSON.stringify({ confirmations: [] }),
  );
  const state = useMemo(() => parseStoredGiftState(snapshot), [snapshot]);

  const addGiftConfirmation = useCallback((confirmation: GiftConfirmation) => {
    const currentState = readStoredGiftState();

    writeStoredGiftState({
      confirmations: [confirmation, ...currentState.confirmations],
    });
  }, []);

  const sendGift = useCallback(
    (
      draft: GiftCheckoutDraft,
      paymentMethods: PaymentMethod[],
    ): GiftCheckoutResult => {
      const validationMessage = validateGiftCheckoutDraft(
        draft,
        paymentMethods,
      );

      if (validationMessage) {
        return { error: validationMessage };
      }

      const paymentMethod = paymentMethods.find(
        (method) => method.id === draft.paymentMethodId,
      );

      if (!paymentMethod) {
        return { error: "Choose a saved payment method." };
      }

      const confirmation = createGiftConfirmation(draft, paymentMethod);
      addGiftConfirmation(confirmation);

      return { confirmation };
    },
    [addGiftConfirmation],
  );

  return {
    addGiftConfirmation,
    confirmations: state.confirmations,
    giftExperiences,
    hasGiftHistory: state.confirmations.length > 0,
    sendGift,
  };
}
