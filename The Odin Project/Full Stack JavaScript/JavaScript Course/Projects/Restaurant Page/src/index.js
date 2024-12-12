import './style.css';
import { toggleSect } from './assets/modules/toggleSect.js';

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
toggleSect(buttons);

const main = document.querySelector('main');
