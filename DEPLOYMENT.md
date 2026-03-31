# 🚀 Deployment Guide - Get Your App Live in 10 Minutes

## Option 1: Deploy via GitHub (Recommended)

### Step 1: Create GitHub Repository (3 min)

1. Go to https://github.com
2. Click "New" (green button, top left)
3. Repository name: `interview-prep-ai`
4. Keep it Public (free)
5. Don't initialize with anything
6. Click "Create repository"

### Step 2: Push Your Code (2 min)

```bash
# In your project folder, run:
git init
git add .
git commit -m "Initial commit - Interview Prep AI"

# Copy the commands GitHub shows you:
git remote add origin https://github.com/YOUR-USERNAME/interview-prep-ai.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel (5 min)

1. Go to https://vercel.com
2. Click "Sign Up" → Choose "Continue with GitHub"
3. After login, click "Add New..." → "Project"
4. Find your `interview-prep-ai` repo
5. Click "Import"

**IMPORTANT: Add Environment Variables**

Before clicking Deploy, scroll down to "Environment Variables"

Add these ONE BY ONE:

```
NEXT_PUBLIC_SUPABASE_URL = https://<your-supabase-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = <your-supabase-anon-key>
SUPABASE_SERVICE_ROLE_KEY = <your-supabase-service-role-key>
GROQ_API_KEY = <your-groq-api-key>
NEXTAUTH_SECRET = <your-nextauth-secret>
NEXTAUTH_URL = https://your-app.vercel.app (we'll fix this)
```

6. Click "Deploy"
7. Wait 2-3 minutes
8. You'll see "Congratulations!" 🎉

### Step 4: Update NEXTAUTH_URL

1. Copy your deployment URL (e.g., `interview-prep-ai.vercel.app`)
2. In Vercel dashboard, go to Settings → Environment Variables
3. Find `NEXTAUTH_URL`
4. Click Edit
5. Change to: `https://interview-prep-ai.vercel.app` (your actual URL)
6. Click Save
7. Go to Deployments tab → Click "..." → Redeploy

**DONE! Your app is live! 🌍**

---

## Option 2: Deploy via Vercel CLI (Faster but more technical)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name? interview-prep-ai
# - Directory? ./
# - Want to override settings? N

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste value, press Enter
# Repeat for all env variables

# Deploy to production
vercel --prod
```

---

## 🌐 Custom Domain (Optional - ₹199/year)

### If You Want yourname.com Instead of vercel.app:

1. Buy domain from:
   - Namecheap.com (₹199/year for .in)
   - GoDaddy India
   - Hostinger

2. In Vercel dashboard:
   - Go to Settings → Domains
   - Click "Add"
   - Enter your domain: `interviewprep.in`
   - Follow DNS setup instructions
   - Usually takes 10-60 minutes

---

## 🔄 Continuous Deployment (Auto-deploy on code changes)

**Already set up!** Every time you push to GitHub:

```bash
git add .
git commit -m "Added new feature"
git push
```

Vercel automatically:
1. Detects the push
2. Builds your app
3. Deploys to production
4. Updates your live site in 2 minutes

---

## 📊 Post-Deployment Checklist

### Test Everything Live:

- [ ] Homepage loads
- [ ] Resume upload works
- [ ] Chat interface responds
- [ ] Pricing page displays correctly
- [ ] Mobile view looks good

### Analytics Setup (Free):

**Option 1: Vercel Analytics (Built-in)**
1. Go to your project dashboard
2. Click "Analytics" tab
3. Enable (free tier = 100k events/month)

**Option 2: Umami (Self-hosted, privacy-friendly)**
1. Fork: https://github.com/umami-software/umami
2. Deploy to Vercel (separate project)
3. Connect to your Supabase database
4. Add tracking script to your app

### Monitor Usage:

Check Supabase daily:
- SQL Editor → Run:
```sql
SELECT COUNT(*) as total_users FROM profiles;
SELECT COUNT(*) as premium_users FROM profiles WHERE is_premium = true;
SELECT COUNT(*) as conversations_today 
FROM conversations 
WHERE created_at > NOW() - INTERVAL '1 day';
```

---

## 🐛 Common Deployment Issues

### Build fails: "Module not found"
**Fix:**
```bash
# Locally, test the build:
npm run build

# If it works locally but fails on Vercel:
# Check that all files are committed:
git status
git add .
git commit -m "Fix build"
git push
```

### Environment variables not working
**Fix:**
1. Vercel dashboard → Settings → Environment Variables
2. Make sure ALL variables are there
3. Check for typos (NEXT_PUBLIC_SUPABASE_URL not NEXT_PUBLIC_SUPABASE_UR)
4. After changing env vars, redeploy:
   - Deployments tab → ... → Redeploy

### API routes return 500 errors
**Fix:**
1. Check Vercel Function Logs:
   - Deployments → Click your deployment → Functions
   - Click on the failing function
   - Read error message
2. Usually: Missing env variable or Supabase connection issue

### Files too large / deployment timeout
**Fix:**
```bash
# Check .gitignore includes:
node_modules/
.next/
.env

# If .next got committed:
git rm -r --cached .next
git commit -m "Remove .next"
git push
```

---

## 💰 Vercel Free Tier Limits

- ✅ Unlimited personal projects
- ✅ 100GB bandwidth/month (enough for 10k-50k users)
- ✅ Serverless functions included
- ✅ Automatic HTTPS
- ✅ Edge Network (fast globally)

**When you exceed:**
- 100GB bandwidth = ₹1,500/month for Pro plan
- But by then you'll have revenue to cover it!

---

## 🔐 Security Checklist

Before going public:

- [ ] `.env` file is in `.gitignore` (check it's not on GitHub!)
- [ ] No API keys hardcoded in code
- [ ] Supabase RLS (Row Level Security) is enabled
- [ ] Rate limiting enabled on API routes
- [ ] CORS properly configured

---

## 📈 Post-Launch

### Day 1-7:
- Monitor Vercel logs for errors
- Check Supabase for user signups
- Test on different devices/browsers

### Week 2:
- Share on social media
- Post on Reddit (with Vercel link!)
- Send to friends

### Month 1:
- Review analytics
- Find most used features
- Fix most common issues

---

## 🆘 Emergency Fixes

**Site is down:**
1. Check Vercel status: https://vercel.com/status
2. Check Supabase status: https://status.supabase.com
3. View deployment logs in Vercel dashboard

**Urgent rollback:**
1. Go to Deployments
2. Find last working deployment
3. Click "..." → "Promote to Production"

**Too many users, costs rising:**
1. Add aggressive rate limiting
2. Cache AI responses
3. Increase free tier limits to reduce API calls

---

## 📞 Get Help

- Vercel Discord: https://vercel.com/discord
- Supabase Discord: https://discord.supabase.com
- Post in r/nextjs
- Email support@vercel.com (they're helpful!)

---

**Your app is now LIVE! Share the link! 🎉**

Next: Focus on getting users → See MARKETING.md
