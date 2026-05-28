# Trip Cost

Source of truth for what the Camino actually cost (excluding flights to/from Spain). Sync to `src/data/days.ts` (or a new `cost.ts` data file) when ready.

**Scope:**
- **Included:** lodging, food, ground transit in Spain, misc trip expenses
- **Excluded:** flights to/from Spain (varies too much by traveler to be useful)
- **Gear:** tracked separately in `GEAR.md` — total surfaced in cost section with link

**Field guide:**
- All amounts in euros (€) — site displays both € and $ via toggle
- USD conversion at trip-time rate: assume ~$1.08/€ (update if you want precision)
- Mid-range estimates noted as `~€X` ; replace with exact when known

---

## SUMMARY

| Category   | Amount (est.) | Notes                                          |
|------------|---------------|-------------------------------------------------|
| Lodging    | ~€217         | 7 nights, 6 albergues + 1 studio apartment      |
| Food       | ~€210         | Pilgrim menus + a few nicer Santiago meals      |
| Transit    | ~€100         | Train Madrid ↔ Sarria, Santiago ↔ Madrid        |
| Misc       | ~€35          | Credencial, Compostela, laundry, donations      |
| **Total (on-trip)** | **~€562** | ~$610 USD                          |
| Gear       | TBD (see GEAR.md) | One-time purchase, link to gear modal       |

**Reframe for the site:** "The Camino itself cost about €560. A bare-bones version — all municipal albergues, only pilgrim menus, no rest day — runs closer to €400. The extra was the Santiago apartment and a couple of real restaurants. Worth it."

---

## LODGING — DETAIL

| Night | Date    | Town              | Type              | Cost     | URL |
|-------|---------|-------------------|-------------------|----------|-----|
| 1     | May 17  | Sarria            | Municipal albergue| ~€11     | https://maps.app.goo.gl/ibwbpkAcxDRHBrwk7 |
| 2     | May 18  | Portomarín        | Private albergue  | ~€15.50  | https://maps.app.goo.gl/1pmaLY8iV38QBpoE8 |
| 3     | May 19  | Palas de Rei      | Private albergue  | ~€15.50  | https://maps.app.goo.gl/dVxLwFcGSV3U3uWs6 |
| 4     | May 20  | Arzúa             | Private albergue  | ~€15.50  | https://maps.app.goo.gl/rYkE9vr8WCEdXYs79 |
| 5     | May 21  | O Pedrouzo        | Albergue w/ spa   | €30      | https://maps.app.goo.gl/eEDHBME73Ap3FG9Z6 |
| 6     | May 22  | Santiago          | Albergue          | ~€40     | https://maps.app.goo.gl/rMYgYeVTjr9h4dAp8 |
| 7     | May 23  | Santiago          | Studio apartment  | €90      | *(URL TBD)* |
| **Total** |     |                   |                   | **~€217.50** | |

The O Pedrouzo splurge: included spa access. After 4 days of walking, this was the right call.

---

## FOOD — DETAIL

Daily average ~€30, breaks down roughly as:

| Day | Lunch       | Dinner      | Cafe stops | Day total |
|-----|-------------|-------------|------------|-----------|
| 1   | Pilgrim menu | Pilgrim menu | ~€5       | ~€32      |
| 2   | Pilgrim menu | Pilgrim menu | ~€5       | ~€32      |
| 3   | Pulpo lunch  | Pilgrim menu | ~€5       | ~€35      |
| 4   | Pilgrim menu | Pilgrim menu | ~€5       | ~€32      |
| 5   | Celebration meal | Pilgrim menu | ~€5    | ~€40      |
| 6   | Nicer restaurant | Nicer restaurant | ~€5 | ~€50    |
| **Total** | | | | **~€220**    |

Notes:
- Pilgrim menus: ~€12-15 (3 courses + wine, fixed price)
- Cafe stops: coffee + pastry ~€3-5, usually 1-2 per morning
- Santiago restaurants ran ~€20-40 per meal
- Replace estimates with real numbers when known

---

## TRANSIT — DETAIL

| Leg                          | Type    | Cost (est.) |
|-------------------------------|---------|-------------|
| Madrid → Sarria               | Train   | ~€50        |
| Santiago → Madrid             | Train   | ~€50        |
| **Total**                     |         | **~€100**   |

Notes: Renfe ALVIA/AVE depending on route. Book in advance for cheaper fares.

---

## MISC — DETAIL

| Item                          | Cost (est.) |
|-------------------------------|-------------|
| Credencial del Peregrino      | ~€2         |
| Compostela certificate        | ~€3         |
| Laundry (1-2 paid washes)     | ~€10        |
| Donations (churches, stamps)  | ~€10        |
| Snacks / convenience items    | ~€10        |
| **Total**                     | **~€35**    |

---

## GEAR (cross-reference)

Gear is tracked separately in `GEAR.md`. On the site, the cost section should:
- Show the gear total (sum of items I bought specifically for this trip)
- Link/jump to the gear modal for the full inventory
- Distinguish "new for trip" vs "already owned" if I want that granularity (TBD)

**Action items:**
- [ ] Decide whether to track item prices in GEAR.md (add `price` field)
- [ ] Decide what counts as "new for trip" vs "already owned"
- [ ] Calculate trip-specific gear total

---

## CURRENCY CONVERSION

- All source numbers in euros (€)
- Display in € or $ via toggle on the cost modal
- Conversion rate to use: **~$1.08 per €1** (May 2026 rate; adjust if you want more precision)
- Display logic: store euros as the source of truth, multiply for USD display

---

## TO RESOLVE / DECISIONS

- [ ] Replace `~€X` estimates with exact amounts when known (check bank statements / Wise / wherever you tracked spending)
- [ ] Confirm Santiago apartment URL (Airbnb/Booking link)
- [ ] Decide gear treatment in cost section (separate total? itemized? just link?)
- [ ] Write the "reframe" copy for the cost section — the narrative line about why the total is what it is
- [ ] Pick a USD conversion rate (current spot rate vs. trip-time rate)

---

## DATA FILE CHANGES NEEDED

When syncing to `src/data/days.ts` (or new `src/data/cost.ts`):

1. Create `cost` export with structure:
   ```ts
   export const cost = {
     totalEur: 562.50,
     totalUsd: 610,
     conversionRate: 1.08,
     categories: [
       { name: 'Lodging', totalEur: 217.50, items: [...] },
       { name: 'Food', totalEur: 210, items: [...] },
       { name: 'Transit', totalEur: 100, items: [...] },
       { name: 'Misc', totalEur: 35, items: [...] },
     ],
     gearTotalEur: null,  // computed from GEAR.md or filled in manually
     narrative: "The Camino itself cost about €560..."
   };
   ```

2. Update `CostModal.tsx` to:
   - Show summary table at top
   - Show per-category detail (expandable or always-visible — TBD)
   - Include the € / $ toggle (already built in the UI)
   - Link to gear modal for gear breakdown
   - Display the narrative line as cost section "lede"
