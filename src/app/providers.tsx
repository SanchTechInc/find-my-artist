"use client";

import { ClerkProvider } from "@clerk/nextjs";
import dynamic from "next/dynamic";

const ConvexProvider = dynamic(
  () => import("convex/react").then((m) => m.ConvexProvider),
  { ssr: false }
);

import { convex } from "@/lib/convexClient";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ConvexProvider client={convex}>{children}</ConvexProvider>
    </ClerkProvider>
  );
}
