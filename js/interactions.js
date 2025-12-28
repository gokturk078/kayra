/**
 * KAYRA'S 18TH BIRTHDAY - INTERACTIONS MODULE
 * Confetti, counters, Easter eggs, and special effects
 */

(function () {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════
    // COUNTER ANIMATION
    // ═══════════════════════════════════════════════════════════════════

    const counters = document.querySelectorAll('[data-counter]');

    function animateCounter(el) {
        const target = el.dataset.counter;

        // Special values that shouldn't be counted
        if (target === '∞' || target === 'MAXIMUM' || isNaN(parseInt(target))) {
            el.textContent = target;
            return;
        }

        const value = parseInt(target);
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (value - start) * easeOutQuart);

            el.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = value.toLocaleString() + (target.includes('+') ? '+' : '');
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // Observe counters for scroll trigger
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ═══════════════════════════════════════════════════════════════════
    // CONFETTI EXPLOSION
    // ═══════════════════════════════════════════════════════════════════

    const confettiBtn = document.querySelector('.confetti-btn');
    const confettiColors = ['#ff006e', '#8338ec', '#3a86ff', '#00f5d4', '#ffbe0b', '#06d6a0'];

    function createConfetti() {
        const confettiCount = 150;
        const container = document.createElement('div');
        container.className = 'confetti-container';
        container.style.cssText = `
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    `;
        document.body.appendChild(container);

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            const size = Math.random() * 10 + 5;
            const isCircle = Math.random() > 0.5;

            confetti.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${isCircle ? size : size * 0.6}px;
        background: ${color};
        border-radius: ${isCircle ? '50%' : '2px'};
        left: ${Math.random() * 100}%;
        top: -20px;
        opacity: 1;
        transform: rotate(${Math.random() * 360}deg);
        animation: confettiFall ${2 + Math.random() * 2}s ease-out forwards;
        animation-delay: ${Math.random() * 0.5}s;
      `;

            container.appendChild(confetti);
        }

        // Remove container after animation
        setTimeout(() => {
            container.remove();
        }, 5000);
    }

    if (confettiBtn) {
        confettiBtn.addEventListener('click', createConfetti);
    }

    // ═══════════════════════════════════════════════════════════════════
    // KONAMI CODE EASTER EGG
    // ═══════════════════════════════════════════════════════════════════

    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase() === e.key ? e.key : e.key;

        if (key === konamiCode[konamiIndex] || key.toLowerCase() === konamiCode[konamiIndex]) {
            konamiIndex++;

            if (konamiIndex === konamiCode.length) {
                triggerEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function triggerEasterEgg() {
        // Create epic popup
        const popup = document.createElement('div');
        popup.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.5s ease;
    `;

        popup.innerHTML = `
      <div style="text-align: center; color: white;">
        <div style="font-size: 5rem; margin-bottom: 1rem;">🎮</div>
        <h2 style="font-family: 'Orbitron', sans-serif; font-size: 2rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #ff006e, #8338ec, #3a86ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          CHEAT CODE ACTIVATED!
        </h2>
        <p style="font-size: 1.25rem; opacity: 0.7;">You found the secret! 🕹️</p>
        <p style="margin-top: 2rem; font-size: 1rem; opacity: 0.5;">
          Kayra, sen en iyisisin! 💜<br>
          (Click anywhere to close)
        </p>
      </div>
    `;

        document.body.appendChild(popup);

        // Fade in
        setTimeout(() => popup.style.opacity = '1', 10);

        // Confetti!
        createConfetti();

        // Close on click
        popup.addEventListener('click', () => {
            popup.style.opacity = '0';
            setTimeout(() => popup.remove(), 500);
        });
    }

    // ═══════════════════════════════════════════════════════════════════
    // LOGO CLICK EASTER EGG
    // ═══════════════════════════════════════════════════════════════════

    const logo = document.querySelector('.nav-logo');
    let logoClickCount = 0;
    let logoClickTimer = null;

    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            logoClickCount++;

            clearTimeout(logoClickTimer);
            logoClickTimer = setTimeout(() => {
                logoClickCount = 0;
            }, 2000);

            if (logoClickCount >= 5) {
                logoClickCount = 0;
                triggerSecretMessage();
            }
        });
    }

    function triggerSecretMessage() {
        const messages = [
            '🤫 Shhh... This is our secret!',
            '💪 Gym bros forever!',
            '🦶 That foot photo though...',
            '🎂 18 yaş gang!',
            '🔥 You\'re the GOAT, Kayra!'
        ];

        const msg = messages[Math.floor(Math.random() * messages.length)];
        showToast(msg);
    }

    // ═══════════════════════════════════════════════════════════════════
    // TOAST NOTIFICATIONS
    // ═══════════════════════════════════════════════════════════════════

    function showToast(message, duration = 3000) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: linear-gradient(135deg, #ff006e, #8338ec);
      color: white;
      padding: 1rem 2rem;
      border-radius: 9999px;
      font-weight: 600;
      z-index: 9999;
      opacity: 0;
      transition: all 0.3s ease;
      box-shadow: 0 10px 40px rgba(255, 0, 110, 0.3);
    `;
        toast.textContent = message;
        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);

        // Animate out
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    // ═══════════════════════════════════════════════════════════════════
    // HERO 18 CLICK
    // ═══════════════════════════════════════════════════════════════════

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('click', () => {
            createConfetti();
            showToast('🎉 18 yaş kutlaması başladı! 🎉');
        });
    }

    // ═══════════════════════════════════════════════════════════════════
    // MUSEUM FEET HOVER EFFECT
    // ═══════════════════════════════════════════════════════════════════

    const artworkFrame = document.querySelector('.artwork-frame');
    if (artworkFrame) {
        artworkFrame.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Ctext y=\'24\' font-size=\'24\'%3E🦶%3C/text%3E%3C/svg%3E"), auto';
        });

        artworkFrame.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'auto';
        });
    }

    // ═══════════════════════════════════════════════════════════════════
    // TYPING EFFECT FOR MESSAGE
    // ═══════════════════════════════════════════════════════════════════

    const typewriterElements = document.querySelectorAll('.typewriter');

    function typeWriter(element) {
        const text = element.dataset.text || element.textContent;
        element.textContent = '';
        element.style.visibility = 'visible';

        let i = 0;
        const speed = 30;

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    const typewriterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter(entry.target);
                typewriterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    typewriterElements.forEach(el => {
        el.dataset.text = el.textContent;
        el.style.visibility = 'hidden';
        typewriterObserver.observe(el);
    });

    // ═══════════════════════════════════════════════════════════════════
    // EXPOSED API FOR OTHER MODULES
    // ═══════════════════════════════════════════════════════════════════

    window.KayraInteractions = {
        createConfetti,
        showToast,
        triggerEasterEgg
    };

})();
