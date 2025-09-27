
// =======================
// 1️⃣ Navbar Scroll Effect
// =======================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// =======================
// 2️⃣ Smooth Scrolling & Active Nav Link
// =======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
// 4️⃣ Particles Animation
// =======================
// Pick one: Vanilla particles OR tsParticles / particlesJS
// Example with tsParticles
tsParticles.load("particles", {
    particles: {
        number: { value: 50 },
        color: { value: "#3a86ff" },
        shape: { type: "circle" },
        size: { value: 4 },
        move: {
            enable: true,
            direction: "bottom",
            speed: 2,
            straight: false
        }
    },
    interactivity: {
        events: { onhover: { enable: false }, onclick: { enable: false } }
    }
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
document.querySelectorAll('.tech-badge').forEach((badge, i) => badge.style.transitionDelay = `${i*0.02}s`);

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
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
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