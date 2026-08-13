# Farm Gate Locator — Mini-Spec (Week 0)

**Promise:** Know which nearby farm-gate products are available before you drive.

---

## Target User

**"Sarah"** — a Peterborough, Ontario resident who wants to buy local farm products. She's willing to drive, but hates wasting time and fuel on empty or closed farm stands. She checks her phone before heading out and wants one reliable place to look.

---

## Core Problem

Farm-gate availability changes daily — eggs sell out by noon, berries are picked over after a busy morning, the baker only fires the oven on weekends. There is currently **no single place** to check what's available before getting in the car. The result is wasted trips, frustrated customers, and missed sales for farms.

---

## Before/After Outcome

| Before | After |
|---|---|
| Drive to 3 stands hoping one has eggs — two are sold out. | Open app → filter "eggs" → see 2 farms with eggs updated 45 min ago → navigate to the closest one. |
| Call farms one by one (and nobody answers). | One scroll shows all nearby availability with timestamps. |
| Only discover the maple place exists because a neighbour mentioned it. | Browse map in your area and discover farms you never knew about. |
| Farms lose walk-in sales because nobody knows what they have *right now*. | Farms post a quick status update in 30 seconds — customers show up. |

---

## Must-Have Features (5)

1. **Map + List view with farm pin locations** — browse visually or scan a sortable list; tap a pin/card for details.
2. **Product/category filters** — eggs, produce, baked goods, maple products, flowers, seasonal specialties.
3. **Last-updated availability status with timestamp** — e.g. "Eggs: Available · updated 10:45 AM today." Stale data (48h+) is flagged.
4. **Simple vendor update form (mobile-first)** — farms toggle product availability on/off in under 30 seconds. No inventory counts, no pricing — just "what's available now."
5. **Directions link** — one tap to open the farm's address in Google/Apple Maps for turn-by-turn navigation.

---

## Explicitly Excluded (V1)

- Payments / e-commerce / online ordering
- User reviews, ratings, or photos
- Public farm submissions (direct-recruit only)
- Automated inventory tracking
- Pricing information
- Delivery / pickup scheduling

---

## Pilot Candidates (5)

| Farm | Primary Category | Location |
|---|---|---|
| Green Meadow Eggs | Eggs | Peterborough area |
| Kawartha Berry Patch | Produce (berries) | Kawartha Lakes |
| Maple Ridge Farms | Maple Products | Peterborough area |
| Sunflower Homestead | Flowers & Seasonal | Kawartha Lakes |
| Lakeside Bakes | Baked Goods | Peterborough area |

---

## Pilot Date

**Week 6 — October 13, 2026**

---

## Success Measure

The pilot **continues** to full buildout only if **both** conditions are met:

- ✅ **70%+ of pilot farms update their status at least once per week.**
- ✅ **At least 3 pilot visitors report a successful trip** (found what they expected based on app data and drove to the farm).

If either condition is missed → iterate on design, re-recruit farms, and re-pilot. If both thresholds are met → proceed to broader farm recruitment and optional deferred features.

---

## Tech Stack

React + TypeScript + Vite · Tailwind CSS · PWA · MySQL + Drizzle ORM · Email auth · Object storage for farm images
