// Simple rate limiting utility for API routes
// Prevents abuse on free tier

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

export function rateLimit(identifier: string, limit: number = 10, windowMs: number = 60000) {
  const now = Date.now()
  const entry = rateLimitMap.get(identifier)

  // Clean up expired entries every 1000 requests
  if (rateLimitMap.size > 1000) {
    rateLimitMap.forEach((value, key) => {
      if (value.resetTime < now) {
        rateLimitMap.delete(key)
      }
    })
  }

  if (!entry || entry.resetTime < now) {
    // Create new entry or reset expired one
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    })
    return { success: true, remaining: limit - 1 }
  }

  if (entry.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
    }
  }

  entry.count++
  return {
    success: true,
    remaining: limit - entry.count,
  }
}

// Get rate limit info for response headers
export function getRateLimitHeaders(identifier: string, limit: number = 10): Record<string, string> {
  const entry = rateLimitMap.get(identifier)
  
  const headers: Record<string, string> = {
    'X-RateLimit-Limit': limit.toString(),
    'X-RateLimit-Remaining': entry
      ? Math.max(0, limit - entry.count).toString()
      : limit.toString(),
  }

  if (entry) {
    headers['X-RateLimit-Reset'] = new Date(entry.resetTime).toISOString()
  }

  return headers
}
