# Changelog

All notable changes to InterviewPrep AI will be documented here.

## [0.1.0] - 2024-03-21 - Initial Release

### Added
- ✅ Basic chat interface with AI responses
- ✅ Resume upload and analysis (PDF/DOCX support)
- ✅ Groq AI integration (Llama 3.1)
- ✅ Supabase authentication and database
- ✅ Usage tracking for free tier (3 reviews/month)
- ✅ Premium tier structure (ready for payments)
- ✅ Responsive UI with Tailwind CSS
- ✅ Landing page with pricing

### Tech Stack
- Next.js 14 (App Router)
- Supabase (Auth + Database)
- Groq API (Free tier)
- Vercel (Hosting)
- TypeScript

### Known Issues
- [ ] No conversation history persistence yet
- [ ] No email notifications
- [ ] No payment integration (Razorpay coming soon)
- [ ] Limited error handling in some edge cases

---

## [Unreleased] - Planned Features

### High Priority
- [ ] Save conversation history to database
- [ ] User dashboard showing usage stats
- [ ] Razorpay payment integration
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Interview question bank (categorized)

### Medium Priority
- [ ] Company-specific interview prep (Google, Amazon, etc.)
- [ ] LinkedIn profile analyzer
- [ ] Salary negotiation scripts
- [ ] Cover letter generator
- [ ] Dark mode
- [ ] Export chat history as PDF

### Low Priority
- [ ] Video mock interviews
- [ ] Chrome extension for quick resume scan
- [ ] Mobile app (React Native)
- [ ] Referral system
- [ ] Affiliate partnerships

### Performance
- [ ] Implement response caching
- [ ] Add loading skeletons
- [ ] Optimize bundle size
- [ ] Add service worker for offline support

### Analytics
- [ ] Track most asked questions
- [ ] User funnel analysis
- [ ] A/B testing for pricing
- [ ] Cohort retention tracking

---

## Version Naming

- **0.x.x** - Pre-launch, MVP iterations
- **1.0.0** - Public launch with payments
- **1.x.x** - Feature additions
- **2.0.0** - Major redesign/rebuild

---

## How to Contribute

1. Pick an item from "Unreleased"
2. Create a branch: `git checkout -b feature/interview-bank`
3. Make changes
4. Test locally
5. Submit PR with description

---

## Update Log

### Week 1
- Built core chat functionality
- Integrated Groq API
- Set up Supabase

### Week 2
- Added resume upload
- Implemented usage limits
- Created landing page

### Week 3
- Deployed to Vercel
- Got first 10 beta users
- Fixed major bugs

### Week 4
- Improved prompts based on feedback
- Added rate limiting
- Wrote documentation

---

**Last Updated:** 2024-03-21
