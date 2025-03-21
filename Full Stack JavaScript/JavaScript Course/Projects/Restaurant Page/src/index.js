import './style.css';

const html = (function () {
  const content = document.getElementById('content');
  content.innerHTML = `
          <nav id="header-nav" role="navigation" aria-label="Main navigation">
            <button data-section-class="home" class="active">Home</button>
            <button data-section-class="menu">Menu</button>
            <button data-section-class="about">About</button>
            <button data-section-class="contact">Contact</button>
          </nav>
          <h1>My Restaurant</h1>
          <p>Your favorite spot for delicious meals across North America!</p>
  `;

  const nav = document.getElementById('header-nav');
  const buttons = nav.querySelectorAll('button');

  const main = document.querySelector('main');
  main.innerHTML = `
        <section class="home-section">
          <h2>Welcome to My Restaurant</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            quibusdam ipsam saepe, perferendis iusto rerum ex corporis repudiandae
            assumenda tempora autem quia ipsa consectetur recusandae accusamus
            quidem possimus, esse sint!
          </p>
          <img
            src="https://via.placeholder.com/600x300"
            alt="A delicious meal served at our restaurant"
            style="max-width: 100%; height: auto; margin: 1rem 0"
          />
        </section>
  
        <section class="menu-section">
          <h2>Our Special Menu</h2>
          <p>Explore some of our signature dishes:</p>
        </section>
  
        <section class="about-section">
          <h2>About Us</h2>
          <p>
            At My Restaurant, we are passionate about delivering exceptional
            dining experiences. From the spicy flavors of Mexico to the hearty
            meals of the USA and the fresh tastes of Canada, we celebrate North
            America's diverse culinary culture.
          </p>
        </section>
  
        <section class="contact-section"> </section>
  `;

  return {
    main,
    buttons,
    nav,
  };
})();

let datasect =
  html.nav.querySelector('button[data-section-class="home"]').dataset
    .sectionClass + '-section';

html.buttons.forEach((btn) => {
  if (!(btn instanceof HTMLElement)) return;

  btn.addEventListener('click', () => {
    html.buttons.forEach((itm) => itm.classList.remove('active'));
    btn.classList.add('active');

    datasect = btn.dataset.sectionClass + '-section';
    html.main.querySelectorAll('section').forEach((sect) => {
      if (!sect.classList.contains(datasect)) {
        sect.style.display = 'none';
      } else {
        sect.style.display = 'block';
      }
    });
  });
  datasect = btn.dataset.sectionClass + '-section';
  html.main.querySelectorAll('section').forEach((sect) => {
    if (!sect.classList.contains(datasect)) {
      sect.style.display = 'none';
    } else {
      sect.style.display = 'block';
    }
  });
});

import './scripts/menu.js';
