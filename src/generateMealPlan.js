// generateMealPlan.js
import foodDatabase from './foodDatabase';

const generateMealPlan = (targetMacros, perMealMacros, mealsPerDay, selectedFoodSources) => {
  const meals = [];
  let dailyMacros = { calories: 0, protein: 0, fat: 0, carbs: 0 };

  // Filter foods by selected sources
  const filteredFoodDatabase = foodDatabase.filter(food => selectedFoodSources.includes(food.source));

  // Group foods by source
  const foodsBySource = {};
  filteredFoodDatabase.forEach(food => {
    if (!foodsBySource[food.source]) {
      foodsBySource[food.source] = [];
    }
    foodsBySource[food.source].push(food);
  });

  const sources = Object.keys(foodsBySource);

  const getMacrosDifference = (current, target) => {
    return {
      calories: target.calories - current.calories,
      protein: target.protein - current.protein,
      fat: target.fat - current.fat,
      carbs: target.carbs - current.carbs
    };
  };

  const getFoodScore = (food, remainingMacros) => {
    const calorieWeight = 1;
    const proteinWeight = 1;
    const fatWeight = 1;
    const carbWeight = 1;

    // Try full portion
    const fullPortionMacros = {
      calories: food.calories,
      protein: food.protein,
      fat: food.fat,
      carbs: food.carbs
    };
    const fullPortionScore = (
      calorieWeight * Math.abs(fullPortionMacros.calories - remainingMacros.calories) +
      proteinWeight * Math.abs(fullPortionMacros.protein - remainingMacros.protein) +
      fatWeight * Math.abs(fullPortionMacros.fat - remainingMacros.fat) +
      carbWeight * Math.abs(fullPortionMacros.carbs - remainingMacros.carbs)
    );

    // Try half portion
    const halfPortionMacros = {
      calories: food.calories / 2,
      protein: food.protein / 2,
      fat: food.fat / 2,
      carbs: food.carbs / 2
    };
    const halfPortionScore = (
      calorieWeight * Math.abs(halfPortionMacros.calories - remainingMacros.calories) +
      proteinWeight * Math.abs(halfPortionMacros.protein - remainingMacros.protein) +
      fatWeight * Math.abs(halfPortionMacros.fat - remainingMacros.fat) +
      carbWeight * Math.abs(halfPortionMacros.carbs - remainingMacros.carbs)
    );

    // Choose the portion with the better score
    if (fullPortionScore <= halfPortionScore) {
      return { score: fullPortionScore, factor: 1 };
    } else {
      return { score: halfPortionScore, factor: 0.5 };
    }
  };

  const generateMeal = (targetMealMacros, isLastMeal = false, usedFoods = [], availableFoods = [], maxFoodsPerMeal = 3) => {
    let mealMacros = { calories: 0, protein: 0, fat: 0, carbs: 0 };
    let mealFoods = [];
    const maxIterations = 10; // Prevent infinite loops
    let iterations = 0;

    while (
      (mealMacros.calories < targetMealMacros.calories * 0.95 ||
        mealMacros.protein < targetMealMacros.protein * 0.95 ||
        mealMacros.fat < targetMealMacros.fat * 0.95 ||
        mealMacros.carbs < targetMealMacros.carbs * 0.95) &&
      iterations < maxIterations &&
      mealFoods.length < maxFoodsPerMeal
    ) {
      const remainingMacros = getMacrosDifference(mealMacros, targetMealMacros);

      let bestFood = null;
      let bestScore = Infinity;
      let bestFactor = 1;

      for (let food of availableFoods) {
        if (!isLastMeal && usedFoods.includes(food.name)) continue;
        if (mealFoods.find(item => item.name === food.name)) continue; // Avoid duplicate foods in the same meal

        // Get the best portion (full or half) for this food
        const { score, factor } = getFoodScore(food, remainingMacros);

        if (score < bestScore) {
          bestScore = score;
          bestFood = food;
          bestFactor = factor;
        }
      }

      if (!bestFood) break;

      // Adjust serving size based on the factor (1 or 0.5)
      const adjustedFood = {
        ...bestFood,
        servingSize: bestFood.servingSize * bestFactor,
        calories: Math.round(bestFood.calories * bestFactor),
        protein: Math.round(bestFood.protein * bestFactor * 10) / 10,
        fat: Math.round(bestFood.fat * bestFactor * 10) / 10,
        carbs: Math.round(bestFood.carbs * bestFactor * 10) / 10,
        isHalfPortion: bestFactor === 0.5,
        // Include original values for display
        originalServingSize: bestFood.servingSize,
        originalCalories: bestFood.calories,
        originalProtein: bestFood.protein,
        originalFat: bestFood.fat,
        originalCarbs: bestFood.carbs
      };

      // Update meal macros tentatively
      const newMealMacros = {
        calories: mealMacros.calories + adjustedFood.calories,
        protein: mealMacros.protein + adjustedFood.protein,
        fat: mealMacros.fat + adjustedFood.fat,
        carbs: mealMacros.carbs + adjustedFood.carbs,
      };

      // Check if adding this food would significantly overshoot the target macros
      if (
        newMealMacros.calories > targetMealMacros.calories * 1.05 &&
        mealFoods.length > 0 // Ensure at least one food is added
      ) {
        break;
      }

      mealFoods.push(adjustedFood);
      mealMacros = newMealMacros;

      if (!isLastMeal) usedFoods.push(bestFood.name);
      iterations++;
    }

    // Ensure the meal is practical
    if (mealFoods.length === 0) {
      // If no foods were added, select the food closest to the target macros
      let bestFood = null;
      let bestScore = Infinity;
      let bestFactor = 1;

      for (let food of availableFoods) {
        const { score, factor } = getFoodScore(food, targetMealMacros);
        if (score < bestScore) {
          bestScore = score;
          bestFood = food;
          bestFactor = factor;
        }
      }

      if (bestFood) {
        const adjustedFood = {
          ...bestFood,
          servingSize: bestFood.servingSize * bestFactor,
          calories: Math.round(bestFood.calories * bestFactor),
          protein: Math.round(bestFood.protein * bestFactor * 10) / 10,
          fat: Math.round(bestFood.fat * bestFactor * 10) / 10,
          carbs: Math.round(bestFood.carbs * bestFactor * 10) / 10,
          isHalfPortion: bestFactor === 0.5,
          // Include original values for display
          originalServingSize: bestFood.servingSize,
          originalCalories: bestFood.calories,
          originalProtein: bestFood.protein,
          originalFat: bestFood.fat,
          originalCarbs: bestFood.carbs
        };

        mealFoods.push(adjustedFood);
        mealMacros = {
          calories: adjustedFood.calories,
          protein: adjustedFood.protein,
          fat: adjustedFood.fat,
          carbs: adjustedFood.carbs,
        };
      }
    }

    return { foods: mealFoods, totalMacros: mealMacros };
  };

  const usedFoods = [];

  for (let mealNum = 0; mealNum < mealsPerDay; mealNum++) {
    const isLastMeal = mealNum === mealsPerDay - 1;
    let mealTargetMacros = isLastMeal
      ? getMacrosDifference(dailyMacros, targetMacros)
      : perMealMacros;

    // Ensure target macros for the last meal are not negative
    mealTargetMacros = {
      calories: Math.max(mealTargetMacros.calories, 0),
      protein: Math.max(mealTargetMacros.protein, 0),
      fat: Math.max(mealTargetMacros.fat, 0),
      carbs: Math.max(mealTargetMacros.carbs, 0),
    };

    // Select source for this meal
    const source = sources[mealNum % sources.length];
    const availableFoods = foodsBySource[source];

    // Generate meal
    const meal = generateMeal(mealTargetMacros, isLastMeal, usedFoods, availableFoods);
    meals.push({ ...meal, source });

    dailyMacros.calories += meal.totalMacros.calories;
    dailyMacros.protein += meal.totalMacros.protein;
    dailyMacros.fat += meal.totalMacros.fat;
    dailyMacros.carbs += meal.totalMacros.carbs;
  }

  // No need for final adjustment as we're using only full or half portions

  return { meals, actualMacros: dailyMacros };
};

export default generateMealPlan;
