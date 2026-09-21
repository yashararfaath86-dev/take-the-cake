'use client';

import React from 'react';
import { Star, Quote, CheckCircle, Sparkles } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const REVIEWS = [
    {
      name: 'Dr. Keerthi Sundaram',
      locality: 'RS Puram, Coimbatore',
      rating: 5,
      cake: 'Exotic Raspberry Mousse',
      text: 'The best mousse cake I have ever tasted in Tamil Nadu! The balance of the tart wild berries with the Valrhona white chocolate is sublime. It arrived chilled and spotless.',
      date: '2 days ago',
    },
    {
      name: 'Aditya & Divya Narayanan',
      locality: 'Race Course, Coimbatore',
      rating: 5,
      cake: 'Custom 2-Tier Belgian Truffle',
      text: 'We used the 3D builder to design our daughter’s 5th birthday cake with custom lettering. It looked identical to the 3D model on screen! Every guest asked where we ordered from.',
      date: 'Last week',
    },
    {
      name: 'Vigneshwaran M.',
      locality: 'Peelamedu, Coimbatore',
      rating: 5,
      cake: 'Classic Red Velvet Glaze',
      text: 'Genuine Philadelphia cream cheese frosting instead of sugary imitation icing. The midnight delivery team was so courteous and punctual at exactly 11:58 PM.',
      date: '3 weeks ago',
    },
    {
      name: 'Meera Chandrasekhar',
      locality: 'Saibaba Colony, Coimbatore',
      rating: 5,
      cake: 'Royal Rasamalai Saffron',
      text: 'Ordered for our housewarming celebration. The saffron aroma and cardamom infusion were heavenly. Even the grandparents who normally avoid bakery cakes had seconds!',
      date: '1 month ago',
    },
  ];

  return (
    <section id="reviews" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-xs font-semibold text-brand-600 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Community Love</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-truffle">
            Celebrated by Coimbatore
          </h2>
          <p className="text-sm sm:text-base text-truffle/70 max-w-xl mx-auto">
            Real celebrations, genuine smiles, and 4.95-star ratings across over 10,000 deliveries.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-cream-50/70 border border-brand-200/70 shadow-warm-sm hover:shadow-warm-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-accent-gold mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent-gold text-accent-gold" />
                  ))}
                </div>

                <Quote className="w-6 h-6 text-brand-400/40 mb-2" />

                <p className="text-xs sm:text-sm text-truffle/80 leading-relaxed italic mb-4">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-brand-200/50">
                <div className="text-xs font-bold text-truffle">{rev.name}</div>
                <div className="text-[11px] text-truffle/60">{rev.locality}</div>
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white text-[10px] font-semibold text-brand-600 border border-brand-200">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>Ordered: {rev.cake}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
