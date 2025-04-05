"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Meal {
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

export default function MealsPage() {
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
          <p className="text-muted-foreground"></p>
        </div>

        <div className="text-center mb-8"></div>
      </div>
    </div>
  );
}
