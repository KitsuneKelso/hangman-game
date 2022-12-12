import { useMemo } from "react";
import { MAX_NUMBER_OF_GUESSES } from "../../constants";
import "./Gallows.css";

interface Props {
  numberOfIncorrectGuesses: number;
}

const Gallows: React.FC<Props> = ({ numberOfIncorrectGuesses }) => {
  const counterClassName = useMemo(() => {
    if (numberOfIncorrectGuesses === MAX_NUMBER_OF_GUESSES - 1) {
      return "counter-warning";
    }
    if (numberOfIncorrectGuesses >= MAX_NUMBER_OF_GUESSES) {
      return "counter-gameOver";
    }
  }, [numberOfIncorrectGuesses]);

  return (
    <>
      <span className={counterClassName}>
        {numberOfIncorrectGuesses} / {MAX_NUMBER_OF_GUESSES}
      </span>
      <div className="gallows">
        <div className="gallowsShape gallowsPiece-base" />
        {numberOfIncorrectGuesses >= 1 && (
          <div className="gallowsShape gallowsPiece-post" />
        )}
        {numberOfIncorrectGuesses >= 2 && (
          <div className="gallowsShape gallowsPiece-top" />
        )}
        {numberOfIncorrectGuesses >= 3 && (
          <div className="gallowsShape gallowsPiece-crossBeam" />
        )}
        {numberOfIncorrectGuesses >= 4 && (
          <div className="gallowsShape gallowsPiece-rope" />
        )}
        {numberOfIncorrectGuesses >= 5 && (
          <div className="gallowsShape gallowsPiece-head" />
        )}
        {numberOfIncorrectGuesses >= 6 && (
          <div className="gallowsShape gallowsPiece-body" />
        )}
        {numberOfIncorrectGuesses >= 7 && (
          <>
            <div className="gallowsShape gallowsPiece-leftArm" />
            <div className="gallowsShape gallowsPiece-rightArm" />
          </>
        )}
        {numberOfIncorrectGuesses >= 8 && (
          <>
            <div className="gallowsShape gallowsPiece-leftLeg" />
            <div className="gallowsShape gallowsPiece-rightLeg" />
          </>
        )}
      </div>
    </>
  );
};

export default Gallows;
