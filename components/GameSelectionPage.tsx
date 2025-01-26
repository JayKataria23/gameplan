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
  neon: {
    backgroundColor: "#000000",
    primaryColor: "#00FF00",
    secondaryColor: "#FF00FF",
    textColor: "#FFFFFF",
  },
  pastel: {
    backgroundColor: "#F0F4F8",
    primaryColor: "#B5EAD7",
    secondaryColor: "#FFB7B2",
    textColor: "#666666",
  },
  halloween: {
    backgroundColor: "#1A1A1A",
    primaryColor: "#FF6B00",
    secondaryColor: "#8B00FF",
    textColor: "#FFFFFF",
  },
};

// Add theme interface
interface Theme {
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
}

// Placeholder Game Components (to be replaced with actual component imports)

const GameSelectionPage: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState("classic");
  const [customTheme, setCustomTheme] = useState<Theme | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);

  const games = [
    { name: "Snake", component: SnakeGame },
    { name: "Tic-Tac-Toe", component: TicTacToe },
    { name: "Memory Match", component: MemoryMatch },
    { name: "Catch", component: CatchGame },
    { name: "Puzzle", component: PuzzleGame },
  ];

  const renderThemeCustomizer = () => {
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          zIndex: 1000,
        }}
      >
        <h2>Customize Theme</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <label>Background Color:</label>
            <input
              type="color"
              value={customTheme?.backgroundColor || "#FFFFFF"}
              onChange={(e) =>
                setCustomTheme((prev) => ({
                  ...(prev as Theme),
                  backgroundColor: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Primary Color:</label>
            <input
              type="color"
              value={customTheme?.primaryColor || "#3498db"}
              onChange={(e) =>
                setCustomTheme((prev) => ({
                  ...(prev as Theme),
                  primaryColor: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Secondary Color:</label>
            <input
              type="color"
              value={customTheme?.secondaryColor || "#2ecc71"}
              onChange={(e) =>
                setCustomTheme((prev) => ({
                  ...(prev as Theme),
                  secondaryColor: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Text Color:</label>
            <input
              type="color"
              value={customTheme?.textColor || "#333333"}
              onChange={(e) =>
                setCustomTheme((prev) => ({
                  ...(prev as Theme),
                  textColor: e.target.value,
                }))
              }
            />
          </div>
          <button
            onClick={() => setIsCustomizing(false)}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
              marginTop: "10px",
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const renderGameSelection = () => {
    const theme =
      customTheme ||
      DEFAULT_THEMES[selectedTheme as keyof typeof DEFAULT_THEMES];

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
          <button
            onClick={() => {
              setCustomTheme(theme);
              setIsCustomizing(true);
            }}
            style={{
              backgroundColor: theme.primaryColor,
              color: theme.backgroundColor,
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              marginLeft: "10px",
              cursor: "pointer",
            }}
          >
            Customize Theme
          </button>
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

  return (
    <>
      {isCustomizing && renderThemeCustomizer()}
      {selectedGame ? renderSelectedGame() : renderGameSelection()}
    </>
  );
};

export default GameSelectionPage;
