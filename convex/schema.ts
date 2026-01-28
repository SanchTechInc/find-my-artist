import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkUserId: v.string(),

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

    onboardingComplete: v.boolean(),

    createdAt: v.number(),
  }).index("by_clerkUserId", ["clerkUserId"]),
});
