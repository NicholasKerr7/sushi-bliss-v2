# Sushi Bliss v2 Deployment

## Production Target

Sushi Bliss v2 is configured for Vercel with the Next.js framework preset.

- Production URL: [https://sushi-bliss-v2.vercel.app](https://sushi-bliss-v2.vercel.app)
- Vercel target: `production`
- Latest verified deployment: `dpl_CJkdGrr6xMMDSGGkoL4gt6QzUxtL`
- Verified app build commit: `9c4e98f`

Set `NEXT_PUBLIC_SITE_URL=https://sushi-bliss-v2.vercel.app` in production, or
replace it with the final custom domain if one is assigned later.

## Latest Release Verification

The latest production release was verified with:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- Desktop visual checks for orders, notifications, and reservation flows
- Live Playwright smoke against production routes at mobile and desktop widths
- Live mobile purchase path smoke against production
- `vercel inspect https://sushi-bliss-v2.vercel.app`
- `vercel logs https://sushi-bliss-v2.vercel.app --level error --since 30m`

The production deployment is `READY`, and the final error-log scan found no
runtime errors.

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

Dependabot checks npm dependencies and GitHub Actions weekly so routine updates
arrive as isolated pull requests.

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
