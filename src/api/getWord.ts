const API_KEY = process.env.REACT_APP_API_KEY as string;

const getWord = async () => {
  const response = await fetch("https://api.api-ninjas.com/v1/randomword", {
    headers: { "X-Api-Key": API_KEY },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default getWord;
