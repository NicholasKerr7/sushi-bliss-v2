"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import { defaultSupportState } from "@/data/support";
import {
  createSupportMessage,
  hasSupportValidationErrors,
  validateSupportMessageDraft,
  type SubmitSupportMessageResult,
} from "@/lib/support";
import {
  addStoredSupportMessage,
  getSupportSnapshot,
  parseStoredSupportState,
  subscribeToSupport,
} from "@/lib/supportStorage";
import type { SupportMessageDraft, SupportState } from "@/types/support";

/** Provides locally persisted support requests until backend messaging exists. */
export function useSupport(initialState: SupportState = defaultSupportState) {
  const snapshot = useSyncExternalStore(
    subscribeToSupport,
    getSupportSnapshot,
    () => JSON.stringify(initialState),
  );
  const supportState = useMemo(
    () => parseStoredSupportState(snapshot, initialState),
    [initialState, snapshot],
  );

  const submitSupportMessage = useCallback(
    (draft: SupportMessageDraft): SubmitSupportMessageResult => {
      const validation = validateSupportMessageDraft(draft);

      if (hasSupportValidationErrors(validation)) {
        return {
          statusMessage: "Please fix the highlighted fields.",
          validation,
        };
      }

      const message = createSupportMessage(draft);
      addStoredSupportMessage(message);

      return {
        message,
        statusMessage: `Request ${message.id.toUpperCase()} received.`,
        validation: {},
      };
    },
    [],
  );

  return {
    messages: supportState.messages,
    submitSupportMessage,
    supportState,
  };
}
