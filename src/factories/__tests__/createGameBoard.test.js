import { gameBoard } from "../createGameBoard";
import { createShip } from "../createShip";
// the thing each - each function needs to do something
// so to name a test:
//just name what the function does after you called it - the "state of the app"
// result of it
describe("Gabmeboard functionallity", () => {
  let testBoard;
  let ship;
  beforeEach(() => {
    ship = createShip(5);
    testBoard = gameBoard();
  });
  test("check if gameboard is 10x10 grid", () => {
    expect(testBoard.getBoard().length).toBe(10);
  });

  // function placethe ships at the correct place - assuming it's valid
  // it's a income command function, test the side effects
  // test the board
  test("place the vertical ship at the board given a valid place", () => {
    testBoard.placeShip(ship, "vertical", 6, 4);
    for (let i = 6; i > 6 - ship.getShipLength(); i--) {
      expect(testBoard.getBoard()[i][4]).toEqual(ship);
    }
  });

  // incoming command function, test side effects (test)

  test("place  the horizontal ship at the board given a valid place", () => {
    testBoard.placeShip(ship, "horizontal", 3, 4);
    for (let i = 4; i < 4 + ship.getShipLength(); i++) {
      expect(testBoard.getBoard()[3][i]).toEqual(ship);
    }
  });

  // function to be tested: recieveAttack
  //incoming command, test sideEffects
  test("should hit the shipCarrier boat, and change position [5][4] to true", () => {
    testBoard.placeShip(ship, "horizontal", 5, 3);
    testBoard.receiveAttack(5, 4);
    expect(ship.getNumberOfHits()).toBe(1);
    expect(testBoard.getBoard()[5][4]).toBe(true);
  });

  //incoming command
  test("should miss, and change the cell to false", () => {
    testBoard.placeShip(ship, "horizontal", 5, 3);
    testBoard.receiveAttack(4, 4);
    expect(testBoard.getBoard()[4][4]).toBe(false);
  });

  //incoming query
  test(" should return all the missed attack", () => {
    testBoard.placeShip(ship, "horizontal", 5, 3);
    testBoard.receiveAttack(4, 4);
    testBoard.receiveAttack(3, 4);
    testBoard.receiveAttack(2, 7);
    testBoard.receiveAttack(5, 4);
    expect(testBoard.getMissedAttacks()).toEqual([
      { x: 4, y: 4 },
      { x: 3, y: 4 },
      { x: 2, y: 7 },
    ]);
  });

  //incoming command && query
  test("should not place the ship for non valid place", () => {
    testBoard.placeShip(ship, "horizontal", 5, 3);
    const ship3 = createShip(3);
    testBoard.placeShip(ship3, "horizontal", 1, 1);
    const ship2 = createShip(4);
    expect(testBoard.placeShip(ship2, "vertical", 5, 3)).toBe(
      "not valid place",
    );
    testBoard.placeShip(ship2, "horizontal", 5, 4);
    testBoard.placeShip(ship2, "vertical", 5, 5);

    expect(testBoard.getAllShips()).toEqual([ship, ship3]);
  });

  test("should return all the ships that been placed", () => {
    const ship4 = createShip(4);
    const ship5 = createShip(5);
    testBoard.placeShip(ship4, "vertical", 4, 5);
    testBoard.placeShip(ship5, "horizontal", 5, 5);
    expect(testBoard.getAllShips()).toEqual([ship4, ship5]);
  });

  // report if all ships  has been sunk
  //incoming query, test the assert returned value
  test("should report that all ships were sunk", () => {
    const ship1 = createShip(5);
    const ship2 = createShip(4);
    const ship3 = createShip(3);
    testBoard.placeShip(ship1, "horizontal", 1, 1);
    testBoard.placeShip(ship2, "horizontal", 2, 1);
    testBoard.placeShip(ship3, "horizontal", 3, 1);

    for (let i = 1; i <= 5; i++) {
      testBoard.receiveAttack(1, i);
    }
    for (let i = 1; i <= 4; i++) {
      testBoard.receiveAttack(2, i);
    }
    for (let i = 1; i <= 3; i++) {
      testBoard.receiveAttack(3, i);
    }
    expect(testBoard.isAllShipSunk()).toBe(true);
  });

  //incoming query, test the assert returned value
  test("should report that all ships were not sunk", () => {
    const ship1 = createShip(5);
    const ship2 = createShip(4);
    const ship3 = createShip(3);
    testBoard.placeShip(ship1, "horizontal", 1, 1);
    testBoard.placeShip(ship2, "horizontal", 2, 1);
    testBoard.placeShip(ship3, "horizontal", 3, 1);

    for (let i = 1; i <= 5; i++) {
      testBoard.receiveAttack(1, i);
    }
    for (let i = 1; i <= 4; i++) {
      testBoard.receiveAttack(2, i);
    }

    expect(testBoard.isAllShipSunk()).toBe(false);
  });
});
