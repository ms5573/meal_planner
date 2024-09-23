const calculateMacros = (weight, height, activityLevel, gender, exerciseFrequency) => {
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

  // Calculate total daily calories for muscle gain
  const totalDailyCalories = tdee + 500;

  // Calculate macronutrients
  const protein = weight * 2;
  const fat = Math.round((totalDailyCalories * 0.25) / 9);
  const carbs = Math.round((totalDailyCalories - (protein * 4 + fat * 9)) / 4);

  return {
    calories: Math.round(totalDailyCalories),
    protein,
    fat,
    carbs
  };
};

export default calculateMacros;