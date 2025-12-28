/**
 * KAYRA'S 18TH BIRTHDAY - VIDEO MODULE
 * Video gallery with custom controls and modal player
 */

(function () {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════
    // VIDEO CONFIGURATION
    // ═══════════════════════════════════════════════════════════════════

    const VIDEOS = [
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.44.56.mp4', title: 'Epic Gym Montage', category: 'gym' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.44.57.mp4', title: 'Workout Chronicles', category: 'gym' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.44.58.mp4', title: 'The Grind', category: 'gym' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.44.58 (1).mp4', title: 'Quick Clip', category: 'funny' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.44.59.mp4', title: 'Adventure Time', category: 'outdoor' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.00.mp4', title: 'Short & Sweet', category: 'funny' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.00 (1).mp4', title: 'The Long One', category: 'highlights' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.01.mp4', title: 'Legendary Moment', category: 'highlights' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.01 (1).mp4', title: 'Behind the Scenes', category: 'funny' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.02.mp4', title: 'Cardio Session', category: 'gym' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.02 (1).mp4', title: 'Mini Clip', category: 'funny' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.02 (2).mp4', title: 'Outdoor Vibes', category: 'outdoor' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.03.mp4', title: 'Peak Energy', category: 'gym' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.03 (1).mp4', title: 'Random Chaos', category: 'funny' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.03 (2).mp4', title: 'Quick Take', category: 'funny' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.03 (3).mp4', title: 'Micro Moment', category: 'funny' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.04.mp4', title: 'Golden Hour', category: 'outdoor' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.04 (1).mp4', title: 'Full Workout', category: 'gym' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.04 (2).mp4', title: 'Highlights Reel', category: 'highlights' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.05.mp4', title: 'Snap That', category: 'funny' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.05 (1).mp4', title: 'Beast Mode', category: 'gym' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.05 (2).mp4', title: 'Day Out', category: 'outdoor' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.05 (3).mp4', title: 'Epic Compilation', category: 'highlights' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.06.mp4', title: 'Shenanigans', category: 'funny' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.06 (1).mp4', title: 'Leg Day Survivor', category: 'gym' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.06 (2).mp4', title: 'Quick Laugh', category: 'funny' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.07.mp4', title: 'Arm Day', category: 'gym' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.07 (1).mp4', title: 'Nature Walk', category: 'outdoor' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.07 (2).mp4', title: 'Evening Session', category: 'gym' },
        { src: 'images-and-videos/WhatsApp Video 2025-12-28 at 13.45.07 (3).mp4', title: 'The Documentary', category: 'highlights' }
    ];

    // Only show first 30 videos to avoid performance issues
    const displayVideos = VIDEOS.slice(0, 30);

    // ═══════════════════════════════════════════════════════════════════
    // VIDEO GRID
    // ═══════════════════════════════════════════════════════════════════

    const videoGrid = document.querySelector('.video-grid');
    const videoModal = document.querySelector('.video-modal');
    const videoModalContent = videoModal ? videoModal.querySelector('.video-modal-content') : null;
    const videoModalClose = videoModal ? videoModal.querySelector('.video-modal-close') : null;

    function createVideoCards(videos) {
        if (!videoGrid) return;

        videoGrid.innerHTML = '';

        videos.forEach((video, index) => {
            const card = document.createElement('div');
            card.className = 'video-card animate-on-scroll';
            card.dataset.index = index;

            card.innerHTML = `
        <div class="video-thumbnail">
          <video src="${video.src}" muted preload="metadata"></video>
          <div class="video-play-btn">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <div class="video-info">
          <div class="video-title">${video.title}</div>
          <div class="video-category">${getCategoryEmoji(video.category)} ${video.category}</div>
        </div>
      `;

            // Hover preview
            const thumbnail = card.querySelector('.video-thumbnail video');
            card.addEventListener('mouseenter', () => {
                if (thumbnail) {
                    thumbnail.currentTime = 0;
                    thumbnail.play().catch(() => { });
                }
            });

            card.addEventListener('mouseleave', () => {
                if (thumbnail) {
                    thumbnail.pause();
                    thumbnail.currentTime = 0;
                }
            });

            // Click to open modal
            card.addEventListener('click', () => openVideoModal(video));

            videoGrid.appendChild(card);
        });

        observeVideoCards();
    }

    function getCategoryEmoji(category) {
        const emojis = {
            gym: '🏋️',
            outdoor: '🌳',
            funny: '😂',
            highlights: '🏆'
        };
        return emojis[category] || '📹';
    }

    function observeVideoCards() {
        const cards = document.querySelectorAll('.video-card.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        cards.forEach(card => observer.observe(card));
    }

    // ═══════════════════════════════════════════════════════════════════
    // VIDEO MODAL
    // ═══════════════════════════════════════════════════════════════════

    function openVideoModal(video) {
        if (!videoModal || !videoModalContent) return;

        videoModalContent.innerHTML = `
      <video src="${video.src}" controls autoplay class="modal-video"></video>
      <div class="modal-video-title">${video.title}</div>
    `;

        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeVideoModal() {
        if (!videoModal) return;

        const video = videoModal.querySelector('video');
        if (video) video.pause();

        videoModal.classList.remove('active');
        videoModalContent.innerHTML = '';
        document.body.style.overflow = '';
    }

    if (videoModalClose) {
        videoModalClose.addEventListener('click', closeVideoModal);
    }

    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) closeVideoModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });

    // ═══════════════════════════════════════════════════════════════════
    // VIDEO FILTERS
    // ═══════════════════════════════════════════════════════════════════

    const videoFilters = document.querySelectorAll('.video-filter');

    function filterVideos(category) {
        videoFilters.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === category);
        });

        let filtered;
        if (category === 'all') {
            filtered = displayVideos;
        } else {
            filtered = displayVideos.filter(v => v.category === category);
        }

        createVideoCards(filtered);
    }

    videoFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            filterVideos(btn.dataset.filter);
        });
    });

    // ═══════════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════

    function initVideos() {
        createVideoCards(displayVideos);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initVideos);
    } else {
        initVideos();
    }

})();
