
export interface Meal {
  name: string;
  calories: number;
  ingredients: string[];
  instructions: string;
  nutritionalInfo: {
    protein: string;
    carbs: string;
    fats: string;
  };
}

export type MealRecord = Record<string, Meal[]> | null

export enum MealTime {
  BREAKFAST = "breakfast",
  LUNCH = "lunch",
  SNACK = "snack",
  DINNER = "dinner",
}
