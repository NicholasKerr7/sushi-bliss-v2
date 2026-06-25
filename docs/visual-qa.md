# Visual QA

The app no longer commits reference screenshot binaries into `public/`. Runtime
assets stay in `public/assets`; visual baselines should live outside the
production asset tree.

Use `.visual-references/screenshots` for local baselines, or point
`VISUAL_REFERENCE_DIR` at another folder with the same structure:

```text
.visual-references/screenshots/
  mobile/
  tablet/
  desktop/
```

## Normal Audit

Run the visual-reference audit without baseline PNGs:

```bash
npm run test:visual
```

This validates each mapped route/interaction, captures a current viewport image,
checks visible images, checks for framework error overlays, and blocks
horizontal overflow. If no matching reference PNG exists, the test records
metadata and continues without pixel comparison.

## Pixel Diff Audit

To compare against local baselines:

```bash
VISUAL_REFERENCE_DIR=.visual-references/screenshots npm run test:visual:diff
```

Diff artifacts are written to `test-results/visual-reference-diffs`:

- `*.current.png`: current rendered viewport capture.
- `*.reference.png`: matching local baseline.
- `*.diff.png`: red-overlay drift map.
- `*.metadata.json`: route, viewport, reference path, and diff stats.

To fail when drift exceeds the configured ratio:

```bash
VISUAL_REFERENCE_DIR=.visual-references/screenshots npm run test:visual:strict
```

Defaults:

- `VISUAL_REFERENCE_MAX_DIFF_RATIO=0.12`
- `VISUAL_REFERENCE_PIXEL_THRESHOLD=32`

## Approving Baselines

After reviewing diff artifacts, approve updated baselines:

```bash
npm run test:visual:approve:dry-run
npm run test:visual:approve
```

The approval script writes to the resolved reference path recorded in diff
metadata. Keep `.visual-references` out of Git.

## Coverage

The route-to-reference mapping is documented in `docs/screenshot-coverage.md`.
That file tracks the expected mobile, tablet, and desktop reference names even
though the PNG binaries are local-only.
