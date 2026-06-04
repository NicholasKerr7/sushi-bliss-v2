"use client";

import { useCallback, useMemo, useState } from "react";

import { useProfile } from "@/hooks/useProfile";
import {
  calculatePromoDiscount,
  createOrderFromCheckout,
  findCheckoutPromo,
  getCheckoutTimeSlots,
} from "@/lib/checkout";
import { calculateOrderTotals } from "@/lib/money";
import {
  addressToDraft,
  createAddressFromDraft,
  getDefaultAddressDraft,
  isPaymentMethodUsable,
  validateAddressDraft,
} from "@/lib/profile";
import type {
  CheckoutAddressDraft,
  CheckoutValidationState,
} from "@/types/checkout";
import type { FulfillmentMode } from "@/types/common";
import type { CartLineItem, Order } from "@/types/order";

type AddressDraftField = keyof CheckoutAddressDraft;

/** Tracks checkout form selections shared by pickup and delivery flows. */
export function useCheckout(subtotalCents = 0) {
  const { profile, saveAddress } = useProfile();
  const initialMode = profile.preferences.fulfillmentMode;
  const [mode, setModeState] = useState<FulfillmentMode>(initialMode);
  const defaultAddressId =
    profile.addresses.find((address) => address.isDefault)?.id ||
    profile.addresses[0]?.id ||
    null;
  const defaultPaymentMethodId =
    profile.paymentMethods.find((payment) => payment.isDefault)?.id ||
    profile.paymentMethods[0]?.id ||
    null;
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    defaultAddressId,
  );
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<
    string | null
  >(defaultPaymentMethodId);
  const [selectedTime, setSelectedTime] = useState(
    () => getCheckoutTimeSlots(initialMode)[0]?.value || "",
  );
  const [promoCode, setPromoCodeState] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [addressDraft, setAddressDraft] = useState<CheckoutAddressDraft>(
    getDefaultAddressDraft,
  );
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressFormOpen, setAddressFormOpen] = useState(false);
  const [validation, setValidation] = useState<CheckoutValidationState>({});

  const timeSlots = useMemo(() => getCheckoutTimeSlots(mode), [mode]);
  const selectedAddress =
    profile.addresses.find((address) => address.id === selectedAddressId) ||
    profile.addresses.find((address) => address.id === defaultAddressId) ||
    null;
  const effectiveSelectedAddressId = selectedAddress?.id || null;
  const selectedPaymentMethod =
    profile.paymentMethods.find(
      (payment) => payment.id === selectedPaymentMethodId,
    ) ||
    profile.paymentMethods.find(
      (payment) => payment.id === defaultPaymentMethodId,
    ) ||
    null;
  const effectiveSelectedPaymentMethodId = selectedPaymentMethod?.id || null;
  const appliedPromo = appliedPromoCode
    ? findCheckoutPromo(appliedPromoCode) || null
    : null;
  const discountCents = appliedPromo
    ? calculatePromoDiscount(subtotalCents, appliedPromo.code)
    : 0;
  const reviewTotals = useMemo(
    () => calculateOrderTotals(subtotalCents, discountCents),
    [discountCents, subtotalCents],
  );

  const setMode = useCallback((nextMode: FulfillmentMode) => {
    setModeState(nextMode);
    setSelectedTime(getCheckoutTimeSlots(nextMode)[0]?.value || "");
    setValidation((current) => ({ ...current, address: undefined }));
  }, []);

  const setPromoCode = useCallback((value: string) => {
    setPromoCodeState(value);
    setValidation((current) => ({ ...current, promo: undefined }));
  }, []);

  const updateAddressDraft = useCallback(
    (field: AddressDraftField, value: string) => {
      setAddressDraft((current) => ({ ...current, [field]: value }));
      setValidation((current) => ({ ...current, address: undefined }));
    },
    [],
  );

  const startNewAddress = useCallback(() => {
    setAddressDraft(getDefaultAddressDraft());
    setEditingAddressId(null);
    setAddressFormOpen(true);
    setValidation((current) => ({ ...current, address: undefined }));
  }, []);

  const startEditSelectedAddress = useCallback(() => {
    if (!selectedAddress) {
      startNewAddress();
      return;
    }

    setAddressDraft(addressToDraft(selectedAddress));
    setEditingAddressId(selectedAddress.id);
    setAddressFormOpen(true);
    setValidation((current) => ({ ...current, address: undefined }));
  }, [selectedAddress, startNewAddress]);

  const cancelAddressForm = useCallback(() => {
    setAddressDraft(getDefaultAddressDraft());
    setEditingAddressId(null);
    setAddressFormOpen(false);
    setValidation((current) => ({ ...current, address: undefined }));
  }, []);

  const saveAddressDraft = useCallback(() => {
    const addressError = validateAddressDraft(addressDraft);

    if (addressError) {
      setValidation((current) => ({ ...current, address: addressError }));
      return false;
    }

    const savedAddress = createAddressFromDraft(
      addressDraft,
      editingAddressId || undefined,
    );

    saveAddress(savedAddress);
    setSelectedAddressId(savedAddress.id);
    setAddressDraft(getDefaultAddressDraft());
    setEditingAddressId(null);
    setAddressFormOpen(false);
    setValidation((current) => ({ ...current, address: undefined }));

    return true;
  }, [addressDraft, editingAddressId, saveAddress]);

  const applyPromoCode = useCallback(() => {
    const promo = findCheckoutPromo(promoCode);

    if (!promoCode.trim()) {
      setAppliedPromoCode(null);
      setValidation((current) => ({ ...current, promo: undefined }));
      return true;
    }

    if (!promo) {
      setAppliedPromoCode(null);
      setValidation((current) => ({
        ...current,
        promo: "Enter a valid offer code.",
      }));
      return false;
    }

    setAppliedPromoCode(promo.code);
    setPromoCodeState(promo.code);
    setValidation((current) => ({ ...current, promo: undefined }));
    return true;
  }, [promoCode]);

  const clearPromoCode = useCallback(() => {
    setAppliedPromoCode(null);
    setPromoCodeState("");
    setValidation((current) => ({ ...current, promo: undefined }));
  }, []);

  const validateCheckout = useCallback(() => {
    const nextValidation: CheckoutValidationState = {};

    if (mode === "delivery" && !selectedAddress) {
      nextValidation.address = "Choose or add a delivery address.";
    }

    if (!selectedTime) {
      nextValidation.time = "Choose a pickup or delivery time.";
    }

    if (!selectedPaymentMethod) {
      nextValidation.payment = "Choose a payment method.";
    } else if (!isPaymentMethodUsable(selectedPaymentMethod)) {
      nextValidation.payment = "Choose a payment method that has not expired.";
    }

    setValidation(nextValidation);
    return Object.keys(nextValidation).length === 0;
  }, [mode, selectedAddress, selectedPaymentMethod, selectedTime]);

  const createCheckoutOrder = useCallback(
    (items: CartLineItem[]): Order | null => {
      if (!validateCheckout() || !selectedPaymentMethod) {
        return null;
      }

      return createOrderFromCheckout(items, {
        address: selectedAddress || undefined,
        customerEmail: profile.email,
        customerName: profile.name,
        customerPhone: profile.phone,
        fulfillmentAt: selectedTime,
        mode,
        paymentMethod: selectedPaymentMethod,
        promo: appliedPromo || undefined,
        totals: reviewTotals,
      });
    },
    [
      appliedPromo,
      mode,
      profile.email,
      profile.name,
      profile.phone,
      reviewTotals,
      selectedAddress,
      selectedPaymentMethod,
      selectedTime,
      validateCheckout,
    ],
  );

  return {
    addressDraft,
    addressFormOpen,
    addresses: profile.addresses,
    appliedPromo,
    applyPromoCode,
    cancelAddressForm,
    clearPromoCode,
    createCheckoutOrder,
    discountCents,
    editingAddressId,
    mode,
    paymentMethods: profile.paymentMethods,
    promoCode,
    reviewTotals,
    saveAddressDraft,
    selectedAddress,
    selectedAddressId: effectiveSelectedAddressId,
    selectedPaymentMethod,
    selectedPaymentMethodId: effectiveSelectedPaymentMethodId,
    selectedTime,
    setMode,
    setPromoCode,
    setSelectedAddressId,
    setSelectedPaymentMethodId,
    setSelectedTime,
    startEditSelectedAddress,
    startNewAddress,
    timeSlots,
    updateAddressDraft,
    validation,
  };
}
