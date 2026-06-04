import type { FulfillmentMode, ID } from "@/types/common";
import type { MenuItem } from "@/types/menu";
import type { Address, PaymentMethod } from "@/types/user";

export type OrderStatus =
  | "draft"
  | "confirmed"
  | "preparing"
  | "ready"
  | "out-for-delivery"
  | "completed"
  | "cancelled";

export interface CartLineItem {
  id: ID;
  menuItemId: ID;
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
  addOns: CartSelectedAddOn[];
  customizations: CartCustomization[];
}

export interface StoredCartLineItem {
  id: ID;
  menuItemId: ID;
  quantity: number;
  notes?: string;
  addOns: CartSelectedAddOn[];
  customizations: CartCustomization[];
}

export interface CartItemDraft {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
  addOns: CartSelectedAddOn[];
  customizations: CartCustomization[];
}

export interface CartSelectedAddOn {
  id: ID;
  label: string;
  priceCents: number;
}

export interface CartCustomization {
  groupId: ID;
  groupLabel: string;
  optionId: ID;
  optionLabel: string;
}

export interface CartAddOnDefinition extends CartSelectedAddOn {
  description: string;
  premiumOnly?: boolean;
}

export interface CartCustomizationOption {
  id: ID;
  label: string;
  description: string;
}

export interface CartCustomizationGroup {
  id: ID;
  label: string;
  options: CartCustomizationOption[];
}

export interface OrderTotals {
  subtotalCents: number;
  taxCents: number;
  serviceFeeCents: number;
  discountCents: number;
  totalCents: number;
}

export interface Order {
  id: ID;
  status: OrderStatus;
  mode: FulfillmentMode;
  items: CartLineItem[];
  totals: OrderTotals;
  createdAt: string;
  confirmationCode: string;
  customer: OrderCustomer;
  deliveryAddress?: Address;
  fulfillmentAt: string;
  paymentMethod: PaymentMethod;
  promoCode?: string;
  courier?: OrderCourier;
}

export interface OrderCustomer {
  email: string;
  name: string;
  phone: string;
}

export interface OrderCourier {
  id: ID;
  name: string;
  phone: string;
  etaMinutes: number;
  vehicle: string;
}

export interface OrderTimelineStep {
  id: ID;
  label: string;
  description: string;
  completed: boolean;
  timestamp?: string;
}
