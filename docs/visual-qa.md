# Visual QA

The canonical reference screenshots live in `public/assets/screenshots`:

- `mobile`: 60 phone references
- `tablet`: 40 tablet references
- `desktop`: 40 desktop references

The Playwright visual audit in `tests/e2e/visual-reference.spec.ts` captures
current first-viewport screenshots for the main home/menu surfaces and tablet
item/cart flow surfaces, then attaches the matching reference PNGs to the test
report. This keeps the normal test suite stable while giving us concrete
side-by-side artifacts for pixel-level layout work.

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
- desktop home dashboard: `/home` against
  `desktop/desktop-01-home-dashboard.png`
- desktop menu overview: `/menu` against `desktop/desktop-02-menu-overview.png`

The audit asserts the rendered viewport size, reference image dimensions, route
health, and absence of horizontal overflow. Full pixel assertions should be
enabled screen by screen once the rendered layout is intentionally aligned with
the corresponding reference.
