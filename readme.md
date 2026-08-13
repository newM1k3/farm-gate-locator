# Farm Gate Locator — Pre-Pilot MVP

A React + TypeScript + Vite + Tailwind CSS PWA that helps people find nearby farm-gate products with up-to-date availability. "Know which nearby farm-gate products are available before you drive."

Full problem statement, target user, and success criteria live in [`mini-spec.md`](./mini-spec.md). A phone-friendly click-through test script lives in [`pwa-review-checklist.md`](./pwa-review-checklist.md).

## Quick Start

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173` — works on desktop and mobile. `npm run build` produces an installable PWA in `dist/`.

## Project Structure

| File/Folder | Purpose |
|---|---|
| `src/types/index.ts` | TypeScript types — Farm, ProductCategory, ProductStatus, AvailabilityState, ViewMode |
| `src/data/farms.ts` | Mock data — 5 pilot farms with real availability states, plus the `CATEGORIES` list and helper functions |
| `src/hooks/usefarmsdata.ts` | Farm data hook — the intended swap point for a real backend later |
| `src/components/mapview.tsx` | Map screen with farm pins, clickable preview cards, category support |
| `src/components/listview.tsx` | Scrollable list of farm cards with availability badges |
| `src/components/searchbar.tsx` | Search by farm name or product |
| `src/components/filterbar.tsx` | Category filter chips (All, Eggs, Produce, Baked Goods, Maple, Flowers, Seasonal) |
| `src/components/farmdetail.tsx` | Full farm detail — about, availability grid, directions, favorite/alert toggles |
| `src/components/visitnotes.tsx` | Personal visit notes on a farm's detail page (localStorage) |
| `src/components/vendorform.tsx` | Farm-side update form — farm selector, product toggles, success confirmation |
| `src/components/favoritesview.tsx` | Saved farms with empty state |
| `src/components/bottomnav.tsx` | Bottom tab bar — Map, List, Saved, Vendor |
| `src/components/layout.tsx` | App shell — routing between all views |
| `src/components/offlinebanner.tsx` | Amber banner shown when the network drops |
| `src/components/feedbackbutton.tsx` | Bottom-right feedback capture during review/pilot testing |
| `src/components/errorboundary.tsx` | Catches component crashes instead of a blank screen |
| `src/index.css` | Tailwind directives + custom component classes (btn-primary, card, chip, badges) |

## How to Modify

- **Farm data:** Edit `src/data/farms.ts` — add farms, change products, adjust availability
- **Colors & styling:** Edit `tailwind.config.js` for theme colors, `src/index.css` for component classes
- **Categories:** Edit the `CATEGORIES` array in `src/data/farms.ts`
- **Add screens:** Create new component in `src/components/`, wire it into `layout.tsx` and `bottomnav.tsx`

## Quality Coverage

- ✅ Desktop & mobile responsive (max-w-lg centered, touch-friendly targets)
- ✅ Empty states — no farms matching filter/search, no favorites saved, no farm selected in vendor form
- ✅ Loading/transition states — smooth view switching, success confirmation after vendor update
- ✅ Interactive states — hover, active (scale), disabled on buttons; pressed states on filter chips
- ✅ Accessibility — aria-labels on icon buttons, aria-pressed on filter chips, focus rings, skip-to-content link, semantic HTML
- ✅ All 7 category filters work with correct filtering logic, combinable with search
- ✅ Availability states — green (available), amber (sold out), gray (stale >48h, with a "call ahead" warning)
- ✅ Favorites, visit notes, and an alerts toggle (UI-complete; no real push yet — see limitations)
- ✅ PWA — installable, offline banner, works with the network off (cached shell)
- ✅ Error boundary in place; feedback button for pilot testers
- ✅ TypeScript strict mode — full type safety

## Known Limitations (What's Stubbed)

Full detail in [`pwa-review-checklist.md`](./pwa-review-checklist.md#-known-limitations-whats-stubbed). Short version:

| Limitation | Fix comes with |
|---|---|
| Data lives in localStorage, not a real database | Connecting `usefarmsdata.ts` to PocketBase |
| No real vendor auth | PocketBase email magic-link auth |
| Alerts toggle is UI-only, no actual push/email | A backend to trigger web push or email |
| Map is CSS-positioned, not real coordinates | Swapping in Leaflet or a Google Maps embed |
| No farm photo upload | Object storage via PocketBase |

## What's Next

Per [`mini-spec.md`](./mini-spec.md): a controlled pilot in **Week 6 (October 13, 2026)** with the 5 named pilot farms and 20–30 local testers. The pilot continues to full buildout only if 70%+ of farms update status weekly **and** at least 3 visitors report a successful trip. Before that: connect real persistence (PocketBase) and deploy the PWA to a real URL (Netlify or Function Compute).
