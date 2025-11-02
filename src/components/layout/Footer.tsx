import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-24 py-16">
        {/* Orange accent line */}
        <div className="w-24 h-1 bg-primary mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tight block mb-6">
              audiophile
            </Link>
            <p className="text-white/50 leading-relaxed max-w-md">
              Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-sm font-bold tracking-widest uppercase hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/headphones" className="text-sm font-bold tracking-widest uppercase hover:text-primary transition-colors">
              Headphones
            </Link>
            <Link href="/speakers" className="text-sm font-bold tracking-widest uppercase hover:text-primary transition-colors">
              Speakers
            </Link>
            <Link href="/earphones" className="text-sm font-bold tracking-widest uppercase hover:text-primary transition-colors">
              Earphones
            </Link>
          </nav>

          {/* Social Links */}
          <div className="flex gap-4 lg:justify-end items-start">
            <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="Instagram">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-white/50 text-sm">
          Copyright 2025. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;