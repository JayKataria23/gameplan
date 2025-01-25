import React, { useState, useEffect, useRef } from "react";

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
};

const CatchGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const theme = DEFAULT_THEMES.valentines;

  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 400;
  const PLAYER_WIDTH = 50;
  const PLAYER_HEIGHT = 10;
  const FALLING_OBJECT_SIZE = 20;

  const [playerX, setPlayerX] = useState(CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2);
  const [fallingObject, setFallingObject] = useState({
    x: Math.random() * (CANVAS_WIDTH - FALLING_OBJECT_SIZE),
    y: -FALLING_OBJECT_SIZE,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context) return;

    // Clear canvas
    context.fillStyle = theme.backgroundColor;
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw player
    context.fillStyle = theme.primaryColor;
    context.fillRect(
      playerX,
      CANVAS_HEIGHT - PLAYER_HEIGHT,
      PLAYER_WIDTH,
      PLAYER_HEIGHT
    );

    // Draw falling object
    context.fillStyle = theme.secondaryColor;
    context.fillRect(
      fallingObject.x,
      fallingObject.y,
      FALLING_OBJECT_SIZE,
      FALLING_OBJECT_SIZE
    );
  }, [playerX, fallingObject, theme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;
      switch (e.key) {
        case "ArrowLeft":
          setPlayerX((prev) => Math.max(0, prev - 20));
          break;
        case "ArrowRight":
          setPlayerX((prev) =>
            Math.min(CANVAS_WIDTH - PLAYER_WIDTH, prev + 20)
          );
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(() => {
      setFallingObject((prev) => ({
        ...prev,
        y: prev.y + 5,
      }));

      // Check collision
      if (
        fallingObject.y + FALLING_OBJECT_SIZE >=
          CANVAS_HEIGHT - PLAYER_HEIGHT &&
        fallingObject.x + FALLING_OBJECT_SIZE >= playerX &&
        fallingObject.x <= playerX + PLAYER_WIDTH
      ) {
        setScore((prev) => prev + 1);
        // Reset falling object
        setFallingObject({
          x: Math.random() * (CANVAS_WIDTH - FALLING_OBJECT_SIZE),
          y: -FALLING_OBJECT_SIZE,
        });
      }

      // Game over if object falls below canvas
      if (fallingObject.y > CANVAS_HEIGHT) {
        setGameOver(true);
      }
    }, 50);

    return () => clearInterval(gameLoop);
  }, [fallingObject, playerX, gameOver]);

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setPlayerX(CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2);
    setFallingObject({
      x: Math.random() * (CANVAS_WIDTH - FALLING_OBJECT_SIZE),
      y: -FALLING_OBJECT_SIZE,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        padding: "20px",
      }}
    >
      <h2>Catch Game</h2>
      <p>Score: {score}</p>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ border: `2px solid ${theme.primaryColor}` }}
      />
      {gameOver && (
        <div>
          <p>Game Over!</p>
          <button
            onClick={resetGame}
            style={{
              backgroundColor: theme.primaryColor,
              color: theme.backgroundColor,
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default CatchGame;
