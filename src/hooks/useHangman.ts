import { useCallback, useEffect, useMemo, useState } from "react";
import { getWord } from "../api";
import { MAX_NUMBER_OF_GUESSES } from "../constants";
import { Letter } from "../types";

const useHangman = () => {
  const [word, setWord] = useState("");
  const [guessedWord, setGuessedWord] = useState<Letter[]>([]);
  const [numberOfIncorrectGuesses, setNumberOfIncorrectGuesses] = useState(0);

  const hasLost = useMemo(
    () => numberOfIncorrectGuesses >= MAX_NUMBER_OF_GUESSES,
    [numberOfIncorrectGuesses]
  );
  const hasWon = useMemo(
    () =>
      guessedWord.length > 0 &&
      guessedWord.every((letter) => letter.guessedCorrectly),
    [guessedWord]
  );

  useEffect(() => {
    const newWord = getWord();
    setWord(newWord);
  }, []);

  useEffect(() => {
    if (word.length > 0) {
      const newGuessedWord = word.split("").map((char) => ({
        character: char,
        guessedCorrectly: false,
      }));

      setGuessedWord(newGuessedWord);
    }
  }, [word]);

  const guessLetter = useCallback(
    (guessedLetter: string) => {
      console.log(guessLetter);
      if (word.includes(guessedLetter)) {
        const updatedGuessedWord = guessedWord.map((letter) => ({
          ...letter,
          guessedCorrectly:
            letter.character === guessedLetter || letter.guessedCorrectly,
        }));

        setGuessedWord(updatedGuessedWord);
      } else {
        setNumberOfIncorrectGuesses((cur) => cur + 1);
      }
    },
    [guessedWord, word]
  );

  return {
    guessedWord,
    numberOfIncorrectGuesses,
    hasLost,
    hasWon,
    guessLetter,
  };
};

export default useHangman;
