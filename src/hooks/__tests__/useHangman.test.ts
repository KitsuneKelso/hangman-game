import { act, renderHook } from "@testing-library/react";
import { getWord } from "../../api";
import useHangman from "../useHangman";

jest.mock("../../api/getWord", () => jest.fn());

beforeEach(() => {
  (getWord as jest.Mock).mockReturnValue("test");
});

it("should call getWord and initialize a word for guessing", () => {
  expect(getWord).not.toHaveBeenCalled();

  const { result } = renderHook(useHangman);

  expect(getWord).toHaveBeenCalledTimes(1);

  expect(result.current.guessedWord).toEqual([
    { character: "t", guessedCorrectly: false },
    { character: "e", guessedCorrectly: false },
    { character: "s", guessedCorrectly: false },
    { character: "t", guessedCorrectly: false },
  ]);
});

describe("when a correct letter is guessed", () => {
  it("should update the guessed word object", async () => {
    const { result } = renderHook(useHangman);

    await act(async () => {
      result.current.guessLetter("t");
    });

    expect(result.current.guessedWord).toEqual([
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
