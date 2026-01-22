export const dynamic = "force-dynamic";

"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

type Role = "writer" | "artist" | "both" | "";
type Medium = "game" | "comic" | "book" | "film" | "";




export default function DiscoverPage() {
  const [role, setRole] = useState<Role>("");
  const [medium, setMedium] = useState<Medium>("");
  const [genre, setGenre] = useState("");

  const users = useQuery(api.users.listUsers, {
    role: role || undefined,
    medium: medium || undefined,
    genre: genre || undefined,
  });

  if (!users) {
    return <p className="p-6">Loading profiles…</p>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Discover Creators</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          className="border p-2"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
        >
          <option value="">Any role</option>
          <option value="writer">Writer</option>
          <option value="artist">Artist</option>
          <option value="both">Writer & Artist</option>
        </select>

        <select
          className="border p-2"
          value={medium}
          onChange={(e) => setMedium(e.target.value as Medium)}
        >
          <option value="">Any medium</option>
          <option value="game">Game</option>
          <option value="comic">Comic</option>
          <option value="book">Book</option>
          <option value="film">Film</option>
        </select>

        <input
          className="border p-2"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Genre (e.g. fantasy)"
        />
      </div>

      {/* Results */}
      <div className="grid gap-4">
        {users.length === 0 && (
          <p className="text-gray-500">No matching creators found.</p>
        )}

        {users.map((u) => (
          <div
            key={u._id}
            className="border p-4 rounded space-y-1"
          >
            <h2 className="text-xl font-semibold">{u.displayName}</h2>
            <p className="text-sm text-gray-600">{u.role}</p>
            {u.bio && <p>{u.bio}</p>}
            <p className="text-sm">
              <strong>Mediums:</strong> {u.mediums.join(", ")}
            </p>
            <p className="text-sm">
              <strong>Genres:</strong> {u.genres.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
