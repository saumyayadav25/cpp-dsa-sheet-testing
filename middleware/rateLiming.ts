import { rateLimit } from "express-rate-limit";
import { NextRequest, NextResponse } from "next/server";

const getIP = (req: NextRequest) => {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIP = req.headers.get("x-real-ip");
  console.log("forwardedFor : ", forwardedFor);
  console.log("realIP : ", realIP);
  // Return the first IP found, prioritizing x-forwarded-for
  return forwardedFor?.split(",")[0] ?? realIP ?? "";
};

const apiLimiter = rateLimit({
  windowMs: 10 * 10 * 1000, // 10 minutes
  limit: 5, // Let's set a smaller limit for testing purposes
  standardHeaders: "draft-7",
  legacyHeaders: false,

  // Override the key generator to use the IP address from the headers
  keyGenerator: (req) => getIP(req as unknown as NextRequest),

  handler: (_, res) => {
    // This handler function is now correctly used by the `limiter` instance
    // to send a 429 response when the limit is exceeded.
    return res.status(429).json({
      message: "Too many requests, please try again after 15 minutes.",
    });
  },
});

// Create a mock Express-like response object
const res = {
  status: (statusCode: number) => {
    // Return a function that sends a JSON response
    return {
      json: (data: any) => NextResponse.json(data, { status: statusCode }),
      send: (data: any) => NextResponse.json(data, { status: statusCode }),
    };
  },
  // Mock the setHeader function to avoid the TypeError
  setHeader: (name: string, value: string) => {},
};

export { apiLimiter, res };
