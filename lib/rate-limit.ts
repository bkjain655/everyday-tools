// Minimal in-memory fixed-window rate limiter.
//
// This lives in the module scope of a single serverless instance, so it only
// throttles bursts that happen to land on the same warm instance. It is enough
// to blunt naive abuse of the contact form. Production upgrade: back this with
// Upstash Redis (@upstash/ratelimit + @upstash/redis) so the counter is shared
// across every instance and survives cold starts.

type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

export interface RateLimitResult {
  success: boolean
  remaining: number
  resetAt: number
}

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000): RateLimitResult {
  const now = Date.now()

  // Opportunistically drop expired buckets so the map cannot grow unbounded.
  if (buckets.size > 1000) {
    for (const [k, v] of buckets) {
      if (v.resetAt <= now) buckets.delete(k)
    }
  }

  const bucket = buckets.get(key)
  if (!bucket || bucket.resetAt <= now) {
    const resetAt = now + windowMs
    buckets.set(key, { count: 1, resetAt })
    return { success: true, remaining: limit - 1, resetAt }
  }

  bucket.count += 1
  return {
    success: bucket.count <= limit,
    remaining: Math.max(0, limit - bucket.count),
    resetAt: bucket.resetAt,
  }
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return headers.get("x-real-ip") ?? "unknown"
}
