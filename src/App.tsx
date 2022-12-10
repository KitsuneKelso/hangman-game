import logo from "./logo.svg";
import "./App.css";
import { useHangman } from "./hooks";

function App() {
  const foo = useHangman();
  console.log(foo);

  const guessLetter = (guessedLetter: string) => {
    foo.guessLetter(guessedLetter);
  };

  return (
    <div className="App">
      <button onClick={() => guessLetter("t")}>T</button>
      <button onClick={() => guessLetter("e")}>E</button>
      <button onClick={() => guessLetter("s")}>S</button>
      <button onClick={() => guessLetter("x")}>X</button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
