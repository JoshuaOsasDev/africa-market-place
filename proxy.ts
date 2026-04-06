import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;

  const isAuthPage = pathname.startsWith("/auth-user/login");

  let user: { role: "user" | "admin" | "vendor" } | null = null;

  // ✅ Decode token
  if (token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      user = JSON.parse(Buffer.from(base64, "base64").toString("utf-8"));
    } catch (err) {
      console.log("Invalid token", err);
    }
  }

  const role = user?.role;

  console.log(role, "USER ROLE IN PROXY");
  //middleware to prevent user and admin/vendor from accessing each other's dashboards details page and checkout page
  if (pathname.startsWith("/user/dashboard")) {
    if (!user) {
      return NextResponse.redirect(new URL("/auth-user/login", request.url));
    }

    if (role !== "user") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (!user && pathname.startsWith("/user/checkout")) {
    return NextResponse.redirect(new URL("/auth-user/login", request.url));
  }

  //sconsole.log("USER:", user);

  //  Admin/Vendor should NOT access home
  if (pathname === "/") {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    if (role === "vendor") {
      return NextResponse.redirect(new URL("/vendor/dashboard", request.url));
    }
  }

  //  Normal users cannot access admin/vendor dashboards
  if (role === "user") {
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (pathname.startsWith("/vendor")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  //  Admin cannot access vendor routes (optional)
  if (role === "admin" && pathname.startsWith("/vendor")) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  //  Vendor cannot access admin routes (optional)
  if (role === "vendor" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/vendor/dashboard", request.url));
  }

  //  Logged in user shouldn't go back to login
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
