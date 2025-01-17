const menuSection = document.querySelector('.menu-section');

const main = (function () {
  const newMenu = document.createElement('table');
  for (let i = 0; i < 10; i++) {
    const newRow = document.createElement('tr');
    const newElement = document.createElement('td');
    newElement.innerHTML = `Item ${i} Price: $99.98`;
    newRow.appendChild(newElement);
    newMenu.appendChild(newRow);
  }

  return {
    newMenu,
  };
})();

menuSection.appendChild(main.newMenu);
