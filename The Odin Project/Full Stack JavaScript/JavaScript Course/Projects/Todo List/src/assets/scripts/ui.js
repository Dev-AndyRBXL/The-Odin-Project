const main = (function () {
  const container = document.getElementById('main').querySelector('.container');
  const carets = container.querySelectorAll('.fa');

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
})();

const popupForm = function () {
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('popupOverlay');

  popup.addEventListener('click', (ev) => {
    ev.stopPropagation();
  });

  document
    .getElementById('createTask')
    .querySelector('button')
    .addEventListener('click', () => {
      overlay.style.display = 'flex';
    });

  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  popup.addEventListener('click', (ev) => {
    ev.stopPropagation();
  });

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    overlay.style.display = 'none';
  });
};
