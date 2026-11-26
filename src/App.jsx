
import { useEffect } from "react";
import GameBoard from "./components/GameBoard";
import Keyboard from "./components/Keyboard";
import { useWordle } from "./hooks/useWordle";
import "./App.css";

function App() {
  const {
    solutionWord,
    currentGuess,
    pastGuesses,
    evaluatedGuesses,
    gameStatus,
    usedKeys,
    handleKeyPress,
    resetGame
  } = useWordle();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleKeyPress("ENTER");
      } else if (event.key === "Backspace") {
        handleKeyPress("BACKSPACE");
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        handleKeyPress(event.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyPress]);

  return (
    <div className="app">
      <header>
        <h1>WORDLE</h1>
        <p>Guess the hidden five-letter word!</p>
      </header>

      <main>
        <GameBoard
          pastGuesses={pastGuesses}
          currentGuess={currentGuess}
          evaluatedGuesses={evaluatedGuesses}
        />

        <Keyboard
          onKeyPress={handleKeyPress}
          usedKeys={usedKeys}
        />
      </main>

      {gameStatus !== "IN_PROGRESS" && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>
              {gameStatus === "WON" ? "You Won!" : "Game Over!"}
            </h2>

            <p>
              {gameStatus === "WON"
                ? `Congratulations! You guessed the word in ${pastGuesses.length} attempts.`
                : `The correct word was ${solutionWord.toUpperCase()}.`}
            </p>

            <button onClick={resetGame}>
              Play Again
            </button>
          </div>
        </div>
      )}

      <footer>
        <p>Wordle Game | Built with React</p>
      </footer>
    </div>
  );
}

export default App;