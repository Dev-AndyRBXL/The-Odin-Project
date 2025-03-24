const Ship = require('../index');

test('create a ship and check its properties', () => {
  const ship1 = new Ship('carrier');
  expect(ship1.length).toBe(5);
  expect(ship1.hit()).toBe(1);
  expect(ship1.isSunk()).toBe(false);
});
