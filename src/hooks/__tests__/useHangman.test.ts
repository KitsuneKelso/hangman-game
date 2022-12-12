import { act, renderHook } from "@testing-library/react";
import { getWord } from "../../api";
import useHangman from "../useHangman";

jest.mock("../../api/getWord", () => jest.fn());

const TEST_WORD = "test";
const MIXED_CASING_WORD = "SoHo";

beforeEach(() => {
  (getWord as jest.Mock).mockResolvedValue(TEST_WORD);
});

describe("when a new game is started", () => {
  it("should call getWord and initialize a word for guessing", async () => {
    expect(getWord).not.toHaveBeenCalled();

    const { result } = renderHook(useHangman);

    await act(async () => {
      result.current.startNewGame();
    });

    expect(getWord).toHaveBeenCalledTimes(1);

    expect(result.current.word).toEqual(TEST_WORD);

    expect(result.current.lettersInWord).toEqual([
      { character: "t", guessedCorrectly: false },
      { character: "e", guessedCorrectly: false },
      { character: "s", guessedCorrectly: false },
      { character: "t", guessedCorrectly: false },
    ]);
  });
});

describe("when any letter is guessed", () => {
  it("should append the guessed letter to letters guessed array", async () => {
    const { result } = renderHook(useHangman);
    await act(async () => {
      result.current.startNewGame();
    });

    expect(result.current.lettersGuessed).toEqual([]);

    const FIRST_GUESS = "a";
    const SECOND_GUESS = "b";

    await act(async () => {
      result.current.guessLetter(FIRST_GUESS);
    });

    expect(result.current.lettersGuessed).toEqual([FIRST_GUESS]);

    await act(async () => {
      result.current.guessLetter(SECOND_GUESS);
    });

    expect(result.current.lettersGuessed).toEqual([FIRST_GUESS, SECOND_GUESS]);
  });
});

describe("when a correct letter is guessed", () => {
  it("should update the guessed word object", async () => {
    const { result } = renderHook(useHangman);
    await act(async () => {
      result.current.startNewGame();
    });

    await act(async () => {
      result.current.guessLetter("t");
    });

    expect(result.current.lettersInWord).toEqual([
      { character: "t", guessedCorrectly: true },
      { character: "e", guessedCorrectly: false },
      { character: "s", guessedCorrectly: false },
      { character: "t", guessedCorrectly: true },
    ]);
  });
});

describe("when all letters in a word have been correctly guessed", () => {
  it("should set the hasWon flag to true", async () => {
    const { result } = renderHook(useHangman);
    await act(async () => {
      result.current.startNewGame();
    });

    expect(result.current.hasWon).toEqual(false);

    await act(async () => {
      result.current.guessLetter("t");
    });
    expect(result.current.hasWon).toEqual(false);

    await act(async () => {
      result.current.guessLetter("e");
    });
    expect(result.current.hasWon).toEqual(false);

    await act(async () => {
      result.current.guessLetter("s");
    });
    expect(result.current.hasWon).toEqual(true);
  });
});

describe("when an incorrect letter is guessed", () => {
  it("should increment the number of incorrect guesses", async () => {
    const { result } = renderHook(useHangman);
    await act(async () => {
      result.current.startNewGame();
    });

    expect(result.current.numberOfIncorrectGuesses).toEqual(0);

    await act(async () => {
      result.current.guessLetter("x");
    });

    expect(result.current.numberOfIncorrectGuesses).toEqual(1);
  });
});

describe("when the number of incorrect guesses surpases max number of guesses", () => {
  it("should set the hasLost flag to true", async () => {
    const { result } = renderHook(useHangman);
    await act(async () => {
      result.current.startNewGame();
    });

    expect(result.current.hasLost).toEqual(false);

    await act(async () => {
      result.current.guessLetter("1");
    });
    await act(async () => {
      result.current.guessLetter("2");
    });
    await act(async () => {
      result.current.guessLetter("3");
    });
    await act(async () => {
      result.current.guessLetter("4");
    });
    await act(async () => {
      result.current.guessLetter("5");
    });
    await act(async () => {
      result.current.guessLetter("6");
    });
    await act(async () => {
      result.current.guessLetter("7");
    });
    await act(async () => {
      result.current.guessLetter("8");
    });

    expect(result.current.hasLost).toEqual(true);
  });
});

describe("when starting a new game throws an error", () => {
  beforeEach(() => {
    (getWord as jest.Mock).mockRejectedValue({});
  });

  it("should return true for has error", async () => {
    const { result } = renderHook(useHangman);
    expect(result.current.hasError).toEqual(false);

    await act(async () => {
      result.current.startNewGame();
    });

    expect(result.current.hasError).toEqual(true);
  });
});

describe("when a word with mixed character casing is returned", () => {
  beforeEach(() => {
    (getWord as jest.Mock).mockResolvedValue(MIXED_CASING_WORD);
  });

  it("should be possible to guess the word", async () => {
    const { result } = renderHook(useHangman);
    await act(async () => {
      result.current.startNewGame();
    });
    expect(result.current.hasWon).toEqual(false);

    await act(async () => {
      result.current.guessLetter("s");
    });
    expect(result.current.hasWon).toEqual(false);

    await act(async () => {
      result.current.guessLetter("o");
    });
    expect(result.current.hasWon).toEqual(false);

    await act(async () => {
      result.current.guessLetter("h");
    });
    expect(result.current.hasWon).toEqual(true);
  });
});
