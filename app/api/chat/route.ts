import { NextRequest, NextResponse } from 'next/server'
import { generateAIResponse, SYSTEM_PROMPTS } from '@/lib/ai'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { messages, conversationId, userId, taskType } = await req.json()

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      )
    }

    // Check user usage limits (free tier = 3 conversations)
    if (userId) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('usage_count, is_premium')
        .eq('id', userId)
        .single()

      if (profile && !profile.is_premium && profile.usage_count >= 3) {
        return NextResponse.json(
          { error: 'Free tier limit reached. Please upgrade to continue.' },
          { status: 403 }
        )
      }
    }

    // Prepare messages with system prompt
    const systemPrompt = SYSTEM_PROMPTS[taskType as keyof typeof SYSTEM_PROMPTS] || SYSTEM_PROMPTS.general
    const fullMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages,
    ]

    // Generate AI response
    const response = await generateAIResponse(fullMessages, taskType)

    // Save message to database if conversationId provided
    if (conversationId) {
      await supabase.from('messages').insert([
        {
          conversation_id: conversationId,
          role: 'user',
          content: messages[messages.length - 1].content,
        },
        {
          conversation_id: conversationId,
          role: 'assistant',
          content: response,
        },
      ])

      // Increment usage count
      if (userId) {
        await supabase.rpc('increment_usage', { user_id: userId })
      }
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    )
  }
}
