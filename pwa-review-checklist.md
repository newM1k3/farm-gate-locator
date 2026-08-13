# Farm Gate Locator — PWA Review Checklist

> Open `npm run dev` (or the deployed PWA), pull this doc up on your phone, and click through section by section.
> Each item has a checkbox and a note about what to look for.

---

## 🗺️ Map View — Default Screen

- [ ] **5 farm pins visible** on the map area — Green Meadow, Kawartha Berry, Maple Ridge, Sunflower, Lakeside Bakes
- [ ] **Pin colors match status:** Green = available products, Amber = everything sold out, Gray = stale (>48h no update)
  - Green Meadow and Sunflower should be green
  - Lakeside Bakes should be amber (all sold out)
  - Maple Ridge should be gray/stale (3 days since update)
- [ ] **Tap a pin** → a preview card slides up from the bottom
- [ ] **Preview card** shows: farm name, availability badge, address snippet, last-updated time
- [ ] **"View Details"** button on preview card → opens farm detail page
- [ ] **"🧭 Directions"** button → opens Google Maps in a new tab
- [ ] **Tap away from pin** → preview card disappears
- [ ] **Toggle "List View"** button (top-right) → switches to list view

---

## 🔍 Search

- [ ] **Search bar** between header and filter chips
- [ ] **Type "eggs"** → only Green Meadow Eggs shows (1 result)
- [ ] **Clear search** (✕ button) → all 5 farms return
- [ ] **Type "berry"** → Kawartha Berry Patch shows
- [ ] **Type a farm name** like "Maple Ridge" → works
- [ ] **Type something with no match** → "No farms found" empty state
- [ ] **Result count** updates as you type

---

## 🏷️ Category Filters

- [ ] **7 chips:** All, Eggs, Produce, Baked Goods, Maple, Flowers, Seasonal
- [ ] **Tap "Eggs"** → only Green Meadow Eggs shows (map and list)
- [ ] **Tap "Maple"** → only Maple Ridge shows (all products available, but pin is gray because data is stale — that's correct behavior)
- [ ] **Tap "Baked Goods"** → Lakeside Bakes shows (all sold out = amber badge)
- [ ] **Tap "Seasonal"** → Kawartha Berry (jam) and Sunflower (pumpkins) show
- [ ] **Combine search + filter:** Filter "Produce" + search "strawberry" → Kawartha Berry Patch
- [ ] **Selected chip** is dark green, others are outline

---

## 📋 List View

- [ ] **Switch to list** from map (top-right button)
- [ ] **5 cards** with: emoji icon, farm name, availability badge, description, address snippet, update time
- [ ] **Tap any card** → opens farm detail
- [ ] **❤️ on favorited farms** (Green Meadow, Maple Ridge)
- [ ] **🔔 on alerted farms** (if you enabled alerts on any)
- [ ] **"No farms found"** empty state when search/filter has no results
- [ ] **Switch back** to map view

---

## 📄 Farm Detail Page

_Open from any farm card or map pin._

- [ ] **Back button** (←) in header returns to previous view
- [ ] **Farm name + availability subtitle** in header
- [ ] **Heart (🤍/❤️)** — tap to toggle favorite
- [ ] **Bell (🔕/🔔)** — tap to enable/disable alerts
  - [ ] Toggle on → amber "Alert Active" banner appears below the hero image
  - [ ] Toggle off → banner disappears
- [ ] **Hero area** with emoji placeholder
- [ ] **⚠️ Stale data warning** — should appear for Maple Ridge (3 days old) and Lakeside Bakes (1 day = not stale yet, only >48h triggers)
  - Actually test: Maple Ridge → should say "Availability may be outdated" and "Call ahead"
- [ ] **About section:** description, address, phone, last-updated time
- [ ] **"What's Available Today"** grid — each product with ✓ Available or ✗ Sold Out badge
  - Green Meadow: Brown Eggs ✓, Duck Eggs ✗
  - Lakeside Bakes: All 4 items ✗ Sold Out
- [ ] **"🧭 Get Directions"** button — opens Google Maps
- [ ] **Visit Notes section** at the bottom
- [ ] **"Add a visit note"** — tap to expand form
  - [ ] Write a note, toggle ✓/✗ found checkbox, save
  - [ ] Note appears with date, found/not-found indicator
  - [ ] Add multiple notes
  - [ ] Delete a note (🗑️)
  - [ ] Close the app → reopen → visit notes are still there (localStorage)

---

## 🏪 Vendor Update Form

- [ ] **Tap "Vendor"** in bottom nav
- [ ] **Select a farm** from dropdown
- [ ] **Product toggles** appear — green = Available, gray = Sold Out
- [ ] **Tap a product** to toggle it
- [ ] **"📡 Update Availability"** → success screen with ✅ and timestamp
- [ ] **"Changes are live"** message
- [ ] **Go to map** → check that farm's badge changed
- [ ] **Close browser, reopen** → the update is still there (stored in localStorage)
- [ ] **"Update Again"** button returns to form
- [ ] **Empty state** when no farm is selected

---

## ❤️ Favorites

- [ ] **Tap "Saved"** in bottom nav
- [ ] **Pre-favorited farms** (Green Meadow, Maple Ridge) should show
- [ ] **Go to a non-favorited farm** (e.g. Lakeside) → tap heart → go to Saved → it's there
- [ ] **Un-favorite** a farm → it disappears from Saved
- [ ] **Empty state** when no favorites: "No saved farms yet" with ❤️ icon

---

## 📱 Mobile & PWA

- [ ] **Responsive layout** — view at ~375px width (phone size)
- [ ] **Bottom nav** has 4 items: Map, List, Saved, Vendor
- [ ] **Active tab** is green
- [ ] **No horizontal scrolling** anywhere
- [ ] **Filter chips scroll horizontally** (no page scroll)
- [ ] **Touch targets are at least 44px** — buttons easy to tap
- [ ] **"Add to Home Screen"** prompt (PWA) — can install as standalone app
- [ ] **Works offline** — turn off network, reload, app still loads
- [ ] **Offline banner** — amber bar at top when disconnected
- [ ] **Dark mode?** Not yet implemented — uses light theme only

---

## ♿ Accessibility

- [ ] **Keyboard navigation** — Tab through filter chips, farm cards, bottom nav
- [ ] **Focus rings** visible (green outline) when tabbing
- [ ] **Skip to content** link (Tab on first load, press Enter to jump to main content)
- [ ] **Screen reader** — farm names, button labels, and alerts have proper aria labels

---

## 🐛 Edge Cases to Try

- [ ] **Stress test search** — type very long string, emojis, special characters
- [ ] **Rapidly switch views** — map → list → detail → back → vendor — no crashes
- [ ] **Update vendor, then immediately check map** — changes should be instant
- [ ] **Clear localStorage** (DevTools → Application → Clear) → app resets to defaults
- [ ] **Resize browser** from mobile to desktop width — layout adapts
- [ ] **💬 Feedback button** (bottom-right) — tap, write something, submit → "Thank you" confirmation
- [ ] **Trigger error** — not easy to do, but Error Boundary is in place if a component crashes

---

## ⚠️ Known Limitations (What's Stubbed)

| Limitation | Impact | When It Gets Fixed |
|---|---|---|
| **No real database** — data stored in localStorage | Changes don't sync between devices; clearing browser data resets everything | When PocketBase is connected (data hook has a clean swap point) |
| **No real auth** — vendor form is open to anyone | In a real pilot, you'd need farm owners to log in | With PocketBase — email magic link auth |
| **No push notifications** — alerts toggle exists but only shows a banner | Alert functionality is UI-only; no actual push/email | Requires backend for web push or email triggers |
| **Map is CSS-drawn, not Google Maps** | Pins are positioned programmatically, not on real coordinates | Replace with Leaflet or Google Maps embed |
| **Directions open external Google Maps** | Works fine, but no in-app map navigation | Leaflet integration would keep it in-app |
| **No farm photo upload** | Only emoji placeholders | Object storage integration with PocketBase |
| **No admin dashboard** | Can't see pilot metrics in-app | Depends on how you want to track pilot data |

---

## 📊 What to Look For While Clicking Around

1. **Does the app feel useful on first open?** Can you find a farm selling eggs within 10 seconds?
2. **Is the stale data warning clear enough?** (Maple Ridge at 3 days old)
3. **Is the vendor form actually fast enough?** (the 30-second target from the roadmap)
4. **Do visit notes feel worth using?** Would a pilot tester actually add notes?
5. **What's confusing?** Anything that made you stop and think "wait, what do I do here?"

---

## 🚀 Next Steps After This Review

1. **Note what you'd change** — tell Bubbles
2. **Week 6 (Controlled Pilot)** — we'd recruit 20-30 local users and 10 farms, run a weekend test
3. **PocketBase connection** — swap localStorage for real data persistence
4. **Deploy the PWA** — Netlify or Function Compute, get a real URL

---

*Start the review. Any bugs, confusion, or "I wish it did X" — just tell Bubbles.*
