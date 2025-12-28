/**
 * KAYRA'S 18TH BIRTHDAY - GALLERY MODULE
 * Photo gallery with lightbox and lazy loading
 */

(function () {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════
    // GALLERY CONFIGURATION
    // ═══════════════════════════════════════════════════════════════════

    const PHOTOS = [
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.17.jpeg', title: 'Gym Vibes 💪', category: 'gym' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.18.jpeg', title: 'Squad Goals', category: 'friends' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.18 (1).jpeg', title: 'Another Day Another Gainz', category: 'gym' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.18 (2).jpeg', title: 'The Legends', category: 'friends' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.18 (3).jpeg', title: 'Epic Moment', category: 'random' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.19.jpeg', title: 'Cardio Kings', category: 'gym' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.19 (1).jpeg', title: 'Post Workout Glow', category: 'gym' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.19 (2).jpeg', title: 'Caught in 4K', category: 'random' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.20.jpeg', title: 'Vibin\'', category: 'friends' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.20 (1).jpeg', title: 'Best Duo', category: 'friends' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.20 (2).jpeg', title: 'Masterpiece', category: 'best' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.21.jpeg', title: 'Champions Only', category: 'gym' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.21 (1).jpeg', title: 'No Pain No Gain', category: 'gym' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.21 (2).jpeg', title: 'Weekend Mode', category: 'random' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.21 (3).jpeg', title: 'Legendary Shot', category: 'best' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.22.jpeg', title: 'Gym Buddies', category: 'gym' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.22 (1).jpeg', title: 'Good Times Only', category: 'friends' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.22 (2).jpeg', title: 'Peak Performance', category: 'gym' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.23.jpeg', title: 'Random Adventures', category: 'random' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.23 (1).jpeg', title: 'The Dream Team', category: 'best' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.23 (2).jpeg', title: 'Unforgettable', category: 'best' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.23 (3).jpeg', title: 'THE LEGENDARY FEET 🦶', category: 'legendary' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.24.jpeg', title: 'Selfie Game Strong', category: 'friends' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.24 (1).jpeg', title: 'Pure Chaos', category: 'random' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.24 (2).jpeg', title: 'Making Memories', category: 'best' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.25.jpeg', title: 'Living Our Best Life', category: 'friends' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.25 (1).jpeg', title: 'Tiny but Mighty', category: 'random' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.25 (2).jpeg', title: 'Shenanigans', category: 'random' },
        { src: 'images-and-videos/WhatsApp Image 2025-12-28 at 13.45.25 (3).jpeg', title: 'Absolute Legends', category: 'best' }
    ];

    let currentPhotoIndex = 0;
    let filteredPhotos = [...PHOTOS];

    // ═══════════════════════════════════════════════════════════════════
    // GALLERY GRID
    // ═══════════════════════════════════════════════════════════════════

    const galleryGrid = document.querySelector('.gallery-grid');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const lightboxPrev = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
    const lightboxNext = lightbox ? lightbox.querySelector('.lightbox-next') : null;

    function createGalleryItems(photos) {
        if (!galleryGrid) return;

        galleryGrid.innerHTML = '';

        photos.forEach((photo, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item animate-on-scroll';
            item.dataset.index = index;

            item.innerHTML = `
        <img src="${photo.src}" alt="${photo.title}" loading="lazy" />
        <div class="gallery-item-overlay">
          <span class="gallery-item-title">${photo.title}</span>
        </div>
      `;

            item.addEventListener('click', () => openLightbox(index));
            galleryGrid.appendChild(item);
        });

        // Re-observe new elements
        observeGalleryItems();
    }

    function observeGalleryItems() {
        const items = document.querySelectorAll('.gallery-item.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        items.forEach(item => observer.observe(item));
    }

    // ═══════════════════════════════════════════════════════════════════
    // GALLERY FILTERS
    // ═══════════════════════════════════════════════════════════════════

    const filterButtons = document.querySelectorAll('.gallery-filter');

    function filterGallery(category) {
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === category);
        });

        if (category === 'all') {
            filteredPhotos = [...PHOTOS];
        } else {
            filteredPhotos = PHOTOS.filter(photo => photo.category === category);
        }

        createGalleryItems(filteredPhotos);
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterGallery(btn.dataset.filter);
        });
    });

    // ═══════════════════════════════════════════════════════════════════
    // LIGHTBOX
    // ═══════════════════════════════════════════════════════════════════

    function openLightbox(index) {
        if (!lightbox || !lightboxImg) return;

        currentPhotoIndex = index;
        lightboxImg.src = filteredPhotos[index].src;
        lightboxImg.alt = filteredPhotos[index].title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;

        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function nextPhoto() {
        currentPhotoIndex = (currentPhotoIndex + 1) % filteredPhotos.length;
        if (lightboxImg) {
            lightboxImg.src = filteredPhotos[currentPhotoIndex].src;
            lightboxImg.alt = filteredPhotos[currentPhotoIndex].title;
        }
    }

    function prevPhoto() {
        currentPhotoIndex = (currentPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
        if (lightboxImg) {
            lightboxImg.src = filteredPhotos[currentPhotoIndex].src;
            lightboxImg.alt = filteredPhotos[currentPhotoIndex].title;
        }
    }

    // Lightbox event listeners
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', nextPhoto);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevPhoto);

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape': closeLightbox(); break;
            case 'ArrowRight': nextPhoto(); break;
            case 'ArrowLeft': prevPhoto(); break;
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    if (lightbox) {
        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) nextPhoto();
            else prevPhoto();
        }
    }

    // ═══════════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════

    function initGallery() {
        createGalleryItems(PHOTOS);
    }

    // Make the museum photo clickable for lightbox too
    const museumImg = document.querySelector('.artwork-frame img');
    if (museumImg) {
        museumImg.style.cursor = 'pointer';
        museumImg.addEventListener('click', () => {
            // Find the legendary feet photo index
            const legendaryIndex = PHOTOS.findIndex(p => p.category === 'legendary');
            if (legendaryIndex !== -1) {
                filteredPhotos = [...PHOTOS];
                openLightbox(legendaryIndex);
            }
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGallery);
    } else {
        initGallery();
    }

})();
