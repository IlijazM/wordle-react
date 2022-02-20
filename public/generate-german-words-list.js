const fs = require("fs");

const wordsFileContent = fs.readFileSync("public/wordle-words.txt", "utf8");

const words = wordsFileContent.split("\n");

const result = [];

for (const i in words) {
  const word = words[i];
  if (word.length === 5) result.push(word.toUpperCase());
}

fs.writeFileSync("public/words.json", JSON.stringify(result));
