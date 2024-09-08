import { gameBoard } from "./createGameBoard";

function createPlayer(name) {
  // properties
  const playerName = name;
  const playerBoard = gameBoard();
  //methods

  function getPlayerName() {
    return playerName;
  }
  // Why not private? because we need it for the board
  function getPlayerBoard() {
    return playerBoard;
  }

  function attackEnemy(enemyPlayer, x, y) {
    enemyPlayer.getPlayerBoard().receiveAttack(x, y);
  }

  return {
    getPlayerName,
    getPlayerBoard,
    attackEnemy,
  };
}

export default createPlayer;
