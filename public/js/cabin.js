'use strict';

const slides = Array.from(document.querySelectorAll('.js-cabin-gallery .cabin-image'));
let currentSlide = 1;

const showSlide = (index) => {
    if (slides.length) {
        if (index < 1) {
            index = slides.length;
        }

        if (index > slides.length) {
            index = 1;
        }

        const activeSlides = slides.find(slide => slide.classList.contains('active'));

        if (activeSlides) {
            activeSlides.classList.remove('active');
        }

        slides[index - 1].classList.add('active');

        currentSlide = index;
    }
};

const prevSlide = () => {
    showSlide(--currentSlide);
};

const nextSlide = () => {
    showSlide(++currentSlide);
};

const initCabin = () => {
    showSlide(currentSlide);
    document.querySelector('.js-prev-slide').addEventListener('click', prevSlide);
    document.querySelector('.js-next-slide').addEventListener('click', nextSlide);
};

initCabin();
