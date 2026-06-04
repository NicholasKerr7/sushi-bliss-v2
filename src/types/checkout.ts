import type { FulfillmentMode, ID } from "@/types/common";
import type { OrderTotals } from "@/types/order";
import type { Address, AddressDraft, PaymentMethod } from "@/types/user";

export type CheckoutAddressDraft = AddressDraft;

export interface CheckoutPromo {
  code: string;
  description: string;
  discountType: "percent" | "fixed";
  value: number;
}

export interface CheckoutTimeSlot {
  id: ID;
  label: string;
  value: string;
}

export interface CheckoutValidationState {
  address?: string;
  payment?: string;
  promo?: string;
  time?: string;
}

export interface CheckoutOrderInput {
  address?: Address;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  fulfillmentAt: string;
  mode: FulfillmentMode;
  paymentMethod: PaymentMethod;
  promo?: CheckoutPromo;
  totals: OrderTotals;
}
