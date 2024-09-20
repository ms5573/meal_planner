const calculateMacros = (weight, height, activityLevel, gender) => {
  const age = 25; // Assumed age
  
  // Calculate BMR
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Calculate TDEE
  const tdee = bmr * parseFloat(activityLevel);

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