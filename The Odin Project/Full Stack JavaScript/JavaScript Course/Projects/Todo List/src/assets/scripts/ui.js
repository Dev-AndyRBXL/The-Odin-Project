const today = document.getElementById('today');
const carets = today.querySelectorAll('.fa');

carets.forEach((caret) => {
  caret.addEventListener('click', () => {
    const isHidden = caret.getAttribute('aria-hidden') === 'true';

    if (isHidden) {
      caret.setAttribute('aria-hidden', 'false');
      caret.classList.replace('fa-caret-right', 'fa-caret-down');
    } else {
      caret.setAttribute('aria-hidden', 'true');
      caret.classList.replace('fa-caret-down', 'fa-caret-right');
    }
  });
});

const aside = document.querySelector('aside');
const div = aside.querySelector('div');
const bars = div.querySelector('.fa-bars');

function updateBarsPosition() {
  bars.style.left = aside.getBoundingClientRect().width + 5 + 'px';
}

updateBarsPosition();

bars.addEventListener('click', () => {
  if (aside.style.width === '0px' || !aside.style.width) {
    aside.style.display = 'block'; 
    aside.style.width = '20vw';
    aside.style.maxWidth = '325px';
    aside.style.minWidth = '200px';
    aside.style.height = '100vh';
    aside.style.visibility = 'visible';

    aside.querySelectorAll('*').forEach((el) => {
      if (el !== div && el !== bars) {
        el.style.display = ''; 
        el.removeAttribute('aria-hidden');
      }
    });

    setTimeout(updateBarsPosition, 150);
  } else {
    bars.style.left = '5px';

    aside.style.width = '0';
    aside.style.minWidth = '0';

    aside.querySelectorAll('*').forEach((el) => {
      if (el !== div && el !== bars) {
        el.style.display = 'none';
        el.setAttribute('aria-hidden', 'true');
      }
    });

    setTimeout(updateBarsPosition, 150);
  }
});

window.addEventListener('resize', () => {
  setTimeout(updateBarsPosition, 125);
});
