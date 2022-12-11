const getWord = async () => {
  const response = await fetch("https://api.api-ninjas.com/v1/randomword", {
    headers: { "X-Api-Key": "EBBdyXUBN/350zIrCZFR0g==W5eCPC9QYvuUKJ3c" },
  }).then((res) => res.json());

  if (response.word) {
    return response.word;
  }
};

export default getWord;
