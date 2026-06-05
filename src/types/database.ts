export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type BackendTableName =
  | "users"
  | "profiles"
  | "menu_items"
  | "menu_categories"
  | "cart_items"
  | "orders"
  | "order_items"
  | "addresses"
  | "payment_methods"
  | "reservations"
  | "locations"
  | "loyalty_accounts"
  | "rewards"
  | "offers"
  | "referrals"
  | "gift_experiences"
  | "notifications"
  | "support_messages"
  | "admin_users";

export interface BackendTablePlan {
  accessModel: "public-read" | "owner-scoped" | "admin-only" | "service-only";
  description: string;
  name: BackendTableName;
  ownerColumn?: string;
}

export interface Database {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
