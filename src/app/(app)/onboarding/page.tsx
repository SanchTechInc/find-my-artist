"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

  const ROLES = [
    { label: "Artist", value: "artist" },
    { label: "Writer", value: "writer" },
    { label: "Musician", value: "musician" },
    { label: "Collaborator", value: "collaborator" },
  ] as const;

  const INTENTS = [
    { label: "Collaborate", value: "collaborate" },
    { label: "Share", value: "share" },
    { label: "Hire", value: "hire" },
    { label: "Explore", value: "explore" },
  ] as const;

export default function OnboardingPage() {
  const router = useRouter();
  
  const [role, setRole] = useState<(typeof ROLES)[number]["value"] | null>(
    null,
  );
  const [intent, setIntent] = useState<
    (typeof INTENTS)[number]["value"] | null
  >(null);

  const canContinue = Boolean(role && intent);

  const handleContinue = () => {
    if (!canContinue) return;

    // Temp: no peristence
    // later will save to db

    router.push("/dashboard");
  };

  // TODO: (Phase 5): Prevent dashboard access until onboarding is complete

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h1>Tell us about yourself</h1>

      <section>
        <h3>I am a…</h3>
        {ROLES.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => role !== value && setRole(value)}
            style={{
              marginRight: 8,
              marginBottom: 8,
              fontWeight: role === value ? "bold" : "normal",
            }}
          >
            {label}
          </button>
        ))}
      </section>

      <section style={{ marginTop: 24 }}>
        <h3>I’m here to…</h3>
        {INTENTS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setIntent(value)}
            style={{
              marginRight: 8,
              marginBottom: 8,
              fontWeight: intent === value ? "bold" : "normal",
            }}
          >
            {label}
          </button>
        ))}
      </section>

      <div style={{ marginTop: 32 }}>
        <button disabled={!canContinue} onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}
