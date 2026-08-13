# Farm Gate Locator

Farm Gate Locator is a mobile-first prototype for checking which products are available at nearby farm gates before making a trip. It presents five seeded pilot farms in map-style and list views, supports product filtering and search, and lets a reviewer explore farm details, directions, favorites, visit notes, and a simple vendor update flow.

The current application is a **local browser prototype**, not a live directory. Its farms, addresses, phone numbers, product availability, and update timestamps are demonstration data. Changes made through the vendor screen are stored only in the current browser; there is no backend, vendor identity verification, moderation, synchronization, or real alert delivery.

> **Project status:** The responsive React interface, seed data, state-based navigation, local persistence, PWA build, offline-status banner, error boundary, feedback capture, and pilot-review documents are implemented. Real mapping, production farm data, authentication, remote persistence, notifications, and automated tests remain future work.

## Product promise

> Know which nearby farm-gate products are available before you drive.

The intended Peterborough and Kawartha Lakes pre-pilot is defined in [`mini-spec.md`](./mini-spec.md). The phone-oriented review script and acceptance checklist are in [`pwa-review-checklist.md`](./pwa-review-checklist.md).

## Implemented experience

| Area | Current behavior |
|---|---|
| Map view | Displays five farms as hard-coded pins on a styled schematic map, not a geographic map. |
| List view | Shows farm cards and availability states in a scrollable list. |
| Search and filters | Filters by farm name, product text, description, and seven category chips. |
| Farm detail | Shows description, products, update age, phone, address, directions, favorite state, and alert toggle. |
| Vendor update | Lets any local user change seeded product availability and refresh the farm timestamp. |
| Favorites and alerts | Persists toggle state locally; the alert control does not send push notifications or email. |
| Visit notes | Stores farm-specific notes in the current browser. |
| Feedback | Stores pilot feedback in the current browser; it is not transmitted to the project owner. |
| Connectivity | Shows an offline banner and generates an application-shell service worker. |
| Recovery | Catches render failures and provides retry or full local-data reset actions. |

## Repository organization

```text
.
├── src/
│   ├── components/
│   │   ├── layout.tsx          # Main stateful application shell and view switching
│   │   ├── mapview.tsx         # Schematic map, pins, and farm preview
│   │   ├── listview.tsx        # Searchable farm list
│   │   ├── farmdetail.tsx      # Farm details, directions, favorite, and alert controls
│   │   ├── vendorform.tsx      # Local prototype availability editor
│   │   ├── favoritesview.tsx   # Saved-farm view
│   │   ├── visitnotes.tsx      # Browser-local farm notes
│   │   ├── feedbackbutton.tsx  # Browser-local pilot feedback
│   │   └── errorboundary.tsx   # Root render recovery and local reset
│   ├── data/farms.ts           # Five seeded farms, categories, and freshness helpers
│   ├── hooks/usefarmsdata.ts   # Local state, filtering, updates, and persistence
│   ├── types/index.ts          # Farm, product, availability, and view types
│   ├── app.tsx                 # Application entry component
│   ├── main.tsx                # React bootstrap and error boundary
│   └── index.css               # Tailwind layers and shared component styles
├── mini-spec.md                # Problem, audience, scope, pilot, and success criteria
├── pwa-review-checklist.md      # Manual pilot review script
├── DESIGN-HANDOFF.md            # Visual handoff notes
├── DESIGN-MANIFEST.json         # Design metadata
├── vite.config.ts               # React and PWA build configuration
├── tailwind.config.js           # Theme configuration
├── package.json                 # npm scripts and dependency ranges
├── package-lock.json            # Reproducible dependency graph
└── .gitignore                   # Excludes dependencies, builds, local settings, and logs
```

`layout.tsx` switches between map, list, detail, favorites, and vendor modes with React state; the application does not currently use a URL router. `usefarmsdata.ts` is the intended data boundary: it loads the seed data or a saved browser copy, applies updates and filters, and writes changes back to local storage.

## Technology

| Area | Technology |
|---|---|
| Interface | React 18, TypeScript |
| Styling | Tailwind CSS 3 and PostCSS |
| Build tooling | Vite 6, npm |
| PWA support | `vite-plugin-pwa` and Workbox |
| Persistence | Browser `localStorage` |
| Current data source | Checked-in TypeScript seed data |

## Requirements

Use a current Node.js LTS release; **Node.js 20 or newer is recommended**. No API key, environment variable, database, or external service is required for the prototype.

## Quick start

```bash
git clone https://github.com/newM1k3/farm-gate-locator.git
cd farm-gate-locator
npm ci
npm run dev
```

Open the URL reported by Vite, normally `http://localhost:5173`.

Do not use `npm install` as the default clean-clone command when reproducing the checked-in graph; `npm ci` verifies and installs from `package-lock.json` without silently rewriting it.

## Available commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the local Vite development server. |
| `npm run build` | Run the TypeScript project build and create the PWA in `dist/`. |
| `npm run preview` | Serve the completed production build locally. |

There is no lint or automated test script yet. The production build is currently the main deterministic code check.

## Browser data

The prototype uses the following local-storage keys:

| Key | Contents |
|---|---|
| `farm-gate-farms` | Seeded farm records plus local availability, favorite, and alert changes. |
| `visit-notes-<farm-id>` | Personal notes for one farm. |
| `pilot-feedback` | Feedback entered through the floating review control. |

These records remain in the current browser profile and site origin. They are not uploaded, backed up, synchronized, moderated, or visible to another device. **Reset & Reload** in the error screen removes all three categories of local prototype data before reloading.

Because the vendor screen is unauthenticated, its changes must never be treated as authoritative farm information. A production release needs a trusted data owner, role-based authorization, audit history, correction workflow, and visible last-verification policy.

## PWA and offline behavior

`vite.config.ts` configures an auto-updating service worker and caches generated JavaScript, CSS, HTML, and SVG shell assets. Google Maps direction links remain network-only. The offline banner reports browser connectivity, but it does not make external directions available without a network connection.

The manifest currently points to the starter `vite.svg` for its 192px and 512px icons, but that asset is not included in the authored repository. Add reviewed, correctly sized maskable and standard application icons before claiming production installability or submitting the app to an app catalog.

Service-worker behavior should be validated against `npm run build` and `npm run preview`; development mode does not reproduce the production cache lifecycle exactly.

## Production build and deployment

```bash
npm ci
npm run build
npm run preview
```

The deployable static site is written to `dist/`. That generated directory is intentionally ignored and should be produced by CI or the hosting service rather than committed to Git.

A static host such as Netlify, Cloudflare Pages, or another Vite-compatible service can publish `dist/`. Configure HTTPS, verify service-worker updates and direct navigation, and add production icons before a public pilot.

## Validation

Before committing a change, run:

```bash
npm ci
npm run build
npm audit
```

Manual checks should cover map and list views, every filter, combined search and filtering, farm detail, directions, favorites, alert toggles, vendor updates, visit notes, feedback, stale data, empty states, narrow layouts, keyboard navigation, browser reload persistence, full reset, offline state, service-worker installation, and a clean production preview.

## Known limitations and review priorities

| Priority | Improvement |
|---|---|
| High | Replace mock farms, placeholder contact data, and unauthenticated local vendor edits with a verified data source, authentication, authorization, and moderation workflow. |
| High | Choose one backend direction. The current documents conflict: the earlier README names PocketBase, while `mini-spec.md` names MySQL, Drizzle, email auth, and object storage. |
| High | Add real PWA icons, offline/update tests, and a production installation check; the current manifest references a missing starter icon. |
| High | Add unit tests for freshness thresholds, filtering, storage hydration, vendor updates, full reset, and malformed saved data. |
| Medium | Replace the schematic pin layout with an accessible map or coordinate-aware list while retaining a complete non-map alternative. |
| Medium | Harden feedback and visit-note storage against corrupted JSON, quota errors, and private-browsing restrictions. |
| Medium | Add continuous integration for clean install, TypeScript/build, dependency audit, and future tests. |
| Medium | Define privacy, retention, deletion, consent, and incident-response rules before storing real vendor or visitor data. |
| Low | Add URL-addressable views only if deep links or browser history become a verified pilot need. |

## Pilot criteria

The current mini-spec schedules a controlled pilot for **October 13, 2026** with five named candidates and 20–30 local testers. It proposes continuing only if at least 70% of participating farms update weekly and at least three visitors report a successful, expectation-matched trip. Treat the farm names in the seed file as pilot placeholders until participation and public listing consent are confirmed.

## License

No license file or package license is currently included. Until the owner selects a license, normal copyright restrictions apply.
