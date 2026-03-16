// Initialize Icons
lucide.createIcons();

// Carousel Logic
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const dotsContainer = document.getElementById('carousel-dots');

slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Ir al slide ${index + 1}`);
    dot.addEventListener('click', () => showSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.carousel-dot');

function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Auto-rotation every 5 seconds
setInterval(nextSlide, 5000);

// Page Navigation
function showPage(pageId) {
    const home = document.getElementById('home-page');
    const subsidios = document.getElementById('subsidios-page');

    if (pageId === 'home') {
        home.classList.remove('hidden');
        subsidios.classList.add('hidden');
        window.scrollTo(0, 0);
    } else if (pageId === 'subsidios') {
        home.classList.add('hidden');
        subsidios.classList.remove('hidden');
        window.scrollTo(0, 0);
    }

    // Close mobile menu if open
    document.getElementById('mobile-menu').classList.add('hidden');
}

// Mobile Menu Toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    status.classList.remove('hidden');
    this.reset();
    setTimeout(() => {
        status.classList.add('hidden');
    }, 5000);
});

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        'section > div, .section-card, #subsidios-page .grid > div, #subsidios-page h2'
    );

    animatedElements.forEach((element, index) => {
        element.classList.add('scroll-reveal');
        element.style.transitionDelay = `${Math.min(index * 40, 240)}ms`;
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach((element) => revealObserver.observe(element));
}

initScrollAnimations();
