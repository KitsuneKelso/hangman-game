import { Letter } from "../../types";

interface Props {
  lettersInWord: Letter[];
}

const Word: React.FC<Props> = ({ lettersInWord }) => {
  return (
    <div>
      {lettersInWord.map((letter, index) => {
        return (
          <span key={index}>
            {" "}
            {letter.guessedCorrectly ? letter.character : "_"}{" "}
          </span>
        );
      })}
    </div>
  );
};

export default Word;
