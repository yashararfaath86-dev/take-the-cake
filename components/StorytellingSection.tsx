'use client';

import React from 'react';
import { Sparkles, Shield, Leaf, Heart, Award, Truck } from 'lucide-react';

export const StorytellingSection: React.FC = () => {
  const PILLARS = [
    {
      number: '01',
      icon: Leaf,
      title: 'Pure, Uncompromised Ingredients',
      highlight: '100% Belgian Couverture & French Dairy Butter',
      description:
        'We never use compound fats, artificial flavor oils, or synthetic substitutes. Every ganache is whisked from genuine single-origin Callebaut chocolate, farm cream, and fresh organic fruit purees.',
      accent: 'border-brand-500/20 bg-brand-50/40',
    },
    {
      number: '02',
      icon: Shield,
      title: 'Zero Chemical Preservatives',
      highlight: 'Small Batch, Baked to Order Daily',
      description:
        'Unlike industrial bakeries with shelf-extended pre-mixes, our sponges are whipped from scratch every morning. Pure food, true taste, and safe for your little ones and elders alike.',
      accent: 'border-accent-gold/30 bg-amber-50/40',
    },
    {
      number: '03',
      icon: Truck,
      title: 'Handcrafted in Coimbatore',
      highlight: 'Refrigerated Temperature-Controlled Transit',
      description:
        'Delivered straight from our artisanal kitchen to your celebration doorstep across Coimbatore. Packed in insulated luxury boxes to preserve perfect structure and silky ganache gloss.',
      accent: 'border-brand-500/20 bg-brand-50/40',
    },
  ];

  return (
    <section className="py-24 bg-truffle text-cream-100 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-accent-gold/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-brand-500/40 text-brand-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
            <span>The Take The Cake Standard</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-50">
            Why Every Bite Feels Like Pure Magic
          </h2>

          <p className="text-sm sm:text-base text-cream-200/80 max-w-xl mx-auto font-light">
            Founded with a singular passion: to bring Michelin-level pastry standards and heartfelt warmth to Coimbatore families.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.number}
                className="relative rounded-3xl p-8 border border-white/10 bg-white/[0.04] backdrop-blur-md hover:border-brand-500/50 hover:bg-white/[0.07] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-black text-brand-400/80 group-hover:text-brand-400 transition-colors">
                      {p.number}
                    </span>
                    <div className="p-3 rounded-2xl bg-brand-500/20 text-brand-400 border border-brand-500/30">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-cream-50 mb-2">
                    {p.title}
                  </h3>
                  <div className="text-xs font-semibold text-accent-gold mb-4 uppercase tracking-wider">
                    {p.highlight}
                  </div>
                  <p className="text-xs sm:text-sm text-cream-200/70 leading-relaxed font-light">
                    {p.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs text-brand-300 font-medium">
                  <Award className="w-4 h-4 text-accent-gold" />
                  <span>Verified Artisanal Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
