'use client';

import React from 'react';
import Image from 'next/image';
import {
  Sparkles,
  Flame,
  Clock,
  Star,
  Crown,
  Heart,
  Truck,
  CheckCircle,
  Phone,
} from 'lucide-react';

export const BentoGrid: React.FC = () => {
  return (
    <section id="why-ttc" className="py-20 bg-cream-100/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-xs font-semibold text-brand-600 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>The Coimbatore Benchmark</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-truffle">
            Why Take The Cake Is Loved Across The City
          </h2>
          <p className="text-sm sm:text-base text-truffle/70 max-w-xl mx-auto">
            From intimate anniversary dates to grand wedding receptions, here is why over 10,000 families trust our ovens.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card 1: 100% Small Batch Baking (Spans 2 cols) */}
          <div className="md:col-span-2 rounded-3xl p-8 bg-white border border-brand-200/80 shadow-warm-sm hover:shadow-warm-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full blur-2xl -z-10 group-hover:scale-110 transition-transform" />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase mb-4">
                <Flame className="w-3.5 h-3.5 text-brand-500" />
                <span>Zero Emulsifiers • No Cake Gel</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-truffle mb-3">
                100% Small Batch Baking
              </h3>

              <p className="text-sm text-truffle/75 max-w-md leading-relaxed mb-6">
                Most commercial bakeries rely on chemical cake gels and shelf-life extenders. We bake exclusively in micro-batches with pure butter, real Madagascar bourbon vanilla, and farm dairy.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-brand-100">
              <div className="text-center p-3 rounded-2xl bg-cream-50">
                <span className="font-serif text-xl font-bold text-brand-500 block">100%</span>
                <span className="text-[11px] text-truffle/70">Pure Butter</span>
              </div>
              <div className="text-center p-3 rounded-2xl bg-cream-50">
                <span className="font-serif text-xl font-bold text-brand-500 block">0%</span>
                <span className="text-[11px] text-truffle/70">Preservatives</span>
              </div>
              <div className="text-center p-3 rounded-2xl bg-cream-50">
                <span className="font-serif text-xl font-bold text-brand-500 block">Daily</span>
                <span className="text-[11px] text-truffle/70">Fresh Baked</span>
              </div>
            </div>
          </div>

          {/* Card 2: Express Same-Day & Midnight Delivery (Spans 1 or 2 cols) */}
          <div className="md:col-span-1 lg:col-span-2 rounded-3xl p-8 bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-warm-md hover:shadow-warm-lg transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase mb-4 backdrop-blur-md">
                <Clock className="w-3.5 h-3.5 text-accent-gold" />
                <span>Express & Midnight</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
                Midnight Surprise & 3-Hr Express
              </h3>

              <p className="text-sm text-white/90 max-w-sm leading-relaxed mb-6">
                Forgot an important birthday? Our express courier delivers freshly baked cakes within 3 hours across RS Puram, Race Course, Peelamedu, Saravanampatti, and all Coimbatore pin codes.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/20 text-xs">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-accent-gold" />
                <span>Temperature-controlled fleet</span>
              </div>
              <span className="font-bold underline decoration-white/50">11 PM – 12 AM slot</span>
            </div>
          </div>

          {/* Card 3: 4.9★ Rated by 10,000+ Families */}
          <div className="md:col-span-1 lg:col-span-2 rounded-3xl p-8 bg-white border border-brand-200/80 shadow-warm-sm hover:shadow-warm-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-1 text-accent-gold mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent-gold" />
                ))}
                <span className="ml-2 text-xs font-bold text-truffle">4.95 / 5.0</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-truffle mb-2">
                Loved by 10,000+ Coimbatore Families
              </h3>

              <p className="text-xs sm:text-sm text-truffle/70 leading-relaxed mb-6">
                "The Belgian Truffle was out of this world! Not overly sweet, velvety chocolate texture, and arrived right at 12:00 AM on the dot. Take The Cake is now our family’s permanent bakery."
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-brand-100">
              <div className="w-10 h-10 rounded-full bg-brand-100 border border-brand-300 flex items-center justify-center font-serif font-bold text-brand-600 text-sm">
                SP
              </div>
              <div>
                <span className="text-xs font-bold text-truffle block">Sangeetha Prabhu</span>
                <span className="text-[10px] text-truffle/60">Race Course, Coimbatore</span>
              </div>
            </div>
          </div>

          {/* Card 4: Custom Designer & Wedding Sculpted Cakes */}
          <div className="md:col-span-2 lg:col-span-2 rounded-3xl p-8 bg-truffle text-cream-100 shadow-warm-md hover:shadow-warm-lg transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-60 h-60 bg-accent-gold/10 rounded-full blur-2xl" />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-accent-gold text-xs font-bold uppercase mb-4">
                <Crown className="w-3.5 h-3.5" />
                <span>Couture Bakery</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-cream-50 mb-3">
                Wedding & Sculpted Designer Cakes
              </h3>

              <p className="text-xs sm:text-sm text-cream-200/80 max-w-md leading-relaxed mb-6">
                Planning a grand wedding at Le Méridien or a customized themed celebration? Consult directly with our Master Pastry Chef for multi-tier architectural centerpieces.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs text-brand-300 font-medium">
                Personalized Tasting Sessions Available
              </span>
              <a
                href="https://wa.me/919894261291?text=Hi%20Take%20The%20Cake,%20I%20would%20like%20to%20inquire%20about%20a%20wedding/designer%20cake!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-500 text-white font-semibold text-xs hover:bg-brand-600 transition-all shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Consult Chef</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
