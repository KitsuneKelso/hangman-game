import { useHangman } from "../../hooks";
import Alphabet from "../Alphabet";
import Button from "../Button";
import Gallows from "../Gallows";
import StatusMessage from "../StatusMessage";
import Word from "../Word";
import "./Hangman.css";

const Hangman: React.FC = () => {
  const {
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
  } = useHangman();

  const isGameOver = hasWon || hasLost;

  if (isLoading) {
    return <span>Loading, please wait...</span>;
  }

  if (word.length === 0) {
    return (
      <div className="hangmanGame">
        <Button onClick={startNewGame}>New Game</Button>
        {hasError && (
          <span className="errorMessage">
            Something went wrong, please try again.
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="hangmanGame">
      <Gallows numberOfIncorrectGuesses={numberOfIncorrectGuesses} />
      <Word lettersInWord={lettersInWord} />
      <StatusMessage word={word} hasWon={hasWon} hasLost={hasLost} />
      <Alphabet
        isGameOver={isGameOver}
        word={word}
        lettersGuessed={lettersGuessed}
        onClickLetter={guessLetter}
      />
      <Button className="restartButton" onClick={startNewGame}>
        {isGameOver ? "Play Again" : "New Game"}
      </Button>
    </div>
  );
};

export default Hangman;
