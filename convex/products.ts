// convex/products.ts
import { query } from "./_generated/server";
import { v } from "convex/values";

export const getProductsByCategory = query({
  args: { 
    category: v.union(
      v.literal('headphones'),
      v.literal('speakers'),
      v.literal('earphones')
    ) 
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});

export const getProductBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .collect();
    
    return products.length > 0 ? products[0] : null;
  },
});

export const getAllProducts = query({
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

export const getFeaturedProducts = query({
  handler: async (ctx) => {
    const allProducts = await ctx.db.query("products").collect();
    
    return {
      zx9: allProducts.find(p => p.slug === 'zx9-speaker'),
      zx7: allProducts.find(p => p.slug === 'zx7-speaker'),
      yx1: allProducts.find(p => p.slug === 'yx1-earphones'),
    };
  },
});

// SEED FUNCTION HAS BEEN REMOVED - Your database is already populated!