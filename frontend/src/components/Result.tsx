import React from "react";

function Result(
  term: string,
  category: "Number" | "Country" | "Food" | "Animal" | "Color",
  secretNum: number,
  answer?: string
) {
  let result;

  if (category === "Number") {
    if (term) {
      const guessedNumber = parseInt(term);

      if (!isNaN(guessedNumber)) {
        if (guessedNumber < secretNum) {
          result = "You guess number is too low!";
        } else if (guessedNumber > secretNum) {
          result = "Your guess number is too high!";
        } else if (guessedNumber === secretNum) {
          result = "Congratulations! You guessed the number!";
        }
      } else {
        result = "Invalid Input!";
      }
    }
  } else if (category === "Country") {
    if (term.toLowerCase() === "yes") {
    }
  }

  return <div>Result</div>;
}

export default Result;
