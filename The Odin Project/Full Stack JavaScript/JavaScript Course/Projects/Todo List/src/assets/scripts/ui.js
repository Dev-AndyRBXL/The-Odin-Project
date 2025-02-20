const main = (function () {
  const container = document
    .getElementById('main')
    .querySelector('.main-container');
  const carets = container.querySelectorAll('.fa');

  carets.forEach((caret) => {
    const parent = caret.parentElement.parentElement.querySelector('div');
    parent.style.display = 'none';
    caret.addEventListener('click', () => {
      const isHidden = caret.getAttribute('aria-hidden') === 'true';

      if (isHidden) {
        caret.setAttribute('aria-hidden', 'false');
        caret.classList.replace('fa-caret-right', 'fa-caret-down');
        parent.style.display = 'block';
      } else {
        caret.setAttribute('aria-hidden', 'true');
        caret.classList.replace('fa-caret-down', 'fa-caret-right');
        parent.style.display = 'none';
      }
    });
  });

  const aside = document.querySelector('aside');
  const bars = document.querySelector('.fa-bars');

  function updateBarsPosition() {
    bars.style.left = `${aside.offsetWidth + 5}px`;
  }

  function toggleAside() {
    const isOpen = aside.classList.toggle('open');

    aside.style.width = isOpen ? 'auto' : '32px';
    aside.style.display = isOpen ? 'block' : 'none';

    updateBarsPosition();
  }

  bars.addEventListener('click', toggleAside);
  window.addEventListener('resize', updateBarsPosition);

  document.addEventListener('DOMContentLoaded', updateBarsPosition);
})();

(function () {
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
})();

(function () {
  const form = document.getElementById('projectForm');
  form.style.display = 'none';
  const inp = form.querySelector('input');

  const createProjectBtn = document
    .getElementById('createProject')
    .querySelector('button');

  createProjectBtn.addEventListener('click', () => {
    form.style.display = 'block';
    inp.focus();
    inp.addEventListener('blur', () => {
      form.style.display = 'none';
    });
  });

  form.addEventListener('submit', () => {
    form.style.display = 'none';
  });
})();
