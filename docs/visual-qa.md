# Visual QA

The canonical reference screenshots live in `public/assets/screenshots`:

- `mobile`: 60 phone references
- `tablet`: 40 tablet references
- `desktop`: 40 desktop references

The Playwright visual audit in `tests/e2e/visual-reference.spec.ts` captures
current first-viewport screenshots for the main home/menu surfaces and tablet
ordering surfaces, then attaches the matching reference PNGs to the test report.
This keeps the normal test suite stable while giving us concrete side-by-side
artifacts for pixel-level layout work.

Run the audit with the normal test command:

```bash
npm run test
```

Current audit targets:

- mobile welcome: `/` against `mobile/mobile-01.png`
- tablet home dashboard: `/home` against `tablet/tablet-01-home-dashboard.png`
- tablet menu overview: `/menu` against `tablet/tablet-03-menu-overview.png`
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
- desktop home dashboard: `/home` against
  `desktop/desktop-01-home-dashboard.png`
- desktop menu overview: `/menu` against `desktop/desktop-02-menu-overview.png`

The audit asserts the rendered viewport size, reference image dimensions, route
health, and absence of horizontal overflow. Full pixel assertions should be
enabled screen by screen once the rendered layout is intentionally aligned with
the corresponding reference.

See `docs/screenshot-coverage.md` for the full reference inventory and the
current built-versus-audited status.
