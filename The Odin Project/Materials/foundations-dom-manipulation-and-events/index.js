const container = document.querySelector("#container");

const paragraph = document.createElement("p");
paragraph.classList.add("description");
paragraph.style.backgroundColor = "red";
paragraph.textContent = "Hey I'm red!";

const header3 = document.createElement("h3");
header3.classList.add("header");
header3.style["background-color"] = "blue";
header3.textContent = "I'm a blue h3";

container.appendChild(paragraph);
container.appendChild(header3);

const div = document.createElement("div");
div.classList.add("content");
div.style.cssText = "border: black; background-color: pink;";

const header1 = document.createElement("h1");
header1.textContent = "I'm in a div!";

const paragraph2 = document.createElement("p");
paragraph2.textContent = "ME TOO";

div.appendChild(header1);
div.appendChild(paragraph2);

container.appendChild(div);

// Events
 // Method 2
const btn = document.getElementById("btn");
btn.onclick = () => alert("Hello, world!");
 // Method 3
const btn2 = document.querySelector("#btn2");
btn2.addEventListener("click", (e) => {
    alert("Hello, world!");
});