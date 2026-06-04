export type ID = string;

export type CurrencyCode = "USD";

export type FulfillmentMode = "pickup" | "delivery";

export type StatusTone =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "premium";

export interface ImageReference {
  filePath?: string;
  publicUrl: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface NavigationItem {
  id: ID;
  label: string;
  href: string;
  iconUrl?: string;
  disabled?: boolean;
}

export interface SelectOption<TValue extends string = string> {
  label: string;
  value: TValue;
  disabled?: boolean;
}
