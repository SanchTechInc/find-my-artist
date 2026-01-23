"use client";

import { SignOutButton } from "@clerk/nextjs";

export function AppSignOutButton() {
  return (
    <SignOutButton redirectUrl="/">
      <button>
        Sign out
      </button>
    </SignOutButton>
  );
}
