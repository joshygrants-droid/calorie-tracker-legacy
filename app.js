const STORAGE_KEY_V4 = "calorie-tracker-v4";
const STORAGE_KEY_V3 = "calorie-tracker-v3";
const STORAGE_KEY_V2 = "calorie-tracker-v2";
const STORAGE_KEY_V1 = "calorie-tracker-v1";
const SCHEMA_VERSION = 4;
const DEFAULT_CALORIES = 2000;

const SEDENTARY_MULTIPLIER = 1.2;
const CALORIES_PER_MILE_PER_LB = 0.53;

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
  setupPlanForm: document.getElementById("setup-plan-form"),
  activeProfileLabel: document.getElementById("active-profile-label"),
  activePlanLabel: document.getElementById("active-plan-label"),
  goalValue: document.getElementById("goal-value"),
  todayValue: document.getElementById("today-value"),
  remainingValue: document.getElementById("remaining-value"),
  ringPercent: document.getElementById("ring-percent"),
  ringProgress: document.querySelector(".ring-progress"),
  topMeal: document.getElementById("top-meal"),
  recommendationMeta: document.getElementById("recommendation-meta"),
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
  stepsForm: document.getElementById("steps-form"),
  stepsHistory: document.getElementById("steps-history"),
  entryForm: document.getElementById("entry-form"),
  resetDay: document.getElementById("reset-day"),
  quickAdds: document.getElementById("quick-adds"),
  filters: Array.from(document.querySelectorAll(".filter")),
  modal: document.getElementById("edit-modal"),
  editForm: document.getElementById("edit-form"),
  editFood: document.getElementById("edit-food"),
  editMeal: document.getElementById("edit-meal"),
  editCalories: document.getElementById("edit-calories"),
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

function todayKey() {
  return new Date().toISOString().slice(0, 10);
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
  const date = new Date(`${dateKey}T00:00:00`);
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function shiftDate(dateKey, days) {
  const date = new Date(`${dateKey}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
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
      heightFt: 5,
      heightIn: 6,
      currentWeightLbs: null,
      dailyStepGoal: 8000,
      unitPrefs: { weight: "lbs", height: "ft-in" },
    },
    foodLogs: {},
    weights: [],
    stepsByDay: {},
    calorieHistory: [],
    historyIndex: {},
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
    time: String(entry.time || ""),
    notes: String(entry.notes || ""),
    dateKey,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
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
  profile.userProfile = {
    ...profile.userProfile,
    sex: v2.userProfile?.sex || "female",
    age: safeNumber(v2.userProfile?.age),
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
    calorieHistory: Array.isArray(profile?.calorieHistory) ? profile.calorieHistory : [],
    historyIndex: profile?.historyIndex || {},
  };
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
  const v4 = localStorage.getItem(STORAGE_KEY_V4);
  if (v4) {
    try {
      return normalizeState(JSON.parse(v4));
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
  localStorage.setItem(STORAGE_KEY_V4, JSON.stringify(nextState));
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
}

function deleteActiveProfile() {
  const profileIds = Object.keys(state.profiles);
  if (profileIds.length <= 1) {
    alert("You need at least one profile.");
    return;
  }

  const active = getActiveProfile();
  if (!confirm(`Delete profile "${active.name}" and all of its plans/history?`)) return;

  delete state.profiles[active.id];
  const remaining = Object.keys(state.profiles);
  state.activeProfileId = remaining[0];
  persistState(state);
}

function createPlan(name) {
  const profile = getActiveProfile();
  const plan = createDefaultPlan(name);
  profile.plans[plan.id] = plan;
  profile.activePlanId = plan.id;
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

function getSafetyFloor(sex) {
  return 1500;
}

function calculateBmr(profile) {
  const age = safeNumber(profile.age);
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

function dailyDeltaForGoal(goalType, weeklyRateLbs) {
  const rate = safeNumber(weeklyRateLbs, 0);
  if (rate <= 0) return 0;
  const delta = (lbsToKg(rate) * 7700) / 7;
  if (goalType === "lose") return -delta;
  if (goalType === "gain") return delta;
  return 0;
}

function calculateProjection() {
  const profile = getActiveProfile();
  const plan = getActivePlan();
  const current = safeNumber(profile.userProfile.currentWeightLbs);
  const target = safeNumber(plan.goalPlan.targetWeightLbs);
  const weeklyRate = safeNumber(plan.goalPlan.weeklyRateLbs);
  const goalType = plan.goalPlan.goalType;
  if (!current || !target || !weeklyRate) return { label: "—", date: null };
  const diff = target - current;
  if (goalType === "lose" && diff >= 0) return { label: "Target already met", date: null };
  if (goalType === "gain" && diff <= 0) return { label: "Target already met", date: null };
  if (goalType === "maintain") return { label: "No end date", date: null };
  const weeks = Math.abs(diff / weeklyRate);
  if (!Number.isFinite(weeks) || weeks <= 0) return { label: "—", date: null };
  const finish = new Date();
  finish.setDate(finish.getDate() + Math.ceil(weeks * 7));
  return { label: `${weeks.toFixed(1)} weeks`, date: finish.toISOString().slice(0, 10) };
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
  const projection = calculateProjection();

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
  elements.setupProfileForm.querySelector("#setup-profile-age").value = activeProfile.userProfile.age ?? "";
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

  elements.setupDeleteProfile.disabled = profiles.length <= 1;
  elements.setupDeleteProfile.title = profiles.length <= 1 ? "At least one profile is required." : "";
}

function calculateDayBudget(dateKey) {
  const profile = getActiveProfile();
  const plan = getActivePlan();
  const bmr = safeNumber(plan.metabolicPlan.bmr, calculateBmr(profile.userProfile));
  const baselineTdee = safeNumber(plan.metabolicPlan.baselineTdee, Number.isFinite(bmr) ? bmr * SEDENTARY_MULTIPLIER : 0);
  const stepGoal = safeNumber(profile.userProfile.dailyStepGoal, 0);
  const planStepGoal = safeNumber(plan.goalPlan.dailyStepGoal, stepGoal);
  const actualSteps = getStepsForDate(dateKey);
  const effectiveActualSteps = actualSteps === null ? planStepGoal : actualSteps;
  const expectedStepCalories = estimateStepCalories(profile.userProfile, planStepGoal);
  const actualStepCalories = estimateStepCalories(profile.userProfile, effectiveActualSteps);
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
    expectedBudget,
    actualBudget,
  };
}

function renderApp() {
  const profile = getActiveProfile();
  const plan = getActivePlan();
  const entries = getEntriesForDate(selectedDateKey);
  const total = entries.reduce((sum, entry) => sum + entry.calories, 0);
  const dayBudget = calculateDayBudget(selectedDateKey);
  const target = plan.metabolicPlan.manualOverrideEnabled
    ? safeNumber(plan.metabolicPlan.manualOverrideCalories, dayBudget.actualBudget)
    : dayBudget.actualBudget;
  const remaining = Math.max(target - total, 0);
  const percent = target > 0 ? (total / target) * 100 : 0;
  const projection = calculateProjection();
  const dayDiff = total - dayBudget.actualBudget;
  const stepDiff = dayBudget.actualStepCalories - dayBudget.expectedStepCalories;

  elements.activeProfileLabel.textContent = `Profile: ${profile.name}`;
  elements.activePlanLabel.textContent = `Plan: ${plan.name}`;
  elements.goalValue.textContent = formatCalories(target);
  elements.todayValue.textContent = formatCalories(total);
  elements.remainingValue.textContent = formatCalories(remaining);
  elements.topMeal.textContent = getTopMeal(entries);
  elements.bmrValue.textContent = formatCalories(plan.metabolicPlan.bmr);
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
  elements.projectionValue.textContent = projection.date
    ? `${projection.label} (${formatDateLabel(projection.date)})`
    : projection.label;
  elements.selectedDate.value = selectedDateKey;
  elements.selectedDateLabel.textContent = `Showing entries for ${formatDateLabel(selectedDateKey)}`;
  elements.recommendationMeta.textContent = plan.metabolicPlan.manualOverrideEnabled
    ? `Override active: ${formatCalories(plan.metabolicPlan.manualOverrideCalories)} cal/day. Recommended ${formatCalories(
        dayBudget.actualBudget
      )} cal/day.`
    : `Expected ${formatCalories(dayBudget.expectedBudget)} cal · Actual ${formatCalories(
        dayBudget.actualBudget
      )} cal · Steps ${Math.round(dayBudget.actualSteps)}/${Math.round(dayBudget.stepGoal)}`;
  if (!plan.metabolicPlan.manualOverrideEnabled && dayBudget.actualBudget < dayBudget.floor) {
    elements.recommendationMeta.textContent += ` · Floor recommendation: ${formatCalories(dayBudget.floor)} cal`;
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
          <p>${escapeHtml(entry.notes || "No notes")}</p>
        </div>`;
      })
      .join("");
  }

  const weights = [...profile.weights].sort((a, b) => (a.date < b.date ? 1 : -1));
  elements.weightHistory.innerHTML = weights.length
    ? weights
        .slice(0, 12)
        .map(
          (entry) =>
            `<div class="history-row"><strong>${formatDateLabel(entry.date)}</strong><span>${formatWeightLbs(
              entry.weightLbs
            )}</span></div>`
        )
        .join("")
    : '<div class="history-row"><strong>No weigh-ins yet.</strong><span>Add one above.</span></div>';

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
  elements.editFood.value = entry.food;
  elements.editMeal.value = entry.meal;
  elements.editCalories.value = entry.calories;
  elements.editTime.value = entry.time || "";
  elements.editNotes.value = entry.notes || "";
  elements.modal.showModal();
}

function closeEdit() {
  elements.modal.close();
  editingId = null;
  editingDateKey = null;
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
  createProfile(name);
  elements.setupNewProfileName.value = "";
  renderSetupFlow();
});
elements.setupDeleteProfile.addEventListener("click", () => {
  deleteActiveProfile();
  renderSetupFlow();
});
elements.setupProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const profile = getActiveProfile();
  profile.name = elements.setupProfileForm.querySelector("#setup-profile-name").value.trim() || "My Profile";
  profile.userProfile = {
    ...profile.userProfile,
    sex: elements.setupProfileForm.querySelector("#setup-profile-sex").value,
    age: safeNumber(elements.setupProfileForm.querySelector("#setup-profile-age").value),
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
  createPlan(name);
  elements.setupNewPlanName.value = "";
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

elements.entryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const entry = {
    id: crypto.randomUUID(),
    food: elements.entryForm.querySelector("#food-name").value.trim(),
    meal: elements.entryForm.querySelector("#meal").value,
    calories: safeNumber(elements.entryForm.querySelector("#calories").value, 0),
    time: elements.entryForm.querySelector("#time").value,
    notes: elements.entryForm.querySelector("#notes").value.trim(),
  };
  if (!entry.food || !Number.isFinite(entry.calories) || entry.calories < 0) return;
  addEntry(selectedDateKey, entry);
  elements.entryForm.reset();
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
    meal: "Snack",
    calories,
    time: "",
    notes: "Quick add",
  });
  renderApp();
});

elements.resetDay.addEventListener("click", () => {
  if (!confirm(`Clear all entries for ${selectedDateKey}?`)) return;
  setEntriesForDate(selectedDateKey, []);
  renderApp();
});

elements.filters.forEach((button) => button.addEventListener("click", () => setFilter(button.dataset.meal)));
elements.selectedDate.addEventListener("change", () => {
  selectedDateKey = elements.selectedDate.value || todayKey();
  renderApp();
});
elements.datePrev.addEventListener("click", () => {
  selectedDateKey = shiftDate(selectedDateKey, -1);
  renderApp();
});
elements.dateNext.addEventListener("click", () => {
  selectedDateKey = shiftDate(selectedDateKey, 1);
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
  updateEntry(editingDateKey, editingId, {
    food: elements.editFood.value.trim(),
    meal: elements.editMeal.value,
    calories: safeNumber(elements.editCalories.value, 0),
    time: elements.editTime.value,
    notes: elements.editNotes.value.trim(),
  });
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
