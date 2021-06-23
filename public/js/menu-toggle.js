'use strict';

const menu = document.querySelector('.js-main-nav-list');

const toggleMenu = (event) => {
    const toggle = event.currentTarget;

    menu.classList.toggle('active');

    if (toggle.classList.contains('bi-list')) {
        toggle.classList.remove('bi-list');
        toggle.classList.add('bi-x-lg');
    } else {
        toggle.classList.remove('bi-x-lg');
        toggle.classList.add('bi-list');
    }
};

document.querySelector('.js-main-nav-toggle').addEventListener('click', toggleMenu);
