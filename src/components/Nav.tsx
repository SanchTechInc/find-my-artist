"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Nav() {
  return (
    <nav className="w-full border-b px-6 py-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-lg">
        Find My Artist
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/discover">Discover</Link>

        <SignedIn>
          <Link href="/profile">Profile</Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <SignedOut>
          <Link href="/sign-in">Sign In</Link>
        </SignedOut>
      </div>
    </nav>
  );
}
