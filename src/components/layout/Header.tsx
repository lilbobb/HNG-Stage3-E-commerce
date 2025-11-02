'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import CartModal from '@/components/cart/CartModal';

interface HeaderProps {
  showHero?: boolean;
}

const Header = ({ showHero = false }: HeaderProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="bg-dark text-white">
      {/* Navigation Bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="flex justify-center">
            <nav className="flex items-center justify-between h-24 w-full max-w-[1109px]">
              {/* Logo */}
              <Link href="/" className="text-white text-2xl font-bold tracking-tight">
                audiophile
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
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

              {/* Cart Icon */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="text-white hover:text-primary transition-colors"
                aria-label="Shopping cart"
              >
                <img src="/assets/carts.svg" alt="Cart" className="w-6 h-6" />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />

      {/* Hero Section - Conditional */}
      {showHero && (
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">
              {/* Left Content */}
              <div className="space-y-6 text-center lg:text-left">
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
                  href="/product/xx99-mark-ii-headphones"
                  className="btn-primary inline-block"
                >
                  See Product
                </Link>
              </div>

              {/* Right Content - Headphones Image */}
              <div className="relative flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-square">
                  {/* Glow effect */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-80 h-80 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-3xl" />
                  </div>
                  
                  {/* Image placeholder */}
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <span className="text-white/20 text-sm">
                      [Place headphones image here]
                    </span>
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