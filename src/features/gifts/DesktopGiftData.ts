import { GIFT_DELIVERY_TIME_OPTIONS } from "@/lib/gifts";

/** Returns the earliest default date used for scheduled gift delivery. */
export function getDefaultDeliveryDate() {
  const date = new Date();
  date.setDate(date.getDate() + 10);

  return date.toISOString().slice(0, 10);
}

/** Converts a stored delivery-time value into the customer-facing label. */
export function getDeliveryTimeLabel(value: string) {
  return (
    GIFT_DELIVERY_TIME_OPTIONS.find((option) => option.value === value)
      ?.label || "10:00 AM"
  );
}
