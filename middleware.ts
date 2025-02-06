import { NextResponse,NextRequest } from "next/server";
import { isAuthenticated } from "@/lib/isAuthenticated";

// Apply middleware to API routes
export const config = {
  matcher: "/api/car/:path",
};

export async function middleware(req:NextRequest) {
    const isAuth = await isAuthenticated(req)
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Attach user data to request headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("X-User-Id", (isAuth));

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 403 });
  }
}

