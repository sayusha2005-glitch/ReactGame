
import Row from "./Row";

function GameBoard({
  pastGuesses,
  currentGuess,
  evaluatedGuesses
}) {
  return (
    <div className="game-board">
      {Array.from({ length: 6 }).map((_, index) => {
        const guess = pastGuesses[index]
          ? {
              word: pastGuesses[index],
              result: evaluatedGuesses[index]
            }
          : null;

        return (
          <Row
            key={index}
            guess={guess}
            currentGuess={currentGuess}
            isCurrentRow={index === pastGuesses.length}
          />
        );
      })}
    </div>
  );
}

export default GameBoard;

