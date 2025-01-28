import React, { useState, useContext } from "react";
import { ThemeContext } from "../GameSelectionPage";

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

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const theme = useContext(ThemeContext);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (winner || board[i]) return;

    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";

    const newWinner = calculateWinner(newBoard);

    setBoard(newBoard);
    setXIsNext(!xIsNext);
    if (newWinner) setWinner(newWinner);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const renderSquare = (i: number) => (
    <button
      key={i}
      onClick={() => handleClick(i)}
      style={{
        width: "100px",
        height: "100px",
        fontSize: "2rem",
        backgroundColor: board[i] ? theme.primaryColor : theme.backgroundColor,
        color: board[i] ? theme.backgroundColor : theme.textColor,
        border: `2px solid ${theme.primaryColor}`,
        cursor: "pointer",
        fontFamily: theme.fontFamily,
      }}
    >
      {board[i]}
    </button>
  );

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
      <h2 style={{ color: theme.textColor }}>
        {theme.decorativeEmoji} Tic-Tac-Toe {theme.decorativeEmoji}
      </h2>

      {winner ? (
        <div style={{ textAlign: "center" }}>
          <p>
            {theme.decorativeEmoji} Winner: {winner} {theme.decorativeEmoji}
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
            {theme.decorativeEmoji} Reset Game {theme.decorativeEmoji}
          </button>
        </div>
      ) : (
        <p>
          {theme.decorativeEmoji} Next Player: {xIsNext ? "X" : "O"}{" "}
          {theme.decorativeEmoji}
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "5px",
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => renderSquare(i))}
      </div>
    </div>
  );
};

export default TicTacToe;
