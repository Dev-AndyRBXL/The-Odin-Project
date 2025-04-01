import { Gameboard } from '../index.js';

function createGameboard(playerName) {
  const container = document.querySelector('.container');

  const gameboardElement = document.createElement('div');
  gameboardElement.classList.add('gameboard');
  gameboardElement.dataset.player = playerName;

  const cellsHTML = Array.from({ length: 100 }, (_, index) => {
    const x = (index % 10) + 1;
    const y = Math.ceil((index + 1) / 10);
    return `<button class="cell" data-index="${
      index + 1
    }" data-x="${x}" data-y="${y}"></button>`;
  }).join('');

  gameboardElement.innerHTML = cellsHTML;
  container.appendChild(gameboardElement);

  return gameboardElement;
}

function setupGameboardListeners(gameboardElement) {
  const cells = gameboardElement.querySelectorAll('.cell');
  const playerName = gameboardElement.dataset.player;
  
  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      const player = Gameboard.players.get(playerName);

      if (player) {
        console.log(`${player.name}'s turn`);

        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);

        const result = player.gameboard.receiveAttack([x, y]);
        if (!result) return;

        const span =
          cell.querySelector('span') ?? document.createElement('span');
        span.innerText = result;
        cell.appendChild(span);

        switch (result) {
          case 'X':
            cell.classList.add('hit');
            break;
          case '#':
            cell.classList.add('miss');
            break;
        }
      }
    });
  });
}

function initializeGameboards(playerNames) {
  const gameboards = playerNames.map(createGameboard);
  gameboards.forEach(setupGameboardListeners);

  return gameboards;
}

const gameboards = initializeGameboards(['player1', 'player2']);
