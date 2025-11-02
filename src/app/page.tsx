"use client";

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { ChevronRight } from 'lucide-react';

const categories = [
  {
    name: 'Headphones',
    slug: 'headphones',
    image: '/assets/shared/desktop/image-category-thumbnail-headphones.png',
  },
  {
    name: 'Speakers',
    slug: 'speakers',
    image: '/assets/shared/desktop/image-category-thumbnail-speakers.png',
  },
  {
    name: 'Earphones',
    slug: 'earphones',
    image: '/assets/shared/desktop/image-category-thumbnail-earphones.png',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showHero />
      
      {/* Product Categories Section */}
      <section className="bg-lighter py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="group bg-light rounded-lg p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="relative w-40 h-40 mx-auto mb-4">
                  <div className="w-full h-full bg-white/50 rounded-full flex items-center justify-center">
                    <span className="text-dark/20 text-xs">[{category.name}]</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-4">
                  {category.name}
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

      {/* Featured Product 1 - ZX9 Speaker (Orange Background) */}
      <section className="bg-lighter py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="bg-primary rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 px-6 lg:px-24">
              {/* Speaker Image */}
              <div className="relative h-80 flex items-end justify-center">
                {/* <Image
                  src="/assets/home/desktop/image-speaker-zx9.png"
                  alt="ZX9 Speaker"
                  width={400}
                  height={500}
                  className="object-contain"
                /> */}
                <div className="w-64 h-80 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-white/30 text-sm">[ZX9 Speaker]</span>
                </div>
                {/* Circular pattern background */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/20" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/10" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/5" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6 text-center lg:text-left text-white">
                <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider">
                  ZX9<br />Speaker
                </h2>
                <p className="text-white/75 leading-relaxed max-w-md mx-auto lg:mx-0">
                  Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
                </p>
                <Button href="/product/zx9-speaker" variant="dark">
                  See Product
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product 2 - ZX7 Speaker (Image Background) */}
      <section className="bg-lighter py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="relative h-80 rounded-lg overflow-hidden bg-light">
            {/* <Image
              src="/assets/home/desktop/image-speaker-zx7.jpg"
              alt="ZX7 Speaker"
              fill
              className="object-cover"
            /> */}
            <div className="absolute inset-0 bg-gradient-to-r from-dark/20 to-transparent" />
            
            <div className="relative h-full flex items-center px-12 lg:px-24">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold uppercase tracking-wider">
                  ZX7 Speaker
                </h2>
                <Button href="/product/zx7-speaker" variant="outline">
                  See Product
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product 3 - YX1 Earphones (Split Layout) */}
      <section className="bg-lighter py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="relative h-80 rounded-lg overflow-hidden bg-light">
              {/* <Image
                src="/assets/home/desktop/image-earphones-yx1.jpg"
                alt="YX1 Earphones"
                fill
                className="object-cover"
              /> */}
              <div className="w-full h-full flex items-center justify-center text-dark/20">
                [YX1 Earphones Image]
              </div>
            </div>

            {/* Content */}
            <div className="bg-light rounded-lg flex items-center px-12 lg:px-24">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold uppercase tracking-wider">
                  YX1 Earphones
                </h2>
                <Button href="/product/yx1-earphones" variant="outline">
                  See Product
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-lighter py-20">
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
              {/* <Image
                src="/assets/shared/desktop/image-best-gear.jpg"
                alt="Best Audio Gear"
                fill
                className="object-cover"
              /> */}
              <div className="w-full h-full flex items-center justify-center text-dark/20">
                [Best Audio Gear Image]
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}