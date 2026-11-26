
import Tile from "./Tile.jsx";

function Row({ guess, currentGuess, isCurrentRow }) {
  if (guess) {
    return (
      <div className="row">
        {guess.word.split("").map((letter, index) => (
          <Tile
            key={index}
            letter={letter}
            status={guess.result[index]}
          />
        ))}
      </div>
    );
  }

  if (isCurrentRow) {
    return (
      <div className="row">
        {Array.from({ length: 5 }).map((_, index) => (
          <Tile
            key={index}
            letter={currentGuess[index] || ""}
            status=""
          />
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      {Array.from({ length: 5 }).map((_, index) => (
        <Tile key={index} letter="" status="" />
      ))}
    </div>
  );
}

export default Row;
