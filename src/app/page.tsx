import Link from "next/link";

export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto p-10 space-y-6">
      <h1 className="text-4xl font-bold">
        Find collaborators for your creative projects
      </h1>

      <p className="text-lg text-gray-600">
        Find My Artist helps writers and artists connect for games, comics,
        books, and films.
      </p>

      <div className="flex gap-4">
        <Link
          href="/discover"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Discover Creators
        </Link>

        <Link
          href="/profile"
          className="border px-6 py-3 rounded"
        >
          Create Your Profile
        </Link>
      </div>

      <div className="pt-6 border-t">
        <p className="text-sm text-gray-500">
          Built by SanchTechInc.
        </p>
      </div>
    </main>
  );
}
