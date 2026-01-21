// Particle System
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 4 + 2;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = Math.random() > 0.5 ? 'rgba(255, 255, 255, ' + this.opacity + ')' : 'rgba(253, 187, 45, ' + this.opacity + ')';
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
        
        if (this.y > canvas.height) {
            this.reset();
            this.y = -10;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Update active nav link
            navLinks.forEach(nl => nl.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Update active nav on scroll
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Interactive Heart
const heartMessages = [
    "You are kind, even when the world isn't kind to you.",
    "Your sensitivity is not a weakness—it's your strength.",
    "You deserve peace, happiness, and love.",
    "You are stronger than you know.",
    "You are a beautiful soul who deserves the world.",
    "Your feelings are valid. Always.",
    "You didn't deserve any of this pain.",
    "You are a nice person who deserved better.",
    "You were right to need space and protect your peace.",
    "The problem was never in you—it was my inability to understand.",
    "You survived your 'shitty life' with incredible strength.",
    "You deserved gentleness, not harsh words during arguments.",
    "You are not 'too sensitive'—you are beautifully human.",
    "I'm sorry I prioritized my fears over your mental health."
];

let heartMessageIndex = 0;
const heart = document.getElementById('heart');
const heartMessage = document.getElementById('heartMessage');

heart.addEventListener('click', () => {
    heartMessage.textContent = heartMessages[heartMessageIndex];
    heartMessage.classList.add('show');
    
    heartMessageIndex = (heartMessageIndex + 1) % heartMessages.length;
    
    setTimeout(() => {
        heartMessage.classList.remove('show');
    }, 3000);
});

// Breathing Exercise
let breathingActive = false;
let breathPhase = 'in';
const startBreathingBtn = document.getElementById('startBreathing');
const breathCircle = document.getElementById('breathCircle');
const breathText = document.getElementById('breathText');

startBreathingBtn.addEventListener('click', () => {
    if (!breathingActive) {
        breathingActive = true;
        startBreathingBtn.textContent = 'Stop Breathing Exercise';
        breathCircle.classList.add('breath-in');
        breathText.textContent = 'Breathe In...';
        
        setTimeout(() => {
            breathCircle.classList.remove('breath-in');
            breathCircle.classList.add('breath-out');
            breathText.textContent = 'Breathe Out...';
        }, 4000);
        
        const breathingInterval = setInterval(() => {
            if (!breathingActive) {
                clearInterval(breathingInterval);
                return;
            }
            
            if (breathPhase === 'in') {
                breathCircle.classList.remove('breath-out');
                breathCircle.classList.add('breath-in');
                breathText.textContent = 'Breathe In...';
                breathPhase = 'out';
            } else {
                breathCircle.classList.remove('breath-in');
                breathCircle.classList.add('breath-out');
                breathText.textContent = 'Breathe Out...';
                breathPhase = 'in';
            }
        }, 4000);
        
        // Store interval to clear it later
        breathCircle.dataset.interval = breathingInterval;
    } else {
        breathingActive = false;
        startBreathingBtn.textContent = 'Start Breathing Exercise';
        breathCircle.classList.remove('breath-in', 'breath-out');
        breathText.textContent = 'Breathe In';
        if (breathCircle.dataset.interval) {
            clearInterval(parseInt(breathCircle.dataset.interval));
        }
    }
});

// Venting Box
const ventingInput = document.getElementById('ventingInput');
const releaseBtn = document.getElementById('releaseBtn');
const ventingMessage = document.getElementById('ventingMessage');

// Load existing data
let ventingData = [];

// Try to load from JSON file first (for initial data)
async function loadJSONData() {
    try {
        const response = await fetch('data.json');
        if (response.ok) {
            const jsonData = await response.json();
            if (jsonData.ventingEntries && jsonData.ventingEntries.length > 0) {
                // Merge with localStorage data (localStorage takes precedence)
                const localData = localStorage.getItem('ventingData');
                if (!localData) {
                    ventingData = jsonData.ventingEntries;
                    localStorage.setItem('ventingData', JSON.stringify(ventingData));
                } else {
                    ventingData = JSON.parse(localData);
                }
                return;
            }
        }
    } catch (e) {
        // JSON file not found or error - use localStorage
    }
    
    // Load from localStorage
    try {
        const savedData = localStorage.getItem('ventingData');
        if (savedData) {
            ventingData = JSON.parse(savedData);
        }
    } catch (e) {
        console.log('No existing data found');
    }
}

loadJSONData();

releaseBtn.addEventListener('click', () => {
    const text = ventingInput.value.trim();
    
    if (text) {
        // Create particle effect
        createParticleEffect();
        
        // Save to data
        const entry = {
            id: Date.now(),
            text: text,
            timestamp: new Date().toISOString()
        };
        
        ventingData.push(entry);
        
        // Save to localStorage
        try {
            localStorage.setItem('ventingData', JSON.stringify(ventingData));
            
            // Also update data.json format for export
            const jsonData = {
                ventingEntries: ventingData
            };
            
            // Update the data.json file (this will be saved locally)
            // Note: In browser, we can't directly write to files, so this uses localStorage
            // For deployment, users can export the data if needed
        } catch (e) {
            console.error('Failed to save:', e);
        }
        
        // Show message
        ventingMessage.textContent = '✨ Released. Your words have dissolved into stars. ✨';
        ventingMessage.style.color = '#fdbb2d';
        
        // Clear input
        ventingInput.value = '';
        
        // Clear message after 3 seconds
        setTimeout(() => {
            ventingMessage.textContent = '';
        }, 3000);
    }
});

function createParticleEffect() {
    const stars = [];
    const count = 30;
    
    for (let i = 0; i < count; i++) {
        const star = {
            x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
            y: window.innerHeight / 2 + (Math.random() - 0.5) * 200,
            size: Math.random() * 4 + 2,
            speedX: (Math.random() - 0.5) * 10,
            speedY: (Math.random() - 0.5) * 10,
            opacity: 1,
            color: Math.random() > 0.5 ? 'rgba(255, 255, 255, 1)' : 'rgba(253, 187, 45, 1)'
        };
        stars.push(star);
    }
    
    function animateStars() {
        ctx.save();
        stars.forEach((star, index) => {
            if (star.opacity > 0) {
                star.x += star.speedX;
                star.y += star.speedY;
                star.opacity -= 0.02;
                
                ctx.fillStyle = star.color.replace('1)', star.opacity + ')');
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 10;
                ctx.shadowColor = star.color.replace('1)', star.opacity + ')');
                ctx.fill();
                ctx.shadowBlur = 0;
            } else {
                stars.splice(index, 1);
            }
        });
        ctx.restore();
        
        if (stars.length > 0) {
            requestAnimationFrame(animateStars);
        }
    }
    
    animateStars();
}

// Typewriter Effect (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typewriter for truth section on scroll
const truthContent = document.getElementById('truth-content');
const truthObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
            entry.target.classList.add('typed');
            // Optional: You can enable typewriter effect here if desired
            // const originalText = entry.target.textContent;
            // typeWriter(entry.target, originalText, 30);
        }
    });
}, { threshold: 0.5 });

if (truthContent) {
    truthObserver.observe(truthContent);
}

