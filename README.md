# Calorie Tracker (Lose It-Style)

A local-first calorie and weight tracking web app with adaptive calorie targets.

## What it does

- Builds a daily calorie recommendation from profile + step goal + goal pace
- Uses a guided startup flow: select/create profile, then select/create plan, then open dashboard
- Supports multiple named profiles and multiple saved plans per profile
- Supports men and women with sex-specific BMR and safety floors
- Tracks weight check-ins and updates recommendations from latest weight
- Tracks daily step actuals and compares expected vs actual calorie budget
- Supports reusable food memory with local food catalog + recent selections
- Supports favorites and meal templates for repeat logging
- Tracks macros (protein/carbs/fat) in food entries
- Logs food by date/meal with edit/delete support
- Preserves historical entries and shows trend/archive summaries
- Migrates legacy data from `calorie-tracker-v1`/`calorie-tracker-v2`/`calorie-tracker-v3` to `calorie-tracker-v4`
- Uses imperial inputs in the UI (height in ft/in, weight in lbs)

## Tech

- Plain HTML/CSS/JavaScript
- Browser `localStorage` persistence (no backend required)

## Run locally

Any static server works. For example:

```bash
cd /Users/joshsmith/calorie-tracker-legacy
python3 -m http.server 4173
```

Then open:

`http://localhost:4173`

You can also open `index.html` directly in a browser, but a local server is recommended.

## Data model overview

- `userProfile`: sex, age, height, current weight, daily step goal
- `profiles`: named saved profiles with independent logs/history
- `plans`: goal + metabolic plans nested under each profile, with active plan selection
- `stepsByDay`: date-keyed actual step logs for daily budget adjustments
- `foodCatalog`: reusable foods with macros and usage stats
- `recentFoodIds`: ranked recent foods for quick selection
- `foodLogs`: entries by `YYYY-MM-DD`
- `weights`: dated weight check-ins
- `historyIndex`: per-day totals for fast archive rendering
- `meta`: schema version + migration metadata

## Validation checks performed

- JavaScript syntax check: `node --check app.js`
- Lint diagnostics in editor: no reported issues

