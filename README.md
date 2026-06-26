# Sushi Bliss v2

[![Release Checks](https://github.com/NicholasKerr7/sushi-bliss-v2/actions/workflows/release-checks.yml/badge.svg)](https://github.com/NicholasKerr7/sushi-bliss-v2/actions/workflows/release-checks.yml)

Sushi Bliss v2 is a luxury sushi restaurant web app built with Next.js,
TypeScript, React, and Tailwind CSS. It is a clean rebuild of the original
Sushi Bliss concept with a mobile-first customer experience, responsive tablet
and desktop layouts, and a separated admin dashboard.

The app intentionally runs on local demo data for now. It is production-shaped
and deployed, with clean service boundaries prepared for Supabase auth/database
and Stripe payments when live backend work is requested.

## Live Site

Production: [https://sushi-bliss-v2.vercel.app](https://sushi-bliss-v2.vercel.app)

Current service mode: local demo state, static asset data, and backend-ready
service boundaries.

## App Preview

Real screenshots captured from the current Sushi Bliss v2 app build.

| Mobile home                                                                           | Tablet menu                                                                           |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| ![Sushi Bliss v2 mobile home screen](docs/screenshots/sushi-bliss-v2-mobile-home.png) | ![Sushi Bliss v2 tablet menu screen](docs/screenshots/sushi-bliss-v2-tablet-menu.png) |

| Desktop home                                                                            |
| --------------------------------------------------------------------------------------- |
| ![Sushi Bliss v2 desktop home screen](docs/screenshots/sushi-bliss-v2-desktop-home.png) |

| Desktop admin                                                                                |
| -------------------------------------------------------------------------------------------- |
| ![Sushi Bliss v2 desktop admin dashboard](docs/screenshots/sushi-bliss-v2-desktop-admin.png) |

## What Is Built

- Mobile-first restaurant app shell with customer navigation.
- Responsive tablet and desktop layouts for the main customer flows.
- Browseable menu with categories, search, filters, item details, tasting
  notes, customization, add-ons, and sake pairing imagery.
- Cart, checkout, pickup/delivery selection, saved payment selection, order
  confirmation, order history, and tracking views.
- Reservations with experience, date/time, party size, location, review,
  confirmation, modify, and cancel flows.
- Loyalty, rewards, referrals, offers, favorites, recently viewed items, and
  member pass UI.
- Omakase, gifts, chef profiles, locations, support, notifications, about, and
  contact screens.
- Separate `/admin` dashboard with business metrics, domain workspaces,
  and operational controls.
- Vercel-ready metadata, manifest, sitemap, robots, security headers, and CI
  checks.

## Not Real Yet

These pieces are deliberately not connected to live services:

- Supabase database, auth, storage, and realtime.
- Stripe checkout, payment intents, and webhooks.
- Real admin CRUD.
- Real order tracking, reservation availability, emails, notifications, support
  tickets, loyalty accounting, and gift fulfillment.

Do not add live credentials or wire real services until that work is explicitly
requested.

## Tech Stack

- Next.js App Router
- TypeScript
- React
- Tailwind CSS v4
- Playwright
- ESLint
- Prettier
- Vercel deployment config
- Supabase-ready and Stripe-ready service boundaries

## Project Structure

```text
src/
  app/                 Next.js routes, metadata, manifest, robots, sitemap
  components/          Shared layout, responsive, and UI primitives
  data/                Mock content, navigation, menu, profile, offers, admin
  features/            Customer and admin feature modules
  hooks/               Stateful feature hooks and local persistence
  lib/                 Data normalization, assets, formatting, validation
  services/            Backend-ready mock service boundaries
  styles/              Global Tailwind tokens and app CSS
  types/               Shared TypeScript models

public/
  assets/              Runtime brand, menu, editorial, map, pairing, icon assets

docs/
  backend/             Supabase schema and service planning
  deployment.md        Production deployment notes
  qa.md                Local verification notes

tests/
  e2e/                 Playwright smoke, responsive, and route-state tests
```

## Getting Started

Install dependencies:

```bash
npm ci
```

Run the local dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev              # Start local Next.js dev server
npm run build            # Create production build
npm run start            # Serve the production build locally
npm run lint             # Run ESLint
npm run typecheck        # Run TypeScript checks
npm run format:check     # Check Prettier formatting
npm run test             # Run Playwright tests
npm run test:routes      # Run route-state audit only
```

Install Playwright Chromium if needed:

```bash
npm run playwright:install
```

## Environment

Copy `.env.example` for local overrides:

```bash
cp .env.example .env.local
```

Local demo mode does not require Supabase or Stripe values. Keep secrets out of
the client and out of Git.

Important values:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_ENABLE_ANALYTICS`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` for legacy Supabase projects only
- `SUPABASE_SECRET_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## QA

Run the standard local verification set before committing app changes:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

The route-state audit validates key routed states, interactions, visible image
loading, and horizontal overflow across mobile, tablet, and desktop projects.

## Deployment

The project is configured for Vercel. See `docs/deployment.md` for the release
checklist, CLI notes, and current production target.

## Development Rules

- Keep the app local-data only until live backend work is requested.
- Keep UI components small and feature-scoped.
- Do not reintroduce the old monolithic app structure.
- Do not commit generated build output, Playwright reports, or secret env files.
- Runtime assets belong in `public/assets`.
