const imageSources = [
            './img/ad1.png',
            './img/ad2.png',
            './img/ad3.png',
            // Add more image sources as needed
        ];

const carouselSlide = document.getElementById('carousel-slide');

// Render images dynamically
imageSources.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Image ${index + 1}`;
    carouselSlide.appendChild(img);
});

const carouselContainer = document.querySelector('.carousel-container');
const images = document.querySelectorAll('.carousel-slide img');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let counter = 0;
let intervalId;

const startCarousel = () => {
    intervalId = setInterval(() => {
        nextSlide();
    }, 5000); // Change slide every 3 seconds
};

const resetCarouselInterval = () => {
    clearInterval(intervalId);
    startCarousel();
};

const nextSlide = () => {
    const size = images[0].clientWidth;
    carouselContainer.style.transition = "transform 0.5s ease-in-out";
    counter++;
    if (counter >= images.length) {
        counter = 0;
        carouselContainer.style.transition = "none"; // Disable transition when cycling back to start
        carouselContainer.style.transform = `translateX(0px)`;
        setTimeout(() => {
            carouselContainer.style.transition = "transform 0.5s ease-in-out"; // Re-enable transition
            carouselContainer.style.transform = `translateX(${-size * counter}px)`;
        }, 0); // Move back to the start without transition
    } else {
        carouselContainer.style.transform = `translateX(${-size * counter}px)`;
    }
};

const prevSlide = () => {
    const size = images[0].clientWidth;
    carouselContainer.style.transition = "transform 0.5s ease-in-out";
    counter--;
    if (counter < 0) {
        counter = images.length - 1;
        carouselContainer.style.transition = "none"; // Disable transition when cycling to end
        carouselContainer.style.transform = `translateX(${-size * counter}px)`;
        setTimeout(() => {
            carouselContainer.style.transition = "transform 0.5s ease-in-out"; // Re-enable transition
        }, 0); // Move to the end without transition
    } else {
        carouselContainer.style.transform = `translateX(${-size * counter}px)`;
    }
};

nextButton.addEventListener('click', () => {
    nextSlide();
    resetCarouselInterval();
});

prevButton.addEventListener('click', () => {
    prevSlide();
    resetCarouselInterval();
});

startCarousel();