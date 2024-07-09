import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Game() {
  useEffect(() => {
    document.title = "Gussing Game | Game";
  });

  const query = useQuery();
  const playerOneName = query.get("playerOneName") || "Player 1";
  const playerTwoName = query.get("playerTwoName") || "Player 2";

  const [resultPlayerOne, setResultPlayerOne] = useState("");
  const [resultPlayerTwo, setResultPlayerTwo] = useState("");
  const [isSuccessPlayerOne, setIsSuccessPlayerOne] = useState(false);
  const [isSuccessPlayerTwo, setIsSuccessPlayerTwo] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const [termPlayer1, setTermPlayer1] = useState("");
  const [termPlayer2, setTermPlayer2] = useState("");
  const [scorePlayer1, setScorePlayer1] = useState(0);
  const [scorePlayer2, setScorePlayer2] = useState(0);
  const [secret, setSecret] = useState(Math.floor(Math.random() * 30) + 1);
  const [category, setCategory] = useState<
    "Number" | "Animal" | "Color" | "Food" | "Country"
  >("Number");
  const [animalCategory, setAnimalCategory] = useState<"Pet" | "Wild">("Pet");
  const [animalQuestions] = useState(["Is it a Pet?", "Is is a Wild?"]);
  const [animalAnswer] = useState([
    ["yes", "no"],
    ["no", "yes"],
  ]);
  const [animalQuestionIndex, setAnimalQuestionIndex] = useState(
    Math.floor(Math.random() * 2)
  );
  const [foodQuestions] = useState([
    "Is pineapple a fruit?",
    "Is pineapple a vegetable?",
    "Is apple a fruit?",
    "Is apple a vegetable?",
    "Is orange a fruit?",
    "Is orange a vegetable?",
    "Is eggplant a fruit?",
    "Is eggplant a vegetable?",
  ]);
  const [foodAnswers] = useState([
    ["yes", "no"],
    ["no", "yes"],
    ["yes", "no"],
    ["no", "yes"],
    ["yes", "no"],
    ["no", "yes"],
    ["no", "yes"],
    ["yes", "no"],
  ]);
  const [foodQuestionIndex, setFoodQuestionIndex] = useState(
    Math.floor(Math.random() * 8)
  );
  const [colorQuestions] = useState([
    "Is red a primary color?",
    "Is orange a secondary color?",
    "Is blue a primary color?",
    "Is green a secondary color?",
    "Is yellow a primary color?",
    "Is purple a secondary color?",
  ]);
  const [colorAnswers] = useState([
    ["yes", "no"],
    ["no", "yes"],
    ["yes", "no"],
    ["no", "yes"],
    ["yes", "no"],
    ["no", "yes"],
  ]);
  const [colorQuestionIndex, setColorQuestionIndex] = useState(
    Math.floor(Math.random() * 6)
  );
  const [countryQuestions] = useState([
    "Is Philippines in Europe?",
    "Is Philippines in Asia?",
    "Is US in Europe?",
    "Is US in Asia?",
    "Is Canada in Europe?",
    "Is Canada in Asia?",
    "Is Japan in Europe?",
    "Is Japan in Asia?",
    "Is Australia in Europe?",
    "Is Australia in Asia?",
  ]);
  const [countryAnswers] = useState([
    ["no", "yes"],
    ["yes", "no"],
    ["no", "yes"],
    ["yes", "no"],
    ["no", "yes"],
    ["yes", "no"],
    ["no", "yes"],
    ["yes", "no"],
    ["no", "yes"],
    ["yes", "no"],
  ]);
  const [countryQuestionIndex, setCountryQuestionIndex] = useState(
    Math.floor(Math.random() * 10)
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "termPlayer1") {
      setTermPlayer1(value);
    } else if (name === "termPlayer2") {
      setTermPlayer2(value);
    }
  };

  const handleNewGame = () => {
    const categories = [
      "Number",
      "Animal",
      "Food",
      "Color",
      "Country",
    ] as const;
    const newCategory =
      categories[Math.floor(Math.random() * categories.length)];

    const animalCategories = ["Pet", "Wild"] as const;
    const newAnimalCategory =
      animalCategories[Math.floor(Math.random() * animalCategories.length)];

    setSecret(Math.floor(Math.random() * 30) + 1);
    setTermPlayer1("");
    setTermPlayer2("");
    setCategory(newCategory);
    setAnimalCategory(newAnimalCategory);
    setAnimalQuestionIndex(Math.floor(Math.random() * 2));
    setColorQuestionIndex(Math.floor(Math.random() * 6));
    setCountryQuestionIndex(Math.floor(Math.random() * 10));
    setFoodQuestionIndex(Math.floor(Math.random() * 8));
    setIsInputDisabled(false);

    if (isSuccessPlayerOne || isSuccessPlayerTwo) {
      setResultPlayerOne("");
      setResultPlayerTwo("");
      setIsSuccessPlayerOne(false);
      setIsSuccessPlayerTwo(false);
    }
  };

  const handleScoreUpdate = (
    player: "Player1" | "Player2",
    term: string,
    category: "Number" | "Animal" | "Color" | "Food" | "Country",
    answer?: string
  ) => {
    if (category === "Number") {
      const guessedNumber = parseInt(term);

      if (!isNaN(guessedNumber) && guessedNumber === secret) {
        if (player === "Player1") {
          setIsSuccessPlayerOne(true);
          setResultPlayerOne("Congratulations! You guessed the number!");
          setScorePlayer1(scorePlayer1 + 1);
        } else {
          setIsSuccessPlayerTwo(true);
          setResultPlayerTwo("Congratulations! You guessed the number!");
          setScorePlayer2(scorePlayer2 + 1);
        }

        setIsInputDisabled(true);
      } else if (!isNaN(guessedNumber) && guessedNumber < secret) {
        if (player === "Player1") {
          setIsSuccessPlayerOne(false);
          setResultPlayerOne("Your guess number is too low!");
        } else if (player === "Player2") {
          setIsSuccessPlayerTwo(false);
          setResultPlayerTwo("Your guess number is too low!");
        }
      } else if (!isNaN(guessedNumber) && guessedNumber > secret) {
        if (player === "Player1") {
          setIsSuccessPlayerOne(false);
          setResultPlayerOne("Your guess number is too high!");
        } else if (player === "Player2") {
          setIsSuccessPlayerTwo(false);
          setResultPlayerTwo("Your guess number is too high!");
        }
      } else {
        if (player === "Player1") {
          setIsSuccessPlayerOne(false);
          setResultPlayerOne("Invalid input!");
        } else if (player === "Player2") {
          setIsSuccessPlayerTwo(false);
          setResultPlayerTwo("Invalid input!");
        }
      }
    } else if (category === "Animal") {
      const currentQuestionAnswer =
        animalAnswer[animalQuestionIndex][
          animalCategory === "Pet" ? 0 : 1
        ].toLowerCase();

      if (answer && answer.toLowerCase() === currentQuestionAnswer) {
        if (player === "Player1") {
          setIsSuccessPlayerOne(true);
          setResultPlayerOne("Correct answer!");

          setScorePlayer1(scorePlayer1 + 1);
        } else if (player === "Player2") {
          setIsSuccessPlayerTwo(true);
          setResultPlayerTwo("Correct answer!");

          setScorePlayer2(scorePlayer2 + 1);
        }

        setIsInputDisabled(true);
      } else if (player === "Player1") {
        setIsSuccessPlayerOne(false);
        setResultPlayerOne("Wrong answer!");

        handleNewGame();
      } else if (player === "Player2") {
        setIsSuccessPlayerTwo(false);
        setResultPlayerTwo("Wrong answer");

        handleNewGame();
      }
    } else if (category === "Color") {
      const currentQuestionAnswer =
        colorAnswers[colorQuestionIndex][
          answer?.toLowerCase() === "yes" ? 0 : 1
        ].toLowerCase();

      if (answer && answer.toLowerCase() === currentQuestionAnswer) {
        if (player === "Player1") {
          setIsSuccessPlayerOne(true);
          setResultPlayerOne("Correct answer!");

          setScorePlayer1(scorePlayer1 + 1);
        } else if (player === "Player2") {
          setIsSuccessPlayerTwo(true);
          setResultPlayerTwo("Correct answer!");

          setScorePlayer2(scorePlayer2 + 1);
        }

        setIsInputDisabled(true);
      } else if (player === "Player1") {
        setIsSuccessPlayerOne(false);
        setResultPlayerOne("Wrong answer!");

        handleNewGame();
      } else if (player === "Player2") {
        setIsSuccessPlayerTwo(false);
        setResultPlayerTwo("Wrong answer");

        handleNewGame();
      }
    } else if (category === "Food") {
      const currentQuestionAnswer =
        foodAnswers[foodQuestionIndex][
          answer?.toLowerCase() === "yes" ? 0 : 1
        ].toLowerCase();

      if (answer && answer.toLowerCase() === currentQuestionAnswer) {
        if (player === "Player1") {
          setIsSuccessPlayerOne(true);
          setResultPlayerOne("Correct answer!");

          setScorePlayer1(scorePlayer1 + 1);
        } else if (player === "Player2") {
          setIsSuccessPlayerTwo(true);
          setResultPlayerTwo("Correct answer!");

          setScorePlayer2(scorePlayer2 + 1);
        }

        setIsInputDisabled(true);
      } else if (player === "Player1") {
        setIsSuccessPlayerOne(false);
        setResultPlayerOne("Wrong answer!");

        handleNewGame();
      } else if (player === "Player2") {
        setIsSuccessPlayerTwo(false);
        setResultPlayerTwo("Wrong answer");

        handleNewGame();
      }
    } else if (category === "Country") {
      const currentQuestionAnswer =
        countryAnswers[countryQuestionIndex][
          answer?.toLowerCase() === "yes" ? 0 : 1
        ].toLowerCase();

      if (answer && answer.toLowerCase() === currentQuestionAnswer) {
        if (player === "Player1") {
          setIsSuccessPlayerOne(true);
          setResultPlayerOne("Correct answer!");

          setScorePlayer1(scorePlayer1 + 1);
        } else if (player === "Player2") {
          setIsSuccessPlayerTwo(true);
          setResultPlayerTwo("Correct answer!");

          setScorePlayer2(scorePlayer2 + 1);
        }

        setIsInputDisabled(true);
      } else if (player === "Player1") {
        setIsSuccessPlayerOne(false);
        setResultPlayerOne("Wrong answer!");

        handleNewGame();
      } else if (player === "Player2") {
        setIsSuccessPlayerTwo(false);
        setResultPlayerTwo("Wrong answer");

        handleNewGame();
      }
    }
  };

  const handleSubmit = (
    player: "Player1" | "Player2",
    term: string,
    category: "Number" | "Animal" | "Color" | "Food" | "Country",
    answer?: string
  ) => {
    handleScoreUpdate(player, term, category, answer);
  };

  let gameContent;

  if (category === "Number") {
    gameContent = (
      <>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Player 1: {playerOneName}</h5>
            <div className="mb-3">
              <label htmlFor="termPlayer1">Guess a number 1 to 30:</label>
              <input
                type="text"
                className="form-control mb-3"
                name="termPlayer1"
                id="termPlayer1"
                value={termPlayer1}
                onChange={handleChange}
                disabled={isInputDisabled}
              />
              <p
                className={`text-${isSuccessPlayerOne ? "success" : "danger"}`}
              >
                {resultPlayerOne}
              </p>
              <button
                className="btn btn-primary"
                onClick={() =>
                  handleSubmit("Player1", termPlayer1, "Number", termPlayer1)
                }
                disabled={isInputDisabled}
              >
                Submit Answer
              </button>
            </div>
            <h5 className="card-title">Player 2: {playerTwoName}</h5>
            <div className="mb-3">
              <label htmlFor="termPlayer2">Guess a number 1 to 30:</label>
              <input
                type="text"
                className="form-control mb-3"
                name="termPlayer2"
                id="termPlayer2"
                value={termPlayer2}
                onChange={handleChange}
                disabled={isInputDisabled}
              />
              <p
                className={`text-${isSuccessPlayerTwo ? "success" : "danger"}`}
              >
                {resultPlayerTwo}
              </p>
              <button
                className="btn btn-primary"
                onClick={() =>
                  handleSubmit("Player2", termPlayer2, "Number", termPlayer2)
                }
                disabled={isInputDisabled}
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else if (category === "Animal") {
    gameContent = (
      <>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Player 1: {playerOneName}</h5>
            <div className="mb-3">
              <label htmlFor="termPlayer1">
                {animalQuestions[animalQuestionIndex]}
              </label>
              <input
                type="text"
                className="form-control mb-3"
                name="termPlayer1"
                id="termPlayer1"
                value={termPlayer1}
                onChange={handleChange}
                disabled={isInputDisabled}
              />
              <p
                className={`text-${isSuccessPlayerOne ? "success" : "danger"}`}
              >
                {resultPlayerOne}
              </p>
              <button
                className="btn btn-primary"
                onClick={() =>
                  handleSubmit("Player1", termPlayer1, "Animal", termPlayer1)
                }
                disabled={isInputDisabled}
              >
                Submit Answer
              </button>
            </div>
            <h5 className="card-title">Player 2: {playerTwoName}</h5>
            <div className="mb-3">
              <label htmlFor="termPlayer2">
                {animalQuestions[animalQuestionIndex]}
              </label>
              <input
                type="text"
                className="form-control mb-3"
                name="termPlayer2"
                id="termPlayer2"
                value={termPlayer2}
                onChange={handleChange}
                disabled={isInputDisabled}
              />
              <p
                className={`text-${isSuccessPlayerTwo ? "success" : "danger"}`}
              >
                {resultPlayerTwo}
              </p>
              <button
                className="btn btn-primary"
                onClick={() =>
                  handleSubmit("Player2", termPlayer2, "Animal", termPlayer2)
                }
                disabled={isInputDisabled}
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else if (category === "Color") {
    gameContent = (
      <>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Player 1: {playerOneName}</h5>
            <div className="mb-3">
              <label htmlFor="termPlayer1">
                {colorQuestions[colorQuestionIndex]}
              </label>
              <input
                type="text"
                className="form-control mb-3"
                name="termPlayer1"
                id="termPlayer1"
                value={termPlayer1}
                onChange={handleChange}
                disabled={isInputDisabled}
              />
              <p
                className={`text-${isSuccessPlayerOne ? "success" : "danger"}`}
              >
                {resultPlayerOne}
              </p>
              <button
                className="btn btn-primary"
                onClick={() =>
                  handleSubmit("Player1", termPlayer1, "Color", termPlayer1)
                }
                disabled={isInputDisabled}
              >
                Submit Answer
              </button>
            </div>
            <h5 className="card-title">Player 2: {playerTwoName}</h5>
            <div className="mb-3">
              <label htmlFor="termPlayer2">
                {colorQuestions[colorQuestionIndex]}
              </label>
              <input
                type="text"
                className="form-control mb-3"
                name="termPlayer2"
                id="termPlayer2"
                value={termPlayer2}
                onChange={handleChange}
                disabled={isInputDisabled}
              />
              <p
                className={`text-${isSuccessPlayerTwo ? "success" : "danger"}`}
              >
                {resultPlayerTwo}
              </p>
              <button
                className="btn btn-primary"
                onClick={() =>
                  handleSubmit("Player2", termPlayer2, "Color", termPlayer2)
                }
                disabled={isInputDisabled}
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else if (category === "Country") {
    gameContent = (
      <>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Player 1: {playerOneName}</h5>
            <div className="mb-3">
              <label htmlFor="termPlayer1">
                {countryQuestions[countryQuestionIndex]}
              </label>
              <input
                type="text"
                className="form-control mb-3"
                name="termPlayer1"
                id="termPlayer1"
                value={termPlayer1}
                onChange={handleChange}
                disabled={isInputDisabled}
              />
              <p
                className={`text-${isSuccessPlayerOne ? "success" : "danger"}`}
              >
                {resultPlayerOne}
              </p>
              <button
                className="btn btn-primary"
                onClick={() =>
                  handleSubmit("Player1", termPlayer1, "Country", termPlayer1)
                }
                disabled={isInputDisabled}
              >
                Submit Answer
              </button>
            </div>
            <h5 className="card-title">Player 2: {playerTwoName}</h5>
            <div className="mb-3">
              <label htmlFor="termPlayer2">
                {countryQuestions[countryQuestionIndex]}
              </label>
              <input
                type="text"
                className="form-control mb-3"
                name="termPlayer2"
                id="termPlayer2"
                value={termPlayer2}
                onChange={handleChange}
                disabled={isInputDisabled}
              />
              <p
                className={`text-${isSuccessPlayerTwo ? "success" : "danger"}`}
              >
                {resultPlayerTwo}
              </p>
              <button
                className="btn btn-primary"
                onClick={() =>
                  handleSubmit("Player2", termPlayer2, "Country", termPlayer2)
                }
                disabled={isInputDisabled}
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else if (category === "Food") {
    gameContent = (
      <>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Player 1: {playerOneName}</h5>
            <div className="mb-3">
              <label htmlFor="termPlayer1">
                {foodQuestions[foodQuestionIndex]}
              </label>
              <input
                type="text"
                className="form-control mb-3"
                name="termPlayer1"
                id="termPlayer1"
                value={termPlayer1}
                onChange={handleChange}
                disabled={isInputDisabled}
              />
              <p
                className={`text-${isSuccessPlayerOne ? "success" : "danger"}`}
              >
                {resultPlayerOne}
              </p>
              <button
                className="btn btn-primary"
                onClick={() =>
                  handleSubmit("Player1", termPlayer1, "Food", termPlayer1)
                }
                disabled={isInputDisabled}
              >
                Submit Answer
              </button>
            </div>
            <h5 className="card-title">Player 2: {playerTwoName}</h5>
            <div className="mb-3">
              <label htmlFor="termPlayer2">
                {foodQuestions[foodQuestionIndex]}
              </label>
              <input
                type="text"
                className="form-control mb-3"
                name="termPlayer2"
                id="termPlayer2"
                value={termPlayer2}
                onChange={handleChange}
                disabled={isInputDisabled}
              />
              <p
                className={`text-${isSuccessPlayerTwo ? "success" : "danger"}`}
              >
                {resultPlayerTwo}
              </p>
              <button
                className="btn btn-primary"
                onClick={() =>
                  handleSubmit("Player2", termPlayer2, "Food", termPlayer2)
                }
                disabled={isInputDisabled}
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <button
          className="btn btn-primary mt-3 mb-3 w-100"
          onClick={handleNewGame}
        >
          New Game
        </button>
        {gameContent}
        <div className="row mt-3">
          <div className="col">
            <h1>Player 1: {playerOneName}</h1>
            <h3>{scorePlayer1}</h3>
          </div>
          <div className="col">
            <h1>Player 2: {playerTwoName}</h1>
            <h3>{scorePlayer2}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
