const container = document.querySelector(".container");

function getRandomColor() {
  // Generate a random color in hexadecimal format
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let isMouseDown = false;

function createGrid(amountOfDivs, del) {
  if (del) {
    document.querySelectorAll(".square").forEach((itm) => {
      itm.parentNode.removeChild(itm);
    });
  }

  const gridSize = Math.ceil(Math.sqrt(amountOfDivs));

  container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  for (let i = 0; i < amountOfDivs; i++) {
    const div = document.createElement("div");
    div.classList.add("square");

    div.addEventListener("mousedown", () => {
      isMouseDown = true;
      const color = getRandomColor();
      div.style.backgroundColor = color;
    });

    div.addEventListener("mouseenter", () => {
      if (isMouseDown) {
        const color = getRandomColor();
        div.style.backgroundColor = color;
      } else if (!isMouseDown) {
        div.style.cssText = "background-color: rgba(255, 255, 255, 0.05)";
      }
      div.style.cursor = "pointer";
    });

    div.addEventListener("mouseleave", () => {
      if (div.style.backgroundColor === "rgba(255, 255, 255, 0.05)") {
        div.style.backgroundColor = "";
      }
    });

    div.addEventListener("mouseup", () => {
      isMouseDown = false;
    });

    div.addEventListener("contextmenu", (e) => e.preventDefault());

    container.appendChild(div);
  }

  return document.querySelectorAll(".square");
}

container.addEventListener("mousedown", () => {
  isMouseDown = true;
});

container.addEventListener("mouseup", () => {
  isMouseDown = false;
});

container.addEventListener("mouseleave", () => {
  isMouseDown = false;
});

let defaultSize = 16;
let divs = createGrid(defaultSize, false);

const createGridBtn = document.querySelector("#createGridBtn");
createGridBtn.addEventListener("click", () => {
  const amountOfDivs = Number(prompt("Amount of divs: (max 100)", defaultSize));
  if (amountOfDivs <= 100) {
    divs = createGrid(amountOfDivs, true);
  } else {
    alert("You have to enter a number less than or equal to 100");
  }
});

const resetGridBtn = document.querySelector("#resetGridBtn");
resetGridBtn.addEventListener("click", () => {
  divs = createGrid(defaultSize, true);
});
