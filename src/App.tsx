import "./App.css";
import { useHangman } from "./hooks";
import { Alphabet, Gallows, StatusMessage, Word } from "./components";

function App() {
  const {
    word,
    lettersInWord,
    lettersGuessed,
    numberOfIncorrectGuesses,
    hasLost,
    hasWon,
    guessLetter,
  } = useHangman();

  return (
    <div className="App">
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
}

export default App;
