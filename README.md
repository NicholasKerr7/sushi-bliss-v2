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

## Scripts

```bash
npm run dev
npm run lint
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
