import { useMemo } from "react";
import "./LetterButton.css";

interface Props {
  letter: string;
  letterHasBeenGuessed: boolean;
  letterIsInWord: boolean;
  isGameOver: boolean;
  onClick: () => void;
}

const LetterButton: React.FC<Props> = ({
  letter,
  letterHasBeenGuessed,
  letterIsInWord,
  isGameOver,
  onClick,
}) => {
  const className = useMemo(() => {
    let cn = "letterButton";

    if (letterHasBeenGuessed) {
      cn += " letterButton-guessed";

      if (letterIsInWord) {
        cn += " letterButton-isCorrect";
      } else {
        cn += " letterButton-isWrong";
      }
    }

    if (isGameOver) {
      cn += " letterButton-isGameOver";
    }

    return cn;
  }, [isGameOver, letterHasBeenGuessed, letterIsInWord]);

  return (
    <button
      className={className}
      disabled={letterHasBeenGuessed || isGameOver}
      onClick={onClick}
    >
      {letter}
    </button>
  );
};

export default LetterButton;
