import { useCallback } from "react";
import { ALPHABET_LETTERS } from "../../constants";
import LetterButton from "../LetterButton";
import "./Alphabet.css";

interface Props {
  isGameOver: boolean;
  word: string;
  lettersGuessed: string[];
  onClickLetter: (letter: string) => void;
}

const Alphabet: React.FC<Props> = ({
  isGameOver,
  lettersGuessed,
  word,
  onClickLetter,
}) => {
  const handleClick = useCallback(
    (letter: string) => {
      onClickLetter(letter);
    },
    [onClickLetter]
  );

  const letterHasBeenGuessed = useCallback(
    (letter: string) => {
      return lettersGuessed.includes(letter);
    },
    [lettersGuessed]
  );

  const letterIsInWord = useCallback(
    (letter: string) => {
      return word.includes(letter);
    },
    [word]
  );

  return (
    <div className="alphabetButtons">
      {ALPHABET_LETTERS.map((letter) => (
        <LetterButton
          key={letter}
          letter={letter.toUpperCase()}
          letterHasBeenGuessed={letterHasBeenGuessed(letter)}
          letterIsInWord={letterIsInWord(letter)}
          isGameOver={isGameOver}
          onClick={() => handleClick(letter)}
        />
      ))}
    </div>
  );
};

export default Alphabet;
