<<<<<<< HEAD
AI enabled resume reviewer and interactive Interview prep solution for aspirants
=======
# InterviewPrep AI - Complete Starter Code

A fully functional AI-powered interview preparation platform built with **100% free, open-source tools**.

## 🚀 Features

✅ **Resume Analysis** - Upload PDF/DOCX and get AI feedback  
✅ **Mock Interviews** - Practice behavioral & technical questions  
✅ **Smart AI Models** - Uses Groq's free tier (Llama 3.1)  
✅ **Usage Tracking** - Free tier limits (3 resume reviews)  
✅ **Premium Paywall** - Ready for Razorpay integration  
✅ **Responsive UI** - Clean, modern interface with Tailwind  

## 💰 Total Cost: ₹500-1,500/month

- **Groq API**: Free tier (generous limits)
- **Supabase**: Free tier (500MB DB, 1GB storage)
- **Vercel**: Free tier (unlimited hobby projects)
- **Domain**: ₹0 (use Vercel subdomain) or ₹199/year

## 📋 Prerequisites

- Node.js 18+ installed
- Free accounts on:
  - [Supabase](https://supabase.com) - Database & Auth
  - [Groq](https://console.groq.com) - AI API (free tier)
  - [Vercel](https://vercel.com) - Hosting (optional)

## 🛠️ Setup Instructions

### 1. Clone & Install

```bash
# If you have this as a zip, extract it
# Then:
cd interview-prep-starter
npm install
```

### 2. Set Up Supabase

**Step 1:** Create account at [supabase.com](https://supabase.com)

**Step 2:** Create a new project
- Choose a name (e.g., "interview-prep")
- Choose a region close to you
- Set a strong database password (save it!)

**Step 3:** Run the database schema
- In Supabase dashboard, go to SQL Editor
- Click "New Query"
- Copy ALL contents from `supabase-schema.sql`
- Paste and click "Run"

**Step 4:** Get your API keys
- Go to Settings → API
- Copy `URL` and `anon public` key

### 3. Set Up Groq API (Free)

**Step 1:** Go to [console.groq.com](https://console.groq.com)

**Step 2:** Sign up (GitHub login works)

**Step 3:** Create API key
- Click "API Keys" in sidebar
- Click "Create API Key"
- Copy the key (you won't see it again!)

### 4. Configure Environment Variables

**Step 1:** Copy the example file
```bash
cp .env.example .env
```

**Step 2:** Fill in your keys in `.env`:
```bash
# From Supabase Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key> # Also in Supabase Settings → API

# From Groq console
GROQ_API_KEY=<your-groq-api-key>

# Generate this with: openssl rand -base64 32
NEXTAUTH_SECRET=your_random_secret_here

# For local development
NEXTAUTH_URL=http://localhost:3000
```

**Step 3:** Generate NextAuth secret:
```bash
# On Mac/Linux:
openssl rand -base64 32

# On Windows (PowerShell):
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## 📂 Project Structure

```
interview-prep-starter/
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # Chat API endpoint
│   │   └── resume/analyze/route.ts # Resume analysis endpoint
│   ├── globals.css                 # Tailwind styles
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Homepage
├── components/
│   ├── ChatInterface.tsx           # Chat UI component
│   └── ResumeUpload.tsx            # Resume upload component
├── lib/
│   ├── ai.ts                       # Groq AI integration
│   ├── auth.ts                     # Supabase auth helpers
│   └── supabase.ts                 # Supabase client
├── supabase-schema.sql             # Database schema
├── .env.example                    # Environment variables template
└── package.json                    # Dependencies
```

## 🎨 Customization Guide

### Change Branding

**File:** `app/page.tsx`
- Line 15: Change "InterviewPrep AI" to your name
- Line 30-34: Update hero text

### Modify AI Prompts

**File:** `lib/ai.ts`
- Lines 30-60: Edit `SYSTEM_PROMPTS` object
- Customize feedback style, tone, focus areas

### Adjust Pricing

**File:** `app/page.tsx`
- Lines 150-220: Update pricing section
- Change limits, add tiers, modify features

### Add Features

**Resume Analysis:**
- Edit `app/api/resume/analyze/route.ts`
- Modify prompt in line 40-45

**Chat Interface:**
- Edit `components/ChatInterface.tsx`
- Add new task types in `lib/ai.ts`

## 🚀 Deployment to Vercel (Free)

### Option 1: Connect GitHub (Recommended)

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/interview-prep.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repo
5. Add environment variables from `.env`
6. Deploy!

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
# Follow prompts, add env variables when asked
```

**Important:** Add ALL environment variables in Vercel dashboard:
- Settings → Environment Variables
- Add each variable from your `.env` file

## 📊 Usage Tracking & Limits

**Free Tier Limits (configured in code):**
- 3 resume reviews per month
- 5 practice questions per week

**To change limits:**
- Edit `app/api/chat/route.ts` (line 18-25)
- Modify database query conditions

**Premium Activation:**
- User pays via Razorpay
- Update `profiles.is_premium = true` in database
- Set `premium_until` to future date

## 💳 Adding Razorpay (When Ready)

1. Sign up at [razorpay.com](https://razorpay.com)
2. Get API keys (test mode free)
3. Install: `npm install razorpay`
4. Create `/app/api/payment/route.ts`
5. Follow [Razorpay Docs](https://razorpay.com/docs/)

## 🔧 Troubleshooting

### "Cannot find module" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Supabase connection fails
- Check `.env` URLs have no trailing slashes
- Verify API keys are correct
- Check Supabase project is not paused

### Groq API errors
- Check API key is valid
- Verify you haven't hit rate limits
- Try using `llama-3.1-8b-instant` (faster, higher limits)

### Resume upload fails
- Check file size < 5MB
- Verify file is actually PDF/DOCX
- Check console for detailed error

## 📈 Next Steps

### Week 1: Polish MVP
- [ ] Test with 5 friends, collect feedback
- [ ] Fix any bugs they find
- [ ] Improve AI prompts based on responses

### Week 2: Add Features
- [ ] Interview question bank
- [ ] Save conversation history
- [ ] Email notifications

### Week 3: Marketing
- [ ] Post on Reddit r/developersIndia
- [ ] Write LinkedIn post with demo
- [ ] Answer Quora questions, link tool

### Week 4: Monetization
- [ ] Integrate Razorpay
- [ ] Launch paid tier
- [ ] Get first 5 paying users

## 🐛 Common Issues

**Q: AI responses are slow**  
A: Groq is usually fast (<2s). If slow, try `llama-3.1-8b-instant` model

**Q: Database queries fail**  
A: Check RLS policies in Supabase. Run queries as authenticated user.

**Q: Resume parsing doesn't work**  
A: Some PDFs are scanned images. Add OCR later with Tesseract.js

**Q: How to add Google login?**  
A: Supabase has built-in OAuth. Follow [this guide](https://supabase.com/docs/guides/auth/social-login/auth-google)

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Groq API Docs](https://console.groq.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 💬 Support

- Issues? Check `TROUBLESHOOTING.md` (create this file with specific problems)
- Questions? Post in GitHub Discussions
- Want to contribute? PRs welcome!

## 📄 License

MIT License - do whatever you want with this code!

---

**Built with ❤️ for bootstrapped founders**

Good luck! 🚀
>>>>>>> 508eb7e (Initial commit - Interview Prep AI)
