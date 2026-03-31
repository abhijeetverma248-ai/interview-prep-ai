# 🚀 QUICK START - For Complete Beginners

## You Need 30 Minutes and These Free Accounts

### Step 1: Install Node.js (5 minutes)
1. Go to https://nodejs.org
2. Download the LTS version (left button)
3. Install it (click Next → Next → Install)
4. Test: Open terminal and type `node --version` (should show v18 or higher)

### Step 2: Get the Code (2 minutes)
```bash
# Download this folder to your computer
# Open terminal in this folder
npm install
```

Wait 2-3 minutes for packages to download.

### Step 3: Set Up Supabase (10 minutes)

**Go to supabase.com:**
1. Click "Start your project"
2. Sign in with GitHub
3. Click "New project"
4. Fill in:
   - Name: `interview-prep`
   - Database Password: Make something strong (save it!)
   - Region: Choose closest to India (e.g., Mumbai)
   - Click "Create new project"

**Wait 2 minutes for project to be ready**

**Run the database setup:**
1. In Supabase dashboard, click "SQL Editor" (left sidebar)
2. Click "New Query"
3. Open the file `supabase-schema.sql` from this folder
4. Copy EVERYTHING from that file
5. Paste into Supabase SQL Editor
6. Click "Run" (bottom right)
7. Should say "Success. No rows returned"

**Get your API keys:**
1. Click "Settings" (gear icon, bottom left)
2. Click "API"
3. Copy these TWO things:
   - Project URL (looks like: https://abcdefgh.supabase.co)
   - anon public key (long JWT-style string)
   - service_role key (another long string, find it below)

### Step 4: Get Groq API Key (5 minutes)

1. Go to https://console.groq.com
2. Click "Sign Up" (use GitHub login - easiest)
3. Click "API Keys" in left sidebar
4. Click "Create API Key"
5. Give it a name: "interview-prep"
6. Copy the Groq API key
7. **IMPORTANT: Save it somewhere safe - you can't see it again!**

### Step 5: Create .env File (3 minutes)

1. Copy the file `.env.example` and rename the copy to `.env`
2. Open `.env` in any text editor
3. Fill in the values:

```bash
# Paste your Supabase URL here
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co

# Paste your Supabase anon key here
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>

# Paste your Supabase service role key here
SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>

# Paste your Groq API key here
GROQ_API_KEY=<your-groq-api-key>

# Generate a random secret (instructions below)
NEXTAUTH_SECRET=put_random_string_here

# Keep this as is
NEXTAUTH_URL=http://localhost:3000
```

**Generate NEXTAUTH_SECRET:**

**On Mac/Linux:**
```bash
openssl rand -base64 32
```

**On Windows:**
1. Open PowerShell
2. Type this and press Enter:
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
```

Copy the output and paste it in `.env` as NEXTAUTH_SECRET

### Step 6: Run It! (2 minutes)

```bash
npm run dev
```

Wait 10 seconds. You should see:
```
✓ Ready in 2.3s
○ Local: http://localhost:3000
```

**Open your browser:** http://localhost:3000

**YOU'RE DONE! 🎉**

---

## 🧪 Test It Works

### Test 1: Resume Upload
1. Scroll to "Resume Analysis" section
2. Click to upload a resume (any PDF or Word doc)
3. Click "Analyze Resume"
4. Wait 5-10 seconds
5. Should see AI feedback!

### Test 2: Chat
1. Scroll to "Practice Interview Questions"
2. Type: "Give me a behavioral interview question"
3. Press Enter or click send
4. Should get a response in 2-3 seconds!

---

## ❌ If Something Goes Wrong

### Error: "Cannot find module"
```bash
rm -rf node_modules
npm install
```

### Error: "Supabase connection failed"
- Check your `.env` file
- Make sure URLs don't have spaces or quotes
- Verify you copied the FULL keys

### Error: "Groq API error"
- Check your Groq API key in `.env`
- Make sure the key is correct and has no extra spaces or quotes
- Verify you're not hitting rate limits (free tier = 30 requests/min)

### Error: "Port 3000 already in use"
```bash
# Kill the process using port 3000
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
# Note the PID, then:
taskkill /PID <number> /F
```

### Resume upload doesn't work
- Check file size < 5MB
- Try a different PDF
- Check browser console (F12) for errors

---

## 🎯 What To Do Next

### Immediate (This Week):
1. **Test thoroughly** - Upload different resumes, try various questions
2. **Share with 5 friends** - Get honest feedback
3. **Fix obvious bugs** - Note what confuses users

### Week 2-3:
1. **Improve prompts** - Based on bad AI responses you see
2. **Add features** - Maybe company-specific prep?
3. **Make it pretty** - Tweak colors, add your branding

### Week 4:
1. **Deploy to Vercel** (see main README)
2. **Post on Reddit** r/developersIndia
3. **Get first users!**

---

## 💡 Pro Tips

**Reduce AI Costs:**
- File `lib/ai.ts`, line 27: Change to `llama-3.1-8b-instant` (faster, cheaper)
- This works fine for simple tasks

**Speed Up Development:**
- Install VS Code extension: "Tailwind CSS IntelliSense"
- Use ChatGPT/Claude to help debug errors (copy-paste error messages)

**Get Free Help:**
- Post issues in r/nextjs (very helpful community)
- Search GitHub for similar projects
- Check Next.js/Supabase Discord servers

---

## 📱 Share Your Progress!

When you get it working, share a screenshot on:
- Twitter with #buildinpublic
- LinkedIn (tech recruiters will see it!)
- r/SideProject on Reddit

**This itself is portfolio material!**

---

Need help? Check the main README.md or Google the error message.

**You got this! 🚀**
