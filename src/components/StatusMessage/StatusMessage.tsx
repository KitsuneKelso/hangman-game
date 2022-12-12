import { MAX_NUMBER_OF_GUESSES } from "../../constants";
import "./StatusMessage.css";

interface Props {
  word: string;
  hasWon: boolean;
  hasLost: boolean;
  numberOfIncorrectGuesses: number;
}

const StatusMessage: React.FC<Props> = ({
  word,
  hasWon,
  hasLost,
  numberOfIncorrectGuesses,
}) => {
  const onFinalGuess = numberOfIncorrectGuesses === MAX_NUMBER_OF_GUESSES - 1;

  if (onFinalGuess) {
    return (
      <span className="status-warning">Careful, on your final letter!</span>
    );
  }

  if (hasWon) {
    return (
      <span className="status-win">
        Congratulations, you guessed the correct word!
      </span>
    );
  }

  if (hasLost) {
    return (
      <span className="status-lose">
        Game over, the correct word was: "{word}"
      </span>
    );
  }

  return <span>Guess the hidden word!</span>;
};

export default StatusMessage;
