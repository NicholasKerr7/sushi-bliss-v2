import type { ID, ImageReference } from "@/types/common";

export interface GiftExperience {
  category: string;
  deliveryNote: string;
  description: string;
  id: ID;
  image: ImageReference;
  inclusions: string[];
  priceCents: number;
  title: string;
}

export interface GiftRecipient {
  email: string;
  message?: string;
  name: string;
}

export type GiftDeliveryTiming = "send-now" | "scheduled";

export interface GiftCheckoutDraft {
  deliveryDate: string;
  deliveryTiming: GiftDeliveryTiming;
  giftId: ID;
  message: string;
  paymentMethodId: ID;
  recipientEmail: string;
  recipientName: string;
  senderEmail: string;
  senderName: string;
}

export interface GiftConfirmation {
  confirmationCode: string;
  createdAt: string;
  deliveryDate: string;
  giftId: ID;
  giftImage: ImageReference;
  giftTitle: string;
  id: ID;
  message?: string;
  paymentMethodLabel: string;
  priceCents: number;
  recipient: GiftRecipient;
  senderEmail: string;
  senderName: string;
  status: "sent" | "scheduled";
}

export interface GiftState {
  confirmations: GiftConfirmation[];
}

export interface GiftCheckoutResult {
  confirmation?: GiftConfirmation;
  error?: string;
}
