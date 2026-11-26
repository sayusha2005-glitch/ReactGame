
export function checkGuess(guess, solution) {
  const result = Array(5).fill("absent");
  const letterCount = {};

  // Count letters in the correct word
  for (const letter of solution) {
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  }

  // First pass: find correct letters
  for (let i = 0; i < 5; i++) {
    if (guess[i] === solution[i]) {
      result[i] = "correct";
      letterCount[guess[i]]--;
    }
  }

  // Second pass: find letters in the wrong position
  for (let i = 0; i < 5; i++) {
    if (result[i] === "correct") continue;

    if (letterCount[guess[i]] > 0) {
      result[i] = "present";
      letterCount[guess[i]]--;
    }
  }

  return result;
}
