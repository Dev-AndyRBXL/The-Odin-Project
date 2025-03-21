let currentInput = "";
let firstOperand = null;
let operator = null;
const MAX_DIGITS = 12;

const display = document.querySelector(".display");
const operators = document.querySelectorAll("#btnOperator");
const numbers = document.querySelectorAll("#btnNumber");

function updateDisplay(value) {
  if (value.length > MAX_DIGITS) {
    value = value.slice(0, MAX_DIGITS);
  }
  display.textContent = value;
}

function clear() {
  currentInput = "";
  firstOperand = null;
  operator = null;
  updateDisplay("0");
}

numbers.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (display.textContent === "0" || currentInput === "") {
      currentInput = btn.textContent;
    } else {
      currentInput += btn.textContent;
    }
    updateDisplay(currentInput);
  });
});

operators.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.textContent === "C") {
      clear();
    } else if (btn.textContent === "=") {
      if (firstOperand !== null && operator !== null && currentInput !== "") {
        const result = operate(firstOperand, Number(currentInput), operator);
        updateDisplay(result.toString()); // Ensure the result is displayed as a string
        currentInput = result.toString();
        firstOperand = null;
        operator = null;
      }
    } else {
      if (firstOperand === null) {
        firstOperand = Number(currentInput);
        operator = btn.textContent;
        currentInput = "";
      } else {
        firstOperand = operate(firstOperand, Number(currentInput), operator);
        operator = btn.textContent;
        currentInput = "";
        updateDisplay(firstOperand.toString()); // Ensure the result is displayed as a string
      }
    }
  });
});

function operate(x, y, op) {
  switch (op) {
    case "+":
      return x + y;
    case "-":
      return x - y;
    case "*":
      return x * y;
    case "/":
      return x / y;
    default:
      return "Error";
  }
}