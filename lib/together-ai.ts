import Together from 'together-ai';

if (!process.env.TOGETHER_API_KEY) {
  throw new Error("Missing TOGETHER_API_KEY environment variable");
}

const together = new Together();

export { together };

export async function generateRandomIngredients(isMocktail: boolean = false) {
  const prompt = `You are a skilled bartender. Generate a list of 2-4 ingredients that would work well together in a ${isMocktail ? 'mocktail (non-alcoholic cocktail)' : 'cocktail'}.

${isMocktail 
    ? 'Only include non-alcoholic ingredients like juices, syrups, sodas, herbs, spices, etc.' 
    : 'Include at least one base spirit (like vodka, gin, rum, etc.) and complementary mixers, liqueurs, or other ingredients.'}

Respond with ONLY the ingredients as a comma-separated list, with no additional text or explanation. For example:
gin, lime juice, elderflower syrup, mint leaves`;

  const response = await together.chat.completions.create({
    model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
    messages: [
      { role: 'system', content: 'You are a skilled bartender. Respond only with ingredients list.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.9,
    max_tokens: 100
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response content received from AI");
  }

  // Clean up the response to ensure it's just a comma-separated list
  return content.trim().split('\n')[0].trim();
}

export async function generateCocktailImage(name: string, description: string, isMocktail: boolean = false) {
  const drinkType = isMocktail ? "mocktail (non-alcoholic cocktail)" : "cocktail";
  const prompt = `A professional, appetizing photograph of a ${drinkType} called "${name}". ${description}. The image should be well-lit, showing the drink in an appropriate glass with garnishes, photographed in a high-end bar or restaurant setting. Professional food photography style, high resolution, detailed.`;

  const response = await together.images.create({
    prompt,
    model: "black-forest-labs/FLUX.1-schnell",
    steps: 8,
    height: 1024,
    width: 1024,
  });

  // @ts-ignore - the together-ai types are incomplete
  return response.data[0].url;
}

export async function generateCocktailRecipe(
  ingredients: string,
  sweetness: number,
  strength: number,
  isMocktail: boolean = false,
  notes?: string
) {
  const drinkType = isMocktail ? "mocktail (non-alcoholic cocktail)" : "cocktail";
  const prompt = `You are a skilled bartender. Create a unique ${drinkType} recipe based on these ingredients: ${ingredients}.
The drink should have:
- Sweetness level: ${sweetness}/100
${!isMocktail ? `- Strength level: ${strength}/100` : ''}
- Additional notes: ${notes || "None"}

You must respond with ONLY a valid JSON object in this exact format, with no additional text or explanation. For instructions, do not include numbers at the start - they will be automatically numbered when displayed:
{
  "name": "${drinkType} name",
  "description": "Brief backstory or description",
  "ingredients": ["List", "of", "ingredients"],
  "instructions": ["In a shaker, muddle mint leaves", "Add vodka and juice", "etc"],
  "garnish": "Garnish details",
  "glassware": "Recommended glass",
  "tips": ["Preparation tip 1", "Tip 2"],
  "substitutions": ["Possible substitution 1", "Substitution 2"]
}`;

  const response = await together.chat.completions.create({
    model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
    messages: [
      { role: 'system', content: 'You are a skilled bartender. Always respond with valid JSON only. For instructions, do not include numbers at the start of each step - they will be automatically numbered when displayed.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7,
    max_tokens: 1000
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response content received from AI");
  }

  try {
    // Try to extract JSON if it's wrapped in any text
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON object found in response");
    }
    const jsonStr = jsonMatch[0];
    const recipe = JSON.parse(jsonStr);

    // Validate the required fields
    const requiredFields = ['name', 'description', 'ingredients', 'instructions', 'garnish', 'glassware', 'tips', 'substitutions'];
    for (const field of requiredFields) {
      if (!(field in recipe)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Clean up any instructions that might still have numbers at the start
    recipe.instructions = recipe.instructions.map((instruction: string) => 
      instruction.replace(/^\d+\.\s*/, '')
    );

    return recipe;
  } catch (error) {
    console.error("Parse error:", error, "Response:", content);
    throw new Error("Failed to parse AI response");
  }
}
