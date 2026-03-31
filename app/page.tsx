import ChatInterface from '@/components/ChatInterface'
import ResumeUpload from '@/components/ResumeUpload'
import { Briefcase, MessageSquare, FileText, Zap } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold">InterviewPrep AI</h1>
          </div>
          <nav className="flex gap-4">
            <a href="#chat" className="text-gray-600 hover:text-blue-600">Chat</a>
            <a href="#resume" className="text-gray-600 hover:text-blue-600">Resume</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Ace Your Tech Interview
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          AI-powered interview prep for SDE, PM, and Data roles. Get instant feedback,
          practice unlimited times, and land your dream job.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#resume"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Analyze Resume (Free)
          </a>
          <a
            href="#chat"
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Start Practicing
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <MessageSquare className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Mock Interviews</h3>
            <p className="text-gray-600">
              Practice behavioral and technical interviews with AI that gives instant,
              actionable feedback.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <FileText className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Resume Review</h3>
            <p className="text-gray-600">
              Get detailed feedback on ATS compatibility, impact statements, and overall structure.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <Zap className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Instant Feedback</h3>
            <p className="text-gray-600">
              No waiting for reviewers. Get comprehensive feedback in seconds, not days.
            </p>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="container mx-auto px-4 py-16">
        <ResumeUpload />
      </section>

      {/* Chat Section */}
      <section id="chat" className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Practice Interview Questions
          </h2>
          <ChatInterface taskType="interview" />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-4 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <p className="text-4xl font-bold mb-6">₹0</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>3 resume reviews per month</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>5 practice questions per week</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Basic feedback</span>
              </li>
            </ul>
            <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50">
              Get Started
            </button>
          </div>

          {/* Premium Tier */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 rounded-lg shadow-lg relative">
            <div className="absolute -top-4 right-4 bg-yellow-400 text-blue-900 px-4 py-1 rounded-full text-sm font-bold">
              POPULAR
            </div>
            <h3 className="text-2xl font-bold mb-2">Premium</h3>
            <p className="text-4xl font-bold mb-6">
              ₹499<span className="text-lg font-normal">/month</span>
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="mt-1">✓</span>
                <span>Unlimited resume reviews</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">✓</span>
                <span>Unlimited mock interviews</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">✓</span>
                <span>Detailed feedback with examples</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">✓</span>
                <span>Company-specific prep</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">✓</span>
                <span>Priority support</span>
              </li>
            </ul>
            <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Upgrade Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2026 InterviewPrep AI. Built with ❤️ for job seekers.</p>
        </div>
      </footer>
    </main>
  )
}
