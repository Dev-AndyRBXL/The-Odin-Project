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

bars.addEventListener('click', () => {
  if (aside.style.width === '0px') {
    bars.style.left = '305px';
    aside.style.width = '300px';
    aside.querySelectorAll('*').forEach((el) => {
      if (el !== div && el !== bars) el.style.display = '';
      el.removeAttribute('aria-hidden');
    });
  } else {
    bars.style.left = '5px';
    aside.style.width = '0px';
    aside.querySelectorAll('*').forEach((el) => {
      if (el !== div && el !== bars) {
        el.style.display = 'none';
        el.setAttribute('aria-hidden', 'true');
      }
    });
  }
});
