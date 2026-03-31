import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, getRateLimitHeaders } from '@/lib/rate-limit'

// Example: Add rate limiting to any API route

export async function POST(req: NextRequest) {
  // Get identifier (IP address or user ID)
  const identifier = req.headers.get('x-forwarded-for') || 'anonymous'
  
  // Check rate limit: 10 requests per minute
  const rateLimitResult = rateLimit(identifier, 10, 60000)
  
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { 
        error: 'Too many requests. Please try again later.',
        resetTime: rateLimitResult.resetTime 
      },
      { 
        status: 429,
        headers: getRateLimitHeaders(identifier, 10)
      }
    )
  }

  // Your actual API logic here
  try {
    // ... do something
    
    return NextResponse.json(
      { success: true },
      { headers: getRateLimitHeaders(identifier, 10) }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Usage in chat API:
// Add this at the start of app/api/chat/route.ts:
//
// const identifier = userId || req.headers.get('x-forwarded-for') || 'anonymous'
// const rateLimitResult = rateLimit(identifier, 20, 60000) // 20 req/min
// if (!rateLimitResult.success) {
//   return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
// }
