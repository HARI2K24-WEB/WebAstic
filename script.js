window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
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
document.addEventListener('DOMContentLoaded', function () {
    const particlesContainer = document.getElementById('particles');
    const particles = [];
    const connections = [];
    const particleCount = 60;
    const connectionDistance = 150;
    let animationId;

    // Initialize particles
    initParticles();

    // Handle window resize
    window.addEventListener('resize', function () {
        // Cancel current animation
        cancelAnimationFrame(animationId);

        // Remove all particles and connections
        particlesContainer.innerHTML = '';
        particles.length = 0;
        connections.length = 0;

        // Reinitialize particles
        initParticles();
    });

    function initParticles() {
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }

        // Create connections between nearby particles
        createConnections();

        // Start animation
        animate();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random size between 2px and 4px
        const size = Math.random() * 2 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random position within the container
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        // Random animation delay and duration
        const delay = Math.random() * 5;
        const duration = 3 + Math.random() * 3;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;

        particlesContainer.appendChild(particle);

        // Store particle data
        particles.push({
            element: particle,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: size
        });
    }

    function createConnections() {
        // Clear existing connections
        connections.forEach(conn => {
            if (conn.element.parentNode) {
                conn.element.parentNode.removeChild(conn.element);
            }
        });
        connections.length = 0;

        // Create new connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const connection = document.createElement('div');
                    connection.classList.add('connection');

                    // Position and rotate the connection line
                    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                    connection.style.width = `${distance}px`;
                    connection.style.left = `${particles[i].x}px`;
                    connection.style.top = `${particles[i].y}px`;
                    connection.style.transform = `rotate(${angle}deg)`;

                    // Set opacity based on distance (closer = more opaque)
                    const opacity = 0.7 - (distance / connectionDistance) * 0.7;
                    connection.style.opacity = opacity;

                    particlesContainer.appendChild(connection);
                    connections.push({
                        element: connection,
                        particle1: particles[i],
                        particle2: particles[j]
                    });
                }
            }
        }
    }

    function animate() {
        // Update particle positions
        particles.forEach(particle => {
            // Move particle
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges with slight randomness
            if (particle.x < 0) {
                particle.x = 0;
                particle.vx = Math.abs(particle.vx) * (0.9 + Math.random() * 0.2);
            } else if (particle.x > window.innerWidth) {
                particle.x = window.innerWidth;
                particle.vx = -Math.abs(particle.vx) * (0.9 + Math.random() * 0.2);
            }

            if (particle.y < 0) {
                particle.y = 0;
                particle.vy = Math.abs(particle.vy) * (0.9 + Math.random() * 0.2);
            } else if (particle.y > window.innerHeight) {
                particle.y = window.innerHeight;
                particle.vy = -Math.abs(particle.vy) * (0.9 + Math.random() * 0.2);
            }

            // Update element position
            particle.element.style.left = `${particle.x}px`;
            particle.element.style.top = `${particle.y}px`;
        });

        // Update connections
        connections.forEach(connection => {
            const dx = connection.particle1.x - connection.particle2.x;
            const dy = connection.particle1.y - connection.particle2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                // Update connection position and rotation
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                connection.element.style.width = `${distance}px`;
                connection.element.style.left = `${connection.particle1.x}px`;
                connection.element.style.top = `${connection.particle1.y}px`;
                connection.element.style.transform = `rotate(${angle}deg)`;

                // Update opacity based on distance
                const opacity = 0.7 - (distance / connectionDistance) * 0.7;
                connection.element.style.opacity = opacity;
                connection.element.style.display = 'block';
            } else {
                connection.element.style.display = 'none';
            }
        });

        // Occasionally recreate connections to handle particles moving apart
        if (Math.random() < 0.01) { // 1% chance each frame
            createConnections();
        }

        // Continue animation
        animationId = requestAnimationFrame(animate);
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