# Implementation Notes

## Assumptions made

- Weight units are pounds and height is feet/inches in the UI.
- Profile activity uses daily step goals (no activity-level dropdown).
- Weekly pace uses lbs/week and is interpreted as:
  - `lose`: calorie deficit
  - `gain`: calorie surplus
  - `maintain`: zero delta
- Safety floors are fixed:
  - Female: 1200 kcal/day
  - Male: 1500 kcal/day
- The app is local-first and does not sync across devices/accounts.
- Profiles are stored locally and each profile has separate logs and weight history.
- Each profile can have multiple saved plans (goal + metabolic settings).
- Entry flow is intentional: profile selection/creation first, then plan selection/creation, then dashboard.

## Formula choices

- BMR: Mifflin-St Jeor
- Baseline TDEE: BMR × 1.2 sedentary multiplier
- Step calories: distance from steps (sex + height stride estimate) and body weight
- Energy conversion for pace: 7700 kcal per kg (lbs converted to kg internally)

## Non-goals (for this version)

- No food database/API integration
- No authentication/backend
- No macro nutrient targets

