"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Utensils } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMealSuggestion } from "../services/meals";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MealRecord, MealTime } from "./constants/meals-constants";
import MealTabs from "./ui/meal-tabs/meal-tabs";

export default function MealsPage() {
  const hour = new Date().getHours();
  const [loading, setLoading] = useState(false);
  const [meal, setMeal] = useState<MealRecord | null>(null);
  const [mealTime, setMealTime] = useState<MealTime | null>(null);

  const generateMealSuggestion = async (mealTime: MealTime) => {
    setMealTime(mealTime);
    setLoading(true);
    try {
      const mealsPerTime = await getMealSuggestion();
      setMeal(mealsPerTime);
    } catch (error) {
      console.error("Error generating meal:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hour >= 5 && hour < 11) generateMealSuggestion(MealTime.BREAKFAST);
    else if (hour >= 11 && hour < 16) generateMealSuggestion(MealTime.LUNCH);
    else if (hour >= 16 && hour < 22) generateMealSuggestion(MealTime.DINNER);
    else generateMealSuggestion(MealTime.SNACK);
  }, [hour]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-primary hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Meal Suggestions</h1>
        </div>
        <MealTabs meal={meal} mealTime={mealTime} isLoading={loading} />
      </div>
    </div>
  );
}
