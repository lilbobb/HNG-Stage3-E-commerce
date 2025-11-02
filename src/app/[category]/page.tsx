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
  
  const products = useQuery(api.products.getProductsByCategory, { 
    category 
  }) || [];

  const allProducts = useQuery(api.products.getAllProducts) || [];

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

  const relatedProducts = allProducts
    .filter(product => product.category !== category)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-lighter">
      <Header />
      
      <section className="bg-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider">
            {category}
          </h1>
        </div>
      </section>

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
                <div className={`relative h-96 rounded-lg overflow-hidden bg-light ${
                  index % 2 === 1 ? 'lg:order-2' : ''
                }`}>
                  <picture>
                    <source media="(min-width: 1024px)" srcSet={product.categoryImage.desktop} />
                    <source media="(min-width: 768px)" srcSet={product.categoryImage.tablet} />
                    <Image
                      src={product.categoryImage.mobile}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </picture>
                </div>

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
                      <Image
                        src={product.categoryImage.mobile} 
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
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

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="group bg-light rounded-lg pt-24 pb-8 px-8 text-center hover:shadow-lg transition-shadow relative"
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-40 h-40">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-contain"
                  />
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
              <Image
                src="/assets/shared/desktop/image-best-gear.jpg"
                alt="Best Audio Gear"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}