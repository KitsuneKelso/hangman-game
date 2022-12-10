import { MAX_NUMBER_OF_GUESSES } from "../../constants";

interface Props {
  numberOfIncorrectGuesses: number;
}

const Gallows: React.FC<Props> = ({ numberOfIncorrectGuesses }) => {
  return (
    <div>
      {numberOfIncorrectGuesses} / {MAX_NUMBER_OF_GUESSES}
    </div>
  );
};

export default Gallows;
