import { getStripeEnv } from "@/services/env";

export interface StripeReadiness {
  canCreateCheckoutSessions: boolean;
  canRenderPaymentElements: boolean;
  canVerifyWebhooks: boolean;
}

/** Reports Stripe readiness without importing the Stripe SDK or exposing secrets. */
export function getStripeReadiness(): StripeReadiness {
  const env = getStripeEnv();

  return {
    canCreateCheckoutSessions: Boolean(env.secretKey),
    canRenderPaymentElements: Boolean(env.publishableKey),
    canVerifyWebhooks: Boolean(env.webhookSecret),
  };
}
