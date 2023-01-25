import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getWord } from "../api";
import { MAX_NUMBER_OF_GUESSES } from "../constants";
import { Letter } from "../types";

const useHangman = () => {
  const result = useQuery({
    queryKey: ["word"],
    queryFn: getWord,
  });

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

  const startNewGame = useCallback(() => {
    result.refetch();
    setLettersGuessed([]);
    setNumberOfIncorrectGuesses(0);
  }, [result]);

  useEffect(() => {
    const word: string = result?.data?.word || "";

    if (word.length > 0) {
      const newGuessedWord = word.split("").map((char) => ({
        character: char,
        guessedCorrectly: false,
      }));

      setLettersInWord(newGuessedWord);
    }
  }, [result.data]);

  const guessLetter = useCallback(
    (guessedLetter: string) => {
      setLettersGuessed([...lettersGuessed, guessedLetter]);

      if (
        result?.data?.word &&
        result.data.word.toLocaleLowerCase().includes(guessedLetter)
      ) {
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
    [lettersGuessed, lettersInWord, result.data]
  );

  return {
    startNewGame,
    isLoading: result.isLoading || result.fetchStatus === "fetching",
    hasError: result.isError,
    word: result?.data?.word,
    lettersInWord,
    lettersGuessed,
    numberOfIncorrectGuesses,
    hasLost,
    hasWon,
    guessLetter,
  };
};

export default useHangman;
