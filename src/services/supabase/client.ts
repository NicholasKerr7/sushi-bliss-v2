import {
  getPublicSupabaseEnv,
  getServerSupabaseEnv,
  type PublicSupabaseEnv,
  type ServerSupabaseEnv,
} from "@/services/env";

export interface SupabaseClientPlaceholder<TConfig> {
  config: TConfig;
  driver: "supabase";
  ready: false;
  reason: string;
}

/** Returns browser Supabase config without constructing an SDK client at module scope. */
export function getSupabaseBrowserClientPlaceholder(): SupabaseClientPlaceholder<PublicSupabaseEnv> | null {
  const config = getPublicSupabaseEnv();

  if (!config) {
    return null;
  }

  return {
    config,
    driver: "supabase",
    ready: false,
    reason:
      "Install @supabase/supabase-js or @supabase/ssr before constructing the browser client.",
  };
}

/** Returns server Supabase config for future route handlers and server actions. */
export function getSupabaseServerClientPlaceholder(): SupabaseClientPlaceholder<ServerSupabaseEnv> | null {
  const config = getServerSupabaseEnv();

  if (!config) {
    return null;
  }

  return {
    config,
    driver: "supabase",
    ready: false,
    reason:
      "Keep Supabase secret or service role keys server-only and initialize SDK clients lazily inside request handlers.",
  };
}

/** Reports whether public Supabase values are present without requiring credentials now. */
export function isSupabaseConfigured(): boolean {
  return Boolean(getPublicSupabaseEnv());
}
