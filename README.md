# 🎂 Kayra's 18th Birthday Website

Premium, ironic, and unforgettable birthday celebration website!

## 🚀 Quick Start

1. **Open the website**
   - Simply open `index.html` in any modern browser
   - OR run a local server for best experience:
   ```bash
   cd kayra
   python3 -m http.server 8080
   # Then open http://localhost:8080
   ```

## 📁 Project Structure

```
kayra/
├── index.html              # Main entry point
├── css/
│   ├── style.css          # Core design system
│   ├── components.css     # Component styles (nav, gateway, etc.)
│   ├── sections.css       # Section-specific styles
│   ├── animations.css     # All animations and keyframes
│   └── responsive.css     # Media queries for all devices
├── js/
│   ├── main.js            # Core functionality (gateway, nav, scroll)
│   ├── gallery.js         # Photo gallery with lightbox
│   ├── video.js           # Video grid and modal player
│   └── interactions.js    # Confetti, counters, Easter eggs
├── images-and-videos/     # All your media files (29 photos, 67 videos)
└── README.md              # This file
```

## ✨ Features

### Main Sections
- **🎮 Level 18 Gateway** - Gaming-inspired intro with the legendary feet photo
- **🎬 Hero Section** - Cinematic intro with video background
- **📊 Statistics** - Absurd but hilarious friendship stats
- **🏛️ Museum Section** - The Ayak Chronicles (feet photo as art)
- **📸 Photo Gallery** - 29 photos with filtering and lightbox
- **🎥 Video Vault** - 67 videos with hover preview
- **🎂 Birthday Message** - Heartfelt (and funny) message
- **🎬 Credits** - Movie-style credits

### Interactive Elements
- ✅ Smooth scroll navigation
- ✅ Scroll-triggered animations
- ✅ Photo lightbox with keyboard/swipe navigation
- ✅ Video hover preview
- ✅ Counter animations
- ✅ Confetti explosion button
- ✅ Parallax effects

### 🥚 Easter Eggs
1. **Konami Code** - Type ↑↑↓↓←→←→BA for a secret!
2. **Logo Click** - Click the logo 5 times fast
3. **Hero Click** - Click the title for confetti
4. **Feet Cursor** - Hover over the museum artwork

## 🎨 Customization

### Change Colors
Edit `css/style.css` and modify the CSS variables:
```css
:root {
  --neon-pink: #ff006e;    /* Primary accent */
  --neon-purple: #8338ec;  /* Secondary accent */
  --neon-cyan: #00f5d4;    /* Highlight color */
}
```

### Add More Photos/Videos
1. Add your media files to `images-and-videos/`
2. Edit `js/gallery.js` - add entries to the `PHOTOS` array
3. Edit `js/video.js` - add entries to the `VIDEOS` array

### Change Texts
All text content is in `index.html`. Key sections:
- Hero section: Lines 70-85
- Statistics: Lines 95-140
- Museum: Lines 145-175
- Birthday Message: Lines 230-260

## 📱 Responsive Design

Fully responsive for:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🖥️ Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## ⚡ Performance Tips

1. Videos are lazy-loaded automatically
2. Photos use native lazy loading
3. Animations respect `prefers-reduced-motion`
4. For production, consider compressing videos with FFmpeg

## 🎉 Have Fun!

This website is made with 💜 for Kayra's 18th birthday.

---

*Made by your Gym Buddy, 2025*
# kayra
