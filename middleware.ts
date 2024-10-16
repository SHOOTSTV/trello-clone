import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes using a route matcher
const isProtectedRoute = createRouteMatcher([
  "/select-org(.*)",
  "/organization(.*)",
]);

// Middleware to handle authentication and redirection
export default clerkMiddleware((auth, req) => {
  // If the user is authenticated and the route is not protected
  if (auth().userId && !isProtectedRoute(req)) {
    let path = "/select-org";
    // If the user is part of an organization, redirect to the organization page
    if (auth().orgId) {
      path = `/organization/${auth().orgId}`;
    }

    const orgSelection = new URL(path, req.url);

    // Redirect to the appropriate organization selection or organization page
    return NextResponse.redirect(orgSelection);
  }

  // If the user is not authenticated and the route is protected, redirect to sign-in
  if (!auth().userId && isProtectedRoute(req)) {
    return auth().redirectToSignIn({ returnBackUrl: req.url });
  }

  // If the user is authenticated but not part of an organization, redirect to organization selection
  if (
    auth().userId &&
    !auth().orgId &&
    req.nextUrl.pathname !== "/select-org"
  ) {
    const orgSelection = new URL("/select-org", req.url);
    return NextResponse.redirect(orgSelection);
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
