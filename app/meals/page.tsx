"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Utensils } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMealSuggestion, Meal } from "../services/meals";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

enum MealTime {
  BREAKFAST = "breakfast",
  LUNCH = "lunch",
  SNACK = "snack",
  DINNER = "dinner",
}

export default function MealsPage() {
  const hour = new Date().getHours();
  const [loading, setLoading] = useState(false);
  const [meal, setMeal] = useState<Record<string, Meal[]> | null>(null);
  const [mealTime, setMealTime] = useState<MealTime>(MealTime.SNACK);

  useEffect(() => {
    if (hour >= 5 && hour < 11) generateMealSuggestion(MealTime.BREAKFAST);
    else if (hour >= 11 && hour < 16) generateMealSuggestion(MealTime.LUNCH);
    else if (hour >= 16 && hour < 22) generateMealSuggestion(MealTime.DINNER);
    else generateMealSuggestion(MealTime.SNACK);
  }, [hour]);

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
        <Tabs defaultValue={mealTime} className="mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
            <TabsTrigger value="lunch">Lunch</TabsTrigger>
            <TabsTrigger value="snack">Snack</TabsTrigger>
            <TabsTrigger value="dinner">Dinner</TabsTrigger>
          </TabsList>
          {loading ? (
            <div className="mx-auto my-12 flex gap-4 align-middle">
              <Utensils className="w-4 h-4 mr-2 animate-spin" />
              <h2>Generating...</h2>
            </div>
          ) : (
            <>
              <TabsContent value="breakfast">
                {meal !== null && meal["breakfast"] && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{meal["breakfast"][0].name}</span>
                        <span className="text-muted-foreground text-sm">
                          {meal["breakfast"][0].calories} cal
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-2">Ingredients</h3>
                          <ul className="list-disc list-inside text-muted-foreground">
                            {meal["breakfast"][0].ingredients.map(
                              (ingredient, i) => (
                                <li key={i}>{ingredient}</li>
                              )
                            )}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">
                            Nutritional Info
                          </h3>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Protein
                              </p>
                              <p className="font-semibold">
                                {meal["breakfast"][0].nutritionalInfo.protein}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Carbs
                              </p>
                              <p className="font-semibold">
                                {meal["breakfast"][0].nutritionalInfo.carbs}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Fats
                              </p>
                              <p className="font-semibold">
                                {meal["breakfast"][0].nutritionalInfo.fats}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <h3 className="font-semibold mb-2">Instructions</h3>
                        <p className="text-muted-foreground">
                          {meal["breakfast"][0].instructions}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              <TabsContent value="lunch">
                {meal !== null && meal["lunch"] && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{meal["lunch"][0].name}</span>
                        <span className="text-muted-foreground text-sm">
                          {meal["lunch"][0].calories} cal
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-2">Ingredients</h3>
                          <ul className="list-disc list-inside text-muted-foreground">
                            {meal["lunch"][0].ingredients.map(
                              (ingredient, i) => (
                                <li key={i}>{ingredient}</li>
                              )
                            )}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">
                            Nutritional Info
                          </h3>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Protein
                              </p>
                              <p className="font-semibold">
                                {meal["lunch"][0].nutritionalInfo.protein}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Carbs
                              </p>
                              <p className="font-semibold">
                                {meal["lunch"][0].nutritionalInfo.carbs}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Fats
                              </p>
                              <p className="font-semibold">
                                {meal["lunch"][0].nutritionalInfo.fats}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <h3 className="font-semibold mb-2">Instructions</h3>
                        <p className="text-muted-foreground">
                          {meal["lunch"][0].instructions}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              <TabsContent value="snack">
                {meal !== null && meal["snack"] && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{meal["snack"][0].name}</span>
                        <span className="text-muted-foreground text-sm">
                          {meal["snack"][0].calories} cal
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-2">Ingredients</h3>
                          <ul className="list-disc list-inside text-muted-foreground">
                            {meal["snack"][0].ingredients.map(
                              (ingredient, i) => (
                                <li key={i}>{ingredient}</li>
                              )
                            )}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">
                            Nutritional Info
                          </h3>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Protein
                              </p>
                              <p className="font-semibold">
                                {meal["snack"][0].nutritionalInfo.protein}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Carbs
                              </p>
                              <p className="font-semibold">
                                {meal["snack"][0].nutritionalInfo.carbs}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Fats
                              </p>
                              <p className="font-semibold">
                                {meal["snack"][0].nutritionalInfo.fats}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <h3 className="font-semibold mb-2">Instructions</h3>
                        <p className="text-muted-foreground">
                          {meal["snack"][0].instructions}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              <TabsContent value="dinner">
                {meal !== null && meal["dinner"] && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{meal["dinner"][0].name}</span>
                        <span className="text-muted-foreground text-sm">
                          {meal["dinner"][0].calories} cal
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-2">Ingredients</h3>
                          <ul className="list-disc list-inside text-muted-foreground">
                            {meal["dinner"][0].ingredients.map(
                              (ingredient, i) => (
                                <li key={i}>{ingredient}</li>
                              )
                            )}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">
                            Nutritional Info
                          </h3>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Protein
                              </p>
                              <p className="font-semibold">
                                {meal["dinner"][0].nutritionalInfo.protein}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Carbs
                              </p>
                              <p className="font-semibold">
                                {meal["dinner"][0].nutritionalInfo.carbs}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Fats
                              </p>
                              <p className="font-semibold">
                                {meal["dinner"][0].nutritionalInfo.fats}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <h3 className="font-semibold mb-2">Instructions</h3>
                        <p className="text-muted-foreground">
                          {meal["dinner"][0].instructions}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
}
