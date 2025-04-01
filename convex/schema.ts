import { defineTable, defineSchema } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        email: v.string(),
        username: v.string(),
        image: v.string(),
        clerkId: v.string(),
    }).index("by_clerk_id", ["clerkId"]),

    receiptDetails: defineTable({
        userId: v.string(),
        companyName: v.string(),
        receiptContents: v.string(),
    }).index("by_userId", ["userId"]),
});