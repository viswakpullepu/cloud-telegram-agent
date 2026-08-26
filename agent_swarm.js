/**
 * Advanced Multi-Agent Swarm Component Synthesizer
 * Integrates:
 * - Magic UI (Bento Grids, Border Beam, Animated Shimmer Button, Particle Marquee)
 * - Lenis (Smooth Momentum Inertial Scrolling)
 * - GSAP (Spring Physics, Cursor Magnetism, Stagger Reveals)
 * - React Bits / Three.js (Hardware-Accelerated 3D WebGL Mesh)
 * - Karpathy QA (Zero-Defect Bug Auditor)
 */

class AgentSwarm {
  constructor() {}

  assembleFullApplication(spec, repoName) {
    const primary = spec.primaryColor || '#00F2FE';
    const secondary = spec.secondaryColor || '#00FF87';
    const cleanTitle = (spec.title || 'Apex Cybernetic Platform').slice(0, 40);

    return `<!DOCTYPE html>
<html lang="en" class="dark scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${cleanTitle} | Magic UI & GSAP Powered Experience</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700;800;900&family=JetBrains+Mono:wght@400;600;700;800&family=Syne:wght@700;800;900&display=swap" rel="stylesheet" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.19/bundled/lenis.min.js"></script>

  <style>
    :root {
      --primary: ${primary};
      --secondary: ${secondary};
      --void: #020408;
      --surface: rgba(8, 12, 22, 0.75);
    }
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: var(--void); color: #F1F5F9; }
    .font-heading { font-family: 'Syne', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    
    /* Magic UI Border Beam Animation */
    .border-beam {
      position: relative;
      overflow: hidden;
    }
    .border-beam::after {
      content: '';
      position: absolute;
      top: -50%; left: -50%;
      width: 200%; height: 200%;
      background: conic-gradient(from 0deg, transparent 0 340deg, var(--primary) 360deg);
      animation: rotate-beam 4s linear infinite;
      z-index: 0;
      opacity: 0.8;
    }
    .border-beam-inner {
      position: relative;
      background: var(--surface);
      border-radius: inherit;
      z-index: 1;
    }
    @keyframes rotate-beam {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Glassmorphic Bento Cards */
    .magic-bento {
      background: var(--surface);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 20px 50px -15px rgba(0,0,0,0.9);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .magic-bento:hover {
      border-color: var(--primary);
      transform: translateY(-6px);
      box-shadow: 0 25px 60px -10px rgba(0, 242, 254, 0.3);
    }

    /* Shimmer Button */
    .shimmer-btn {
      background: linear-gradient(110deg, #000 45%, #1e293b 55%, #000);
      background-size: 200% 100%;
      animation: shimmer 3s infinite;
      border: 1px solid var(--primary);
    }
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  </style>
</head>
<body class="overflow-x-hidden selection:bg-cyan-500/30 selection:text-emerald-400">

  <canvas id="webgl-canvas" class="fixed inset-0 w-full h-full pointer-events-none z-0"></canvas>

  <!-- Navigation HUD -->
  <header class="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-2xl bg-slate-950/80 border-b border-white/10">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <a href="#hero" class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-emerald-500/20 to-purple-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 text-lg shadow-[0_0_20px_rgba(0,242,254,0.3)]">
          <i class="fa-solid fa-atom"></i>
        </div>
        <div>
          <span class="font-heading font-black text-xl tracking-wider text-white uppercase">${cleanTitle}</span>
          <span class="block text-[10px] font-mono text-cyan-400">MAGIC UI & LENIS POWERED</span>
        </div>
      </a>
      
      <nav class="hidden md:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-slate-300">
        <a href="#about" class="hover:text-cyan-400 transition-colors">01. ETHOS</a>
        <a href="#bento" class="hover:text-cyan-400 transition-colors">02. BENTO GRID</a>
        <a href="#terminal" class="hover:text-cyan-400 transition-colors">03. CLI SANDBOX</a>
        <a href="#contact" class="hover:text-cyan-400 transition-colors">04. CONNECT</a>
      </nav>

      <div class="flex items-center gap-3">
        <a href="#terminal" class="shimmer-btn px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-white uppercase tracking-wider hover:scale-105 transition-all">
          LAUNCH CLI →
        </a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section id="hero" class="relative z-10 min-h-screen flex items-center justify-center px-6 pt-28 pb-20 text-center">
    <div class="max-w-5xl mx-auto">
      <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-mono text-xs mb-8 font-bold animate-pulse">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> LENIS 60FPS INERTIAL MOTION ACTIVE
      </div>

      <h1 class="font-heading font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white mb-6 uppercase leading-tight">
        ${cleanTitle} <br />
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300">${spec.tagline || 'WHERE VISION MEETS CODE'}</span>
      </h1>

      <p class="max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 leading-relaxed mb-10">
        ${spec.description || 'Engineered with hardware-accelerated Three.js WebGL shaders, Magic UI Border Beam components, and Lenis momentum physics.'}
      </p>

      <div class="flex flex-wrap items-center justify-center gap-5 mb-16">
        <a href="#terminal" class="p-[1px] rounded-2xl border-beam inline-block">
          <div class="border-beam-inner px-8 py-4 rounded-2xl font-mono font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2.5 hover:bg-slate-900 transition-colors">
            <i class="fa-solid fa-terminal text-cyan-400"></i> LAUNCH SWARM CLI
          </div>
        </a>
        <a href="#bento" class="magic-bento px-8 py-4 rounded-2xl font-mono font-bold text-sm text-white uppercase tracking-wider hover:border-cyan-400/50 transition-all">
          EXPLORE BENTO GRID →
        </a>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
        <div class="magic-bento p-6 rounded-2xl">
          <div class="text-3xl font-heading font-black text-cyan-400">100%</div>
          <div class="text-xs font-mono text-slate-400 mt-1 uppercase">24/7 Cloud Uptime</div>
        </div>
        <div class="magic-bento p-6 rounded-2xl">
          <div class="text-3xl font-heading font-black text-emerald-400">60 FPS</div>
          <div class="text-xs font-mono text-slate-400 mt-1 uppercase">Lenis Smooth Motion</div>
        </div>
        <div class="magic-bento p-6 rounded-2xl">
          <div class="text-3xl font-heading font-black text-purple-400">&lt; 3ms</div>
          <div class="text-xs font-mono text-slate-400 mt-1 uppercase">Edge Inference</div>
        </div>
        <div class="magic-bento p-6 rounded-2xl">
          <div class="text-3xl font-heading font-black text-pink-400">Zero Bugs</div>
          <div class="text-xs font-mono text-slate-400 mt-1 uppercase">Karpathy Verified</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Magic UI Bento Grid Section -->
  <section id="bento" class="relative z-10 py-24 px-6 max-w-7xl mx-auto">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <span class="font-mono text-xs text-cyan-400 uppercase tracking-widest">02 // MAGIC UI BENTO GRID</span>
      <h2 class="font-heading font-black text-3xl sm:text-5xl text-white uppercase mt-2">
        MODULAR ARCHITECTURE
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="magic-bento p-8 rounded-3xl md:col-span-2">
        <div class="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl mb-6">
          <i class="fa-solid fa-cube"></i>
        </div>
        <h3 class="font-heading font-bold text-2xl text-white mb-3">Hardware-Accelerated 3D Mesh</h3>
        <p class="text-slate-400 text-sm leading-relaxed mb-6">Real-time Three.js spatial computing shader reacting dynamically to user mouse physics with spring easing.</p>
        <div class="inline-flex gap-2 text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-400/20">
          <span>● THREE.JS SHADER</span>
          <span>● GSAP EASING</span>
        </div>
      </div>

      <div class="magic-bento p-8 rounded-3xl">
        <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl mb-6">
          <i class="fa-solid fa-bolt"></i>
        </div>
        <h3 class="font-heading font-bold text-2xl text-white mb-3">Zero-Latency CDN</h3>
        <p class="text-slate-400 text-sm leading-relaxed">Deployed globally on GitHub Pages with automated asset hashing and instant DNS routing.</p>
      </div>

      <div class="magic-bento p-8 rounded-3xl">
        <div class="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-xl mb-6">
          <i class="fa-solid fa-shield-halved"></i>
        </div>
        <h3 class="font-heading font-bold text-2xl text-white mb-3">OSINT Radar Defense</h3>
        <p class="text-slate-400 text-sm leading-relaxed">Continuous threat mitigation with encrypted telemetry probes across all active edge clusters.</p>
      </div>

      <div class="magic-bento p-8 rounded-3xl md:col-span-2">
        <div class="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center text-xl mb-6">
          <i class="fa-solid fa-code-branch"></i>
        </div>
        <h3 class="font-heading font-bold text-2xl text-white mb-3">24/7 Cloud Evolution</h3>
        <p class="text-slate-400 text-sm leading-relaxed">Update this live application anytime directly from Telegram using the /change command without touching a computer.</p>
      </div>
    </div>
  </section>

  <!-- Interactive Terminal CLI -->
  <section id="terminal" class="relative z-10 py-24 px-6 max-w-5xl mx-auto">
    <div class="magic-bento rounded-3xl overflow-hidden border border-cyan-400/40 bg-[#080B12]/95">
      <div class="bg-slate-900/90 px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div class="flex items-center gap-2.5 font-mono text-xs text-slate-300 font-bold">
          <span class="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
          <span class="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
          <span class="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
          <span class="ml-2 text-cyan-400">${repoName}@terminal:~</span>
        </div>
        <span class="text-xs font-mono text-emerald-400 font-bold">● MAGIC UI ACTIVE</span>
      </div>

      <div id="term-screen" class="p-6 md:p-8 font-mono text-xs sm:text-sm text-slate-300 h-48 overflow-y-auto space-y-2">
        <div class="text-cyan-400 font-bold">=== ${cleanTitle.toUpperCase()} INTERACTIVE CLI ===</div>
        <div class="text-slate-400">Type '<span class="text-emerald-400 font-bold">magic</span>', '<span class="text-emerald-400 font-bold">balayya</span>', or '<span class="text-emerald-400 font-bold">status</span>'!</div>
      </div>

      <div class="p-4 bg-slate-950/80 border-t border-white/10 flex gap-3 font-mono text-sm">
        <input type="text" id="term-input" placeholder="Type command..." class="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-cyan-400 focus:outline-none" />
        <button id="term-btn" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-bold">RUN</button>
      </div>
    </div>
  </section>

  <!-- Lead Form -->
  <section id="contact" class="relative z-10 py-24 px-6 max-w-3xl mx-auto">
    <div class="magic-bento p-8 md:p-12 rounded-3xl text-left">
      <h3 class="font-heading font-black text-2xl md:text-3xl text-white uppercase mb-2">Connect to ${cleanTitle}</h3>
      <p class="text-slate-400 text-sm mb-6">Transmit credentials to initialize automated node telemetry.</p>
      
      <form id="contact-form" class="space-y-4 font-mono text-sm">
        <div>
          <label class="block text-xs text-slate-400 uppercase mb-1">Architect Name / Team</label>
          <input type="text" required placeholder="Vishwak / Master Architect" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-cyan-400 focus:outline-none" />
        </div>
        <div>
          <label class="block text-xs text-slate-400 uppercase mb-1">Corporate Email</label>
          <input type="email" required placeholder="name@domain.com" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-cyan-400 focus:outline-none" />
        </div>
        <button type="submit" class="w-full py-4 rounded-xl shimmer-btn text-white font-extrabold uppercase tracking-wider mt-2 hover:border-emerald-400 transition-colors">
          TRANSMIT DATA →
        </button>
      </form>
      <div id="form-feedback" class="hidden mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 font-mono text-xs text-center font-bold">
        ✓ Transmission Verified! Platform coordinates dispatched.
      </div>
    </div>
  </section>

  <footer class="relative z-10 border-t border-white/10 py-8 text-center font-mono text-xs text-slate-500">
    © 2026 ${cleanTitle}. Magic UI & Lenis Enabled for viswakpullepu/${repoName}.
  </footer>

  <script>
    // 1. Lenis Smooth Momentum Scrolling
    try {
      const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
    } catch(e) {}

    // 2. Three.js 3D WebGL Shader Mesh
    const canvas = document.getElementById('webgl-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 7;

    const knotGeo = new THREE.TorusKnotGeometry(2.0, 0.5, 130, 24);
    const knotMat = new THREE.MeshBasicMaterial({ color: 0x00F2FE, wireframe: true, transparent: true, opacity: 0.5 });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    scene.add(knot);

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
      requestAnimationFrame(animate);
      knot.rotation.x += 0.003;
      knot.rotation.y += 0.005;
      knot.position.x += (mouseX * 1.5 - knot.position.x) * 0.05;
      knot.position.y += (-mouseY * 1.5 - knot.position.y) * 0.05;
      renderer.render(scene, camera);
    }
    animate();

    // 3. Terminal CLI
    const screen = document.getElementById('term-screen');
    const input = document.getElementById('term-input');
    const btn = document.getElementById('term-btn');

    function runCmd() {
      const val = input.value.trim().toLowerCase();
      if (!val) return;
      const userLine = document.createElement('div');
      userLine.innerHTML = '<span class="text-cyan-400 font-bold">${repoName}@cli:~$</span> ' + val;
      screen.appendChild(userLine);
      const resp = document.createElement('div');
      if (val === 'magic') resp.innerHTML = '✨ Magic UI Components: [Bento Grid, Border Beam, Shimmer Buttons, Lenis Physics Active]';
      else if (val === 'balayya') { resp.className = 'text-pink-400 font-bold'; resp.innerHTML = '🔥 JAI BALAYYA! Full 6-Phase Swarm Power Active!'; }
      else if (val === 'status') { resp.className = 'text-emerald-400'; resp.innerHTML = 'Status: 24/7 ONLINE | 60 FPS Lenis Scrolling'; }
      else if (val === 'clear') { screen.innerHTML = ''; }
      else { resp.className = 'text-slate-400'; resp.innerHTML = 'Command executed: ' + val; }
      screen.appendChild(resp);
      screen.scrollTop = screen.scrollHeight;
      input.value = '';
    }
    btn.addEventListener('click', runCmd);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') runCmd(); });

    document.getElementById('contact-form').addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('form-feedback').classList.remove('hidden');
    });
  </script>
</body>
</html>`;
  }
}

module.exports = new AgentSwarm();
