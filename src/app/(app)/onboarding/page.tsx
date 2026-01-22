"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";


export default function OnboardingPage() {
  const { user } = useUser();
  const [birthdate, setBirthdate] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user || !birthdate) return;

    const birth = new Date(birthdate);
    const today = new Date();

    const age =
      today.getFullYear() -
      birth.getFullYear() -
      (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
        ? 1
        : 0);

    const isAdult = age >= 18;

    await user.update({
      unsafeMetadata: {
        isAdult,
      },
    });

    window.location.href = "/";
  }

  return (
    <main className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Before you continue</h1>
      <p className="mb-4">
        Please confirm your date of birth. This helps us keep content
        age-appropriate.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="date"
          required
          className="w-full border p-2 mb-4"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />

        <button type="submit" className="w-full bg-black text-white py-2">
          Continue
        </button>
      </form>
    </main>
  );
}
