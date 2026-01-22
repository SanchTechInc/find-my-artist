import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        clerkId: v.string(),

        // profile basics
        displayName: v.string(),
        bio: v.optional(v.string()),

        // platform role
        role: v.union(
            v.literal("writer"),
            v.literal("artist"),
            v.literal("both")
        ),

        // Discovery
        mediums: v.array(
            v.union(
                v.literal("game"),
                v.literal("comic"),
                v.literal("book"),
                v.literal("film"),
        )
    ),
        genres: v.array(v.string()),

        // Availability
        isAvailable: v.boolean(),

        // saftey
        isAdult: v.boolean(),

        createdAt: v.number(),
    })

    .index("byClerkId", ["clerkId"])
    .index("byRole", ["role"])
    .index("by_Availability", ["isAvailable"]),

});