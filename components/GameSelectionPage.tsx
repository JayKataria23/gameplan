"use client";
import React, { useState, createContext } from "react";
import TicTacToe from "./games/TicTacToe";
import SnakeGame from "./games/SnakeGame";
import MemoryMatch from "./games/MemoryMatch";
import CatchGame from "./games/CatchGame";
import PuzzleGame from "./games/PuzzleGame";

// Add theme interface
interface Theme {
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  fontFamily: string;
  decorativeEmoji: string;
}

// Theme Definition
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

// Create theme context
export const ThemeContext = createContext<Theme>(DEFAULT_THEMES.Minimalist);

const GameSelectionPage: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState("Minimalist");
  const [customTheme, setCustomTheme] = useState<Theme | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);

  const currentTheme =
    customTheme || DEFAULT_THEMES[selectedTheme as keyof typeof DEFAULT_THEMES];

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
          fontFamily:
            DEFAULT_THEMES[selectedTheme as keyof typeof DEFAULT_THEMES]
              .fontFamily,
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
          <div>
            <label>Font Family:</label>
            <select
              value={customTheme?.fontFamily || "'Roboto', sans-serif"}
              onChange={(e) =>
                setCustomTheme((prev) => ({
                  ...(prev as Theme),
                  fontFamily: e.target.value,
                }))
              }
            >
              <option value="'Roboto', sans-serif">Roboto</option>
              <option value="'Dancing Script', cursive">Dancing Script</option>
              <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
              <option value="'Fredoka One', sans-serif">Fredoka One</option>
              <option value="'Press Start 2P', cursive">Press Start 2P</option>
              <option value="'Orbitron', sans-serif">Orbitron</option>
              <option value="'Pacifico', cursive">Pacifico</option>
              <option value="'Old English Text MT', serif">
                Old English Text
              </option>
              <option value="'Montserrat', sans-serif">Montserrat</option>
              <option value="'Caveat', cursive">Caveat</option>
              <option value="'Indie Flower', cursive">Indie Flower</option>
              <option value="'Audiowide', sans-serif">Audiowide</option>
              <option value="'Raleway', sans-serif">Raleway</option>
              <option value="'Playfair Display', serif">
                Playfair Display
              </option>
            </select>
          </div>
          <div>
            <label>Decorative Emoji:</label>
            <input
              type="text"
              value={customTheme?.decorativeEmoji || "🎮"}
              onChange={(e) =>
                setCustomTheme((prev) => ({
                  ...(prev as Theme),
                  decorativeEmoji: e.target.value,
                }))
              }
              maxLength={2}
              style={{
                width: "40px",
                fontSize: "1.5rem",
                padding: "5px",
                marginLeft: "10px",
              }}
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
              cursor: "pointer",
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
          fontFamily: theme.fontFamily,
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>
          {theme.decorativeEmoji} Game Selection {theme.decorativeEmoji}
        </h1>

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
                padding: "8px",
                marginLeft: "10px",
                borderRadius: "5px",
                fontFamily: theme.fontFamily,
                cursor: "pointer",
              }}
            >
              {Object.keys(DEFAULT_THEMES).map((themeName) => (
                <option key={themeName} value={themeName}>
                  {themeName}
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
              padding: "8px 15px",
              borderRadius: "5px",
              marginLeft: "10px",
              cursor: "pointer",
              fontFamily: theme.fontFamily,
            }}
          >
            Customize Theme
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            maxWidth: "1000px",
            width: "100%",
            padding: "20px",
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
                padding: "20px",
                borderRadius: "10px",
                fontSize: "1.2rem",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                fontFamily: theme.fontFamily,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "150px",
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.transform = "translateY(-5px)";
                target.style.boxShadow = "0 6px 8px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.transform = "translateY(0)";
                target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
              }}
            >
              <span style={{ fontSize: "2rem", marginBottom: "10px" }}>
                {game.name === "Snake"
                  ? "🐍"
                  : game.name === "Tic-Tac-Toe"
                    ? "❌"
                    : game.name === "Memory Match"
                      ? "🎴"
                      : game.name === "Catch"
                        ? "🎯"
                        : "🧩"}
              </span>
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
      <ThemeContext.Provider value={currentTheme}>
        <div style={{ fontFamily: currentTheme.fontFamily }}>
          <button
            onClick={() => setSelectedGame(null)}
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              padding: "10px 20px",
              backgroundColor: currentTheme.primaryColor,
              color: currentTheme.backgroundColor,
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontFamily: currentTheme.fontFamily,
            }}
          >
            Back to Games
          </button>
          <GameComponent />
        </div>
      </ThemeContext.Provider>
    ) : null;
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
      {isCustomizing && renderThemeCustomizer()}
      {selectedGame ? renderSelectedGame() : renderGameSelection()}
    </ThemeContext.Provider>
  );
};

export default GameSelectionPage;
