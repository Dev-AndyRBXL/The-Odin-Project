const Gameboard = require('../index');

test('checks if the board exists', () => {
    expect(new Gameboard()).toBe(true);
});
