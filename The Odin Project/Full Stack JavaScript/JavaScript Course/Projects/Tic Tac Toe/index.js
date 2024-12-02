/*
// Utility function(s)
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Main Game Module
const TicTacToe = (function () {
  const gameBoard = {
    board: Array(9).fill(null),
  };

  const displayBoard = () => {
    const formattedBoard = gameBoard.board.map((cell) => (cell ? cell : " "));
    console.log(`\n
           ${formattedBoard[0]} | ${formattedBoard[1]} | ${formattedBoard[2]}
          ---|---|---
           ${formattedBoard[3]} | ${formattedBoard[4]} | ${formattedBoard[5]}
          ---|---|---
           ${formattedBoard[6]} | ${formattedBoard[7]} | ${formattedBoard[8]}
        `);
  };

  const makeMove = (marker, position) => {
    if (gameBoard.board[position] === null) {
      gameBoard.board[position] = marker;
      return true;
    }
    return false;
  };

  const checkWinner = (marker) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    return winningCombinations.some((combo) =>
      combo.every((index) => gameBoard.board[index] === marker)
    );
  };

  const isBoardFull = () => !gameBoard.board.includes(null);

  const resetBoard = () => {
    gameBoard.board.fill(null);
  };

  return {
    displayBoard,
    makeMove,
    checkWinner,
    isBoardFull,
    resetBoard,
  };
})();

console.log("Welcome to Tic-Tac-Toe!");
console.log("Type 'playGame()' to start.");

const createPlayer = (name, marker) => ({ name, marker });

const player1 = createPlayer("Player 1", "x");
const player2 = createPlayer("Player 2", "o");

// Main Game Loop
function playGame() {
  TicTacToe.resetBoard();
  let currentPlayer = player1;
  let gameActive = true;
  console.log(" type 'quit' to quit");

  while (gameActive) {
    TicTacToe.displayBoard();
    const input = window.prompt(
      `${currentPlayer.name} (${currentPlayer.marker}), choose a slot (1-9):`
    );

    if (input.match("quit")) break;

    const index = parseInt(input) - 1;

    if (isNaN(index) || index < 0 || index > 8) {
      console.log("Invalid input. Please choose a number between 1 and 9.");
      continue;
    }

    if (!TicTacToe.makeMove(currentPlayer.marker, index)) {
      console.log("Slot occupied! Try a different move.");
      continue;
    }

    if (TicTacToe.checkWinner(currentPlayer.marker)) {
      TicTacToe.displayBoard();
      console.log(`${currentPlayer.name} wins!`);
      gameActive = false;
      break;
    }

    if (TicTacToe.isBoardFull()) {
      TicTacToe.displayBoard();
      console.log("It's a draw! No empty spaces left.");
      gameActive = false;
      break;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  console.log("Game Over! Type 'playGame()' to play again.");
}
*/

const boardElement = document.getElementById("board");
const messageElement = document.getElementById("message");
const restartButton = document.getElementById("restart");

const game = (function () {
  let board = Array(9).fill(null);
  let currentPlayer = "X";
  let gameActive = true;

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  function createBoard() {
    boardElement.innerHTML = ""; // Clear previous board
    board.forEach((cell, index) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      if (cell) {
        cellElement.textContent = cell;
        cellElement.classList.add("taken");
      }
      cellElement.addEventListener("click", () => handleMove(index), {
        once: true,
      });
      boardElement.appendChild(cellElement);
    });
  }

  function handleMove(index) {
    if (!gameActive || board[index]) return;

    board[index] = currentPlayer;
    if (checkWinner(currentPlayer)) {
      messageElement.textContent = `${currentPlayer} wins! 🎉`;
      gameActive = false;
    } else if (board.every((cell) => cell)) {
      messageElement.textContent = `It's a draw! 🤝`;
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      messageElement.textContent = `It's ${currentPlayer}'s turn.`;
    }
    createBoard();
  }

  function checkWinner(player) {
    return winningCombinations.some((combination) =>
      combination.every((index) => board[index] === player)
    );
  }

  function restartGame() {
    board = Array(9).fill(null);
    currentPlayer = "X";
    gameActive = true;
    messageElement.textContent = `It's ${currentPlayer}'s turn.`;
    createBoard();
  }

  return {
    createBoard,
    restartGame,
  };
})();

restartButton.addEventListener("click", game.restartGame);

// Initial Setup
game.createBoard();
messageElement.textContent = `It's X's turn.`;
