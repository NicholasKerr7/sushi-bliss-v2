# Supabase Schema Plan

This is a planning document only. No Supabase migrations were created in Sprint 12. The app remains mock/local-data powered.

## Global Rules

- Enable RLS on every table in the exposed `public` schema.
- Use `auth.uid()` only for owner-scoped user rows.
- Keep `service_role` operations in server-only route handlers.
- Store authorization roles in database tables or app metadata, not editable
  user metadata.
- Use `created_at`, `updated_at`, and UUID primary keys on application-owned
  tables unless an imported content id is intentionally stable.
- Add soft-delete or status columns where customer history must be retained.

## Tables

| Table              | Access model | Purpose                                                                   | Key relationships                                                           |
| ------------------ | ------------ | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `users`            | owner-scoped | Application mirror of Supabase Auth users for app joins.                  | `id` maps to `auth.users.id`; parent for profiles, orders, reservations.    |
| `profiles`         | owner-scoped | Customer contact details, tier label, and app preferences.                | `user_id` references `users.id`.                                            |
| `menu_categories`  | public-read  | Normalized menu category labels and ordering.                             | Referenced by `menu_items.category_id`.                                     |
| `menu_items`       | public-read  | Menu item copy, pricing, tags, ingredients, image references, chef notes. | Belongs to `menu_categories`; referenced by `order_items` and `cart_items`. |
| `cart_items`       | owner-scoped | Optional server-side saved cart lines for signed-in users.                | `user_id`, `menu_item_id`; stores add-ons/customizations JSON.              |
| `orders`           | owner-scoped | Checkout records, fulfillment mode, status, totals, confirmation codes.   | `user_id`, `address_id`, `payment_method_id`, optional `offer_id`.          |
| `order_items`      | owner-scoped | Immutable line item snapshot at purchase time.                            | `order_id`, `menu_item_id`; stores price and customization JSON.            |
| `addresses`        | owner-scoped | Saved delivery and profile addresses.                                     | `user_id`; referenced by orders.                                            |
| `payment_methods`  | owner-scoped | Tokenized payment method metadata only.                                   | `user_id`; Stripe payment method id can be server-only.                     |
| `reservations`     | owner-scoped | Booking details, status, party size, seating, occasion, notes.            | `user_id`, `location_id`; optional experience id.                           |
| `locations`        | public-read  | Restaurant locations, maps, contact details, hours, feature tags.         | Referenced by reservations.                                                 |
| `loyalty_accounts` | owner-scoped | Points balance, tier, lifetime points, member code.                       | `user_id`; updated after confirmed orders and redemptions.                  |
| `rewards`          | public-read  | Reward catalog, point costs, availability, terms.                         | Referenced by loyalty redemption records.                                   |
| `offers`           | public-read  | Promotion copy, codes, eligibility, expiration dates.                     | Referenced by orders when redeemed.                                         |
| `referrals`        | owner-scoped | Referral code progress and invited guest milestones.                      | `referrer_user_id`, optional `referred_user_id`.                            |
| `gift_experiences` | public-read  | Gift catalog entries, price, inclusions, delivery copy, images.           | Referenced by future gift confirmations.                                    |
| `notifications`    | owner-scoped | Order, reservation, reward, offer, and support notification records.      | `user_id`; optional related entity id/type.                                 |
| `support_messages` | owner-scoped | Concierge support requests and status.                                    | `user_id`; optional order/reservation/gift reference.                       |
| `admin_users`      | admin-only   | Staff access list for future admin routes.                                | `user_id` references `users.id`; should not be client-readable.             |

## RLS Policy Sketch

- Public-read catalog tables: allow `select` to anon/authenticated roles; restrict
  insert/update/delete to admin service routes.
- Owner-scoped tables: allow authenticated users to select and mutate rows where
  `user_id = auth.uid()`.
- Order and order item updates should be limited by status. Customers can create
  draft/confirmed orders, but fulfillment status changes should be admin or
  service-only.
- Loyalty balance mutation should be service-only. Customers can select their
  own account and transactions.
- Support messages can be inserted by the owner, selected by owner/admin, and
  status-updated by admin/service roles.
- Admin tables are service-only or admin-claim gated. Do not expose them to anon.

## Indexes To Add First

- `profiles(user_id unique)`
- `menu_items(category_id, is_active)`
- `menu_items(search_text)` with a full-text index after search moves to
  Postgres.
- `orders(user_id, created_at desc)`
- `orders(status, fulfillment_at)`
- `order_items(order_id)`
- `reservations(user_id, starts_at desc)`
- `reservations(location_id, starts_at)`
- `notifications(user_id, read_at, created_at desc)`
- `support_messages(user_id, created_at desc)`
- `loyalty_accounts(user_id unique)`
- `referrals(referrer_user_id)`

## Data Migration Notes

- `public/assets/data/data.json` should seed menu, chefs, omakase, and brand
  content before customer data moves.
- Image fields should store public asset paths first; Supabase Storage can be
  introduced later without changing UI image contracts.
- Keep Stripe identifiers out of client-visible payment method rows unless they
  are publishable-safe tokens.
