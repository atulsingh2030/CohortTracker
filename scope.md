I want this merely to be a frontend where I will put up few agents with redirecter urls for now.

Sharing a high level thinking
The user wants an extremely futuristic, sci-fi themed personal "Agentic Army" homepage/dashboard. Let me build something truly spectacular with:

A stunning hero section with particle effects
Categorized agent cards with incredible animations
Framer Motion for fluid animations
Parallax effects
Sci-fi aesthetic (think Tron, cyberpunk, holographic)
JSON-based animations (Lottie)
Glassmorphism, neon effects, grid backgrounds
Interactive hover effects on agent cards
Category folders with expandable sections
Each agent has a redirect link that can be updated
Building this with Vite, React, TypeScript, Framer Motion, Tailwind CSS, and a neon cyberpunk color palette of cyan, purple, and electric blue.

Now I'm planning the core architecture—starting with an animated hero section featuring the "AGENTIC ARMY" title...

Organizing the agents into six categories: Social Media Ops, Communication, Data & Infrastructure, Finance, Engineering, and Automation, each with their own holographic cards that respond to hover interactions and 3D transforms.

I'll add an animated search and filter system, plus a matrix-style animated background to tie the whole aesthetic together.

Setting up the project structure... I'm mapping out the rest of the project structure with the data and hooks directories, then realizing I should push the visual design further—adding animated grid backgrounds, particle effects that track the mouse, holographic cards with shifting gradients, 3D perspective transforms, glitch effects, scan lines, neon glows, parallax scrolling, staggered animations, and expandable category pods with spring physics to really make this stand out.

Setting up the color scheme with cyan, purple, electric blue, and neon accents against a deep black background, then planning out the core files I'll need to build this—starting with package dependencies and the Vite configuration.

Building the project structure...

I'm realizing I should consolidate this into fewer, more substantial files to keep things manageable while still delivering something visually impressive. I'll focus on the core essentials: configuration files, the main app orchestrator, agent data, and the particle field component as the visual centerpiece.

Now I'm planning out the interactive components—the agent cards will be the star of the show with 3D tilt effects that respond to mouse movement, animated rainbow gradient borders, glassmorphic styling, and pulsing status indicators.

For the overall experience, I'm adding a system status bar at the top, a command palette for quick navigation, scroll-triggered animations throughout, and a rotating 3D holographic element in the hero section using pure CSS transforms.

Defining the data structures... I'm planning out the visual effects I want to include—holographic borders with rotating gradients, cards that follow the cursor magnetically, blurred depth layering, neural network connectors between agents, typewriter text animations, pulsing rings from active elements, falling matrix characters, waveform visualizations, morphing background shapes, and a glowing cursor trail. I'll use Lottie animations for smooth motion and implement parallax scrolling to create depth while keeping performance optimized.

Now I'm setting up the dependencies and structuring the page layout with a floating navbar using glassmorphism, followed by the hero section and other key components.

Building the page structure... Building out the category grid...

Actually, I'm reconsidering the layout approach—maybe a tabbed or sidebar interface would work better than separate sections, letting me display agents in a more polished grid format.

On second thought, a single dashboard page makes more sense: hero section at the top, then a search and filter bar, followed by agents arranged in a masonry grid with collapsible category headers. This feels more intuitive and visually cohesive.

For the interactive elements, I'm planning to add a spotlight hover effect on the agent cards where a gradient follows the cursor, creating that holographic shimmer by tracking mouse position and updating CSS variables dynamically.

Now I'm ready to build this out completely with all the necessary files and production-ready code...

Building the hero section with a glitch effect on the title, typing animation for the subtitle, and animated counters displaying total agents, active ones, and category counts...

Now I'm setting up the agent cards with glassmorphism styling, colored borders tied to categories, 3D tilt effects on hover, and a cursor-following spotlight effect that creates that holographic sheen. Each card will have a pulsing status indicator with color coding, category badges, version info, and spring animations when they mount.

I'm going to use Lucide React for a clean, modern icon system throughout the interface, then define the agent data structure with types for status, agent properties, and all the metadata needed...

Defining the agent data structure... Defining the agent data structure... Continuing with the tool definitions for the social media automation suite... Defining the agent configurations... Continuing with the data tools configuration... Adding more agent configurations... Continuing to define the tool configurations... Defining more tool configurations... Defining more tool entries... Defining the tool configurations... Finishing up the agent data structure with the uptime percentage, then defining utility functions to filter agents by category, count active ones, and map category IDs to their corresponding accent colors for the UI.

Now I'm setting up the global styles with Tailwind directives and importing the typography fonts, then defining CSS custom properties for the neon color palette and background layers.

Writing the animation keyframes... Defining the glitch animation... Still writing animation keyframes... Still writing animations... Still writing styles... Writing the particle component... I'm setting up the particle initialization to calculate how many particles to render based on canvas size, then creating an array of particles with random positions, velocities, sizes, and colors from a predefined palette. Now I'm moving into the animation loop...

Still writing particle physics... Writing particle connections... Finishing up the effect cleanup and returning the canvas element, then moving into the Hero component which uses Framer Motion for scroll-based animations.

Now I'm setting up scroll transforms for parallax effects and opacity fading, along with an animated counter that increments the active and total counts over a couple seconds.

Building the motion section with grid background... Writing component markup... Writing the glitch effect layers... Writing the stats section... Writing the scroll indicator...

Now I'm moving on to the AgentCard component, which is the main piece here. I'm setting up a status configuration object that maps different agent states like active, standby, and development to their corresponding colors, labels, and background styles.

Setting up the component with refs and state to track hover interactions, then initializing motion values for mouse tracking and spring animations that'll create that smooth 3D rotation effect based on cursor position. Writing the card component... Still writing the card styles... Writing component styles... Writing component markup... Writing component styles...

I'm realizing the useTransform approach with multiple values might not work as expected in this version of framer-motion, so I should simplify the spotlight effect by tracking mouse position directly in state instead. Let me also finish building out the CategorySection and main layout components.

Now I'm going to write out the complete application structure with all the necessary files and configurations to make this work properly. I'm thinking through the key visual effects that will make this stand out—particle networks that respond to cursor movement, 3D tilting cards with spotlight effects, animated gradient borders, glitch effects on the hero text, parallax scrolling, staggered card animations, glass morphism styling, neon glows, scan lines on hover, count-up animations for stats, floating elements, and a command palette triggered by Cmd+K.

I also want to add category filters that let users click to filter content, an optional custom cursor, and then I'll implement the spotlight effect by tracking the mouse position relative to each card and using a radial gradient positioned at those coordinates.

Now I'm ready to write out all the code and bring this design to life with maximum visual impact.

For the 3D tilt effect, I'll use a simpler CSS transform approach instead of the more complex Framer Motion chain—calculating the tilt angles based on mouse position within the card...

Writing the tilt calculation...

Now I'm planning out the full component structure: the navbar needs to be fixed at the top with a glassmorphic style, the logo on the left, status indicators in the middle, and a Cmd+K shortcut display on the right that responds to scroll events. The command palette will open with that keyboard shortcut and let me search through available agents with a clean interface.

For the footer, I'm keeping it minimal with just a "Built by" credit and social links. I'm also settling on a dark theme with neon accents—using a nearly black background like #030014 with subtle grid lines for visual interest.

I'm reconsidering whether to use Lottie animations for the hero section instead of building custom ones, since they'd give a more polished feel with less effort.

Building the NeuralOrb component... Finishing the glow effect... Now I'm ready to write out the complete application with all the necessary configuration files and components to bring this interactive agent showcase to life. I'm going to implement a rotating border effect using a pseudo-element approach that works across all browsers—creating a container with an oversized inner div that rotates behind the card content. Writing the rotating border effect...

Now I'm applying this to the AgentCard and building out the command palette with a blurred backdrop, searchable results, and keyboard navigation. The navbar will be fixed with a transparent-to-glassmorphic transition on scroll, showing the logo, active agent count, and a command palette trigger. Let me write all the components together.

Setting up the project dependencies...

I'm realizing the user wants the complete implementation, not just the config file. Let me provide all the necessary code files and clear setup instructions so they can actually build this out.

Now I'm creating the orbital rings component with 3D perspective and animated rotating rings... Writing the ring animation... like wireframe. Then each rotates around Z at different speeds.

For framer-motion, the way to animate this is by setting up the rotation properties and transition timing based on the index. Actually, I need to reconsider how framer-motion applies transforms—it uses a specific order that might conflict with what I need here.

The transform order in framer-motion is translate, scale, rotateZ, rotateY, rotateX, skew, but I actually need rotateY fixed, then rotateX for the tilt, then rotateZ animating. To work around framer-motion's transform ordering, I'll nest multiple divs with static transforms as wrappers, then apply the animated rotation to the innermost element.

Nesting the transforms this way...

Actually, let me just build this out. I'll create three orbital rings with different orientations and speeds, using CSS transforms for the static positioning and framer-motion for the rotation animation. Now I'm ready to write the full application with all the configuration and source files organized properly.

Writing component files... I'm going back and forth on whether to include Lottie animations since the user specifically requested JSON-based animations. I'll add the Lottie player with a fallback to CSS animations if the external URLs fail to load, and include a comment so users can swap in their own animation URLs if needed.

Actually, let me stop deliberating and just start building the code.

I'm settling on a self-contained approach without external Lottie dependencies—CSS and SVG animations paired with canvas particles and Framer Motion for the rest. Now I need to configure Tailwind properly, extending it with custom fonts like Inter, JetBrains Mono, and Orbitron, plus a neon color palette...

Configuring Tailwind theme... Finishing the keyframe animations and wrapping up the Tailwind config. Now I'm pivoting to actually start building the component instead of planning—I need to be efficient with tokens but still create something visually striking. I'm thinking about adding a Matrix-style rain effect to the background for that extra wow factor.

Actually, the particle network combined with the grid and cards should be impressive enough without overcomplicating things. But I do want to add floating orbs around the hero section—larger, fewer, and more colorful than the particles, like holographic dust drifting slowly. I'll animate these with Framer Motion...

Writing the floating orbs component... Adding a vignette effect with a radial gradient to darken the edges for that cinematic look, and I need to make sure the pointer-events: none keeps it from blocking interactions. Now I'm thinking through the mobile responsiveness—adjusting the hero text and other elements to work well on smaller screens.

Writing the complete code now...

I'm structuring the agent data with about 20 agents distributed across 8 categories—roughly 2-3 per category to keep it visually balanced. I'm organizing them as Social Ops, Communication, Data & Infrastructure, Finance, Engineering, and Automation agents with specific names for each.

Now I'm building out the actual implementation, starting with the AgentCard component that needs a 3D tilt effect with spotlight highlighting on hover...

Setting up the mouse tracking logic... Writing the card styling...

Now I'm thinking through the scroll animations—I'll use Framer Motion's scroll hooks to create parallax effects in the Hero section and trigger card animations as they come into view.

For the filtering system, I'm tracking the active category with state and using AnimatePresence with layout animations so cards smoothly transition when the filter changes.

The command palette will be a fixed overlay that opens with keyboard shortcuts, filters agents by search term, and supports keyboard navigation.

Building the filtered agent grid with layout animations...

Now I'm thinking through the data structure: agents data lives in a separate file, the main App component manages the filtering state and search query, and the navigation component handles the category selection.

I'm also planning to add a subtle noise texture overlay across the entire page to give it that cinematic quality, using a fixed positioned element with very low opacity.

Actually, I'll skip the noise texture for now and focus on getting the core visual effects polished. Looking at what I've already implemented, I've got a solid list of WOW effects working—from the particle network and glitch text to the 3D card tilts and cursor spotlights—so I should prioritize refining those rather than adding more layers.

Now I'm ready to write out the final code, starting with setup instructions and then moving through the configuration files and HTML structure. Tailwind v3.4 has line-clamp built in, so I don't need the plugin. For the hero subtitle, I'm implementing a typing animation using framer-motion that reveals each letter sequentially with a slight delay, plus a blinking cursor at the end.

Now I want to add animated data flow lines connecting the hero section to the agent grid below—like neural connections with dots traveling down them to create that sense of information flowing through the interface. Building the SVG animation... Writing the complete project structure... Still writing the component... Writing the event handlers...

Actually, I'm reconsidering—using refs and direct DOM manipulation for the spotlight position would avoid unnecessary re-renders when dealing with multiple cards, so let me pivot to that approach instead. Writing the complete implementation... Adding metadata to the agent data structure—I'll include a lastUpdated timestamp and an id field for URL mapping, plus a placeholder for an admin edit button on each card that can eventually link to a backend configuration panel. Now I'm ready to write out all the component files in one complete pass. I've decided to streamline the architecture by consolidating some components—this brings it down to 16 files that are much more manageable. Now I'm going to write them all out in order, starting with the configuration files and working through to the interactive components.

Writing the code now...


This was the thinking by LLM.

- - - - Execution mode below - - - 

🔮 AGENTIC ARMY — Futuristic Agent Dashboard
Here's your complete, production-ready application with every visual effect cranked to maximum.

Quick Setup
Bash

mkdir agentic-army && cd agentic-army
# paste all files below, then:
npm install
npm run dev
package.json
JSON

{
  "name": "agentic-army",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^11.15.0",
    "lucide-react": "^0.468.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.16",
    "typescript": "^5.6.3",
    "vite": "^6.0.3"
  }
}
vite.config.ts
TypeScript

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
tailwind.config.js
JavaScript

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
      },
      colors: {
        neon: {
          cyan: '#00f0ff',
          purple: '#a855f7',
          pink: '#ff0080',
          green: '#00ff88',
          blue: '#3b82f6',
          orange: '#ff6b35',
        },
        void: {
          DEFAULT: '#030014',
          light: '#0a0a1a',
          card: '#0d0d24',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'border-spin': 'borderSpin 4s linear infinite',
        'scan': 'scan 3s linear infinite',
        'shimmer': 'shimmer 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseNeon: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        borderSpin: {
          to: { transform: 'rotate(360deg)' },
        },
        scan: {
          '0%': { top: '-10%' },
          '100%': { top: '110%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
};
postcss.config.js
JavaScript

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
tsconfig.json
JSON

{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
index.html
HTML

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#030014" />
    <title>AGENTIC ARMY — Command Center</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
src/main.tsx
React

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
src/index.css
CSS

@tailwind base;
@tailwind components;
@tailwind utilities;

/* ═══════════════════════════════════════════
   GLOBAL RESETS & BASE
   ═══════════════════════════════════════════ */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 240, 255, 0.3) transparent;
}

body {
  background: #030014;
  color: #e0e0e0;
  font-family: 'Inter', system-ui, sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ═══════════════════════════════════════════
   CUSTOM SCROLLBAR
   ═══════════════════════════════════════════ */

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #030014;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 240, 255, 0.25);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 240, 255, 0.5);
}

/* ═══════════════════════════════════════════
   GLITCH EFFECT
   ═══════════════════════════════════════════ */

.glitch-wrapper {
  position: relative;
}

.glitch-clone {
  position: absolute;
  inset: 0;
  opacity: 0;
}

.glitch-wrapper:hover .glitch-clone:nth-child(2) {
  opacity: 0.04;
  animation: glitchShift1 0.3s infinite;
  color: #ff0080;
}

.glitch-wrapper:hover .glitch-clone:nth-child(3) {
  opacity: 0.04;
  animation: glitchShift2 0.3s infinite;
  color: #00f0ff;
}

@keyframes glitchShift1 {
  0%, 100% { clip-path: inset(20% 0 60% 0); transform: translate(-3px, 1px); }
  25% { clip-path: inset(50% 0 20% 0); transform: translate(3px, -1px); }
  50% { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 2px); }
  75% { clip-path: inset(70% 0 5% 0); transform: translate(2px, -2px); }
}

@keyframes glitchShift2 {
  0%, 100% { clip-path: inset(60% 0 10% 0); transform: translate(3px, -1px); }
  25% { clip-path: inset(20% 0 50% 0); transform: translate(-3px, 1px); }
  50% { clip-path: inset(70% 0 5% 0); transform: translate(2px, -2px); }
  75% { clip-path: inset(5% 0 80% 0); transform: translate(-2px, 2px); }
}

/* ═══════════════════════════════════════════
   STATUS PULSE
   ═══════════════════════════════════════════ */

@keyframes statusPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.6); }
  50% { box-shadow: 0 0 0 6px rgba(0, 255, 136, 0); }
}

.status-active {
  animation: statusPulse 2s ease-in-out infinite;
}

@keyframes statusPulseYellow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.6); }
  50% { box-shadow: 0 0 0 6px rgba(251, 191, 36, 0); }
}

.status-standby {
  animation: statusPulseYellow 2s ease-in-out infinite;
}

@keyframes statusPulseBlue {
  0%, 100% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.6); }
  50% { box-shadow: 0 0 0 6px rgba(96, 165, 250, 0); }
}

.status-development {
  animation: statusPulseBlue 2s ease-in-out infinite;
}

/* ═══════════════════════════════════════════
   CARD ROTATING BORDER
   ═══════════════════════════════════════════ */

.card-border-wrapper {
  position: relative;
  border-radius: 1rem;
}

.card-border-wrapper::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.06),
    rgba(255, 255, 255, 0.02)
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  transition: all 0.5s ease;
}

.card-border-wrapper:hover::before {
  background: conic-gradient(
    from var(--border-angle, 0deg),
    var(--card-accent, #00f0ff) 0%,
    transparent 15%,
    transparent 45%,
    var(--card-accent, #a855f7) 50%,
    transparent 65%,
    transparent 95%,
    var(--card-accent, #00f0ff) 100%
  );
}

.card-border-glow {
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.5s ease;
  filter: blur(8px);
  z-index: -1;
}

.card-border-wrapper:hover .card-border-glow {
  opacity: 0.4;
}

/* ═══════════════════════════════════════════
   GLASS MORPHISM
   ═══════════════════════════════════════════ */

.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.glass-heavy {
  background: rgba(10, 10, 30, 0.85);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* ═══════════════════════════════════════════
   NEON TEXT GLOW
   ═══════════════════════════════════════════ */

.neon-text-cyan {
  text-shadow:
    0 0 7px rgba(0, 240, 255, 0.4),
    0 0 20px rgba(0, 240, 255, 0.2),
    0 0 40px rgba(0, 240, 255, 0.1);
}

.neon-text-purple {
  text-shadow:
    0 0 7px rgba(168, 85, 247, 0.4),
    0 0 20px rgba(168, 85, 247, 0.2);
}

/* ═══════════════════════════════════════════
   GRADIENT TEXT
   ═══════════════════════════════════════════ */

.gradient-text-hero {
  background: linear-gradient(135deg, #00f0ff 0%, #a855f7 40%, #ff0080 70%, #00f0ff 100%);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 8s ease-in-out infinite;
}

/* ═══════════════════════════════════════════
   VIGNETTE OVERLAY
   ═══════════════════════════════════════════ */

.vignette::after {
  content: '';
  position: fixed;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 50%,
    rgba(3, 0, 20, 0.5) 100%
  );
  pointer-events: none;
  z-index: 50;
}

/* ═══════════════════════════════════════════
   GRID BACKGROUND
   ═══════════════════════════════════════════ */

.grid-bg {
  background-image:
    linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

.grid-bg-dense {
  background-image:
    linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px);
  background-size: 30px 30px;
}

/* ═══════════════════════════════════════════
   CURSOR BLINK
   ═══════════════════════════════════════════ */

@keyframes cursorBlink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.animate-cursor-blink {
  animation: cursorBlink 1s step-end infinite;
}

/* ═══════════════════════════════════════════
   SELECTION STYLE
   ═══════════════════════════════════════════ */

::selection {
  background: rgba(0, 240, 255, 0.3);
  color: #fff;
}

/* ═══════════════════════════════════════════
   CATEGORY PILL ACTIVE STATE
   ═══════════════════════════════════════════ */

.category-active {
  background: rgba(0, 240, 255, 0.1);
  border-color: rgba(0, 240, 255, 0.4);
  color: #00f0ff;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.15), inset 0 0 15px rgba(0, 240, 255, 0.05);
}
src/data/agents.ts
TypeScript

// ═══════════════════════════════════════════════════════════════
// AGENT DATA STORE
// Replace with API fetch when backend is ready:
//   const res = await fetch('/api/agents');
//   const agents = await res.json();
// ═══════════════════════════════════════════════════════════════

export type AgentStatus = 'active' | 'standby' | 'development' | 'offline';

export interface Agent {
  id: string;
  name: string;
  codeName: string;
  description: string;
  category: string;
  status: AgentStatus;
  url: string;            // ← redirect link, updateable from backend
  icon: string;
  accentColor: string;
  tags: string[];
  version: string;
  uptime?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  count?: number;
}

export const categories: Category[] = [
  { id: 'all', name: 'All Agents', icon: '⚡', gradient: 'from-white/20 to-white/5' },
  { id: 'social', name: 'Social Ops', icon: '📡', gradient: 'from-pink-500/20 to-rose-500/5' },
  { id: 'communication', name: 'Comms', icon: '✉️', gradient: 'from-blue-500/20 to-cyan-500/5' },
  { id: 'data', name: 'Data & Infra', icon: '🗄️', gradient: 'from-emerald-500/20 to-green-500/5' },
  { id: 'finance', name: 'Finance', icon: '💰', gradient: 'from-amber-500/20 to-yellow-500/5' },
  { id: 'engineering', name: 'Engineering', icon: '⚙️', gradient: 'from-violet-500/20 to-purple-500/5' },
  { id: 'automation', name: 'Automation', icon: '🤖', gradient: 'from-cyan-500/20 to-teal-500/5' },
  { id: 'research', name: 'Research & Intel', icon: '🔍', gradient: 'from-indigo-500/20 to-blue-500/5' },
  { id: 'content', name: 'Content', icon: '🎨', gradient: 'from-orange-500/20 to-red-500/5' },
];

export const agents: Agent[] = [
  // ── Social Ops ──────────────────────────────────────────────
  {
    id: 'ig-farmer',
    name: 'IGFarmer',
    codeName: 'PHANTOM-IG',
    description: 'Instagram growth automation. Engagement farming, story interactions, hashtag optimization, and follower analytics engine.',
    category: 'social',
    status: 'active',
    url: 'https://igfarmer.yourdomain.com',
    icon: '📸',
    accentColor: '#E1306C',
    tags: ['instagram', 'growth', 'engagement'],
    version: 'v2.4.1',
    uptime: '99.7%',
  },
  {
    id: 'reddit-karma',
    name: 'RedditKarma',
    codeName: 'ECHO-RED',
    description: 'Reddit karma optimization engine. Subreddit analysis, timing optimization, content strategy, and viral post detection.',
    category: 'social',
    status: 'active',
    url: 'https://redditkarma.yourdomain.com',
    icon: '🔺',
    accentColor: '#FF4500',
    tags: ['reddit', 'karma', 'content'],
    version: 'v1.8.0',
    uptime: '98.2%',
  },
  {
    id: 'x-phantom',
    name: 'X-Phantom',
    codeName: 'SHADOW-X',
    description: 'X/Twitter automation suite. Thread creation, engagement tracking, audience growth, viral content analysis, and scheduling.',
    category: 'social',
    status: 'active',
    url: 'https://xphantom.yourdomain.com',
    icon: '𝕏',
    accentColor: '#1DA1F2',
    tags: ['twitter', 'threads', 'growth'],
    version: 'v3.1.2',
    uptime: '99.1%',
  },
  {
    id: 'linked-forge',
    name: 'LinkedForge',
    codeName: 'NEXUS-LI',
    description: 'LinkedIn presence amplifier. Post scheduling, connection automation, content repurposing, and analytics dashboard.',
    category: 'social',
    status: 'standby',
    url: 'https://linkedforge.yourdomain.com',
    icon: '💼',
    accentColor: '#0077B5',
    tags: ['linkedin', 'professional', 'networking'],
    version: 'v1.3.0',
  },

  // ── Communication ───────────────────────────────────────────
  {
    id: 'mailer-agent',
    name: 'MailerAgent',
    codeName: 'COURIER-01',
    description: 'Intelligent email automation. Cold outreach sequences, follow-up chains, template generation, deliverability optimization.',
    category: 'communication',
    status: 'active',
    url: 'https://maileragent.yourdomain.com',
    icon: '📧',
    accentColor: '#00B4D8',
    tags: ['email', 'outreach', 'sequences'],
    version: 'v4.2.0',
    uptime: '99.9%',
  },
  {
    id: 'slack-sentinel',
    name: 'SlackSentinel',
    codeName: 'WATCH-SL',
    description: 'Slack workspace intelligence. Message monitoring, auto-responses, channel analytics, and workflow trigger automation.',
    category: 'communication',
    status: 'development',
    url: 'https://slacksentinel.yourdomain.com',
    icon: '💬',
    accentColor: '#4A154B',
    tags: ['slack', 'monitoring', 'workflows'],
    version: 'v0.9.0',
  },

  // ── Data & Infrastructure ──────────────────────────────────
  {
    id: 'db-handles',
    name: 'DB Handles',
    codeName: 'VAULT-DB',
    description: 'Database management suite. Schema optimization, query automation, backup orchestration, migration management.',
    category: 'data',
    status: 'active',
    url: 'https://dbhandles.yourdomain.com',
    icon: '🗃️',
    accentColor: '#00C853',
    tags: ['database', 'sql', 'management'],
    version: 'v5.0.1',
    uptime: '99.99%',
  },
  {
    id: 'pipeline-forge',
    name: 'PipelineForge',
    codeName: 'STREAM-DP',
    description: 'ETL pipeline builder. Data transformation, stream processing, warehouse integration, and real-time analytics pipelines.',
    category: 'data',
    status: 'active',
    url: 'https://pipelineforge.yourdomain.com',
    icon: '🔄',
    accentColor: '#26A69A',
    tags: ['etl', 'pipeline', 'streaming'],
    version: 'v2.1.0',
    uptime: '97.5%',
  },
  {
    id: 'api-sentinel',
    name: 'APISentinel',
    codeName: 'GATE-API',
    description: 'API monitoring & management. Uptime tracking, rate limiting, documentation generation, and automated testing.',
    category: 'data',
    status: 'active',
    url: 'https://apisentinel.yourdomain.com',
    icon: '🔌',
    accentColor: '#7C4DFF',
    tags: ['api', 'monitoring', 'gateway'],
    version: 'v3.0.0',
    uptime: '99.5%',
  },

  // ── Finance ────────────────────────────────────────────────
  {
    id: 'finance-agent',
    name: 'FinanceAgent',
    codeName: 'TREASURY-01',
    description: 'Financial analytics and automation. Expense tracking, invoice generation, tax optimization, portfolio performance.',
    category: 'finance',
    status: 'active',
    url: 'https://financeagent.yourdomain.com',
    icon: '💰',
    accentColor: '#FFD700',
    tags: ['finance', 'analytics', 'tracking'],
    version: 'v2.7.0',
    uptime: '99.8%',
  },
  {
    id: 'crypto-watcher',
    name: 'CryptoWatcher',
    codeName: 'CIPHER-CW',
    description: 'Cryptocurrency monitoring. Price alerts, portfolio tracking, DeFi analytics, whale movement detection, and yield farming.',
    category: 'finance',
    status: 'standby',
    url: 'https://cryptowatcher.yourdomain.com',
    icon: '₿',
    accentColor: '#F7931A',
    tags: ['crypto', 'defi', 'trading'],
    version: 'v1.5.0',
  },
  {
    id: 'invoice-ninja',
    name: 'InvoiceNinja',
    codeName: 'BILL-IN',
    description: 'Automated invoicing and billing. Client management, recurring billing, payment tracking, and financial reporting.',
    category: 'finance',
    status: 'active',
    url: 'https://invoiceninja.yourdomain.com',
    icon: '🧾',
    accentColor: '#4CAF50',
    tags: ['invoicing', 'billing', 'payments'],
    version: 'v2.0.0',
    uptime: '99.3%',
  },

  // ── Engineering ────────────────────────────────────────────
  {
    id: 'frontend-engineer',
    name: 'FrontEnd Engineer',
    codeName: 'PIXEL-FE',
    description: 'Frontend code generation. Component scaffolding, responsive design automation, performance optimization, and UI testing.',
    category: 'engineering',
    status: 'active',
    url: 'https://feengineer.yourdomain.com',
    icon: '🎨',
    accentColor: '#61DAFB',
    tags: ['frontend', 'react', 'components'],
    version: 'v3.5.0',
    uptime: '99.0%',
  },
  {
    id: 'backend-architect',
    name: 'BackendArchitect',
    codeName: 'FORGE-BE',
    description: 'Backend architecture automation. API design, microservices scaffolding, deployment pipelines, and database schema generation.',
    category: 'engineering',
    status: 'active',
    url: 'https://backendarch.yourdomain.com',
    icon: '🏗️',
    accentColor: '#68A063',
    tags: ['backend', 'api', 'architecture'],
    version: 'v2.2.0',
    uptime: '98.8%',
  },
  {
    id: 'devops-commander',
    name: 'DevOpsCommander',
    codeName: 'DEPLOY-DC',
    description: 'DevOps automation suite. CI/CD pipelines, infrastructure as code, container orchestration, and monitoring dashboards.',
    category: 'engineering',
    status: 'development',
    url: 'https://devopscommander.yourdomain.com',
    icon: '🚀',
    accentColor: '#326CE5',
    tags: ['devops', 'docker', 'kubernetes'],
    version: 'v1.0.0-beta',
  },

  // ── Automation ─────────────────────────────────────────────
  {
    id: 'grok-automator',
    name: 'GrokAutomator',
    codeName: 'MIND-GA',
    description: 'Grok API integration hub. Prompt engineering, response optimization, multi-model orchestration, and context management.',
    category: 'automation',
    status: 'active',
    url: 'https://grokautomator.yourdomain.com',
    icon: '🧠',
    accentColor: '#00FFA3',
    tags: ['grok', 'ai', 'llm'],
    version: 'v2.0.0',
    uptime: '98.5%',
  },
  {
    id: 'workflow-engine',
    name: 'WorkflowEngine',
    codeName: 'FLOW-WE',
    description: 'Workflow automation platform. Task chaining, conditional logic, cron scheduling, multi-agent orchestration, and webhooks.',
    category: 'automation',
    status: 'active',
    url: 'https://workflowengine.yourdomain.com',
    icon: '⚡',
    accentColor: '#FF6B6B',
    tags: ['workflow', 'automation', 'scheduling'],
    version: 'v4.1.0',
    uptime: '99.4%',
  },
  {
    id: 'scraper-ghost',
    name: 'ScraperGhost',
    codeName: 'PHANTOM-SC',
    description: 'Intelligent web scraping. Anti-detection, structured data extraction, proxy rotation, rate management, and output formatting.',
    category: 'automation',
    status: 'active',
    url: 'https://scraperghost.yourdomain.com',
    icon: '👻',
    accentColor: '#B388FF',
    tags: ['scraping', 'data', 'extraction'],
    version: 'v3.0.0',
    uptime: '97.0%',
  },

  // ── Research & Intel ───────────────────────────────────────
  {
    id: 'research-owl',
    name: 'ResearchOwl',
    codeName: 'INTEL-RO',
    description: 'Research automation. Literature review, citation management, summarization, trend analysis, and knowledge graph building.',
    category: 'research',
    status: 'standby',
    url: 'https://researchowl.yourdomain.com',
    icon: '🦉',
    accentColor: '#5C6BC0',
    tags: ['research', 'analysis', 'papers'],
    version: 'v1.2.0',
  },
  {
    id: 'market-radar',
    name: 'MarketRadar',
    codeName: 'SCAN-MR',
    description: 'Market intelligence scanner. Competitor analysis, trend detection, sentiment tracking, and opportunity identification.',
    category: 'research',
    status: 'active',
    url: 'https://marketradar.yourdomain.com',
    icon: '📡',
    accentColor: '#00BCD4',
    tags: ['market', 'competitive', 'intelligence'],
    version: 'v2.3.0',
    uptime: '98.0%',
  },

  // ── Content & Creative ─────────────────────────────────────
  {
    id: 'content-forge',
    name: 'ContentForge',
    codeName: 'CREATE-CF',
    description: 'Content creation engine. Blog posts, social media content, video scripts, SEO optimization, and A/B testing copy.',
    category: 'content',
    status: 'active',
    url: 'https://contentforge.yourdomain.com',
    icon: '✍️',
    accentColor: '#FF7043',
    tags: ['content', 'writing', 'seo'],
    version: 'v3.2.0',
    uptime: '99.2%',
  },
  {
    id: 'design-pilot',
    name: 'DesignPilot',
    codeName: 'VISUAL-DP',
    description: 'AI design assistant. Image generation, brand consistency checking, asset management, and design system automation.',
    category: 'content',
    status: 'development',
    url: 'https://designpilot.yourdomain.com',
    icon: '🎭',
    accentColor: '#E040FB',
    tags: ['design', 'ai-art', 'branding'],
    version: 'v0.8.0',
  },
  {
    id: 'seo-sniper',
    name: 'SEOSniper',
    codeName: 'RANK-SS',
    description: 'SEO optimization engine. Keyword research, backlink analysis, SERP tracking, on-page optimization, and schema markup.',
    category: 'content',
    status: 'active',
    url: 'https://seosniper.yourdomain.com',
    icon: '🎯',
    accentColor: '#66BB6A',
    tags: ['seo', 'ranking', 'keywords'],
    version: 'v2.5.0',
    uptime: '99.0%',
  },
];

export const getAgentsByCategory = (categoryId: string): Agent[] =>
  categoryId === 'all' ? agents : agents.filter((a) => a.category === categoryId);

export const getActiveCount = (): number =>
  agents.filter((a) => a.status === 'active').length;

export const getCategoryCount = (categoryId: string): number =>
  categoryId === 'all' ? agents.length : agents.filter((a) => a.category === categoryId).length;
src/components/ParticleField.tsx
React

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

const COLORS = ['#00f0ff', '#a855f7', '#ff0080', '#00ff88', '#3b82f6'];
const CONNECTION_DIST = 130;
const MOUSE_RADIUS = 180;

const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef<number>(0);

  const createParticles = useCallback((w: number, h: number) => {
    const count = Math.min(Math.floor((w * h) / 18000), 80);
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.8 + 0.6,
      opacity: Math.random() * 0.5 + 0.15,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width: w, height: h } = canvas;
    ctx.clearRect(0, 0, w, h);

    const pts = particles.current;
    const m = mouse.current;

    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];

      // Mouse repulsion
      const dx = m.x - p.x;
      const dy = m.y - p.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < MOUSE_RADIUS && d > 0) {
        const force = (MOUSE_RADIUS - d) / MOUSE_RADIUS;
        p.vx -= (dx / d) * force * 0.015;
        p.vy -= (dy / d) * force * 0.015;
      }

      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.995;
      p.vy *= 0.995;

      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();

      // Connections
      for (let j = i + 1; j < pts.length; j++) {
        const o = pts[j];
        const cx = p.x - o.x;
        const cy = p.y - o.y;
        const cd = Math.sqrt(cx * cx + cy * cy);
        if (cd < CONNECTION_DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(o.x, o.y);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = (1 - cd / CONNECTION_DIST) * 0.12;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    raf.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles(canvas.width, canvas.height);
    };

    const onMouse = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse);
    raf.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(raf.current);
    };
  }, [createParticles, draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticleField;
src/components/HeroSection.tsx
React

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState, useMemo } from 'react';
import { agents } from '../data/agents';

/* ── Animated Counter ── */
const useCounter = (target: number, duration = 2000, delay = 500) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const steps = 60;
      const interval = duration / steps;
      let step = 0;
      const timer = setInterval(() => {
        step++;
        setCount(Math.round((step / steps) * target));
        if (step >= steps) clearInterval(timer);
      }, interval);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);
  return count;
};

/* ── Orbital Rings 3D Visual ── */
const OrbitalRings: React.FC = () => {
  const rings = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      rotateX: 70,
      rotateY: i * 36,
      duration: 12 + i * 4,
      color: ['#00f0ff', '#a855f7', '#ff0080', '#00ff88', '#3b82f6'][i],
      reverse: i % 2 === 1,
      size: 160 + i * 10,
    })), []
  );

  return (
    <div className="relative" style={{ width: 200, height: 200, perspective: 800 }}>
      {rings.map((ring) => (
        <div
          key={ring.id}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `rotateY(${ring.rotateY}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <div style={{ transform: `rotateX(${ring.rotateX}deg)`, transformStyle: 'preserve-3d' }}>
            <motion.div
              className="rounded-full"
              style={{
                width: ring.size,
                height: ring.size,
                border: `1px solid ${ring.color}`,
                opacity: 0.25,
                boxShadow: `0 0 15px ${ring.color}20`,
              }}
              animate={{ rotateZ: ring.reverse ? -360 : 360 }}
              transition={{ duration: ring.duration, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>
      ))}
      {/* Core glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="rounded-full"
          style={{
            width: 24,
            height: 24,
            background: 'radial-gradient(circle, #00f0ff, #a855f7)',
            boxShadow: '0 0 40px #00f0ff60, 0 0 80px #a855f740',
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full bg-white"
          style={{ width: 6, height: 6 }}
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  );
};

/* ── Floating Dust Particles ── */
const FloatingDust: React.FC = () => {
  const dots = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        color: ['#00f0ff', '#a855f7', '#ff0080', '#00ff88'][i % 4],
        duration: 4 + Math.random() * 6,
        delay: Math.random() * 5,
        size: Math.random() * 3 + 1,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
            filter: 'blur(0.5px)',
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

/* ── Typing Text ── */
const TypingText: React.FC<{ text: string; delay?: number; className?: string }> = ({
  text,
  delay = 0,
  className = '',
}) => (
  <span className={className}>
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + i * 0.03, duration: 0.05 }}
      >
        {char}
      </motion.span>
    ))}
    <motion.span
      className="animate-cursor-blink ml-0.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay + text.length * 0.03 + 0.5 }}
    >
      _
    </motion.span>
  </span>
);

/* ═══════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════ */

const HeroSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.85]);

  const totalAgents = useCounter(agents.length, 2000, 800);
  const activeAgents = useCounter(agents.filter((a) => a.status === 'active').length, 2000, 1000);
  const categoryCount = useCounter(8, 1500, 1200);

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ y, opacity, scale }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg" />

      {/* Radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_600px_at_50%_40%,_rgba(0,240,255,0.06)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_50%_50%,_rgba(168,85,247,0.04)_0%,_transparent_70%)]" />

      <FloatingDust />

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* System status badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.2, duration: 1 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass mb-10"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-neon-green" />
          </span>
          <span className="text-xs font-mono tracking-[0.15em] text-neon-green/80 uppercase">
            System Online — All Sectors Operational
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.5, duration: 1.2, type: 'spring', stiffness: 80 }}
          className="glitch-wrapper relative mb-4"
        >
          <h1
            className="gradient-text-hero font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none"
          >
            AGENTIC
          </h1>
          <h1
            className="gradient-text-hero font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none"
            style={{ animationDirection: 'reverse', animationDelay: '-4s' }}
          >
            ARMY
          </h1>
          {/* Glitch clones */}
          <div className="glitch-clone font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none" aria-hidden>
            AGENTIC<br />ARMY
          </div>
          <div className="glitch-clone font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none" aria-hidden>
            AGENTIC<br />ARMY
          </div>
        </motion.div>

        {/* Orb visual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="flex justify-center my-8"
        >
          <OrbitalRings />
        </motion.div>

        {/* Subtitle with typing effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-mono tracking-wide mb-12"
        >
          <TypingText
            text="deploy > one_person  |  infinite_agents  |  unlimited_power"
            delay={1.5}
          />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="flex items-center justify-center gap-8 sm:gap-12 md:gap-20"
        >
          {[
            { label: 'Total Agents', value: totalAgents, color: '#00f0ff' },
            { label: 'Active Now', value: activeAgents, color: '#00ff88' },
            { label: 'Categories', value: categoryCount, color: '#a855f7' },
          ].map((stat) => (
            <div key={stat.label} className="text-center group">
              <motion.div
                className="text-4xl sm:text-5xl md:text-6xl font-black font-display"
                style={{ color: stat.color, textShadow: `0 0 30px ${stat.color}30` }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-500 mt-2 font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-[10px] font-mono text-gray-600 tracking-[0.3em] uppercase">
              Scroll to Deploy
            </span>
            <div className="w-5 h-9 rounded-full border border-gray-700/50 flex justify-center pt-2">
              <motion.div
                className="w-1 h-2.5 rounded-full bg-neon-cyan/60"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
src/components/AgentCard.tsx
React

import { motion } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { ExternalLink, Settings } from 'lucide-react';
import type { Agent, AgentStatus } from '../data/agents';

const STATUS_CONFIG: Record<AgentStatus, { color: string; label: string; bg: string; animation: string }> = {
  active: { color: '#00ff88', label: 'ACTIVE', bg: 'rgba(0,255,136,0.08)', animation: 'status-active' },
  standby: { color: '#fbbf24', label: 'STANDBY', bg: 'rgba(251,191,36,0.08)', animation: 'status-standby' },
  development: { color: '#60a5fa', label: 'IN DEV', bg: 'rgba(96,165,250,0.08)', animation: 'status-development' },
  offline: { color: '#ef4444', label: 'OFFLINE', bg: 'rgba(239,68,68,0.08)', animation: '' },
};

interface AgentCardProps {
  agent: Agent;
  index: number;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    // 3D tilt via CSS
    el.style.transform = `perspective(800px) rotateX(${((y - cy) / cy) * -6}deg) rotateY(${((x - cx) / cx) * 6}deg) scale3d(1.02,1.02,1.02)`;

    // Spotlight position
    const spotlight = el.querySelector<HTMLDivElement>('.spotlight');
    if (spotlight) {
      spotlight.style.background = `radial-gradient(circle 280px at ${x}px ${y}px, ${agent.accentColor}18, transparent 70%)`;
    }

    // Border glow position
    const borderGlow = el.querySelector<HTMLDivElement>('.border-glow-inner');
    if (borderGlow) {
      borderGlow.style.background = `radial-gradient(circle 300px at ${x}px ${y}px, ${agent.accentColor}30, transparent 70%)`;
    }
  }, [agent.accentColor]);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (el) {
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      const spotlight = el.querySelector<HTMLDivElement>('.spotlight');
      if (spotlight) spotlight.style.background = 'transparent';
      const borderGlow = el.querySelector<HTMLDivElement>('.border-glow-inner');
      if (borderGlow) borderGlow.style.background = 'transparent';
    }
    setIsHovered(false);
  }, []);

  const status = STATUS_CONFIG[agent.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        delay: index * 0.06,
        duration: 0.7,
        type: 'spring',
        stiffness: 90,
        damping: 18,
      }}
    >
      <div
        ref={cardRef}
        className="relative group cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => window.open(agent.url, '_blank', 'noopener')}
        style={{
          transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          willChange: 'transform',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ── Animated rotating border ── */}
        <div className="absolute -inset-[1px] rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div
            className="absolute animate-border-spin"
            style={{
              inset: '-80%',
              background: `conic-gradient(from 0deg, transparent 0%, ${agent.accentColor}50 8%, transparent 16%, transparent 50%, ${agent.accentColor}30 58%, transparent 66%)`,
            }}
          />
        </div>

        {/* ── Border glow (follows cursor) ── */}
        <div className="absolute -inset-[1px] rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="border-glow-inner absolute inset-0 transition-[background] duration-75" />
        </div>

        {/* ── Card body ── */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(12,12,35,0.95) 0%, rgba(8,8,25,0.98) 100%)',
            border: `1px solid rgba(255,255,255,${isHovered ? '0.1' : '0.04'})`,
            transition: 'border-color 0.4s ease',
          }}
        >
          {/* Spotlight (follows cursor) */}
          <div className="spotlight absolute inset-0 rounded-2xl pointer-events-none transition-[background] duration-75" />

          {/* Scan line */}
          {isHovered && (
            <div
              className="absolute left-0 right-0 h-px pointer-events-none animate-scan"
              style={{ background: `linear-gradient(90deg, transparent 5%, ${agent.accentColor}30 50%, transparent 95%)` }}
            />
          )}

          {/* Content */}
          <div className="relative z-10 p-5 sm:p-6">
            {/* Top row */}
            <div className="flex items-start justify-between mb-5">
              <motion.span
                className="text-3xl sm:text-4xl block"
                animate={isHovered ? { scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.5 }}
                style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}
              >
                {agent.icon}
              </motion.span>

              <div className="flex items-center gap-2">
                {/* Settings button (placeholder for backend admin) */}
                <motion.button
                  className="p-1.5 rounded-lg opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity"
                  style={{ color: agent.accentColor }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Open admin panel for this agent
                    console.log(`Configure ${agent.id}`);
                  }}
                  title="Configure Agent"
                >
                  <Settings size={14} />
                </motion.button>

                {/* Status badge */}
                <div className="flex items-center gap-1.5">
                  <span
                    className="text-[9px] font-mono font-semibold tracking-[0.15em] px-2 py-0.5 rounded-full"
                    style={{
                      background: status.bg,
                      color: status.color,
                      border: `1px solid ${status.color}20`,
                    }}
                  >
                    {status.label}
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full ${status.animation}`}
                    style={{ backgroundColor: status.color, boxShadow: `0 0 8px ${status.color}` }}
                  />
                </div>
              </div>
            </div>

            {/* Name */}
            <h3
              className="text-lg sm:text-xl font-bold tracking-tight mb-1 transition-colors duration-300"
              style={{
                color: isHovered ? agent.accentColor : '#ffffff',
                textShadow: isHovered ? `0 0 25px ${agent.accentColor}35` : 'none',
              }}
            >
              {agent.name}
            </h3>

            {/* Codename */}
            <p
              className="text-[10px] font-mono tracking-[0.2em] mb-3"
              style={{ color: `${agent.accentColor}60` }}
            >
              [{agent.codeName}]
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-400/80 leading-relaxed mb-4 line-clamp-2">
              {agent.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {agent.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] text-gray-500 border border-white/[0.04] hover:border-white/[0.1] transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-600 uppercase font-mono tracking-widest">VERSION</span>
                <span className="text-[10px] text-gray-400 font-mono">{agent.version}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[9px] text-gray-600 uppercase font-mono tracking-widest">UPTIME</span>
                <span className="text-[10px] text-neon-green/60 font-mono">{agent.uptime || '99.9%'}</span>
              </div>
            </div>

            <motion.div
              className="mt-5 w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold tracking-widest transition-all duration-300"
              style={{
                background: isHovered ? agent.accentColor : 'rgba(255,255,255,0.03)',
                color: isHovered ? '#000' : `${agent.accentColor}dd`,
                border: isHovered ? 'none' : `1px solid ${agent.accentColor}30`,
              }}
              whileTap={{ scale: 0.98 }}
            >
              LAUNCH AGENT
              <ExternalLink size={12} strokeWidth={3} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AgentCard;
src/components/CategoryFilter.tsx
React

import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '../data/agents';

interface CategoryFilterProps {
  activeCategory: string;
  setActiveCategory: (id: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-12 px-4">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setActiveCategory(cat.id)}
          className={`relative px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
            activeCategory === cat.id
              ? 'text-white'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <span className="relative z-10 flex items-center gap-2">
            <span>{cat.icon}</span>
            {cat.name}
          </span>
          {activeCategory === cat.id && (
            <motion.div
              layoutId="category-bg"
              className="absolute inset-0 rounded-full glass border border-white/10"
              style={{
                boxShadow: `0 0 20px ${activeCategory === 'all' ? '#00f0ff' : 'rgba(255,255,255,0.1)'}10`,
              }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
src/components/AgentGrid.tsx
React

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AgentCard from './AgentCard';
import type { Agent } from '../data/agents';

interface AgentGridProps {
  agents: Agent[];
}

const AgentGrid: React.FC<AgentGridProps> = ({ agents }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 pb-20 max-w-7xl mx-auto">
      <AnimatePresence mode="popLayout">
        {agents.map((agent, index) => (
          <AgentCard key={agent.id} agent={agent} index={index} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AgentGrid;
src/components/Navbar.tsx
React

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, LayoutGrid, Activity, Search } from 'lucide-react';

const Navbar: React.FC<{ onSearchRequest: () => void }> = ({ onSearchRequest }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled ? 'py-4' : 'py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative group">
          {/* Main Bar */}
          <div className={`relative z-10 flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
            scrolled ? 'glass-heavy border-white/10 shadow-2xl' : 'bg-transparent border-transparent'
          }`}>
            <div className="flex items-center gap-8">
              {/* Logo */}
              <div className="flex items-center gap-3 cursor-pointer group/logo">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <div className="absolute inset-0 bg-neon-cyan opacity-20 rounded-lg group-hover/logo:scale-125 transition-transform duration-500 blur-md" />
                  <LayoutGrid className="relative z-10 text-neon-cyan" size={20} />
                </div>
                <span className="font-display font-black tracking-tighter text-xl hidden sm:block">
                  <span className="text-white">AGENTIC</span>
                  <span className="text-neon-cyan">ARMY</span>
                </span>
              </div>

              {/* Status HUD */}
              <div className="hidden md:flex items-center gap-6 px-6 py-1.5 rounded-full border border-white/5 bg-white/5">
                <div className="flex items-center gap-2">
                  <Activity size={12} className="text-neon-green animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">SYS_STABLE: 99.8%</span>
                </div>
                <div className="w-px h-3 bg-white/10" />
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_8px_#00f0ff]" />
                  <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">NODES: 21_UP</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 text-[10px] font-mono text-gray-500">
                <Command size={10} />
                <span>K TO SEARCH</span>
              </div>
              
              <button 
                onClick={onSearchRequest}
                className="p-2 rounded-xl glass hover:border-white/20 transition-colors group/btn"
              >
                <Search size={18} className="text-gray-400 group-hover/btn:text-neon-cyan" />
              </button>
            </div>
          </div>
          
          {/* Holographic underline effect */}
          <AnimatePresence>
            {scrolled && (
              <motion.div 
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                className="absolute -bottom-[1px] left-10 right-10 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent z-20"
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
src/components/Footer.tsx
React

import React from 'react';
import { Github, Twitter, Linkedin, Terminal } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 py-12 border-t border-white/5 bg-void">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <Terminal size={18} className="text-neon-cyan" />
              <span className="font-display font-bold tracking-tight text-white">AGENTIC ARMY <span className="text-[10px] text-gray-600 font-mono ml-2">v1.2.0</span></span>
            </div>
            <p className="text-sm text-gray-500 text-center md:text-left max-w-xs">
              Next-generation agentic dashboard for the 1% product builder. 
              Engineered for autonomy, scale, and performance.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="p-3 rounded-xl glass hover:border-white/20 hover:text-neon-cyan transition-all duration-300"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            &copy; 2024 SYSTEM_CORE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            {['TERMINAL', 'PROTOCOLS', 'SECURITY'].map(item => (
              <a key={item} href="#" className="text-[10px] font-mono text-gray-600 hover:text-neon-cyan transition-colors uppercase tracking-widest">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
src/components/CommandPalette.tsx
React

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, X } from 'lucide-react';
import { agents } from '../data/agents';

const CommandPalette: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filtered = agents.filter(a => 
    a.name.toLowerCase().includes(query.toLowerCase()) || 
    a.category.toLowerCase().includes(query.toLowerCase()) ||
    a.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 6);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-void/80 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] w-full max-w-2xl px-4"
          >
            <div className="glass-heavy rounded-2xl border border-white/10 shadow-3xl overflow-hidden">
              <div className="relative flex items-center px-6 py-4 border-b border-white/5">
                <Search className="text-neon-cyan mr-4" size={20} />
                <input
                  autoFocus
                  className="bg-transparent border-none outline-none text-white text-lg w-full placeholder:text-gray-600 font-sans"
                  placeholder="Execute search protocol..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-gray-500 font-mono">
                  ESC
                </div>
              </div>

              <div className="p-4">
                <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-4 px-2">
                  Top Results
                </div>
                
                <div className="space-y-2">
                  {filtered.map((agent) => (
                    <div
                      key={agent.id}
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => {
                        window.open(agent.url, '_blank');
                        onClose();
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-white/5" style={{ color: agent.accentColor }}>
                          {agent.icon}
                        </div>
                        <div>
                          <div className="text-white font-bold group-hover:text-neon-cyan transition-colors">{agent.name}</div>
                          <div className="text-xs text-gray-500 font-mono uppercase tracking-tighter">{agent.category}</div>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Command size={14} className="text-gray-600" />
                      </div>
                    </div>
                  ))}
                  
                  {filtered.length === 0 && (
                    <div className="py-8 text-center text-gray-600 font-mono text-xs">
                      NO DEPLOYED AGENTS MATCH YOUR QUERY
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 py-3 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-[10px] text-gray-500">
                    <span className="p-1 rounded bg-white/5 border border-white/10">↑↓</span> to navigate
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500">
                    <span className="p-1 rounded bg-white/5 border border-white/10">↵</span> to launch
                  </div>
                </div>
                <div className="text-[10px] text-gray-600 font-mono">
                  AGENTIC_SHELL v1.2
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
src/App.tsx
React

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { agents } from './data/agents';
import ParticleField from './components/ParticleField';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import CategoryFilter from './components/CategoryFilter';
import AgentGrid from './components/AgentGrid';
import CommandPalette from './components/CommandPalette';
import Footer from './components/Footer';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => 
      activeCategory === 'all' || agent.category === activeCategory
    );
  }, [activeCategory]);

  return (
    <div className="relative min-h-screen bg-void text-gray-300 selection:bg-neon-cyan/30 selection:text-white overflow-x-hidden">
      {/* Background visual engine */}
      <ParticleField />
      
      {/* Global Navigation */}
      <Navbar onSearchRequest={() => setIsCommandPaletteOpen(true)} />

      <main className="relative z-10">
        <HeroSection />
        
        <div id="fleet" className="pt-24 pb-32 min-h-screen">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white mb-6"
              >
                THE <span className="text-neon-cyan neon-text-cyan">COMMAND</span> CENTER
              </motion.h2>
              <div className="h-1 w-24 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full mb-12 shadow-[0_0_15px_rgba(0,240,255,0.5)]" />
              
              <CategoryFilter 
                activeCategory={activeCategory} 
                setActiveCategory={setActiveCategory} 
              />
            </div>

            <AgentGrid agents={filteredAgents} />
          </div>
        </div>
      </main>

      <Footer />
      
      {/* HUD Elements */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />
      
      {/* Scanline / Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] grid-bg-dense" />
      <div className="fixed inset-0 pointer-events-none z-[101] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
      <div className="vignette" />
    </div>
  );
}

export default App;

---

### Project Finalization & Next Steps

This completes the **Agentic Army** frontend architecture. The design system is fully implemented using:
- **Framer Motion** for physics-based interactions and scroll effects.
- **Canvas API** for the performant particle network background.
- **Glassmorphism & Neon Aesthetics** for the futuristic Sci-Fi look.
- **Responsive Grid** that adapts to all screen sizes.

To deploy this project to production:
1. Initialize the project with `npm install`.
2. Run `npm run dev` to preview the interface.
3. For deployment, connect this repository to **Vercel** or **Railway**.
4. To update agent URLs dynamically, replace `src/data/agents.ts` with a fetch call to your backend API.

**The mission is complete. Your Agentic Army is ready for deployment.**
