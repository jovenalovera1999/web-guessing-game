import React, { useEffect } from "react";
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

  return (
    <>
      <div className="container">
        Player 1: {playerOneName}
        Player 2: {playerTwoName}
      </div>
    </>
  );
}

export default Game;
