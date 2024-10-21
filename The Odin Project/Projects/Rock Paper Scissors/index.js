const container = document.querySelector(".container");

const inputArea = document.querySelector("#inputArea");
const resultDisplay = document.querySelector(".result");
const playRoundBtn = document.querySelector("#playRound");
const resetGameBtn = document.querySelector("#resetGame");

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

function getHumanChoice() {
  return inputArea.value.trim().toLowerCase();
}

const maxScore = 5;

let computerScore = 0;
let humanScore = 0;

function resetGame() {
  computerScore = 0;
  humanScore = 0;
  resultDisplay.textContent = "";
  inputArea.value = "";
}

function checkGameOver() {
  if (computerScore === maxScore) {
    alert(`Game over! CPU won with ${computerScore} out of ${maxScore}`);
    resetGame();
    return true;
  } else if (humanScore === maxScore) {
    alert(`Game over! You won with ${humanScore} out of ${maxScore}`);
    resetGame();
    return true;
  }
  return false;
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    resultDisplay.textContent = "DRAW";
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    resultDisplay.textContent = "PLAYER WINS!";
    humanScore += 1;
  } else {
    resultDisplay.textContent = "CPU WINS!";
    computerScore += 1;
  }
}

playRoundBtn.addEventListener("click", () => {
  const humanChoice = getHumanChoice();
  const computerChoice = getComputerChoice();

  if (!humanChoice || !["rock", "paper", "scissors"].includes(humanChoice)) {
    alert("Please enter a valid choice: rock, paper, or scissors.");
    return;
  }

  if (checkGameOver()) return;

  alert(`Computer chose: ${computerChoice}`);
  playRound(humanChoice, computerChoice);

  checkGameOver();
});

resetGameBtn.addEventListener("click", resetGame);