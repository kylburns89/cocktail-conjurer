import { CocktailGenerator } from "@/components/cocktail-generator";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <Header />
        <CocktailGenerator />
      </div>
    </main>
  );
}