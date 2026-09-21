'use client';

import React from 'react';
import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import { COIMBATORE_LOCALITIES } from '@/data/cakes';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Heart,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-truffle text-cream-100 pt-16 pb-12 border-t border-brand-500/20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" />
            <p className="text-xs sm:text-sm text-cream-200/70 max-w-sm leading-relaxed">
              Coimbatore's artisanal benchmark for gourmet European patisserie and bespoke celebration cakes. Handcrafted from scratch with French butter, Belgian chocolate, and zero chemical preservatives.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-cream-100 hover:bg-brand-500 hover:border-brand-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919894261291"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif text-sm font-bold text-cream-50 uppercase tracking-wider">
              Artisanal Menu
            </h4>
            <ul className="space-y-2 text-cream-200/70">
              <li>
                <a href="#flavors" className="hover:text-brand-400 transition-colors">
                  Exotic Raspberry Mousse
                </a>
              </li>
              <li>
                <a href="#flavors" className="hover:text-brand-400 transition-colors">
                  Belgian Chocolate Truffle
                </a>
              </li>
              <li>
                <a href="#flavors" className="hover:text-brand-400 transition-colors">
                  Classic Red Velvet Glaze
                </a>
              </li>
              <li>
                <a href="#flavors" className="hover:text-brand-400 transition-colors">
                  Royal Rasamalai Saffron
                </a>
              </li>
              <li>
                <a href="#3d-builder" className="hover:text-brand-400 transition-colors">
                  Custom 3D Cake Configurator
                </a>
              </li>
            </ul>
          </div>

          {/* Delivery Hubs in Coimbatore */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif text-sm font-bold text-cream-50 uppercase tracking-wider">
              Delivery Hubs
            </h4>
            <p className="text-[11px] text-cream-200/60 leading-relaxed">
              Express & Midnight delivery across:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {COIMBATORE_LOCALITIES.slice(0, 8).map((loc) => (
                <span
                  key={loc}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-cream-200/80"
                >
                  {loc}
                </span>
              ))}
            </div>
          </div>

          {/* Kitchen & Orders */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif text-sm font-bold text-cream-50 uppercase tracking-wider">
              Artisanal Kitchen
            </h4>
            <div className="space-y-2.5 text-cream-200/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>Race Course & RS Puram, Coimbatore, Tamil Nadu 641018</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a
                  href="tel:+919894261291"
                  className="hover:text-brand-300 font-semibold"
                >
                  +91 9894261291
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <span>orders@takethecake.in</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-[10px] text-brand-300">
                <ShieldCheck className="w-3 h-3 text-accent-gold" />
                <span>FSSAI Certified Bakery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-200/50 gap-4">
          <p>© {new Date().getFullYear()} Take The Cake (takethecake.in). All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Baked with</span>
            <Heart className="w-3.5 h-3.5 text-brand-500 fill-brand-500" />
            <span>in Coimbatore</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
