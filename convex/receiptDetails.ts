import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createReceiptDetails = mutation({
    args:{
        userId: v.string(),
        companyName: v.string(),
        receiptContents: v.string(),
    },

    handler: async( ctx, args ) => {
        const receiptId = await ctx.db.insert("receiptDetails", {
            userId: args.userId,
            companyName: args.companyName,
            receiptContents: args.receiptContents,
        });

        return receiptId;
    }
})