const icons = document.querySelectorAll("svg");

icons.forEach((svg) => {
  svg.addEventListener("click", () => {
    svg.classList.toggle("active");
  });

  if (svg.parentElement.tagName.toLowerCase() === "button") {
    const { width, height } = svg.getBoundingClientRect();
    svg.parentElement.style.width = `${width}px`;
    svg.parentElement.style.height = `${height}px`;
    console.log("Check #1");
  }
});