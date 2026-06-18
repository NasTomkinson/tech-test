import { NextResponse } from "next/server";

import { auth } from "@/auth";

const loginPath = "/auth/login";
const authApiPublicPaths = [
  "/api/auth/callback",
  "/api/auth/csrf",
  "/api/auth/error",
  "/api/auth/providers",
  "/api/auth/session",
  "/api/auth/signin",
  "/api/auth/signout",
];

export default auth((request) => {
  const { nextUrl } = request;
  const isAuthenticated = Boolean(request.auth?.user);
  const isLoginRoute = nextUrl.pathname === loginPath;
  const isPublicAuthApiRoute = authApiPublicPaths.some(
    (path) => nextUrl.pathname === path || nextUrl.pathname.startsWith(`${path}/`),
  );

  if (isPublicAuthApiRoute) {
    return NextResponse.next();
  }

  if (isAuthenticated && isLoginRoute) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (!isAuthenticated && !isLoginRoute) {
    const loginUrl = new URL(loginPath, nextUrl);
    loginUrl.searchParams.set(
      "callbackUrl",
      `${nextUrl.pathname}${nextUrl.search}`,
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
