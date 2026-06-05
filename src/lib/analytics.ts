/** Reports whether a future analytics provider should be initialized. */
export function isAnalyticsEnabled(
  env: NodeJS.ProcessEnv = process.env,
): boolean {
  return env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";
}
