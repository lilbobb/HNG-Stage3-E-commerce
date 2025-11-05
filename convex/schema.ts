import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    category: v.union(
      v.literal('headphones'),
      v.literal('speakers'), 
      v.literal('earphones')
    ),
    categoryImage: v.object({
      desktop: v.string(),
      mobile: v.string(),
      tablet: v.string(),
    }),
    isNew: v.boolean(),
    price: v.number(),
    features: v.string(),
    includes: v.array(
      v.object({
        quantity: v.number(),
        item: v.string(),
      })
    ),
    gallery: v.object({
      first: v.object({ desktop: v.string(), mobile: v.string(), tablet: v.string() }),
      second: v.object({ desktop: v.string(), mobile: v.string(), tablet: v.string() }),
      third: v.object({ desktop: v.string(), mobile: v.string(), tablet: v.string() }),
    }),
    others: v.array(v.string()), 
  })
    .index('by_slug', ['slug'])
    .index('by_category', ['category']),

  orders: defineTable({
    customer: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
    }),
    shipping: v.object({
      address: v.string(),
      city: v.string(),
      zip: v.string(),
      country: v.string(),
    }),
    items: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
      })
    ),
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      taxes: v.number(),
      grandTotal: v.number(),
    }),
    status: v.string(),
    createdAt: v.number(),
  }),
});