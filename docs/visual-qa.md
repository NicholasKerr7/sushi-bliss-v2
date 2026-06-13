# Visual QA

The canonical reference screenshots live in `public/assets/screenshots`:

- `mobile`: 60 phone references
- `tablet`: 40 tablet references
- `desktop`: 40 desktop references

The Playwright visual audit in `tests/e2e/visual-reference.spec.ts` captures
current first-viewport screenshots for the main mobile ordering flow plus the
tablet and desktop reference surfaces, then attaches the matching reference PNGs
to the test report. This keeps the normal test suite stable while giving us
concrete side-by-side artifacts for pixel-level layout work.

Run the audit with the normal test command:

```bash
npm run test
```

For a faster visual-only pass, run:

```bash
npm run test:visual
```

To attach pixel-diff overlays and diff metadata without failing the suite, run:

```bash
npm run test:visual:diff
```

Diff mode writes per-screen artifacts to
`test-results/visual-reference-diffs`:

- `*.current.png`: the current rendered viewport capture.
- `*.reference.png`: the matching source reference screenshot.
- `*.diff.png`: a red-overlay visual drift map.
- `*.metadata.json`: route, viewport, size, and diff-ratio stats.

To fail the suite when a reference drifts past the configured ratio, run:

```bash
npm run test:visual:strict
```

The strict mode defaults to `VISUAL_REFERENCE_MAX_DIFF_RATIO=0.08` and
`VISUAL_REFERENCE_PIXEL_THRESHOLD=32`. Mobile references are compared after the
current viewport capture is scaled to the source reference dimensions because
several legacy mobile screenshots are stored at larger source sizes.

Current audit targets:

- mobile welcome: `/` against `mobile/mobile-01.png`
- mobile home dashboard: `/home` against `mobile/mobile-02.png`
- mobile search filter: `/menu` interaction against `mobile/mobile-03.png`
- mobile menu overview: `/menu` against `mobile/mobile-04.png`
- mobile menu category nigiri: `/menu` interaction against
  `mobile/mobile-05.png`
- mobile item detail otoro nigiri: `/menu` interaction against
  `mobile/mobile-06.png`
- mobile item customization: `/menu` interaction against
  `mobile/mobile-07.png`
- mobile cart: `/menu` interaction against `mobile/mobile-08.png`
- mobile checkout delivery pickup: `/menu` interaction against
  `mobile/mobile-09.png`
- mobile checkout address: `/menu` interaction against `mobile/mobile-10.png`
- mobile checkout payment: `/menu` interaction against `mobile/mobile-11.png`
- mobile checkout review: `/menu` interaction against `mobile/mobile-12.png`
- mobile order confirmation: `/menu` interaction against
  `mobile/mobile-13.png`
- mobile orders dashboard: `/orders` against `mobile/mobile-14.png`
- mobile order details: `/orders` interaction against `mobile/mobile-15.png`
- mobile live order tracking: `/orders` interaction against
  `mobile/mobile-16.png`
- mobile reservations dashboard: `/reservations` against
  `mobile/mobile-17.png`
- mobile reservation date time: `/reservations` interaction against
  `mobile/mobile-18.png`
- mobile reservation experience: `/reservations` interaction against
  `mobile/mobile-19.png`
- mobile reservation review: `/reservations` interaction against
  `mobile/mobile-20.png`
- mobile loyalty dashboard: `/loyalty` against `mobile/mobile-21.png`
- mobile available rewards: `/loyalty` interaction against
  `mobile/mobile-22.png`
- mobile member benefits: `/loyalty` interaction against
  `mobile/mobile-23.png`
- mobile points activity: `/loyalty` interaction against
  `mobile/mobile-24.png`
- mobile member pass: `/loyalty` interaction against `mobile/mobile-25.png`
- mobile profile dashboard: `/profile` against `mobile/mobile-26.png`
- mobile saved addresses: `/profile` interaction against
  `mobile/mobile-27.png`
- mobile add address: `/profile` interaction against `mobile/mobile-28.png`
- mobile payment methods: `/profile` interaction against
  `mobile/mobile-29.png`
- mobile add card: `/profile` interaction against `mobile/mobile-30.png`
- mobile notifications center: `/notifications` against
  `mobile/mobile-31.png`
- mobile dietary preferences: `/profile` interaction against
  `mobile/mobile-32.png`
- mobile reservation history: `/reservations` interaction against
  `mobile/mobile-33.png`
- mobile reservation detail: `/reservations` interaction against
  `mobile/mobile-34.png`
- mobile personal information: `/profile` interaction against
  `mobile/mobile-35.png`
- mobile account settings: `/profile` interaction against
  `mobile/mobile-36.png`
- mobile privacy security: `/profile` interaction against
  `mobile/mobile-37.png`
- mobile about story: `/about` against `mobile/mobile-38.png`
- mobile contact support: `/support` against `mobile/mobile-39.png`
- mobile help center: `/support` against `mobile/mobile-40.png`
- mobile support request: `/support` interaction against
  `mobile/mobile-41.png`
- mobile FAQ article detail: `/support` interaction against
  `mobile/mobile-42.png`
- mobile notification detail: `/notifications` interaction against
  `mobile/mobile-43.png`
- mobile omakase landing: `/omakase` against `mobile/mobile-44.png`
- mobile omakase package selection: `/omakase` interaction against
  `mobile/mobile-45.png`
- mobile omakase review: `/omakase` interaction against
  `mobile/mobile-46.png`
- mobile locations directory: `/locations` against `mobile/mobile-47.png`
- mobile location detail: `/locations` interaction against
  `mobile/mobile-48.png`
- mobile referral earn: `/loyalty` interaction against `mobile/mobile-49.png`
- mobile gift experience: `/gifts` against `mobile/mobile-50.png`
- mobile gift selection: `/gifts` against `mobile/mobile-51.png`
- mobile gift checkout recipient: `/gifts` interaction against
  `mobile/mobile-52.png`
- mobile gift checkout payment: `/gifts` interaction against
  `mobile/mobile-53.png`
- mobile gift confirmation: `/gifts` interaction against
  `mobile/mobile-54.png`
- mobile promotions offers: `/offers` against `mobile/mobile-55.png`
- mobile offer detail: `/offers` interaction against `mobile/mobile-56.png`
- mobile favorites: `/favorites` with seeded favorites against
  `mobile/mobile-57.png`
- mobile saved item detail: `/menu` interaction against `mobile/mobile-58.png`
- mobile recently viewed: `/recently-viewed` against `mobile/mobile-59.png`
- mobile empty cart: `/menu` interaction against `mobile/mobile-60.png`
- tablet home dashboard: `/home` against `tablet/tablet-01-home-dashboard.png`
- tablet search filter: `/menu` interaction against
  `tablet/tablet-02-search-filter.png`
- tablet menu overview: `/menu` against `tablet/tablet-03-menu-overview.png`
- tablet menu category nigiri: `/menu` interaction against
  `tablet/tablet-04-menu-category-nigiri.png`
- tablet item detail: `/menu` interaction against
  `tablet/tablet-06-item-detail-expanded.png`
- tablet item customization: `/menu` interaction against
  `tablet/tablet-07-item-customization-add-ons.png`
- tablet cart: `/menu` interaction against `tablet/tablet-08-cart.png`
- tablet checkout delivery pickup: `/menu` interaction against
  `tablet/tablet-09-checkout-delivery-pickup.png`
- tablet checkout review confirm: `/menu` interaction against
  `tablet/tablet-10-checkout-review-confirm.png`
- tablet order confirmation: `/menu` interaction against
  `tablet/tablet-05-item-detail-otoro-nigiri.png`
- tablet orders dashboard: `/orders` against
  `tablet/tablet-11-orders-dashboard.png`
- tablet live order tracking: `/orders` interaction against
  `tablet/tablet-12-live-order-tracking.png`
- tablet reservations main: `/reservations` against
  `tablet/tablet-13-reservations-main.png`
- tablet choose reservation experience: `/reservations` interaction against
  `tablet/tablet-14-choose-reservation-experience.png`
- tablet reservation review: `/reservations` interaction against
  `tablet/tablet-15-reservation-review.png`
- tablet reservation confirmation: `/reservations` interaction against
  `tablet/tablet-16-reservation-confirmation.png`
- tablet reservation history: `/reservations` interaction against
  `tablet/tablet-17-reservation-history.png`
- tablet modify reservation: `/reservations` interaction against
  `tablet/tablet-18-modify-reservation.png`
- tablet locations: `/locations` against `tablet/tablet-19-locations.png`
- tablet cancel reservation: `/reservations` interaction against
  `tablet/tablet-20-cancel-reservation.png`
- tablet omakase experience: `/omakase` against
  `tablet/tablet-21-omakase-experience.png`
- tablet omakase package review: `/omakase` interaction against
  `tablet/tablet-22-omakase-package-review.png`
- tablet gift experience: `/gifts` against
  `tablet/tablet-23-gift-experience.png`
- tablet gift checkout: `/gifts` interaction against
  `tablet/tablet-24-gift-checkout.png`
- tablet gift confirmation: `/gifts` interaction against
  `tablet/tablet-25-gift-confirmation.png`
- tablet loyalty dashboard: `/loyalty` against
  `tablet/tablet-26-loyalty-dashboard.png`
- tablet member pass rewards: `/loyalty` reward detail interaction against
  `tablet/tablet-27-member-pass-rewards.png`
- tablet profile dashboard: `/profile` against
  `tablet/tablet-28-profile-dashboard.png`
- tablet favorites: `/favorites` with seeded favorites against
  `tablet/tablet-29-favorites.png`
- tablet account settings preferences: `/profile` interaction against
  `tablet/tablet-30-account-settings-preferences.png`
- tablet contact: `/support` against `tablet/tablet-31-contact.png`
- tablet help center: `/support` interaction against
  `tablet/tablet-32-help-center.png`
- tablet FAQ article detail: `/support` interaction against
  `tablet/tablet-33-faq-article-detail.png`
- tablet notifications center: `/notifications` against
  `tablet/tablet-34-notifications-center.png`
- tablet notification detail: `/notifications` interaction against
  `tablet/tablet-35-notification-detail.png`
- tablet promotions offers: `/offers` against
  `tablet/tablet-36-promotions-offers.png`
- tablet offer detail: `/offers` interaction against
  `tablet/tablet-37-offer-detail.png`
- tablet referral earn: `/loyalty` interaction against
  `tablet/tablet-38-referral-earn.png`
- tablet about our story: `/about` against
  `tablet/tablet-39-about-our-story.png`
- tablet master chefs team: `/chefs` against
  `tablet/tablet-40-master-chefs-team.png`
- desktop home dashboard: `/home` against
  `desktop/desktop-01-home-dashboard.png`
- desktop menu overview: `/menu` against `desktop/desktop-02-menu-overview.png`
- desktop menu category nigiri: `/menu` interaction against
  `desktop/desktop-03-menu-category-nigiri.png`
- desktop item detail otoro nigiri: `/menu` interaction against
  `desktop/desktop-04-item-detail-otoro-nigiri.png`
- desktop item customization add-ons: `/menu` interaction against
  `desktop/desktop-05-item-customization-add-ons.png`
- desktop cart: `/menu` interaction against `desktop/desktop-06-cart.png`
- desktop checkout: `/menu` interaction against
  `desktop/desktop-07-checkout.png`
- desktop checkout review: `/menu` interaction against
  `desktop/desktop-08-checkout-review.png`
- desktop order confirmation: `/menu` interaction against
  `desktop/desktop-09-order-confirmation.png`
- desktop orders dashboard: `/orders` against
  `desktop/desktop-10-orders-dashboard.png`
- desktop reservations main: `/reservations` against
  `desktop/desktop-11-reservations-main.png`
- desktop choose reservation experience: `/reservations` interaction against
  `desktop/desktop-12-choose-reservation-experience.png`
- desktop reservation review: `/reservations` interaction against
  `desktop/desktop-13-reservation-review.png`
- desktop reservation history: `/reservations` interaction against
  `desktop/desktop-14-reservation-history.png`
- desktop omakase experience: `/omakase` against
  `desktop/desktop-15-omakase-experience.png`
- desktop omakase package review: `/omakase` interaction against
  `desktop/desktop-16-omakase-package-review.png`
- desktop loyalty dashboard: `/loyalty` against
  `desktop/desktop-17-loyalty-dashboard.png`
- desktop member pass rewards: `/loyalty` interaction against
  `desktop/desktop-18-member-pass-rewards.png`
- desktop profile dashboard: `/profile` against
  `desktop/desktop-19-profile-dashboard.png`
- desktop account settings preferences: `/profile` interaction against
  `desktop/desktop-20-account-settings-preferences.png`
- desktop contact: `/support` against `desktop/desktop-21-contact.png`
- desktop help center: `/support` interaction against
  `desktop/desktop-22-help-center.png`
- desktop notifications center: `/notifications` against
  `desktop/desktop-23-notifications-center.png`
- desktop favorites: `/favorites` with seeded favorites against
  `desktop/desktop-24-favorites.png`
- desktop promotions offers: `/offers` against
  `desktop/desktop-25-promotions-offers.png`
- desktop referral earn: `/loyalty` interaction against
  `desktop/desktop-26-referral-earn.png`
- desktop locations: `/locations` against `desktop/desktop-27-locations.png`
- desktop gift experience: `/gifts` against
  `desktop/desktop-28-gift-experience.png`
- desktop gift checkout: `/gifts` interaction against
  `desktop/desktop-29-gift-checkout.png`
- desktop gift confirmation: `/gifts` interaction against
  `desktop/desktop-30-gift-confirmation.png`
- desktop about our story: `/about` against
  `desktop/desktop-31-about-our-story.png`
- desktop master chefs team: `/chefs` against
  `desktop/desktop-32-master-chefs-team.png`
- desktop sourcing ingredients: `/about` interaction against
  `desktop/desktop-33-sourcing-ingredients.png`
- desktop restaurant atmosphere gallery: `/about` interaction against
  `desktop/desktop-34-restaurant-atmosphere-gallery.png`
- desktop FAQ article detail: `/support` interaction against
  `desktop/desktop-35-faq-article-detail.png`
- desktop notification detail: `/notifications` interaction against
  `desktop/desktop-36-notification-detail.png`
- desktop offer detail: `/offers` interaction against
  `desktop/desktop-37-offer-detail.png`
- desktop location detail: `/locations` interaction against
  `desktop/desktop-38-location-detail.png`
- desktop modify reservation: `/reservations` interaction against
  `desktop/desktop-39-modify-reservation.png`
- desktop cancel reservation modal: `/reservations` interaction against
  `desktop/desktop-40-cancel-reservation-modal.png`

The default audit asserts the rendered viewport size, reference image
dimensions, route health, and absence of horizontal overflow. The opt-in diff
mode adds scaled pixel comparisons and attaches a red-overlay difference image
plus JSON metadata for each target. Strict mode uses the same comparison path and
fails when the diff ratio exceeds the configured threshold.

See `docs/screenshot-coverage.md` for the full reference inventory and the
current built-versus-audited status.
