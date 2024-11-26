import { GlassWater } from "lucide-react";

export function Header() {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-2 mb-4">
        <GlassWater className="h-12 w-12 text-primary" />
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
          MixMaster AI
        </h1>
      </div>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Your personal AI bartender. Input your ingredients and preferences, and let our AI craft the perfect cocktail recipe just for you.
      </p>
    </header>
  );
}