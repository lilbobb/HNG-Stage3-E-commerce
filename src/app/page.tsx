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
      
      <section className="bg-lighter py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="group bg-light rounded-lg pt-24 pb-8 px-8 text-center hover:shadow-lg transition-shadow relative"
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
            ))}
          </div>
        </div>
      </section>

      <section className="bg-lighter py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="bg-primary rounded-lg overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 px-6 lg:px-24">
              <div className="relative flex items-center justify-center">
          
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute w-[350px] h-[350px] rounded-full border border-white/10" />
                    <div className="absolute w-[440px] h-[440px] rounded-full border border-white/10" />
                    <div className="absolute w-[700px] h-[700px] rounded-full border border-white/10" />
                  </div>
                </div>
                
                <Image
                  src="/assets/home/desktop/image-speaker-zx9.png"
                  alt="ZX9 Speaker"
                  width={0}
                  height={0}
                  sizes="(max-width:768px) 200px, (max-width:1024px) 300px, 400px"
                  className="w-[200px] md:w-[300px] lg:w-[400px] h-auto  z-20 lg:-mb-24"
                />
              </div>

              <div className="space-y-6 text-center lg:text-left text-white lg:pl-12 relative z-20">
                <h2 className="text-4xl md:text-5xl md:mt-16 lg:text-6xl font-bold uppercase tracking-wider">
                  ZX9<br />Speaker
                </h2>
                <p className="text-white/75 leading-relaxed max-w-md mx-auto lg:mx-0 px-4 lg:px-0">
                  Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
                </p>
                <div className="flex justify-center lg:justify-start relative z-30">
                  <Button href="/product/zx9-speaker" variant="dark">
                    See Product
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="bg-lighter py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="relative h-80 rounded-lg overflow-hidden bg-light">
            <picture>
              <source media="(min-width: 1024px)" srcSet="/assets/home/desktop/image-speaker-zx7.jpg" />
              <source media="(min-width: 768px)" srcSet="/assets/home/tablet/image-speaker-zx7.jpg" />
              <Image
                src="/assets/home/mobile/image-speaker-zx7.jpg"
                alt="ZX7 Speaker"
                fill
                className="object-cover"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-r from-dark/20 to-transparent" />
            
            <div className="relative h-full flex items-center px-6 lg:px-24">
              <div className="space-y-6 text-center lg:text-left">
                <h2 className="text-3xl font-bold uppercase tracking-wider">
                  ZX7 Speaker
                </h2>
                <div className="flex justify-center lg:justify-start">
                  <Button href="/product/zx7-speaker" variant="outline">
                    See Product
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lighter py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-80 rounded-lg overflow-hidden bg-light">
              <Image
                src="/assets/home/desktop/image-earphones-yx1.jpg"
                alt="YX1 Earphones"
                fill
                className="object-cover"
              />
            </div>

            <div className="bg-light rounded-lg flex items-center px-6 lg:px-24 py-12 md:py-0">
              <div className="space-y-6 w-full text-center lg:text-left">
                <h2 className="text-3xl font-bold uppercase tracking-wider">
                  YX1 Earphones
                </h2>
                <div className="flex justify-center lg:justify-start">
                  <Button href="/product/yx1-wireless-earphones" variant="outline">
                    See Product
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lighter py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider">
                Bringing you the <span className="text-primary">best</span> audio gear
              </h2>
              <p className="text-dark/75 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.
              </p>
            </div>
            <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden order-1 lg:order-2 bg-light">
              <Image
                src="/assets/shared/desktop/image-best-gear.jpg"
                alt="Best Audio Gear"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}