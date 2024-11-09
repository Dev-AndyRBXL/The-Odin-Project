const icons = document.querySelectorAll('svg');

icons.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.toggle('active');
    });
});