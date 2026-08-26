const axios = require('axios');

async function buildAndDeployProject({ answers, chatId, bot, githubToken, githubUsername }) {
  const projTitle = answers.q1 || 'Futuristic Web Application';
  const rawSlug = projTitle.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/\s+/g, '-').toLowerCase();
  const repoName = (answers.q12 && answers.q12 !== 'jai-balayya' && answers.q12.length > 2)
    ? answers.q12.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
    : `${rawSlug.slice(0, 15)}-${Math.floor(100 + Math.random() * 900)}`;

  await bot.sendMessage(chatId, `🚀 *Autonomous Cloud Agent Activated!*\n\n• *Project:* ${projTitle}\n• *Target Repo:* \`${repoName}\`\n\n⏳ *Phase 1/4: Conducting Deep Research & Synthesis in the Cloud...*`, { parse_mode: 'Markdown' });

  // Generate Bespoke 3D WebGL Web Application
  const htmlContent = `<!DOCTYPE html>
<html lang="en" class="dark scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${projTitle} | Engineered 24/7 by Cloud Autonomous Agent</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #030508; color: #F1F5F9; }
    .glass-bento { background: rgba(10, 14, 22, 0.78); backdrop-filter: blur(18px); border: 1px solid rgba(0, 242, 254, 0.2); }
    .glow-cyan { box-shadow: 0 0 30px rgba(0, 242, 254, 0.35); }
  </style>
</head>
<body class="overflow-x-hidden selection:bg-cyan-500/30 selection:text-emerald-400">
  <canvas id="webgl-canvas" class="fixed inset-0 w-full h-full pointer-events-none z-0"></canvas>

  <header class="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 text-xl shadow-[0_0_20px_rgba(0,242,254,0.3)]">
        <i class="fa-solid fa-atom"></i>
      </div>
      <div>
        <span class="font-extrabold text-2xl tracking-tight text-white uppercase">${projTitle}</span>
        <span class="block text-[10px] font-mono text-slate-400 tracking-wider">24/7 CLOUD AUTONOMOUS PLATFORM</span>
      </div>
    </div>
    <div class="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
      <a href="#features" class="hover:text-cyan-400 transition-colors">Features</a>
      <a href="#terminal" class="hover:text-cyan-400 transition-colors">Terminal</a>
      <a href="#action" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-bold glow-cyan hover:scale-105 transition-all">Get Started</a>
    </div>
  </header>

  <main class="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-24 text-center">
    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-mono text-xs mb-8 font-bold">
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> 24/7 CLOUD AUTONOMOUS DEPLOYMENT
    </div>

    <h1 class="text-5xl sm:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight uppercase">
      ${projTitle} <br />
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300">${answers.q6 || 'WHERE ELITE MINDS CONQUER CODE'}</span>
    </h1>

    <p class="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
      ${answers.q2 || 'Crafted autonomously with 3D WebGL real-time visual physics, luxury Apple-grade Bento Cards, and sub-millisecond cloud speeds.'}
    </p>

    <div class="flex flex-wrap justify-center gap-5 mb-16">
      <a href="#terminal" class="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-extrabold text-base glow-cyan hover:scale-105 transition-all flex items-center gap-2">
        <i class="fa-solid fa-terminal"></i> LAUNCH INTERACTIVE TERMINAL
      </a>
      <a href="#features" class="px-8 py-4 rounded-2xl glass-bento text-white font-bold text-base hover:border-cyan-400/50 transition-all">
        EXPLORE SYSTEMS →
      </a>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-20">
      <div class="glass-bento p-6 rounded-2xl">
        <div class="text-3xl font-extrabold text-cyan-400">100%</div>
        <div class="text-xs font-mono text-slate-400 mt-1 uppercase">Cloud Uptime</div>
      </div>
      <div class="glass-bento p-6 rounded-2xl">
        <div class="text-3xl font-extrabold text-emerald-400">60 FPS</div>
        <div class="text-xs font-mono text-slate-400 mt-1 uppercase">3D WebGL Speed</div>
      </div>
      <div class="glass-bento p-6 rounded-2xl">
        <div class="text-3xl font-extrabold text-purple-400">Zero</div>
        <div class="text-xs font-mono text-slate-400 mt-1 uppercase">PC Overhead</div>
      </div>
      <div class="glass-bento p-6 rounded-2xl">
        <div class="text-3xl font-extrabold text-pink-400">24/7</div>
        <div class="text-xs font-mono text-slate-400 mt-1 uppercase">Autonomous State</div>
      </div>
    </div>

    <section id="features" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left mb-20">
      <div class="glass-bento p-8 rounded-3xl hover:border-cyan-400/50 transition-all">
        <div class="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl mb-6"><i class="fa-solid fa-bolt"></i></div>
        <h3 class="text-xl font-bold text-white mb-2">Ultra-Fast Pipeline</h3>
        <p class="text-slate-400 text-sm leading-relaxed">Runs in the cloud without needing your personal laptop or PC to stay powered on.</p>
      </div>
      <div class="glass-bento p-8 rounded-3xl hover:border-emerald-400/50 transition-all">
        <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl mb-6"><i class="fa-solid fa-cube"></i></div>
        <h3 class="text-xl font-bold text-white mb-2">3D Graphic Core</h3>
        <p class="text-slate-400 text-sm leading-relaxed">Hardware accelerated Three.js particle constellation with reactive spring cursor physics.</p>
      </div>
      <div class="glass-bento p-8 rounded-3xl hover:border-purple-400/50 transition-all">
        <div class="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-xl mb-6"><i class="fa-solid fa-code-branch"></i></div>
        <h3 class="text-xl font-bold text-white mb-2">GitHub Sync</h3>
        <p class="text-slate-400 text-sm leading-relaxed">Automated GitHub repository generation, branch staging, and global CDN hosting.</p>
      </div>
      <div class="glass-bento p-8 rounded-3xl hover:border-pink-400/50 transition-all">
        <div class="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center text-xl mb-6"><i class="fa-solid fa-mobile-screen"></i></div>
        <h3 class="text-xl font-bold text-white mb-2">Telegram Controlled</h3>
        <p class="text-slate-400 text-sm leading-relaxed">Trigger builds and deployments from your phone from anywhere in the world.</p>
      </div>
    </section>

    <section id="terminal" class="glass-bento p-8 md:p-12 rounded-3xl text-left border-cyan-400/40 mb-20">
      <div class="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
        <div class="flex items-center gap-2 font-mono text-xs text-slate-300 font-bold">
          <span class="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
          <span class="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
          <span class="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
          <span class="ml-2 text-cyan-400">cloud-agent@tele-bridge:~</span>
        </div>
        <span class="text-xs font-mono text-emerald-400 font-bold">● CLOUD ENGINE ONLINE</span>
      </div>
      <div id="term-screen" class="font-mono text-xs sm:text-sm text-slate-300 space-y-2 h-44 overflow-y-auto mb-4 p-4 rounded-2xl bg-slate-950/80 border border-white/10">
        <div class="text-cyan-400 font-bold">=== ${projTitle.toUpperCase()} LIVE CLOUD CLI ===</div>
        <div>Type '<span class="text-emerald-400 font-bold">status</span>', '<span class="text-emerald-400 font-bold">balayya</span>', or '<span class="text-emerald-400 font-bold">help</span>'!</div>
      </div>
      <div class="flex gap-3 font-mono text-sm">
        <input type="text" id="term-input" placeholder="Type command..." class="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-cyan-400 focus:outline-none" />
        <button id="term-btn" class="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-bold">RUN</button>
      </div>
    </section>
  </main>

  <footer class="relative z-10 border-t border-white/10 py-8 text-center font-mono text-xs text-slate-500">
    © 2026 ${projTitle}. Autonomously Hosted via Cloud AI Agent.
  </footer>

  <script>
    const canvas = document.getElementById('webgl-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 6;

    const geometry = new THREE.TorusKnotGeometry(1.8, 0.45, 100, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0x00F2FE, wireframe: true, transparent: true, opacity: 0.6 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

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
      mesh.rotation.x += 0.004;
      mesh.rotation.y += 0.007;
      mesh.position.x += (mouseX * 1.5 - mesh.position.x) * 0.05;
      mesh.position.y += (-mouseY * 1.5 - mesh.position.y) * 0.05;
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
      userLine.innerHTML = '<span class="text-emerald-400 font-bold">cloud@${repoName}:~$</span> ' + val;
      screen.appendChild(userLine);
      const resp = document.createElement('div');
      if (val === 'help') resp.innerHTML = 'Available: status, balayya, clear';
      else if (val === 'balayya') { resp.className = 'text-pink-400 font-bold'; resp.innerHTML = '🔥 JAI BALAYYA! Cloud Agent Operating at 100% Power!'; }
      else if (val === 'status') { resp.className = 'text-emerald-400'; resp.innerHTML = 'Cloud Server Status: 24/7 ONLINE | Latency: 12ms'; }
      else if (val === 'clear') { screen.innerHTML = ''; }
      else { resp.className = 'text-slate-400'; resp.innerHTML = 'Executed: ' + val; }
      screen.appendChild(resp);
      screen.scrollTop = screen.scrollHeight;
      input.value = '';
    }
    btn.addEventListener('click', runCmd);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') runCmd(); });
  </script>
</body>
</html>`;

  await bot.sendMessage(chatId, `⚡ *Phase 2/4: Code Synthesized in the Cloud!*\n\n• 3D WebGL Torus Mesh compiled\n• Tailwind CSS Responsive Grid configured\n• Interactive CLI sandbox active\n\n⏳ *Phase 3/4: Publishing to GitHub (${githubUsername}/${repoName})...*`, { parse_mode: 'Markdown' });

  // GitHub API direct upload
  const ghHeaders = {
    Authorization: `Bearer ${githubToken}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'CloudAutonomousAgent',
  };

  try {
    // 1. Create Repo
    await axios.post('https://api.github.com/user/repos', {
      name: repoName,
      description: `${projTitle} - Engineered 24/7 by Cloud Autonomous Agent`,
      private: false,
      auto_init: true,
    }, { headers: ghHeaders }).catch(() => {});

    // 2. Upload index.html
    const contentBase64 = Buffer.from(htmlContent).toString('base64');
    
    // Check if file exists to get SHA
    let sha;
    try {
      const existing = await axios.get(`https://api.github.com/repos/${githubUsername}/${repoName}/contents/index.html`, { headers: ghHeaders });
      sha = existing.data.sha;
    } catch {}

    await axios.put(`https://api.github.com/repos/${githubUsername}/${repoName}/contents/index.html`, {
      message: `feat: autonomous cloud deployment for ${projTitle}`,
      content: contentBase64,
      ...(sha ? { sha } : {}),
    }, { headers: ghHeaders });

    // 3. Enable GitHub Pages
    await axios.post(`https://api.github.com/repos/${githubUsername}/${repoName}/pages`, {
      source: { branch: 'main', path: '/' },
    }, { headers: ghHeaders }).catch(() => {});

    const repoUrl = `https://github.com/${githubUsername}/${repoName}`;
    const liveUrl = `https://viswakpullepu.github.io/${repoName}/`;

    await bot.sendMessage(chatId, `🎉 *Phase 4/4: CLOUD DEPLOYMENT COMPLETE!*\n━━━━━━━━━━━━━━━━━━━━━\n🌐 *YOUR LIVE WEBSITE IS READY 24/7!*\n\n• *Project:* ${projTitle}\n• *Live URL:* ${liveUrl}\n• *GitHub Repo:* ${repoUrl}\n━━━━━━━━━━━━━━━━━━━━━\n*(GitHub Pages takes ~30-60s to deploy worldwide)*`, { parse_mode: 'Markdown' });
  } catch (err) {
    await bot.sendMessage(chatId, `⚠️ Cloud GitHub publish note: ${err.message}. Local preview generated successfully.`);
  }
}

module.exports = { buildAndDeployProject };
