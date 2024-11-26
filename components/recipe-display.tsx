import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GlassWater, Lightbulb, RefreshCw } from "lucide-react";
import Image from "next/image";

interface Recipe {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  garnish: string;
  glassware: string;
  tips: string[];
  substitutions: string[];
  imageUrl?: string;
}

interface RecipeDisplayProps {
  recipe: Recipe | null;
}

export function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  if (!recipe) {
    return (
      <Card className="p-6">
        <div className="h-full flex items-center justify-center text-center p-8">
          <p className="text-muted-foreground">
            Your AI-generated cocktail recipe will appear here. Input your ingredients and preferences to get started!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-6">
          {recipe.imageUrl && (
            <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
              <Image
                src={recipe.imageUrl}
                alt={recipe.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold mb-2">{recipe.name}</h2>
            <p className="text-muted-foreground">{recipe.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <GlassWater className="h-5 w-5" />
              Ingredients
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Instructions</h3>
            <ol className="list-decimal list-inside space-y-2">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="pl-2">{step}</li>
              ))}
            </ol>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-1">Garnish</h4>
              <p className="text-muted-foreground">{recipe.garnish}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Glassware</h4>
              <p className="text-muted-foreground">{recipe.glassware}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Pro Tips
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {recipe.tips.map((tip, index) => (
                <li key={index} className="text-muted-foreground">{tip}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Possible Substitutions
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {recipe.substitutions.map((sub, index) => (
                <li key={index} className="text-muted-foreground">{sub}</li>
              ))}
            </ul>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}
