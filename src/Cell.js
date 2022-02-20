export default function Cell({ wordToGuess, word, index }) {
  const char = word.charAt(index);

  let className = "cell";

  if (wordToGuess != null) {
    if (wordToGuess.charAt(index) === char) {
      className += " correct";
    } else if (wordToGuess.includes(char)) {
      className += " present";
    } else {
      className += " not-found";
    }
  }

  return <div className={className}>{char}</div>;
}
