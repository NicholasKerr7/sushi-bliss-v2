export const APP_NAME = "Sushi Bliss";

export const DEFAULT_CURRENCY = "USD";

export const SALES_TAX_RATE = 0.08875;

export const SERVICE_FEE_CENTS = 250;

export const RESPONSIVE_BREAKPOINTS = {
  tablet: 768,
  desktop: 1280,
} as const;

export const ASSET_FALLBACKS = {
  menuItem: "/assets/food/luxury-sushi-platter-on-marble-surface.webp",
  brandLogo: "/assets/brand/sushi-bliss-primary-logo.png",
  brandIcon: "/assets/brand/sushi-bliss-app-icon.png",
} as const;

export const ENV_KEYS = {
  supabaseUrl: "NEXT_PUBLIC_SUPABASE_URL",
  supabaseAnonKey: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  stripePublishableKey: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
} as const;
