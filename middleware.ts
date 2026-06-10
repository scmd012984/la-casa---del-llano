import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 8;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now >= entry.resetAt) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function shouldForceHttps(request: NextRequest): boolean {
  if (process.env.NODE_ENV !== "production") return false;
  if (request.headers.get("x-forwarded-proto") !== "http") return false;
  // No redirigir POST/PUT: pierde el body y rompe /api/reservation.
  if (request.method !== "GET" && request.method !== "HEAD") return false;

  const host = request.headers.get("host") ?? "";
  if (/^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(host)) return false;

  return true;
}

export function middleware(request: NextRequest) {
  if (shouldForceHttps(request)) {
    const httpsUrl = request.nextUrl.clone();
    httpsUrl.protocol = "https:";
    return NextResponse.redirect(httpsUrl, 301);
  }

  if (
    request.method === "POST" &&
    request.nextUrl.pathname.startsWith("/api/reservation")
  ) {
    if (isRateLimited(getClientIp(request))) {
      return NextResponse.json(
        {
          ok: false,
          error: "Demasiadas solicitudes. Espera un minuto e intenta de nuevo.",
        },
        { status: 429 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
