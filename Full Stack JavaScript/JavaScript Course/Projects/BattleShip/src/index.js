import './style.css';

class Gameboard {
  static #size = 10;

  #canPlaceShip(shipLength, x, y, dir) {
    for (let i = 0; i < shipLength; i++) {
      const newX = dir === 'horizontal' ? x + i : x;
      const newY = dir === 'vertical' ? y + i : y;

      if (
        newX < 0 ||
        newX >= Gameboard.#size ||
        newY < 0 ||
        newY >= Gameboard.#size
      ) {
        return false;
      }

      const cell = this.gameboard.get(`${newX},${newY}`);
      if (cell.ship !== null) {
        return false;
      }
    }
    return true;
  }

  #createGameboard() {
    let grid = new Map();
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        grid.set(`${x},${y}`, { ship: null, visited: false });
      }
    }
    return grid;
  }

  constructor(name) {
    this.name = name;
    this.gameboard = this.#createGameboard();
    this.ships = [];
  }

  receiveAttack(pos) {
    const [x, y] = pos;
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      throw new Error('Invalid coordinates (must be between 0-9)!');
    }

    let position = this.gameboard.get(`${x},${y}`);
    if (!position.visited) {
      const ship = position.ship;
      if (ship) {
        ship.hit();
        position.ship = null;
      }

      position.visited = true;
      this.displayBoard();
    }
  }

  placeShip(ship, pos, dir = 'horizontal') {
    const [x, y] = pos;

    for (let i = 0; i < ship.length; i++) {
      const newX = dir === 'horizontal' ? x + i : x;
      const newY = dir === 'vertical' ? y + i : y;
      this.gameboard.set(`${newX},${newY}`, { ship, visited: false });
    }

    this.ships.push(ship);
  }

  // places all the ships in random locations each
  placeShips() {
    const shipTypes = [
      'carrier',
      'battleship',
      'cruiser',
      'submarine',
      'destroyer',
    ];

    this.#createGameboard(); // resets the gameboard

    for (const type of shipTypes) {
      let placed = false;
      const ship = new Ship(type);

      while (!placed) {
        const x = Math.floor(Math.random() * Gameboard.#size);
        const y = Math.floor(Math.random() * Gameboard.#size);
        const dir = Math.random() > 0.5 ? 'horizontal' : 'vertical';

        if (this.#canPlaceShip(ship.length, x, y, dir)) {
          this.placeShip(ship, [x, y], dir);
          placed = true;
        }
      }
    }
  }

  displayBoard() {
    let result = [];
    for (let [_, v] of this.gameboard.entries()) {
      result.push(`[${v.ship ? `${v.ship.name[0].toUpperCase()}` : v.visited ? 'X' : ' '}]`);
    }
    console.log(result.join(' '));
  }
}

class Ship {
  static #shipLengths = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2,
  };

  constructor(name) {
    if (!name) throw new Error(`"${name}" was not found!`);

    this.name = name;
    this.length = Ship.#shipLengths[name.toLowerCase()];
    this.hits = 0;
  }

  hit() {
    console.log(`A ${this.name} was attacked!`);
    return ++this.hits;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}

const gameboard1 = new Gameboard('Player 1');
gameboard1.placeShips();
gameboard1.displayBoard();

const gameboard2 = new Gameboard('Player 2');
gameboard2.placeShips();
gameboard2.displayBoard();

gameboard1.receiveAttack([3, 1]);
