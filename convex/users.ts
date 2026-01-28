import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const UpsertUserFromOnboarding = mutation({
  args: {
    role: v.union(
      v.literal("artist"),
      v.literal("writer"),
      v.literal("musician"),
      v.literal("collaborator")
    ),

    intent: v.union(
      v.literal("collaborate"),
      v.literal("share"),
      v.literal("hire"),
      v.literal("explore")
    ),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const clerkUserId = identity.subject;

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerkUserId", (q) =>
        q.eq("clerkUserId", clerkUserId)
      )
      .first();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        role: args.role,
        intent: args.intent,
        onboardingComplete: true,
      });
    } else {
      await ctx.db.insert("users", {
        clerkUserId,
        role: args.role,
        intent: args.intent,
        onboardingComplete: true,
        createdAt: Date.now(),
      });
    }
  }
});

export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return null;
    }

    return await ctx.db
      .query("users")
      .withIndex("by_clerkUserId", (q) =>
        q.eq("clerkUserId", identity.subject)
      )
      .first();
  }
});