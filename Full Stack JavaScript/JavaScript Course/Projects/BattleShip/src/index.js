import './style.css';
import './scripts/domHandler.js';

class Ship {
  static #SHIP_LENGTHS = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2,
  };

  constructor(name) {
    if (!Ship.#SHIP_LENGTHS[name.toLowerCase()]) {
      throw new Error(`Invalid ship name: "${name}"`);
    }

    this.name = name;
    this.length = Ship.#SHIP_LENGTHS[name.toLowerCase()];
    this.hits = 0;
  }

  hit() {
    this.hits++;
    return this.hits;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}

class Gameboard {
  static #SIZE = 10;
  static players = new Map();

  constructor(player) {
    this.player = player;
    this.gameboard = this.#createGameboard();
    this.ships = [];
  }

  #createGameboard() {
    Gameboard.players.set(this.player.name, this.player);

    const grid = new Map();
    for (let y = 1; y <= Gameboard.#SIZE; y++) {
      for (let x = 1; x <= Gameboard.#SIZE; x++) {
        grid.set(`${x},${y}`, {
          ship: null,
          visited: false,
          mark: ' ',
        });
      }
    }
    return grid;
  }

  #markSunkShipSurroundings(ship) {
    const shipCoordinates = [];
    for (let [coord, cell] of this.gameboard.entries()) {
      if (cell.ship === ship) {
        const [x, y] = coord.split(',').map(Number);
        shipCoordinates.push([x, y]);
      }
    }

    const offsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    shipCoordinates.forEach(([x, y]) => {
      offsets.forEach(([dx, dy]) => {
        const newX = x + dx;
        const newY = y + dy;

        if (this.#isValidCoordinate(newX, newY)) {
          const surroundingPos = this.gameboard.get(`${newX},${newY}`);

          if (!surroundingPos.visited && !surroundingPos.ship) {
            surroundingPos.visited = true;
            surroundingPos.mark = 'O';

            const gameboardElement = document.querySelector(
              `.gameboard[data-player="${this.player.name}"]`
            );
            const cellIndex = (newY - 1) * 10 + (newX - 1);
            const cell = gameboardElement.querySelector(
              `.cell[data-index="${cellIndex + 1}"]`
            );

            if (cell) {
              const span =
                cell.querySelector('span') ?? document.createElement('span');
              span.innerText = 'O';
              cell.appendChild(span);
              cell.classList.add('missed-surrounding');
            }
          }
        }
      });
    });
  }

  #isValidCoordinate(x, y) {
    return x >= 1 && x <= Gameboard.#SIZE && y >= 1 && y <= Gameboard.#SIZE;
  }

  #canPlaceShip(shipLength, x, y, direction) {
    for (let i = 1; i <= shipLength; i++) {
      const newX = direction === 'horizontal' ? x + i : x;
      const newY = direction === 'vertical' ? y + i : y;

      if (!this.#isValidCoordinate(newX, newY)) {
        return false;
      }

      const cell = this.gameboard.get(`${newX},${newY}`);
      if (cell.ship !== null) {
        return false;
      }

      const checkOffsets = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];

      for (const [dx, dy] of checkOffsets) {
        const checkX = newX + dx;
        const checkY = newY + dy;

        if (this.#isValidCoordinate(checkX, checkY)) {
          const surroundingCell = this.gameboard.get(`${checkX},${checkY}`);
          if (surroundingCell.ship !== null) {
            return false;
          }
        }
      }
    }
    return true;
  }

  placeShip(ship, [x, y], direction = 'horizontal') {
    if (!this.#canPlaceShip(ship.length, x, y, direction)) {
      throw new Error('Cannot place ship at this location');
    }

    if (this.ships.includes(ship)) {
      throw new Error(`${ship.name} is already placed!`);
    }

    for (let i = 0; i < ship.length; i++) {
      const newX = direction === 'horizontal' ? x + i : x;
      const newY = direction === 'vertical' ? y + i : y;

      this.gameboard.set(`${newX},${newY}`, {
        ship,
        visited: false,
        mark: ' ',
      });
    }

    this.ships.push(ship);
  }

  placeShips() {
    const shipTypes = [
      'carrier',
      'battleship',
      'cruiser',
      'submarine',
      'destroyer',
    ];

    this.gameboard = this.#createGameboard();
    this.ships = [];

    for (const type of shipTypes) {
      let placed = false;
      const ship = new Ship(type);

      while (!placed) {
        const x = Math.ceil(Math.random() * Gameboard.#SIZE);
        const y = Math.ceil(Math.random() * Gameboard.#SIZE);
        const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';

        try {
          this.placeShip(ship, [x, y], direction);
          placed = true;
        } catch (er) {
          console.warn(`Error: ${er.message}`);
        }
      }
    }
  }

  receiveAttack([x, y]) {
    if (!this.#isValidCoordinate(x, y)) {
      throw new Error('Invalid coordinates (must be between 1-10)!');
    }

    if (this.isEmpty()) return null;

    const position = this.gameboard.get(`${x},${y}`);

    if (position.visited) {
      return position.mark;
    }

    position.visited = true;

    if (position.ship) {
      position.ship.hit();
      position.mark = 'X';

      if (position.ship.isSunk()) {
        for (let i = 0; i < this.ships.length; i++) {
          if (position.ship.name === this.ships[i].name) {
            this.ships.splice(i, 1);
            break;
          }
        }
        this.#markSunkShipSurroundings(position.ship);
      }
      return 'X';
    } else {
      position.mark = '#';
      return '#';
    }
  }

  isEmpty() {
    return !this.ships.length;
  }

  displayBoard() {
    const result = [];

    console.clear();
    for (let y = 1; y <= Gameboard.#SIZE; y++) {
      let row = '';
      for (let x = 1; x <= Gameboard.#SIZE; x++) {
        const cell = this.gameboard.get(`${x},${y}`);
        row += `[${cell.ship ? cell.ship.name[0].toUpperCase() : cell.mark}] `;
      }
      result.push(row.trim());
    }
    console.log(result.join('\n'));
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard(this);
  }
}

const player1 = new Player('player1');
player1.gameboard.placeShips();

const player2 = new Player('player2');
player2.gameboard.placeShips();

// for (let i = 0; i < 10; i++) {
//   if (i % 2 === 0)
//     player1.gameboard.receiveAttack([
//       Math.ceil(Math.random() * 10),
//       Math.ceil(Math.random() * 10),
//     ]);
//   else
//     player2.gameboard.receiveAttack([
//       Math.ceil(Math.random() * 10),
//       Math.ceil(Math.random() * 10),
//     ]);
// }

export { Gameboard };
