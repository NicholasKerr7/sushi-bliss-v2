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

export interface AddressDraft {
  city: string;
  label: string;
  line1: string;
  line2: string;
  postalCode: string;
  region: string;
}

export interface PaymentMethod {
  id: ID;
  brand: string;
  label?: string;
  last4: string;
  expiresAt: string;
  billingPostalCode?: string;
  isDefault?: boolean;
}

export interface PaymentMethodDraft {
  billingPostalCode: string;
  brand: string;
  expiresAt: string;
  label: string;
  last4: string;
}

export interface ProfileDetailsDraft {
  email: string;
  name: string;
  phone: string;
}

export interface UserNotificationPreferences {
  conciergeMessages: boolean;
  offerAlerts: boolean;
  orderUpdates: boolean;
  reservationReminders: boolean;
  rewardAlerts: boolean;
}

export interface UserPrivacyPreferences {
  loginAlerts: boolean;
  personalizedRecommendations: boolean;
  shareDiningHistory: boolean;
  twoFactorEnabled: boolean;
}

export interface UserPreferences {
  dietaryTags: string[];
  fulfillmentMode: FulfillmentMode;
  marketingOptIn: boolean;
  notifications: UserNotificationPreferences;
  privacy: UserPrivacyPreferences;
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
