/**
 * KAYRA'S 18TH BIRTHDAY - MAIN JAVASCRIPT
 * Core functionality: Gateway, Navigation, Scroll Animations
 */

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════
  // LOADING SCREEN
  // ═══════════════════════════════════════════════════════════════════
  
  const loadingScreen = document.querySelector('.loading-screen');
  const funnyLoadingTexts = [
    'PREPARING MEMES...',
    'LOADING MEMORIES...',
    'CALIBRATING CRINGE...',
    'SUMMONING CHAOS...',
    'ANALYZING FEET PHOTOS...',
    'BUFFERING FRIENDSHIP...'
  ];

  function updateLoadingText() {
    const textEl = document.querySelector('.loading-text');
    if (textEl) {
      textEl.textContent = funnyLoadingTexts[Math.floor(Math.random() * funnyLoadingTexts.length)];
    }
  }

  function hideLoadingScreen() {
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // GATEWAY (LEVEL 18 INTRO)
  // ═══════════════════════════════════════════════════════════════════
  
  const gateway = document.querySelector('.gateway');
  const gatewayBtn = document.querySelector('.gateway-btn');
  
  function closeGateway() {
    if (gateway) {
      gateway.classList.add('hidden');
      document.body.classList.remove('gateway-active');
      
      // Enable scrolling after gateway closes
      setTimeout(() => {
        gateway.style.display = 'none';
      }, 800);
    }
  }

  if (gatewayBtn) {
    gatewayBtn.addEventListener('click', closeGateway);
  }

  // Also close on Enter key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && gateway && !gateway.classList.contains('hidden')) {
      closeGateway();
    }
  });

  // ═══════════════════════════════════════════════════════════════════
  // NAVIGATION
  // ═══════════════════════════════════════════════════════════════════
  
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  // Scroll state for nav
  let lastScrollY = window.scrollY;
  
  function handleNavScroll() {
    const currentScrollY = window.scrollY;
    
    if (nav) {
      if (currentScrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    
    lastScrollY = currentScrollY;
  }

  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      
      // Animate hamburger
      const spans = navToggle.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // SMOOTH SCROLL
  // ═══════════════════════════════════════════════════════════════════
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = target.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ═══════════════════════════════════════════════════════════════════
  // SCROLL-TRIGGERED ANIMATIONS
  // ═══════════════════════════════════════════════════════════════════
  
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        animationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    animationObserver.observe(el);
  });

  // ═══════════════════════════════════════════════════════════════════
  // SCROLL TO TOP BUTTON
  // ═══════════════════════════════════════════════════════════════════
  
  const scrollTopBtn = document.querySelector('.scroll-top');
  
  function handleScrollTopVisibility() {
    if (scrollTopBtn) {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // PARALLAX SCROLL EFFECT
  // ═══════════════════════════════════════════════════════════════════
  
  function updateParallax() {
    const scrollY = window.scrollY;
    document.documentElement.style.setProperty('--scroll', scrollY);
    
    // Hero parallax
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg && scrollY < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // PARTICLES FOR GATEWAY
  // ═══════════════════════════════════════════════════════════════════
  
  function createParticles() {
    const particlesContainer = document.querySelector('.gateway-particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (10 + Math.random() * 10) + 's';
      particlesContainer.appendChild(particle);
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // CONSOLIDATED SCROLL HANDLER
  // ═══════════════════════════════════════════════════════════════════
  
  let ticking = false;
  
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleNavScroll();
        handleScrollTopVisibility();
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // INITIALIZATION
  // ═══════════════════════════════════════════════════════════════════
  
  function init() {
    updateLoadingText();
    createParticles();
    
    // Add gateway-active class
    if (gateway && !gateway.classList.contains('hidden')) {
      document.body.classList.add('gateway-active');
    }

    // Event listeners
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Hide loading screen after page loads
    window.addEventListener('load', () => {
      setTimeout(hideLoadingScreen, 800);
    });
  }

  // Run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
