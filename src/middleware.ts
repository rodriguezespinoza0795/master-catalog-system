import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isTokenValid } from "@/utils/isTokenValid";

// 1. Specify protected and public routes
const protectedRoutes = ["/home"];
const publicRoutes = [
  "/",
  "/auth/login",
  "/auth/register",
  "/auth/verify-email",
  "/auth/reset-password",
  "/auth/forgot-password",
];

export default async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  // 2. Check if the current route is protected or public
  const path = nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. verify if cookie exists
  const cookie = (await cookies()).get("accessToken")?.value;

  // 4. if cookie not exists and is protected route, redirect to login
  if (!cookie && isProtectedRoute) {
    console.log("redirecting to login because cookie not exists");
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  // 5. if cookie exists and is protected route, verify if it is valid
  if (cookie && isProtectedRoute && !isTokenValid(cookie)) {
    console.log("redirecting to login because cookie is invalid");
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  // 6. if cookie valid and is public route, redirect to home
  if (cookie && isPublicRoute && isTokenValid(cookie)) {
    console.log("redirecting to home because cookie is valid");
    return NextResponse.redirect(new URL("/home", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon|.*\\.(?:png|svg)$).*)"],
};
