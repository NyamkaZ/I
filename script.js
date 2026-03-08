// Create floating hearts
function createHearts() {
    const heartsContainer = document.getElementById('hearts');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💘', '💝', '💞'];
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 8 + 's';
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heartsContainer.appendChild(heart);
    }
}

// Create stars
function createStars() {
    const starsContainer = document.getElementById('stars');
    
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        starsContainer.appendChild(star);
    }
}

// Create sparkles around heart on click
function createSparkles(x, y) {
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = (x + Math.random() * 100 - 50) + 'px';
        sparkle.style.top = (y + Math.random() * 100 - 50) + 'px';
        sparkle.style.animationDelay = Math.random() * 0.5 + 's';
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 2000);
    }
}

// Music control (autoplayed)
const bgMusic = document.getElementById('bgMusic');

// attempt to start music on load; unmute after play begins
function startMusic() {
    bgMusic.volume = 0.5;
    bgMusic.play().then(() => {
        // once playing, unmute so sound is heard
        bgMusic.muted = false;
    }).catch(e => {
        console.log('Auto-play prevented or failed:', e);
    });
}


// Heart click effect
const bigHeart = document.getElementById('bigHeart');
bigHeart.addEventListener('click', (e) => {
    const rect = bigHeart.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    // Create sparkles
    for (let i = 0; i < 20; i++) {
        createSparkles(x, y);
    }
    
    // Pulse effect
    bigHeart.style.transform = 'scale(1.3)';
    setTimeout(() => {
        bigHeart.style.transform = 'scale(1)';
    }, 200);
});

// Floating love words
function createFloatingWords() {
    const words = ['Love', 'Forever', 'Always', 'Yours', 'Mine', 'Sweet', 'Dear', 'Angel'];
    const container = document.querySelector('.container');
    
    setInterval(() => {
        const word = document.createElement('div');
        word.className = 'floating-text';
        word.textContent = words[Math.floor(Math.random() * words.length)];
        word.style.left = Math.random() * 80 + 10 + '%';
        word.style.top = Math.random() * 80 + 10 + '%';
        container.appendChild(word);
        
        setTimeout(() => word.remove(), 6000);
    }, 2000);
}

// Mouse trail effect
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.fontSize = '15px';
        heart.style.zIndex = '1000';
        heart.style.transition = 'all 1s ease-out';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.style.transform = 'translateY(-50px) scale(0)';
            heart.style.opacity = '0';
        }, 10);
        
        setTimeout(() => heart.remove(), 1000);
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createHearts();
    createStars();
    createFloatingWords();
    startMusic();          // kick off background audio immediately
});

// if autoplay failed due to policy, try again on any user interaction
['click','touchstart','keydown','mousemove'].forEach(evt => {
    document.addEventListener(evt, startMusic, { once: true });
});