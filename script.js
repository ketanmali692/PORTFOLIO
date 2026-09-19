/* =========================================
   KETAN KUMAR - 3D PROFESSIONAL PORTFOLIO
   JavaScript - Animations & Interactions
   ========================================= */


/* =========================================
   1. TYPING EFFECT
   ========================================= */

const typingElement = document.getElementById("typing");

const words = [
    "SOFTWARE DEVELOPER",
    "JAVA PROGRAMMER",
    "C++ PROGRAMMER",
    "SQL LEARNER",
    "TECH ENTHUSIAST"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingElement) return;

    const currentWord = words[wordIndex];

    if (!deleting) {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1400);
            return;
        }
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            wordIndex++;
            if (wordIndex >= words.length) wordIndex = 0;
        }
    }

    setTimeout(typeEffect, deleting ? 45 : 90);
}

if (typingElement) typeEffect();


/* =========================================
   2. 3D HERO MOUSE MOVEMENT
   ========================================= */

const heroVisual = document.querySelector(".hero-visual");

if (heroVisual) {

    heroVisual.addEventListener("mousemove", function (event) {

        const rect = heroVisual.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = (x - centerX) / 25;
        const rotateX = (centerY - y) / 25;

        heroVisual.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroVisual.addEventListener("mouseleave", function () {
        heroVisual.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });
}


/* =========================================
   3. 3D CARD TILT
   ========================================= */

const tiltCards = document.querySelectorAll(
    ".skill-card, .glass-card, .project-card, .timeline-content, .certificate-card"
);

tiltCards.forEach(card => {

    card.addEventListener("mousemove", function (event) {

        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (centerY - y) / 20;
        const rotateY = (x - centerX) / 20;

        card.style.transform =
            `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", function () {
        card.style.transform = "";
    });
});


/* =========================================
   4. CERTIFICATE MODAL - OPEN / CLOSE
   ========================================= */

const certificateModal = document.getElementById("certificateModal");
const javaCert = document.getElementById("javaCert");
const sqlCert = document.getElementById("sqlCert");

function openCertificate(type) {

    if (!certificateModal) return;

    if (javaCert) javaCert.style.display = "none";
    if (sqlCert) sqlCert.style.display = "none";

    if (type === "java" && javaCert) {
        javaCert.style.display = "block";
    } else if (type === "sql" && sqlCert) {
        sqlCert.style.display = "block";
    }

    certificateModal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeCertificate() {
    if (!certificateModal) return;
    certificateModal.classList.remove("active");
    document.body.style.overflow = "";
}

if (certificateModal) {
    certificateModal.addEventListener("click", function (e) {
        if (e.target === certificateModal) {
            closeCertificate();
        }
    });
}

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeCertificate();
    }
});


/* =========================================
   5. SCROLL REVEAL
   ========================================= */

const sections = document.querySelectorAll(".section");

const revealObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });

    },
    { threshold: 0.12 }
);

sections.forEach(section => {
    section.classList.add("hidden-section");
    revealObserver.observe(section);
});


/* =========================================
   6. ACTIVE NAVIGATION
   ========================================= */

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 200;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
});


/* =========================================
   7. PARALLAX BACKGROUND
   ========================================= */

window.addEventListener("mousemove", function (event) {

    const x = (event.clientX / window.innerWidth - 0.5);
    const y = (event.clientY / window.innerHeight - 0.5);

    const stars = document.querySelector(".stars");
    const grid = document.querySelector(".grid");
    const orbs = document.querySelectorAll(".glow-orb");

    if (stars) {
        stars.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    }

    if (grid) {
        grid.style.marginLeft = `${x * 10}px`;
    }

    orbs.forEach((orb, i) => {
        const depth = (i + 1) * 15;
        orb.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
});


/* =========================================
   8. CURSOR GLOW
   ========================================= */

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow && window.innerWidth > 1000) {

    window.addEventListener("mousemove", function (e) {

        cursorGlow.style.left = e.clientX + "px";
        cursorGlow.style.top = e.clientY + "px";
    });
}


/* =========================================
   9. PARTICLE BACKGROUND
   ========================================= */

const canvas = document.getElementById("particles");

if (canvas) {

    const ctx = canvas.getContext("2d");

    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particleCount = window.innerWidth < 650 ? 40 : 90;

    for (let i = 0; i < particleCount; i++) {

        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.8 + 0.5,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: (Math.random() - 0.5) * 0.4,
            opacity: Math.random() * 0.6 + 0.2,
            pulse: Math.random() * Math.PI * 2
        });
    }

    function drawParticles() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {

            p.x += p.speedX;
            p.y += p.speedY;
            p.pulse += 0.02;

            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            const glow = Math.sin(p.pulse) * 0.3 + 0.7;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(216, 180, 90, ${p.opacity * glow})`;
            ctx.shadowBlur = 12;
            ctx.shadowColor = "rgba(216, 180, 90, 0.9)";
            ctx.fill();
            ctx.shadowBlur = 0;

            for (let j = i + 1; j < particles.length; j++) {

                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {

                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(216, 180, 90, ${0.15 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(drawParticles);
    }

    drawParticles();
}


/* =========================================
   10. SMOOTH SCROLL
   ========================================= */

document.querySelectorAll("a[href^='#']").forEach(link => {

    link.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});


/* =========================================
   11. PAGE LOAD EFFECT
   ========================================= */

window.addEventListener("load", function () {
    document.body.classList.add("loaded");
});


/* =========================================
   12. CONSOLE MESSAGE
   ========================================= */

console.log(
    "%c KETAN KUMAR ",
    "background:#d8b45a;color:#050505;font-size:18px;font-weight:bold;padding:8px;"
);

console.log(
    "%c 3D Portfolio Loaded Successfully 🚀✨ ",
    "background:#000;color:#ffe39a;font-size:12px;padding:6px;"
);