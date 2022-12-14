import { useCallback, useEffect, useMemo, useState } from "react";
import { getWord } from "../api";
import { MAX_NUMBER_OF_GUESSES } from "../constants";
import { Letter } from "../types";

const useHangman = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [word, setWord] = useState("");
  const [lettersInWord, setLettersInWord] = useState<Letter[]>([]);
  const [lettersGuessed, setLettersGuessed] = useState<string[]>([]);
  const [numberOfIncorrectGuesses, setNumberOfIncorrectGuesses] = useState(0);

  const hasLost = useMemo(
    () => numberOfIncorrectGuesses >= MAX_NUMBER_OF_GUESSES,
    [numberOfIncorrectGuesses]
  );
  const hasWon = useMemo(
    () =>
      lettersInWord.length > 0 &&
      lettersInWord.every((letter) => letter.guessedCorrectly),
    [lettersInWord]
  );

  const startNewGame = useCallback(async () => {
    try {
      setIsLoading(true);
      setHasError(false);
      setLettersGuessed([]);
      setNumberOfIncorrectGuesses(0);

      const newWord = await getWord();
      setWord(newWord);

      setIsLoading(false);
    } catch (e) {
      setHasError(true);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (word.length > 0) {
      const newGuessedWord = word.split("").map((char) => ({
        character: char,
        guessedCorrectly: false,
      }));

      setLettersInWord(newGuessedWord);
    }
  }, [word]);

  const guessLetter = useCallback(
    (guessedLetter: string) => {
      setLettersGuessed([...lettersGuessed, guessedLetter]);

      if (word.toLocaleLowerCase().includes(guessedLetter)) {
        const updatedGuessedWord = lettersInWord.map((letter) => ({
          ...letter,
          guessedCorrectly:
            letter.character.toLocaleLowerCase() === guessedLetter ||
            letter.guessedCorrectly,
        }));

        setLettersInWord(updatedGuessedWord);
      } else {
        setNumberOfIncorrectGuesses((cur) => cur + 1);
      }
    },
    [lettersGuessed, lettersInWord, word]
  );

  return {
    startNewGame,
    isLoading,
    hasError,
    word,
    lettersInWord,
    lettersGuessed,
    numberOfIncorrectGuesses,
    hasLost,
    hasWon,
    guessLetter,
  };
};

export default useHangman;
