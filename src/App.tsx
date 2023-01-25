import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { Hangman } from "./components";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Hangman</h1>
        <Hangman />
      </div>
    </QueryClientProvider>
  );
}

export default App;
