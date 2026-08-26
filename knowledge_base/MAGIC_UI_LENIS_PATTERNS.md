# 🧠 AGENT TRAINING MODULE 1: MAGIC UI & LENIS ARCHITECTURAL PATTERNS

## 1. Magic UI Component Standards
- **Border Beam**: High-speed conic-gradient border sweep with `z-index` layering.
- **Glassmorphic Bento Grid**: Multi-column responsive layout with frosted backdrop blur (`blur(24px)`), translucent border (`rgba(255,255,255,0.12)`), and deep inset shadows.
- **Shimmer Buttons**: Dynamic background sweep animation (`linear-gradient(110deg, #000 45%, #1e293b 55%, #000)`) with smooth hover scales.
- **Marquee & Live Telemetry**: Infinite horizontal flow ticker for active nodes and security logs.

## 2. Lenis Momentum Physics (L-E-N-I-S)
- Global 60FPS inertial momentum scrolling.
- Smooth cubic easing: `Math.min(1, 1.001 - Math.pow(2, -10 * t))`.
- Zero jitter on mobile and desktop viewports.

## 3. GSAP Motion & Spring Cursor
- Responsive mouse coordinate tracking: `(clientX / innerWidth - 0.5) * 2`.
- Elastic spring lerping (`pos += (target - pos) * 0.05`) for Three.js camera and WebGL meshes.
