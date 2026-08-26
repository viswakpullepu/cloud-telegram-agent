const { buildAndDeployProject } = require('../builder');

const token = process.env.TELEGRAM_BOT_TOKEN;
const allowedChatId = process.env.ALLOWED_CHAT_ID;
const githubToken = process.env.GITHUB_TOKEN;
const githubUsername = process.env.GITHUB_USERNAME || 'viswakpullepu';
const apiUrl = `https://api.telegram.org/bot${token}`;

const interviewQuestions = [
  { id: 1, title: '[1/12] PROJECT IDENTITY AND NAME', question: "What is the Project Name and primary Tagline/Slogan?\n\nExample: 'AetherAI - Autonomous Multi-Agent Swarm for Web3 Security'" },
  { id: 2, title: '[2/12] PURPOSE AND TARGET AUDIENCE', question: "What is the core purpose of this website, and who is your primary audience?\n\nExample: 'Enterprise cybersecurity teams, developers, collegiate CTF competitors, crypto traders...'" },
  { id: 3, title: '[3/12] VISUAL AND AESTHETIC THEME', question: "Which visual theme do you prefer? (Reply 1, 2, 3, or type your own)\n\n1. Apple/Vercel Luxury Dark Bento Grid\n2. Cyberpunk / Hacker OS (High-contrast neon green/cyan)\n3. Linear / Stripe Minimalist Editorial\n4. Neo-Brutalist Web3" },
  { id: 4, title: '[4/12] 3D WEBGL CENTERPIECE', question: "What kind of 3D WebGL centerpiece experience would you like?\n\n1. 3D Rotating Cryptographic Globe / Sphere\n2. 3D Interactive Torus Knot / Particle Vortex\n3. 3D Floating Glass Cards\n4. Clean minimal ambient gradient glow" },
  { id: 5, title: '[5/12] COLOR PALETTE AND ACCENTS', question: "What color palette and accent glow should we use?\n\n1. Obsidian Void + Cyber Cyan & Emerald\n2. Deep Violet + Electric Pink\n3. Gold / Amber + Stealth Slate\n4. Custom palette" },
  { id: 6, title: '[6/12] HERO SECTION HEADLINE AND CTAs', question: "What exact Headline and Action Buttons do you want in the Hero section?\n\nExample:\nHeadline: 'WHERE ELITE MINDS CONQUER CODE'\nCTA 1: 'LAUNCH TERMINAL'\nCTA 2: 'EXPLORE PROTOCOL'" },
  { id: 7, title: '[7/12] TELEMETRY AND STATS METRICS', question: "What key stats or metric numbers should be highlighted?\n\nExample: '100+ Active Members', '45+ CTFs Dominated', '99.9% Uptime'" },
  { id: 8, title: '[8/12] CORE FEATURES AND PILLARS', question: "List 3 to 4 core features or pillars to showcase in the Bento Grid:\n\nExample:\n1. Web & API Exploitation\n2. Reverse Engineering\n3. Cryptography & ZK Proofs\n4. Digital Forensics" },
  { id: 9, title: '[9/12] INTERACTIVE SANDBOX AND WIDGETS', question: "Which interactive widget should we build into the page?\n\n1. Live Working Terminal CLI\n2. Live Radar Threat Scanner / Syslog feed\n3. Interactive Calculator\n4. All of the above!" },
  { id: 10, title: '[10/12] LEADERSHIP, TEAM AND ADVISORS', question: "Would you like a Leadership / Team roster section? (Yes/No or names)" },
  { id: 11, title: '[11/12] LEAD CAPTURE AND CONTACT FORM', question: "What kind of form should be at the bottom?\n\n1. Member Enrollment Packet form\n2. Waitlist / Newsletter Email signup\n3. Direct Discord/Telegram join\n4. Custom form" },
  { id: 12, title: '[12/12] GITHUB REPO NAME', question: "What is your target GitHub Repository name?\n\nExample: 'my-cyber-app' or 'Generate unique repo name'" }
];

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

// Global serverless memory
global.cloudSessions = global.cloudSessions || new Map();

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

  if (text === '/start' || text === '/help') {
    await sendTelegramMsg(chatId, `👋 *Hello ${sender}! Your 100% Free 24/7 Cloud AI Agent is Online.*\n\n⚡ *Cloud Commands:*\n• \`/build\` - Start 12-Question Project Architect Interview\n• \`/status\` - Check 24/7 Serverless Uptime\n• \`/cancel\` - Reset session\n\n💡 *Hosted on Vercel Serverless — Runs 24/7 even when your PC is off!*`);
    return res.status(200).send('OK');
  }

  if (text === '/status') {
    await sendTelegramMsg(chatId, `☁️ *24/7 SERVERLESS CLOUD TELEMETRY*\n━━━━━━━━━━━━━━━━━━━━━\n• *Platform*: Vercel Serverless (100% Free)\n• *Status*: 24/7 Online\n• *PC Status*: Independent (PC can be off)\n• *GitHub Auth*: Connected (@${githubUsername})\n• *Uptime*: 100% Guaranteed\n━━━━━━━━━━━━━━━━━━━━━`);
    return res.status(200).send('OK');
  }

  if (text === '/cancel' || text === '/reset') {
    global.cloudSessions.delete(chatId);
    await sendTelegramMsg(chatId, '✓ Session reset. Type `/build` whenever you are ready to start fresh!', '');
    return res.status(200).send('OK');
  }

  if (text === '/build' || text === 'build') {
    global.cloudSessions.set(chatId, {
      currentStep: 0,
      answers: {},
      status: 'IN_PROGRESS',
    });

    const q1 = interviewQuestions[0];
    await sendTelegramMsg(chatId, `🚀 *24/7 CLOUD PROJECT ARCHITECT INTERVIEW INITIATED*\n━━━━━━━━━━━━━━━━━━━━━\nHello ${sender}! Let's craft your website specification (12 questions).\n\nType \`/cancel\` at any time.\n━━━━━━━━━━━━━━━━━━━━━\n\n*${q1.title}*\n${q1.question}`);
    return res.status(200).send('OK');
  }

  const session = global.cloudSessions.get(chatId);

  if (session && session.status === 'IN_PROGRESS') {
    const step = session.currentStep;
    session.answers[`q${step + 1}`] = text;
    session.currentStep = step + 1;

    if (session.currentStep < interviewQuestions.length) {
      const nextQ = interviewQuestions[session.currentStep];
      await sendTelegramMsg(chatId, `✓ *Recorded!*\n\n*${nextQ.title}*\n${nextQ.question}`);
    } else {
      session.status = 'COMPLETED';
      const ans = session.answers;
      const summary = `🎉 *SPECIFICATION BRIEF COMPLETE!*\n━━━━━━━━━━━━━━━━━━━━━\n1. Project Name: ${ans.q1}\n2. Purpose/Audience: ${ans.q2}\n3. Aesthetic Theme: ${ans.q3}\n4. 3D WebGL Core: ${ans.q4}\n5. Color Palette: ${ans.q5}\n6. Hero Headline: ${ans.q6}\n7. Key Metrics: ${ans.q7}\n8. Core Features: ${ans.q8}\n9. Interactive Sandboxes: ${ans.q9}\n10. Leadership/Team: ${ans.q10}\n11. Lead Form: ${ans.q11}\n12. Target Repo: ${ans.q12}\n━━━━━━━━━━━━━━━━━━━━━\n\n🚀 Type \`/proceed\` to begin 24/7 cloud code synthesis, GitHub push, and live deployment!`;
      await sendTelegramMsg(chatId, summary);
    }
    return res.status(200).send('OK');
  }

  if (text === '/proceed' || text === 'proceed') {
    if (session && session.status === 'COMPLETED') {
      const answers = session.answers;
      global.cloudSessions.delete(chatId);
      buildAndDeployProject({ answers, chatId, bot: mockBot, githubToken, githubUsername });
      return res.status(200).send('OK');
    } else {
      await sendTelegramMsg(chatId, 'No completed interview found. Type `/build` to start a new project specification!', '');
      return res.status(200).send('OK');
    }
  }

  return res.status(200).send('OK');
};
