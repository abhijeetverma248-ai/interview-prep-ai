import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

// Cost optimization: Use different models for different tasks
const MODELS = {
  fast: 'llama-3.1-8b-instant', // Super fast, cheap, for simple tasks
  smart: 'llama-3.3-70b-versatile', // Better quality, for complex feedback
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function generateAIResponse(
  messages: ChatMessage[],
  taskType: 'resume' | 'interview' | 'general' = 'general'
): Promise<string> {
  try {
    // Choose model based on task complexity
    const model = taskType === 'general' ? MODELS.fast : MODELS.smart

    const completion = await groq.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    })

    return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.'
  } catch (error) {
    console.error('Groq API error:', error)
    throw new Error('Failed to generate AI response')
  }
}

// System prompts for different use cases
export const SYSTEM_PROMPTS = {
  resume: `You are an expert tech recruiter and career coach. Analyze resumes for:
1. ATS compatibility (keywords, formatting)
2. Impact statements (use of metrics, action verbs)
3. Relevance to tech roles (SDE, PM, Data)
4. Structure and clarity

Provide specific, actionable feedback. Be encouraging but honest.`,

  interview_behavioral: `You are an experienced tech interviewer conducting a behavioral interview.
Ask thoughtful STAR (Situation, Task, Action, Result) questions.
Evaluate answers for:
- Clarity and structure
- Demonstration of skills
- Self-awareness
- Culture fit

Provide constructive feedback after each answer.`,

  interview_technical: `You are a senior engineer conducting a technical interview.
For coding questions: Focus on problem-solving approach, not just correct answers.
For system design: Evaluate scalability, trade-offs, and communication.

Give hints if stuck, and provide detailed feedback on the approach.`,

  general: `You are a friendly career assistant helping with tech interview preparation.
Be concise, practical, and encouraging. Provide specific examples when possible.`,
}
