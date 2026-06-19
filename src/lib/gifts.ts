import { giftExperiences } from "@/data/gifts";
import { isEmail } from "@/lib/validation";
import type {
  GiftCheckoutDraft,
  GiftConfirmation,
  GiftExperience,
} from "@/types/gift";
import type { PaymentMethod } from "@/types/user";

export const GIFT_DELIVERY_DEFAULT_TIME = "10:00";
export const GIFT_DELIVERY_TIME_OPTIONS = [
  { label: "10:00 AM", value: "10:00" },
  { label: "12:00 PM", value: "12:00" },
  { label: "3:00 PM", value: "15:00" },
  { label: "6:00 PM", value: "18:00" },
] as const;

export function getGiftExperienceById(
  giftId: string,
): GiftExperience | undefined {
  return giftExperiences.find((gift) => gift.id === giftId);
}

export function getDefaultGiftCheckoutDraft(
  giftId: string,
  senderName: string,
  senderEmail: string,
  paymentMethodId = "",
): GiftCheckoutDraft {
  return {
    deliveryDate: "",
    deliveryTime: GIFT_DELIVERY_DEFAULT_TIME,
    deliveryTiming: "send-now",
    giftId,
    message: "",
    paymentMethodId,
    recipientEmail: "",
    recipientName: "",
    senderEmail,
    senderName,
  };
}

/** Generates a readable mock confirmation code for gift experience purchases. */
export function createGiftConfirmationCode(date = new Date()): string {
  const datePart = date.toISOString().slice(2, 10).replaceAll("-", "");
  const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `GF-${datePart}-${randomPart}`;
}

/** Validates gift checkout fields before writing a confirmation to local state. */
export function validateGiftCheckoutDraft(
  draft: GiftCheckoutDraft,
  paymentMethods: PaymentMethod[],
  now = new Date(),
): string {
  if (!getGiftExperienceById(draft.giftId)) {
    return "Choose a gift experience.";
  }

  if (!draft.recipientName.trim()) {
    return "Recipient name is required.";
  }

  if (!isEmail(draft.recipientEmail)) {
    return "Enter a valid recipient email.";
  }

  if (!draft.senderName.trim()) {
    return "Sender name is required.";
  }

  if (!isEmail(draft.senderEmail)) {
    return "Enter a valid sender email.";
  }

  if (
    !paymentMethods.some(
      (paymentMethod) => paymentMethod.id === draft.paymentMethodId,
    )
  ) {
    return "Choose a saved payment method.";
  }

  if (draft.deliveryTiming === "scheduled") {
    if (!draft.deliveryDate) {
      return "Choose a scheduled delivery date.";
    }

    if (!draft.deliveryTime) {
      return "Choose a scheduled delivery time.";
    }

    const deliveryDate = new Date(
      `${draft.deliveryDate}T${draft.deliveryTime}:00`,
    );

    if (deliveryDate.getTime() <= now.getTime()) {
      return "Scheduled delivery must be in the future.";
    }
  }

  return "";
}

export function formatPaymentMethodLabel(paymentMethod: PaymentMethod): string {
  return `${paymentMethod.brand} ending ${paymentMethod.last4}`;
}

/** Creates the local gift confirmation used by profile and gift history surfaces. */
export function createGiftConfirmation(
  draft: GiftCheckoutDraft,
  paymentMethod: PaymentMethod,
  date = new Date(),
): GiftConfirmation {
  const gift = getGiftExperienceById(draft.giftId) || giftExperiences[0];
  const deliveryDate =
    draft.deliveryTiming === "scheduled" && draft.deliveryDate
      ? new Date(
          `${draft.deliveryDate}T${draft.deliveryTime || GIFT_DELIVERY_DEFAULT_TIME}:00`,
        ).toISOString()
      : date.toISOString();

  return {
    confirmationCode: createGiftConfirmationCode(date),
    createdAt: date.toISOString(),
    deliveryDate,
    giftId: gift.id,
    giftImage: gift.image,
    giftTitle: gift.title,
    id: `gift-${date.getTime()}`,
    message: draft.message.trim() || undefined,
    paymentMethodLabel: formatPaymentMethodLabel(paymentMethod),
    priceCents: gift.priceCents,
    recipient: {
      email: draft.recipientEmail.trim(),
      message: draft.message.trim() || undefined,
      name: draft.recipientName.trim(),
    },
    senderEmail: draft.senderEmail.trim(),
    senderName: draft.senderName.trim(),
    status: draft.deliveryTiming === "scheduled" ? "scheduled" : "sent",
  };
}
