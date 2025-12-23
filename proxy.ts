import { NextRequest, NextResponse } from "next/server";

// This middleware runs on every request that matches the `matcher` rules below
export const proxy = (req: NextRequest) => { 
    
    // Get the "admin" cookie — this is used to check if the user is authenticated
    const user = req.cookies.get("admin");

    // Clone the current request URL so we can inspect its pathname
    const url = req.nextUrl.clone();

    // If the user tries to access the admin dashboard without being authenticated,
    // redirect them to the admin login page
    if (url.pathname === "/admin/dashboard" && !user) { 
        return NextResponse.redirect("/admin/login");
    }

    // If no conditions matched, allow the request to continue
    return NextResponse.next();
};

// Configuration for the middleware
export const config = {
    // This defines the routes where the middleware should run.
    // Only requests to these paths will trigger the middleware.
    matcher: ["/admin/dashboard", "/payment"],
};
