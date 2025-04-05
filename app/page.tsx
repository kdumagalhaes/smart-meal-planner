"use client";

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <Link href="/preferences">
            <p className="text-muted-foreground">
              Set your dietary preferences and restrictions
            </p>
          </Link>

          <Link href="/meals">
            <p className="text-muted-foreground">
              Get meal suggestions based on your preferences
            </p>
          </Link>

          <Link href="/schedule">
            <p className="text-muted-foreground">
              View and manage your meal schedule
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
