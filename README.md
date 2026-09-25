# Game of Thrones — Chronicles of Westeros

<p align="center">
  <a href="README.md"><b>English</b></a> | <a href="README.tr.md"><b>Türkçe</b></a>
</p>


An immersive, scroll-driven interactive web experience exploring the lore, Great Houses, Valyrian steel armory, and legendary epochs of Westeros.

---

## Features

- **60 FPS Canvas Scroll Experience:** Frame-by-frame cinematic sequence powered by HTML5 Canvas and GSAP ScrollTrigger for smooth, high-fidelity performance across desktop and mobile devices.
- **6-Chapter Narrative Progression:** Prologue, Winterfell, The Seven Kingdoms, King's Landing, A Thousand Blades, and The Iron Throne.
- **The Great Houses of Westeros:** Interactive 3D tilt house cards featuring House Stark, Lannister, Targaryen, Baratheon, Greyjoy, and Tyrell with hover reveals and lore words.
- **Valyrian Steel Armory:** Interactive blade inspector with stats, origins, historical wielders, and spell-forged lore for legendary weapons (Longclaw, Ice, Blackfyre, Dark Sister, Catspaw Dagger, Heartsbane).
- **Chronicles of the Realm:** Interactive timeline spanning 12,000 years of history — from the Dawn Age and the Long Night to the Doom of Valyria, Aegon's Conquest, Dance of the Dragons, and Robert's Rebellion.
- **Dark Gothic Aesthetic:** Handcrafted typography using Cinzel, Cinzel Decorative, and IM Fell English, accented by gold foil gradients, ambient vignettes, and subtle film grain textures.

---

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Animation & Scroll:** GSAP & ScrollTrigger
- **Rendering Engine:** HTML5 Canvas (2D Image Sequence Buffer)
- **Styling:** Modular CSS with custom design tokens

---

## Performance Architecture

Standard HTML5 video elements suffer from decoder latency and frame drops when scrubbed rapidly due to long keyframe intervals (GOP).

This project solves that bottleneck by preloading an optimized WebP frame sequence into a memory buffer and rendering frames directly via `CanvasRenderingContext2D.drawImage()`. This achieves sub-millisecond draw times and a guaranteed 60+ FPS scroll rate regardless of user scroll speed.

---

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm / yarn / pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/berkaysahin-dev/shaz-web-got.git
   cd shaz-web-got
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## Project Structure
```
shaz-web-got/
├── public/
│   ├── frames/         # Extracted 60FPS WebP frame sequence
│   ├── images/         # House sigils and graphics
│   └── video/          # Original reference media
├── src/
│   ├── components/
│   │   ├── Hero.jsx        # Canvas scroll sequence & chapter HUD
│   │   ├── Hero.css
│   │   ├── Section1.jsx    # The Great Houses cards
│   │   ├── Section1.css
│   │   ├── Armory.jsx      # Valyrian steel weapons showcase
│   │   ├── Armory.css
│   │   ├── Chronicles.jsx  # 12,000-year historical timeline
│   │   ├── Chronicles.css
│   │   ├── Footer.jsx      # Cinematic footer & navigation
│   │   └── Footer.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## Credits

- Designed & Developed with passion by **Shaz Agency** ([shazagency.com](https://shazagency.com)).
- Inspired by the *A Song of Ice and Fire* universe created by George R.R. Martin and HBO.