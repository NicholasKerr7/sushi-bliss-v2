import type { FulfillmentMode, ID } from "@/types/common";

export interface Address {
  id: ID;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface PaymentMethod {
  id: ID;
  brand: string;
  last4: string;
  expiresAt: string;
  isDefault?: boolean;
}

export interface UserPreferences {
  dietaryTags: string[];
  fulfillmentMode: FulfillmentMode;
  marketingOptIn: boolean;
  orderUpdates: boolean;
}

export interface UserProfile {
  id: ID;
  name: string;
  email: string;
  phone: string;
  tier: string;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  preferences: UserPreferences;
}
