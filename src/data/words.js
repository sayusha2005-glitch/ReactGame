
export const WORDS = [
  "apple", "brave", "crane", "dream", "flame",
  "grape", "house", "lemon", "music", "plant",
  "queen", "smile", "table", "water", "zebra",
  "light", "bread", "chair", "cloud", "world",
  "heart", "tiger", "green", "stone", "peace",
  "river", "beach", "happy", "night", "train"
];

export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex];
}
