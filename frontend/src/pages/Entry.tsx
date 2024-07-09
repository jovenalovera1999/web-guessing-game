import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Entry() {
  useEffect(() => {
    document.title = "Guessing Game | Entry";
  });

  const [playerOneName, setPlayerOneName] = useState("");
  const [playerTwoName, setPlayerTwoName] = useState("");
  const [scoreGoal, setScoreGoal] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "player_one_name") {
      setPlayerOneName(value);
    } else if (name === "player_two_name") {
      setPlayerTwoName(value);
    } else if (name === "score_goal") {
      setScoreGoal(value);
    }
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="card mt-5">
            <div className="card-body">
              <h5 className="card-title mb-3">Enter Player 1 and 2 Name</h5>
              <div className="mb-3">
                <label htmlFor="player_one_name">Player 1 Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="player_one_name"
                  id="player_one_name"
                  value={playerOneName}
                  onChange={handleInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="player_two_name">Player 2 Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="player_two_name"
                  id="player_two_name"
                  value={playerTwoName}
                  onChange={handleInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="score_goal">Score Goal</label>
                <input
                  type="text"
                  className="form-control"
                  name="score_goal"
                  id="score_goal"
                  value={scoreGoal}
                  onChange={handleInput}
                />
              </div>
              <div className="d-flex justify-content-center">
                <Link
                  to={`/game?playerOneName=${encodeURIComponent(
                    playerOneName
                  )}&playerTwoName=${encodeURIComponent(
                    playerTwoName
                  )}&scoreGoal=${scoreGoal}`}
                  className="btn btn-primary"
                >
                  Start Game
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Entry;
