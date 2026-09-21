'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import { useCart } from '@/context/CartContext';
import {
  ShoppingBag,
  MapPin,
  Phone,
  Sparkles,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { totalCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Banner Announcement */}
      <div className="bg-truffle text-cream-100 text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-brand-500/20">
        <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
        <span>
          Same-Day & Midnight Delivery across Coimbatore • 100% Handcrafted Daily •{' '}
          <a
            href="https://wa.me/919894261291?text=Hi%20Take%20The%20Cake,%20I%20would%20like%20to%20order%20a%20fresh%20cake!"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-brand-300 hover:text-white font-semibold transition-colors"
          >
            Direct WhatsApp Booking: +91 9894261291
          </a>
        </span>
      </div>

      {/* Main Glassmorphic Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3 shadow-warm-sm'
            : 'bg-cream-100/90 backdrop-blur-md py-4 border-b border-brand-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group focus:outline-none">
            <BrandLogo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-truffle">
            <a
              href="#flavors"
              className="hover:text-brand-500 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-500 hover:after:w-full after:transition-all"
            >
              Signature Cakes
            </a>
            <a
              href="#3d-builder"
              className="flex items-center gap-1.5 text-brand-600 font-semibold hover:text-brand-700 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              Custom 3D Builder
            </a>
            <a
              href="#why-ttc"
              className="hover:text-brand-500 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-500 hover:after:w-full after:transition-all"
            >
              Why Take The Cake
            </a>
            <a
              href="#reviews"
              className="hover:text-brand-500 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-500 hover:after:w-full after:transition-all"
            >
              Reviews
            </a>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Coimbatore Delivery Chip */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-xs font-semibold text-brand-700">
              <MapPin className="w-3.5 h-3.5 text-brand-500" />
              <span>Coimbatore</span>
            </div>

            {/* Direct WhatsApp Call Pill */}
            <a
              href="https://wa.me/919894261291"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-truffle border border-brand-200 text-xs font-semibold hover:border-brand-400 hover:bg-brand-50 transition-all shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-brand-500" />
              <span>+91 9894261291</span>
            </a>

            {/* Cart Button with Animated Slice Counter */}
            <button
              onClick={openCart}
              aria-label="Open Cart"
              className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500 text-white font-medium text-sm shadow-warm-sm hover:bg-brand-600 transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xs:inline">Cake Box</span>
              <span className="w-5 h-5 rounded-full bg-white text-brand-600 text-xs font-bold flex items-center justify-center">
                {totalCount}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="md:hidden p-2 rounded-lg text-truffle hover:bg-brand-50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-cream-100 border-b border-brand-200 px-4 pt-3 pb-6 space-y-3">
            <a
              href="#flavors"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 text-sm font-medium text-truffle border-b border-brand-100"
            >
              <span>Signature Cakes</span>
              <ChevronRight className="w-4 h-4 text-brand-400" />
            </a>
            <a
              href="#3d-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 text-sm font-semibold text-brand-600 border-b border-brand-100"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-500" />
                Custom 3D Builder
              </span>
              <ChevronRight className="w-4 h-4 text-brand-400" />
            </a>
            <a
              href="#why-ttc"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 text-sm font-medium text-truffle border-b border-brand-100"
            >
              <span>Why Take The Cake</span>
              <ChevronRight className="w-4 h-4 text-brand-400" />
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 text-sm font-medium text-truffle border-b border-brand-100"
            >
              <span>Reviews & Ratings</span>
              <ChevronRight className="w-4 h-4 text-brand-400" />
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://wa.me/919894261291"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-brand-500 text-white text-center font-medium text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Order: +91 9894261291</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
