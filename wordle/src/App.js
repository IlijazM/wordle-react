import "./App.css";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useState } from "react";
import words from "./words";

const keyboardLayout = {
  default: ["Q W E R T Y U I O P {rnd}", "A S D F G H J K L {bksp}", "Z X C V B N M {crane} {enter}"],
};

const keyboardDisplay = {
  "{rnd}": "Random",
  "{bksp}": "⌫",
  "{enter}": "Enter",
  "{crane}": "Crane",
};

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function getDefaultButtonTheme() {
  return [
    {
      class: "correct",
      buttons: " ",
    },
    {
      class: "present",
      buttons: " ",
    },
    {
      class: "not-found",
      buttons: " ",
    },
  ];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getRandomWord());

  const [row, setRow] = useState(0);

  const [data, setData] = useState(["", "", "", "", "", ""]);

  const [buttonTheme, setButtonTheme] = useState(getDefaultButtonTheme());

  function getCurrentWord() {
    return data[row];
  }
  function setCurrentWord(word) {
    data[row] = word;
    setData([...data]);
  }

  function keyboardPressed(key) {
    if (key === "{enter}") {
      // entered valid word
      const correctLetters = [];
      const presentLetters = [];
      const notFoundLetters = [];

      if (words.includes(getCurrentWord())) {
        for (let i = 0; i < getCurrentWord().length; i++) {
          const char = getCurrentWord().charAt(i);
          if (wordToGuess.charAt(i) === char) {
            correctLetters.push(char);
          } else if (wordToGuess.includes(char)) {
            presentLetters.push(char);
          } else {
            notFoundLetters.push(char);
          }
        }

        buttonTheme[0].buttons += " " + correctLetters.join(" ");
        buttonTheme[1].buttons += " " + presentLetters.join(" ");
        buttonTheme[2].buttons += " " + notFoundLetters.join(" ");

        buttonTheme[0].buttons.split(" ").forEach((letter) => {
          buttonTheme[1].buttons = buttonTheme[1].buttons
            .split(" ")
            .filter((letter2) => letter2 !== letter)
            .join(" ");
        });

        buttonTheme[2].buttons.split(" ").forEach((letter) => {
          buttonTheme[1].buttons = buttonTheme[1].buttons
            .split(" ")
            .filter((letter2) => letter2 !== letter)
            .join(" ");
        });

        if (row === 4) {
          setTimeout(() => {
            // end of the game
            if (getCurrentWord() === wordToGuess) {
              alert("You win.");
            } else {
              alert("You lost. Correct word: " + wordToGuess);
            }
            setWordToGuess(getRandomWord());
            setData(["", "", "", "", "", ""]);
            setRow(0);
            setButtonTheme(getDefaultButtonTheme());
          }, 1000);
        }

        setRow(row + 1);
      } else {
        // an invalid word got entered
      }
      return;
    }

    if (key === "{crane}") {
      setCurrentWord("CRANE");
      return;
    }

    if (key === "{rnd}") {
      setCurrentWord(getRandomWord());
      return;
    }

    if (key === "{bksp}") {
      if (getCurrentWord().length === 0) return;
      setCurrentWord(getCurrentWord().slice(0, -1) ?? "");
      return;
    }

    if (getCurrentWord().length !== 5) {
      setCurrentWord(getCurrentWord() + key);
    }
  }

  return (
    <div className="App">
      <div className="wrapper">
        <div className="field">
          <Row wordToGuess={row > 0 ? wordToGuess : null} active={row === 0} word={data[0]} />
          <Row wordToGuess={row > 1 ? wordToGuess : null} active={row === 1} word={data[1]} />
          <Row wordToGuess={row > 2 ? wordToGuess : null} active={row === 2} word={data[2]} />
          <Row wordToGuess={row > 3 ? wordToGuess : null} active={row === 3} word={data[3]} />
          <Row wordToGuess={row > 4 ? wordToGuess : null} active={row === 4} word={data[4]} />
        </div>
        <div className="keyboard">
          <Keyboard layout={keyboardLayout} display={keyboardDisplay} onKeyPress={keyboardPressed} buttonTheme={buttonTheme}>
            {JSON.stringify(buttonTheme)}
          </Keyboard>
        </div>
      </div>
    </div>
  );
}

function Row({ wordToGuess, active, word }) {
  return (
    <div className={`row${active ? " active" : ""}`}>
      <Cell word={word} index={0} wordToGuess={wordToGuess} />
      <Cell word={word} index={1} wordToGuess={wordToGuess} />
      <Cell word={word} index={2} wordToGuess={wordToGuess} />
      <Cell word={word} index={3} wordToGuess={wordToGuess} />
      <Cell word={word} index={4} wordToGuess={wordToGuess} />
    </div>
  );
}

// hello, world!
function Cell({ wordToGuess, word, index }) {
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

export default App;
