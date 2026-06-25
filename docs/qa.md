# Sushi Bliss v2 QA

Use the Playwright suite to validate customer and admin routes, route-specific
interactions, visible image loading, and horizontal overflow.

Run the standard verification set before commits that change app behavior:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

For the route-state audit only:

```bash
npm run test:routes
```

The app remains mock/local-data driven until live backend work is requested.
