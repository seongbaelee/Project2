import { useEffect, useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [allNewDice, setAllNewDice] = useState(getNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const AllDiceHeld = allNewDice.every((die) => die.isHeld);
    const OneDiceVal = allNewDice[0].value;
    const AllDiceSame = allNewDice.every((die) => die.value === OneDiceVal);

    if (AllDiceHeld && AllDiceSame) {
      setTenzies(true);
    }
  }, [allNewDice]);

  function getNewDice() {
    const randomNumbers = [];
    for (let i = 0; i < 10; i++) {
      randomNumbers.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return randomNumbers;
  }

  function holdDice(id) {
    console.log(id);
    console.log(allNewDice);
    setAllNewDice((prev) =>
      prev.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
    );
  }

  function rollDice() {
    if (!tenzies) {
      setAllNewDice((prev) =>
        prev.map((die) =>
          die.isHeld
            ? die
            : {
                ...die,
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid(),
              }
        )
      );
    } else {
      setAllNewDice(getNewDice());
      setTenzies(false);
    }

    // const AllDiceHeld = allNewDice.every((die) => die.isHeld);
    // const OneDiceVal = allNewDice[0].value;
    // const AllDiceSame = allNewDice.every((die) => die.value === OneDiceVal);

    // if (AllDiceHeld && AllDiceSame) {
    //   setAllNewDice(getNewDice());
    //   setTenzies(false);
    // }
  }

  const diceDisplay = allNewDice.map((num) => (
    <Die
      value={num.value}
      isHeld={num.isHeld}
      holdDice={() => holdDice(num.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls
      </p>
      <div className="grid--5x2 grid--arrangement">{diceDisplay}</div>
      <button onClick={() => rollDice()}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
