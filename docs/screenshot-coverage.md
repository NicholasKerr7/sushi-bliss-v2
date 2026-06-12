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
| Mobile     |         60 |       1 |                   0 |            59 |
| Tablet     |         40 |      18 |                  22 |             0 |
| Desktop    |         40 |       2 |                  38 |             0 |

The tablet reference `tablet-05-item-detail-otoro-nigiri.png` currently shows an
order confirmation composition, so the visual audit maps it to tablet order
confirmation until the reference filename is corrected.

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
| `tablet-21-omakase-experience.png`            | `/omakase`                        | Built / needs audit |
| `tablet-22-omakase-package-review.png`        | omakase review state              | Built / needs audit |
| `tablet-23-gift-experience.png`               | `/gifts`                          | Built / needs audit |
| `tablet-24-gift-checkout.png`                 | gift checkout state               | Built / needs audit |
| `tablet-25-gift-confirmation.png`             | gift confirmation state           | Built / needs audit |
| `tablet-26-loyalty-dashboard.png`             | `/loyalty`                        | Built / needs audit |
| `tablet-27-member-pass-rewards.png`           | loyalty rewards state             | Built / needs audit |
| `tablet-28-profile-dashboard.png`             | `/profile`                        | Built / needs audit |
| `tablet-29-favorites.png`                     | `/favorites`                      | Built / needs audit |
| `tablet-30-account-settings-preferences.png`  | profile settings state            | Built / needs audit |
| `tablet-31-contact.png`                       | `/support` contact state          | Built / needs audit |
| `tablet-32-help-center.png`                   | `/support` help center state      | Built / needs audit |
| `tablet-33-faq-article-detail.png`            | help article detail               | Built / needs audit |
| `tablet-34-notifications-center.png`          | `/notifications`                  | Built / needs audit |
| `tablet-35-notification-detail.png`           | notification detail               | Built / needs audit |
| `tablet-36-promotions-offers.png`             | `/offers`                         | Built / needs audit |
| `tablet-37-offer-detail.png`                  | offer detail                      | Built / needs audit |
| `tablet-38-referral-earn.png`                 | referral state                    | Built / needs audit |
| `tablet-39-about-our-story.png`               | `/about`                          | Built / needs audit |
| `tablet-40-master-chefs-team.png`             | `/chefs`                          | Built / needs audit |

## Desktop References

| Reference                                      | Route / interaction          | Status              |
| ---------------------------------------------- | ---------------------------- | ------------------- |
| `desktop-01-home-dashboard.png`                | `/home`                      | Audited             |
| `desktop-02-menu-overview.png`                 | `/menu`                      | Audited             |
| `desktop-03-menu-category-nigiri.png`          | `/menu` category filter      | Built / needs audit |
| `desktop-04-item-detail-otoro-nigiri.png`      | `/menu` item detail drawer   | Built / needs audit |
| `desktop-05-item-customization-add-ons.png`    | `/menu` item customization   | Built / needs audit |
| `desktop-06-cart.png`                          | cart drawer                  | Built / needs audit |
| `desktop-07-checkout.png`                      | checkout drawer              | Built / needs audit |
| `desktop-08-checkout-review.png`               | checkout review              | Built / needs audit |
| `desktop-09-order-confirmation.png`            | order confirmation           | Built / needs audit |
| `desktop-10-orders-dashboard.png`              | `/orders`                    | Built / needs audit |
| `desktop-11-reservations-main.png`             | `/reservations`              | Built / needs audit |
| `desktop-12-choose-reservation-experience.png` | reservation experience step  | Built / needs audit |
| `desktop-13-reservation-review.png`            | reservation review step      | Built / needs audit |
| `desktop-14-reservation-history.png`           | reservation history state    | Built / needs audit |
| `desktop-15-omakase-experience.png`            | `/omakase`                   | Built / needs audit |
| `desktop-16-omakase-package-review.png`        | omakase review state         | Built / needs audit |
| `desktop-17-loyalty-dashboard.png`             | `/loyalty`                   | Built / needs audit |
| `desktop-18-member-pass-rewards.png`           | loyalty rewards state        | Built / needs audit |
| `desktop-19-profile-dashboard.png`             | `/profile`                   | Built / needs audit |
| `desktop-20-account-settings-preferences.png`  | profile settings state       | Built / needs audit |
| `desktop-21-contact.png`                       | `/support` contact state     | Built / needs audit |
| `desktop-22-help-center.png`                   | `/support` help center state | Built / needs audit |
| `desktop-23-notifications-center.png`          | `/notifications`             | Built / needs audit |
| `desktop-24-favorites.png`                     | `/favorites`                 | Built / needs audit |
| `desktop-25-promotions-offers.png`             | `/offers`                    | Built / needs audit |
| `desktop-26-referral-earn.png`                 | referral state               | Built / needs audit |
| `desktop-27-locations.png`                     | `/locations`                 | Built / needs audit |
| `desktop-28-gift-experience.png`               | `/gifts`                     | Built / needs audit |
| `desktop-29-gift-checkout.png`                 | gift checkout state          | Built / needs audit |
| `desktop-30-gift-confirmation.png`             | gift confirmation state      | Built / needs audit |
| `desktop-31-about-our-story.png`               | `/about`                     | Built / needs audit |
| `desktop-32-master-chefs-team.png`             | `/chefs`                     | Built / needs audit |
| `desktop-33-sourcing-ingredients.png`          | `/about` sourcing section    | Built / needs audit |
| `desktop-34-restaurant-atmosphere-gallery.png` | `/about` gallery section     | Built / needs audit |
| `desktop-35-faq-article-detail.png`            | help article detail          | Built / needs audit |
| `desktop-36-notification-detail.png`           | notification detail          | Built / needs audit |
| `desktop-37-offer-detail.png`                  | offer detail                 | Built / needs audit |
| `desktop-38-location-detail.png`               | location detail              | Built / needs audit |
| `desktop-39-modify-reservation.png`            | modify reservation flow      | Built / needs audit |
| `desktop-40-cancel-reservation-modal.png`      | cancel reservation modal     | Built / needs audit |

## Mobile References

`mobile-01.png` is audited against the welcome route at `/`. The remaining
`mobile-02.png` through `mobile-60.png` need a manual naming pass before we can
map each reference to a route and interaction with confidence.
