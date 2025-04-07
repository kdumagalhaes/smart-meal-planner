"use client";

import {MealRecord } from "../meals/constants/meals-constants";

export const getMealSuggestion = async (): Promise<MealRecord> => {
  try {
    const calories = localStorage.getItem("calories") || "2000";
    const restrictions = localStorage.getItem("restrictions") || "{}";

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        calories: parseInt(calories),
        restrictions: Object.entries(JSON.parse(restrictions))
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, value]) => value === true)
          .map(([key]) => key)
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate meal suggestion');
    }

    const data = await response.json();
    console.log("data = ", data)
    return data; // API returns an array of meals, we take the first one
  } catch (error) {
    console.error('Error generating meal:', error);
    // Fallback to mock data if API fails
    return fallbackMealSuggestion();
  }
};

// Fallback mock data in case the API fails
const mockMeals: MealRecord = {
  breakfast: [
    {
      name: "Greek Yogurt Parfait",
      calories: 350,
      ingredients: [
        "Greek yogurt",
        "Mixed berries",
        "Granola",
        "Honey",
        "Chia seeds"
      ],
      instructions: "Layer yogurt, berries, and granola in a bowl. Top with honey and chia seeds.",
      nutritionalInfo: {
        protein: "20g",
        carbs: "45g",
        fats: "12g"
      }
    },
    {
      name: "Avocado Toast with Eggs",
      calories: 420,
      ingredients: [
        "Whole grain bread",
        "Avocado",
        "Eggs",
        "Cherry tomatoes",
        "Red pepper flakes"
      ],
      instructions: "Toast bread, mash avocado and spread on toast. Top with poached eggs and tomatoes.",
      nutritionalInfo: {
        protein: "18g",
        carbs: "35g",
        fats: "28g"
      }
    }
  ],
  lunch: [
    {
      name: "Quinoa Buddha Bowl",
      calories: 550,
      ingredients: [
        "Quinoa",
        "Roasted chickpeas",
        "Sweet potato",
        "Kale",
        "Tahini dressing"
      ],
      instructions: "Combine cooked quinoa with roasted vegetables and chickpeas. Drizzle with tahini dressing.",
      nutritionalInfo: {
        protein: "22g",
        carbs: "82g",
        fats: "20g"
      }
    },
    {
      name: "Mediterranean Salad",
      calories: 480,
      ingredients: [
        "Mixed greens",
        "Grilled chicken",
        "Feta cheese",
        "Kalamata olives",
        "Cherry tomatoes"
      ],
      instructions: "Toss all ingredients with olive oil and balsamic vinegar.",
      nutritionalInfo: {
        protein: "35g",
        carbs: "25g",
        fats: "28g"
      }
    }
  ],
  dinner: [
    {
      name: "Grilled Salmon with Roasted Vegetables",
      calories: 620,
      ingredients: [
        "Salmon fillet",
        "Asparagus",
        "Brussels sprouts",
        "Quinoa",
        "Lemon"
      ],
      instructions: "Grill salmon and serve with roasted vegetables over quinoa. Finish with lemon.",
      nutritionalInfo: {
        protein: "42g",
        carbs: "45g",
        fats: "32g"
      }
    },
    {
      name: "Vegetarian Stir-Fry",
      calories: 480,
      ingredients: [
        "Tofu",
        "Brown rice",
        "Broccoli",
        "Bell peppers",
        "Snap peas"
      ],
      instructions: "Stir-fry tofu and vegetables, serve over brown rice with sauce.",
      nutritionalInfo: {
        protein: "25g",
        carbs: "65g",
        fats: "18g"
      }
    }
  ],
  snack: [
    {
      name: "Protein Energy Bites",
      calories: 180,
      ingredients: [
        "Dates",
        "Almonds",
        "Protein powder",
        "Dark chocolate chips",
        "Coconut flakes"
      ],
      instructions: "Blend ingredients in food processor, form into balls, and refrigerate.",
      nutritionalInfo: {
        protein: "8g",
        carbs: "22g",
        fats: "9g"
      }
    },
    {
      name: "Apple with Almond Butter",
      calories: 220,
      ingredients: [
        "Apple",
        "Almond butter",
        "Cinnamon",
        "Hemp seeds"
      ],
      instructions: "Slice apple and serve with almond butter. Sprinkle with cinnamon and hemp seeds.",
      nutritionalInfo: {
        protein: "6g",
        carbs: "25g",
        fats: "14g"
      }
    }
  ]
};

const fallbackMealSuggestion = (): MealRecord => {

  return mockMeals;
};
