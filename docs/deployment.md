# Sushi Bliss v2 Deployment

## Production Target

Sushi Bliss v2 is configured for Vercel with the Next.js framework preset.
Set `NEXT_PUBLIC_SITE_URL` to the final production origin when a custom domain
or Vercel production alias is assigned.

## Required Checks

Run these before deploying:

```bash
npm run format:check
npm run typecheck
npm run lint
npm run test
npm run build
npm audit --audit-level=moderate
```

## GitHub Actions

The `Release Checks` workflow runs the required release checks on pushes and
pull requests targeting `main`. It installs Chromium for Playwright, uploads
Playwright artifacts on failure, and can also be started manually from the
Actions tab.

## Vercel CLI

Use the linked Vercel project from the repository root:

```bash
vercel link --yes --project sushi-bliss-v2
vercel env pull .env.local
vercel deploy --prod
```

For CI, store `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` as
provider secrets. Do not commit `.vercel` or real environment values.

## Environment

The app works with mock/local data without backend credentials. Future Supabase
and Stripe values should be configured in Vercel project settings and mirrored
from `.env.example`.
