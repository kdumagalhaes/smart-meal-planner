"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Utensils } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Smart Meal Planner</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get personalized meal suggestions based on your schedule, calorie
            goals, and dietary restrictions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <Link href="/preferences">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <Settings className="w-8 h-8 mb-2 text-primary" />
                <CardTitle>Set Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Set your dietary preferences and restrictions
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/meals">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <Utensils className="w-8 h-8 mb-2 text-primary" />
                <CardTitle>Get Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get meal suggestions based on your preferences
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
      <footer className="sticky top-[95vh] text-center text-[0.7rem]">
        Created by{" "}
        <a
          href="https://hellocarlos.me"
          target="_blank"
          className="hover:text-blue-400 text-blue-600"
        >
          Carlos Pereira
        </a>
      </footer>
    </main>
  );
}
