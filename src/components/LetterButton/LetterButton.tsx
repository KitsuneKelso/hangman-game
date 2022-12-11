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
    let name = "letterButton";

    if (letterHasBeenGuessed) {
      name += " letterButton-guessed";

      if (letterIsInWord) {
        name += " letterButton-isCorrect";
      } else {
        name += " letterButton-isWrong";
      }
    }

    if (isGameOver) {
      name += " letterButton-isGameOver";
    }

    return name;
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
