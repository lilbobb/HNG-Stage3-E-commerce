'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import CartModal from '@/components/cart/CartModal';
import { PRODUCT_SLUGS } from '@/lib/constants';

interface HeaderProps {
  showHero?: boolean;
}

const Header = ({ showHero = false }: HeaderProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-[#0E0E0E] text-white">
      <div className="relative z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="flex justify-center">
            <nav className="flex items-center justify-between h-24 w-full max-w-[1109px] border-b border-white/10 sticky top-0 z-50 bg-[#0E0E0E] shadow-lg">
              <button 
                className="lg:hidden text-white hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <img src="/assets/hamburger.svg" alt="Menu" className="w-6 h-6" />
              </button>

              <Link 
                href="/" 
                className="text-white text-2xl font-bold tracking-tight absolute left-1/2 transform -translate-x-1/2 sm:static sm:transform-none sm:ml-4 lg:ml-0"
              >
                audiophile
              </Link>

              <div className="hidden lg:flex items-center space-x-8">
                <Link href="/" className="text-white nav-link">
                  Home
                </Link>
                <Link href="/headphones" className="text-white nav-link">
                  Headphones
                </Link>
                <Link href="/speakers" className="text-white nav-link">
                  Speakers
                </Link>
                <Link href="/earphones" className="text-white nav-link">
                  Earphones
                </Link>
              </div>

              <button
                onClick={() => setIsCartOpen(true)}
                className="text-white hover:text-primary transition-colors relative z-50"
                aria-label="Shopping cart"
              >
                <img src="/assets/carts.svg" alt="Cart" className="w-6 h-6" />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 top-24 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          <div 
            className="fixed top-24 left-0 right-0 z-50 bg-white rounded-b-lg shadow-2xl lg:hidden animate-slideDown"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-8 pb-12 pt-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <div className="grid grid-cols-1 gap-16 max-w-md mx-auto">
                <Link 
                  href="/headphones"
                  className="group bg-gray-100 rounded-lg pt-20 pb-6 px-6 text-center hover:shadow-lg transition-shadow relative"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-32 h-32">
                    <Image 
                      src="/assets/shared/desktop/image-category-thumbnail-headphones.png"
                      alt="Headphones"
                      width={128}
                      height={128}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <h3 className="text-black font-bold text-base uppercase tracking-wider mb-3">
                    Headphones
                  </h3>
                  
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-black/50 group-hover:text-primary transition-colors uppercase">
                    Shop
                    <span className="text-primary">›</span>
                  </div>
                </Link>

                <Link 
                  href="/speakers"
                  className="group bg-gray-100 rounded-lg pt-20 pb-6 px-6 text-center hover:shadow-lg transition-shadow relative"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-32 h-32">
                    <Image 
                      src="/assets/shared/desktop/image-category-thumbnail-speakers.png"
                      alt="Speakers"
                      width={128}
                      height={128}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <h3 className="text-black font-bold text-base uppercase tracking-wider mb-3">
                    Speakers
                  </h3>
                  
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-black/50 group-hover:text-primary transition-colors uppercase">
                    Shop
                    <span className="text-primary">›</span>
                  </div>
                </Link>

                <Link 
                  href="/earphones"
                  className="group bg-gray-100 rounded-lg pt-20 pb-6 px-6 text-center hover:shadow-lg transition-shadow relative"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-32 h-32">
                    <Image 
                      src="/assets/shared/desktop/image-category-thumbnail-earphones.png"
                      alt="Earphones"
                      width={128}
                      height={128}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <h3 className="text-black font-bold text-base uppercase tracking-wider mb-3">
                    Earphones
                  </h3>
                  
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-black/50 group-hover:text-primary transition-colors uppercase">
                    Shop
                    <span className="text-primary">›</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />

      {showHero && (
        <div className={`relative bg-[#0E0E0E]overflow-hidden ${isMobileMenuOpen ? 'blur-sm' : ''}`}>
          <div className="lg:hidden absolute inset-0 z-0">
            <div className="relative w-full h-full">
              <Image 
                src="/assets/home/desktop/headphone.png"
                alt="XX99 Mark II Headphones"
                fill
                className="object-cover opacity-100 -mt-10"
                priority
              />
              <div className="absolute inset-0 bg-[#0E0E0E]/80" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-24 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px] lg:min-h-[700px]">
              <div className="space-y-6 text-center lg:text-left relative z-20 py-12 lg:py-20">
                <p className="text-sm tracking-[0.6em] text-white/50 uppercase font-normal">
                  New Product
                </p>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider leading-tight">
                  XX99 MARK II
                  <br />
                  HEADPHONES
                </h1>
                
                <p className="text-white/75 max-w-md mx-auto lg:mx-0 leading-relaxed">
                  Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
                </p>
                
                <Link 
                  href={`/product/${PRODUCT_SLUGS.XX99_MARK_II}`}
                  className="btn-primary inline-block"
                >
                  See Product
                </Link>
              </div>

              <div className="hidden lg:flex relative items-center justify-center h-full">
                <div className="w-full h-full flex items-center justify-center absolute inset-0 z-0">
                  <div className="relative w-full h-full">
                    <Image 
                      src="/assets/home/desktop/headphone.png"
                      alt="XX99 Mark II Headphones"
                      fill
                      className="object-cover opacity-100 -mt-10"
                      priority
                    />
                    <div className="absolute inset-0 bg-[#0E0E0E]/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;