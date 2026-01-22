import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next (static files)
     * - favicon
     * - public files
     */
    "/((?!_next|favicon.ico).*)",
  ],
};
