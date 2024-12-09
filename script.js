// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add gradient animation to hero section
const hero = document.querySelector('.hero');
let angle = 0;

function updateGradient() {
    angle = (angle + 1) % 360;
    hero.style.background = `linear-gradient(${angle}deg, #275464, #2A2764)`;
    requestAnimationFrame(updateGradient);
}

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

// Observe all feature and benefit cards
document.querySelectorAll('.feature-card, .benefit-card').forEach(card => {
    observer.observe(card);
});

// Initialize gradient animation
updateGradient();
