import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Game {
  name: string;
  emoji: string;
}

interface GameSelectorProps {
  games: Game[];
  selectedGame: Game;
  onSelect: (game: Game) => void;
}

export default function GameSelector({
  games,
  selectedGame,
  onSelect,
}: GameSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {games.map((game) => (
        <Button
          key={game.name}
          variant="outline"
          onClick={() => onSelect(game)}
          className={cn(
            "h-auto aspect-square flex flex-col items-center justify-center gap-3 p-4 transition-all hover:scale-105",
            selectedGame.name === game.name
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "hover:bg-accent"
          )}
        >
          <span className="text-3xl">{game.emoji}</span>
          <span className="font-medium text-sm">{game.name}</span>
        </Button>
      ))}
    </div>
  );
}
