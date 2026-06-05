# Sushi Bliss v2

Clean mobile-first rebuild of Sushi Bliss with Next.js, TypeScript, Tailwind
CSS, and a structure ready for future Supabase, Stripe, and Vercel work.

## Sprint 0 Status

- Next.js App Router scaffolded in `src/app`.
- Tailwind v4 global tokens live in `src/styles/globals.css`.
- Legacy runtime assets and data are copied into `public/assets`.
- Reference screenshots are available through top-level `assets/*` symlinks.
- App shell placeholder is implemented with mobile and desktop navigation.
- Shared types, utilities, hooks, and seed data modules are in place.

## Sprint 1 Status

- Mobile header and bottom navigation are established.
- Tablet navigation uses a dedicated side rail.
- Desktop navigation is separated into reusable header/nav components.
- Reusable UI primitives are available for buttons, cards, badges, status
  badges, inputs, selects, modals, drawers, states, section headers, responsive
  grids, and quantity controls.

## Sprint 2 Status

- Legacy `data.json` is isolated behind typed normalizers in `src/lib/data.ts`.
- Asset manifest helpers provide id, URL, folder, and image fallback lookups.
- Menu, brand, chef, omakase, screenshot, and featured editorial data are
  exposed through small `src/data/*` modules.
- Hooks, utilities, and data transformations include concise docstrings where
  the behavior is stateful or non-obvious.

## Sprint 3 Status

- Home now uses customer-facing restaurant sections instead of sprint preview
  copy.
- The menu explorer supports search, category filtering, result counts, reset
  controls, empty state handling, and responsive item grids.
- Popular menu cards and saved favorites are powered by normalized menu data.
- Favorites persist locally through `useFavorites`.

## Sprint 4 Status

- Menu item details open in a responsive drawer with ingredients, chef notes,
  sake pairing previews, customization groups, add-ons, notes, and quantity.
- Add-to-cart creates persistent local cart lines that merge identical
  customization sets.
- Cart drawer supports empty state, editable quantities, item removal, clear
  cart, and calculated subtotal/tax/service/total summaries.
- Cart state is stored through `useCart` without backend credentials.

## Sprint 5 Status

- Cart checkout now supports pickup or delivery, fulfillment time selection,
  delivery address add/edit, saved payment selection, promo validation, and
  receipt review.
- Placing an order creates a confirmed mock order, clears the cart, and shows an
  order confirmation with a confirmation code.
- Confirmed mock orders are persisted locally for the upcoming orders and
  tracking sprint.

## Sprint 6 Status

- The orders dashboard shows active and past orders from persisted checkout
  data, with mock fallback orders for first-run review.
- Order details include receipt lines, totals, status timeline, courier card,
  and delivery tracking map preview.
- Reorder adds prior order line items back into the cart with their saved
  customizations and add-ons.

## Sprint 7 Status

- Reservations now support experience, date/time, party size, seating,
  occasion, location, guest details, notes, review, and confirmation.
- Reservation history supports modify and cancel actions with persistent local
  storage and future-date validation.
- Locations now include a directory and detail drawer with maps, hours,
  features, and direct reservation entry.

## Sprint 8 Status

- Profile settings now support editable contact details, saved addresses,
  payment methods, dietary preferences, notification preferences, privacy
  settings, reset, and mock logout.
- Profile state is persisted locally through `useProfile` and shared with
  checkout address/payment selection.
- Reservation defaults now use the active profile contact, and the profile
  dashboard summarizes loyalty, active orders, and upcoming reservations.

## Sprint 9 Status

- Loyalty state now persists locally with points balance, lifetime tier
  progress, member pass, reward redemptions, and points activity.
- Checkout awards loyalty points only after a confirmed order, with duplicate
  order awards blocked by order id.
- Rewards validate availability, point cost, and balance before subtracting
  points; invalid reward attempts leave points unchanged.
- Favorites now support quick add-to-cart, offers include detail modals with
  copyable codes, and referrals include a member code plus milestone progress.

## Sprint 10 Status

- Omakase experiences now include package selection, course previews, guest
  count controls, sake pairing options, package review, and reservation entry.
- Premium reservation cards connect chef counter and private room experiences
  back into the reservation flow.
- Gift experiences support recipient/sender details, message, delivery timing,
  saved payment selection, validation, confirmation, and local persistence.
- Sent gift confirmations appear in both the gift section and profile history.

## Sprint 11 Status

- Notifications now include order, reservation, reward, offer, and concierge
  categories with filters, detail modals, related-flow links, and persisted read
  state.
- Support now includes contact methods, a validated concierge form, local
  request history, and help article detail modals.
- About and master chef sections use normalized brand, ambience, and chef asset
  data from the legacy content layer.
- Customer brand/support pages are integrated into the home flow without
  reviving the old monolithic app structure.

## Sprint 12 Status

- Backend-ready service boundaries now live in `src/services`, returning typed
  mock-backed `ServiceResponse<T>` values until Supabase is wired.
- Supabase and Stripe placeholders read env configuration without constructing
  SDK clients or exposing server secrets.
- `.env.example` documents public Supabase keys, server-only Supabase service
  role usage, and future Stripe values.
- Backend planning docs cover service boundaries, suggested API routes, schema
  tables, RLS models, and first-pass indexes.

## Sprint 13 Status

- A separated `/admin` route now uses its own admin shell and navigation.
- The admin dashboard includes overview metrics, menu controls, order status
  advancement, reservation status controls, offer visibility, location review
  flags, customer summaries, and operations analytics.
- Admin functionality is mock/local state only, keeping future Supabase CRUD
  boundaries ready without polluting the customer app shell.

## Sprint 14 Status

- Playwright is configured for desktop and mobile Chromium smoke coverage.
- E2E tests verify the customer home/menu/add-to-cart path and the admin
  dashboard controls.
- Image loading and icon sizing warnings from the browser QA pass were cleaned
  up.
- Browser verification confirms `/` and `/admin` render content without a
  framework error overlay.

## Scripts

```bash
npm run dev
npm run lint
npm run test
npm run typecheck
npm run build
npm run format:check
```

## Environment

Copy `.env.example` when backend services are introduced. Do not commit real
Supabase or Stripe secrets.

## Asset Source

The old `sushi-bliss` repo is used only for assets, data, and reference
screenshots. No old app components or giant app files are carried over.
