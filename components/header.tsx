import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="mb-16 pt-8">
      <div className="container mx-auto px-4">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="text-center">
          <div className="flex flex-col items-center gap-8">
            <div className="transform transition-all hover:scale-105 duration-300 hover:rotate-2">
              <Image
                src="/wizard-logo.png"
                alt="Cocktail Conjurer Wizard"
                width={220}
                height={220}
                className="drop-shadow-xl"
                priority
              />
            </div>
            <div className="space-y-6">
              <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60 tracking-tight">
                Cocktail Conjurer
              </h1>
              <p className="text-xl text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed font-medium">
                Your personal AI bartender. Input your ingredients and preferences, and let our AI craft the perfect cocktail recipe just for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
