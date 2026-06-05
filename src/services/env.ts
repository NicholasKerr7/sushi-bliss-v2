type EnvKey =
  | "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
  | "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  | "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
  | "NEXT_PUBLIC_SUPABASE_URL"
  | "STRIPE_SECRET_KEY"
  | "STRIPE_WEBHOOK_SECRET"
  | "SUPABASE_SERVICE_ROLE_KEY";

type EnvRecord = NodeJS.ProcessEnv &
  Partial<Record<EnvKey, string | undefined>>;

export interface PublicSupabaseEnv {
  anonKey?: string;
  publishableKey: string;
  url: string;
}

export interface ServerSupabaseEnv extends PublicSupabaseEnv {
  serviceRoleKey?: string;
}

export interface StripeEnv {
  publishableKey?: string;
  secretKey?: string;
  webhookSecret?: string;
}

function cleanEnvValue(value: string | undefined): string | undefined {
  const trimmed = value?.trim();

  return trimmed ? trimmed : undefined;
}

/** Reads only browser-safe Supabase values for future client initialization. */
export function getPublicSupabaseEnv(
  env: EnvRecord = process.env,
): PublicSupabaseEnv | null {
  const url = cleanEnvValue(env.NEXT_PUBLIC_SUPABASE_URL);
  const publishableKey =
    cleanEnvValue(env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) ||
    cleanEnvValue(env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (!url || !publishableKey) {
    return null;
  }

  return {
    anonKey: cleanEnvValue(env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    publishableKey,
    url,
  };
}

/** Reads server-only Supabase values without exposing them to client bundles. */
export function getServerSupabaseEnv(
  env: EnvRecord = process.env,
): ServerSupabaseEnv | null {
  const publicEnv = getPublicSupabaseEnv(env);

  if (!publicEnv) {
    return null;
  }

  return {
    ...publicEnv,
    serviceRoleKey: cleanEnvValue(env.SUPABASE_SERVICE_ROLE_KEY),
  };
}

/** Reads Stripe placeholders for future checkout session and webhook services. */
export function getStripeEnv(env: EnvRecord = process.env): StripeEnv {
  return {
    publishableKey: cleanEnvValue(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
    secretKey: cleanEnvValue(env.STRIPE_SECRET_KEY),
    webhookSecret: cleanEnvValue(env.STRIPE_WEBHOOK_SECRET),
  };
}
