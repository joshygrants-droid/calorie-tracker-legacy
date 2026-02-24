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
- Shares saved foods across all profiles in the same signed-in account
- Supports favorites and meal templates for repeat logging
- Tracks macros (protein/carbs/fat) in food entries
- Logs food by date/meal with edit/delete support
- Preserves historical entries and shows trend/archive summaries
- Migrates legacy data from `calorie-tracker-v1`/`calorie-tracker-v2`/`calorie-tracker-v3` to `calorie-tracker-v4`
- Uses imperial inputs in the UI (height in ft/in, weight in lbs)

## Tech

- Plain HTML/CSS/JavaScript
- Browser `localStorage` persistence (default, no backend required)
- Optional Supabase Auth + Postgres-backed JSON state sync
- Optional Vercel serverless config route (`/api/public-config`)
- In-app backup export/import and cloud snapshot restore tools

## Run locally (local-only)

Any static server works. For example:

```bash
cd /Users/joshsmith/calorie-tracker-legacy
python3 -m http.server 4173
```

Then open:

`http://localhost:4173`

You can also open `index.html` directly in a browser, but a local server is recommended.

## Optional: custom quote packs (30 per author)

If you want strict 30/author quote rotation (Epictetus, Marcus Aurelius, Seneca, Jocko Willink, Ryan Holiday):

1. Open `/Users/joshsmith/calorie-tracker-legacy/config.local.js`.
2. Add `quoteOverrides` with:
   - `jockoWillink`: 30 unique quotes (for your case: from *Extreme Ownership*)
   - `ryanHoliday`: 30 unique quotes (for your case: from *The Obstacle Is the Way*, *Discipline Is Destiny*, *Courage Is Calling*)
3. Each quote object should have:
   - `text` (required)
   - `section` (required, chapter/part)
   - `work` (optional, book title)
   - `sourceUrl` (optional)

Example shape:

```js
window.CALORIE_TRACKER_CONFIG = {
  quoteOverrides: {
    jockoWillink: [
      { text: "Quote text...", section: "Chapter 1", work: "Extreme Ownership" },
    ],
    ryanHoliday: [
      { text: "Quote text...", section: "Part I", work: "The Obstacle Is the Way" },
    ],
  },
};
```

Notes:
- The app deduplicates quotes by text.
- If both modern author lists have 30 unique quotes, strict 150 rotation activates (30/author).
- If not, app falls back to available unique quotes and shows a console warning.

### Goodreads workflow (fast path)

If you want to source quotes from Goodreads:

1. Open `/Users/joshsmith/calorie-tracker-legacy/quote-overrides.goodreads.template.js`.
2. Copy quote objects into:
   - `jockoWillink` (30 unique from *Extreme Ownership*)
   - `ryanHoliday` (30 unique from *The Obstacle Is the Way*, *Discipline Is Destiny*, *Courage Is Calling*)
3. Copy the `quoteOverrides` block into `/Users/joshsmith/calorie-tracker-legacy/config.local.js` under `window.CALORIE_TRACKER_CONFIG`.
4. Refresh the app.
5. Confirm strict mode is active:
   - Open browser dev tools console.
   - Ensure this warning does **not** appear:
     `Strict 30-per-author mode is inactive...`

## Optional local cloud testing

1. Edit `config.local.js` with your Supabase values (or copy values from `config.local.example.js`).
2. In Supabase SQL Editor, run `supabase/schema.sql`.
3. Open the app and use the **Cloud sync** panel (email magic link sign-in).
4. In **Cloud sync -> Backup and restore**:
   - `Refresh snapshots` to load cloud history.
   - `Restore latest` or choose one in `Snapshot` then `Restore selected`.
   - `Export backup` / `Import backup` for manual JSON backups.

If `config.local.js` has empty values, the app stays in local-only mode.

## Deploy to production (Vercel + Supabase)

1. Create a Supabase project.
2. Run `/Users/joshsmith/calorie-tracker-legacy/supabase/schema.sql` in Supabase SQL Editor.
3. In Supabase Auth settings:
   - Enable Email provider (magic links).
   - Add redirect URLs for your environments (at minimum `http://localhost:4173` and your Vercel domain).
4. Import this repo into Vercel.
5. Add environment variables in Vercel (Production/Preview/Development):
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
6. Deploy.
7. Open the app, sign in from the **Cloud sync** panel, and click **Sync now** once to initialize cloud state.

The app will:
- Keep localStorage as a fallback.
- Auto-save to cloud after local changes when signed in.
- Resolve startup conflicts by preferring the newer copy (local vs cloud `updatedAt`).
- Keep a rolling cloud snapshot history (latest 300 states per user) via DB trigger.
- Allow restoring snapshots from the app UI.
- Allow downloading/uploading full JSON backups from the app UI.

## Data model overview

- `userProfile`: sex, age, height, current weight, daily step goal
- `profiles`: named saved profiles with independent logs/history
- `plans`: goal + metabolic plans nested under each profile, with active plan selection
- `stepsByDay`: date-keyed actual step logs for daily budget adjustments
- `foodCatalog`: reusable foods with macros and usage stats
- `sharedFoodCatalog`: account-level reusable foods shared by all profiles
- `recentFoodIds`: ranked recent foods for quick selection
- `foodLogs`: entries by `YYYY-MM-DD`
- `weights`: dated weight check-ins
- `historyIndex`: per-day totals for fast archive rendering
- `meta`: schema version + migration metadata

## Validation checks performed

- JavaScript syntax check: `node --check app.js`
- Lint diagnostics in editor: no reported issues
