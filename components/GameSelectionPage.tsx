"use client";
import React, { useState } from "react";
import TicTacToe from "./games/TicTacToe";
import SnakeGame from "./games/SnakeGame";
import MemoryMatch from "./games/MemoryMatch";
import CatchGame from "./games/CatchGame";
import PuzzleGame from "./games/PuzzleGame";

// Theme Definition
const DEFAULT_THEMES = {
  classic: {
    backgroundColor: "#FFFFFF",
    primaryColor: "#3498db",
    secondaryColor: "#2ecc71",
    textColor: "#333333",
  },
  valentines: {
    backgroundColor: "#FFE4E1",
    primaryColor: "#FF69B4",
    secondaryColor: "#FF1493",
    textColor: "#8B008B",
  },
  dark: {
    backgroundColor: "#121212",
    primaryColor: "#BB86FC",
    secondaryColor: "#03DAC6",
    textColor: "#FFFFFF",
  },
};

// Placeholder Game Components (to be replaced with actual component imports)

const GameSelectionPage: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState("classic");

  const games = [
    { name: "Snake", component: SnakeGame },
    { name: "Tic-Tac-Toe", component: TicTacToe },
    { name: "Memory Match", component: MemoryMatch },
    { name: "Catch", component: CatchGame },
    { name: "Puzzle", component: PuzzleGame },
  ];

  const renderGameSelection = () => {
    const theme = DEFAULT_THEMES[selectedTheme as keyof typeof DEFAULT_THEMES];

    return (
      <div
        style={{
          backgroundColor: theme.backgroundColor,
          minHeight: "100vh",
          color: theme.textColor,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <h1>Game Selection</h1>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginRight: "10px", color: theme.textColor }}>
            Theme:
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              style={{
                backgroundColor: theme.primaryColor,
                color: theme.backgroundColor,
                border: "none",
                padding: "5px",
                marginLeft: "10px",
              }}
            >
              {Object.keys(DEFAULT_THEMES).map((themeName) => (
                <option key={themeName} value={themeName}>
                  {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            maxWidth: "800px",
          }}
        >
          {games.map((game) => (
            <button
              key={game.name}
              onClick={() => setSelectedGame(game.name)}
              style={{
                backgroundColor: theme.primaryColor,
                color: theme.backgroundColor,
                border: "none",
                padding: "15px",
                borderRadius: "10px",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
            >
              {game.name}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderSelectedGame = () => {
    const GameComponent = games.find((g) => g.name === selectedGame)?.component;

    return GameComponent ? (
      <div>
        <button
          onClick={() => setSelectedGame(null)}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            padding: "10px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Back to Games
        </button>
        <GameComponent />
      </div>
    ) : null;
  };

  return selectedGame ? renderSelectedGame() : renderGameSelection();
};

export default GameSelectionPage;
