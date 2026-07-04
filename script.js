document.addEventListener("DOMContentLoaded", () => {
    const scene = document.getElementById("bouquet-scene");
    const message = document.getElementById("message");
    const clickHint = document.getElementById("click-hint");
    const particlesContainer = document.getElementById("particles");
    let hasBloomed = false;

    // Updated total animation time to account for the deepest stagger (3.9s delay + 0.5s transition)
    const ANIMATION_DURATION = 4500;

    scene.addEventListener("click", () => {
        if (hasBloomed) return;
        hasBloomed = true;

        // Start blooming
        scene.classList.add("bloomed");
        clickHint.classList.add("hidden");

        // Reveal message after all flowers bloom
        setTimeout(() => {
            message.classList.add("visible");
            startParticles();
        }, ANIMATION_DURATION);
    });

    function startParticles() {
        // Create a particle every 300ms
        setInterval(createParticle, 300);
    }

    function createParticle() {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        
        // Randomly choose between heart and sparkle
        const isHeart = Math.random() > 0.3;
        particle.innerHTML = isHeart ? "♥" : "✨";
        
        // Randomize properties
        const leftPos = Math.random() * 100;
        const size = Math.random() * 20 + 15;
        const duration = Math.random() * 4 + 5;
        const delay = Math.random() * 2;

        particle.style.left = `${leftPos}vw`;
        particle.style.fontSize = `${size}px`;
        particle.style.animation = `floatUp ${duration}s ease-in ${delay}s forwards`;

        // Randomize colors for hearts
        if (isHeart) {
            const hue = Math.random() * 20 + 340; // Pinks/Reds range
            particle.style.color = `hsl(${hue}, 80%, 70%)`;
            particle.style.textShadow = `0 0 10px hsl(${hue}, 80%, 60%)`;
        } else {
            particle.style.color = "#fff";
            particle.style.textShadow = "0 0 10px #fff";
        }

        particlesContainer.appendChild(particle);

        // Remove particle after animation finishes to clean up DOM
        setTimeout(() => {
            particle.remove();
        }, (duration + delay) * 1000);
    }
});