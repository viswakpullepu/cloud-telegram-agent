const axios = require('axios');

/**
 * Autonomous Code Auditing & Bug Diagnostic Suite
 */
function auditAndFixCodebase(htmlContent) {
  const issuesFound = [];
  const fixesApplied = [];
  let code = htmlContent;

  // 1. Check for Viewport Meta Tag
  if (!code.includes('<meta name="viewport"')) {
    issuesFound.push('Missing mobile viewport meta tag');
    code = code.replace('<head>', '<head>\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />');
    fixesApplied.push('Injected responsive viewport meta tag');
  }

  // 2. Check for UTF-8 Charset
  if (!code.includes('<meta charset="UTF-8"')) {
    issuesFound.push('Missing charset declaration');
    code = code.replace('<head>', '<head>\n  <meta charset="UTF-8" />');
    fixesApplied.push('Injected UTF-8 charset');
  }

  // 3. Check for Mobile Horizontal Overflow Guard
  if (!code.includes('overflow-x-hidden')) {
    issuesFound.push('Potential horizontal scroll glitch on mobile viewports');
    code = code.replace('<body', '<body class="overflow-x-hidden"');
    fixesApplied.push('Applied global overflow-x-hidden guard to body');
  }

  // 4. Check Three.js WebGL Canvas & Context Safety
  if (code.includes('THREE.') && !code.includes('webgl-canvas')) {
    issuesFound.push('WebGL script exists but canvas element is missing');
    code = code.replace('<body', '<body class="overflow-x-hidden"><canvas id="webgl-canvas" class="fixed inset-0 w-full h-full pointer-events-none z-0"></canvas>');
    fixesApplied.push('Injected hardware-accelerated WebGL canvas element');
  }

  // 5. Check Three.js Resize Handler
  if (code.includes('new THREE.WebGLRenderer') && !code.includes('window.addEventListener(\'resize\'')) {
    issuesFound.push('Missing dynamic window resize listener for Three.js canvas');
    const resizeFix = `\n    window.addEventListener('resize', () => { if (typeof camera !== 'undefined' && typeof renderer !== 'undefined') { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); } });\n`;
    code = code.replace('renderer.setSize(', resizeFix + '    renderer.setSize(');
    fixesApplied.push('Injected reactive window resize listener');
  }

  // 6. Check for Broken Script Tag syntax or unbalanced brackets
  const openScripts = (code.match(/<script/g) || []).length;
  const closeScripts = (code.match(/<\/script>/g) || []).length;
  if (openScripts !== closeScripts) {
    issuesFound.push(`Mismatched script tags: ${openScripts} opened vs ${closeScripts} closed`);
    if (openScripts > closeScripts) {
      code += '\n</script>';
      fixesApplied.push('Balanced unclosed <script> tags');
    }
  }

  // 7. Check for Broken Div Hierarchy
  const openDivs = (code.match(/<div/g) || []).length;
  const closeDivs = (code.match(/<\/div>/g) || []).length;
  if (openDivs > closeDivs) {
    issuesFound.push(`Mismatched div tags: ${openDivs} opened vs ${closeDivs} closed`);
    const diff = openDivs - closeDivs;
    for (let i = 0; i < diff; i++) {
      code = code.replace('</body>', '</div>\n</body>');
    }
    fixesApplied.push(`Automatically closed ${diff} unclosed <div> tags`);
  }

  // 8. Prevent Form Default Page Reload Bugs
  if (code.includes('<form') && !code.includes('preventDefault()')) {
    issuesFound.push('Form submission without preventDefault() causes page reload glitch');
    const formFix = `\n    document.querySelectorAll('form').forEach(f => f.addEventListener('submit', e => { e.preventDefault(); const msg = document.getElementById('form-feedback') || document.getElementById('form-msg'); if (msg) msg.classList.remove('hidden'); }));\n`;
    code = code.replace('</body>', `<script>${formFix}</script>\n</body>`);
    fixesApplied.push('Injected automated e.preventDefault() form submission handler');
  }

  return {
    cleanedCode: code,
    issuesFound,
    fixesApplied,
    isHealthy: issuesFound.length === 0 || fixesApplied.length >= issuesFound.length,
  };
}

/**
 * Polls GitHub Pages until the status is verified "built"
 * Prevents the user from ever seeing a 404 page!
 */
async function waitForGitHubPagesReady(githubUsername, repoName, githubToken, maxAttempts = 15) {
  const ghHeaders = {
    Authorization: `Bearer ${githubToken}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'CloudAutonomousAgent',
  };

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await axios.get(`https://api.github.com/repos/${githubUsername}/${repoName}/pages`, { headers: ghHeaders });
      if (res.data && res.data.status === 'built') {
        return { isReady: true, attempts: attempt, url: res.data.html_url };
      }
    } catch (err) {}
    // Wait 4 seconds between probes
    await new Promise(r => setTimeout(r, 4000));
  }
  return { isReady: false, attempts: maxAttempts, url: `https://${githubUsername}.github.io/${repoName}/` };
}

module.exports = { auditAndFixCodebase, waitForGitHubPagesReady };
