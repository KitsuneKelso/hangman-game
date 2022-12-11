import { useHangman } from "../../hooks";
import Alphabet from "../Alphabet";
import Gallows from "../Gallows";
import StatusMessage from "../StatusMessage";
import Word from "../Word";

const Hangman: React.FC = () => {
  const {
    startNewGame,
    isLoading,
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
    return <button onClick={startNewGame}>New Game</button>;
  }

  return (
    <div>
      <Gallows numberOfIncorrectGuesses={numberOfIncorrectGuesses} />
      <Word lettersInWord={lettersInWord} />
      <StatusMessage word={word} hasWon={hasWon} hasLost={hasLost} />
      <Alphabet
        isGameOver={hasWon || hasLost}
        lettersGuessed={lettersGuessed}
        onClickLetter={guessLetter}
      />
    </div>
  );
};

export default Hangman;
