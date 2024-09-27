const combinedFoodDatabase = [
  // Subway items
  {
    name: "Buffalo Chicken",
    servingSize: 259,
    calories: 430,
    fat: 16,
    carbs: 45,
    protein: 27,
    source: "Subway",
    cuisine: "American",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    ingredients: ["Chicken", "Buffalo Sauce", "Bread", "Cheese", "Lettuce"]
  },
  {
    name: "Buffalo Chicken Melt",
    servingSize: 252,
    calories: 500,
    fat: 23,
    carbs: 45,
    protein: 31,
    source: "Subway",
    cuisine: "American",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    ingredients: ["Chicken", "Buffalo Sauce", "Bread", "Cheese", "Lettuce"]
  },
  {
    name: "Chicken & Bacon Ranch",
    servingSize: 262,
    calories: 580,
    fat: 29,
    carbs: 44,
    protein: 35,
    source: "Subway",
    cuisine: "American",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    ingredients: ["Chicken", "Bacon", "Ranch Sauce", "Bread", "Cheese"]
  },
  {
    name: "Chicken & Bacon Ranch Melt",
    servingSize: 254,
    calories: 620,
    fat: 32,
    carbs: 43,
    protein: 39,
    source: "Subway",
    cuisine: "American",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    ingredients: ["Chicken", "Bacon", "Ranch Sauce", "Bread", "Cheese"]
  },
  {
    name: "Chicken Mango Curry",
    servingSize: 240,
    calories: 350,
    fat: 7,
    carbs: 48,
    protein: 25,
    source: "Subway",
    cuisine: "Asian",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    ingredients: ["Chicken", "Mango", "Curry Sauce", "Bread", "Lettuce"]
  },
  {
    name: "Chicken Tikka",
    servingSize: 211,
    calories: 320,
    fat: 5,
    carbs: 44,
    protein: 25,
    source: "Subway",
    cuisine: "Asian",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    ingredients: ["Chicken", "Tikka Sauce", "Bread", "Lettuce", "Tomato"]
  },
  {
    name: "Chicken Vindaloo",
    servingSize: 240,
    calories: 360,
    fat: 9,
    carbs: 46,
    protein: 25,
    source: "Subway",
    cuisine: "Asian",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    ingredients: ["Chicken", "Vindaloo Sauce", "Bread", "Lettuce", "Tomato"]
  },
  // Add the rest of the Subway items here...
  
  // Chipotle items
{
    name: "High-Protein Burrito for Muscle Gain",
    servingSize: 970, // approximate total weight in grams
    calories: 1460,
    fat: 67,
    carbs: 129,
    protein: 84,
    source: "Custom Burrito",
    cuisine: "Mexican",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    ingredients: [
      "Tortilla",
      "Chicken",
      "Steak",
      "White Rice",
      "Black Beans",
      "Cheese",
      "Sour Cream",
      "Guacamole",
      "Fajita Veggies"
    ]
  },
  {
    name: "Vegetarian Burrito for Weight Loss",
    servingSize: 600, // approximate total weight in grams
    calories: 520,
    fat: 19,
    carbs: 69,
    protein: 17,
    source: "Custom Burrito",
    cuisine: "Mexican",
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: true,
    ingredients: [
      "Tortilla",
      "Sofritas",
      "No Rice",
      "No Beans",
      "Fajita Veggies",
      "Fresh Tomato Salsa",
      "Romaine Lettuce"
    ]
  },
  {
    name: "Balanced Burrito for Maintenance",
    servingSize: 800, // approximate total weight in grams
    calories: 970,
    fat: 32,
    carbs: 115,
    protein: 50,
    source: "Custom Burrito",
    cuisine: "Mexican",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    ingredients: [
      "Tortilla",
      "Beef Barbacoa",
      "Brown Rice",
      "Pinto Beans",
      "Cheese",
      "Fresh Tomato Salsa",
      "Romaine Lettuce"
    ]
  },
  {
    name: "Vegan Burrito",
    servingSize: 850, // approximate total weight in grams
    calories: 1140,
    fat: 51,
    carbs: 146,
    protein: 34,
    source: "Custom Burrito",
    cuisine: "Mexican",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
    isDairyFree: true,
    ingredients: [
      "Tortilla",
      "Sofritas",
      "Brown Rice",
      "Black Beans",
      "Fajita Veggies",
      "Roasted Chili-Corn Salsa",
      "Guacamole"
    ]
  },
  {
    name: "Low-Carb Burrito Bowl for Weight Loss",
    servingSize: 500, // approximate total weight in grams
    calories: 335,
    fat: 13,
    carbs: 13,
    protein: 54,
    source: "Custom Burrito",
    cuisine: "Mexican",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: true,
    ingredients: [
      "No Tortilla",
      "Chicken",
      "No Rice",
      "No Beans",
      "Fajita Veggies",
      "Tomatillo-Red Chili Salsa",
      "Romaine Lettuce",
      "Extra Chicken"
    ]
  },
  {
    name: "Gluten-Free Burrito",
    servingSize: 750, // approximate total weight in grams
    calories: 1015,
    fat: 59,
    carbs: 90,
    protein: 43,
    source: "Custom Burrito",
    cuisine: "Mexican",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true, // Assuming corn tortilla is used
    isDairyFree: false,
    ingredients: [
      "Corn Tortilla",
      "Carnitas",
      "White Rice",
      "Pinto Beans",
      "Cheese",
      "Tomatillo-Green Chili Salsa",
      "Guacamole"
    ]
  },
  {
    name: "Chicken Burrito Bowl",
    servingSize: 510,
    calories: 510,
    fat: 17.5,
    carbs: 40,
    protein: 50,
    source: "Chipotle",
    cuisine: "Mexican",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: true,
    ingredients: ["Chicken", "Rice", "Beans", "Salsa", "Lettuce"]
  },
  {
    name: "Steak Burrito Bowl",
    servingSize: 480,
    calories: 480,
    fat: 16.5,
    carbs: 41,
    protein: 39,
    source: "Chipotle",
    cuisine: "Mexican",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: true,
    ingredients: ["Steak", "Rice", "Beans", "Salsa", "Lettuce"]
  },
  {
    name: "Barbacoa Burrito Bowl",
    servingSize: 500,
    calories: 500,
    fat: 17.5,
    carbs: 42,
    protein: 42,
    source: "Chipotle",
    cuisine: "Mexican",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: true,
    ingredients: ["Barbacoa", "Rice", "Beans", "Salsa", "Lettuce"]
  },
  {
    name: "Low Carb Chicken Burrito Bowl",
    servingSize: 370,
    calories: 370,
    fat: 16,
    carbs: 18,
    protein: 42,
    source: "Chipotle",
    cuisine: "Mexican",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: true,
    ingredients: ["Chicken", "Lettuce", "Salsa", "Guacamole"]
  },
  {
    name: "Chicken Salad",
    servingSize: 490,
    calories: 490,
    fat: 11,
    carbs: 57,
    protein: 48,
    source: "Chipotle",
    cuisine: "Mexican",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: true,
    ingredients: ["Chicken", "Lettuce", "Beans", "Salsa", "Guacamole"]
  },

  {
    name: "Chicken Barbacoa Market Bowl",
    servingSize: 400,
    calories: 400,
    fat: 23,
    carbs: 33,
    protein: 19,
    source: "Just Salad",
    cuisine: "American",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: true,
    ingredients: ["Chicken", "Barbacoa Sauce", "Rice", "Beans", "Lettuce"]
  },
  {
    name: "Forager's Warm Bowl",
    servingSize: 630,
    calories: 630,
    fat: 29,
    carbs: 79,
    protein: 25,
    source: "Just Salad",
    cuisine: "American",
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    ingredients: ["Quinoa", "Sweet Potatoes", "Mushrooms", "Kale", "Cheese"]
  },
  {
    name: "Keto Zoodle Bowl",
    servingSize: 440,
    calories: 440,
    fat: 32,
    carbs: 14,
    protein: 34,
    source: "Just Salad",
    cuisine: "American",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: true,
    ingredients: ["Zoodles", "Chicken", "Almonds", "Avocado", "Dressing"]
  },
  {
    name: "Buffalo Chicken Wrap",
    servingSize: 560,
    calories: 560,
    fat: 21,
    carbs: 61,
    protein: 34,
    source: "Just Salad",
    cuisine: "American",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    ingredients: ["Chicken", "Buffalo Sauce", "Tortilla", "Cheese", "Lettuce"]
  },
  {
    name: "Spicy Chicken Caesar Wrap",
    servingSize: 570,
    calories: 570,
    fat: 20,
    carbs: 62,
    protein: 38,
    source: "Just Salad",
    cuisine: "American",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    ingredients: ["Chicken", "Caesar Dressing", "Tortilla", "Cheese", "Lettuce"]
  },
  {
    name: "Avo Blast Toast",
    servingSize: 450,
    calories: 450,
    fat: 27,
    carbs: 51,
    protein: 8,
    source: "Just Salad",
    cuisine: "American",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
    isDairyFree: true,
    ingredients: ["Avocado", "Bread", "Chili Flakes", "Olive Oil", "Salt"]
  },
  {
    name: "Peanut Butter Warrior Smoothie",
    servingSize: 300,
    calories: 300,
    fat: 7,
    carbs: 55,
    protein: 37,
    source: "Just Salad",
    cuisine: "American",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isDairyFree: true,
    ingredients: ["Peanut Butter", "Banana", "Almond Milk", "Protein Powder"]
  },

  // Panera Bread items
  {
  name: "Greek Yogurt Parfait with Mixed Berries",
  servingSize: 250,
  calories: 250,
  fat: 6,
  carbs: 36,
  protein: 14,
  source: "Panera Bread",
  cuisine: "American",
  isVegetarian: true,
  isVegan: false,
  isGlutenFree: false,
  isDairyFree: false,
  ingredients: ["Greek Yogurt", "Mixed Berries", "Granola"]
  },
  {
  name: "Asiago Cheese Bagel",
  servingSize: 330,
  calories: 330,
  fat: 6,
  carbs: 55,
  protein: 13,
  source: "Panera Bread",
  cuisine: "American",
  isVegetarian: true,
  isVegan: false,
  isGlutenFree: false,
  isDairyFree: false,
  ingredients: ["Bagel", "Asiago Cheese"]
  },
  {
  name: "Plain Bagel",
  servingSize: 280,
  calories: 280,
  fat: 1.5,
  carbs: 58,
  protein: 9,
  source: "Panera Bread",
  cuisine: "American",
  isVegetarian: true,
  isVegan: true,
  isGlutenFree: false,
  isDairyFree: true,
  ingredients: ["Bagel"]
  },
  {
  name: "Sprouted Grain Bagel Flat",
  servingSize: 180,
  calories: 180,
  fat: 2,
  carbs: 34,
  protein: 8,
  source: "Panera Bread",
  cuisine: "American",
  isVegetarian: true,
  isVegan: true,
  isGlutenFree: false,
  isDairyFree: true,
  ingredients: ["Sprouted Grain Bagel"]
  },
  {
  name: "Cinnamon Crunch Bagel",
  servingSize: 430,
  calories: 430,
  fat: 7,
  carbs: 82,
  protein: 10,
  source: "Panera Bread",
  cuisine: "American",
  isVegetarian: true,
  isVegan: false,
  isGlutenFree: false,
  isDairyFree: false,
  ingredients: ["Bagel", "Cinnamon", "Crunch Topping"]
  },
  {
  name: "French Baguette",
  servingSize: 57,
  calories: 180,
  fat: 1,
  carbs: 36,
  protein: 6,
  source: "Panera Bread",
  cuisine: "French",
  isVegetarian: true,
  isVegan: true,
  isGlutenFree: false,
  isDairyFree: true,
  ingredients: ["Flour", "Water", "Yeast", "Salt"]
  },
  {
  name: "Potato Chips",
  servingSize: 28,
  calories: 150,
  fat: 8,
  carbs: 17,
  protein: 2,
  source: "Panera Bread",
  cuisine: "American",
  isVegetarian: true,
  isVegan: true,
  isGlutenFree: true,
  isDairyFree: true,
  ingredients: ["Potatoes", "Oil", "Salt"]
  },

  // Cava items
  {
    name: "Grilled Chicken",
    servingSize: 85,
    calories: 250,
    fat: 13,
    carbs: 1,
    protein: 27,
    source: "Cava",
    cuisine: "Mediterranean",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: true,
    ingredients: ["Chicken", "Olive Oil", "Spices"]
  },
  {
    name: "Greek Salad Bowl",
    servingSize: 1,
    calories: 400,
    fat: 30,
    carbs: 20,
    protein: 10,
    source: "Cava",
    cuisine: "Mediterranean",
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: false,
    ingredients: ["Lettuce", "Cucumbers", "Tomatoes", "Feta Cheese", "Olives"]
  },
  {
    name: "Spicy Lamb Meatballs",
    servingSize: 1,
    calories: 300,
    fat: 20,
    carbs: 5,
    protein: 20,
    source: "Cava",
    cuisine: "Mediterranean",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: true,
    ingredients: ["Lamb", "Spices", "Herbs", "Olive Oil"]
  },
  {
    name: "Side Pita",
    servingSize: 1,
    calories: 200,
    fat: 5,
    carbs: 35,
    protein: 6,
    source: "Cava",
    cuisine: "Mediterranean",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
    isDairyFree: true,
    ingredients: ["Flour", "Water", "Yeast", "Salt"]
  },
  {
    name: "Organic Traditional Hummus",
    servingSize: 28,
    calories: 70,
    fat: 6,
    carbs: 4,
    protein: 2,
    source: "Cava",
    cuisine: "Mediterranean",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isDairyFree: true,
    ingredients: ["Chickpeas", "Olive Oil", "Garlic", "Lemon", "Tahini"]
  }
];

export default combinedFoodDatabase;
