const combinedFoodDatabase = [
  // Subway items
  {
    name: "Buffalo Chicken",
    servingSize: 259,
    calories: 430,
    fat: 16,
    carbs: 45,
    protein: 27,
    source: "Subway"
  },
  {
    name: "Buffalo Chicken Melt",
    servingSize: 252,
    calories: 500,
    fat: 23,
    carbs: 45,
    protein: 31,
    source: "Subway"
  },
  {
    name: "Chicken & Bacon Ranch",
    servingSize: 262,
    calories: 580,
    fat: 29,
    carbs: 44,
    protein: 35,
    source: "Subway"
  },
  {
    name: "Chicken & Bacon Ranch Melt",
    servingSize: 254,
    calories: 620,
    fat: 32,
    carbs: 43,
    protein: 39,
    source: "Subway"
  },
  {
    name: "Chicken Mango Curry",
    servingSize: 240,
    calories: 350,
    fat: 7,
    carbs: 48,
    protein: 25,
    source: "Subway"
  },
  {
    name: "Chicken Tikka",
    servingSize: 211,
    calories: 320,
    fat: 5,
    carbs: 44,
    protein: 25,
    source: "Subway"
  },
  {
    name: "Chicken Vindaloo",
    servingSize: 240,
    calories: 360,
    fat: 9,
    carbs: 46,
    protein: 25,
    source: "Subway"
  },
  // Add the rest of the Subway items here...
  
  // Chipotle items
  {
    name: "Chicken Burrito Bowl",
    servingSize: 510,
    calories: 510,
    fat: 17.5,
    carbs: 40,
    protein: 50,
    source: "Chipotle"
  },
  {
    name: "Steak Burrito Bowl",
    servingSize: 480,
    calories: 480,
    fat: 16.5,
    carbs: 41,
    protein: 39,
    source: "Chipotle"
  },
  {
    name: "Barbacoa Burrito Bowl",
    servingSize: 500,
    calories: 500,
    fat: 17.5,
    carbs: 42,
    protein: 42,
    source: "Chipotle"
  },
  {
    name: "Low Carb Chicken Burrito Bowl",
    servingSize: 370,
    calories: 370,
    fat: 16,
    carbs: 18,
    protein: 42,
    source: "Chipotle"
  },
  {
    name: "Chicken Salad",
    servingSize: 490,
    calories: 490,
    fat: 11,
    carbs: 57,
    protein: 48,
    source: "Chipotle"
  },

  // Just Salad items
  {
    name: "Chicken Barbacoa Market Bowl",
    servingSize: 400,
    calories: 400,
    fat: 23,
    carbs: 33,
    protein: 19,
    source: "Just Salad"
  },
  {
    name: "Forager's Warm Bowl",
    servingSize: 630,
    calories: 630,
    fat: 29,
    carbs: 79,
    protein: 25,
    source: "Just Salad"
  },
  {
    name: "Keto Zoodle Bowl",
    servingSize: 440,
    calories: 440,
    fat: 32,
    carbs: 14,
    protein: 34,
    source: "Just Salad"
  },
  {
    name: "Buffalo Chicken Wrap",
    servingSize: 560,
    calories: 560,
    fat: 21,
    carbs: 61,
    protein: 34,
    source: "Just Salad"
  },
  {
    name: "Spicy Chicken Caesar Wrap",
    servingSize: 570,
    calories: 570,
    fat: 20,
    carbs: 62,
    protein: 38,
    source: "Just Salad"
  },
  {
    name: "Avo Blast Toast",
    servingSize: 450,
    calories: 450,
    fat: 27,
    carbs: 51,
    protein: 8,
    source: "Just Salad"
  },
  {
    name: "Peanut Butter Warrior Smoothie",
    servingSize: 300,
    calories: 300,
    fat: 7,
    carbs: 55,
    protein: 37,
    source: "Just Salad"
  },

  // Panera Bread items
  {
    name: "Avocado, Egg White & Spinach Sandwich",
    servingSize: 350,
    calories: 350,
    fat: 14,
    carbs: 39,
    protein: 19,
    source: "Panera Bread"
  },
  {
    name: "Greek Yogurt Parfait with Mixed Berries",
    servingSize: 240,
    calories: 240,
    fat: 0,
    carbs: 0,
    protein: 0,
    source: "Panera Bread"
  },
  {
    name: "Steel Cut Oatmeal with Strawberries & Pecans",
    servingSize: 370,
    calories: 370,
    fat: 14,
    carbs: 52,
    protein: 8,
    source: "Panera Bread"
  },
  {
    name: "Asiago Cheese Bagel",
    servingSize: 320,
    calories: 320,
    fat: 0,
    carbs: 0,
    protein: 0,
    source: "Panera Bread"
  },
  {
    name: "Plain Bagel",
    servingSize: 280,
    calories: 280,
    fat: 0,
    carbs: 0,
    protein: 0,
    source: "Panera Bread"
  },
  {
    name: "Sprouted Grain Bagel Flat",
    servingSize: 180,
    calories: 180,
    fat: 0,
    carbs: 0,
    protein: 0,
    source: "Panera Bread"
  },
  {
    name: "Cinnamon Crunch Bagel",
    servingSize: 430,
    calories: 430,
    fat: 0,
    carbs: 0,
    protein: 0,
    source: "Panera Bread"
  },
  {
    name: "French Baguette",
    servingSize: 57,
    calories: 150,
    fat: 0,
    carbs: 30,
    protein: 5,
    source: "Panera Bread"
  },
  {
    name: "Potato Chips",
    servingSize: 28,
    calories: 150,
    fat: 8,
    carbs: 17,
    protein: 2,
    source: "Panera Bread"
  },

  // Cava items
  {
    name: "Grilled Chicken",
    servingSize: 85,
    calories: 250,
    fat: 13,
    carbs: 1,
    protein: 27,
    source: "Cava"
  },
  {
    name: "Greek Salad Bowl",
    servingSize: 1,
    calories: 400,
    fat: 30,
    carbs: 20,
    protein: 10,
    source: "Cava"
  },
  {
    name: "Spicy Lamb Meatballs",
    servingSize: 1,
    calories: 300,
    fat: 20,
    carbs: 5,
    protein: 20,
    source: "Cava"
  },
  {
    name: "Side Pita",
    servingSize: 1,
    calories: 200,
    fat: 5,
    carbs: 35,
    protein: 6,
    source: "Cava"
  },
  {
    name: "Organic Traditional Hummus",
    servingSize: 28,
    calories: 70,
    fat: 6,
    carbs: 4,
    protein: 2,
    source: "Cava"
  }
];

export default combinedFoodDatabase;
