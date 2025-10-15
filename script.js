window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetID = link.getAttribute('href');
        gsap.to(window, { duration: 1, scrollTo: targetID, ease: "power2.inOut" });
    });
});


// =======================
// 2️⃣ Smooth Scrolling & Active Nav Link
// =======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        // Scroll smoothly
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });

        // Update active link
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});

// =======================
// 3️⃣ Update Active Nav Link on Scroll
// =======================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
    });
});
// =======================
// 5️⃣ Animate On hero section
// =======================
/* Initialize particles.js */
particlesJS("particles", {
  "particles": {
    "number": { 
      "value": 80,            // Total number of particles
      "density": { "enable": true, "value_area": 800 } // Density of particles in area
    },
    "color": { "value": "#ffffff" }, // Particle color
    "shape": { "type": "triangle" },   // Particle shape
    "opacity": { "value": 0.5, "random": true }, // Particle opacity
    "size": { "value": 3, "random": true },      // Particle size
    "line_linked": { 
      "enable": true,         // Connect particles with lines
      "distance": 150,        // Maximum distance to link
      "color": "#ffffff",     // Line color
      "opacity": 0.7,         // Line opacity (increased for thicker look)
      "width": 1.5              // Line thickness (you asked to increase)
    },
    "move": { 
      "enable": true,         // Enable particle movement
      "speed": 5,             // Speed of movement
      "direction": "none",    // Move in random direction
      "random": true,
      "straight": false,
      "out_mode": "out",      // Particles disappear out of the canvas
      "bounce": false
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": false, "mode": "grab" }, // Hover effect: lines follow cursor
      "onclick": { "enable": true, "mode": "push" }  // Click effect: add more particles
    },
    "modes": {
      "grab": { "distance": 200, "line_linked": { "opacity": 0.6 } },
      "push": { "particles_nb": 4 }
    }
  },
  "retina_detect": true
});
// =======================
// 5️⃣ Animate On Scroll
// =======================
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) element.classList.add('animated');
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// =======================
// 6️⃣ Animated Counter
// =======================
function animateCounter() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);
        if (count < target) {
            counter.innerText = Math.min(count + increment, target);
            setTimeout(animateCounter, 10);
        }
    });
}

window.addEventListener('load', () => {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                observer.unobserve(statsSection);
            }
        });
    });
    observer.observe(statsSection);
});

// =======================
// 7️⃣ Tech Stack Animation
// =======================
function animateTechStack() {
    const lines = document.querySelectorAll('.tech-line');
    lines.forEach((line, index) => {
        setTimeout(() => line.classList.add('animate'), index * 500);
    });
}

function resetTechStackAnimation() {
    document.querySelectorAll('.tech-line').forEach(line => line.classList.remove('animate'));
}

// Auto animate on load
window.addEventListener('load', () => setTimeout(animateTechStack, 1000));

// Animate on button click
document.getElementById('animateBtn')?.addEventListener('click', () => {
    resetTechStackAnimation();
    setTimeout(animateTechStack, 100);
});

// =======================
// 8️⃣ Hover Effects
// =======================

// About image hover
const aboutImage = document.querySelector('.about img');
if (aboutImage) {
    aboutImage.addEventListener('mouseenter', () => {
        aboutImage.style.transform = 'scale(1.03)';
        aboutImage.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
    });
    aboutImage.addEventListener('mouseleave', () => {
        aboutImage.style.transform = 'scale(1)';
        aboutImage.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
    });
}

// Service cards hover
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-10px)');
    card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
});

// Tech badges staggered delay
document.querySelectorAll('.tech-badge').forEach((badge, i) => badge.style.transitionDelay = `${i * 0.02}s`);

// =======================
// 9️⃣ Loader
// =======================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (!loader) return;

    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.1s';
        setTimeout(() => {
            loader.style.display = 'none';
            document.querySelectorAll('body > *:not(#loader)').forEach(el => {
                el.style.display = '';
                el.classList.add('show-content');
            });
        }, 500);
    }, 1000);
});

// =======================
// 🔟 Contact Form Animation
// =======================
document.getElementById('contact-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
        submitBtn.classList.remove('btn-primary');
        submitBtn.classList.add('btn-success');

        setTimeout(() => {
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-success');
            submitBtn.classList.add('btn-primary');
        }, 2000);
    }, 1500);
});

// =======================
// 1️⃣1️⃣ Chatbot Toggle
// =======================
const chatbotBtn = document.getElementById("chatbot-btn");
const chatbotBox = document.getElementById("chatbot-box");

chatbotBtn?.addEventListener("click", () => {
    chatbotBox.style.display = chatbotBox.style.display === "flex" ? "none" : "flex";
});