// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});


// Create Particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random properties
        const size = Math.random() * 6 + 2;
        const posX = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);
    }
}

window.addEventListener('load', createParticles);

tsParticles.load("particles", {
    particles: {
        number: { value: 50 },
        color: { value: "#3a86ff" },
        shape: { type: "circle" },
        size: { value: 4 },
        move: {
            enable: true,
            direction: "bottom", // <-- Top to bottom
            speed: 2,
            straight: false
        }
    },
    interactivity: {
        events: { onhover: { enable: false }, onclick: { enable: false } }
    }
});

particlesJS("particles", {
    "particles": {
        "number": {
            "value": 50
        },
        "color": {
            "value": "#3a86ff"
        },
        "shape": {
            "type": "circle"
        },
        "opacity": {
            "value": 0.7
        },
        "size": {
            "value": 4
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "bottom", // <-- Move top to bottom
            "straight": false
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { "enable": false },
            "onclick": { "enable": false }
        }
    }
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
// Initial call to check elements in view on page load
window.addEventListener('load', animateOnScroll);

// Counter animation for stats
function animateCounter() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);

        if (count < target) {
            counter.innerText = Math.min(count + increment, target);
            setTimeout(() => animateCounter(), 1);
        }
    });
}

// Initialize counter when stats section is in view
const statsSection = document.querySelector('.stats');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(statsSection);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');

    // Loader show every time page reload
    setTimeout(() => {
        // Fade out loader
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.1s';

        setTimeout(() => {
            loader.style.display = 'none'; // Hide loader completely

            // Show main content with fade-in effect
            document.querySelectorAll('body > *:not(#loader)').forEach(el => {
                el.style.display = '';
                el.classList.add('show-content'); // fade-in class from CSS
            });

        }, 500); // fade duration

    }, 1000); // 3 seconds loader display
});


const chatbotBtn = document.getElementById("chatbot-btn");
const chatbotBox = document.getElementById("chatbot-box");
const chatbotBody = document.getElementById("chatbot-body");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotSend = document.getElementById("chatbot-send");

// Toggle chatbot open/close
chatbotBtn.addEventListener("click", () => {
    chatbotBox.style.display =
        chatbotBox.style.display === "flex" ? "none" : "flex";
});

document.addEventListener('DOMContentLoaded', function () {
    // Animation on scroll
    const animateElements = document.querySelectorAll('.animate');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
});
// Simple form submission animation
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Add loading animation
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
        submitBtn.classList.remove('btn-primary');
        submitBtn.classList.add('btn-success');

        // Reset form after 2 seconds
        setTimeout(() => {
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-success');
            submitBtn.classList.add('btn-primary');
        }, 2000);
    }, 1500);
});

// Add scroll animation for elements
document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.contact-form, .contact-info');
    animatedElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});