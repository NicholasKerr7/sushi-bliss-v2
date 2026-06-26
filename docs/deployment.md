# Sushi Bliss v2 Deployment

## Production Target

Sushi Bliss v2 is configured for Vercel with the Next.js framework preset.

- Production URL: [https://sushi-bliss-v2.vercel.app](https://sushi-bliss-v2.vercel.app)
- Vercel target: `production`

Set `NEXT_PUBLIC_SITE_URL=https://sushi-bliss-v2.vercel.app` in production, or
replace it with the final custom domain if one is assigned later.

## Release Verification

Verify each release candidate with:

- `npm run format:check`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm audit --audit-level=moderate`
- Production route/header smoke after deploy

After deployment, verify:

- `vercel inspect https://sushi-bliss-v2.vercel.app`
- `vercel logs https://sushi-bliss-v2.vercel.app --level error --since 30m`
- Mobile and desktop smoke routes for `/`, `/menu`, `/orders`, `/reservations`,
  `/profile`, `/support`, and `/admin`

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
npx vercel link --yes --project sushi-bliss-v2
npx vercel env pull .env.local
npx vercel deploy --prod
```

For CI, store `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` as
provider secrets. Do not commit `.vercel` or real environment values.

## Environment

The app works with mock/local data without backend credentials. Future Supabase
and Stripe values should be configured in Vercel project settings and mirrored
from `.env.example`.

Use `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` for new Supabase projects. Keep
`SUPABASE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, and
`STRIPE_WEBHOOK_SECRET` server-only.
