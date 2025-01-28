"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import ThemeSelector from "./ThemeSelector";
import GameSelector from "./GameSelector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SnakeGame from "../games/SnakeGame";
import TicTacToe from "../games/TicTacToe";
import CatchGame from "../games/CatchGame";
import MemoryMatch from "../games/MemoryMatch";
import PuzzleGame from "../games/PuzzleGame";
import { createClient } from "@/utils/supabase/client";

const DEFAULT_THEMES = {
  Valentines: {
    backgroundColor: "#FFC0CB",
    textColor: "#8B0000",
    fontFamily: "'Dancing Script', cursive",
    primaryColor: "#FF69B4",
    secondaryColor: "#FFD1DC",
    decorativeEmoji: "💝",
  },
  Cute: {
    backgroundColor: "#FFFAF0",
    textColor: "#FF69B4",
    fontFamily: "'Comic Sans MS', cursive",
    primaryColor: "#FFD700",
    secondaryColor: "#FFA07A",
    decorativeEmoji: "🌸",
  },
  Birthday: {
    backgroundColor: "#FFF8DC",
    textColor: "#8A2BE2",
    fontFamily: "'Fredoka One', sans-serif",
    primaryColor: "#FF4500",
    secondaryColor: "#FFD700",
    decorativeEmoji: "🎂",
  },
  Retro: {
    backgroundColor: "#2E2E2E",
    textColor: "#FFD700",
    fontFamily: "'Press Start 2P', cursive",
    primaryColor: "#FF6347",
    secondaryColor: "#40E0D0",
    decorativeEmoji: "👾",
  },
  Futuristic: {
    backgroundColor: "#000000",
    textColor: "#FFFFFF",
    fontFamily: "'Orbitron', sans-serif",
    primaryColor: "#00FFFF",
    secondaryColor: "#FF00FF",
    decorativeEmoji: "🤖",
  },
  Funky: {
    backgroundColor: "#FF4500",
    textColor: "#FFFFFF",
    fontFamily: "'Pacifico', cursive",
    primaryColor: "#32CD32",
    secondaryColor: "#FFD700",
    decorativeEmoji: "🎵",
  },
  "Dark Gothic": {
    backgroundColor: "#1C1C1C",
    textColor: "#8B0000",
    fontFamily: "'Old English Text MT', serif",
    primaryColor: "#4B0082",
    secondaryColor: "#696969",
    decorativeEmoji: "🦇",
  },
  Oceanic: {
    backgroundColor: "#1E3A5F",
    textColor: "#FFFFFF",
    fontFamily: "'Montserrat', sans-serif",
    primaryColor: "#00CED1",
    secondaryColor: "#4682B4",
    decorativeEmoji: "🌊",
  },
  "Neon Cyberpunk": {
    backgroundColor: "#0D0221",
    textColor: "#FFFFFF",
    fontFamily: "'Orbitron', sans-serif",
    primaryColor: "#FF00FF",
    secondaryColor: "#00FFFF",
    decorativeEmoji: "⚡",
  },
  "Fairy Tale": {
    backgroundColor: "#FFF0F5",
    textColor: "#8B008B",
    fontFamily: "'Caveat', cursive",
    primaryColor: "#FFD700",
    secondaryColor: "#FF69B4",
    decorativeEmoji: "🧚",
  },
  Minimalist: {
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    fontFamily: "'Roboto', sans-serif",
    primaryColor: "#808080",
    secondaryColor: "#D3D3D3",
    decorativeEmoji: "◻️",
  },
  "Jungle Adventure": {
    backgroundColor: "#013220",
    textColor: "#F5F5DC",
    fontFamily: "'Indie Flower', cursive",
    primaryColor: "#228B22",
    secondaryColor: "#8B4513",
    decorativeEmoji: "🌴",
  },
  "Space Galaxy": {
    backgroundColor: "#000033",
    textColor: "#FFFFFF",
    fontFamily: "'Audiowide', sans-serif",
    primaryColor: "#800080",
    secondaryColor: "#FFD700",
    decorativeEmoji: "🌠",
  },
  Christmas: {
    backgroundColor: "#006400",
    textColor: "#FFFFFF",
    fontFamily: "'Raleway', sans-serif",
    primaryColor: "#FF0000",
    secondaryColor: "#FFD700",
    decorativeEmoji: "🎄",
  },
  "Vintage Paper": {
    backgroundColor: "#F5DEB3",
    textColor: "#5C4033",
    fontFamily: "'Playfair Display', serif",
    primaryColor: "#8B4513",
    secondaryColor: "#D2B48C",
    decorativeEmoji: "📜",
  },
};

const games = [
  { name: "Snake", emoji: "🐍" },
  { name: "Tic Tac Toe", emoji: "❌⭕" },
  { name: "Catch Game", emoji: "🎯" },
  { name: "Match Making", emoji: "🔄" },
  { name: "Puzzle Game", emoji: "🧩" },
];

export default function GameCreator() {
  const [selectedTheme, setSelectedTheme] =
    useState<keyof typeof DEFAULT_THEMES>("Minimalist");
  const [selectedGame, setSelectedGame] = useState(games[0]);
  const [customTheme, setCustomTheme] = useState(DEFAULT_THEMES[selectedTheme]);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [gameUrl, setGameUrl] = useState<string | null>(null);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [imageToEdit, setImageToEdit] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCustomTheme(DEFAULT_THEMES[selectedTheme]);
  }, [selectedTheme]);

  const handleThemeSelect = (theme: keyof typeof DEFAULT_THEMES) => {
    setSelectedTheme(theme);
    setIsCustomizationOpen(false);
  };

  const handleGameSelect = (game: (typeof games)[0]) => {
    setSelectedGame(game);
  };

  const handleCustomThemeChange = (
    field: keyof typeof customTheme,
    value: string
  ) => {
    setCustomTheme((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPreviewError(null);

    if (!file) {
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setPreviewError("Please select an image file");
      return;
    }

    // Validate file size (5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      setPreviewError("Image size must be less than 5MB");
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();

    reader.onloadstart = () => {
      setIsLoading(true);
    };

    reader.onloadend = () => {
      setIsLoading(false);
      setCustomImage(reader.result as string);
    };

    reader.onerror = () => {
      setIsLoading(false);
      setPreviewError("Error reading file");
    };

    reader.readAsDataURL(file);
  };

  const handleGenerateGame = async () => {
    try {
      const supabase = createClient();
      // Generate a random password for the game
      const gamePass = Math.random().toString(36).substr(2, 9);
      let imagePath = null;

      // If there's a custom image, upload it to storage first
      if (customImage) {
        const imageFile = await fetch(customImage).then((res) => res.blob());
        const fileExt = customImage.split(";")[0].split("/")[1];
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `game-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(filePath, imageFile, {
            contentType: `image/${fileExt}`,
          });

        if (uploadError) {
          throw uploadError;
        }

        imagePath = filePath;
      }

      // Insert game data into the games table with only the theme name
      const { error: insertError } = await supabase.from("games").insert({
        theme: selectedTheme,
        pass: gamePass,
        game: selectedGame.name,
        img: imagePath,
      });

      if (insertError) {
        throw insertError;
      }

      setGameUrl(`${window.location.origin}/play/${gamePass}`);
      setShowPreview(true);
    } catch (error) {
      console.error("Error creating game:", error);
      alert("Failed to create game. Please try again.");
    }
  };

  const handleCopyLink = () => {
    if (gameUrl) {
      navigator.clipboard.writeText(gameUrl);
      alert("Game link copied to clipboard!");
    }
  };

  const GamePreview = () => {
    const previewStyle = {
      backgroundColor: customTheme.backgroundColor,
      color: customTheme.textColor,
      fontFamily: customTheme.fontFamily,
      opacity: 0.8,
      border: `2px solid ${customTheme.primaryColor}`,
      borderRadius: "8px",
      padding: "20px",
      margin: "20px 0",
      position: "relative" as const,
    };

    const overlayStyle = {
      position: "absolute" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "transparent",
      cursor: "not-allowed",
      zIndex: 10,
    };

    const getGameComponent = () => {
      switch (selectedGame.name) {
        case "Snake":
          return (
            <div className="relative">
              <div style={overlayStyle}></div>
              <SnakeGame />
            </div>
          );
        case "Tic Tac Toe":
          return (
            <div className="relative">
              <div style={overlayStyle}></div>
              <TicTacToe />
            </div>
          );
        case "Catch Game":
          return (
            <div className="relative">
              <div style={overlayStyle}></div>
              <CatchGame />
            </div>
          );
        case "Match Making":
          return (
            <div className="relative">
              <div style={overlayStyle}></div>
              <MemoryMatch />
            </div>
          );
        case "Puzzle Game":
          return (
            <div className="relative">
              <div style={overlayStyle}></div>
              <PuzzleGame />
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div style={previewStyle}>
        <h3 className="text-xl font-semibold mb-4 text-center">Game Preview</h3>
        {getGameComponent()}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-2 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Craft Your Game
        </h1>
        <p className="text-lg text-muted-foreground">
          Create a personalized gaming experience in minutes
        </p>
      </div>

      <div className="space-y-12">
        <Card className="p-6">
          <div className="flex items-center mb-6">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
              1
            </div>
            <h2 className="ml-4 text-xl font-semibold text-foreground">
              Choose Your Theme
            </h2>
          </div>
          <ThemeSelector
            themes={DEFAULT_THEMES}
            selectedTheme={selectedTheme}
            onSelect={handleThemeSelect as (theme: string) => void}
          />
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-6">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
              2
            </div>
            <h2 className="ml-4 text-xl font-semibold text-foreground">
              Add Custom Image
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <Input
                type="file"
                id="custom-image"
                name="custom-image"
                accept="image/*"
                onChange={handleImageUpload}
                className="cursor-pointer"
                disabled={isLoading}
              />
              {isLoading && (
                <p className="text-sm text-muted-foreground">
                  Loading image...
                </p>
              )}
              {previewError && (
                <p className="text-sm text-red-500">{previewError}</p>
              )}
            </div>

            {customImage && !previewError && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                  <img
                    src={customImage}
                    alt="Custom game image"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-6">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
              3
            </div>
            <h2 className="ml-4 text-xl font-semibold text-foreground">
              Select Your Game
            </h2>
          </div>
          <GameSelector
            games={games}
            selectedGame={selectedGame}
            onSelect={handleGameSelect}
          />
        </Card>

        <div className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            onClick={handleGenerateGame}
            className="bg-primary hover:bg-primary/90"
          >
            Generate Game
          </Button>
          {gameUrl && (
            <Button
              size="lg"
              variant="outline"
              onClick={handleCopyLink}
              className="gap-2"
            >
              <span>Copy Game Link</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </Button>
          )}
          {showPreview && <GamePreview />}
        </div>
      </div>
    </div>
  );
}
