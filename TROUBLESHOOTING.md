# 🔧 TROUBLESHOOTING GUIDE

Common issues and how to fix them.

## 🚨 Installation Issues

### "npm install" fails

**Error:** `npm ERR! code ENOENT`
```bash
# Fix: Make sure you're in the right folder
cd interview-prep-starter
npm install
```

**Error:** `npm ERR! ERESOLVE unable to resolve dependency tree`
```bash
# Fix: Use legacy peer deps
npm install --legacy-peer-deps
```

**Error:** `gyp ERR!` or Python errors
```bash
# Fix: Some packages need build tools (safe to ignore usually)
# Or install build tools:
# Mac: xcode-select --install
# Windows: npm install --global windows-build-tools
```

---

## 🔌 Environment Variable Issues

### "Cannot find module" or API errors

**Check your .env file exists:**
```bash
ls -la | grep .env
# Should show .env file
```

**Check .env format (NO quotes, NO spaces):**
```bash
# WRONG
GROQ_API_KEY = "gsk_xxxxx"
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"

# CORRECT
GROQ_API_KEY=gsk_xxxxx
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
```

**Restart dev server after changing .env:**
```bash
# Stop: Ctrl+C
npm run dev
```

---

## 🗄️ Supabase Issues

### "Invalid API key" or "Failed to fetch"

**Check URL has no trailing slash:**
```bash
# WRONG
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co/

# CORRECT
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
```

**Verify keys in Supabase dashboard:**
1. Settings → API
2. Copy anon key (not service_role for NEXT_PUBLIC)
3. Copy service_role key for SUPABASE_SERVICE_ROLE_KEY

### "Row Level Security policy violation"

**Check you ran the schema file:**
1. Supabase → SQL Editor
2. Paste ALL of supabase-schema.sql
3. Run
4. Should see "Success"

**Check policies exist:**
```sql
-- Run in SQL Editor
SELECT * FROM pg_policies WHERE schemaname = 'public';
```

### "relation does not exist"

**Tables weren't created:**
```bash
# Re-run schema
# In Supabase SQL Editor:
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS conversations CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

# Then paste schema again and run
```

---

## 🤖 Groq API Issues

### "API key invalid"

**Check format:**
- Should start with `gsk_`
- No spaces before/after
- No quotes

**Regenerate if needed:**
1. console.groq.com
2. API Keys
3. Create new key
4. Update .env

### "Rate limit exceeded"

**Free tier limits:**
- 30 requests per minute
- 14,400 requests per day

**Fixes:**
1. Add delay between requests
2. Implement caching
3. Use slower model: `llama-3.1-8b-instant`

### "Model not found"

**Check model names in lib/ai.ts:**
```typescript
// Available models:
'llama-3.1-8b-instant'  // Fastest
'llama-3.1-70b-versatile'  // Best quality
'mixtral-8x7b-32768'  // Good balance
```

---

## 📄 Resume Upload Issues

### "Could not extract text from file"

**Common causes:**
1. Scanned PDF (image, not text)
   - Fix: Use OCR PDF or re-save as text PDF
2. Password-protected PDF
   - Fix: Remove password first
3. Corrupted file
   - Fix: Try different file

### "File too large"

**Current limit: 5MB**

**Fix:**
1. Compress PDF online (ilovepdf.com)
2. Or increase limit in resume/analyze/route.ts

### "Unsupported file type"

**Only PDF and DOCX supported**

**To add other formats:**
- Edit `app/api/resume/analyze/route.ts`
- Add parsers for .txt, .rtf, etc.

---

## 💬 Chat Issues

### Chat doesn't respond

**Check browser console (F12):**
```
Network tab → Look for failed requests
Console tab → Look for errors
```

**Common fixes:**
1. Check API route exists: `/app/api/chat/route.ts`
2. Check GROQ_API_KEY in .env
3. Check Supabase connection
4. Restart dev server

### Responses are slow (>10 seconds)

**Groq is usually fast (<3s). If slow:**

1. Check your internet
2. Switch models in lib/ai.ts:
```typescript
model: 'llama-3.1-8b-instant'  // Faster
```
3. Check Groq status: status.groq.com

### Chat shows error messages

**"Free tier limit reached"**
- User hit 3 review limit
- Check profiles table usage_count
- Reset manually or upgrade to premium

**"Too many requests"**
- Hit rate limit
- Wait 1 minute
- Add rate limiting (see examples/)

---

## 🎨 UI/Styling Issues

### Styles not loading

**Check Tailwind is working:**
```bash
# Restart dev server
npm run dev

# Check tailwind.config.js exists
# Check globals.css imports Tailwind
```

### Mobile view broken

**Test responsiveness:**
1. Open dev tools (F12)
2. Click device toggle icon
3. Try different screen sizes

**Fix:** Add responsive classes
```tsx
// Use Tailwind breakpoints
className="text-sm md:text-base lg:text-lg"
```

---

## 🚀 Deployment Issues

### Vercel build fails

**Check build locally first:**
```bash
npm run build
# If this fails, fix errors before deploying
```

**Common build errors:**

**TypeScript errors:**
```bash
# Check for red squiggles in VS Code
# Fix type errors or temporarily:
// @ts-ignore
```

**Missing env variables:**
- Add ALL env vars in Vercel dashboard
- Settings → Environment Variables

**Module not found:**
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Deployment succeeds but site is broken

**Check environment variables:**
1. Vercel → Settings → Environment Variables
2. Make sure NEXTAUTH_URL matches your domain
3. Redeploy after changing env vars

**Check function logs:**
1. Vercel → Deployments → Click deployment
2. Functions tab → View logs
3. Look for errors

---

## 📊 Database Issues

### Can't see data in Supabase

**Check Table Editor:**
1. Supabase → Table Editor
2. Select table (profiles, conversations, messages)
3. If empty → No data yet (normal for new project)

**Query data manually:**
```sql
-- SQL Editor
SELECT * FROM profiles LIMIT 10;
SELECT * FROM conversations LIMIT 10;
```

### Usage count not incrementing

**Check function exists:**
```sql
-- SQL Editor
SELECT * FROM pg_proc WHERE proname = 'increment_usage';
```

**Test function:**
```sql
-- Create test profile if needed
INSERT INTO profiles (id, email, usage_count)
VALUES ('test-id', 'test@test.com', 0);

-- Increment
SELECT increment_usage('test-id');

-- Check
SELECT usage_count FROM profiles WHERE id = 'test-id';
```

---

## 🔐 Auth Issues

### Can't sign up

**Check Supabase auth enabled:**
1. Supabase → Authentication → Settings
2. Enable Email provider
3. Disable email confirmation (for testing)

### Can't sign in

**Check credentials:**
- Email correct?
- Password correct?
- Account exists?

**Check Supabase logs:**
1. Supabase → Logs
2. Filter by Auth logs
3. Look for errors

---

## ⚡ Performance Issues

### Page loads slowly

**Check bundle size:**
```bash
npm run build
# Look for large chunks
```

**Optimize:**
1. Use dynamic imports for heavy components
2. Optimize images
3. Remove unused dependencies

### API calls are slow

**Add timing logs:**
```typescript
console.time('API call')
// ... your code
console.timeEnd('API call')
```

**Optimize:**
1. Cache responses
2. Use faster AI model
3. Reduce data fetched from DB

---

## 🐛 General Debugging Tips

### Read error messages carefully
- Error usually tells you what's wrong
- Google the exact error message
- Check Stack Overflow

### Use console.log
```typescript
console.log('Got here!', { someVariable })
// Helps track where code breaks
```

### Check browser dev tools
```
F12 → Console (for errors)
F12 → Network (for failed requests)
F12 → Application (for local storage)
```

### Simplify to find the issue
```typescript
// Comment out code until it works
// Then add back piece by piece
```

### Ask for help
- r/nextjs (very helpful!)
- Vercel Discord
- Supabase Discord
- Stack Overflow

---

## 📞 Still Stuck?

1. **Check official docs:**
   - Next.js: nextjs.org/docs
   - Supabase: supabase.com/docs
   - Groq: console.groq.com/docs

2. **Search existing issues:**
   - GitHub Issues for each library
   - Stack Overflow

3. **Ask the community:**
   - Reddit r/nextjs
   - Discord servers
   - Twitter with #nextjs #help

4. **Last resort:**
   - Post detailed issue on GitHub
   - Include error message
   - Include steps to reproduce
   - Include environment (OS, Node version)

---

## 🎯 Prevention Tips

**To avoid issues:**

✅ Read error messages fully
✅ Test locally before deploying
✅ Keep dependencies updated
✅ Use TypeScript (catches errors early)
✅ Write console.logs liberally
✅ Commit working code to Git
✅ Document your changes
✅ Take breaks when frustrated!

---

**Remember:** Every developer deals with bugs. It's normal!

The difference between good and great developers:
- Good developers avoid bugs
- **Great developers debug efficiently**

You got this! 💪
