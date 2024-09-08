import { createShip } from "../createShip";

describe("create ship factory function", () => {
  let shipCarrier;
  beforeEach(() => {
    shipCarrier = createShip(5);
  });
  test("should take a number and return the ship length as that number", () => {
    expect(shipCarrier.getShipLength()).toEqual(5);
  });

  test("should return the number of hits the function has, return 0 initially", () => {
    expect(shipCarrier.getNumberOfHits()).toBe(0);
  });

  // incoming command function, test for direct public side effects
  test("should exist hit function", () => {
    shipCarrier.hit();

    expect(shipCarrier.getNumberOfHits()).toBe(1);
  });

  //incoming query function
  test("shows that the boat is not sunk", () => {
    expect(shipCarrier.isSunk()).toBe(false);
  });

  test("shows that the boat is sunk", () => {
    for (let i = 0; i < shipCarrier.getShipLength(); i++) {
      shipCarrier.hit();
    }
    expect(shipCarrier.isSunk()).toBe(true);
  });

  // incoming query function
  // should return the position of the ship.
  // at first, the position is null.
  test("Should return the position of the ship", () => {
    expect(shipCarrier.getPosition()).toEqual(null);
  });

  // incoming command function
  // return the changed state -
  test("should set the position of the ship", () => {
    shipCarrier.setPosition([
      { x: 5, y: 4 },
      { x: 5, y: 5 },
      { x: 5, y: 6 },
      { x: 5, y: 7 },
      { x: 5, y: 8 },
    ]);
    expect(shipCarrier.getPosition()).toEqual([
      { x: 5, y: 4 },
      { x: 5, y: 5 },
      { x: 5, y: 6 },
      { x: 5, y: 7 },
      { x: 5, y: 8 },
    ]);
  });
});
