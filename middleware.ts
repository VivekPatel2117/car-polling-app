import { NextResponse,NextRequest } from "next/server";
import { isAuthenticated } from "@/lib/isAuthenticated";

// Apply middleware to API routes
export const config = {
  matcher: ["/api/car/:path*","/api/car/book/create","/api/user"],
};

export async function middleware(req:NextRequest) {
    let isAuth = await isAuthenticated(req)
    isAuth = JSON.parse(isAuth as string);
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Attach user data to request headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("X-User-Id", JSON.stringify(isAuth));

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 403 });
  }
}

