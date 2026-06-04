"use client";

import { useState } from "react";

import type { FulfillmentMode } from "@/types/common";

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
