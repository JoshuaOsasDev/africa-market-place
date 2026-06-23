import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;

  const isAuthPage = pathname.startsWith("/auth-user/login");

  let user: {
    role: "user" | "admin" | "vendor" | "super-admin";
    is_verified: boolean;
  } | null = null;
  //  Decode token safely
  if (token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      user = JSON.parse(Buffer.from(base64, "base64").toString("utf-8"));
    } catch (err) {
      console.log("Invalid token", err);
    }
  }

  //console.log(user, "users on proxy");
  const role = user?.role;

  //  CENTRALIZED ROUTE CONFIG
  const protectedRoutes = ["/user/dashboard", "/user/checkout"];

  const adminRoutes = ["/admin", "/super-admin"];
  const vendorRoutes = ["/vendor"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  const isVendorRoute = vendorRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // ============================================
  //  1. BLOCK UNAUTHENTICATED USERS (NAV PROTECTION)
  // ============================================
  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth-user/login", request.url));
  }

  // ============================================
  //  2. ROLE-BASED ACCESS CONTROL
  // ============================================

  // User routes
  if (pathname.startsWith("/user/dashboard")) {
    if (role !== "user") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Admin routes
  if (isAdminRoute && role !== "admin" && role !== "super-admin") {
    if (!user) {
      return NextResponse.redirect(new URL("/auth-user/login", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Vendor routes
  if (isVendorRoute && role !== "vendor") {
    if (!user) {
      return NextResponse.redirect(new URL("/auth-user/login", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ============================================
  // 🔄 3. REDIRECT BASED ON ROLE (HOME PAGE CONTROL)
  // ============================================
  if (pathname === "/") {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    if (role === "super-admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    if (role === "vendor") {
      return NextResponse.redirect(new URL("/vendor/dashboard", request.url));
    }
  }

  // ============================================
  //  4. PREVENT CROSS-ROLE ACCESS
  // ============================================
  if (role === "user") {
    if (isAdminRoute || isVendorRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (role === "admin" && isVendorRoute) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (role === "vendor" && isAdminRoute) {
    return NextResponse.redirect(new URL("/vendor/dashboard", request.url));
  }

  // ============================================
  // 5. BLOCK LOGGED-IN USERS FROM LOGIN PAGE
  // ============================================
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth-user/login",
    "/user/:path*",
    "/admin/:path*",
    "/vendor/:path*",
  ],
};
