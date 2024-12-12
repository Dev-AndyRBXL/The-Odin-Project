export function toggleSect(...elements) {
  const removedSections = [];

  elements.forEach((item) => {
    if (!(item instanceof HTMLElement)) return;
    item.addEventListener('click', (ev) => {
      elements.forEach((itm) => itm.classList.remove('active'));
      ev.target.classList.add('active');

      const sectionClass =
        ev.target.dataset.sectionClass.toLowerCase() + '-section';

      document.querySelectorAll('.section').forEach((sect) => {
        if (!sect.classList.contains(sectionClass)) {
          if (!removedSections.includes(sect)) {
            removedSections.push(sect);
            sect.remove();
          }
        } else {
          if (removedSections.includes(sect)) {
            document.body.appendChild(sect);
            removedSections.splice(removedSections.indexOf(sect), 1);
          }
        }
      });
    });
  });
}
