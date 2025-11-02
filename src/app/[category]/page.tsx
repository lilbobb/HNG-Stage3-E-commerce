// app/[category]/page.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { ChevronRight } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { use } from 'react';

interface CategoryPageProps {
  params: Promise<{
    category: 'headphones' | 'speakers' | 'earphones';
  }>;
}

// Categories array for the navigation section
const categories = [
  { 
    name: 'Headphones', 
    slug: 'headphones',
    image: '/assets/shared/desktop/image-category-thumbnail-headphones.png'
  },
  { 
    name: 'Speakers', 
    slug: 'speakers',
    image: '/assets/shared/desktop/image-category-thumbnail-speakers.png'
  },
  { 
    name: 'Earphones', 
    slug: 'earphones',
    image: '/assets/shared/desktop/image-category-thumbnail-earphones.png'
  },
];

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = use(params);
  
  // Get products for this category
  const products = useQuery(api.products.getProductsByCategory, { 
    category 
  }) || [];

  // Get all products for "You May Also Like" section
  const allProducts = useQuery(api.products.getAllProducts) || [];

  // Loading state
  if (products === undefined || allProducts === undefined) {
    return (
      <div className="min-h-screen flex flex-col bg-lighter">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">Loading products...</div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get random products for "You May Also Like" (excluding current category)
  const relatedProducts = allProducts
    .filter(product => product.category !== category)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-lighter">
      <Header />
      
      {/* Category Header */}
      <section className="bg-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider">
            {category}
          </h1>
        </div>
      </section>

      {/* Products List */}
      <main className="flex-1 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-24 space-y-32">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">No products found</h2>
              <p className="text-dark/75 mb-8">Check back soon for new arrivals!</p>
              <Button href="/" variant="primary">
                Back to Home
              </Button>
            </div>
          ) : (
            products.map((product, index) => (
              <div
                key={product._id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Product Image */}
                <div className={`relative h-96 rounded-lg overflow-hidden bg-light ${
                  index % 2 === 1 ? 'lg:order-2' : ''
                }`}>
                  <div className="w-full h-full flex items-center justify-center text-dark/20">
                    [{product.name} Image]
                  </div>
                </div>

                {/* Product Info */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  {product.isNew && (
                    <p className="text-sm tracking-[0.6em] text-primary uppercase font-normal">
                      New Product
                    </p>
                  )}
                  
                  <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider">
                    {product.name}
                  </h2>
                  
                  <p className="text-dark/75 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <Button href={`/product/${product.slug}`} variant="primary">
                    See Product
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* YOU MAY ALSO LIKE SECTION */}
        {relatedProducts.length > 0 && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-24">
              <h2 className="text-2xl font-bold uppercase tracking-wider text-center mb-12">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProducts.map((product) => (
                  <div key={product._id} className="text-center space-y-6">
                    <div className="relative h-64 rounded-lg overflow-hidden bg-light">
                      <div className="w-full h-full flex items-center justify-center text-dark/20">
                        [{product.name} Image]
                      </div>
                    </div>
                    <h3 className="text-xl font-bold uppercase tracking-wider">
                      {product.name}
                    </h3>
                    <Button href={`/product/${product.slug}`} variant="primary">
                      See Product
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CATEGORIES NAVIGATION SECTION - This appears on ALL pages */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="group bg-light rounded-lg p-8 text-center hover:shadow-lg transition-shadow relative"
                >
                  {/* Category Image */}
                  <div className="relative w-40 h-40 mx-auto mb-4">
                    <div className="w-full h-full bg-white/50 rounded-full flex items-center justify-center">
                      <span className="text-dark/20 text-xs">[{cat.name} Image]</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold uppercase tracking-wider mb-4">
                    {cat.name}
                  </h3>
                  
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-dark/50 group-hover:text-primary transition-colors uppercase">
                    Shop
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider">
                  Bringing you the <span className="text-primary">best</span> audio gear
                </h2>
                <p className="text-dark/75 leading-relaxed">
                  Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.
                </p>
              </div>
              <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden order-1 lg:order-2 bg-light">
                <div className="w-full h-full flex items-center justify-center text-dark/20">
                  [Best Audio Gear Image]
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}