"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PreferencesPage() {
  const router = useRouter();
  const [preferences, setPreferences] = useState({
    calories: [2000],
    restrictions: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      nutFree: false,
    },
    mealTimes: {
      breakfast: "08:00",
      lunch: "13:00",
      dinner: "19:00",
    },
  });

  useEffect(() => {
    const savedCalories = localStorage.getItem("calories");
    const savedRestrictions = localStorage.getItem("restrictions");
    const savedMealTimes = localStorage.getItem("mealTimes");

    if (savedCalories) {
      setPreferences((prev) => ({
        ...prev,
        calories: [parseInt(savedCalories)],
      }));
    }
    if (savedRestrictions) {
      setPreferences((prev) => ({
        ...prev,
        restrictions: JSON.parse(savedRestrictions),
      }));
    }
    if (savedMealTimes) {
      setPreferences((prev) => ({
        ...prev,
        mealTimes: JSON.parse(savedMealTimes),
      }));
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("calories", preferences.calories[0].toString());
    localStorage.setItem(
      "restrictions",
      JSON.stringify(preferences.restrictions)
    );
    localStorage.setItem("mealTimes", JSON.stringify(preferences.mealTimes));

    router.push("/meals");
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

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dietary Preferences</h1>

        <form onSubmit={handleSave}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Daily Calorie Target</CardTitle>
            </CardHeader>
            <CardContent>
              <Slider
                value={preferences.calories}
                onValueChange={(value) =>
                  setPreferences((prev) => ({ ...prev, calories: value }))
                }
                min={1000}
                max={4000}
                step={50}
                className="w-full"
              />
              <p className="text-center text-sm text-muted-foreground mt-2">
                Target: {preferences.calories[0]} calories per day
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Dietary Restrictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(preferences.restrictions).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between"
                    >
                      <Label htmlFor={key} className="capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </Label>
                      <Switch
                        id={key}
                        checked={value}
                        onCheckedChange={(checked) =>
                          setPreferences((prev) => ({
                            ...prev,
                            restrictions: {
                              ...prev.restrictions,
                              [key]: checked,
                            },
                          }))
                        }
                      />
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Preferred Meal Times</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(preferences.mealTimes).map(([meal, time]) => (
                  <div key={meal} className="flex items-center gap-4">
                    <Label htmlFor={meal} className="w-24 capitalize">
                      {meal}
                    </Label>
                    <Input
                      id={meal}
                      type="time"
                      value={time}
                      onChange={(e) =>
                        setPreferences((prev) => ({
                          ...prev,
                          mealTimes: {
                            ...prev.mealTimes,
                            [meal]: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Save Preferences
          </Button>
        </form>
      </div>
    </div>
  );
}
