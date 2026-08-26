const { buildAndDeployProject, modifyExistingProject } = require('../builder');

const token = process.env.TELEGRAM_BOT_TOKEN;
const allowedChatId = process.env.ALLOWED_CHAT_ID;
const githubToken = process.env.GITHUB_TOKEN;
const githubUsername = process.env.GITHUB_USERNAME || 'viswakpullepu';
const apiUrl = `https://api.telegram.org/bot${token}`;

async function sendTelegramMsg(chatId, text, parseMode = 'Markdown') {
  const axios = require('axios');
  return axios.post(`${apiUrl}/sendMessage`, {
    chat_id: chatId,
    text: text,
    parse_mode: parseMode,
  }).catch(() => {
    return axios.post(`${apiUrl}/sendMessage`, {
      chat_id: chatId,
      text: text,
    });
  });
}

global.cloudSessions = global.cloudSessions || new Map();
global.lastDeployedRepo = global.lastDeployedRepo || new Map();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(200).send('24/7 Serverless AI Agent Webhook is Online!');
  }

  const update = req.body;
  if (!update || !update.message || !update.message.text) {
    return res.status(200).send('OK');
  }

  const msg = update.message;
  const chatId = msg.chat.id.toString();
  const text = msg.text.trim();
  const sender = msg.from.first_name || 'User';

  if (allowedChatId && chatId !== allowedChatId) {
    await sendTelegramMsg(chatId, '⛔ Access Denied: Unauthorized User ID.', '');
    return res.status(200).send('OK');
  }

  const mockBot = {
    sendMessage: (cid, txt, opts) => sendTelegramMsg(cid, txt, opts && opts.parse_mode ? opts.parse_mode : ''),
  };

  // 1. Help & Start
  if (text === '/start' || text === '/help') {
    const welcome = `👋 *Hello ${sender}! Your 24/7 Cloud AI Agent is Ready.* (Phase 2)\n\n` +
      `⚡ *Commands:*\n` +
      `• \`/build\` - Start a new project using the 5-W Architecture Framework\n` +
      `• \`/change <instructions>\` - Modify & iterate on your deployed project\n` +
      `• \`/status\` - Check 24/7 Cloud Uptime\n` +
      `• \`/cancel\` - Reset session\n\n` +
      `💡 *Runs 24/7 in the cloud even when your PC is turned off!*`;
    await sendTelegramMsg(chatId, welcome);
    return res.status(200).send('OK');
  }

  // 2. Status
  if (text === '/status') {
    await sendTelegramMsg(chatId, `☁️ *24/7 SERVERLESS CLOUD TELEMETRY*\n━━━━━━━━━━━━━━━━━━━━━\n• *Platform*: Vercel Serverless (100% Free)\n• *Mode*: Phase 2 (5-W Framework + Iterative Refinement)\n• *PC Independence*: Active (Runs with PC off)\n• *GitHub Auth*: Connected (@${githubUsername})\n━━━━━━━━━━━━━━━━━━━━━`);
    return res.status(200).send('OK');
  }

  // 3. Cancel
  if (text === '/cancel' || text === '/reset') {
    global.cloudSessions.delete(chatId);
    await sendTelegramMsg(chatId, '✓ Session reset. Type `/build` whenever you are ready to start fresh!', '');
    return res.status(200).send('OK');
  }

  // 4. Change / Iterate Command
  if (text.startsWith('/change ') || text.startsWith('/edit ') || text.startsWith('/modify ')) {
    const changeReq = text.replace(/^\/(change|edit|modify)\s+/i, '').trim();
    const lastRepo = global.lastDeployedRepo.get(chatId) || 'jai-balayya';
    await modifyExistingProject({
      changeRequest: changeReq,
      chatId,
      bot: mockBot,
      githubToken,
      githubUsername,
      lastRepo,
    });
    return res.status(200).send('OK');
  }

  // 5. Build Command (Single-Message 5-W Briefing Prompt)
  if (text === '/build' || text === 'build' || text.startsWith('/build start')) {
    global.cloudSessions.set(chatId, {
      status: 'WAITING_FOR_5W',
    });

    const briefPrompt = `📋 *PHASE 2: PROJECT ARCHITECTURE BRIEF (5-W FRAMEWORK)*\n━━━━━━━━━━━━━━━━━━━━━\n` +
      `Hello ${sender}! Reply to this message with your project answers in *one single text*:\n\n` +
      `1️⃣ *WHAT* is the Project Name & core features?\n` +
      `2️⃣ *WHO* is the target audience (e.g. crypto traders, gamers, enterprise, students)?\n` +
      `3️⃣ *WHY* does it exist / what main value does it offer?\n` +
      `4️⃣ *HOW* should it feel (e.g. 3D WebGL Torus/Globe, Luxury Dark Bento, Cyberpunk)?\n` +
      `5️⃣ *WHERE* is the target GitHub repo name? (e.g. \`cyber-vault\`)\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `💡 *Example Reply:*\n` +
      `_What: AetherAI multi-agent security platform_\n` +
      `_Who: Web3 & Cyber researchers_\n` +
      `_Why: Autonomous smart contract fuzzing_\n` +
      `_How: 3D interactive knot + Obsidian Cyan theme_\n` +
      `_Where: aether-security_`;

    await sendTelegramMsg(chatId, briefPrompt);
    return res.status(200).send('OK');
  }

  const session = global.cloudSessions.get(chatId);

  // 6. Parsing the 5-W Single-Message Response
  if (session && session.status === 'WAITING_FOR_5W') {
    const raw = text;
    
    // Extract 5-W components or parse smartly
    let what = '', who = '', why = '', how = '', where = '';

    const lines = raw.split('\n');
    lines.forEach((l) => {
      if (/^1|what/i.test(l)) what = l.replace(/^1[.)\s]*|what[:\s-]*/i, '').trim();
      else if (/^2|who/i.test(l)) who = l.replace(/^2[.)\s]*|who[:\s-]*/i, '').trim();
      else if (/^3|why/i.test(l)) why = l.replace(/^3[.)\s]*|why[:\s-]*/i, '').trim();
      else if (/^4|how/i.test(l)) how = l.replace(/^4[.)\s]*|how[:\s-]*/i, '').trim();
      else if (/^5|where/i.test(l)) where = l.replace(/^5[.)\s]*|where[:\s-]*/i, '').trim();
    });

    if (!what && raw.length > 5) {
      what = raw.slice(0, 50);
      why = raw;
      who = 'General Audience';
      how = '3D WebGL Luxury Dark Bento';
      where = 'apex-app';
    }

    // Validation: Check if anything critical is missing
    if (!what) {
      await sendTelegramMsg(chatId, '⚠️ Please provide at least the *Project Name & Idea* (WHAT). Reply with your project details!');
      return res.status(200).send('OK');
    }

    global.cloudSessions.delete(chatId);
    
    // Save target repo for subsequent /change iterations
    const targetRepo = where ? where.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase() : 'apex-app';
    global.lastDeployedRepo.set(chatId, targetRepo);

    // Launch Autonomous Cloud Build
    buildAndDeployProject({
      what: what || 'Apex Digital Realm',
      who: who || 'Creators & Developers',
      why: why || 'Next-generation interactive web experience',
      how: how || '3D WebGL Luxury Dark Bento Grid',
      where: targetRepo,
      chatId,
      bot: mockBot,
      githubToken,
      githubUsername,
    });

    return res.status(200).send('OK');
  }

  return res.status(200).send('OK');
};
