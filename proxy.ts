// This middleware runs on every request that matches the `matcher` rules below
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  console.log("CODE RAN 1");
  const user = false; // example auth check

  //   if (url.pathname === "/admin/dashboard" && !user) {
  //       console.log('CODE RAN 2')
  //   return NextResponse.redirect(
  //     new URL("/auth-user/login", request.url)
  //   );
  // }

  return NextResponse.next();
}

// Configuration for the middleware
export const config = {
  // This defines the routes where the middleware should run.
  // Only requests to these paths will trigger the middleware.
  /*     matcher: ["/admin/dashboard", "/payment"], */
};
