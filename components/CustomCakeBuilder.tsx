'use client';

import React, { useState } from 'react';
import { CustomBuilderCanvas } from './three/CustomBuilderCanvas';
import { CustomCakeConfig } from './three/CustomCakeModel';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/utils';
import { COIMBATORE_LOCALITIES } from '@/data/cakes';
import {
  Sparkles,
  Layers,
  Cake,
  Palette,
  Type,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CustomCakeBuilder: React.FC = () => {
  const { addItem } = useCart();

  // Builder configuration state
  const [config, setConfig] = useState<CustomCakeConfig>({
    tiers: 2,
    baseFlavor: 'chocolate',
    frostingColor: '#3D201A',
    hasDrip: true,
    dripColor: '#170A08',
    toppings: ['berries', 'macarons'],
    pipingText: 'Happy Celebration!',
    pipingColor: '#DD3724',
  });

  const [activeStep, setActiveStep] = useState<number>(1);
  const [isEggless, setIsEggless] = useState<boolean>(true);
  const [deliveryDate, setDeliveryDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [deliverySlot, setDeliverySlot] = useState<string>('Standard (4 PM - 7 PM)');
  const [locality, setLocality] = useState<string>('RS Puram');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Flavor selections
  const FLAVOR_OPTIONS = [
    {
      id: 'chocolate',
      name: 'Belgian Dark Truffle',
      desc: '70% Dark Ganache + Fudge Sponge',
      frosting: '#3D201A',
      drip: '#170A08',
      pipingCol: '#E5A338',
      basePrice: 1200,
    },
    {
      id: 'vanilla',
      name: 'Tahitian Vanilla Bean',
      desc: 'Madagascar Cream + Velvety Chiffon',
      frosting: '#FFFBF5',
      drip: '#DD3724',
      pipingCol: '#DD3724',
      basePrice: 1050,
    },
    {
      id: 'red-velvet',
      name: 'Classic Red Velvet Glaze',
      desc: 'Philadelphia Frosting + Crimson Cocoa',
      frosting: '#FCF8F2',
      drip: '#C02816',
      pipingCol: '#C02816',
      basePrice: 1150,
    },
    {
      id: 'pistachio',
      name: 'Pistachio Rose Blossom',
      desc: 'Persian Pistachio Cream + Rose Water',
      frosting: '#E6F3D4',
      drip: '#88B04B',
      pipingCol: '#2E5A1C',
      basePrice: 1350,
    },
    {
      id: 'saffron',
      name: 'Royal Saffron Rasamalai',
      desc: 'Kashmir Kesar + Cardamom Anglo-Cream',
      frosting: '#FEF3D6',
      drip: '#F39C12',
      pipingCol: '#DD3724',
      basePrice: 1400,
    },
  ];

  // Tier multiplier
  const TIER_OPTIONS = [
    { tiers: 1, label: '1 Tier (1.0 kg)', serves: '6-8 guests', mult: 1.0 },
    { tiers: 2, label: '2 Tiers (2.5 kg)', serves: '18-22 guests', mult: 2.3 },
    { tiers: 3, label: 'Grand 3 Tiers (4.5 kg)', serves: '35-40 guests', mult: 3.8 },
  ];

  // Toppings
  const TOPPING_OPTIONS = [
    { id: 'berries', label: 'Fresh Wild Berries', price: 150 },
    { id: 'macarons', label: 'Artisanal French Macarons', price: 200 },
    { id: 'gold', label: '24k Edible Gold Leaf', price: 250 },
    { id: 'flowers', label: 'Organic Edible Florals', price: 180 },
  ];

  // Price Calculation
  const chosenFlavor = FLAVOR_OPTIONS.find((f) => f.id === config.baseFlavor) || FLAVOR_OPTIONS[0];
  const chosenTier = TIER_OPTIONS.find((t) => t.tiers === config.tiers) || TIER_OPTIONS[1];
  const toppingsPrice = config.toppings.reduce((sum, topId) => {
    const top = TOPPING_OPTIONS.find((t) => t.id === topId);
    return sum + (top ? top.price : 0);
  }, 0);
  const totalPrice = Math.round(chosenFlavor.basePrice * chosenTier.mult + toppingsPrice);

  const toggleTopping = (topId: string) => {
    setConfig((prev) => {
      const exists = prev.toppings.includes(topId);
      const nextToppings = exists
        ? prev.toppings.filter((t) => t !== topId)
        : [...prev.toppings, topId];
      return { ...prev, toppings: nextToppings };
    });
  };

  const handleSelectFlavor = (opt: (typeof FLAVOR_OPTIONS)[0]) => {
    setConfig((prev) => ({
      ...prev,
      baseFlavor: opt.id,
      frostingColor: opt.frosting,
      dripColor: opt.drip,
      pipingColor: opt.pipingCol,
    }));
  };

  const handleAddToBox = () => {
    addItem({
      cakeId: `custom-${config.baseFlavor}-${config.tiers}`,
      name: `Custom 3D Cake (${chosenFlavor.name})`,
      weight: chosenTier.label,
      isEggless,
      price: totalPrice,
      quantity: 1,
      customPipingText: config.pipingText,
      tiers: config.tiers,
      spongeFlavor: chosenFlavor.name,
      frostingFlavor: chosenFlavor.desc,
      toppings: config.toppings,
      deliveryDate,
      deliverySlot: `${deliverySlot} - ${locality}`,
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=900&q=80',
    });

    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#DD3724', '#E5A338', '#FFFFFF', '#E08E79'],
    });

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `🎂 *New Custom 3D Cake Order - Take The Cake*\n\n` +
      `• *Base Flavor:* ${chosenFlavor.name}\n` +
      `• *Architecture:* ${chosenTier.label} (${config.tiers} Tiers)\n` +
      `• *Dietary:* ${isEggless ? '100% Pure Eggless' : 'Regular (Egg)'}\n` +
      `• *Toppings:* ${config.toppings.length > 0 ? config.toppings.join(', ') : 'None'}\n` +
      `• *Piping Inscription:* "${config.pipingText || 'None'}"\n` +
      `• *Delivery Date:* ${deliveryDate}\n` +
      `• *Time Slot:* ${deliverySlot}\n` +
      `• *Delivery Locality:* ${locality}, Coimbatore\n` +
      `• *Estimated Total:* ${formatINR(totalPrice)}\n\n` +
      `Please confirm availability and baking slot!`
    );
    window.open(`https://wa.me/919894261291?text=${text}`, '_blank');
  };

  return (
    <section id="3d-builder" className="py-20 bg-cream-100/60 relative overflow-hidden border-t border-b border-brand-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-600 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Interactive 3D Studio</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-truffle">
            Design Your Custom Cake in Real-Time 3D
          </h2>
          <p className="text-sm sm:text-base text-truffle/70 max-w-xl mx-auto">
            Stack tiers, coat with velvety glazes, garnish with hand-dipped macarons & 24k gold, and engrave your celebratory message with live 3D rendering.
          </p>
        </div>

        {/* Builder Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3D Live Viewport (Sticky on desktop) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
            <CustomBuilderCanvas config={config} />

            {/* Live Specs Card below viewport */}
            <div className="p-4 rounded-2xl bg-white/90 border border-brand-200 shadow-warm-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] text-truffle/60 uppercase tracking-wide block">
                  Configuration Summary
                </span>
                <span className="text-xs sm:text-sm font-bold text-truffle">
                  {chosenFlavor.name} • {config.tiers} Tiers • {isEggless ? 'Eggless' : 'Egg'}
                </span>
                <p className="text-[11px] text-brand-600 font-medium">
                  {config.pipingText ? `Inscription: "${config.pipingText}"` : 'No inscription'}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-truffle/60 uppercase tracking-wide block">
                  Estimated Price
                </span>
                <span className="font-serif text-2xl font-bold text-brand-500">
                  {formatINR(totalPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 5-Step Configurator Controls */}
          <div className="lg:col-span-6 space-y-6">
            {/* Step Navigation Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {[
                { step: 1, label: '1. Flavor', icon: Cake },
                { step: 2, label: '2. Tiers', icon: Layers },
                { step: 3, label: '3. Toppings', icon: Palette },
                { step: 4, label: '4. Inscription', icon: Type },
                { step: 5, label: '5. Delivery', icon: Calendar },
              ].map((item) => {
                const Icon = item.icon;
                const active = activeStep === item.step;
                return (
                  <button
                    key={item.step}
                    onClick={() => setActiveStep(item.step)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      active
                        ? 'bg-brand-500 text-white shadow-warm-sm scale-[1.02]'
                        : 'bg-white/80 text-truffle/70 hover:bg-white border border-brand-100'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Step 1: Base Flavor & Filling */}
            {activeStep === 1 && (
              <div className="space-y-4 p-6 rounded-3xl bg-white border border-brand-200 shadow-warm-sm">
                <div>
                  <h3 className="font-serif text-xl font-bold text-truffle">
                    Step 1: Select Cake Flavor & Glaze
                  </h3>
                  <p className="text-xs text-truffle/60">
                    Crafted with French butter, single-origin chocolate, and fresh fruit purees.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FLAVOR_OPTIONS.map((opt) => {
                    const isSelected = config.baseFlavor === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectFlavor(opt)}
                        className={`p-3.5 rounded-2xl text-left border transition-all ${
                          isSelected
                            ? 'border-brand-500 bg-brand-50/50 shadow-warm-sm'
                            : 'border-brand-100 bg-white hover:border-brand-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-serif text-sm font-bold text-truffle">
                            {opt.name}
                          </span>
                          <span
                            className="w-4 h-4 rounded-full border border-black/10"
                            style={{ backgroundColor: opt.frosting }}
                          />
                        </div>
                        <p className="text-[11px] text-truffle/60 leading-tight">
                          {opt.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Eggless / Regular Toggle */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-cream-50 border border-brand-100 mt-2">
                  <span className="text-xs font-semibold text-truffle">
                    Dietary Requirement:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsEggless(true)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        isEggless
                          ? 'bg-green-600 text-white shadow-xs'
                          : 'bg-white text-truffle/70 border border-brand-100'
                      }`}
                    >
                      🌱 100% Eggless
                    </button>
                    <button
                      onClick={() => setIsEggless(false)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        !isEggless
                          ? 'bg-amber-700 text-white shadow-xs'
                          : 'bg-white text-truffle/70 border border-brand-100'
                      }`}
                    >
                      🥚 Regular (With Eggs)
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-500 text-white text-xs font-semibold shadow-warm-sm hover:bg-brand-600 transition-all"
                  >
                    <span>Next: Choose Tiers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Choose Tiers */}
            {activeStep === 2 && (
              <div className="space-y-4 p-6 rounded-3xl bg-white border border-brand-200 shadow-warm-sm">
                <div>
                  <h3 className="font-serif text-xl font-bold text-truffle">
                    Step 2: Architecture & Tiers
                  </h3>
                  <p className="text-xs text-truffle/60">
                    Watch the 3D model stack tiers instantly in real-time.
                  </p>
                </div>

                <div className="space-y-3">
                  {TIER_OPTIONS.map((tier) => {
                    const isSelected = config.tiers === tier.tiers;
                    return (
                      <button
                        key={tier.tiers}
                        onClick={() => setConfig((prev) => ({ ...prev, tiers: tier.tiers }))}
                        className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                          isSelected
                            ? 'border-brand-500 bg-brand-50/50 shadow-warm-sm'
                            : 'border-brand-100 bg-white hover:border-brand-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                              isSelected ? 'bg-brand-500 text-white' : 'bg-cream-200 text-truffle'
                            }`}
                          >
                            {tier.tiers}T
                          </div>
                          <div>
                            <span className="font-serif text-sm font-bold text-truffle block">
                              {tier.label}
                            </span>
                            <span className="text-[11px] text-truffle/60">
                              Serves: {tier.serves}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-semibold text-brand-600">
                          {formatINR(Math.round(chosenFlavor.basePrice * tier.mult))}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Drip glaze toggle */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-cream-50 border border-brand-100">
                  <span className="text-xs font-semibold text-truffle">
                    Chocolate Crown Ganache Drip:
                  </span>
                  <button
                    onClick={() => setConfig((prev) => ({ ...prev, hasDrip: !prev.hasDrip }))}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      config.hasDrip
                        ? 'bg-brand-500 text-white shadow-xs'
                        : 'bg-white text-truffle/70 border border-brand-100'
                    }`}
                  >
                    {config.hasDrip ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="px-4 py-2 text-xs font-semibold text-truffle/70 hover:text-truffle"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setActiveStep(3)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-500 text-white text-xs font-semibold shadow-warm-sm hover:bg-brand-600 transition-all"
                  >
                    <span>Next: Add Toppings</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Toppings & Flowers */}
            {activeStep === 3 && (
              <div className="space-y-4 p-6 rounded-3xl bg-white border border-brand-200 shadow-warm-sm">
                <div>
                  <h3 className="font-serif text-xl font-bold text-truffle">
                    Step 3: Artisanal Toppings & Accents
                  </h3>
                  <p className="text-xs text-truffle/60">
                    Garnish the tiers with luxury French macarons, wild berries, or edible 24k gold.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TOPPING_OPTIONS.map((top) => {
                    const isSelected = config.toppings.includes(top.id);
                    return (
                      <button
                        key={top.id}
                        onClick={() => toggleTopping(top.id)}
                        className={`p-3.5 rounded-2xl text-left border flex items-center justify-between transition-all ${
                          isSelected
                            ? 'border-brand-500 bg-brand-50/50 shadow-warm-sm'
                            : 'border-brand-100 bg-white hover:border-brand-300'
                        }`}
                      >
                        <div>
                          <span className="font-serif text-xs font-bold text-truffle block">
                            {top.label}
                          </span>
                          <span className="text-[10px] text-brand-600 font-medium">
                            +{formatINR(top.price)}
                          </span>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                            isSelected
                              ? 'bg-brand-500 border-brand-500 text-white'
                              : 'border-brand-200 bg-white'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-4 py-2 text-xs font-semibold text-truffle/70 hover:text-truffle"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setActiveStep(4)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-500 text-white text-xs font-semibold shadow-warm-sm hover:bg-brand-600 transition-all"
                  >
                    <span>Next: Custom Piping</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Custom Piping Inscription */}
            {activeStep === 4 && (
              <div className="space-y-4 p-6 rounded-3xl bg-white border border-brand-200 shadow-warm-sm">
                <div>
                  <h3 className="font-serif text-xl font-bold text-truffle">
                    Step 4: Custom Piping Message
                  </h3>
                  <p className="text-xs text-truffle/60">
                    Type your message to watch it render in 3D right on top of the cake.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-truffle block">
                    Message to Pipe (Max 35 chars):
                  </label>
                  <input
                    type="text"
                    maxLength={35}
                    value={config.pipingText}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, pipingText: e.target.value }))
                    }
                    placeholder="e.g. Happy 25th Birthday Rhea!"
                    className="w-full text-sm px-4 py-3 rounded-2xl bg-cream-50 border border-brand-200 focus:outline-none focus:border-brand-500 font-medium"
                  />
                  <div className="flex items-center justify-between text-[11px] text-truffle/60">
                    <span>Quick presets:</span>
                    <span>{config.pipingText.length}/35 characters</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      'Happy Birthday!',
                      'Happy Anniversary!',
                      'Congratulations!',
                      'Best Wishes!',
                    ].map((preset) => (
                      <button
                        key={preset}
                        onClick={() =>
                          setConfig((prev) => ({ ...prev, pipingText: preset }))
                        }
                        className="px-2.5 py-1 rounded-lg bg-cream-100 hover:bg-brand-100 text-[11px] text-truffle font-medium border border-brand-200/50"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-4 py-2 text-xs font-semibold text-truffle/70 hover:text-truffle"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setActiveStep(5)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-500 text-white text-xs font-semibold shadow-warm-sm hover:bg-brand-600 transition-all"
                  >
                    <span>Next: Delivery Slot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Delivery Details & Order Finalization */}
            {activeStep === 5 && (
              <div className="space-y-4 p-6 rounded-3xl bg-white border border-brand-200 shadow-warm-sm">
                <div>
                  <h3 className="font-serif text-xl font-bold text-truffle">
                    Step 5: Coimbatore Delivery Slot
                  </h3>
                  <p className="text-xs text-truffle/60">
                    Temperature-controlled refrigerated vans deliver safely to your doorstep.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-truffle/80 block mb-1">
                      Delivery Date:
                    </label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-cream-50 border border-brand-200 focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-truffle/80 block mb-1">
                      Coimbatore Locality:
                    </label>
                    <select
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-cream-50 border border-brand-200 focus:outline-none focus:border-brand-500"
                    >
                      {COIMBATORE_LOCALITIES.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-truffle/80 block mb-1">
                    Time Window:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      'Morning (10 AM - 1 PM)',
                      'Standard (4 PM - 7 PM)',
                      'Midnight Special (11 PM - 12 AM)',
                    ].map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setDeliverySlot(slot)}
                        className={`p-2 rounded-xl text-left border text-[11px] font-medium transition-all ${
                          deliverySlot === slot
                            ? 'bg-brand-500 text-white border-brand-500'
                            : 'bg-cream-50 text-truffle border-brand-100 hover:border-brand-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Final Order Action Buttons */}
                <div className="pt-4 border-t border-brand-100 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToBox}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-xs tracking-wide transition-all shadow-warm-sm ${
                      addedSuccess
                        ? 'bg-green-600 text-white'
                        : 'bg-brand-500 text-white hover:bg-brand-600 hover:shadow-glow'
                    }`}
                  >
                    {addedSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Added to Cart Box!</span>
                      </>
                    ) : (
                      <>
                        <Cake className="w-4 h-4" />
                        <span>Add Custom Cake to Box ({formatINR(totalPrice)})</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleWhatsAppOrder}
                    className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#25D366] text-white font-bold text-xs hover:bg-[#1EBE5D] transition-all shadow-warm-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Direct Order</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
