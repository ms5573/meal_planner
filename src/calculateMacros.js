const calculateMacros = (weight, height, activityLevel, gender, exerciseFrequency, fitnessGoal, macroRatio) => {
  const age = 25; // Assumed age
  
  // Calculate BMR
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Adjust activity level based on exercise frequency
  let adjustedActivityLevel = parseFloat(activityLevel);
  
  if (exerciseFrequency >= 1 && exerciseFrequency <= 2) {
    adjustedActivityLevel += 0.1;
  } else if (exerciseFrequency >= 3 && exerciseFrequency <= 4) {
    adjustedActivityLevel += 0.2;
  } else if (exerciseFrequency >= 5 && exerciseFrequency <= 6) {
    adjustedActivityLevel += 0.3;
  } else if (exerciseFrequency === 7) {
    adjustedActivityLevel += 0.4;
  }

  // Ensure adjustedActivityLevel doesn't exceed the maximum value
  adjustedActivityLevel = Math.min(adjustedActivityLevel, 1.9);

  // Calculate TDEE
  const tdee = bmr * adjustedActivityLevel;

  // Adjust TDEE based on fitness goal
  let adjustedCalories = tdee;
  if (fitnessGoal === 'weight-loss') {
    adjustedCalories = tdee - 500; // 500 kcal deficit
  } else if (fitnessGoal === 'muscle-gain') {
    adjustedCalories = tdee + 250; // 250 kcal surplus
  }
  // For maintenance, TDEE remains unchanged

  // Set macro ratios
  let macroPercentages = { protein: 0.3, carbs: 0.4, fat: 0.3 }; // Default balanced
  if (macroRatio === 'high-protein') {
    macroPercentages = { protein: 0.4, carbs: 0.4, fat: 0.2 };
  } else if (macroRatio === 'low-carb') {
    macroPercentages = { protein: 0.3, carbs: 0.3, fat: 0.4 };
  }

  // Calculate macros
  const proteinCalories = adjustedCalories * macroPercentages.protein;
  const carbCalories = adjustedCalories * macroPercentages.carbs;
  const fatCalories = adjustedCalories * macroPercentages.fat;

  const proteinGrams = proteinCalories / 4;
  const carbGrams = carbCalories / 4;
  const fatGrams = fatCalories / 9;

  return {
    calories: Math.round(adjustedCalories),
    protein: Math.round(proteinGrams),
    carbs: Math.round(carbGrams),
    fat: Math.round(fatGrams),
  };
};

export default calculateMacros;