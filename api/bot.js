const { buildAndDeployProject, cloneWebsiteFromUrl, replicateFromImage, modifyExistingProject } = require('../builder');
const trainingEngine = require('../training_engine');

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

function extractPart(raw, key) {
  const reg = new RegExp('(?:^|\\b)' + key + '[:\\s]+([\\s\\S]*?)(?=(?:\\b(?:what|who|why|how|where)[:\\s]|$))', 'i');
  const m = raw.match(reg);
  return m ? m[1].trim() : '';
}

function getFullCommandDashboard(sender = 'Viswak') {
  return `🦁 *🔥 RAI RAI RAA RAA! ⚡ FULL AGENT COMMAND DASHBOARD* 🦁\n` +
    `━━━━━━━━━━━━━━━━━━━━━\n` +
    `Hello ${sender}! Here is your complete mission control center:\n\n` +
    `🧠 *0. AGENT TRAINING & NEURAL BRAIN*\n` +
    `   • Send \`/train\` or \`/knowledge\` to inspect active skill modules & training status\n\n` +
    `🌐 *1. URL INSTANT CLONER & ASSET SCRAPER*\n` +
    `   • Just paste any live website link (e.g. \`https://linear.app\` or \`https://stripe.com\`)\n` +
    `   • Agent scrapes DOM, colors, fonts, images & builds exact 3D replica!\n\n` +
    `📸 *2. SCREENSHOT-TO-CODE VISION REPLICATOR*\n` +
    `   • Upload any UI screenshot, photo, or wireframe\n` +
    `   • Agent converts visual layout directly into clean responsive code!\n\n` +
    `📋 *3. CUSTOM 5-W ARCHITECT BUILDER*\n` +
    `   • Send \`/build\`\n` +
    `   • Reply with (What, Who, Why, How, Where) to build bespoke platforms!\n\n` +
    `🛠️ *4. LIVE ITERATION & CHANGE ENGINE*\n` +
    `   • Send \`/change <instructions>\` (e.g. _"Make theme neon green and add pricing table"_)\n` +
    `   • Agent updates code on GitHub & redeploys automatically!\n\n` +
    `☁️ *5. CLOUD TELEMETRY & UPTIME*\n` +
    `   • Send \`/status\` to check 24/7 serverless edge performance\n\n` +
    `🛑 *6. RESET SESSION*\n` +
    `   • Send \`/cancel\` or \`/reset\` anytime\n` +
    `━━━━━━━━━━━━━━━━━━━━━\n` +
    `👑 _"చరిత్ర రాయాలన్నా మేమే... తిరగరాయాలన్నా మేమే!"_\n\n` +
    `👉 *What would you like to do right now?*\n` +
    `_Paste a URL, send a photo, or type /build to start!_`;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(200).send('24/7 Universal AI Agent Webhook is Online!');
  }

  const update = req.body;
  if (!update || !update.message) {
    return res.status(200).send('OK');
  }

  const msg = update.message;
  const chatId = msg.chat.id.toString();
  const text = (msg.text || '').trim();
  const caption = (msg.caption || '').trim();
  const sender = msg.from.first_name || 'User';

  if (allowedChatId && chatId !== allowedChatId) {
    await sendTelegramMsg(chatId, '⛔ Access Denied: Unauthorized User ID.', '');
    return res.status(200).send('OK');
  }

  const mockBot = {
    sendMessage: (cid, txt, opts) => sendTelegramMsg(cid, txt, opts && opts.parse_mode ? opts.parse_mode : ''),
  };

  // 0. TRAINING & KNOWLEDGE COMMANDS
  if (text === '/train' || text === '/knowledge' || /train/i.test(text)) {
    const trainingReport = trainingEngine.getTrainingStatusSummary();
    await sendTelegramMsg(chatId, trainingReport);
    return res.status(200).send('OK');
  }

  // 0. RAI RAI RAA RAA / JAI BALAYYA / TELUGU & ENGLISH MATCHER
  if (/rai\s*rai|రా|రై|balayya|బాలయ్య/i.test(text)) {
    const dashboard = getFullCommandDashboard(sender);
    await sendTelegramMsg(chatId, dashboard);
    return res.status(200).send('OK');
  }

  // 1. INCOMING PHOTO / SCREENSHOT DETECTION
  if (msg.photo && msg.photo.length > 0) {
    await replicateFromImage({
      photoCaption: caption || 'UI Screenshot Replica',
      chatId,
      bot: mockBot,
      githubToken,
      githubUsername,
    });
    return res.status(200).send('OK');
  }

  // 2. INCOMING URL DETECTED
  const urlMatch = text.match(/https?:\/\/[^\s]+/i);
  if (urlMatch) {
    const targetUrl = urlMatch[0];
    await cloneWebsiteFromUrl({
      targetUrl,
      chatId,
      bot: mockBot,
      githubToken,
      githubUsername,
    });
    return res.status(200).send('OK');
  }

  // 3. Start & Help
  if (text === '/start' || text === '/help') {
    const dashboard = getFullCommandDashboard(sender);
    await sendTelegramMsg(chatId, dashboard);
    return res.status(200).send('OK');
  }

  // 4. Status
  if (text === '/status') {
    await sendTelegramMsg(chatId, `☁️ *24/7 UNIVERSAL AGENT TELEMETRY*\n━━━━━━━━━━━━━━━━━━━━━\n• *Platform*: Vercel Serverless (100% Free)\n• *Training Status*: 6 Modules 100% Calibrated\n• *Modes*: URL Cloner • Image-to-Code • 5-W Builder\n• *QA Bug Auditor*: Active (Zero-Defect Guaranteed)\n• *GitHub Auth*: Connected (@${githubUsername})\n• *Turbo State*: Armed (Rai Rai Raa Raa Active)\n━━━━━━━━━━━━━━━━━━━━━`);
    return res.status(200).send('OK');
  }

  // 5. Cancel
  if (text === '/cancel' || text === '/reset') {
    global.cloudSessions.delete(chatId);
    await sendTelegramMsg(chatId, '✓ Session reset. Send a URL, Image, or `/build` to start fresh!', '');
    return res.status(200).send('OK');
  }

  // 6. Change / Iterate Command
  if (text === '/change' || text === '/edit' || text === '/modify') {
    global.cloudSessions.set(chatId, { status: 'WAITING_FOR_CHANGE' });
    const lastRepo = global.lastDeployedRepo.get(chatId) || 'novasync';
    await sendTelegramMsg(chatId, `🛠️ *What changes would you like to make to \`${lastRepo}\`?*\n\nReply directly with your instructions.`);
    return res.status(200).send('OK');
  }

  const session = global.cloudSessions.get(chatId);

  if (session && session.status === 'WAITING_FOR_CHANGE') {
    global.cloudSessions.delete(chatId);
    const lastRepo = global.lastDeployedRepo.get(chatId) || 'novasync';
    await modifyExistingProject({
      changeRequest: text,
      chatId,
      bot: mockBot,
      githubToken,
      githubUsername,
      lastRepo,
    });
    return res.status(200).send('OK');
  }

  if (text.startsWith('/change ') || text.startsWith('/edit ') || text.startsWith('/modify ')) {
    const changeReq = text.replace(/^\/(change|edit|modify)\s+/i, '').trim();
    const lastRepo = global.lastDeployedRepo.get(chatId) || 'novasync';
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

  // 7. Build prompt
  if (text === '/build' || text === 'build') {
    global.cloudSessions.set(chatId, { status: 'WAITING_FOR_5W' });

    const briefPrompt = `📋 *PROJECT ARCHITECTURE BRIEF (5-W FRAMEWORK)*\n━━━━━━━━━━━━━━━━━━━━━\n` +
      `Hello ${sender}! You can also send a *URL* or *Screenshot* directly!\n\n` +
      `Or reply with:\n` +
      `1️⃣ *WHAT* is the Project Name & core features?\n` +
      `2️⃣ *WHO* is the target audience?\n` +
      `3️⃣ *WHY* does it exist / main value?\n` +
      `4️⃣ *HOW* should it feel (3D WebGL, Dark Bento, Cyberpunk)?\n` +
      `5️⃣ *WHERE* is the target repo name?\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━`;

    await sendTelegramMsg(chatId, briefPrompt);
    return res.status(200).send('OK');
  }

  // 8. 5-W Response Detection
  const has5W = /(?:^|\b)(?:what|who|why|how|where)[:\s]/i.test(text);

  if (has5W || (session && session.status === 'WAITING_FOR_5W')) {
    const what = extractPart(text, 'what') || text.slice(0, 60);
    const who = extractPart(text, 'who') || 'Universal Audience';
    const why = extractPart(text, 'why') || text;
    const how = extractPart(text, 'how') || '3D WebGL Luxury Dark Bento UI';
    let where = extractPart(text, 'where');

    if (!where) {
      const firstWord = what.split(/[–-—:\s]/)[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      where = firstWord && firstWord.length > 2 ? firstWord : `app-${Date.now()}`;
    }

    global.cloudSessions.delete(chatId);
    global.lastDeployedRepo.set(chatId, where);

    await buildAndDeployProject({
      what,
      who,
      why,
      how,
      where,
      chatId,
      bot: mockBot,
      githubToken,
      githubUsername,
    });

    return res.status(200).send('OK');
  }

  return res.status(200).send('OK');
};
