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

function extractPart(raw, key) {
  const reg = new RegExp('(?:^|\\b)' + key + '[:\\s]+([\\s\\S]*?)(?=(?:\\b(?:what|who|why|how|where)[:\\s]|$))', 'i');
  const m = raw.match(reg);
  return m ? m[1].trim() : '';
}

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

  // 1. Start & Help
  if (text === '/start' || text === '/help') {
    const welcome = `👋 *Hello ${sender}! Your 24/7 Cloud AI Agent is Ready.* (Phase 2)\n\n` +
      `⚡ *Commands:*\n` +
      `• \`/build\` - Start project with 5-W Single-Message Framework\n` +
      `• \`/change <instructions>\` - Modify & evolve your deployed project\n` +
      `• \`/status\` - Check 24/7 Cloud Serverless Uptime\n` +
      `• \`/cancel\` - Reset session\n\n` +
      `💡 *Runs 24/7 in the cloud even when your PC is turned off!*`;
    await sendTelegramMsg(chatId, welcome);
    return res.status(200).send('OK');
  }

  // 2. Status
  if (text === '/status') {
    await sendTelegramMsg(chatId, `☁️ *24/7 SERVERLESS CLOUD TELEMETRY*\n━━━━━━━━━━━━━━━━━━━━━\n• *Platform*: Vercel Serverless (100% Free)\n• *Mode*: Phase 2 (5-W Regex Parser & Auto-Builder)\n• *PC Independence*: Active (Runs with PC off)\n• *GitHub Auth*: Connected (@${githubUsername})\n━━━━━━━━━━━━━━━━━━━━━`);
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

  // 5. Build prompt
  if (text === '/build' || text === 'build') {
    global.cloudSessions.set(chatId, { status: 'WAITING_FOR_5W' });

    const briefPrompt = `📋 *PHASE 2: PROJECT ARCHITECTURE BRIEF (5-W FRAMEWORK)*\n━━━━━━━━━━━━━━━━━━━━━\n` +
      `Hello ${sender}! Reply to this message with your project answers in *one single text*:\n\n` +
      `1️⃣ *WHAT* is the Project Name & core features?\n` +
      `2️⃣ *WHO* is the target audience (e.g. crypto traders, gamers, enterprise, students)?\n` +
      `3️⃣ *WHY* does it exist / what main value does it offer?\n` +
      `4️⃣ *HOW* should it feel (e.g. 3D WebGL Torus/Globe, Luxury Dark Bento, Cyberpunk)?\n` +
      `5️⃣ *WHERE* is the target GitHub repo name? (Optional, e.g. \`novasync\`)\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `💡 *Tip:* You can write everything in a single message!`;

    await sendTelegramMsg(chatId, briefPrompt);
    return res.status(200).send('OK');
  }

  // 6. Direct / Session 5-W Response Detection (Robust Inline Regex)
  const has5W = /(?:^|\b)(?:what|who|why|how|where)[:\s]/i.test(text);
  const session = global.cloudSessions.get(chatId);

  if (has5W || (session && session.status === 'WAITING_FOR_5W')) {
    const what = extractPart(text, 'what') || text.slice(0, 60);
    const who = extractPart(text, 'who') || 'Distributed Systems & MLOps Architects';
    const why = extractPart(text, 'why') || text;
    const how = extractPart(text, 'how') || 'Dark Glassmorphic Bento UI + 3D WebGL Globe with Cobalt & Amber';
    let where = extractPart(text, 'where');

    if (!where) {
      const firstWord = what.split(/[–-—:\s]/)[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      where = firstWord && firstWord.length > 2 ? firstWord : 'novasync';
    }

    global.cloudSessions.delete(chatId);
    global.lastDeployedRepo.set(chatId, where);

    // CRITICAL: Await deployment completion before responding to Vercel
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
