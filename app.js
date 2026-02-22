const STORAGE_KEY_V5 = "calorie-tracker-v5";
const STORAGE_KEY_V4 = "calorie-tracker-v4";
const STORAGE_KEY_V3 = "calorie-tracker-v3";
const STORAGE_KEY_V2 = "calorie-tracker-v2";
const STORAGE_KEY_V1 = "calorie-tracker-v1";
const SCHEMA_VERSION = 5;
const DEFAULT_CALORIES = 2000;

const SEDENTARY_MULTIPLIER = 1.2;
const CALORIES_PER_MILE_PER_LB = 0.53;
const APP_TIME_ZONE = "America/Denver";
const PROJECTION_LOG_WINDOW_DAYS = 28;
const PROJECTION_WEIGHT_LOOKBACK = 8;
const MACRO_COLORS = {
  protein: "#00c853",
  carbs: "#2979ff",
  fat: "#8e24aa",
};

const WEIGHT_LOSS_MILESTONES = [
  { lbs: 2, object: "about one pineapple", emoji: "🍍" },
  { lbs: 5, object: "about one laptop", emoji: "💻" },
  { lbs: 10, object: "about one watermelon", emoji: "🍉" },
  { lbs: 15, object: "about one carry-on suitcase", emoji: "🧳" },
  { lbs: 20, object: "about one medium dog", emoji: "🐕" },
  { lbs: 25, object: "about one loaded backpack", emoji: "🎒" },
  { lbs: 30, object: "about one bowling ball", emoji: "🎳" },
  { lbs: 35, object: "about one bike", emoji: "🚲" },
  { lbs: 40, object: "about one motorcycle", emoji: "🏍️" },
  { lbs: 45, object: "about one motor scooter", emoji: "🛵" },
  { lbs: 50, object: "about one panda", emoji: "🐼" },
];

const elements = {
  setupFlow: document.getElementById("setup-flow"),
  appShell: document.getElementById("app-shell"),
  switchSetup: document.getElementById("switch-setup"),
  setupProfileSelect: document.getElementById("setup-profile-select"),
  setupNewProfileName: document.getElementById("setup-new-profile-name"),
  setupCreateProfile: document.getElementById("setup-create-profile"),
  setupDeleteProfile: document.getElementById("setup-delete-profile"),
  setupProfileForm: document.getElementById("setup-profile-form"),
  setupPlanSelect: document.getElementById("setup-plan-select"),
  setupNewPlanName: document.getElementById("setup-new-plan-name"),
  setupCreatePlan: document.getElementById("setup-create-plan"),
  setupDeletePlan: document.getElementById("setup-delete-plan"),
  setupPlanForm: document.getElementById("setup-plan-form"),
  activeProfileLabel: document.getElementById("active-profile-label"),
  activePlanLabel: document.getElementById("active-plan-label"),
  goalValue: document.getElementById("goal-value"),
  todayValue: document.getElementById("today-value"),
  remainingValue: document.getElementById("remaining-value"),
  ringPercent: document.getElementById("ring-percent"),
  ringProgress: document.querySelector(".ring-progress"),
  macroProteinRing: document.getElementById("macro-protein-ring"),
  macroCarbsRing: document.getElementById("macro-carbs-ring"),
  macroFatRing: document.getElementById("macro-fat-ring"),
  topMeal: document.getElementById("top-meal"),
  recommendationMeta: document.getElementById("recommendation-meta"),
  mathDetailsContent: document.getElementById("math-details-content"),
  bmrValue: document.getElementById("bmr-value"),
  tdeeValue: document.getElementById("tdee-value"),
  expectedTdeeValue: document.getElementById("expected-tdee-value"),
  actualTdeeValue: document.getElementById("actual-tdee-value"),
  floorValue: document.getElementById("floor-value"),
  recommendedValue: document.getElementById("recommended-value"),
  expectedBudgetValue: document.getElementById("expected-budget-value"),
  actualBudgetValue: document.getElementById("actual-budget-value"),
  dayBalanceValue: document.getElementById("day-balance-value"),
  stepBalanceValue: document.getElementById("step-balance-value"),
  deltaValue: document.getElementById("delta-value"),
  projectionValue: document.getElementById("projection-value"),
  projectionConfidence: document.getElementById("projection-confidence"),
  historyDays: document.getElementById("history-days"),
  historyAverage: document.getElementById("history-average"),
  historyWeightDelta: document.getElementById("history-weight-delta"),
  historyBars: document.getElementById("history-bars"),
  historyTable: document.getElementById("history-table"),
  selectedDate: document.getElementById("selected-date"),
  selectedDateLabel: document.getElementById("selected-date-label"),
  datePrev: document.getElementById("date-prev"),
  dateNext: document.getElementById("date-next"),
  historyRange: document.getElementById("history-range"),
  log: document.getElementById("log"),
  goalForm: document.getElementById("goal-form"),
  weightForm: document.getElementById("weight-form"),
  weightHistory: document.getElementById("weight-history"),
  weightLastCheckin: document.getElementById("weight-last-checkin"),
  weight7dChange: document.getElementById("weight-7d-change"),
  weight30dChange: document.getElementById("weight-30d-change"),
  weightToGoal: document.getElementById("weight-to-goal"),
  weightMilestoneBadge: document.getElementById("weight-milestone-badge"),
  resetMilestones: document.getElementById("reset-milestones"),
  weightTrend: document.getElementById("weight-trend"),
  stepsForm: document.getElementById("steps-form"),
  stepsHistory: document.getElementById("steps-history"),
  steps7dAvg: document.getElementById("steps-7d-avg"),
  stepsGoalStreak: document.getElementById("steps-goal-streak"),
  todayStepCalories: document.getElementById("today-step-calories"),
  stepsSparkline: document.getElementById("steps-sparkline"),
  stepsHeatmap: document.getElementById("steps-heatmap"),
  planStepsQuickForm: document.getElementById("plan-steps-quick-form"),
  planStepsQuickValue: document.getElementById("plan-steps-quick-value"),
  entryForm: document.getElementById("entry-form"),
  recentFoodSelect: document.getElementById("recent-food-select"),
  mealTemplateSelect: document.getElementById("meal-template-select"),
  foodSearch: document.getElementById("food-search"),
  foodSearchResults: document.getElementById("food-search-results"),
  openCustomFood: document.getElementById("open-custom-food"),
  favoriteSelectedFood: document.getElementById("favorite-selected-food"),
  editSelectedFood: document.getElementById("edit-selected-food"),
  deleteSelectedFood: document.getElementById("delete-selected-food"),
  createMealTemplate: document.getElementById("create-meal-template"),
  applyMealTemplate: document.getElementById("apply-meal-template"),
  customFoodModal: document.getElementById("custom-food-modal"),
  customFoodForm: document.getElementById("custom-food-form"),
  customFoodTitle: document.getElementById("custom-food-title"),
  customFoodSave: document.getElementById("custom-food-save"),
  closeCustomFood: document.getElementById("close-custom-food"),
  mealTemplateModal: document.getElementById("meal-template-modal"),
  weightMilestoneModal: document.getElementById("weight-milestone-modal"),
  milestoneIcon: document.getElementById("milestone-icon"),
  milestoneTitle: document.getElementById("milestone-title"),
  milestoneMessage: document.getElementById("milestone-message"),
  milestoneEquivalent: document.getElementById("milestone-equivalent"),
  mealTemplateForm: document.getElementById("meal-template-form"),
  closeMealTemplate: document.getElementById("close-meal-template"),
  mealTemplateName: document.getElementById("meal-template-name"),
  mealTemplateFoodIds: document.getElementById("meal-template-food-ids"),
  macroProteinTotal: document.getElementById("macro-protein-total"),
  macroCarbsTotal: document.getElementById("macro-carbs-total"),
  macroFatTotal: document.getElementById("macro-fat-total"),
  resetDay: document.getElementById("reset-day"),
  quickAdds: document.getElementById("quick-adds"),
  filters: Array.from(document.querySelectorAll(".filter")),
  modal: document.getElementById("edit-modal"),
  editForm: document.getElementById("edit-form"),
  editFood: document.getElementById("edit-food"),
  editMeal: document.getElementById("edit-meal"),
  editCalories: document.getElementById("edit-calories"),
  editProteinG: document.getElementById("edit-protein-g"),
  editCarbsG: document.getElementById("edit-carbs-g"),
  editFatG: document.getElementById("edit-fat-g"),
  editTime: document.getElementById("edit-time"),
  editNotes: document.getElementById("edit-notes"),
  closeModal: document.getElementById("close-modal"),
  deleteEntry: document.getElementById("delete-entry"),
};

let state = loadState();
let selectedDateKey = todayKey();
let activeFilter = "All";
let editingId = null;
let editingDateKey = null;
let editingFoodId = null;
let editingCatalogFoodId = null;

function todayKey() {
  return toDateKeyInAppTimeZone(new Date());
}

function toDateKeyInAppTimeZone(date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: APP_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  return `${year}-${month}-${day}`;
}

function dateKeyToStableDate(dateKey) {
  const [year, month, day] = String(dateKey)
    .split("-")
    .map((value) => Number(value));
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

function appNowParts() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: APP_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  return {
    year: safeNumber(parts.find((part) => part.type === "year")?.value),
    month: safeNumber(parts.find((part) => part.type === "month")?.value),
    day: safeNumber(parts.find((part) => part.type === "day")?.value),
  };
}

function calculateAgeFromBirth(birthYear, birthMonth) {
  const year = safeNumber(birthYear);
  const month = safeNumber(birthMonth);
  if (!year || !month || month < 1 || month > 12) return null;
  const now = appNowParts();
  if (!now.year || !now.month) return null;
  let age = now.year - year;
  if (now.month < month) age -= 1;
  return age >= 0 ? age : null;
}

function nowIso() {
  return new Date().toISOString();
}

function safeNumber(value, fallback = null) {
  if (value === "" || value === null || value === undefined) return fallback;
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function lbsToKg(lbs) {
  return lbs * 0.45359237;
}

function kgToLbs(kg) {
  return kg * 2.2046226218;
}

function feetInchesToCm(feet, inches) {
  return (feet * 12 + inches) * 2.54;
}

function cmToFeetInches(cm) {
  if (!Number.isFinite(cm)) return { feet: 5, inches: 6 };
  const totalInches = cm / 2.54;
  let feet = Math.floor(totalInches / 12);
  let inches = Math.round(totalInches - feet * 12);
  if (inches === 12) {
    feet += 1;
    inches = 0;
  }
  return { feet, inches };
}

function mapLegacyActivityToStepGoal(activityLevel) {
  const map = {
    sedentary: 4500,
    light: 7000,
    moderate: 9000,
    very: 12000,
    extra: 15000,
  };
  return map[activityLevel] || 8000;
}

function formatCalories(value) {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat().format(Math.round(value));
}

function formatWeightLbs(value) {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(1)} lbs`;
}

function formatDateLabel(dateKey) {
  const date = dateKeyToStableDate(dateKey);
  return new Intl.DateTimeFormat(undefined, {
    timeZone: APP_TIME_ZONE,
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function shiftDate(dateKey, days) {
  const date = dateKeyToStableDate(dateKey);
  date.setDate(date.getDate() + days);
  return toDateKeyInAppTimeZone(date);
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createDefaultPlan(name = "Default Plan") {
  return {
    id: crypto.randomUUID(),
    name,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    goalPlan: {
      goalType: "lose",
      targetWeightLbs: null,
      weeklyRateLbs: 1,
      dailyStepGoal: 8000,
      startDate: todayKey(),
      targetDateEstimate: null,
    },
    metabolicPlan: {
      bmr: null,
      tdee: null,
      recommendedCalories: DEFAULT_CALORIES,
      manualOverrideCalories: null,
      manualOverrideEnabled: false,
      safetyFloor: 1200,
      dailyDeltaCalories: 0,
      lastCalculatedAt: null,
    },
  };
}

function createDefaultProfile(name = "My Profile") {
  const plan = createDefaultPlan();
  return {
    id: crypto.randomUUID(),
    name,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    activePlanId: plan.id,
    plans: { [plan.id]: plan },
    userProfile: {
      sex: "female",
      age: null,
      birthYear: null,
      birthMonth: null,
      heightFt: 5,
      heightIn: 6,
      currentWeightLbs: null,
      dailyStepGoal: 8000,
      unitPrefs: { weight: "lbs", height: "ft-in" },
    },
    foodLogs: {},
    weights: [],
    stepsByDay: {},
    foodCatalog: {},
    recentFoodIds: [],
    favoriteFoodIds: [],
    mealTemplates: {},
    calorieHistory: [],
    historyIndex: {},
    weightLossMilestonesSeen: [],
  };
}

function defaultState() {
  const profile = createDefaultProfile();
  return {
    meta: {
      schemaVersion: SCHEMA_VERSION,
      createdAt: nowIso(),
      updatedAt: nowIso(),
      migrations: [],
    },
    activeProfileId: profile.id,
    profiles: { [profile.id]: profile },
  };
}

function mapLegacyEntry(entry, dateKey) {
  const timestamp = `${dateKey}T12:00:00.000Z`;
  return {
    id: entry.id || crypto.randomUUID(),
    food: String(entry.food || "Entry"),
    meal: String(entry.meal || "Snack"),
    calories: Math.max(0, safeNumber(entry.calories, 0)),
    proteinG: Math.max(0, safeNumber(entry.proteinG, 0)),
    carbsG: Math.max(0, safeNumber(entry.carbsG, 0)),
    fatG: Math.max(0, safeNumber(entry.fatG, 0)),
    servings: Math.max(0.1, safeNumber(entry.servings, 1)),
    time: String(entry.time || ""),
    notes: String(entry.notes || ""),
    foodId: entry.foodId || null,
    foodSnapshot: entry.foodSnapshot || null,
    dateKey,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

function ensureFoodCatalogFromLogs(profile) {
  const catalog = { ...(profile.foodCatalog || {}) };
  const nameToFoodId = {};
  Object.values(catalog).forEach((food) => {
    const key = String(food.name || "").trim().toLowerCase();
    if (key) nameToFoodId[key] = food.id;
  });

  const recentMap = {};
  Object.entries(profile.foodLogs || {}).forEach(([, entries]) => {
    entries.forEach((entry) => {
      entry.calories = Math.max(0, safeNumber(entry.calories, 0));
      entry.proteinG = Math.max(0, safeNumber(entry.proteinG, 0));
      entry.carbsG = Math.max(0, safeNumber(entry.carbsG, 0));
      entry.fatG = Math.max(0, safeNumber(entry.fatG, 0));
      entry.servings = Math.max(0.1, safeNumber(entry.servings, 1));

      if (!entry.foodId) {
        const key = String(entry.food || "Custom food").trim().toLowerCase();
        if (!nameToFoodId[key]) {
          const foodId = crypto.randomUUID();
          nameToFoodId[key] = foodId;
          catalog[foodId] = {
            id: foodId,
            name: entry.food || "Custom food",
            brand: "",
            servingSize: "1 serving",
            calories: entry.servings ? entry.calories / entry.servings : entry.calories,
            proteinG: entry.servings ? entry.proteinG / entry.servings : entry.proteinG,
            carbsG: entry.servings ? entry.carbsG / entry.servings : entry.carbsG,
            fatG: entry.servings ? entry.fatG / entry.servings : entry.fatG,
            barcode: "",
            source: "history",
            usageCount: 0,
            lastUsedAt: entry.updatedAt || nowIso(),
            createdAt: nowIso(),
            updatedAt: nowIso(),
          };
        }
        entry.foodId = nameToFoodId[key];
      }

      const food = catalog[entry.foodId];
      if (food) {
        food.usageCount = Math.max(0, safeNumber(food.usageCount, 0)) + 1;
        food.lastUsedAt = entry.updatedAt || nowIso();
        entry.foodSnapshot = entry.foodSnapshot || {
          name: food.name,
          brand: food.brand || "",
          servingSize: food.servingSize || "1 serving",
        };
        recentMap[entry.foodId] = food.lastUsedAt;
      }
    });
  });

  profile.foodCatalog = catalog;
  profile.recentFoodIds = Object.entries(recentMap)
    .sort((a, b) => (a[1] < b[1] ? 1 : -1))
    .map(([foodId]) => foodId)
    .slice(0, 40);
  profile.favoriteFoodIds = Array.isArray(profile.favoriteFoodIds) ? profile.favoriteFoodIds : [];
  profile.mealTemplates = profile.mealTemplates || {};
}

function rebuildHistoryIndex(profile) {
  const index = {};
  Object.entries(profile.foodLogs || {}).forEach(([dateKey, entries]) => {
    const totalCalories = entries.reduce((sum, entry) => sum + (safeNumber(entry.calories, 0) || 0), 0);
    index[dateKey] = { totalCalories, entryCount: entries.length, updatedAt: nowIso() };
  });
  profile.historyIndex = index;
}

function migrateV1ToV4(v1) {
  const base = defaultState();
  const profile = createDefaultProfile("My Profile");
  const logs = {};
  Object.entries(v1.days || {}).forEach(([dateKey, entries]) => {
    if (!Array.isArray(entries)) return;
    logs[dateKey] = entries.map((entry) => mapLegacyEntry(entry, dateKey));
  });
  profile.foodLogs = logs;
  profile.plans[profile.activePlanId].metabolicPlan.manualOverrideCalories = safeNumber(v1.goal, DEFAULT_CALORIES);
  profile.plans[profile.activePlanId].metabolicPlan.manualOverrideEnabled = false;
  profile.plans[profile.activePlanId].metabolicPlan.recommendedCalories = safeNumber(v1.goal, DEFAULT_CALORIES);
  rebuildHistoryIndex(profile);
  base.profiles = { [profile.id]: profile };
  base.activeProfileId = profile.id;
  base.meta.migrations.push({ from: 1, to: 4, migratedAt: nowIso(), note: "v1 to v4" });
  return base;
}

function migrateV2ToV4(v2) {
  const base = defaultState();
  const profile = createDefaultProfile("My Profile");
  const plan = profile.plans[profile.activePlanId];
  const imperialHeight = cmToFeetInches(safeNumber(v2.userProfile?.heightCm));
  const legacyAge = safeNumber(v2.userProfile?.age);
  const now = appNowParts();
  profile.userProfile = {
    ...profile.userProfile,
    sex: v2.userProfile?.sex || "female",
    age: legacyAge,
    birthYear: Number.isFinite(legacyAge) && Number.isFinite(now.year) ? now.year - legacyAge : null,
    birthMonth: Number.isFinite(now.month) ? now.month : null,
    heightFt: imperialHeight.feet,
    heightIn: imperialHeight.inches,
    currentWeightLbs: Number.isFinite(safeNumber(v2.userProfile?.currentWeightKg))
      ? Number(kgToLbs(v2.userProfile.currentWeightKg).toFixed(1))
      : null,
    dailyStepGoal: mapLegacyActivityToStepGoal(v2.userProfile?.activityLevel),
  };
  plan.goalPlan = {
    ...plan.goalPlan,
    goalType: v2.goalPlan?.goalType || "lose",
    targetWeightLbs: Number.isFinite(safeNumber(v2.goalPlan?.targetWeightKg))
      ? Number(kgToLbs(v2.goalPlan.targetWeightKg).toFixed(1))
      : null,
    weeklyRateLbs: Number.isFinite(safeNumber(v2.goalPlan?.weeklyRateKg))
      ? Number(kgToLbs(v2.goalPlan.weeklyRateKg).toFixed(1))
      : 1,
    dailyStepGoal: mapLegacyActivityToStepGoal(v2.userProfile?.activityLevel),
    startDate: v2.goalPlan?.startDate || todayKey(),
    targetDateEstimate: v2.goalPlan?.targetDateEstimate || null,
  };
  plan.metabolicPlan = { ...plan.metabolicPlan, ...(v2.metabolicPlan || {}) };
  profile.foodLogs = v2.foodLogs || {};
  profile.weights = Array.isArray(v2.weights)
    ? v2.weights.map((weight) => ({
        ...weight,
        weightLbs: Number.isFinite(safeNumber(weight.weightKg))
          ? Number(kgToLbs(weight.weightKg).toFixed(1))
          : safeNumber(weight.weightLbs),
      }))
    : [];
  profile.stepsByDay = {};
  profile.calorieHistory = Array.isArray(v2.calorieHistory) ? v2.calorieHistory : [];
  rebuildHistoryIndex(profile);
  base.profiles = { [profile.id]: profile };
  base.activeProfileId = profile.id;
  base.meta.migrations.push({ from: 2, to: 4, migratedAt: nowIso(), note: "v2 to v4" });
  return base;
}

function migrateV3ToV4(v3) {
  const base = defaultState();
  const profiles = {};
  Object.values(v3.profiles || {}).forEach((oldProfile) => {
    const profile = createDefaultProfile(oldProfile.name || "Profile");
    profile.id = oldProfile.id || crypto.randomUUID();
    profile.userProfile = { ...profile.userProfile, ...(oldProfile.userProfile || {}) };
    profile.foodLogs = oldProfile.foodLogs || {};
    profile.weights = oldProfile.weights || [];
    profile.stepsByDay = oldProfile.stepsByDay || {};
    profile.calorieHistory = oldProfile.calorieHistory || [];
    rebuildHistoryIndex(profile);
    const migratedPlan = createDefaultPlan("Default Plan");
    migratedPlan.goalPlan = { ...migratedPlan.goalPlan, ...(oldProfile.goalPlan || {}) };
    migratedPlan.metabolicPlan = { ...migratedPlan.metabolicPlan, ...(oldProfile.metabolicPlan || {}) };
    profile.plans = { [migratedPlan.id]: migratedPlan };
    profile.activePlanId = migratedPlan.id;
    profiles[profile.id] = profile;
  });
  if (!Object.keys(profiles).length) {
    const fallback = createDefaultProfile();
    profiles[fallback.id] = fallback;
  }
  base.profiles = profiles;
  base.activeProfileId = profiles[v3.activeProfileId] ? v3.activeProfileId : Object.keys(profiles)[0];
  base.meta.migrations.push({ from: 3, to: 4, migratedAt: nowIso(), note: "v3 to v4 plan split" });
  return base;
}

function normalizePlan(plan) {
  const defaults = createDefaultPlan(plan?.name || "Plan");
  return {
    ...defaults,
    ...plan,
    goalPlan: { ...defaults.goalPlan, ...(plan?.goalPlan || {}) },
    metabolicPlan: {
      ...defaults.metabolicPlan,
      ...(plan?.metabolicPlan || {}),
      manualOverrideEnabled: Boolean(plan?.metabolicPlan?.manualOverrideEnabled),
    },
  };
}

function normalizeProfile(profile) {
  const defaults = createDefaultProfile(profile?.name || "Profile");
  const plans = {};
  Object.values(profile?.plans || {}).forEach((plan) => {
    const normalizedPlan = normalizePlan(plan);
    plans[normalizedPlan.id] = normalizedPlan;
  });
  if (!Object.keys(plans).length) {
    const defaultPlan = createDefaultPlan();
    plans[defaultPlan.id] = defaultPlan;
  }
  const normalized = {
    ...defaults,
    ...profile,
    plans,
    activePlanId: plans[profile?.activePlanId] ? profile.activePlanId : Object.keys(plans)[0],
    userProfile: { ...defaults.userProfile, ...(profile?.userProfile || {}) },
    foodLogs: profile?.foodLogs || {},
    weights: Array.isArray(profile?.weights) ? profile.weights : [],
    stepsByDay: profile?.stepsByDay || {},
    foodCatalog: profile?.foodCatalog || {},
    recentFoodIds: Array.isArray(profile?.recentFoodIds) ? profile.recentFoodIds : [],
    favoriteFoodIds: Array.isArray(profile?.favoriteFoodIds) ? profile.favoriteFoodIds : [],
    mealTemplates: profile?.mealTemplates || {},
    calorieHistory: Array.isArray(profile?.calorieHistory) ? profile.calorieHistory : [],
    historyIndex: profile?.historyIndex || {},
    weightLossMilestonesSeen: Array.isArray(profile?.weightLossMilestonesSeen) ? profile.weightLossMilestonesSeen : [],
  };
  const now = appNowParts();
  const legacyAge = safeNumber(normalized.userProfile.age);
  const normalizedBirthYear = safeNumber(normalized.userProfile.birthYear);
  const normalizedBirthMonth = safeNumber(normalized.userProfile.birthMonth);
  if (!Number.isFinite(normalizedBirthYear) && Number.isFinite(legacyAge) && Number.isFinite(now.year)) {
    normalized.userProfile.birthYear = now.year - legacyAge;
  }
  if (!Number.isFinite(normalizedBirthMonth) && Number.isFinite(now.month)) {
    normalized.userProfile.birthMonth = now.month;
  }
  normalized.userProfile.age = calculateAgeFromBirth(
    normalized.userProfile.birthYear,
    normalized.userProfile.birthMonth
  );
  ensureFoodCatalogFromLogs(normalized);
  rebuildHistoryIndex(normalized);
  return normalized;
}

function normalizeState(parsed) {
  const defaults = defaultState();
  const profiles = {};
  Object.values(parsed.profiles || {}).forEach((profile) => {
    const normalizedProfile = normalizeProfile(profile);
    profiles[normalizedProfile.id] = normalizedProfile;
  });
  if (!Object.keys(profiles).length) {
    const fallback = createDefaultProfile();
    profiles[fallback.id] = fallback;
  }
  return {
    ...defaults,
    ...parsed,
    meta: { ...defaults.meta, ...(parsed.meta || {}), schemaVersion: SCHEMA_VERSION },
    activeProfileId: profiles[parsed.activeProfileId] ? parsed.activeProfileId : Object.keys(profiles)[0],
    profiles,
  };
}

function loadState() {
  const v5 = localStorage.getItem(STORAGE_KEY_V5);
  if (v5) {
    try {
      return normalizeState(JSON.parse(v5));
    } catch (error) {
      return defaultState();
    }
  }

  const v4 = localStorage.getItem(STORAGE_KEY_V4);
  if (v4) {
    try {
      const migrated = normalizeState(JSON.parse(v4));
      migrated.meta.migrations = [...(migrated.meta.migrations || []), { from: 4, to: 5, migratedAt: nowIso(), note: "v4 to v5 food catalog and macros" }];
      persistState(migrated);
      return migrated;
    } catch (error) {
      return defaultState();
    }
  }
  const v3 = localStorage.getItem(STORAGE_KEY_V3);
  if (v3) {
    try {
      const migrated = migrateV3ToV4(JSON.parse(v3));
      persistState(migrated);
      return migrated;
    } catch (error) {
      return defaultState();
    }
  }
  const v2 = localStorage.getItem(STORAGE_KEY_V2);
  if (v2) {
    try {
      const migrated = migrateV2ToV4(JSON.parse(v2));
      persistState(migrated);
      return migrated;
    } catch (error) {
      return defaultState();
    }
  }
  const v1 = localStorage.getItem(STORAGE_KEY_V1);
  if (v1) {
    try {
      const migrated = migrateV1ToV4(JSON.parse(v1));
      persistState(migrated);
      return migrated;
    } catch (error) {
      return defaultState();
    }
  }
  return defaultState();
}

function persistState(nextState) {
  nextState.meta.updatedAt = nowIso();
  localStorage.setItem(STORAGE_KEY_V5, JSON.stringify(nextState));
}

function getActiveProfile() {
  return state.profiles[state.activeProfileId];
}

function getActivePlan() {
  const profile = getActiveProfile();
  return profile.plans[profile.activePlanId];
}

function setActiveProfile(profileId) {
  if (!state.profiles[profileId]) return;
  state.activeProfileId = profileId;
  persistState(state);
  renderSetupFlow();
}

function setActivePlan(planId) {
  const profile = getActiveProfile();
  if (!profile.plans[planId]) return;
  profile.activePlanId = planId;
  profile.updatedAt = nowIso();
  persistState(state);
  renderSetupFlow();
}

function createProfile(name) {
  const profile = createDefaultProfile(name);
  state.profiles[profile.id] = profile;
  state.activeProfileId = profile.id;
  persistState(state);
  return profile;
}

function deleteActiveProfile(profileId = state.activeProfileId) {
  const profileIds = Object.keys(state.profiles);
  const targetId = state.profiles[profileId] ? profileId : state.activeProfileId;
  const active = state.profiles[targetId];
  if (!active) return;
  const isLastProfile = profileIds.length <= 1;
  const prompt = isLastProfile
    ? `Are you sure you want to delete profile "${active.name}"?\n\nThis action cannot be undone. A fresh default profile will be created automatically.`
    : `Are you sure you want to delete profile "${active.name}"?\n\nThis action cannot be undone and will remove all plans and history for this profile.`;
  if (!confirm(prompt)) return;

  delete state.profiles[targetId];
  const remaining = Object.keys(state.profiles);
  if (!remaining.length) {
    const fallback = createDefaultProfile("My Profile");
    state.profiles[fallback.id] = fallback;
    state.activeProfileId = fallback.id;
  } else {
    state.activeProfileId = remaining.includes(state.activeProfileId) ? state.activeProfileId : remaining[0];
  }
  persistState(state);
}

function createPlan(name) {
  const profile = getActiveProfile();
  const plan = createDefaultPlan(name);
  profile.plans[plan.id] = plan;
  profile.activePlanId = plan.id;
  profile.updatedAt = nowIso();
  persistState(state);
  return plan;
}

function deleteActivePlan(planId = getActiveProfile().activePlanId) {
  const profile = getActiveProfile();
  const targetId = profile.plans[planId] ? planId : profile.activePlanId;
  const targetPlan = profile.plans[targetId];
  if (!targetPlan) return;

  const planIds = Object.keys(profile.plans || {});
  const isLastPlan = planIds.length <= 1;
  const prompt = isLastPlan
    ? `Are you sure you want to delete plan "${targetPlan.name}"?\n\nThis action cannot be undone. A fresh default plan will be created automatically.`
    : `Are you sure you want to delete plan "${targetPlan.name}"?\n\nThis action cannot be undone and will remove the plan settings.`;
  if (!confirm(prompt)) return;

  delete profile.plans[targetId];
  const remaining = Object.keys(profile.plans || {});
  if (!remaining.length) {
    const fallback = createDefaultPlan("Default Plan");
    profile.plans[fallback.id] = fallback;
    profile.activePlanId = fallback.id;
  } else {
    profile.activePlanId = remaining.includes(profile.activePlanId) ? profile.activePlanId : remaining[0];
  }
  profile.updatedAt = nowIso();
  persistState(state);
}

function updateRing(percent) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, percent));
  const offset = circumference - (clamped / 100) * circumference;
  elements.ringProgress.style.strokeDasharray = `${circumference}`;
  elements.ringProgress.style.strokeDashoffset = `${offset}`;
  elements.ringPercent.textContent = `${Math.round(clamped)}%`;
}

function updateMacroRing(proteinG, carbsG, fatG) {
  if (!elements.macroProteinRing || !elements.macroCarbsRing || !elements.macroFatRing) return;
  const totalMacroGrams = Math.max(0, proteinG + carbsG + fatG);
  const shares = {
    protein: totalMacroGrams > 0 ? proteinG / totalMacroGrams : 0,
    carbs: totalMacroGrams > 0 ? carbsG / totalMacroGrams : 0,
    fat: totalMacroGrams > 0 ? fatG / totalMacroGrams : 0,
  };

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  let start = 0;
  const applySegment = (el, share) => {
    const dash = circumference * share;
    const gap = circumference - dash;
    const offset = circumference * (1 - start);
    el.style.strokeDasharray = `${dash} ${gap}`;
    el.style.strokeDashoffset = `${offset}`;
    start += share;
  };

  elements.macroProteinRing.style.stroke = MACRO_COLORS.protein;
  elements.macroCarbsRing.style.stroke = MACRO_COLORS.carbs;
  elements.macroFatRing.style.stroke = MACRO_COLORS.fat;
  applySegment(elements.macroProteinRing, shares.protein);
  applySegment(elements.macroCarbsRing, shares.carbs);
  applySegment(elements.macroFatRing, shares.fat);
}

function getSafetyFloor(sex) {
  return 1500;
}

function calculateBmr(profile) {
  const age = safeNumber(profile.age, calculateAgeFromBirth(profile.birthYear, profile.birthMonth));
  const ft = safeNumber(profile.heightFt);
  const inch = safeNumber(profile.heightIn);
  const lbs = safeNumber(profile.currentWeightLbs);
  if (!age || ft === null || inch === null || !lbs) return null;
  const cm = feetInchesToCm(ft, inch);
  const kg = lbsToKg(lbs);
  const base = 10 * kg + 6.25 * cm - 5 * age;
  return profile.sex === "male" ? base + 5 : base - 161;
}

function calculateBaselineTdee(bmr) {
  if (!Number.isFinite(bmr)) return null;
  return bmr * SEDENTARY_MULTIPLIER;
}

function estimateStepCalories(userProfile, steps) {
  const weightLbs = safeNumber(userProfile.currentWeightLbs);
  const heightFt = safeNumber(userProfile.heightFt);
  const heightIn = safeNumber(userProfile.heightIn);
  const totalSteps = Math.max(0, safeNumber(steps, 0));
  if (!weightLbs || heightFt === null || heightIn === null || !totalSteps) return 0;

  const totalInches = heightFt * 12 + heightIn;
  const strideFactor = userProfile.sex === "male" ? 0.415 : 0.413;
  const strideInches = totalInches * strideFactor;
  const miles = (totalSteps * strideInches) / (12 * 5280);
  return miles * weightLbs * CALORIES_PER_MILE_PER_LB;
}

function getWeightForDate(profile, dateKey) {
  const weights = [...(profile.weights || [])].sort((a, b) => (a.date < b.date ? 1 : -1));
  const latestUpToDate = weights.find((entry) => entry.date <= dateKey);
  return safeNumber(latestUpToDate?.weightLbs, safeNumber(profile.userProfile.currentWeightLbs));
}

function dailyDeltaForGoal(goalType, weeklyRateLbs) {
  const rate = safeNumber(weeklyRateLbs, 0);
  if (rate <= 0) return 0;
  const delta = (lbsToKg(rate) * 7700) / 7;
  if (goalType === "lose") return -delta;
  if (goalType === "gain") return delta;
  return 0;
}

function calculatePlanProjection() {
  const profile = getActiveProfile();
  const plan = getActivePlan();
  const current = safeNumber(profile.userProfile.currentWeightLbs);
  const target = safeNumber(plan.goalPlan.targetWeightLbs);
  const weeklyRate = safeNumber(plan.goalPlan.weeklyRateLbs);
  const goalType = plan.goalPlan.goalType;
  if (!current || !target || !weeklyRate) return { label: "—", date: null, weeklyRate: null };
  const diff = target - current;
  if (goalType === "lose" && diff >= 0) return { label: "Target already met", date: null, weeklyRate: 0, weeks: 0 };
  if (goalType === "gain" && diff <= 0) return { label: "Target already met", date: null, weeklyRate: 0, weeks: 0 };
  if (goalType === "maintain") return { label: "No end date", date: null, weeklyRate: 0, weeks: null };
  const weeks = Math.abs(diff / weeklyRate);
  if (!Number.isFinite(weeks) || weeks <= 0) return { label: "—", date: null, weeklyRate, weeks: null };
  const finish = dateKeyToStableDate(todayKey());
  finish.setDate(finish.getDate() + Math.ceil(weeks * 7));
  return {
    label: `${weeks.toFixed(1)} weeks`,
    date: toDateKeyInAppTimeZone(finish),
    weeklyRate: Number(weeklyRate.toFixed(2)),
    weeks,
  };
}

function calculateProjection() {
  const profile = getActiveProfile();
  const plan = getActivePlan();
  const current = safeNumber(profile.userProfile.currentWeightLbs);
  const target = safeNumber(plan.goalPlan.targetWeightLbs);
  const planWeeklyRate = safeNumber(plan.goalPlan.weeklyRateLbs);
  const goalType = plan.goalPlan.goalType;
  if (!current || !target || !planWeeklyRate) {
    return { label: "—", date: null, weeklyRate: null, loggedDaysUsed: 0, weighInsUsed: 0 };
  }
  const diff = target - current;
  if (goalType === "lose" && diff >= 0) {
    return { label: "Target already met", date: null, weeklyRate: 0, loggedDaysUsed: 0, weighInsUsed: 0 };
  }
  if (goalType === "gain" && diff <= 0) {
    return { label: "Target already met", date: null, weeklyRate: 0, loggedDaysUsed: 0, weighInsUsed: 0 };
  }
  if (goalType === "maintain") return { label: "No end date", date: null, weeklyRate: 0, loggedDaysUsed: 0, weighInsUsed: 0 };

  const recentDateKeys = Object.keys(profile.foodLogs || {})
    .filter((dateKey) => dateKey >= shiftDate(todayKey(), -PROJECTION_LOG_WINDOW_DAYS))
    .filter((dateKey) => (profile.foodLogs[dateKey] || []).length > 0)
    .sort((a, b) => (a < b ? -1 : 1));

  let avgDayDiff = null;
  if (recentDateKeys.length) {
    const diffs = recentDateKeys.map((dateKey) => {
      const dayTotal = (profile.foodLogs[dateKey] || []).reduce((sum, entry) => sum + (safeNumber(entry.calories, 0) || 0), 0);
      const budget = calculateDayBudget(dateKey).actualBudget;
      return dayTotal - budget;
    });
    avgDayDiff = diffs.reduce((sum, value) => sum + value, 0) / diffs.length;
  }

  const plannedDailyDelta = dailyDeltaForGoal(goalType, planWeeklyRate);
  // avgDayDiff = intake - budget; negative means extra deficit, positive means surplus.
  // Add this directly so trend pace moves in the expected direction.
  const effectiveDailyDelta = Number.isFinite(avgDayDiff) ? plannedDailyDelta + avgDayDiff : plannedDailyDelta;
  const weeklyFromCalories =
    goalType === "lose" ? (-effectiveDailyDelta * 7) / 3500 : (effectiveDailyDelta * 7) / 3500;

  const weightsAsc = [...(profile.weights || [])].sort((a, b) => (a.date < b.date ? -1 : 1));
  const weighInsUsed = Math.min(PROJECTION_WEIGHT_LOOKBACK, weightsAsc.length);
  let weeklyFromScale = null;
  if (weightsAsc.length > 1) {
    const first = weightsAsc[Math.max(0, weightsAsc.length - PROJECTION_WEIGHT_LOOKBACK)];
    const last = weightsAsc[weightsAsc.length - 1];
    const days = Math.max(1, Math.round((dateKeyToStableDate(last.date) - dateKeyToStableDate(first.date)) / 86400000));
    if (days >= 7) {
      const startGap = Math.abs(target - first.weightLbs);
      const endGap = Math.abs(target - last.weightLbs);
      const towardTarget = startGap - endGap;
      weeklyFromScale = (towardTarget / days) * 7;
    }
  }

  let dynamicWeeklyRate = Number.isFinite(weeklyFromCalories) ? weeklyFromCalories : planWeeklyRate;
  if (Number.isFinite(weeklyFromScale)) {
    dynamicWeeklyRate = dynamicWeeklyRate * 0.7 + weeklyFromScale * 0.3;
  }
  dynamicWeeklyRate = Math.max(0, dynamicWeeklyRate);
  if (!Number.isFinite(dynamicWeeklyRate) || dynamicWeeklyRate <= 0.01) {
    return {
      label: "Off track at current trend",
      date: null,
      weeklyRate: 0,
      loggedDaysUsed: recentDateKeys.length,
      weighInsUsed,
    };
  }

  const weeks = Math.abs(diff / dynamicWeeklyRate);
  if (!Number.isFinite(weeks) || weeks <= 0) {
    return {
      label: "—",
      date: null,
      weeklyRate: dynamicWeeklyRate,
      loggedDaysUsed: recentDateKeys.length,
      weighInsUsed,
    };
  }
  const finish = dateKeyToStableDate(todayKey());
  finish.setDate(finish.getDate() + Math.ceil(weeks * 7));
  return {
    label: `${weeks.toFixed(1)} weeks`,
    date: toDateKeyInAppTimeZone(finish),
    weeklyRate: Number(dynamicWeeklyRate.toFixed(2)),
    loggedDaysUsed: recentDateKeys.length,
    weighInsUsed,
  };
}

function recalculatePlan() {
  const profile = getActiveProfile();
  const plan = getActivePlan();
  const bmr = calculateBmr(profile.userProfile);
  const baselineTdee = calculateBaselineTdee(bmr);
  const stepGoal = safeNumber(profile.userProfile.dailyStepGoal, 0);
  const expectedStepCalories = estimateStepCalories(profile.userProfile, stepGoal);
  const expectedTdee = Number.isFinite(baselineTdee) ? baselineTdee + expectedStepCalories : null;
  const floor = getSafetyFloor(profile.userProfile.sex);
  const delta = dailyDeltaForGoal(plan.goalPlan.goalType, plan.goalPlan.weeklyRateLbs);
  const recommended = Number.isFinite(expectedTdee) ? Math.round(expectedTdee + delta) : DEFAULT_CALORIES;
  const projection = calculatePlanProjection();

  plan.metabolicPlan = {
    ...plan.metabolicPlan,
    bmr: Number.isFinite(bmr) ? Math.round(bmr) : null,
    tdee: Number.isFinite(expectedTdee) ? Math.round(expectedTdee) : null,
    baselineTdee: Number.isFinite(baselineTdee) ? Math.round(baselineTdee) : null,
    expectedStepCalories: Math.round(expectedStepCalories),
    recommendedCalories: recommended,
    safetyFloor: floor,
    floorRecommended: recommended < floor,
    dailyDeltaCalories: Math.round(delta),
    lastCalculatedAt: nowIso(),
  };
  plan.goalPlan.targetDateEstimate = projection.date;
  plan.updatedAt = nowIso();
  profile.updatedAt = nowIso();
  persistState(state);
}

function getActiveTargetCalories() {
  const plan = getActivePlan();
  if (plan.metabolicPlan.manualOverrideEnabled) {
    const override = safeNumber(plan.metabolicPlan.manualOverrideCalories, null);
    if (override && override > 0) return override;
  }
  return safeNumber(plan.metabolicPlan.recommendedCalories, DEFAULT_CALORIES);
}

function getEntriesForDate(dateKey) {
  return getActiveProfile().foodLogs[dateKey] || [];
}

function getStepsForDate(dateKey) {
  return safeNumber(getActiveProfile().stepsByDay[dateKey], null);
}

function setStepsForDate(dateKey, steps) {
  const profile = getActiveProfile();
  profile.stepsByDay[dateKey] = Math.max(0, Math.round(steps));
  profile.updatedAt = nowIso();
  persistState(state);
}

function setEntriesForDate(dateKey, entries) {
  const profile = getActiveProfile();
  profile.foodLogs[dateKey] = entries;
  profile.historyIndex[dateKey] = {
    totalCalories: entries.reduce((sum, entry) => sum + entry.calories, 0),
    entryCount: entries.length,
    updatedAt: nowIso(),
  };
  profile.updatedAt = nowIso();
  persistState(state);
}

function getFoodCatalog() {
  return getActiveProfile().foodCatalog || {};
}

function upsertFood(foodInput) {
  const profile = getActiveProfile();
  const catalog = getFoodCatalog();
  const id = foodInput.id || crypto.randomUUID();
  const existing = catalog[id] || {};
  catalog[id] = {
    id,
    name: String(foodInput.name || existing.name || "Custom food"),
    brand: String(foodInput.brand || existing.brand || ""),
    servingSize: String(foodInput.servingSize || existing.servingSize || "1 serving"),
    calories: Math.max(0, safeNumber(foodInput.calories, existing.calories || 0)),
    proteinG: Math.max(0, safeNumber(foodInput.proteinG, existing.proteinG || 0)),
    carbsG: Math.max(0, safeNumber(foodInput.carbsG, existing.carbsG || 0)),
    fatG: Math.max(0, safeNumber(foodInput.fatG, existing.fatG || 0)),
    barcode: String(foodInput.barcode || existing.barcode || ""),
    source: foodInput.source || existing.source || "custom",
    usageCount: Math.max(0, safeNumber(existing.usageCount, 0)),
    lastUsedAt: existing.lastUsedAt || nowIso(),
    createdAt: existing.createdAt || nowIso(),
    updatedAt: nowIso(),
  };
  profile.foodCatalog = catalog;
  profile.updatedAt = nowIso();
  persistState(state);
  return catalog[id];
}

function recordFoodUsage(foodId) {
  const profile = getActiveProfile();
  const food = getFoodCatalog()[foodId];
  if (!food) return;
  food.usageCount = Math.max(0, safeNumber(food.usageCount, 0)) + 1;
  food.lastUsedAt = nowIso();
  food.updatedAt = nowIso();
  const recent = [foodId, ...(profile.recentFoodIds || []).filter((id) => id !== foodId)];
  profile.recentFoodIds = recent.slice(0, 40);
  profile.updatedAt = nowIso();
  persistState(state);
}

function toggleFavoriteFood(foodId) {
  if (!foodId) return;
  const profile = getActiveProfile();
  const favorites = new Set(profile.favoriteFoodIds || []);
  if (favorites.has(foodId)) {
    favorites.delete(foodId);
  } else {
    favorites.add(foodId);
  }
  profile.favoriteFoodIds = Array.from(favorites);
  profile.updatedAt = nowIso();
  persistState(state);
}

function createMealTemplate(name, items) {
  const profile = getActiveProfile();
  const templateId = crypto.randomUUID();
  profile.mealTemplates[templateId] = {
    id: templateId,
    name: name || "New template",
    items,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  profile.updatedAt = nowIso();
  persistState(state);
}

function applyMealTemplate(templateId, dateKey, meal) {
  const profile = getActiveProfile();
  const template = profile.mealTemplates[templateId];
  if (!template) return;
  template.items.forEach((item) => {
    const food = getFoodCatalog()[item.foodId];
    if (!food) return;
    const servings = Math.max(0.1, safeNumber(item.servings, 1));
    addEntry(dateKey, {
      id: crypto.randomUUID(),
      food: food.name,
      foodId: food.id,
      servings,
      meal,
      calories: Math.round(food.calories * servings),
      proteinG: Number((food.proteinG * servings).toFixed(1)),
      carbsG: Number((food.carbsG * servings).toFixed(1)),
      fatG: Number((food.fatG * servings).toFixed(1)),
      foodSnapshot: {
        name: food.name,
        brand: food.brand || "",
        servingSize: food.servingSize || "1 serving",
      },
      time: "",
      notes: `Template: ${template.name}`,
    });
    recordFoodUsage(food.id);
  });
}

function searchFoods(query) {
  const q = String(query || "").trim().toLowerCase();
  const profile = getActiveProfile();
  const favorites = new Set(profile.favoriteFoodIds || []);
  return Object.values(getFoodCatalog())
    .filter((food) => {
      if (!q) return true;
      return String(food.name).toLowerCase().includes(q) || String(food.brand).toLowerCase().includes(q);
    })
    .sort((a, b) => {
      const favDiff = Number(favorites.has(b.id)) - Number(favorites.has(a.id));
      if (favDiff) return favDiff;
      const usageDiff = (safeNumber(b.usageCount, 0) || 0) - (safeNumber(a.usageCount, 0) || 0);
      if (usageDiff) return usageDiff;
      return String(b.lastUsedAt || "").localeCompare(String(a.lastUsedAt || ""));
    })
    .slice(0, 12);
}

function findFoodByName(name) {
  const normalized = String(name || "").trim().toLowerCase();
  if (!normalized) return null;
  const foods = Object.values(getFoodCatalog());
  const rankFoods = (list) =>
    [...list].sort((a, b) => {
      const macroA = (safeNumber(a.proteinG, 0) || 0) + (safeNumber(a.carbsG, 0) || 0) + (safeNumber(a.fatG, 0) || 0);
      const macroB = (safeNumber(b.proteinG, 0) || 0) + (safeNumber(b.carbsG, 0) || 0) + (safeNumber(b.fatG, 0) || 0);
      const macroDiff = macroB - macroA;
      if (macroDiff) return macroDiff;
      const usage = (safeNumber(b.usageCount, 0) || 0) - (safeNumber(a.usageCount, 0) || 0);
      if (usage) return usage;
      const lastUsed = String(b.lastUsedAt || "").localeCompare(String(a.lastUsedAt || ""));
      if (lastUsed) return lastUsed;
      return String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""));
    });
  const exact = rankFoods(foods.filter((food) => String(food.name || "").trim().toLowerCase() === normalized));
  if (exact.length) return exact[0];
  const startsWith = rankFoods(
    foods.filter((food) => String(food.name || "").trim().toLowerCase().startsWith(normalized))
  );
  return startsWith[0] || null;
}

function bestLoggedNutritionForName(name) {
  const normalized = String(name || "").trim().toLowerCase();
  if (!normalized) return null;
  const profile = getActiveProfile();
  const candidates = [];
  Object.values(profile.foodLogs || {}).forEach((entries) => {
    (entries || []).forEach((entry) => {
      if (String(entry.food || "").trim().toLowerCase() !== normalized) return;
      const servings = Math.max(0.1, safeNumber(entry.servings, 1));
      const calories = Math.max(0, (safeNumber(entry.calories, 0) || 0) / servings);
      const proteinG = Math.max(0, (safeNumber(entry.proteinG, 0) || 0) / servings);
      const carbsG = Math.max(0, (safeNumber(entry.carbsG, 0) || 0) / servings);
      const fatG = Math.max(0, (safeNumber(entry.fatG, 0) || 0) / servings);
      candidates.push({
        calories,
        proteinG,
        carbsG,
        fatG,
        macroSum: proteinG + carbsG + fatG,
        timestamp: String(entry.updatedAt || entry.createdAt || ""),
      });
    });
  });
  if (!candidates.length) return null;
  candidates.sort((a, b) => {
    const macroDiff = b.macroSum - a.macroSum;
    if (macroDiff) return macroDiff;
    return b.timestamp.localeCompare(a.timestamp);
  });
  return candidates[0];
}

function withFallbackNutrition(food) {
  if (!food) return food;
  const macroSum = (safeNumber(food.proteinG, 0) || 0) + (safeNumber(food.carbsG, 0) || 0) + (safeNumber(food.fatG, 0) || 0);
  if (macroSum > 0) return food;
  const fallback = bestLoggedNutritionForName(food.name);
  if (!fallback || fallback.macroSum <= 0) return food;
  if (food.id) {
    upsertFood({
      ...food,
      calories: Number(fallback.calories.toFixed(1)),
      proteinG: Number(fallback.proteinG.toFixed(1)),
      carbsG: Number(fallback.carbsG.toFixed(1)),
      fatG: Number(fallback.fatG.toFixed(1)),
    });
    return getFoodCatalog()[food.id] || food;
  }
  return {
    ...food,
    calories: Number(fallback.calories.toFixed(1)),
    proteinG: Number(fallback.proteinG.toFixed(1)),
    carbsG: Number(fallback.carbsG.toFixed(1)),
    fatG: Number(fallback.fatG.toFixed(1)),
  };
}

function getCurrentlySelectedCatalogFood() {
  const selectedId = elements.entryForm.querySelector("#selected-food-id").value;
  if (selectedId) {
    const byId = getFoodCatalog()[selectedId];
    if (byId) return byId;
  }
  return findFoodByName(elements.entryForm.querySelector("#food-name").value);
}

function refreshSelectedFoodActions() {
  const food = getCurrentlySelectedCatalogFood();
  const disabled = !food;
  if (elements.favoriteSelectedFood) elements.favoriteSelectedFood.disabled = disabled;
  if (elements.editSelectedFood) elements.editSelectedFood.disabled = disabled;
  if (elements.deleteSelectedFood) elements.deleteSelectedFood.disabled = disabled;
}

function deleteFoodOption(foodId) {
  const profile = getActiveProfile();
  const food = getFoodCatalog()[foodId];
  if (!food) return;
  if (!confirm(`Delete saved food "${food.name}"? Existing logged entries will remain.`)) return;
  delete profile.foodCatalog[foodId];
  profile.recentFoodIds = (profile.recentFoodIds || []).filter((id) => id !== foodId);
  profile.favoriteFoodIds = (profile.favoriteFoodIds || []).filter((id) => id !== foodId);
  Object.values(profile.mealTemplates || {}).forEach((template) => {
    template.items = (template.items || []).filter((item) => item.foodId !== foodId);
  });
  Object.keys(profile.mealTemplates || {}).forEach((templateId) => {
    const template = profile.mealTemplates[templateId];
    if (!template.items || !template.items.length) delete profile.mealTemplates[templateId];
  });
  Object.entries(profile.foodLogs || {}).forEach(([dateKey, entries]) => {
    const patched = entries.map((entry) => (entry.foodId === foodId ? { ...entry, foodId: null } : entry));
    profile.foodLogs[dateKey] = patched;
  });
  profile.updatedAt = nowIso();
  persistState(state);
  setSelectedFood(null);
  renderApp();
}

function setSelectedFood(food) {
  const resolvedFood = withFallbackNutrition(food);
  elements.entryForm.querySelector("#selected-food-id").value = resolvedFood?.id || "";
  const favorites = new Set(getActiveProfile().favoriteFoodIds || []);
  elements.favoriteSelectedFood.textContent = resolvedFood?.id && favorites.has(resolvedFood.id)
    ? "Unfavorite selected food"
    : "Favorite selected food";
  if (!resolvedFood) {
    refreshSelectedFoodActions();
    return;
  }
  const servings = Math.max(0.1, safeNumber(elements.entryForm.querySelector("#servings").value, 1));
  elements.entryForm.querySelector("#food-name").value = resolvedFood.name;
  elements.entryForm.querySelector("#calories").value = Math.round(resolvedFood.calories * servings);
  elements.entryForm.querySelector("#protein-g").value = Number((resolvedFood.proteinG * servings).toFixed(1));
  elements.entryForm.querySelector("#carbs-g").value = Number((resolvedFood.carbsG * servings).toFixed(1));
  elements.entryForm.querySelector("#fat-g").value = Number((resolvedFood.fatG * servings).toFixed(1));
  refreshSelectedFoodActions();
}

function renderFoodPicker() {
  const profile = getActiveProfile();
  const recent = (profile.recentFoodIds || [])
    .map((id) => getFoodCatalog()[id])
    .filter(Boolean)
    .slice(0, 15);
  elements.recentFoodSelect.innerHTML =
    '<option value="">Select recent food</option>' +
    recent.map((food) => `<option value="${food.id}">${escapeHtml(food.name)}</option>`).join("");

  const templates = Object.values(profile.mealTemplates || {}).sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  elements.mealTemplateSelect.innerHTML =
    '<option value="">Select template</option>' +
    templates.map((template) => `<option value="${template.id}">${escapeHtml(template.name)}</option>`).join("");

  const query = elements.foodSearch.value || "";
  const results = searchFoods(query);
  const favorites = new Set(profile.favoriteFoodIds || []);
  elements.foodSearchResults.innerHTML = results.length
    ? results
        .map(
          (food) =>
            `<div class="history-row food-result" data-food-id="${food.id}">
              <strong>${escapeHtml(food.name)}</strong>
              <span>
                ${formatCalories(food.calories)} cal · P${food.proteinG} C${food.carbsG} F${food.fatG}
                <span class="food-meta-chips">${favorites.has(food.id) ? '<span class="chip favorite">Favorite</span>' : ""}</span>
              </span>
            </div>`
        )
        .join("")
    : '<div class="history-row"><strong>No foods found.</strong><span>Create one below.</span></div>';

  const selectedFoodId = elements.entryForm.querySelector("#selected-food-id").value;
  elements.favoriteSelectedFood.textContent =
    selectedFoodId && favorites.has(selectedFoodId) ? "Unfavorite selected food" : "Favorite selected food";
  refreshSelectedFoodActions();
}

function getTemplateCandidateItems() {
  const selectedMeal = elements.entryForm.querySelector("#meal").value;
  const entries = getEntriesForDate(selectedDateKey).filter((entry) => entry.meal === selectedMeal && entry.foodId);
  const merged = {};
  entries.forEach((entry) => {
    if (!merged[entry.foodId]) merged[entry.foodId] = 0;
    merged[entry.foodId] += Math.max(0.1, safeNumber(entry.servings, 1));
  });
  return Object.entries(merged).map(([foodId, servings]) => ({ foodId, servings: Number(servings.toFixed(2)) }));
}

function addEntry(dateKey, entry) {
  const entries = [...getEntriesForDate(dateKey)];
  entries.unshift({ ...entry, dateKey, createdAt: nowIso(), updatedAt: nowIso() });
  setEntriesForDate(dateKey, entries);
}

function updateEntry(dateKey, id, updates) {
  const entries = [...getEntriesForDate(dateKey)];
  const idx = entries.findIndex((entry) => entry.id === id);
  if (idx < 0) return;
  entries[idx] = { ...entries[idx], ...updates, updatedAt: nowIso() };
  setEntriesForDate(dateKey, entries);
}

function deleteEntry(dateKey, id) {
  setEntriesForDate(
    dateKey,
    getEntriesForDate(dateKey).filter((entry) => entry.id !== id)
  );
}

function getTopMeal(entries) {
  if (!entries.length) return "—";
  const totals = entries.reduce((acc, entry) => {
    acc[entry.meal] = (acc[entry.meal] || 0) + entry.calories;
    return acc;
  }, {});
  return Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
}

function calculateWeightChangeFromLatest(weightsAsc, days) {
  if (!Array.isArray(weightsAsc) || weightsAsc.length < 2) return null;
  const latest = weightsAsc[weightsAsc.length - 1];
  const cutoff = shiftDate(latest.date, -days);
  const baseline = [...weightsAsc].reverse().find((entry) => entry.date <= cutoff);
  if (!baseline) return null;
  return Number((latest.weightLbs - baseline.weightLbs).toFixed(1));
}

function renderStepsSparkline(values, stepGoal) {
  if (!elements.stepsSparkline) return;
  if (!Array.isArray(values) || !values.length) {
    elements.stepsSparkline.innerHTML = "";
    return;
  }
  const width = 320;
  const height = 72;
  const padX = 6;
  const padY = 8;
  const goal = Math.max(1, safeNumber(stepGoal, 1));
  const maxValue = Math.max(goal, ...values, 1);
  const x = (idx) => padX + (idx / Math.max(1, values.length - 1)) * (width - padX * 2);
  const y = (value) => padY + (1 - value / maxValue) * (height - padY * 2);
  const d = values
    .map((value, idx) => `${idx === 0 ? "M" : "L"} ${x(idx).toFixed(2)} ${y(value).toFixed(2)}`)
    .join(" ");
  const goalY = y(goal).toFixed(2);
  elements.stepsSparkline.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="7-day steps trend">
    <line x1="${padX}" y1="${goalY}" x2="${width - padX}" y2="${goalY}" stroke="rgba(51,94,75,0.45)" stroke-dasharray="4 4" />
    <path d="${d}" fill="none" stroke="#335e4b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>`;
}

function renderStepsHeatmap(stepsByDay, stepGoal) {
  if (!elements.stepsHeatmap) return;
  const todayDateKey = todayKey();
  const values = Array.from({ length: 35 }).map((_, idx) => {
    const dateKey = shiftDate(todayDateKey, idx - 34);
    return { dateKey, steps: safeNumber(stepsByDay[dateKey], 0) };
  });
  const max = Math.max(stepGoal || 1, ...values.map((item) => item.steps), 1);
  const colorFor = (steps) => {
    const ratio = Math.max(0, Math.min(1, steps / max));
    const alpha = 0.15 + ratio * 0.75;
    return `rgba(51,94,75,${alpha.toFixed(3)})`;
  };
  const hitCount = values.filter((item) => item.steps >= stepGoal).length;
  elements.stepsHeatmap.innerHTML = `<div class="steps-heatmap-grid">
      ${values
        .map(
          (item) =>
            `<div class="steps-heatmap-cell" style="background:${colorFor(item.steps)}" title="${formatDateLabel(
              item.dateKey
            )}: ${formatCalories(item.steps)} steps"></div>`
        )
        .join("")}
    </div>
    <div class="steps-heatmap-meta">Goal hit days (last 35): ${hitCount}/35</div>`;
}

function renderMilestoneClipArt(emoji) {
  const symbol = String(emoji || "").trim() || "🎉";
  return `<div class="milestone-emoji" role="img" aria-label="Milestone emoji">${symbol}</div>`;
}

function renderWeightMilestoneBadge(profile) {
  if (!elements.weightMilestoneBadge) return;
  const seen = Array.isArray(profile?.weightLossMilestonesSeen) ? profile.weightLossMilestonesSeen : [];
  if (!seen.length) {
    elements.weightMilestoneBadge.innerHTML = "";
    if (elements.resetMilestones) elements.resetMilestones.classList.add("hidden");
    return;
  }
  if (elements.resetMilestones) elements.resetMilestones.classList.remove("hidden");
  const highestSeen = [...seen].sort((a, b) => b - a)[0];
  const milestone = WEIGHT_LOSS_MILESTONES.find((item) => item.lbs === highestSeen);
  if (!milestone) {
    elements.weightMilestoneBadge.innerHTML = "";
    if (elements.resetMilestones) elements.resetMilestones.classList.add("hidden");
    return;
  }
  elements.weightMilestoneBadge.innerHTML = `
    <div class="weight-milestone-art">${renderMilestoneClipArt(milestone.emoji)}</div>
    <div class="weight-milestone-copy">
      <div class="weight-milestone-label">Latest milestone unlocked</div>
      <div class="weight-milestone-title">${milestone.lbs} lbs lost</div>
      <div class="weight-milestone-meta">Equivalent to ${milestone.object}.</div>
    </div>`;
}

function checkWeightLossMilestones(profile, plan, weightsAsc) {
  if (plan.goalPlan.goalType !== "lose") return;
  if (!weightsAsc?.length) return;
  const peakWeight = Math.max(...weightsAsc.map((w) => safeNumber(w.weightLbs)));
  const latest = weightsAsc[weightsAsc.length - 1];
  const currentWeight = safeNumber(latest.weightLbs);
  const weightLost = peakWeight - currentWeight;
  if (weightLost < 2) return;

  const seen = new Set(profile.weightLossMilestonesSeen || []);
  const newlyCrossed = WEIGHT_LOSS_MILESTONES.filter(
    (m) => weightLost >= m.lbs && !seen.has(m.lbs)
  );
  if (!newlyCrossed.length) return;

  const milestone = newlyCrossed.sort((a, b) => b.lbs - a.lbs)[0];
  newlyCrossed.forEach((m) => seen.add(m.lbs));
  profile.weightLossMilestonesSeen = [...seen];
  profile.updatedAt = nowIso();
  persistState(state);

  if (elements.weightMilestoneModal && elements.milestoneIcon) {
    elements.milestoneIcon.innerHTML = renderMilestoneClipArt(milestone.emoji);
    elements.milestoneTitle.textContent = `Congrats on losing ${milestone.lbs} pounds!`;
    elements.milestoneMessage.textContent = `That's amazing progress. Keep it up!`;
    elements.milestoneEquivalent.textContent = `That's the equivalent of ${milestone.object}.`;
    elements.weightMilestoneModal.showModal();
  }
}

function renderWeightTrend(weightsDesc, targetWeightLbs, projection) {
  if (!elements.weightTrend) return;
  const points = [...weightsDesc].sort((a, b) => (a.date < b.date ? -1 : 1)).slice(-24);
  if (points.length < 2) {
    elements.weightTrend.innerHTML =
      '<div class="history-row"><strong>Weight trend</strong><span>Add at least 2 weigh-ins to see the graph.</span></div>';
    return;
  }

  const width = 620;
  const height = 170;
  const padLeft = 28;
  const padRight = 16;
  const padTop = 10;
  const padBottom = 24;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const includeTarget = Number.isFinite(safeNumber(targetWeightLbs));
  const target = includeTarget ? safeNumber(targetWeightLbs) : null;
  const startDateKey = points[0].date;
  const endDateKey = projection?.date && projection.date > points[points.length - 1].date ? projection.date : points[points.length - 1].date;
  const totalDays = Math.max(
    1,
    Math.round((dateKeyToStableDate(endDateKey) - dateKeyToStableDate(startDateKey)) / 86400000)
  );
  const minW = Math.min(...points.map((entry) => entry.weightLbs), ...(includeTarget ? [target] : []));
  const maxW = Math.max(...points.map((entry) => entry.weightLbs), ...(includeTarget ? [target] : []));
  const range = Math.max(0.5, maxW - minW);
  const toXByDate = (dateKey) => {
    const deltaDays = Math.round((dateKeyToStableDate(dateKey) - dateKeyToStableDate(startDateKey)) / 86400000);
    return padLeft + (deltaDays / totalDays) * plotW;
  };
  const toY = (weight) => padTop + ((maxW - weight) / range) * plotH;

  const pathD = points
    .map((entry, idx) => `${idx === 0 ? "M" : "L"} ${toXByDate(entry.date).toFixed(2)} ${toY(entry.weightLbs).toFixed(2)}`)
    .join(" ");
  const circles = points
    .map(
      (entry, idx) =>
        `<circle cx="${toXByDate(entry.date).toFixed(2)}" cy="${toY(entry.weightLbs).toFixed(2)}" r="2.8" fill="#f45b4b"><title>${formatDateLabel(
          entry.date
        )}: ${formatWeightLbs(entry.weightLbs)}</title></circle>`
    )
    .join("");

  const first = points[0];
  const last = points[points.length - 1];
  const delta = Number((last.weightLbs - first.weightLbs).toFixed(1));
  const deltaClass = delta < 0 ? "loss" : delta > 0 ? "gain" : "";
  const deltaLabel = delta === 0 ? "No change" : `${delta > 0 ? "+" : ""}${delta.toFixed(1)} lbs`;
  const targetLineY = includeTarget ? toY(target).toFixed(2) : null;
  const hasProjection = includeTarget && projection?.date && projection.date > last.date;
  const projectedLine = hasProjection
    ? `<line x1="${toXByDate(last.date).toFixed(2)}" y1="${toY(last.weightLbs).toFixed(2)}" x2="${toXByDate(
        projection.date
      ).toFixed(2)}" y2="${toY(target).toFixed(2)}" stroke="#335e4b" stroke-width="2.5" stroke-dasharray="7 5" />
      <circle cx="${toXByDate(projection.date).toFixed(2)}" cy="${toY(target).toFixed(2)}" r="3.2" fill="#335e4b"></circle>`
    : "";

  elements.weightTrend.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Weight trend line chart">
      <line x1="${padLeft}" y1="${height - padBottom}" x2="${width - padRight}" y2="${height - padBottom}" stroke="rgba(23,21,20,0.12)" />
      ${
        includeTarget
          ? `<line x1="${padLeft}" y1="${targetLineY}" x2="${width - padRight}" y2="${targetLineY}" stroke="#335e4b" stroke-width="2" stroke-dasharray="6 5" />
      <text x="${width - padRight - 2}" y="${Math.max(12, Number(targetLineY) - 6)}" text-anchor="end" font-size="11" font-family="Archivo, sans-serif" fill="#335e4b">Target ${target.toFixed(1)} lbs</text>`
          : ""
      }
      <path d="${pathD}" fill="none" stroke="#f45b4b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      ${projectedLine}
      ${circles}
    </svg>
    <div class="weight-trend-meta">
      <span>${formatDateLabel(first.date)}: ${formatWeightLbs(first.weightLbs)}</span>
      <span class="weight-trend-change ${deltaClass}">${deltaLabel}</span>
      <span>${
        hasProjection
          ? `Projected ${formatDateLabel(projection.date)}`
          : `${formatDateLabel(last.date)}: ${formatWeightLbs(last.weightLbs)}`
      }</span>
    </div>`;
}

function showApp() {
  elements.setupFlow.classList.add("hidden");
  elements.appShell.classList.remove("hidden");
  selectedDateKey = todayKey();
  elements.weightForm.querySelector("#weight-date").value = todayKey();
  elements.stepsForm.querySelector("#steps-date").value = todayKey();
  renderApp();
}

function showSetup() {
  elements.appShell.classList.add("hidden");
  elements.setupFlow.classList.remove("hidden");
  renderSetupFlow();
}

function renderSetupFlow() {
  const profiles = Object.values(state.profiles).sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
  elements.setupProfileSelect.innerHTML = profiles
    .map((profile) => `<option value="${profile.id}">${escapeHtml(profile.name)}</option>`)
    .join("");
  elements.setupProfileSelect.value = state.activeProfileId;

  const activeProfile = getActiveProfile();
  const plans = Object.values(activeProfile.plans).sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
  elements.setupPlanSelect.innerHTML = plans
    .map((plan) => `<option value="${plan.id}">${escapeHtml(plan.name)}</option>`)
    .join("");
  elements.setupPlanSelect.value = activeProfile.activePlanId;

  elements.setupProfileForm.querySelector("#setup-profile-name").value = activeProfile.name || "";
  elements.setupProfileForm.querySelector("#setup-profile-sex").value = activeProfile.userProfile.sex;
  elements.setupProfileForm.querySelector("#setup-profile-birth-year").value = activeProfile.userProfile.birthYear ?? "";
  elements.setupProfileForm.querySelector("#setup-profile-birth-month").value = String(
    activeProfile.userProfile.birthMonth ?? appNowParts().month ?? 1
  );
  elements.setupProfileForm.querySelector("#setup-profile-height-ft").value = activeProfile.userProfile.heightFt ?? "";
  elements.setupProfileForm.querySelector("#setup-profile-height-in").value = activeProfile.userProfile.heightIn ?? "";
  elements.setupProfileForm.querySelector("#setup-profile-weight").value = activeProfile.userProfile.currentWeightLbs ?? "";
  elements.setupProfileForm.querySelector("#setup-profile-step-goal").value =
    activeProfile.userProfile.dailyStepGoal ?? 8000;

  const activePlan = getActivePlan();
  elements.setupPlanForm.querySelector("#setup-goal-type").value = activePlan.goalPlan.goalType;
  elements.setupPlanForm.querySelector("#setup-target-weight").value = activePlan.goalPlan.targetWeightLbs ?? "";
  elements.setupPlanForm.querySelector("#setup-weekly-rate").value = activePlan.goalPlan.weeklyRateLbs ?? 1;
  elements.setupPlanForm.querySelector("#setup-plan-step-goal").value = activePlan.goalPlan.dailyStepGoal ?? 8000;
  elements.setupPlanForm.querySelector("#setup-goal-override").value = activePlan.metabolicPlan.manualOverrideEnabled
    ? activePlan.metabolicPlan.manualOverrideCalories ?? ""
    : "";

  elements.setupDeleteProfile.disabled = false;
  elements.setupDeleteProfile.title =
    profiles.length <= 1
      ? "Deleting the last profile will create a fresh default profile."
      : "Delete the currently selected profile.";
  elements.setupDeletePlan.disabled = false;
  elements.setupDeletePlan.title =
    plans.length <= 1
      ? "Deleting the last plan will create a fresh default plan."
      : "Delete the currently selected plan.";
}

function calculateDayBudget(dateKey) {
  const profile = getActiveProfile();
  const plan = getActivePlan();
  const weightLbs = getWeightForDate(profile, dateKey);
  const userProfileForDay = { ...profile.userProfile, currentWeightLbs: weightLbs };
  const bmr = calculateBmr(userProfileForDay);
  const baselineTdee = calculateBaselineTdee(bmr);
  const stepGoal = safeNumber(profile.userProfile.dailyStepGoal, 0);
  const planStepGoal = safeNumber(plan.goalPlan.dailyStepGoal, stepGoal);
  const actualSteps = getStepsForDate(dateKey);
  const effectiveActualSteps = actualSteps === null ? planStepGoal : actualSteps;
  const expectedStepCalories = estimateStepCalories(userProfileForDay, planStepGoal);
  const actualStepCalories = estimateStepCalories(userProfileForDay, effectiveActualSteps);
  const expectedTdee = baselineTdee + expectedStepCalories;
  const actualTdee = baselineTdee + actualStepCalories;
  const delta = safeNumber(plan.metabolicPlan.dailyDeltaCalories, dailyDeltaForGoal(plan.goalPlan.goalType, plan.goalPlan.weeklyRateLbs));
  const floor = Math.max(getSafetyFloor(profile.userProfile.sex), safeNumber(plan.metabolicPlan.safetyFloor, 0));
  const expectedRaw = Number.isFinite(expectedTdee) ? expectedTdee + delta : floor;
  const actualRaw = Number.isFinite(actualTdee) ? actualTdee + delta : floor;
  const expectedBudget = Math.round(expectedRaw);
  const actualBudget = Math.round(actualRaw);
  return {
    bmr,
    baselineTdee,
    stepGoal: planStepGoal,
    actualSteps: effectiveActualSteps,
    expectedStepCalories,
    actualStepCalories,
    expectedTdee,
    actualTdee,
    delta,
    floor,
    weightLbs,
    expectedBudget,
    actualBudget,
  };
}

function renderApp() {
  const today = todayKey();
  if (!selectedDateKey || selectedDateKey > today) {
    selectedDateKey = today;
  }

  const profile = getActiveProfile();
  const plan = getActivePlan();
  const entries = getEntriesForDate(selectedDateKey);
  const total = entries.reduce((sum, entry) => sum + entry.calories, 0);
  const proteinTotal = entries.reduce((sum, entry) => sum + (safeNumber(entry.proteinG, 0) || 0), 0);
  const carbsTotal = entries.reduce((sum, entry) => sum + (safeNumber(entry.carbsG, 0) || 0), 0);
  const fatTotal = entries.reduce((sum, entry) => sum + (safeNumber(entry.fatG, 0) || 0), 0);
  const dayBudget = calculateDayBudget(selectedDateKey);
  const target = plan.metabolicPlan.manualOverrideEnabled
    ? safeNumber(plan.metabolicPlan.manualOverrideCalories, dayBudget.actualBudget)
    : dayBudget.actualBudget;
  const remaining = Math.max(target - total, 0);
  const percent = target > 0 ? (total / target) * 100 : 0;
  const planProjection = calculatePlanProjection();
  const trendProjection = calculateProjection();
  const dayDiff = total - dayBudget.actualBudget;
  const stepDiff = dayBudget.actualStepCalories - dayBudget.expectedStepCalories;

  elements.activeProfileLabel.textContent = `Profile: ${profile.name}`;
  elements.activePlanLabel.textContent = `Plan: ${plan.name}`;
  elements.goalValue.textContent = formatCalories(target);
  elements.todayValue.textContent = formatCalories(total);
  elements.remainingValue.textContent = formatCalories(remaining);
  elements.topMeal.textContent = getTopMeal(entries);
  elements.bmrValue.textContent = formatCalories(dayBudget.bmr);
  elements.tdeeValue.textContent = formatCalories(dayBudget.baselineTdee);
  elements.expectedTdeeValue.textContent = formatCalories(dayBudget.expectedTdee);
  elements.actualTdeeValue.textContent = formatCalories(dayBudget.actualTdee);
  elements.floorValue.textContent = formatCalories(plan.metabolicPlan.safetyFloor);
  elements.recommendedValue.textContent = formatCalories(plan.metabolicPlan.recommendedCalories);
  elements.expectedBudgetValue.textContent = formatCalories(dayBudget.expectedBudget);
  elements.actualBudgetValue.textContent = formatCalories(dayBudget.actualBudget);
  elements.deltaValue.textContent = `${plan.metabolicPlan.dailyDeltaCalories > 0 ? "+" : ""}${formatCalories(
    plan.metabolicPlan.dailyDeltaCalories
  )}`;
  const planProjectionText = planProjection.date
    ? `Plan ${planProjection.label} (${formatDateLabel(planProjection.date)})`
    : `Plan ${planProjection.label}`;
  const trendProjectionText = trendProjection.date
    ? `Trend ${trendProjection.label} (${formatDateLabel(trendProjection.date)})`
    : `Trend ${trendProjection.label}`;
  elements.projectionValue.textContent = `${planProjectionText} · ${trendProjectionText}`;
  if (elements.projectionConfidence) {
    elements.projectionConfidence.textContent = `Trend confidence: ${trendProjection.loggedDaysUsed || 0} logged days (last ${PROJECTION_LOG_WINDOW_DAYS} days), ${trendProjection.weighInsUsed || 0} weigh-ins.`;
  }
  elements.selectedDate.value = selectedDateKey;
  elements.selectedDateLabel.textContent = `Showing entries for ${formatDateLabel(selectedDateKey)}`;
  elements.recommendationMeta.textContent = plan.metabolicPlan.manualOverrideEnabled
    ? `Override active: ${formatCalories(plan.metabolicPlan.manualOverrideCalories)} cal/day. Recommended ${formatCalories(
        dayBudget.actualBudget
      )} cal/day.`
    : `Expected budget ${formatCalories(dayBudget.expectedBudget)} cal · Actual logged ${formatCalories(
        total
      )} cal · Steps ${Math.round(dayBudget.actualSteps)}/${Math.round(dayBudget.stepGoal)}`;
  elements.macroProteinTotal.textContent = `${Math.round(proteinTotal)}g`;
  elements.macroCarbsTotal.textContent = `${Math.round(carbsTotal)}g`;
  elements.macroFatTotal.textContent = `${Math.round(fatTotal)}g`;
  updateMacroRing(proteinTotal, carbsTotal, fatTotal);
  if (!plan.metabolicPlan.manualOverrideEnabled && dayBudget.actualBudget < dayBudget.floor) {
    elements.recommendationMeta.textContent += ` · Floor recommendation: ${formatCalories(dayBudget.floor)} cal`;
  }
  if (elements.mathDetailsContent) {
    const planRate = safeNumber(plan.goalPlan.weeklyRateLbs, 0);
    const trendRate = safeNumber(trendProjection.weeklyRate, 0);
    elements.mathDetailsContent.textContent = [
      `Date: ${selectedDateKey}`,
      `Weight used for this day: ${Number.isFinite(dayBudget.weightLbs) ? dayBudget.weightLbs.toFixed(1) : "—"} lbs`,
      `BMR (Mifflin-St Jeor): ${formatCalories(dayBudget.bmr)} kcal/day`,
      `Baseline TDEE = BMR * 1.2: ${formatCalories(dayBudget.baselineTdee)} kcal/day`,
      `Expected step calories (goal ${Math.round(dayBudget.stepGoal)}): ${formatCalories(dayBudget.expectedStepCalories)} kcal`,
      `Actual step calories (actual ${Math.round(dayBudget.actualSteps)}): ${formatCalories(dayBudget.actualStepCalories)} kcal`,
      `Goal delta (from ${plan.goalPlan.goalType} ${planRate.toFixed(2)} lbs/week): ${plan.metabolicPlan.dailyDeltaCalories > 0 ? "+" : ""}${formatCalories(plan.metabolicPlan.dailyDeltaCalories)} kcal/day`,
      `Expected budget = baseline TDEE + expected step + goal delta: ${formatCalories(dayBudget.expectedBudget)} kcal`,
      `Actual budget = baseline TDEE + actual step + goal delta: ${formatCalories(dayBudget.actualBudget)} kcal`,
      `Actual logged calories (food): ${formatCalories(total)} kcal`,
      `Day surplus/deficit = logged - actual budget: ${dayDiff > 0 ? "+" : ""}${formatCalories(dayDiff)} kcal`,
      `Step surplus/deficit = actual step cals - expected step cals: ${stepDiff > 0 ? "+" : ""}${formatCalories(stepDiff)} kcal`,
      `Plan ETA pace: ${planRate.toFixed(2)} lbs/week`,
      `Trend ETA pace (recent data): ${trendRate > 0 ? trendRate.toFixed(2) : "0.00"} lbs/week`,
    ].join("\n");
  }
  elements.dayBalanceValue.textContent =
    dayDiff > 0 ? `Surplus +${formatCalories(dayDiff)}` : `Deficit ${formatCalories(dayDiff)}`;
  elements.stepBalanceValue.textContent =
    stepDiff >= 0 ? `Surplus +${formatCalories(stepDiff)}` : `Deficit ${formatCalories(stepDiff)}`;
  updateRing(percent);

  elements.goalForm.querySelector("#goal-type").value = plan.goalPlan.goalType;
  elements.goalForm.querySelector("#target-weight").value = plan.goalPlan.targetWeightLbs ?? "";
  elements.goalForm.querySelector("#weekly-rate").value = plan.goalPlan.weeklyRateLbs ?? 1;
  elements.goalForm.querySelector("#goal-step-goal").value = plan.goalPlan.dailyStepGoal ?? 8000;
  elements.goalForm.querySelector("#goal-override").value = plan.metabolicPlan.manualOverrideEnabled
    ? plan.metabolicPlan.manualOverrideCalories ?? ""
    : "";
  renderFoodPicker();
  elements.planStepsQuickValue.value = getStepsForDate(selectedDateKey) ?? dayBudget.stepGoal ?? "";

  const filtered = activeFilter === "All" ? entries : entries.filter((entry) => entry.meal === activeFilter);
  if (!filtered.length) {
    elements.log.innerHTML =
      '<div class="log-item log-empty"><div class="log-title">No entries for this day.</div><p>Choose another date or add a meal entry.</p></div>';
  } else {
    elements.log.innerHTML = filtered
      .map((entry) => {
        const meta = [entry.time || "Anytime", `${entry.calories} cal`].join(" · ");
        return `<div class="log-item" data-id="${entry.id}" data-date="${entry.dateKey}">
          <div class="log-head">
            <div class="log-title">${escapeHtml(entry.food)}</div>
            <span class="badge">${escapeHtml(entry.meal)}</span>
          </div>
          <div class="log-meta">${meta}</div>
          <p>${escapeHtml(entry.notes || "No notes")} · P${safeNumber(entry.proteinG, 0)} C${safeNumber(
            entry.carbsG,
            0
          )} F${safeNumber(entry.fatG, 0)}</p>
        </div>`;
      })
      .join("");
  }

  const weights = [...profile.weights].sort((a, b) => (a.date < b.date ? 1 : -1));
  const weightsAsc = [...weights].reverse();
  const latestWeight = weightsAsc[weightsAsc.length - 1];
  elements.weightHistory.innerHTML = weights.length
    ? weights
        .slice(0, 40)
        .map(
          (entry) =>
            `<div class="history-row"><strong>${formatDateLabel(entry.date)}</strong><span>${formatWeightLbs(
              entry.weightLbs
            )}</span></div>`
        )
        .join("")
    : '<div class="history-row"><strong>No weigh-ins yet.</strong><span>Add one above.</span></div>';
  elements.weightLastCheckin.textContent = latestWeight
    ? `${formatWeightLbs(latestWeight.weightLbs)} (${formatDateLabel(latestWeight.date)})`
    : "—";
  const change7d = calculateWeightChangeFromLatest(weightsAsc, 7);
  const change30d = calculateWeightChangeFromLatest(weightsAsc, 30);
  elements.weight7dChange.textContent = Number.isFinite(change7d)
    ? `${change7d > 0 ? "+" : ""}${change7d.toFixed(1)} lbs`
    : "—";
  elements.weight30dChange.textContent = Number.isFinite(change30d)
    ? `${change30d > 0 ? "+" : ""}${change30d.toFixed(1)} lbs`
    : "—";
  const targetWeight = safeNumber(plan.goalPlan.targetWeightLbs);
  if (!latestWeight || !Number.isFinite(targetWeight)) {
    elements.weightToGoal.textContent = "—";
  } else if (plan.goalPlan.goalType === "lose") {
    const remainingToGoal = latestWeight.weightLbs - targetWeight;
    elements.weightToGoal.textContent = remainingToGoal > 0 ? `${remainingToGoal.toFixed(1)} lbs to lose` : "Goal met";
  } else if (plan.goalPlan.goalType === "gain") {
    const remainingToGoal = targetWeight - latestWeight.weightLbs;
    elements.weightToGoal.textContent = remainingToGoal > 0 ? `${remainingToGoal.toFixed(1)} lbs to gain` : "Goal met";
  } else {
    elements.weightToGoal.textContent = "Maintain";
  }
  renderWeightTrend(weights, plan.goalPlan.targetWeightLbs, trendProjection);
  checkWeightLossMilestones(profile, plan, weightsAsc);
  renderWeightMilestoneBadge(profile);

  const stepRows = Object.entries(profile.stepsByDay || {})
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .slice(0, 12);
  elements.stepsHistory.innerHTML = stepRows.length
    ? stepRows
        .map(
          ([dateKey, steps]) =>
            `<div class="history-row"><strong>${formatDateLabel(dateKey)}</strong><span>${formatCalories(steps)} steps</span></div>`
        )
        .join("")
    : '<div class="history-row"><strong>No step logs yet.</strong><span>Add daily steps above.</span></div>';
  const todayDateKey = todayKey();
  const sevenDaySteps = Array.from({ length: 7 }).map((_, idx) => {
    const dateKey = shiftDate(todayDateKey, idx - 6);
    return safeNumber(profile.stepsByDay[dateKey], 0);
  });
  const sevenDayAvg = sevenDaySteps.reduce((sum, value) => sum + value, 0) / 7;
  let streak = 0;
  for (let i = 0; i < 90; i += 1) {
    const dateKey = shiftDate(todayDateKey, -i);
    const steps = safeNumber(profile.stepsByDay[dateKey], null);
    if (steps === null) break;
    if (steps >= dayBudget.stepGoal) {
      streak += 1;
    } else {
      break;
    }
  }
  const todayBudget = calculateDayBudget(todayDateKey);
  elements.steps7dAvg.textContent = `${formatCalories(sevenDayAvg)} steps`;
  elements.stepsGoalStreak.textContent = `${streak} day${streak === 1 ? "" : "s"}`;
  elements.todayStepCalories.textContent = `${formatCalories(todayBudget.actualStepCalories)} cal`;
  renderStepsSparkline(sevenDaySteps, dayBudget.stepGoal);
  renderStepsHeatmap(profile.stepsByDay || {}, dayBudget.stepGoal);

  const rangeDays = safeNumber(elements.historyRange.value, 30);
  const cutoff = shiftDate(todayKey(), -rangeDays);
  const rows = Object.entries(profile.historyIndex)
    .filter(([dateKey, summary]) => dateKey >= cutoff && summary.entryCount > 0)
    .sort((a, b) => (a[0] < b[0] ? 1 : -1));
  const avg = rows.length
    ? rows.reduce((sum, [, summary]) => sum + summary.totalCalories, 0) / rows.length
    : 0;
  elements.historyDays.textContent = String(rows.length);
  elements.historyAverage.textContent = formatCalories(avg);
  if (weights.length > 1) {
    const inRange = weights.filter((entry) => entry.date >= cutoff).sort((a, b) => (a.date < b.date ? -1 : 1));
    if (inRange.length > 1) {
      const delta = inRange[inRange.length - 1].weightLbs - inRange[0].weightLbs;
      elements.historyWeightDelta.textContent = `${delta > 0 ? "+" : ""}${delta.toFixed(1)} lbs`;
    } else {
      elements.historyWeightDelta.textContent = "—";
    }
  } else {
    elements.historyWeightDelta.textContent = "—";
  }

  elements.historyBars.innerHTML = rows
    .slice(0, 24)
    .reverse()
    .map(([dateKey, summary]) => {
      const height = Math.min(100, Math.round((summary.totalCalories / Math.max(target, 1)) * 100));
      return `<div class="history-bar-wrap" title="${dateKey}: ${summary.totalCalories} cal">
        <div class="history-bar" style="height:${Math.max(8, height)}%"></div>
        <span>${dateKey.slice(5)}</span>
      </div>`;
    })
    .join("") || '<p class="muted">No archived days in this range yet.</p>';

  elements.historyTable.innerHTML = rows
    .slice(0, 20)
    .map(
      ([dateKey, summary]) =>
        `<div class="history-row"><strong>${formatDateLabel(dateKey)}</strong><span>${formatCalories(
          summary.totalCalories
        )} cal (${summary.entryCount} entries)</span></div>`
    )
    .join("") || '<div class="history-row"><strong>No history yet.</strong><span>Start logging meals.</span></div>';
}

function openEdit(dateKey, id) {
  const entry = getEntriesForDate(dateKey).find((item) => item.id === id);
  if (!entry) return;
  editingId = id;
  editingDateKey = dateKey;
  editingFoodId = entry.foodId || null;
  elements.editFood.value = entry.food;
  elements.editMeal.value = entry.meal;
  elements.editCalories.value = entry.calories;
  elements.editProteinG.value = safeNumber(entry.proteinG, 0);
  elements.editCarbsG.value = safeNumber(entry.carbsG, 0);
  elements.editFatG.value = safeNumber(entry.fatG, 0);
  elements.editTime.value = entry.time || "";
  elements.editNotes.value = entry.notes || "";
  elements.modal.showModal();
}

function closeEdit() {
  elements.modal.close();
  editingId = null;
  editingDateKey = null;
  editingFoodId = null;
}

function setFilter(nextFilter) {
  activeFilter = nextFilter;
  elements.filters.forEach((button) => {
    button.classList.toggle("active", button.dataset.meal === activeFilter);
  });
  renderApp();
}

function runDiagnostics() {
  const bmr = Math.round(
    calculateBmr({ sex: "female", age: 30, heightFt: 5, heightIn: 7, currentWeightLbs: 154.3, dailyStepGoal: 8000 })
  );
  if (Math.abs(bmr - 1452) > 4) console.warn("BMR diagnostic drift:", bmr);
}

elements.setupProfileSelect.addEventListener("change", () => setActiveProfile(elements.setupProfileSelect.value));
elements.setupCreateProfile.addEventListener("click", () => {
  const name = elements.setupNewProfileName.value.trim();
  if (!name) return;
  const created = createProfile(name);
  if (created?.id) setActiveProfile(created.id);
  elements.setupNewProfileName.value = "";
  renderSetupFlow();
});
elements.setupDeleteProfile.addEventListener("click", () => {
  deleteActiveProfile(elements.setupProfileSelect.value);
  renderSetupFlow();
});
elements.setupProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const profile = getActiveProfile();
  const birthYear = safeNumber(elements.setupProfileForm.querySelector("#setup-profile-birth-year").value);
  const birthMonth = safeNumber(elements.setupProfileForm.querySelector("#setup-profile-birth-month").value);
  profile.name = elements.setupProfileForm.querySelector("#setup-profile-name").value.trim() || "My Profile";
  profile.userProfile = {
    ...profile.userProfile,
    sex: elements.setupProfileForm.querySelector("#setup-profile-sex").value,
    birthYear,
    birthMonth,
    age: calculateAgeFromBirth(birthYear, birthMonth),
    heightFt: safeNumber(elements.setupProfileForm.querySelector("#setup-profile-height-ft").value, 5),
    heightIn: safeNumber(elements.setupProfileForm.querySelector("#setup-profile-height-in").value, 6),
    currentWeightLbs: safeNumber(elements.setupProfileForm.querySelector("#setup-profile-weight").value),
    dailyStepGoal: safeNumber(elements.setupProfileForm.querySelector("#setup-profile-step-goal").value, 8000),
  };
  profile.updatedAt = nowIso();
  persistState(state);
  recalculatePlan();
  renderSetupFlow();
});
elements.setupPlanSelect.addEventListener("change", () => setActivePlan(elements.setupPlanSelect.value));
elements.setupCreatePlan.addEventListener("click", () => {
  const name = elements.setupNewPlanName.value.trim();
  if (!name) return;
  const created = createPlan(name);
  if (created?.id) setActivePlan(created.id);
  elements.setupNewPlanName.value = "";
  renderSetupFlow();
});
elements.setupDeletePlan.addEventListener("click", () => {
  deleteActivePlan(elements.setupPlanSelect.value);
  renderSetupFlow();
});
elements.setupPlanForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const plan = getActivePlan();
  plan.goalPlan = {
    ...plan.goalPlan,
    goalType: elements.setupPlanForm.querySelector("#setup-goal-type").value,
    targetWeightLbs: safeNumber(elements.setupPlanForm.querySelector("#setup-target-weight").value),
    weeklyRateLbs: safeNumber(elements.setupPlanForm.querySelector("#setup-weekly-rate").value, 1),
    dailyStepGoal: safeNumber(elements.setupPlanForm.querySelector("#setup-plan-step-goal").value, 8000),
  };
  const setupOverride = safeNumber(elements.setupPlanForm.querySelector("#setup-goal-override").value);
  plan.metabolicPlan.manualOverrideCalories = setupOverride || null;
  plan.metabolicPlan.manualOverrideEnabled = Number.isFinite(setupOverride) && setupOverride > 0;
  plan.updatedAt = nowIso();
  persistState(state);
  recalculatePlan();
  showApp();
});

elements.switchSetup.addEventListener("click", showSetup);

elements.goalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const plan = getActivePlan();
  plan.goalPlan = {
    ...plan.goalPlan,
    goalType: elements.goalForm.querySelector("#goal-type").value,
    targetWeightLbs: safeNumber(elements.goalForm.querySelector("#target-weight").value),
    weeklyRateLbs: safeNumber(elements.goalForm.querySelector("#weekly-rate").value, 1),
    dailyStepGoal: safeNumber(elements.goalForm.querySelector("#goal-step-goal").value, 8000),
  };
  const override = safeNumber(elements.goalForm.querySelector("#goal-override").value);
  plan.metabolicPlan.manualOverrideCalories = override || null;
  plan.metabolicPlan.manualOverrideEnabled = Number.isFinite(override) && override > 0;
  plan.updatedAt = nowIso();
  persistState(state);
  recalculatePlan();
  renderApp();
});

elements.weightForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const date = elements.weightForm.querySelector("#weight-date").value;
  const weight = safeNumber(elements.weightForm.querySelector("#weight-value").value);
  if (!date || !weight) return;
  const profile = getActiveProfile();
  const next = profile.weights.filter((entry) => entry.date !== date);
  next.push({ id: crypto.randomUUID(), date, weightLbs: weight, createdAt: nowIso() });
  profile.weights = next.sort((a, b) => (a.date < b.date ? 1 : -1));
  const latest = [...profile.weights].sort((a, b) => (a.date > b.date ? -1 : 1))[0];
  profile.userProfile.currentWeightLbs = latest.weightLbs;
  profile.updatedAt = nowIso();
  persistState(state);
  recalculatePlan();
  elements.weightForm.reset();
  elements.weightForm.querySelector("#weight-date").value = todayKey();
  renderApp();
});

elements.stepsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const date = elements.stepsForm.querySelector("#steps-date").value;
  const steps = safeNumber(elements.stepsForm.querySelector("#steps-value").value);
  if (!date || steps === null || steps < 0) return;
  setStepsForDate(date, steps);
  elements.stepsForm.reset();
  elements.stepsForm.querySelector("#steps-date").value = todayKey();
  renderApp();
});

elements.planStepsQuickForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const steps = safeNumber(elements.planStepsQuickValue.value);
  if (steps === null || steps < 0) return;
  setStepsForDate(selectedDateKey, steps);
  renderApp();
});

elements.entryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedFoodId = elements.entryForm.querySelector("#selected-food-id").value;
  const servings = Math.max(0.1, safeNumber(elements.entryForm.querySelector("#servings").value, 1));
  let food = selectedFoodId ? getFoodCatalog()[selectedFoodId] : null;
  if (!food) {
    const typedMatch = findFoodByName(elements.entryForm.querySelector("#food-name").value);
    if (typedMatch) {
      food = typedMatch;
      setSelectedFood(food);
    }
  }

  if (!food) {
    food = upsertFood({
      name: elements.entryForm.querySelector("#food-name").value.trim(),
      calories: safeNumber(elements.entryForm.querySelector("#calories").value, 0),
      proteinG: safeNumber(elements.entryForm.querySelector("#protein-g").value, 0),
      carbsG: safeNumber(elements.entryForm.querySelector("#carbs-g").value, 0),
      fatG: safeNumber(elements.entryForm.querySelector("#fat-g").value, 0),
      source: "custom",
    });
  }

  const entry = {
    id: crypto.randomUUID(),
    food: food.name,
    foodId: food.id,
    servings,
    meal: elements.entryForm.querySelector("#meal").value,
    calories: Math.max(0, safeNumber(elements.entryForm.querySelector("#calories").value, 0)),
    proteinG: Math.max(0, safeNumber(elements.entryForm.querySelector("#protein-g").value, 0)),
    carbsG: Math.max(0, safeNumber(elements.entryForm.querySelector("#carbs-g").value, 0)),
    fatG: Math.max(0, safeNumber(elements.entryForm.querySelector("#fat-g").value, 0)),
    foodSnapshot: {
      name: food.name,
      brand: food.brand || "",
      servingSize: food.servingSize || "1 serving",
    },
    time: elements.entryForm.querySelector("#time").value,
    notes: elements.entryForm.querySelector("#notes").value.trim(),
  };
  if (!entry.food || !Number.isFinite(entry.calories) || entry.calories < 0) return;
  addEntry(selectedDateKey, entry);
  recordFoodUsage(food.id);
  elements.entryForm.reset();
  elements.entryForm.querySelector("#servings").value = "1";
  setSelectedFood(null);
  renderApp();
});

elements.quickAdds.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const calories = safeNumber(button.dataset.calories, 0);
  if (!calories) return;
  addEntry(selectedDateKey, {
    id: crypto.randomUUID(),
    food: button.textContent.replace(/\+\d+/, "").trim(),
    foodId: null,
    servings: 1,
    meal: "Snack",
    calories,
    proteinG: 0,
    carbsG: 0,
    fatG: 0,
    foodSnapshot: null,
    time: "",
    notes: "Quick add",
  });
  renderApp();
});

elements.foodSearch.addEventListener("input", renderFoodPicker);
elements.entryForm.querySelector("#food-name").addEventListener("input", () => {
  const input = elements.entryForm.querySelector("#food-name").value;
  const food = findFoodByName(input);
  const exactMatch =
    food && String(food.name || "").trim().toLowerCase() === String(input || "").trim().toLowerCase();
  if (exactMatch) {
    setSelectedFood(food);
  } else {
    const fallback = bestLoggedNutritionForName(input);
    if (fallback && fallback.macroSum > 0) {
      const servings = Math.max(0.1, safeNumber(elements.entryForm.querySelector("#servings").value, 1));
      elements.entryForm.querySelector("#calories").value = Math.round(fallback.calories * servings);
      elements.entryForm.querySelector("#protein-g").value = Number((fallback.proteinG * servings).toFixed(1));
      elements.entryForm.querySelector("#carbs-g").value = Number((fallback.carbsG * servings).toFixed(1));
      elements.entryForm.querySelector("#fat-g").value = Number((fallback.fatG * servings).toFixed(1));
    }
  }
});
elements.entryForm.querySelector("#food-name").addEventListener("change", () => {
  const food = findFoodByName(elements.entryForm.querySelector("#food-name").value);
  if (food) {
    setSelectedFood(food);
  } else {
    elements.entryForm.querySelector("#selected-food-id").value = "";
    const fallback = bestLoggedNutritionForName(elements.entryForm.querySelector("#food-name").value);
    if (fallback && fallback.macroSum > 0) {
      const servings = Math.max(0.1, safeNumber(elements.entryForm.querySelector("#servings").value, 1));
      elements.entryForm.querySelector("#calories").value = Math.round(fallback.calories * servings);
      elements.entryForm.querySelector("#protein-g").value = Number((fallback.proteinG * servings).toFixed(1));
      elements.entryForm.querySelector("#carbs-g").value = Number((fallback.carbsG * servings).toFixed(1));
      elements.entryForm.querySelector("#fat-g").value = Number((fallback.fatG * servings).toFixed(1));
    }
  }
});
elements.foodSearchResults.addEventListener("click", (event) => {
  const row = event.target.closest("[data-food-id]");
  if (!row) return;
  const food = getFoodCatalog()[row.dataset.foodId];
  if (!food) return;
  setSelectedFood(food);
});
elements.recentFoodSelect.addEventListener("change", () => {
  const food = getFoodCatalog()[elements.recentFoodSelect.value];
  if (!food) return;
  setSelectedFood(food);
});
elements.favoriteSelectedFood.addEventListener("click", () => {
  const foodId = elements.entryForm.querySelector("#selected-food-id").value;
  if (!foodId) return;
  toggleFavoriteFood(foodId);
  renderFoodPicker();
});
elements.editSelectedFood.addEventListener("click", () => {
  const food = getCurrentlySelectedCatalogFood();
  if (!food) return;
  editingCatalogFoodId = food.id;
  elements.customFoodTitle.textContent = "Edit saved food";
  elements.customFoodSave.textContent = "Update food";
  elements.customFoodForm.querySelector("#custom-food-name").value = food.name || "";
  elements.customFoodForm.querySelector("#custom-food-brand").value = food.brand || "";
  elements.customFoodForm.querySelector("#custom-serving-size").value = food.servingSize || "1 serving";
  elements.customFoodForm.querySelector("#custom-calories").value = safeNumber(food.calories, 0);
  elements.customFoodForm.querySelector("#custom-protein-g").value = safeNumber(food.proteinG, 0);
  elements.customFoodForm.querySelector("#custom-carbs-g").value = safeNumber(food.carbsG, 0);
  elements.customFoodForm.querySelector("#custom-fat-g").value = safeNumber(food.fatG, 0);
  elements.customFoodForm.querySelector("#custom-barcode").value = food.barcode || "";
  elements.customFoodModal.showModal();
});
elements.deleteSelectedFood.addEventListener("click", () => {
  const food = getCurrentlySelectedCatalogFood();
  if (!food?.id) return;
  deleteFoodOption(food.id);
});
elements.createMealTemplate.addEventListener("click", () => {
  const items = getTemplateCandidateItems();
  if (!items.length) {
    alert("Log at least one saved food for the selected meal first.");
    return;
  }
  elements.mealTemplateFoodIds.value = items.map((item) => {
    const food = getFoodCatalog()[item.foodId];
    return `${food?.name || "Food"} x${item.servings}`;
  }).join(", ");
  elements.mealTemplateName.value = "";
  elements.mealTemplateModal.dataset.items = JSON.stringify(items);
  elements.mealTemplateModal.showModal();
});
elements.applyMealTemplate.addEventListener("click", () => {
  const templateId = elements.mealTemplateSelect.value;
  if (!templateId) return;
  const meal = elements.entryForm.querySelector("#meal").value;
  applyMealTemplate(templateId, selectedDateKey, meal);
  renderApp();
});
elements.entryForm.querySelector("#servings").addEventListener("input", () => {
  const foodId = elements.entryForm.querySelector("#selected-food-id").value;
  if (!foodId) return;
  const food = getFoodCatalog()[foodId];
  if (!food) return;
  const servings = Math.max(0.1, safeNumber(elements.entryForm.querySelector("#servings").value, 1));
  elements.entryForm.querySelector("#calories").value = Math.round(food.calories * servings);
  elements.entryForm.querySelector("#protein-g").value = Number((food.proteinG * servings).toFixed(1));
  elements.entryForm.querySelector("#carbs-g").value = Number((food.carbsG * servings).toFixed(1));
  elements.entryForm.querySelector("#fat-g").value = Number((food.fatG * servings).toFixed(1));
});

elements.openCustomFood.addEventListener("click", () => {
  editingCatalogFoodId = null;
  elements.customFoodTitle.textContent = "Create custom food";
  elements.customFoodSave.textContent = "Save food";
  elements.customFoodForm.reset();
  elements.customFoodModal.showModal();
});
elements.closeCustomFood.addEventListener("click", () => {
  editingCatalogFoodId = null;
  elements.customFoodModal.close();
});
elements.customFoodForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const existing = editingCatalogFoodId ? getFoodCatalog()[editingCatalogFoodId] || {} : {};
  const food = upsertFood({
    ...existing,
    id: editingCatalogFoodId || undefined,
    name: elements.customFoodForm.querySelector("#custom-food-name").value.trim(),
    brand: elements.customFoodForm.querySelector("#custom-food-brand").value.trim(),
    servingSize: elements.customFoodForm.querySelector("#custom-serving-size").value.trim() || "1 serving",
    calories: safeNumber(elements.customFoodForm.querySelector("#custom-calories").value, 0),
    proteinG: safeNumber(elements.customFoodForm.querySelector("#custom-protein-g").value, 0),
    carbsG: safeNumber(elements.customFoodForm.querySelector("#custom-carbs-g").value, 0),
    fatG: safeNumber(elements.customFoodForm.querySelector("#custom-fat-g").value, 0),
    barcode: elements.customFoodForm.querySelector("#custom-barcode").value.trim(),
    source: existing.source || "custom",
  });
  editingCatalogFoodId = null;
  elements.customFoodTitle.textContent = "Create custom food";
  elements.customFoodSave.textContent = "Save food";
  elements.customFoodForm.reset();
  elements.customFoodModal.close();
  setSelectedFood(food);
  renderFoodPicker();
});
elements.customFoodModal.addEventListener("click", (event) => {
  if (event.target === elements.customFoodModal) {
    editingCatalogFoodId = null;
    elements.customFoodModal.close();
  }
});
elements.closeMealTemplate.addEventListener("click", () => {
  elements.mealTemplateModal.close();
});
elements.mealTemplateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = elements.mealTemplateName.value.trim();
  const items = JSON.parse(elements.mealTemplateModal.dataset.items || "[]");
  if (!name || !items.length) return;
  createMealTemplate(name, items);
  elements.mealTemplateForm.reset();
  elements.mealTemplateModal.close();
  renderFoodPicker();
});
elements.mealTemplateModal.addEventListener("click", (event) => {
  if (event.target === elements.mealTemplateModal) elements.mealTemplateModal.close();
});
if (elements.weightMilestoneModal) {
  elements.weightMilestoneModal.addEventListener("click", (event) => {
    if (event.target === elements.weightMilestoneModal) elements.weightMilestoneModal.close();
  });
}
if (elements.resetMilestones) {
  elements.resetMilestones.addEventListener("click", () => {
    if (!confirm("Reset all milestone progress and start over?")) return;
    const profile = getActiveProfile();
    profile.weightLossMilestonesSeen = [];
    profile.updatedAt = nowIso();
    persistState(state);
    if (elements.weightMilestoneModal?.open) elements.weightMilestoneModal.close();
    renderApp();
  });
}

elements.resetDay.addEventListener("click", () => {
  if (!confirm(`Clear all entries for ${selectedDateKey}?`)) return;
  setEntriesForDate(selectedDateKey, []);
  renderApp();
});

elements.filters.forEach((button) => button.addEventListener("click", () => setFilter(button.dataset.meal)));
elements.selectedDate.addEventListener("change", () => {
  const picked = elements.selectedDate.value || todayKey();
  selectedDateKey = picked > todayKey() ? todayKey() : picked;
  renderApp();
});
elements.datePrev.addEventListener("click", () => {
  selectedDateKey = shiftDate(selectedDateKey, -1);
  renderApp();
});
elements.dateNext.addEventListener("click", () => {
  selectedDateKey = shiftDate(selectedDateKey, 1);
  if (selectedDateKey > todayKey()) selectedDateKey = todayKey();
  renderApp();
});
elements.historyRange.addEventListener("change", renderApp);

elements.log.addEventListener("click", (event) => {
  const item = event.target.closest(".log-item[data-id]");
  if (!item) return;
  openEdit(item.dataset.date, item.dataset.id);
});
elements.editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!editingId || !editingDateKey) return;
  const priorEntry = getEntriesForDate(editingDateKey).find((item) => item.id === editingId);
  const foodName = elements.editFood.value.trim();
  const calories = safeNumber(elements.editCalories.value, 0);
  const proteinG = Math.max(0, safeNumber(elements.editProteinG.value, 0));
  const carbsG = Math.max(0, safeNumber(elements.editCarbsG.value, 0));
  const fatG = Math.max(0, safeNumber(elements.editFatG.value, 0));
  const linkedFood = editingFoodId ? getFoodCatalog()[editingFoodId] : findFoodByName(foodName);
  const linkedFoodId = linkedFood?.id || null;
  const servingCount = Math.max(0.1, safeNumber(priorEntry?.servings, 1));
  updateEntry(editingDateKey, editingId, {
    food: foodName,
    foodId: linkedFoodId,
    meal: elements.editMeal.value,
    calories,
    proteinG,
    carbsG,
    fatG,
    time: elements.editTime.value,
    notes: elements.editNotes.value.trim(),
  });
  // Keep saved food nutrition in sync when editing an entry linked to catalog.
  if (linkedFoodId) {
    const existing = getFoodCatalog()[linkedFoodId] || {};
    upsertFood({
      ...existing,
      id: linkedFoodId,
      name: foodName || existing.name || "Custom food",
      calories: Number((calories / servingCount).toFixed(1)),
      proteinG: Number((proteinG / servingCount).toFixed(1)),
      carbsG: Number((carbsG / servingCount).toFixed(1)),
      fatG: Number((fatG / servingCount).toFixed(1)),
    });
  }
  closeEdit();
  renderApp();
});
elements.closeModal.addEventListener("click", closeEdit);
elements.deleteEntry.addEventListener("click", () => {
  if (!editingId || !editingDateKey) return;
  if (!confirm("Delete this entry?")) return;
  deleteEntry(editingDateKey, editingId);
  closeEdit();
  renderApp();
});
elements.modal.addEventListener("click", (event) => {
  if (event.target === elements.modal) closeEdit();
});

runDiagnostics();
showSetup();
