import { NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function POST(req: Request) {
  if (!GROQ_API_KEY) {
    return NextResponse.json(
      { error: 'Groq API key is not configured' },
      { status: 500 }
    );
  }

  try {
    const { calories, restrictions } = await req.json();

    if (!calories || !restrictions) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const prompt = `
    Act as a professional nutritionist and meal planner. Based on the following:
    
    - Daily Calorie Target: ${calories} calories
    - Dietary Restrictions: ${restrictions.join(', ')}
    
    Generate a full day meal plan split into:
    - breakfast (1 meal options)
    - lunch (1 meal options)
    - dinner (1 meal options)
    - snack (1 meal options)
    
    Each meal must include:
    - name (string)
    - calories (number)
    - ingredients (array of strings)
    - instructions (short string)
    - nutritionalInfo (object with protein, carbs, and fats as strings in grams)
    
    ⚠️ Respond ONLY with raw JSON. Do NOT include any explanation or extra text.  
    Use the following structure exactly:
    
    {
      "breakfast": [ /* 1 meals */ ],
      "lunch": [ /* 1 meals */ ],
      "dinner": [ /* 1 meals */ ],
      "snack": [ /* 1 meals */ ]
    }
    
    Ensure:
    - Each meal is realistic, nutritionally balanced, and respects all restrictions.
    - Calorie distribution is appropriate for a full day meal plan.
    - Macronutrient values (protein, carbs, fats) are included for each meal.
    `;
    

    
    const completion = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    const data = await completion.json();

    const response = data.choices?.[0]?.message?.content;

    if (!response) {
      throw new Error('No response from Groq API');
    }

    try {
      const parsedResponse = JSON.parse(response);
      const requiredKeys = ['breakfast', 'lunch', 'dinner', 'snack'];
      const isValidMealRecord = requiredKeys.every(key => Array.isArray(parsedResponse[key]));
      
      if (!isValidMealRecord) {
        throw new Error('Invalid response format');
      }
      
      return NextResponse.json(parsedResponse);
    } catch (parseError) {
      console.error('Error parsing Groq response:', parseError);
      return NextResponse.json(
        { error: 'Failed to parse meal suggestion' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error generating meal plan:', error);
    return NextResponse.json(
      { error: 'Failed to generate meal suggestion' },
      { status: 500 }
    );
  }
}
