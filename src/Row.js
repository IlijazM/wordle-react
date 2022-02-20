import Cell from "./Cell";

export default function Row({ wordToGuess, active, word }) {
  return (
    <div className={`row${active ? " active" : ""}`}>
      <Cell wordToGuess={wordToGuess} word={word} index={0} />
      <Cell wordToGuess={wordToGuess} word={word} index={1} />
      <Cell wordToGuess={wordToGuess} word={word} index={2} />
      <Cell wordToGuess={wordToGuess} word={word} index={3} />
      <Cell wordToGuess={wordToGuess} word={word} index={4} />
    </div>
  );
}
