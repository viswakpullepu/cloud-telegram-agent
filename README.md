# ☁️ 24/7 Cloud Autonomous Telegram AI Agent (100% Free on Vercel)

This agent runs **24/7 continuously in the cloud for 100% free**—allowing you to interview, build, commit to GitHub, and deploy live websites directly from your phone even when your personal computer is turned off.

---

## ⚡ 1-Minute 100% Free Setup on Vercel:

1. Open **[https://vercel.com/new](https://vercel.com/new)** and click **Continue with GitHub** (`viswakpullepu`).
2. Click **Import** next to your repository: **`viswakpullepu/cloud-telegram-agent`**.
3. Under **Environment Variables**, add these 4 keys:
   - `TELEGRAM_BOT_TOKEN`: Your Telegram Bot Token from `@BotFather`
   - `ALLOWED_CHAT_ID`: `7312591748`
   - `GITHUB_TOKEN`: Your GitHub Personal Access Token
   - `GITHUB_USERNAME`: `viswakpullepu`
4. Click **Deploy**! (Takes ~20 seconds).
5. Copy your deployed Vercel domain (e.g., `https://cloud-telegram-agent-xxx.vercel.app`).
6. Set the Telegram Webhook by opening this URL in your browser:
   `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://YOUR-VERCEL-DOMAIN.vercel.app/api/bot`

---

🎉 **Done!** Your bot is now 100% serverless, free forever, and runs 24/7/365 in the cloud!
