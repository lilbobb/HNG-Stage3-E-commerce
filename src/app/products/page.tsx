"use client";

import { useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';

export default function ProductsPage() {
  const { addToCart } = useCart() as any;
  const products = useQuery(api.products.getAllProducts) || [];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <li key={product._id} className="border rounded p-4">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="mt-2">${product.price}</p>
            <button 
              onClick={() => addToCart({ 
                id: product._id, 
                name: product.name,
                price: product.price, 
                quantity: 1 
              })} 
              className="mt-4 bg-black text-white px-3 py-2 rounded"
            >
              Add to cart
            </button>
            <Link href={`/product/${product.slug}`} className="mt-3 block text-sm underline">
              View
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}