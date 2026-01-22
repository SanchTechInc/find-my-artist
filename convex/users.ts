import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Create user on first login
 */
export const createUserIfMissing = mutation({
  args: {
    clerkId: v.string(),
    displayName: v.string(),
    isAdult: v.boolean(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("byClerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existing) return;

    await ctx.db.insert("users", {
      clerkId: args.clerkId,
      displayName: args.displayName,
      bio: "",
      role: "writer",
      mediums: [],
      genres: [],
      isAvailable: true,
      isAdult: args.isAdult,
      createdAt: Date.now(),
    });
  },
});

/**
 * Fetch user by Clerk ID
 */
export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return ctx.db
      .query("users")
      .withIndex("byClerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

/**
 * Update profile
 */
export const updateProfile = mutation({
  args: {
    clerkId: v.string(),
    displayName: v.string(),
    bio: v.string(),
    role: v.union(
      v.literal("writer"),
      v.literal("artist"),
      v.literal("both")
    ),
    mediums: v.array(
      v.union(
        v.literal("game"),
        v.literal("comic"),
        v.literal("book"),
        v.literal("film")
      )
    ),
    genres: v.array(v.string()),
    isAvailable: v.boolean(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      displayName: args.displayName,
      bio: args.bio,
      role: args.role,
      mediums: args.mediums,
      genres: args.genres,
      isAvailable: args.isAvailable,
    });
  },
});

/**
 * 🔍 DISCOVERY QUERY (THIS FIXES YOUR ERROR)
 */
export const listUsers = query({
  args: {
    role: v.optional(
      v.union(
        v.literal("writer"),
        v.literal("artist"),
        v.literal("both")
      )
    ),
    medium: v.optional(
      v.union(
        v.literal("game"),
        v.literal("comic"),
        v.literal("book"),
        v.literal("film")
      )
    ),
    genre: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let users = await ctx.db.query("users").collect();

    users = users.filter((u) => u.isAvailable);

    if (args.role) {
      users = users.filter((u) => u.role === args.role);
    }

    if (args.medium !== undefined) {
      const medium = args.medium;
      users = users.filter((u) => u.mediums.includes(medium));
    }

    if (args.genre) {
      const g = args.genre.toLowerCase();
      users = users.filter((u) =>
        u.genres.some((x) => x.toLowerCase().includes(g))
      );
    }

    return users;
  },
});
