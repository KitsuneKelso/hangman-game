interface Props {
  word: string;
  hasWon: boolean;
  hasLost: boolean;
}

const StatusMessage: React.FC<Props> = ({ word, hasWon, hasLost }) => {
  if (hasWon) {
    return <span>Congratulations, you guessed the correct word!</span>;
  }

  if (hasLost) {
    return <span>Game over, the correct word was: "{word}"</span>;
  }

  return <span>Guess the hidden word!</span>;
};

export default StatusMessage;
