import { useHangman } from "../../hooks";
import Alphabet from "../Alphabet";
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

  if (isLoading) {
    return <span>Loading, please wait...</span>;
  }

  if (word.length === 0) {
    return (
      <div>
        <button onClick={startNewGame}>New Game</button>
        {hasError && <p>Something went wrong, please try again.</p>}
      </div>
    );
  }

  return (
    <div className="hangmanGame">
      <Gallows numberOfIncorrectGuesses={numberOfIncorrectGuesses} />
      <Word lettersInWord={lettersInWord} />
      <StatusMessage word={word} hasWon={hasWon} hasLost={hasLost} />
      <Alphabet
        isGameOver={hasWon || hasLost}
        word={word}
        lettersGuessed={lettersGuessed}
        onClickLetter={guessLetter}
      />
    </div>
  );
};

export default Hangman;
