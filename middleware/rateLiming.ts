// lib/rateLimiter.ts
import rateLimit from "express-rate-limit";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Express-style rate limiter (5 requests / 15 minutes per IP)
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2,                   // Limit each IP to 5 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "too_many_requests",
    message: "Too many requests, please try again later."
  },
  keyGenerator: (req: any) => {
    // For Next.js, use headers to extract IP
    const forwarded = req.headers?.["x-forwarded-for"];
    if (typeof forwarded === "string") {
      return forwarded.split(",")[0];
    }
    return req.ip || "unknown";
  }
});

// Adapter: Convert express-rate-limit to Next.js middleware
export function withRateLimit(limiter: ReturnType<typeof rateLimit>) {
  return async (req: NextRequest) =>
    new Promise<NextResponse | null>((resolve) => {
      limiter(
        // Fake Express `req` object
        req as any,
        {
          // Express `res.end` equivalent
          end: (msg: any) =>
            resolve(
              NextResponse.json(
                typeof msg === "string" ? { message: msg } : msg,
                { status: 429 }
              )
            ),
          setHeader: () => {}, // ignore headers
        } as any,
        () => resolve(null) // continue if not rate-limited
      );
    });
}
