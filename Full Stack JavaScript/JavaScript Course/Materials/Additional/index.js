/* Dropdown */
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach((dropdown) => {
  const select = dropdown.querySelector('.select');
  const caret = dropdown.querySelector('.caret');
  const menu = dropdown.querySelector('.menu');
  const options = dropdown.querySelectorAll('.menu li');
  const selected = dropdown.querySelector('.selected');

  select.addEventListener('click', (ev) => {
    ev.stopPropagation();
    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');
    menu.classList.toggle('menu-open');
  });

  options.forEach((option) => {
    option.addEventListener('click', (ev) => {
      ev.stopPropagation();
      selected.innerText = option.innerText;
      select.classList.remove('select-clicked');
      caret.classList.remove('caret-rotate');
      menu.classList.remove('menu-open');

      options.forEach((option) => option.classList.remove('active'));
      option.classList.add('active');
    });
  });

  document.addEventListener('click', () => {
    select.classList.remove('select-clicked');
    caret.classList.remove('caret-rotate');
    menu.classList.remove('menu-open');
  });
});

/* Carousel */
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const sliderImages = document.querySelectorAll('.slider img');
    const sliderNavAnchors = document.querySelectorAll('.slider-nav a');
    let currentIndex = 0;
    let slideInterval;
    const slideDuration = 7500;
  
    if (!slider || !sliderImages.length || !sliderNavAnchors.length) return;
  
    function updateActiveNav(index) {
      sliderNavAnchors.forEach((link) => link.classList.remove('active'));
      sliderNavAnchors[index].classList.add('active');
    }
  
    function startAutoSlide() {
      clearInterval(slideInterval);
      slideInterval = setInterval(autoSlide, slideDuration);
    }
  
    function autoSlide() {
      currentIndex = (currentIndex + 1) % sliderImages.length;
      slider.scrollTo({
        left: slider.clientWidth * currentIndex,
        behavior: 'smooth',
      });
      updateActiveNav(currentIndex);
    }
  
    sliderNavAnchors.forEach((link, index) => {
      link.addEventListener('click', (ev) => {
        ev.preventDefault();
        currentIndex = index;
        updateActiveNav(index);
        slider.scrollTo({
          left: slider.clientWidth * index,
          behavior: 'smooth',
        });
        startAutoSlide();
      });
    });
    
    // in case an scroll is implemented uwu
    slider.addEventListener('scroll', () => {
      let index = Math.round(slider.scrollLeft / slider.clientWidth);
      if (index !== currentIndex) {
        currentIndex = index;
        updateActiveNav(index);
        startAutoSlide();
      }
    });
  
    startAutoSlide();
  });
  