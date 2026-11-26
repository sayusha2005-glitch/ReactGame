
import { useState, useCallback } from "react";
import { getRandomWord } from "../data/words";
import { checkGuess } from "../utils/checkGuess";

export function useWordle() {
  const [solutionWord, setSolutionWord] = useState(getRandomWord);
  const [currentGuess, setCurrentGuess] = useState("");
  const [pastGuesses, setPastGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState("IN_PROGRESS");

  const submitGuess = useCallback(() => {
    if (gameStatus !== "IN_PROGRESS" || currentGuess.length !== 5) {
      return;
    }

    const newGuesses = [...pastGuesses, currentGuess];
    setPastGuesses(newGuesses);
    setCurrentGuess("");

    if (currentGuess === solutionWord) {
      setGameStatus("WON");
    } else if (newGuesses.length === 6) {
      setGameStatus("LOST");
    }
  }, [currentGuess, gameStatus, pastGuesses, solutionWord]);

  const handleKeyPress = useCallback((key) => {
    if (gameStatus !== "IN_PROGRESS") return;

    if (key === "ENTER") {
      submitGuess();
    } else if (key === "BACKSPACE") {
      setCurrentGuess((previous) => previous.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((previous) => previous + key.toLowerCase());
    }
  }, [currentGuess, gameStatus, submitGuess]);

  const resetGame = () => {
    let newWord = getRandomWord();

    while (newWord === solutionWord) {
      newWord = getRandomWord();
    }

    setSolutionWord(newWord);
    setCurrentGuess("");
    setPastGuesses([]);
    setGameStatus("IN_PROGRESS");
  };

  const evaluatedGuesses = pastGuesses.map((guess) =>
    checkGuess(guess, solutionWord)
  );

  const usedKeys = {};

  pastGuesses.forEach((guess, index) => {
    guess.split("").forEach((letter, letterIndex) => {
      const status = evaluatedGuesses[index][letterIndex];
      const priority = { absent: 1, present: 2, correct: 3 };

      if (
        !usedKeys[letter] ||
        priority[status] > priority[usedKeys[letter]]
      ) {
        usedKeys[letter] = status;
      }
    });
  });

  return {
    solutionWord,
    currentGuess,
    pastGuesses,
    evaluatedGuesses,
    gameStatus,
    usedKeys,
    handleKeyPress,
    resetGame
  };
}
