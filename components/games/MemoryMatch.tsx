import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../GameSelectionPage";

const MemoryMatch: React.FC = () => {
  const CARD_SYMBOLS = ["❤️", "🌹", "💘", "🍫", "💕", "🎁", "💌", "🦄"];
  const theme = useContext(ThemeContext);

  const [cards, setCards] = useState<
    { symbol: string; isFlipped: boolean; isMatched: boolean }[]
  >([]);
  const [firstCard, setFirstCard] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const shuffledCards = [...CARD_SYMBOLS, ...CARD_SYMBOLS]
      .sort(() => 0.5 - Math.random())
      .map((symbol) => ({ symbol, isFlipped: false, isMatched: false }));

    setCards(shuffledCards);
    setFirstCard(null);
    setMoves(0);
  };

  const handleCardClick = (index: number) => {
    if (cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setMoves((m) => m + 1);

    if (firstCard === null) {
      setFirstCard(index);
    } else {
      // Check for match
      if (cards[firstCard].symbol === cards[index].symbol) {
        newCards[firstCard].isMatched = true;
        newCards[index].isMatched = true;
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          newCards[firstCard].isFlipped = false;
          newCards[index].isFlipped = false;
          setCards(newCards);
        }, 1000);
      }
      setFirstCard(null);
    }
  };

  const isGameComplete = cards.every((card) => card.isMatched);

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
        {theme.decorativeEmoji} Memory Match {theme.decorativeEmoji}
      </h2>
      <p>
        {theme.decorativeEmoji} Moves: {moves} {theme.decorativeEmoji}
      </p>

      {isGameComplete && (
        <div style={{ textAlign: "center" }}>
          <p>
            {theme.decorativeEmoji} Congratulations! You won in {moves} moves!{" "}
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
            {theme.decorativeEmoji} Play Again {theme.decorativeEmoji}
          </button>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
          maxWidth: "400px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            style={{
              width: "80px",
              height: "80px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2rem",
              backgroundColor: card.isMatched
                ? theme.secondaryColor
                : card.isFlipped
                  ? theme.primaryColor
                  : theme.backgroundColor,
              color:
                card.isFlipped || card.isMatched
                  ? theme.backgroundColor
                  : theme.textColor,
              border: `2px solid ${theme.primaryColor}`,
              cursor: "pointer",
              fontFamily: theme.fontFamily,
              transition: "all 0.3s ease",
            }}
          >
            {card.isFlipped || card.isMatched
              ? card.symbol
              : theme.decorativeEmoji}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryMatch;
