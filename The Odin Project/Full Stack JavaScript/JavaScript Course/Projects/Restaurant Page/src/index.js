import './style.css';

const content = document.getElementById('content');
content.innerHTML = `
        <nav id="header-nav" role="navigation" aria-label="Main navigation">
          <button>Home</button>
          <button>Menu</button>
          <button>About</button>
          <button>Contact</button>
        </nav>
        <h1>My Restaurant</h1>
        <p>Your favorite spot for delicious meals across North America!</p>
`;

const nav = document.getElementById('header-nav');
const buttons = nav.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', (ev) => {
    button.className = button.className === 'active' ? '' : 'active';
  });
});
