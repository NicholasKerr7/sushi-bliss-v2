"use client";

import { useCallback, useMemo, useState } from "react";

import { mockUser } from "@/data/mockUser";
import {
  addressToDraft,
  calculatePromoDiscount,
  createAddressFromDraft,
  createOrderFromCheckout,
  findCheckoutPromo,
  getCheckoutTimeSlots,
  getDefaultAddressDraft,
  isPaymentMethodUsable,
  validateCheckoutAddressDraft,
} from "@/lib/checkout";
import { calculateOrderTotals } from "@/lib/money";
import type {
  CheckoutAddressDraft,
  CheckoutValidationState,
} from "@/types/checkout";
import type { FulfillmentMode } from "@/types/common";
import type { CartLineItem, Order } from "@/types/order";
import type { Address } from "@/types/user";

type AddressDraftField = keyof CheckoutAddressDraft;

/** Tracks checkout form selections shared by pickup and delivery flows. */
export function useCheckout(subtotalCents = 0) {
  const initialMode = mockUser.preferences.fulfillmentMode;
  const [mode, setModeState] = useState<FulfillmentMode>(initialMode);
  const [addresses, setAddresses] = useState<Address[]>(mockUser.addresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    mockUser.addresses.find((address) => address.isDefault)?.id ||
      mockUser.addresses[0]?.id ||
      null,
  );
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<
    string | null
  >(
    mockUser.paymentMethods.find((payment) => payment.isDefault)?.id ||
      mockUser.paymentMethods[0]?.id ||
      null,
  );
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
    addresses.find((address) => address.id === selectedAddressId) || null;
  const selectedPaymentMethod =
    mockUser.paymentMethods.find(
      (payment) => payment.id === selectedPaymentMethodId,
    ) || null;
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
    const addressError = validateCheckoutAddressDraft(addressDraft);

    if (addressError) {
      setValidation((current) => ({ ...current, address: addressError }));
      return false;
    }

    const savedAddress = createAddressFromDraft(
      addressDraft,
      editingAddressId || undefined,
    );

    setAddresses((current) => {
      const exists = current.some((address) => address.id === savedAddress.id);

      return exists
        ? current.map((address) =>
            address.id === savedAddress.id ? savedAddress : address,
          )
        : [...current, savedAddress];
    });
    setSelectedAddressId(savedAddress.id);
    setAddressDraft(getDefaultAddressDraft());
    setEditingAddressId(null);
    setAddressFormOpen(false);
    setValidation((current) => ({ ...current, address: undefined }));

    return true;
  }, [addressDraft, editingAddressId]);

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
        customerEmail: mockUser.email,
        customerName: mockUser.name,
        customerPhone: mockUser.phone,
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
    addresses,
    appliedPromo,
    applyPromoCode,
    cancelAddressForm,
    clearPromoCode,
    createCheckoutOrder,
    discountCents,
    editingAddressId,
    mode,
    paymentMethods: mockUser.paymentMethods,
    promoCode,
    reviewTotals,
    saveAddressDraft,
    selectedAddress,
    selectedAddressId,
    selectedPaymentMethod,
    selectedPaymentMethodId,
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
