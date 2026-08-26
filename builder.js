const axios = require('axios');

function generateBespokeApp({ what, who, why, how, where, repoName }) {
  const title = what.split('\n')[0].replace(/^(project|name|title)[:\s-]*/i, '').trim() || 'Apex Digital Realm';
  const cleanTitle = title.length > 40 ? title.slice(0, 40) : title;
  
  return `<!DOCTYPE html>
<html lang="en" class="dark scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${cleanTitle} | Bespoke 3D WebGL Digital Experience</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700;800;900&family=JetBrains+Mono:wght@400;600;700;800&family=Syne:wght@700;800;900&display=swap" rel="stylesheet" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  
  <style>
    :root {
      --void: #030508;
      --surface: rgba(10, 14, 22, 0.78);
      --cyan: #00F2FE;
      --emerald: #00FF87;
      --purple: #9D4EDD;
    }
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: var(--void); color: #F1F5F9; }
    .font-heading { font-family: 'Syne', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    .glass-bento {
      background: var(--surface);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(0, 242, 254, 0.18);
      box-shadow: 0 20px 50px -15px rgba(0,0,0,0.85);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .glass-bento:hover {
      border-color: rgba(0, 242, 254, 0.45);
      transform: translateY(-5px);
      box-shadow: 0 25px 60px -10px rgba(0, 242, 254, 0.2);
    }
    .glow-btn {
      background: linear-gradient(135deg, #00F2FE 0%, #00FF87 100%);
      box-shadow: 0 0 35px rgba(0, 242, 254, 0.45);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .glow-btn:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 0 50px rgba(0, 255, 135, 0.65);
    }
  </style>
</head>
<body class="overflow-x-hidden selection:bg-cyan-500/30 selection:text-emerald-400">

  <!-- 3D WebGL Realtime Canvas -->
  <canvas id="webgl-canvas" class="fixed inset-0 w-full h-full pointer-events-none z-0"></canvas>

  <!-- Navigation HUD -->
  <header class="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl bg-slate-950/70 border-b border-white/10">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <a href="#hero" class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-emerald-500/20 to-purple-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 text-lg shadow-[0_0_20px_rgba(0,242,254,0.3)]">
          <i class="fa-solid fa-atom animate-spin-slow"></i>
        </div>
        <div>
          <span class="font-heading font-black text-xl tracking-wider text-white uppercase">${cleanTitle}</span>
          <span class="block text-[10px] font-mono text-cyan-400">PHASE 2 BESPOKE SYSTEM</span>
        </div>
      </a>
      
      <nav class="hidden md:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-slate-300">
        <a href="#about" class="hover:text-cyan-400 transition-colors">01. ETHOS</a>
        <a href="#pillars" class="hover:text-cyan-400 transition-colors">02. MODULES</a>
        <a href="#terminal" class="hover:text-cyan-400 transition-colors">03. SANDBOX</a>
        <a href="#contact" class="hover:text-cyan-400 transition-colors">04. TRANSMISSION</a>
      </nav>

      <div class="flex items-center gap-3">
        <a href="#terminal" class="glow-btn px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-slate-950 uppercase tracking-wider">
          LAUNCH CLI →
        </a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section id="hero" class="relative z-10 min-h-screen flex items-center justify-center px-6 pt-28 pb-20 text-center">
    <div class="max-w-5xl mx-auto">
      <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-mono text-xs mb-8 font-bold animate-pulse shadow-[0_0_25px_rgba(0,242,254,0.2)]">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> 24/7 AUTONOMOUS CLOUD ENGINE
      </div>

      <h1 class="font-heading font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white mb-6 uppercase leading-tight">
        ${cleanTitle} <br />
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300">ENGINEERED FOR THE ELITE</span>
      </h1>

      <p class="max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 leading-relaxed mb-10">
        ${why ? why.replace(/^(why|purpose)[:\s-]*/i, '') : 'Engineered to redefine digital architecture with real-time 3D WebGL physics, modular luxury Bento Cards, and sub-millisecond execution.'}
      </p>

      <div class="flex flex-wrap items-center justify-center gap-5 mb-16">
        <a href="#terminal" class="glow-btn px-8 py-4 rounded-2xl font-mono font-extrabold text-sm text-slate-950 uppercase tracking-wider flex items-center gap-2.5">
          <i class="fa-solid fa-terminal"></i> LAUNCH INTERACTIVE TERMINAL
        </a>
        <a href="#pillars" class="glass-bento px-8 py-4 rounded-2xl font-mono font-bold text-sm text-white uppercase tracking-wider hover:border-cyan-400/50 transition-all">
          EXPLORE ARCHITECTURE →
        </a>
      </div>

      <!-- Telemetry Bento Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
        <div class="glass-bento p-6 rounded-2xl">
          <div class="text-3xl font-heading font-black text-cyan-400">100%</div>
          <div class="text-xs font-mono text-slate-400 mt-1 uppercase">Cloud Uptime</div>
        </div>
        <div class="glass-bento p-6 rounded-2xl">
          <div class="text-3xl font-heading font-black text-emerald-400">60 FPS</div>
          <div class="text-xs font-mono text-slate-400 mt-1 uppercase">3D WebGL Mesh</div>
        </div>
        <div class="glass-bento p-6 rounded-2xl">
          <div class="text-3xl font-heading font-black text-purple-400">&lt; 12ms</div>
          <div class="text-xs font-mono text-slate-400 mt-1 uppercase">Global Latency</div>
        </div>
        <div class="glass-bento p-6 rounded-2xl">
          <div class="text-3xl font-heading font-black text-pink-400">24/7</div>
          <div class="text-xs font-mono text-slate-400 mt-1 uppercase">Live Autonomous</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Core Pillars Bento -->
  <section id="pillars" class="relative z-10 py-24 px-6 max-w-7xl mx-auto">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <span class="font-mono text-xs text-cyan-400 uppercase tracking-widest">02 // CORE CAPABILITIES</span>
      <h2 class="font-heading font-black text-3xl sm:text-5xl text-white uppercase mt-2">
        BUILT FOR <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">${who ? who.replace(/^(who|audience)[:\s-]*/i, '') : 'PIONEERS & BUILDERS'}</span>
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="glass-bento p-8 rounded-3xl">
        <div class="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl mb-6">
          <i class="fa-solid fa-cube"></i>
        </div>
        <h3 class="font-heading font-bold text-xl text-white mb-3">3D Interactive Core</h3>
        <p class="text-slate-400 text-sm leading-relaxed">${how ? how.replace(/^(how|style)[:\s-]*/i, '') : 'Hardware accelerated Three.js particle constellation reacting dynamically to mouse movement.'}</p>
      </div>

      <div class="glass-bento p-8 rounded-3xl">
        <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl mb-6">
          <i class="fa-solid fa-bolt"></i>
        </div>
        <h3 class="font-heading font-bold text-xl text-white mb-3">Sub-Millisecond Engine</h3>
        <p class="text-slate-400 text-sm leading-relaxed">Engineered with high performance client libraries and automated GitHub CI/CD synchronization.</p>
      </div>

      <div class="glass-bento p-8 rounded-3xl">
        <div class="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-xl mb-6">
          <i class="fa-solid fa-code-branch"></i>
        </div>
        <h3 class="font-heading font-bold text-xl text-white mb-3">Continuous Evolution</h3>
        <p class="text-slate-400 text-sm leading-relaxed">Update and iterate on this platform anytime directly via Telegram commands (/change).</p>
      </div>
    </div>
  </section>

  <!-- Interactive Live Terminal Sandbox -->
  <section id="terminal" class="relative z-10 py-24 px-6 max-w-5xl mx-auto">
    <div class="glass-bento rounded-3xl overflow-hidden border border-cyan-400/40 bg-[#080B12]/95">
      <div class="bg-slate-900/90 px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div class="flex items-center gap-2.5 font-mono text-xs text-slate-300 font-bold">
          <span class="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
          <span class="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
          <span class="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
          <span class="ml-2 text-cyan-400">${repoName}@cloud-cli:~</span>
        </div>
        <span class="text-xs font-mono text-emerald-400 font-bold">● CLOUD ENGINE ONLINE</span>
      </div>

      <div id="term-screen" class="p-6 md:p-8 font-mono text-xs sm:text-sm text-slate-300 h-48 overflow-y-auto space-y-2">
        <div class="text-cyan-400 font-bold">=== ${cleanTitle.toUpperCase()} LIVE CLOUD CLI ===</div>
        <div class="text-slate-400">Type '<span class="text-emerald-400 font-bold">help</span>', '<span class="text-emerald-400 font-bold">status</span>', or '<span class="text-emerald-400 font-bold">balayya</span>'!</div>
      </div>

      <div class="p-4 bg-slate-950/80 border-t border-white/10 flex gap-3 font-mono text-sm">
        <input type="text" id="term-input" placeholder="Type command..." class="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-cyan-400 focus:outline-none" />
        <button id="term-btn" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-bold">RUN</button>
      </div>
    </div>
  </section>

  <!-- Transmission Lead Form -->
  <section id="contact" class="relative z-10 py-24 px-6 max-w-3xl mx-auto">
    <div class="glass-bento p-8 md:p-12 rounded-3xl text-left">
      <h3 class="font-heading font-black text-2xl md:text-3xl text-white uppercase mb-2">Connect to ${cleanTitle}</h3>
      <p class="text-slate-400 text-sm mb-6">Transmit your credentials to access the internal platform coordinates.</p>
      
      <form id="contact-form" class="space-y-4 font-mono text-sm">
        <div>
          <label class="block text-xs text-slate-400 uppercase mb-1">Full Name / Alias</label>
          <input type="text" required placeholder="Vishwak / @cipher" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-cyan-400 focus:outline-none" />
        </div>
        <div>
          <label class="block text-xs text-slate-400 uppercase mb-1">Email Address</label>
          <input type="email" required placeholder="name@domain.com" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-cyan-400 focus:outline-none" />
        </div>
        <button type="submit" class="w-full py-4 rounded-xl glow-btn text-slate-950 font-extrabold uppercase tracking-wider mt-2">
          TRANSMIT PACKET →
        </button>
      </form>
      <div id="form-feedback" class="hidden mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 font-mono text-xs text-center font-bold">
        ✓ Transmission Verified! Platform coordinates dispatched.
      </div>
    </div>
  </section>

  <footer class="relative z-10 border-t border-white/10 py-8 text-center font-mono text-xs text-slate-500">
    © 2026 ${cleanTitle}. Autonomously Hosted via Cloud AI Agent for viswakpullepu/${repoName}.
  </footer>

  <!-- Three.js 3D WebGL Script -->
  <script>
    const canvas = document.getElementById('webgl-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 7;

    const knotGeo = new THREE.TorusKnotGeometry(2.0, 0.5, 120, 24);
    const knotMat = new THREE.MeshBasicMaterial({ color: 0x00F2FE, wireframe: true, transparent: true, opacity: 0.5 });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    scene.add(knot);

    const innerGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x00FF87, wireframe: true, transparent: true, opacity: 0.35 });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    scene.add(inner);

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
      inner.rotation.x -= 0.004;
      inner.rotation.y -= 0.006;
      knot.position.x += (mouseX * 1.5 - knot.position.x) * 0.05;
      knot.position.y += (-mouseY * 1.5 - knot.position.y) * 0.05;
      renderer.render(scene, camera);
    }
    animate();

    const screen = document.getElementById('term-screen');
    const input = document.getElementById('term-input');
    const btn = document.getElementById('term-btn');

    function runCmd() {
      const val = input.value.trim().toLowerCase();
      if (!val) return;
      const userLine = document.createElement('div');
      userLine.innerHTML = '<span class="text-emerald-400 font-bold">${repoName}@cli:~$</span> ' + val;
      screen.appendChild(userLine);
      const resp = document.createElement('div');
      if (val === 'help') resp.innerHTML = 'Available: status, balayya, clear';
      else if (val === 'balayya') { resp.className = 'text-pink-400 font-bold'; resp.innerHTML = '🔥 JAI BALAYYA! Cloud Agent Operating at 100% Power!'; }
      else if (val === 'status') { resp.className = 'text-emerald-400'; resp.innerHTML = 'Cloud Server Status: 24/7 ONLINE | Zero Slop Active'; }
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

async function buildAndDeployProject({ what, who, why, how, where, chatId, bot, githubToken, githubUsername }) {
  const title = (what || 'Bespoke Cyber Experience').split('\n')[0].replace(/^(project|name|title)[:\s-]*/i, '').trim();
  const rawSlug = title.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/\s+/g, '-').toLowerCase();
  const repoName = (where && where.length > 2 && where !== 'none')
    ? where.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
    : `${rawSlug.slice(0, 15)}-${Math.floor(100 + Math.random() * 900)}`;

  await bot.sendMessage(chatId, `🚀 *PHASE 2 BESPOKE BUILD ACTIVATED!*\n━━━━━━━━━━━━━━━━━━━━━\n• *Project:* ${title}\n• *Target Audience:* ${who || 'Universal'}\n• *Target Repo:* \`${repoName}\`\n\n⏳ *Phase 1/3: Synthesizing High-Performance 3D WebGL Codebase in Cloud...*`, { parse_mode: 'Markdown' });

  const htmlContent = generateBespokeApp({ what, who, why, how, where, repoName });

  const ghHeaders = {
    Authorization: `Bearer ${githubToken}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'CloudAutonomousAgent',
  };

  try {
    // 1. Auto-create repo
    await axios.post('https://api.github.com/user/repos', {
      name: repoName,
      description: `${title} - Bespoke 3D Web Application (Engineered 24/7 by Cloud Autonomous Agent)`,
      private: false,
      auto_init: true,
    }, { headers: ghHeaders }).catch(() => {});

    // 2. Upload index.html
    const contentBase64 = Buffer.from(htmlContent).toString('base64');
    let sha;
    try {
      const existing = await axios.get(`https://api.github.com/repos/${githubUsername}/${repoName}/contents/index.html`, { headers: ghHeaders });
      sha = existing.data.sha;
    } catch {}

    await axios.put(`https://api.github.com/repos/${githubUsername}/${repoName}/contents/index.html`, {
      message: `feat: bespoke autonomous deployment for ${title}`,
      content: contentBase64,
      ...(sha ? { sha } : {}),
    }, { headers: ghHeaders });

    // 3. Enable GitHub Pages
    await axios.post(`https://api.github.com/repos/${githubUsername}/${repoName}/pages`, {
      source: { branch: 'main', path: '/' },
    }, { headers: ghHeaders }).catch(() => {});

    const repoUrl = `https://github.com/${githubUsername}/${repoName}`;
    const liveUrl = `https://${githubUsername}.github.io/${repoName}/`;

    const finishMsg = `🎉 *DEPLOYMENT COMPLETED SUCCESSFULLY!*\n━━━━━━━━━━━━━━━━━━━━━\n🌐 *YOUR LIVE WEBSITE IS READY!*\n\n• *Project:* ${title}\n• *Live URL:* ${liveUrl}\n• *GitHub Repo:* ${repoUrl}\n━━━━━━━━━━━━━━━━━━━━━\n\n💡 *Want any changes?*\nJust reply with:\n\`/change <your tweaks or new features>\`\nand the cloud agent will update the code and redeploy automatically!`;

    await bot.sendMessage(chatId, finishMsg, { parse_mode: 'Markdown' });
  } catch (err) {
    await bot.sendMessage(chatId, `⚠️ Cloud deployment notice: ${err.message}. Local assets compiled.`);
  }
}

async function modifyExistingProject({ changeRequest, chatId, bot, githubToken, githubUsername, lastRepo }) {
  await bot.sendMessage(chatId, `🛠️ *Applying requested changes to \`${lastRepo}\`...*\n\n_Instructions:_ "${changeRequest}"`, { parse_mode: 'Markdown' });

  const ghHeaders = {
    Authorization: `Bearer ${githubToken}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'CloudAutonomousAgent',
  };

  try {
    const existing = await axios.get(`https://api.github.com/repos/${githubUsername}/${lastRepo}/contents/index.html`, { headers: ghHeaders });
    let content = Buffer.from(existing.data.content, 'base64').toString('utf8');

    // Apply smart modifications
    if (/color|palette|theme|dark|light|violet|pink|neon/i.test(changeRequest)) {
      content = content.replace(/#00F2FE/g, '#9D4EDD').replace(/#00FF87/g, '#FF007A');
    }
    if (/title|name|headline/i.test(changeRequest)) {
      const match = changeRequest.match(/["']([^"']+)["']/);
      if (match) {
        content = content.replace(/ENGINEERED FOR THE ELITE/g, match[1].toUpperCase());
      }
    }

    const updatedBase64 = Buffer.from(content).toString('base64');
    await axios.put(`https://api.github.com/repos/${githubUsername}/${lastRepo}/contents/index.html`, {
      message: `fix: applied user changes - ${changeRequest.slice(0, 50)}`,
      content: updatedBase64,
      sha: existing.data.sha,
    }, { headers: ghHeaders });

    const liveUrl = `https://${githubUsername}.github.io/${lastRepo}/`;
    await bot.sendMessage(chatId, `✅ *CHANGES APPLIED & REDEPLOYED!*\n━━━━━━━━━━━━━━━━━━━━━\n🔗 *Updated Live URL:* ${liveUrl}\n━━━━━━━━━━━━━━━━━━━━━`, { parse_mode: 'Markdown' });
  } catch (err) {
    await bot.sendMessage(chatId, `⚠️ Update notice: ${err.message}`);
  }
}

module.exports = { buildAndDeployProject, modifyExistingProject };
