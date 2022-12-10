import { useCallback } from "react";
import { ALPHABET_LETTERS } from "../../constants";

interface Props {
  isGameOver: boolean;
  lettersGuessed: string[];
  onClickLetter: (letter: string) => void;
}

const Alphabet: React.FC<Props> = ({
  isGameOver,
  lettersGuessed,
  onClickLetter,
}) => {
  const handleClick = useCallback(
    (letter: string) => {
      onClickLetter(letter);
    },
    [onClickLetter]
  );

  const buttonIsDisabled = useCallback(
    (letter: string) => {
      return isGameOver || lettersGuessed.includes(letter);
    },
    [isGameOver, lettersGuessed]
  );

  return (
    <div>
      {ALPHABET_LETTERS.map((letter) => (
        <button
          key={letter}
          onClick={() => handleClick(letter)}
          disabled={buttonIsDisabled(letter)}
        >
          {letter.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default Alphabet;
