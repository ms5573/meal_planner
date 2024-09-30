import foodDatabase from './foodDatabase';

// Utility function to shuffle an array
const shuffleArray = (array) => {
  array.sort(() => Math.random() - 0.5);
};

// Utility function to calculate the difference between current and target macros
const getMacrosDifference = (current, target) => {
  return {
    calories: target.calories - current.calories,
    protein: target.protein - current.protein,
    fat: target.fat - current.fat,
    carbs: target.carbs - current.carbs,
  };
};

// Function to score a food based on how closely it matches the remaining macros
const getFoodScore = (food, remainingMacros) => {
  const calorieWeight = 1;
  const proteinWeight = 1;
  const fatWeight = 1;
  const carbWeight = 1;

  const fullPortionMacros = {
    calories: food.calories,
    protein: food.protein,
    fat: food.fat,
    carbs: food.carbs,
  };

  const halfPortionMacros = {
    calories: food.calories / 2,
    protein: food.protein / 2,
    fat: food.fat / 2,
    carbs: food.carbs / 2,
  };

  const fullPortionScore =
    calorieWeight * Math.abs(fullPortionMacros.calories - remainingMacros.calories) +
    proteinWeight * Math.abs(fullPortionMacros.protein - remainingMacros.protein) +
    fatWeight * Math.abs(fullPortionMacros.fat - remainingMacros.fat) +
    carbWeight * Math.abs(fullPortionMacros.carbs - remainingMacros.carbs);

  const halfPortionScore =
    calorieWeight * Math.abs(halfPortionMacros.calories - remainingMacros.calories) +
    proteinWeight * Math.abs(halfPortionMacros.protein - remainingMacros.protein) +
    fatWeight * Math.abs(halfPortionMacros.fat - remainingMacros.fat) +
    carbWeight * Math.abs(halfPortionMacros.carbs - remainingMacros.carbs);

  return fullPortionScore <= halfPortionScore
    ? { score: fullPortionScore, factor: 1 }
    : { score: halfPortionScore, factor: 0.5 };
};

// Function to generate a meal based on the target macros for that meal
const generateMeal = (
  targetMealMacros,
  isLastMeal = false,
  usedFoods,
  availableFoods,
  maxFoodsPerMeal = 3
) => {
  let mealMacros = { calories: 0, protein: 0, fat: 0, carbs: 0 };
  let mealFoods = [];
  let iterations = 0;
  const maxIterations = 10;

  // Separate available foods into unused and used
  let unusedFoods = availableFoods.filter((food) => !usedFoods.includes(food.name));
  let foodsToConsider = unusedFoods.length > 0 ? unusedFoods : availableFoods;

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

    // Shuffle foods for randomness
    shuffleArray(foodsToConsider);

    for (let food of foodsToConsider) {
      if (mealFoods.find((item) => item.name === food.name)) continue;

      const { score, factor } = getFoodScore(food, remainingMacros);

      if (score < bestScore) {
        bestScore = score;
        bestFood = food;
        bestFactor = factor;
      }
    }

    if (!bestFood) break;

    const adjustedFood = {
      ...bestFood,
      servingSize: bestFood.servingSize * bestFactor,
      calories: Math.round(bestFood.calories * bestFactor),
      protein: Math.round(bestFood.protein * bestFactor * 10) / 10,
      fat: Math.round(bestFood.fat * bestFactor * 10) / 10,
      carbs: Math.round(bestFood.carbs * bestFactor * 10) / 10,
      isHalfPortion: bestFactor === 0.5,
      originalServingSize: bestFood.servingSize,
    };

    const newMealMacros = {
      calories: mealMacros.calories + adjustedFood.calories,
      protein: mealMacros.protein + adjustedFood.protein,
      fat: mealMacros.fat + adjustedFood.fat,
      carbs: mealMacros.carbs + adjustedFood.carbs,
    };

    if (newMealMacros.calories > targetMealMacros.calories * 1.05 && mealFoods.length > 0) {
      break;
    }

    mealFoods.push(adjustedFood);
    mealMacros = newMealMacros;

    if (!isLastMeal && !usedFoods.includes(bestFood.name)) {
      usedFoods.push(bestFood.name);
      unusedFoods = availableFoods.filter((food) => !usedFoods.includes(food.name));
      foodsToConsider = unusedFoods.length > 0 ? unusedFoods : availableFoods;
    }

    iterations++;
  }

  return { foods: mealFoods, totalMacros: mealMacros };
};

// Generate the meal plan for 7 days
const generateMealPlan = (
  targetMacros,
  perMealMacros,
  mealsPerDay,
  selectedFoodSources,
  dietaryRestrictions = [],
  avoidFoods = [],
  cuisinePreferences = []
) => {
  try {
    const weekPlan = [];
    const usedFoods = []; // Global usedFoods array to track used foods across all meals

    // Filter foods based on selected sources, dietary restrictions, avoid foods, and cuisine preferences
    const filteredFoodDatabase = foodDatabase.filter((food) => {
      if (!selectedFoodSources.includes(food.source) && food.source !== "Transparent Labs") return false;
      if (dietaryRestrictions.includes('vegetarian') && !food.isVegetarian) return false;
      if (dietaryRestrictions.includes('vegan') && !food.isVegan) return false;
      if (dietaryRestrictions.includes('gluten-free') && !food.isGlutenFree) return false;
      if (dietaryRestrictions.includes('dairy-free') && !food.isDairyFree) return false;
      if (avoidFoods.includes(food.name.toLowerCase())) return false;
      if (cuisinePreferences.length > 0 && !cuisinePreferences.includes(food.cuisine) && food.cuisine !== "Supplement") return false;
      return true;
    });

    if (filteredFoodDatabase.length === 0) {
      throw new Error("No foods match the selected criteria");
    }

    // Group foods by source
    const foodsBySource = {};
    filteredFoodDatabase.forEach((food) => {
      if (!foodsBySource[food.source]) {
        foodsBySource[food.source] = [];
      }
      foodsBySource[food.source].push(food);
    });

    // Exclude 'Transparent Labs' from sources to prevent the protein shake from being a main meal
    const sources = Object.keys(foodsBySource).filter(source => source !== 'Transparent Labs');

    if (sources.length === 0) {
      throw new Error("No valid food sources available");
    }

    // Add Protein Shake to the filtered database
    const proteinShake = foodDatabase.find(
      (food) => food.name === "Protein Shake: Transparent Labs Whey Protein Isolate"
    );
    if (proteinShake) {
      filteredFoodDatabase.push(proteinShake);
      if (!foodsBySource["Transparent Labs"]) {
        foodsBySource["Transparent Labs"] = [];
      }
      foodsBySource["Transparent Labs"].push(proteinShake);
    }

    // Generate the meal plan for 7 days
    for (let day = 0; day < 7; day++) {
      const meals = [];
      let dailyMacros = { calories: 0, protein: 0, fat: 0, carbs: 0 };

      // Shuffle the sources for randomness
      shuffleArray(sources);

      for (let mealNum = 0; mealNum < mealsPerDay; mealNum++) {
        const isLastMeal = mealNum === mealsPerDay - 1;
        let mealTargetMacros = isLastMeal
          ? getMacrosDifference(dailyMacros, targetMacros)
          : perMealMacros;

        mealTargetMacros = {
          calories: Math.max(mealTargetMacros.calories, 0),
          protein: Math.max(mealTargetMacros.protein, 0),
          fat: Math.max(mealTargetMacros.fat, 0),
          carbs: Math.max(mealTargetMacros.carbs, 0),
        };

        const source = sources[mealNum % sources.length];
        const availableFoods = [...foodsBySource[source]];

        // Shuffle available foods for randomness
        shuffleArray(availableFoods);

        const meal = generateMeal(mealTargetMacros, isLastMeal, usedFoods, availableFoods);
        meals.push({ ...meal, source });

        dailyMacros.calories += meal.totalMacros.calories;
        dailyMacros.protein += meal.totalMacros.protein;
        dailyMacros.fat += meal.totalMacros.fat;
        dailyMacros.carbs += meal.totalMacros.carbs;
      }

      // Check if protein target is not met and add the protein shake as a snack
      const proteinDeficit = targetMacros.protein - dailyMacros.protein;
      if (proteinDeficit > 20 && proteinShake) { // Add shake if more than 20g protein deficit
        const numShakes = Math.min(Math.floor(proteinDeficit / proteinShake.protein), 2); // Max 2 shakes
        for (let i = 0; i < numShakes; i++) {
          const snackMeal = {
            foods: [{ ...proteinShake, isSnack: true }],
            totalMacros: {
              calories: proteinShake.calories,
              protein: proteinShake.protein,
              fat: proteinShake.fat,
              carbs: proteinShake.carbs
            },
            source: "Transparent Labs",
            isSnack: true
          };
          meals.push(snackMeal);
          dailyMacros.calories += proteinShake.calories;
          dailyMacros.protein += proteinShake.protein;
          dailyMacros.fat += proteinShake.fat;
          dailyMacros.carbs += proteinShake.carbs;
        }
      }

      weekPlan.push({ meals, actualMacros: dailyMacros });
    }

    return weekPlan;
  } catch (error) {
    console.error("Error in generateMealPlan:", error);
    throw new Error("Failed to generate meal plan: " + error.message);
  }
};

export default generateMealPlan;
