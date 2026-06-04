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
