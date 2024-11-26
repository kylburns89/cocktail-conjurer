"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Loader2, Dice6 } from "lucide-react";
import { RecipeDisplay } from "./recipe-display";

const formSchema = z.object({
  ingredients: z.string().min(1, "Please enter at least one ingredient"),
  sweetness: z.number().min(0).max(100),
  strength: z.number().min(0).max(100),
  notes: z.string().optional(),
  isMocktail: z.boolean().default(false),
});

type Recipe = {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  garnish: string;
  glassware: string;
  tips: string[];
  substitutions: string[];
  imageUrl?: string;
  generatedValues?: {
    ingredients: string;
    sweetness: number;
    strength: number;
  };
};

export function CocktailGenerator() {
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredients: "",
      sweetness: 50,
      strength: 50,
      notes: "",
      isMocktail: false,
    },
  });

  const isMocktail = form.watch("isMocktail");

  async function generateRecipe(values: z.infer<typeof formSchema>, random: boolean = false) {
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, random }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate recipe");
      }

      const data = await response.json();
      setRecipe(data);
      
      // If it was a random generation, update the form with the generated values
      if (data.generatedValues) {
        form.setValue("ingredients", data.generatedValues.ingredients);
        form.setValue("sweetness", data.generatedValues.sweetness);
        if (!values.isMocktail) {
          form.setValue("strength", data.generatedValues.strength);
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate recipe. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => generateRecipe(values, false);
  const onRollDice = () => generateRecipe(form.getValues(), true);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="isMocktail"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Mocktail Mode</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Switch to generate non-alcoholic drinks
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Ingredients</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={isMocktail 
                        ? "Enter ingredients separated by commas (e.g., ginger beer, lime juice, mint leaves)"
                        : "Enter ingredients separated by commas (e.g., vodka, lime juice, mint leaves)"}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sweetness"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sweetness Level</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {!isMocktail && (
              <FormField
                control={form.control}
                name="strength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Strength Level</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any specific preferences or restrictions?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Recipe...
                  </>
                ) : (
                  `Generate ${isMocktail ? 'Mocktail' : 'Cocktail'} Recipe`
                )}
              </Button>

              <Button 
                type="button" 
                variant="secondary"
                onClick={() => onRollDice()}
                disabled={loading}
                className="flex-none gap-2"
              >
                <Dice6 className="h-4 w-4" />
                Roll the Dice
              </Button>
            </div>
          </form>
        </Form>
      </Card>

      <RecipeDisplay recipe={recipe} />
    </div>
  );
}
