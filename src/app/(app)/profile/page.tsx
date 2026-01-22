"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

/** Types that mirror Convex schema */
type Role = "writer" | "artist" | "both";
type Medium = "game" | "comic" | "book" | "film";

export const dynamic = "force-dynamic";


export default function ProfilePage() {
  const { user } = useUser();

  const convexUser = useQuery(
    api.users.getUserByClerkId,
    user ? { clerkId: user.id } : "skip"
  );

  const updateProfile = useMutation(api.users.updateProfile);

  /** Single source of truth for form state */
  const [form, setForm] = useState<{
    displayName: string;
    bio: string;
    role: Role;
    mediums: Medium[];
    genres: string;
    isAvailable: boolean;
  }>({
    displayName: "",
    bio: "",
    role: "writer",
    mediums: [],
    genres: "",
    isAvailable: true,
  });

  /** Hydrate form once Convex user loads */
  useEffect(() => {
    if (!convexUser) return;

    setForm({
      displayName: convexUser.displayName,
      bio: convexUser.bio ?? "",
      role: convexUser.role,
      mediums: convexUser.mediums,
      genres: convexUser.genres.join(", "),
      isAvailable: convexUser.isAvailable,
    });
  }, [convexUser]);

  async function handleSave() {
    if (!user) return;

    await updateProfile({
      clerkId: user.id,
      displayName: form.displayName,
      bio: form.bio,
      role: form.role,
      mediums: form.mediums,
      genres: form.genres
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean),
      isAvailable: form.isAvailable,
    });

    alert("Profile saved");
  }

  if (!convexUser) {
    return <p className="p-6">Loading profile…</p>;
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Your Profile</h1>

      <input
        className="w-full border p-2"
        value={form.displayName}
        onChange={(e) =>
          setForm((f) => ({ ...f, displayName: e.target.value }))
        }
        placeholder="Display name"
      />

      <textarea
        className="w-full border p-2"
        value={form.bio}
        onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
        placeholder="Short bio"
      />

      <select
        className="w-full border p-2"
        value={form.role}
        onChange={(e) =>
          setForm((f) => ({
            ...f,
            role: e.target.value as Role,
          }))
        }
      >
        <option value="writer">Writer</option>
        <option value="artist">Artist</option>
        <option value="both">Writer & Artist</option>
      </select>

      <div className="space-x-2">
        {(["game", "comic", "book", "film"] as Medium[]).map((m) => (
          <label key={m} className="inline-flex items-center space-x-1">
            <input
              type="checkbox"
              checked={form.mediums.includes(m)}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  mediums: e.target.checked
                    ? [...f.mediums, m]
                    : f.mediums.filter((x) => x !== m),
                }))
              }
            />
            <span>{m}</span>
          </label>
        ))}
      </div>

      <input
        className="w-full border p-2"
        value={form.genres}
        onChange={(e) => setForm((f) => ({ ...f, genres: e.target.value }))}
        placeholder="Genres (comma separated)"
      />

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={form.isAvailable}
          onChange={(e) =>
            setForm((f) => ({ ...f, isAvailable: e.target.checked }))
          }
        />
        <span>Available for collaboration</span>
      </label>

      <button
        onClick={handleSave}
        className="bg-black text-white px-4 py-2"
      >
        Save Profile
      </button>
    </main>
  );
}
