import React, { useState, useEffect } from "react";

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

const PuzzleGame: React.FC = () => {
  const GRID_SIZE = 4;
  const theme = DEFAULT_THEMES.valentines;

  const createSolvedPuzzle = () =>
    Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i);

  const shufflePuzzle = (puzzle: number[]) => {
    const shuffled = [...puzzle];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [puzzleState, setPuzzleState] = useState(
    shufflePuzzle(createSolvedPuzzle())
  );
  const [moves, setMoves] = useState(0);

  const findEmptyIndex = () => puzzleState.indexOf(0);

  const isValidMove = (clickedIndex: number) => {
    const emptyIndex = findEmptyIndex();
    const clickedRow = Math.floor(clickedIndex / GRID_SIZE);
    const clickedCol = clickedIndex % GRID_SIZE;
    const emptyRow = Math.floor(emptyIndex / GRID_SIZE);
    const emptyCol = emptyIndex % GRID_SIZE;

    return (
      (Math.abs(clickedRow - emptyRow) === 1 && clickedCol === emptyCol) ||
      (Math.abs(clickedCol - emptyCol) === 1 && clickedRow === emptyRow)
    );
  };

  const handleTileClick = (clickedIndex: number) => {
    if (!isValidMove(clickedIndex)) return;

    const newPuzzle = [...puzzleState];
    const emptyIndex = findEmptyIndex();

    // Swap tiles
    [newPuzzle[clickedIndex], newPuzzle[emptyIndex]] = [
      newPuzzle[emptyIndex],
      newPuzzle[clickedIndex],
    ];

    setPuzzleState(newPuzzle);
    setMoves((m) => m + 1);
  };

  const isGameSolved = () => {
    return puzzleState.every((tile, index) => tile === index);
  };

  const resetGame = () => {
    setPuzzleState(shufflePuzzle(createSolvedPuzzle()));
    setMoves(0);
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
      <h2>Sliding Puzzle</h2>
      <p>Moves: {moves}</p>

      {isGameSolved() && (
        <div>
          <p>Congratulations! Puzzle Solved!</p>
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
            New Puzzle
          </button>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gap: "5px",
          width: "300px",
          height: "300px",
        }}
      >
        {puzzleState.map((tile, index) => (
          <button
            key={index}
            onClick={() => handleTileClick(index)}
            disabled={tile === 0 || isGameSolved()}
            style={{
              backgroundColor: tile === 0 ? "transparent" : theme.primaryColor,
              color: theme.backgroundColor,
              border: `2px solid ${theme.secondaryColor}`,
              fontSize: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: tile === 0 ? "default" : "pointer",
            }}
          >
            {tile !== 0 ? tile : ""}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PuzzleGame;
