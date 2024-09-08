const boardSize = 10;

function gameBoard() {
  const board = createBoardGame();
  const missedAttacks = [];
  const allShips = [];
  // using closured, we have a reference to the board
  function placeShip(ship, direction, xStart, yStart) {
    const shipLength = ship.getShipLength();

    if (!checkForValidPlace(xStart, yStart, direction, shipLength)) {
      return "not valid place";
      // later you will put code that do stuff when it's bad
      // also - you will probably call the setPosition on the ship
    }
    allShips.push(ship);
    if (direction == "vertical") {
      for (let i = xStart; i > xStart - shipLength; i--) {
        board[i][yStart] = ship;
      }
    } else {
      for (let i = yStart; i < yStart + shipLength; i++) {
        board[xStart][i] = ship;
      }
    }
  }

  function checkForValidPlace(xStart, yStart, direction, shipLength) {
    if (!allShips.length) {
      return true;
    }

    if (direction === "vertical") {
      for (let i = xStart; i > xStart - shipLength; i--) {
        if (board[i][yStart] !== 0) {
          return false;
        }
      }
    } else {
      for (let i = yStart; i < yStart + shipLength; i++) {
        if (board[xStart][i] !== 0) {
          return false;
        }
      }
    }

    return true;
  }
  function receiveAttack(x, y) {
    // check if it's an object
    if (typeof board[x][y] === "object" && board[x][x] !== null) {
      const ship = board[x][y];
      ship.hit();
      board[x][y] = true;
    } else {
      board[x][y] = false;
      addToMissedAttacks(x, y);
    }
  }

  function addToMissedAttacks(x, y) {
    missedAttacks.push({ x: x, y: y });
  }

  function getMissedAttacks() {
    return missedAttacks;
  }

  function getAllShips() {
    return allShips;
  }

  function isAllShipSunk() {
    return allShips.every((ship) => ship.isSunk());
  }

  return {
    getBoard: () => board,
    placeShip,
    receiveAttack,
    getMissedAttacks,
    getAllShips,
    isAllShipSunk,
  };
}
function createBoardGame() {
  // {length:10} - it's array like objects, that tell Array.from to create
  // array with 10 elements
  // than, Array(10) creates array with 10 elements, and we fill it with 0
  // it's a map function, meaning, we call the function as the size of it, 10 times, and each time we return array of size 10.

  return Array.from({ length: 10 }, () => Array(10).fill(0));
}

export { gameBoard };

// if i create private function
// is it not damage the principle of "pure functions?"
