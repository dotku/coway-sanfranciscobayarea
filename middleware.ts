import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export async function middleware(request: NextRequest) {
  // Skip auth processing for public referral pages
  if (request.nextUrl.pathname.startsWith("/r/")) {
    return NextResponse.next();
  }

  const authRes = await auth0.middleware(request);

  if (request.nextUrl.pathname.startsWith("/auth")) {
    // Suppress 401 on /auth/profile for unauthenticated users
    // Return empty JSON so Auth0Provider treats it as "no user" without a console error
    if (
      request.nextUrl.pathname === "/auth/profile" &&
      authRes.status === 401
    ) {
      return NextResponse.json(null, { status: 200 });
    }
    return authRes;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
