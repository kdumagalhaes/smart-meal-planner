"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
          <p className="text-center text-sm text-muted-foreground mt-2">
            Target: {preferences.calories[0]} calories per day
          </p>
        </form>
      </div>
    </div>
  );
}
