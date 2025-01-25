import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
} from "react";

// Theme Context and Types
interface GameTheme {
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  fontFamily?: string;
}

interface GameConfig {
  theme: GameTheme;
  customImages?: {
    background?: string;
    player?: string;
    obstacle?: string;
  };
  difficulty?: "easy" | "medium" | "hard";
}

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

const GameConfigContext = createContext<{
  config: GameConfig;
  updateConfig: (newConfig: Partial<GameConfig>) => void;
}>({
  config: {
    theme: DEFAULT_THEMES.classic,
  },
  updateConfig: () => {},
});

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [config] = useState<GameConfig>({
    theme: DEFAULT_THEMES.classic,
  });
  const theme = config.theme;

  const [snake, setSnake] = useState<{ x: number; y: number }[]>([
    { x: 10, y: 10 },
  ]);
  const [food, setFood] = useState<{ x: number; y: number }>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<"UP" | "DOWN" | "LEFT" | "RIGHT">(
    "RIGHT"
  );
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const GRID_SIZE = 20;
  const CANVAS_SIZE = 400;

  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)),
      y: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)),
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context) return;

    // Clear canvas
    context.fillStyle = theme.backgroundColor;
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw snake
    context.fillStyle = theme.primaryColor;
    snake.forEach((segment) => {
      context.fillRect(
        segment.x * GRID_SIZE,
        segment.y * GRID_SIZE,
        GRID_SIZE - 2,
        GRID_SIZE - 2
      );
    });

    // Draw food
    context.fillStyle = theme.secondaryColor;
    context.fillRect(
      food.x * GRID_SIZE,
      food.y * GRID_SIZE,
      GRID_SIZE - 2,
      GRID_SIZE - 2
    );
  }, [snake, food, theme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection("UP");
          break;
        case "ArrowDown":
          setDirection("DOWN");
          break;
        case "ArrowLeft":
          setDirection("LEFT");
          break;
        case "ArrowRight":
          setDirection("RIGHT");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(() => {
      const newSnake = [...snake];
      const head = { ...newSnake[0] };

      // Move snake
      switch (direction) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
      }

      // Check collision with walls
      if (
        head.x < 0 ||
        head.x >= CANVAS_SIZE / GRID_SIZE ||
        head.y < 0 ||
        head.y >= CANVAS_SIZE / GRID_SIZE
      ) {
        setGameOver(true);
        return;
      }

      // Check self collision
      if (
        newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        return;
      }

      // Add new head
      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 1);
        setFood(generateFood());
      } else {
        newSnake.pop(); // Remove tail if no food eaten
      }

      setSnake(newSnake);
    }, 200);

    return () => clearInterval(gameLoop);
  }, [snake, direction, food, gameOver]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection("RIGHT");
    setScore(0);
    setGameOver(false);
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
      <h2 style={{ color: theme.textColor }}>Snake Game</h2>
      <p style={{ color: theme.textColor }}>Score: {score}</p>
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        style={{ border: `2px solid ${theme.primaryColor}` }}
      />
      {gameOver && (
        <div>
          <p style={{ color: theme.textColor }}>Game Over!</p>
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

export default SnakeGame;
