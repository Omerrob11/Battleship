import { gameBoard } from "../createGameBoard";
import createPlayer from "../createPlayer";

describe("player factory function testing", () => {
  let testPlayer;
  let testBoard;
  let computerPlayer;
  beforeEach(() => {
    testPlayer = createPlayer("omer");
    testBoard = gameBoard();
    computerPlayer = createPlayer("computer");
  });
  //incoming query
  // use pure function
  test("should return the name of the player - omer", () => {
    expect(testPlayer.getPlayerName()).toBe("omer");
  });

  // incoming query - a function that return the board only
  // function that create a board, checking if it is really reutrning a board
  test("should return is own board", () => {
    expect(testPlayer.getPlayerBoard().getBoard()).toEqual(
      testBoard.getBoard(),
    );
  });

  // outgoing command - will call the recieve attack (gameboard external object), and change it's state
  // test that it is actually called
  // a function that get coordinates and the enemy player, and attack it's board.
  test("Should attack a position in the enemey board", () => {
    const computerBoard = computerPlayer.getPlayerBoard();
    const spy = jest.spyOn(computerBoard, "receiveAttack");
    // gest an object and a method name
    testPlayer.attackEnemy(computerPlayer, 5, 4);
    expect(spy).toHaveBeenCalled();
  });
});

// outgoing messages-
// messgae that go from the object we test to another object
// meaning - verify that by call this object method
// it will call the external object method -
// meaning, that it will be actually called
