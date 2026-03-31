import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (expand as you add tables)
export interface Profile {
  id: string
  email: string
  created_at: string
  usage_count: number
  is_premium: boolean
  premium_until?: string
}

export interface Conversation {
  id: string
  user_id: string
  title: string
  type: 'resume' | 'interview' | 'general'
  created_at: string
}

export interface Message {
  id: string
  conversation_id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
}
