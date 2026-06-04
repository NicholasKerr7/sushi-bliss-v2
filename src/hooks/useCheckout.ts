"use client";

import { useState } from "react";

import type { FulfillmentMode } from "@/types/common";

/** Tracks checkout form selections shared by pickup and delivery flows. */
export function useCheckout() {
  const [mode, setMode] = useState<FulfillmentMode>("pickup");
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<
    string | null
  >(null);

  return {
    mode,
    selectedAddressId,
    selectedPaymentMethodId,
    setMode,
    setSelectedAddressId,
    setSelectedPaymentMethodId,
  };
}
