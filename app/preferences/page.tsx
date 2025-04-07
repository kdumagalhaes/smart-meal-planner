"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";
import PreferencesButton from "./ui/preferences-button/preferences-button";
import { Input } from "@/components/ui/input";

export default function PreferencesPage() {
  const router = useRouter();
  const [isPushingRoute, setIsPushingRoute] = useState(false);
  const [preferences, setPreferences] = useState({
    calories: [1000],
    restrictions: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      nutFree: false,
      diabetic: false,
      others: "",
    },
  });

  const { others, ...restrictionsWithoutOthers } = preferences.restrictions;

  useEffect(() => {
    const savedCalories = localStorage.getItem("calories");
    const savedRestrictions = localStorage.getItem("restrictions");

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
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("calories", preferences.calories[0].toString());
    localStorage.setItem(
      "restrictions",
      JSON.stringify(preferences.restrictions)
    );

    toast.success("Your preferences has been saved!");
    setIsPushingRoute(true);
    setTimeout(() => {
      router.push("/meals");
      setIsPushingRoute(false);
    }, 2500);
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
                {Object.entries(restrictionsWithoutOthers).map(
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
                        checked={!!value}
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
              <Label className="capitalize mb-3 mt-4">Others:</Label>
              <Input
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    restrictions: {
                      ...prev.restrictions,
                      others: e.target.value,
                    },
                  }))
                }
                type="text"
                value={others}
                placeholder="Add specific restrictions like 'no sugar', 'low carb', etc..."
              />
            </CardContent>
          </Card>

          <PreferencesButton isPushingRoute={isPushingRoute} />
        </form>
      </div>
      <Toaster />
    </div>
  );
}
