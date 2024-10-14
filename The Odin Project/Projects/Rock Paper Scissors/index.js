function getComputerChoice() {
  const n = Math.floor(Math.random() * 3); // 0 - 2
  let choice;

  switch (n) {
    case 0:
      choice = "rock";
      break;
    case 1:
      choice = "paper";
      break;
    case 2:
      choice = "scissors";
  }

  console.log(`CPU chose: ${choice}`);
  return choice;
}

function getHumanChoice() {
  let choice = prompt("Choose between Rock, Paper or Scissors: ", "Rock");

  console.log(`Player chose: ${choice.toLowerCase()}`);
  return choice.toLowerCase();
}

function playGame() {
  let computerScore = 0;
  let humanScore = 0;

  function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
      console.log("DRAW!");
    } else if (
      (humanChoice === "rock" && computerChoice === "scissors") ||
      (humanChoice === "paper" && computerChoice === "rock") ||
      (humanChoice === "scissors" && computerChoice === "paper")
    ) {
      console.log("PLAYER WINS");
      humanScore += 1;
    } else {
      console.log("CPU WINS");
      computerScore += 1;
    }
  }

  for (let i = 0; i < 5; i++) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
  }
  console.warn(`Computer: ${computerScore}`, `Player: ${humanScore}`);
}

playGame();
