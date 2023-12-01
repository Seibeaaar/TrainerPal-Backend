export const WORKOUT_ENUMS = {
  site: ["online", "offline"],
  accessMode: ["private", "public"],
  scheduleStatus: ["pending", "accepted", "declined", "amendment"],
};

export const USER_ENUMS = {
  preferredSite: ["online", "offline"],
  role: ["coach", "trainee"],
};

export const TRAINEE_ENUMS = {
  activityLevel: ["sedentary", "moderate", "vigorous", "extreme"],
  primaryTarget: ["weightLoss", "muscle", "endurance", "recovery", "strength"],
};

export const COACH_ENUMS = {
  field: ["bodybuilding", "strongman", "powerlifting", "yoga", "crossfit"],
};

// Only for pairs like offline-online
export const toggleValue = (currentValue: string, values: string[]) => {
  return values.find((v) => v !== currentValue);
};
