import { API_KEY } from ".";

const getWord = async () => {
  const response = await fetch("https://api.api-ninjas.com/v1/randomword", {
    headers: { "X-Api-Key": API_KEY },
  }).then((res) => res.json());

  if (response.word) {
    return response.word;
  } else {
    throw new Error("Failed to fetch a word");
  }
};

export default getWord;
