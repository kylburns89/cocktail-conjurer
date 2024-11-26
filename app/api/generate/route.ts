import { NextResponse } from "next/server";
import { generateCocktailRecipe, generateCocktailImage, generateRandomIngredients } from "@/lib/together-ai";

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ingredients, sweetness, strength, notes, random, isMocktail } = body;
    
    // If random is true, generate random ingredients and values using AI
    const finalIngredients = random 
      ? await generateRandomIngredients(isMocktail) 
      : ingredients;
      
    const finalSweetness = random ? Math.floor(Math.random() * 100) : sweetness;
    const finalStrength = isMocktail ? 0 : (random ? Math.floor(Math.random() * 100) : strength);

    if (!finalIngredients || typeof finalSweetness !== 'number' || (!isMocktail && typeof finalStrength !== 'number')) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const recipe = await generateCocktailRecipe(
      finalIngredients,
      finalSweetness,
      finalStrength,
      isMocktail,
      notes
    );

    // Generate an image for the cocktail
    const imageUrl = await generateCocktailImage(recipe.name, recipe.description, isMocktail);

    return NextResponse.json({
      ...recipe,
      imageUrl,
      // Include the generated values in case of random generation
      generatedValues: random ? {
        ingredients: finalIngredients,
        sweetness: finalSweetness,
        strength: finalStrength
      } : undefined
    });
  } catch (error) {
    console.error("Generation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate recipe";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
