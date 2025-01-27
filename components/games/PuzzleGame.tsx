import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../GameSelectionPage";

const PuzzleGame: React.FC = () => {
  const GRID_SIZE = 4;
  const theme = useContext(ThemeContext);

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
        fontFamily: theme.fontFamily,
      }}
    >
      <h2>
        {theme.decorativeEmoji} Sliding Puzzle {theme.decorativeEmoji}
      </h2>
      <p>
        {theme.decorativeEmoji} Moves: {moves} {theme.decorativeEmoji}
      </p>

      {isGameSolved() && (
        <div style={{ textAlign: "center" }}>
          <p>
            {theme.decorativeEmoji} Congratulations! Puzzle Solved!{" "}
            {theme.decorativeEmoji}
          </p>
          <button
            onClick={resetGame}
            style={{
              backgroundColor: theme.primaryColor,
              color: theme.backgroundColor,
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              fontFamily: theme.fontFamily,
            }}
          >
            {theme.decorativeEmoji} New Puzzle {theme.decorativeEmoji}
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
              color: tile === 0 ? "transparent" : theme.backgroundColor,
              border: `2px solid ${theme.secondaryColor}`,
              fontSize: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: tile === 0 ? "default" : "pointer",
              fontFamily: theme.fontFamily,
              transition: "all 0.3s ease",
            }}
          >
            {tile !== 0 ? `${theme.decorativeEmoji}${tile}` : ""}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PuzzleGame;
