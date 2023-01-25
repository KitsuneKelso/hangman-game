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
    isError,
    word,
    lettersInWord,
    lettersGuessed,
    numberOfIncorrectGuesses,
    hasLost,
    hasWon,
    isGameOver,
    guessLetter,
  } = useHangman();

  if (isLoading) {
    return <span className="loadingMessage">Loading, please wait...</span>;
  }

  if (word.length === 0) {
    return (
      <div className="hangmanGame">
        <Button onClick={startNewGame}>New Game</Button>
        {isError && (
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
      <StatusMessage
        word={word}
        hasWon={hasWon}
        hasLost={hasLost}
        numberOfIncorrectGuesses={numberOfIncorrectGuesses}
      />
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
