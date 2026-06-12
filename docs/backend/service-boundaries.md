# Backend Service Boundaries

Sprint 12 keeps the app on mock/local data while defining the seams where
Supabase, Stripe, and route handlers can plug in later.

Docs checked June 12, 2026: Supabase now recommends publishable keys for
browser-safe clients, secret/service-role keys stay server-only, and SSR
clients should be created through `@supabase/ssr` with cookie handling when
auth is added.

## Current Boundary

- `src/services/*Service.ts` exposes typed async functions returning
  `ServiceResponse<T>`.
- The current source is `mock`, so UI flows stay deterministic and require no
  credentials.
- Future Supabase implementations should preserve the response shape and swap
  only the internals of each service.
- No SDK clients are created at module scope. Initialize Supabase or Stripe
  lazily inside route handlers, server actions, or explicit client factories.
- The service layer now covers menu, checkout order creation, orders,
  reservations, locations, gifts, loyalty, offers, profile, support,
  notifications, and admin dashboard snapshots.

## Supabase Placeholder

- `src/services/supabase/client.ts` reads browser-safe and server-only config
  without importing `@supabase/supabase-js` or `@supabase/ssr` yet.
- Browser code may only use `NEXT_PUBLIC_SUPABASE_URL` plus
  `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or the legacy anon key fallback.
- `SUPABASE_SECRET_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are server-only and
  must never be referenced from client components.
- When real Supabase wiring starts, install the SDKs and add lazy client
  creation functions rather than exporting singleton clients.

## Stripe Placeholder

- `src/services/payments/stripe.ts` only reports readiness based on env
  presence.
- `STRIPE_PUBLISHABLE_KEY` is accepted for Vercel Marketplace compatibility,
  while `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` remains the only client-exposed
  browser alias.
- Future checkout should use server-created Stripe Checkout Sessions or Payment
  Intents.
- Webhook verification must run server-side with `STRIPE_WEBHOOK_SECRET`.

## Suggested Future API Routes

- `GET /api/menu` for catalog reads and search.
- `POST /api/orders` for checkout order creation and loyalty award side effects.
- `GET /api/orders` for the signed-in user's order history.
- `POST /api/reservations` for booking creation.
- `PATCH /api/reservations/:id` for modify/cancel operations.
- `POST /api/support/messages` for concierge requests.
- `POST /api/gifts` for gift checkout and confirmation storage.
- `POST /api/stripe/webhook` for payment events.

## Integration Order

1. Add generated database types after migrations exist.
2. Replace read-only services first: menu, locations, offers, rewards.
3. Add authenticated profile reads through Supabase Auth.
4. Move mutable flows one at a time: orders, reservations, support, gifts.
5. Add Stripe session creation and webhook fulfillment after order writes are
   transactional.
