'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SIGNATURE_CAKES, CakeProduct } from '@/data/cakes';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/utils';
import { Star, Plus, Check, Sparkles, Heart, Info } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FlavorShowcase: React.FC = () => {
  const { addItem } = useCart();
  const [selectedWeights, setSelectedWeights] = useState<Record<string, string>>(
    SIGNATURE_CAKES.reduce((acc, cake) => ({ ...acc, [cake.id]: '0.5 kg' }), {})
  );
  const [egglessPreferences, setEgglessPreferences] = useState<Record<string, boolean>>(
    SIGNATURE_CAKES.reduce((acc, cake) => ({ ...acc, [cake.id]: true }), {})
  );
  const [pipingTexts, setPipingTexts] = useState<Record<string, string>>({});
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleWeightChange = (cakeId: string, weight: string) => {
    setSelectedWeights((prev) => ({ ...prev, [cakeId]: weight }));
  };

  const handleEgglessToggle = (cakeId: string) => {
    setEgglessPreferences((prev) => ({ ...prev, [cakeId]: !prev[cakeId] }));
  };

  const handlePipingTextChange = (cakeId: string, text: string) => {
    setPipingTexts((prev) => ({ ...prev, [cakeId]: text }));
  };

  const handleAddToCart = (cake: CakeProduct) => {
    const chosenWeightStr = selectedWeights[cake.id] || '0.5 kg';
    const weightOpt = cake.weightOptions.find((w) => w.weight === chosenWeightStr) || cake.weightOptions[0];
    const finalPrice = Math.round(cake.basePrice * weightOpt.multiplier);
    const isEggless = egglessPreferences[cake.id] ?? true;
    const pipingText = pipingTexts[cake.id] || '';

    addItem({
      cakeId: cake.id,
      name: cake.name,
      weight: chosenWeightStr,
      isEggless,
      price: finalPrice,
      quantity: 1,
      customPipingText: pipingText,
      image: cake.heroImage,
    });

    // Confetti burst
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#DD3724', '#E5A338', '#E08E79', '#FAF4ED'],
    });

    setAddedIds((prev) => ({ ...prev, [cake.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [cake.id]: false }));
    }, 1800);
  };

  return (
    <section id="flavors" className="py-20 bg-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-50/70 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cream-200/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-xs font-semibold text-brand-600 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Artisanal Collection</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-truffle">
            Signature Cake Creations
          </h2>
          <p className="text-sm sm:text-base text-truffle/70 max-w-2xl mx-auto">
            Each creation is baked to order using pure dairy butter, 100% Belgian couverture chocolate, and organic fruits. Choose your weight, eggless option, and personalized piping text.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SIGNATURE_CAKES.map((cake) => {
            const currentWeight = selectedWeights[cake.id] || '0.5 kg';
            const weightOpt = cake.weightOptions.find((w) => w.weight === currentWeight) || cake.weightOptions[0];
            const currentPrice = Math.round(cake.basePrice * weightOpt.multiplier);
            const isEggless = egglessPreferences[cake.id] ?? true;
            const isAdded = addedIds[cake.id];

            return (
              <div
                key={cake.id}
                className="group relative rounded-3xl bg-cream-50/70 border border-brand-200/70 overflow-hidden shadow-warm-sm hover:shadow-warm-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Image Container with Badges */}
                <div className="relative h-64 w-full overflow-hidden bg-cream-200/50">
                  <Image
                    src={cake.heroImage}
                    alt={cake.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-truffle/60 via-transparent to-transparent opacity-70" />

                  {/* Top Badge (e.g. Chef Signature) */}
                  {cake.badge && (
                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-brand-500 text-white text-[11px] font-semibold tracking-wide uppercase shadow-sm">
                      {cake.badge}
                    </div>
                  )}

                  {/* Rating Pill */}
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-truffle text-xs font-bold shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-accent-gold text-accent-gold" />
                    <span>{cake.rating}</span>
                    <span className="text-[10px] text-truffle/60">({cake.reviewsCount})</span>
                  </div>

                  {/* Serves info banner */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs text-white font-medium">
                    <span className="backdrop-blur-md bg-black/40 px-2.5 py-1 rounded-full text-[11px]">
                      Serves: {weightOpt.serves}
                    </span>
                    <span className="backdrop-blur-md bg-black/40 px-2.5 py-1 rounded-full text-[11px]">
                      {isEggless ? '🌱 100% Eggless' : '🥚 With Egg'}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Cake Title & Tagline */}
                    <div className="space-y-1 mb-2">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-truffle group-hover:text-brand-600 transition-colors">
                        {cake.name}
                      </h3>
                      <p className="text-xs font-medium text-brand-600 line-clamp-1">
                        {cake.tagline}
                      </p>
                    </div>

                    <p className="text-xs text-truffle/70 line-clamp-2 leading-relaxed mb-4">
                      {cake.description}
                    </p>

                    {/* Weight Options Pills */}
                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center justify-between text-[11px] font-medium text-truffle/80">
                        <span>Select Size:</span>
                        <span className="text-brand-600 font-semibold">{currentWeight}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {cake.weightOptions.map((opt) => (
                          <button
                            key={opt.weight}
                            onClick={() => handleWeightChange(cake.id, opt.weight)}
                            className={`py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                              currentWeight === opt.weight
                                ? 'bg-brand-500 text-white border-brand-500 shadow-xs'
                                : 'bg-white text-truffle/80 border-brand-100 hover:border-brand-300'
                            }`}
                          >
                            {opt.weight}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Eggless / Regular Toggle */}
                    <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white border border-brand-100 mb-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-3.5 h-3.5 rounded-sm border-2 flex items-center justify-center p-0.5 ${
                            isEggless ? 'border-green-600' : 'border-amber-700'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isEggless ? 'bg-green-600' : 'bg-amber-700'
                            }`}
                          />
                        </span>
                        <span className="text-xs font-semibold text-truffle">
                          {isEggless ? '100% Pure Eggless' : 'Regular (With Eggs)'}
                        </span>
                      </div>

                      <button
                        onClick={() => handleEgglessToggle(cake.id)}
                        className="text-[11px] font-medium text-brand-600 underline hover:text-brand-700"
                      >
                        Change
                      </button>
                    </div>

                    {/* Custom Piping Message Input */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-truffle/80 block">
                        Piping message on cake:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Happy Birthday Ananya!"
                        maxLength={35}
                        value={pipingTexts[cake.id] || ''}
                        onChange={(e) => handlePipingTextChange(cake.id, e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-brand-200/80 focus:outline-none focus:border-brand-500 placeholder:text-truffle/30"
                      />
                    </div>
                  </div>

                  {/* Price & Add to Cart Button */}
                  <div className="pt-4 border-t border-brand-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-truffle/60 uppercase tracking-wider block">
                        Total Price
                      </span>
                      <span className="font-serif text-2xl font-bold text-brand-500">
                        {formatINR(currentPrice)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(cake)}
                      disabled={isAdded}
                      className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full font-semibold text-xs tracking-wide transition-all shadow-sm ${
                        isAdded
                          ? 'bg-green-600 text-white'
                          : 'bg-brand-500 text-white hover:bg-brand-600 hover:shadow-warm-sm active:scale-95'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Box!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add to Box</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
