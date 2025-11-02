import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-24 py-16">
        <div className="w-24 h-1 bg-primary mb-12 mx-auto md:mx-0 -mt-16" />

        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 md:mb-12">
          <Link href="/" className="text-2xl font-bold tracking-tight block mb-8 md:mb-0 text-center md:text-left">
            audiophile
          </Link>

          <nav className="flex flex-col md:flex-row md:gap-8 lg:gap-8 space-y-4 md:space-y-0 items-center md:items-start">
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
        </div>

        <p className="text-white/50 leading-relaxed max-w-md mb-12 text-center md:text-left mx-auto md:mx-0">
          Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we're open 7 days a week.
        </p>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <p className="text-white/50 text-sm text-center md:text-left">
            Copyright 2021. All Rights Reserved
          </p>

          <div className="flex gap-4 justify-center md:justify-end">
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
      </div>
    </footer>
  );
};

export default Footer;