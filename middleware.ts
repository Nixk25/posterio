import { NextResponse, type NextRequest } from "next/server";

const authRoutes = ["/login", "/register"];
const protectedRoutes = ["/upload", "/profile"];

export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const isAuthRoute = authRoutes.includes(pathName);
  const isProtectedRoute = protectedRoutes.includes(pathName);

  // Check for session cookie existence (fast, no API call)
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  // If no session cookie and trying to access protected route
  if (!sessionCookie && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If has session cookie and trying to access auth routes, redirect to home
  if (sessionCookie && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow everything else
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
