import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { Session } from "@/auth";

const authRoutes = ["/login", "/register"];
const uploadRoute = "/upload";

export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const isAuthRoute = authRoutes.includes(pathName);
  const isUploadRoute = pathName === uploadRoute;

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: process.env.BETTER_AUTH_URL,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  if (!session) {
    if (isUploadRoute) {
      return NextResponse.next();
    }

    if (isAuthRoute) {
      return NextResponse.next();
    }
  }

  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isUploadRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
