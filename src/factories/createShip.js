// workflow:

// create a feature branch
// merge it to test
// if all good, merge test to main
// if not, delete test, do change, create test again, and do it all over again.
function createShip(length) {
  const shipLength = length;
  let numberOfHits = 0;

  return {
    getShipLength: () => shipLength,
    isSunk: () => {
      return numberOfHits == shipLength;
    },
    getNumberOfHits: () => numberOfHits,
    hit: () => {
      numberOfHits = numberOfHits + 1;
    },
  };
}

export { createShip };

// ask yourself:
// is this a command or query method, or self method?
// test accordignyl
// is this the purest we can have?
// is it loosely coupled n=enough?
