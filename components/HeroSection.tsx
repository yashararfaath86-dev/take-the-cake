'use client';

import React from 'react';
import { HeroCakeCanvas } from './three/HeroCakeCanvas';
import { Sparkles, ArrowRight, Box, ShieldCheck, HeartHandshake, Award } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-24 bg-gradient-to-b from-cream-100 via-cream-50 to-cream-200/40 bg-grain">
      {/* Soft ambient background glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-accent-gold/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Editorial Brand Headline & CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-brand-200/80 shadow-warm-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-ping" />
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Coimbatore's Premier Artisanal Bakery
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-truffle leading-[1.12]">
              Crafting Sweet Memories,{' '}
              <span className="text-brand-500 italic font-normal block sm:inline">
                One Slice at a Time.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-truffle/80 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Hand-decorated gourmet cakes, baked fresh with 100% pure Belgian chocolate, French butter, and zero chemical preservatives. Delivered fresh to your doorstep across Coimbatore.
            </p>

            {/* Main Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Primary CTA */}
              <a
                href="#flavors"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand-500 text-white font-semibold text-base shadow-warm-md hover:bg-brand-600 transition-all duration-300 hover:shadow-glow active:scale-[0.98] group"
              >
                <span>Explore Signature Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Secondary CTA: Custom 3D Builder */}
              <a
                href="#3d-builder"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/90 text-truffle font-semibold text-base border border-brand-200 hover:border-brand-500 hover:bg-brand-50/50 transition-all duration-300 shadow-warm-sm group"
              >
                <Box className="w-5 h-5 text-brand-500 group-hover:rotate-12 transition-transform" />
                <span>Customize in 3D</span>
              </a>
            </div>

            {/* Trust highlights row */}
            <div className="pt-6 border-t border-brand-200/60 grid grid-cols-3 gap-3 text-left">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-brand-50 text-brand-500 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-truffle leading-tight">100% Pure</h2>
                  <p className="text-[11px] text-truffle/60">No preservatives</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-brand-50 text-brand-500 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-truffle leading-tight">4.95 ★ Rated</h2>
                  <p className="text-[11px] text-truffle/60">10k+ Families</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-brand-50 text-brand-500 shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-truffle leading-tight">Eggless Fresh</h2>
                  <p className="text-[11px] text-truffle/60">Dedicated kitchen</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Hero Model */}
          <div className="lg:col-span-6 flex justify-center">
            <HeroCakeCanvas />
          </div>
        </div>
      </div>
    </section>
  );
};
