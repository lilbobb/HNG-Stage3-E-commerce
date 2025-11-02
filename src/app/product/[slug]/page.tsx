'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import QuantitySelector from '@/components/ui/QuantitySelector';
import { useCartContext } from '@/components/cart/CartContext';
import { useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
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

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter();
  const { addItem } = useCartContext();
  const [quantity, setQuantity] = useState(1);
  
  const { slug } = use(params);
  const allProducts = useQuery(api.products.getAllProducts);
  const product = useQuery(api.products.getProductBySlug, { slug });

  const productFromAll = allProducts?.find(p => p.slug === slug);
  
  const displayProduct = product || productFromAll;

  const relatedProducts = displayProduct?.others 
  ? allProducts?.filter(p => displayProduct.others.includes(p.slug))?.slice(0, 3) || []
  : allProducts?.filter(p => p.slug !== slug)?.slice(0, 3) || [];
  
  if (allProducts === undefined) {
    return (
      <div className="min-h-screen flex flex-col bg-lighter">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">Loading product...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!displayProduct) {
    return (
      <div className="min-h-screen flex flex-col bg-lighter">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-2">Slug: {slug}</p>
            <p className="mb-4">Available slugs: {allProducts?.map(p => p.slug).join(', ')}</p>
            <Button href="/" variant="primary">Back to Home</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(
      {
        id: displayProduct._id,
        name: displayProduct.name,
        price: displayProduct.price,
        image: displayProduct.categoryImage.mobile,
      },
      quantity
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-lighter">
      <Header />
      
      <main className="flex-1 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <button
            onClick={() => router.back()}
            className="text-dark/50 hover:text-primary transition-colors mb-12"
          >
            Go Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          <div className="relative h-96 lg:h-[560px] rounded-lg overflow-hidden bg-light">
            <Image
              src={displayProduct.categoryImage?.desktop || `/assets/product-${displayProduct.slug}/desktop/image-product.jpg`}
              alt={displayProduct.name}
              fill
              className="object-cover"
            />
          </div>

            <div className="flex flex-col justify-center space-y-6">
              {displayProduct.isNew && (
                <p className="text-sm tracking-[0.6em] text-primary uppercase">
                  New Product
                </p>
              )}
              
              <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider">
                {displayProduct.name}
              </h1>
              
              <p className="text-dark/75 leading-relaxed">
                {displayProduct.description}
              </p>
              
              <p className="text-lg font-bold">
                $ {displayProduct.price.toLocaleString()}
              </p>

              <div className="flex gap-4 items-center">
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity(q => q + 1)}
                  onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
                />
                <Button variant="primary" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold uppercase tracking-wider">
                Features
              </h2>
              <div className="text-dark/75 leading-relaxed whitespace-pre-line">
                {displayProduct.features}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold uppercase tracking-wider">
                In the Box
              </h2>
              <ul className="space-y-2">
                {displayProduct.includes.map((item: any, index: number) => (
                  <li key={index} className="flex gap-6">
                    <span className="text-primary font-bold w-6">
                      {item.quantity}x
                    </span>
                    <span className="text-dark/75">{item.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-32">
            <div className="flex flex-col gap-4 md:w-1/2">
              <div className="relative h-64 rounded-lg overflow-hidden bg-light">
                <Image
                  src={displayProduct.gallery?.first?.desktop || `/assets/product-${displayProduct.slug}/desktop/image-gallery-1.jpg`}
                  alt={`${displayProduct.name} gallery 1`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden bg-light">
                <Image
                  src={displayProduct.gallery?.second?.desktop || `/assets/product-${displayProduct.slug}/desktop/image-gallery-2.jpg`}
                  alt={`${displayProduct.name} gallery 2`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="relative h-64 md:h-[calc(128px+25rem)] rounded-lg overflow-hidden bg-light md:w-1/2">
              <Image
                src={displayProduct.gallery?.third?.desktop || `/assets/product-${displayProduct.slug}/desktop/image-gallery-3.jpg`}
                alt={`${displayProduct.name} gallery 3`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <section className="mb-32">
            <h2 className="text-2xl font-bold uppercase tracking-wider text-center mb-12">
              you may also like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct._id} className="text-center space-y-8 flex flex-col items-center">
                <div className="relative w-full aspect-square max-w-64 rounded-lg overflow-hidden bg-light">
                  <Image
                    src={relatedProduct.categoryImage?.mobile || `/assets/shared/desktop/image-category-thumbnail-${relatedProduct.category}.png`}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                  
                  <h3 className="text-xl font-bold uppercase tracking-wider">
                    {relatedProduct.name}
                  </h3>
                  
                  <Button href={`/product/${relatedProduct.slug}`} variant="primary">
                    See Product
                  </Button>
                </div>
              ))}
            </div>
          </section>

        <section className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div key={category.slug} className="text-center flex flex-col items-center">
                <Link
                  href={`/${category.slug}`}
                  className="group block bg-light rounded-lg pt-24 pb-8 px-8 hover:shadow-lg transition-shadow relative w-full max-w-xs"
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-40 h-40">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <h3 className="text-lg font-bold uppercase tracking-wider mb-4">
                    {category.name}
                  </h3>
                  
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-dark/50 group-hover:text-primary transition-colors uppercase">
                    Shop
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </section>

          <section className="pb-20">
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
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}