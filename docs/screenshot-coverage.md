# Screenshot Coverage

This document tracks reference-screen coverage for the clean rebuild. A screen is
only considered audited when `tests/e2e/visual-reference.spec.ts` captures the
current viewport and attaches the matching reference PNG.

## Status Key

- `Audited`: covered by the Playwright visual reference audit.
- `Built / needs audit`: the route or flow exists, but the exact reference screen
  still needs a dedicated visual target and pixel pass.
- `Needs mapping`: the reference asset needs a manual naming pass before it can
  be linked to a route or interaction.

## Current Totals

| Breakpoint | References | Audited | Built / needs audit | Needs mapping |
| ---------- | ---------: | ------: | ------------------: | ------------: |
| Mobile     |         60 |      60 |                   0 |             0 |
| Tablet     |         40 |      38 |                   2 |             0 |
| Desktop    |         40 |      40 |                   0 |             0 |

The tablet reference `tablet-05-item-detail-otoro-nigiri.png` currently shows an
order confirmation composition, so the visual audit maps it to tablet order
confirmation until the reference filename is corrected.

The mobile references `mobile-21.png` through `mobile-30.png` and
`mobile-51.png` through `mobile-60.png` are stored in the mobile folder but have
941x1672 source dimensions, so the audit records each file's true reference size
while still exercising the mobile viewport.

## Tablet References

| Reference                                     | Route / interaction               | Status              |
| --------------------------------------------- | --------------------------------- | ------------------- |
| `tablet-01-home-dashboard.png`                | `/home`                           | Audited             |
| `tablet-02-search-filter.png`                 | `/menu` with search/filter state  | Built / needs audit |
| `tablet-03-menu-overview.png`                 | `/menu`                           | Audited             |
| `tablet-04-menu-category-nigiri.png`          | `/menu` category filter           | Built / needs audit |
| `tablet-05-item-detail-otoro-nigiri.png`      | checkout confirmation             | Audited             |
| `tablet-06-item-detail-expanded.png`          | `/menu` item detail dialog        | Audited             |
| `tablet-07-item-customization-add-ons.png`    | `/menu` item customization dialog | Audited             |
| `tablet-08-cart.png`                          | cart dialog                       | Audited             |
| `tablet-09-checkout-delivery-pickup.png`      | checkout details dialog           | Audited             |
| `tablet-10-checkout-review-confirm.png`       | checkout review dialog            | Audited             |
| `tablet-11-orders-dashboard.png`              | `/orders`                         | Audited             |
| `tablet-12-live-order-tracking.png`           | `/orders` active order detail     | Audited             |
| `tablet-13-reservations-main.png`             | `/reservations`                   | Audited             |
| `tablet-14-choose-reservation-experience.png` | reservation experience step       | Audited             |
| `tablet-15-reservation-review.png`            | reservation review step           | Audited             |
| `tablet-16-reservation-confirmation.png`      | reservation confirmation          | Audited             |
| `tablet-17-reservation-history.png`           | reservation history state         | Audited             |
| `tablet-18-modify-reservation.png`            | modify reservation flow           | Audited             |
| `tablet-19-locations.png`                     | `/locations`                      | Audited             |
| `tablet-20-cancel-reservation.png`            | cancel reservation modal          | Audited             |
| `tablet-21-omakase-experience.png`            | `/omakase`                        | Audited             |
| `tablet-22-omakase-package-review.png`        | omakase review state              | Audited             |
| `tablet-23-gift-experience.png`               | `/gifts`                          | Audited             |
| `tablet-24-gift-checkout.png`                 | gift checkout state               | Audited             |
| `tablet-25-gift-confirmation.png`             | gift confirmation state           | Audited             |
| `tablet-26-loyalty-dashboard.png`             | `/loyalty`                        | Audited             |
| `tablet-27-member-pass-rewards.png`           | loyalty reward detail state       | Audited             |
| `tablet-28-profile-dashboard.png`             | `/profile`                        | Audited             |
| `tablet-29-favorites.png`                     | `/favorites`                      | Audited             |
| `tablet-30-account-settings-preferences.png`  | profile settings state            | Audited             |
| `tablet-31-contact.png`                       | `/support` contact state          | Audited             |
| `tablet-32-help-center.png`                   | `/support` help center state      | Audited             |
| `tablet-33-faq-article-detail.png`            | help article detail               | Audited             |
| `tablet-34-notifications-center.png`          | `/notifications`                  | Audited             |
| `tablet-35-notification-detail.png`           | notification detail               | Audited             |
| `tablet-36-promotions-offers.png`             | `/offers`                         | Audited             |
| `tablet-37-offer-detail.png`                  | offer detail                      | Audited             |
| `tablet-38-referral-earn.png`                 | referral state                    | Audited             |
| `tablet-39-about-our-story.png`               | `/about`                          | Audited             |
| `tablet-40-master-chefs-team.png`             | `/chefs`                          | Audited             |

## Desktop References

| Reference                                      | Route / interaction          | Status  |
| ---------------------------------------------- | ---------------------------- | ------- |
| `desktop-01-home-dashboard.png`                | `/home`                      | Audited |
| `desktop-02-menu-overview.png`                 | `/menu`                      | Audited |
| `desktop-03-menu-category-nigiri.png`          | `/menu` category filter      | Audited |
| `desktop-04-item-detail-otoro-nigiri.png`      | `/menu` item detail state    | Audited |
| `desktop-05-item-customization-add-ons.png`    | `/menu` item customization   | Audited |
| `desktop-06-cart.png`                          | cart panel                   | Audited |
| `desktop-07-checkout.png`                      | checkout state               | Audited |
| `desktop-08-checkout-review.png`               | checkout review              | Audited |
| `desktop-09-order-confirmation.png`            | order confirmation           | Audited |
| `desktop-10-orders-dashboard.png`              | `/orders`                    | Audited |
| `desktop-11-reservations-main.png`             | `/reservations`              | Audited |
| `desktop-12-choose-reservation-experience.png` | reservation experience step  | Audited |
| `desktop-13-reservation-review.png`            | reservation review step      | Audited |
| `desktop-14-reservation-history.png`           | reservation history state    | Audited |
| `desktop-15-omakase-experience.png`            | `/omakase`                   | Audited |
| `desktop-16-omakase-package-review.png`        | omakase review state         | Audited |
| `desktop-17-loyalty-dashboard.png`             | `/loyalty`                   | Audited |
| `desktop-18-member-pass-rewards.png`           | loyalty rewards state        | Audited |
| `desktop-19-profile-dashboard.png`             | `/profile`                   | Audited |
| `desktop-20-account-settings-preferences.png`  | profile settings state       | Audited |
| `desktop-21-contact.png`                       | `/support` contact state     | Audited |
| `desktop-22-help-center.png`                   | `/support` help center state | Audited |
| `desktop-23-notifications-center.png`          | `/notifications`             | Audited |
| `desktop-24-favorites.png`                     | `/favorites`                 | Audited |
| `desktop-25-promotions-offers.png`             | `/offers`                    | Audited |
| `desktop-26-referral-earn.png`                 | referral state               | Audited |
| `desktop-27-locations.png`                     | `/locations`                 | Audited |
| `desktop-28-gift-experience.png`               | `/gifts`                     | Audited |
| `desktop-29-gift-checkout.png`                 | gift checkout state          | Audited |
| `desktop-30-gift-confirmation.png`             | gift confirmation state      | Audited |
| `desktop-31-about-our-story.png`               | `/about`                     | Audited |
| `desktop-32-master-chefs-team.png`             | `/chefs`                     | Audited |
| `desktop-33-sourcing-ingredients.png`          | `/about` sourcing section    | Audited |
| `desktop-34-restaurant-atmosphere-gallery.png` | `/about` gallery section     | Audited |
| `desktop-35-faq-article-detail.png`            | help article detail          | Audited |
| `desktop-36-notification-detail.png`           | notification detail          | Audited |
| `desktop-37-offer-detail.png`                  | offer detail                 | Audited |
| `desktop-38-location-detail.png`               | location detail              | Audited |
| `desktop-39-modify-reservation.png`            | modify reservation flow      | Audited |
| `desktop-40-cancel-reservation-modal.png`      | cancel reservation modal     | Audited |

## Mobile References

| Reference       | Route / interaction     | Status  |
| --------------- | ----------------------- | ------- |
| `mobile-01.png` | `/`                     | Audited |
| `mobile-02.png` | `/home`                 | Audited |
| `mobile-03.png` | `/menu` search state    | Audited |
| `mobile-04.png` | `/menu`                 | Audited |
| `mobile-05.png` | `/menu` category filter | Audited |
| `mobile-06.png` | `/menu` item detail     | Audited |
| `mobile-07.png` | `/menu` item customize  | Audited |
| `mobile-08.png` | cart dialog             | Audited |
| `mobile-09.png` | checkout fulfillment    | Audited |
| `mobile-10.png` | checkout address        | Audited |
| `mobile-11.png` | checkout payment        | Audited |
| `mobile-12.png` | checkout review         | Audited |
| `mobile-13.png` | order confirmation      | Audited |
| `mobile-14.png` | `/orders` dashboard     | Audited |
| `mobile-15.png` | order detail state      | Audited |
| `mobile-16.png` | live order tracking     | Audited |
| `mobile-17.png` | `/reservations`         | Audited |
| `mobile-18.png` | reservation date/time   | Audited |
| `mobile-19.png` | reservation experience  | Audited |
| `mobile-20.png` | reservation review      | Audited |
| `mobile-21.png` | `/loyalty` dashboard    | Audited |
| `mobile-22.png` | loyalty rewards state   | Audited |
| `mobile-23.png` | loyalty benefits state  | Audited |
| `mobile-24.png` | loyalty activity state  | Audited |
| `mobile-25.png` | loyalty member pass     | Audited |
| `mobile-26.png` | `/profile` dashboard    | Audited |
| `mobile-27.png` | saved addresses state   | Audited |
| `mobile-28.png` | add address state       | Audited |
| `mobile-29.png` | payment methods state   | Audited |
| `mobile-30.png` | add payment state       | Audited |
| `mobile-31.png` | `/notifications`        | Audited |
| `mobile-32.png` | dietary preferences     | Audited |
| `mobile-33.png` | reservation history     | Audited |
| `mobile-34.png` | reservation detail      | Audited |
| `mobile-35.png` | personal information    | Audited |
| `mobile-36.png` | account settings        | Audited |
| `mobile-37.png` | privacy security        | Audited |
| `mobile-38.png` | `/about` story          | Audited |
| `mobile-39.png` | `/support` contact      | Audited |
| `mobile-40.png` | help center             | Audited |
| `mobile-41.png` | support request         | Audited |
| `mobile-42.png` | FAQ article detail      | Audited |
| `mobile-43.png` | notification detail     | Audited |
| `mobile-44.png` | `/omakase` landing      | Audited |
| `mobile-45.png` | omakase package state   | Audited |
| `mobile-46.png` | omakase review          | Audited |
| `mobile-47.png` | `/locations` directory  | Audited |
| `mobile-48.png` | location detail         | Audited |
| `mobile-49.png` | referral earn           | Audited |
| `mobile-50.png` | `/gifts` experience     | Audited |
| `mobile-51.png` | gift selection          | Audited |
| `mobile-52.png` | gift checkout recipient | Audited |
| `mobile-53.png` | gift checkout payment   | Audited |
| `mobile-54.png` | gift confirmation       | Audited |
| `mobile-55.png` | promotions offers       | Audited |
| `mobile-56.png` | offer detail            | Audited |
| `mobile-57.png` | favorites               | Audited |
| `mobile-58.png` | saved item detail       | Audited |
| `mobile-59.png` | recently viewed         | Audited |
| `mobile-60.png` | empty cart              | Audited |
