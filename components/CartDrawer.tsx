'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/utils';
import { COIMBATORE_LOCALITIES } from '@/data/cakes';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    deliveryFee,
    total,
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [locality, setLocality] = useState('RS Puram');
  const [deliveryDate, setDeliveryDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [deliverySlot, setDeliverySlot] = useState('Evening (4 PM - 7 PM)');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Checkout simulation modal state
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    let orderSummary = `🎂 *New Cake Order - Take The Cake (takethecake.in)*\n\n`;
    orderSummary += `*Customer Details:*\n`;
    orderSummary += `• Name: ${customerName || 'Customer'}\n`;
    orderSummary += `• Phone: ${phoneNumber || 'Via WhatsApp'}\n`;
    orderSummary += `• Address: ${deliveryAddress || locality}, Coimbatore\n`;
    orderSummary += `• Locality: ${locality}\n`;
    orderSummary += `• Date: ${deliveryDate}\n`;
    orderSummary += `• Slot: ${deliverySlot}\n\n`;

    orderSummary += `*Items Ordered:*\n`;
    items.forEach((item, index) => {
      orderSummary += `${index + 1}. *${item.name}* (${item.weight})\n`;
      orderSummary += `   - Dietary: ${item.isEggless ? '🌱 100% Eggless' : '🥚 With Eggs'}\n`;
      if (item.customPipingText) {
        orderSummary += `   - Piping Inscription: "${item.customPipingText}"\n`;
      }
      if (item.tiers) {
        orderSummary += `   - Tiers: ${item.tiers}\n`;
      }
      orderSummary += `   - Qty: ${item.quantity} × ${formatINR(item.price)} = ${formatINR(
        item.price * item.quantity
      )}\n\n`;
    });

    if (specialInstructions) {
      orderSummary += `*Special Note:* ${specialInstructions}\n\n`;
    }

    orderSummary += `*Subtotal:* ${formatINR(subtotal)}\n`;
    orderSummary += `*Delivery:* ${deliveryFee === 0 ? 'FREE' : formatINR(deliveryFee)}\n`;
    orderSummary += `*Grand Total:* ${formatINR(total)}\n\n`;
    orderSummary += `Please confirm baking slot and send payment QR!`;

    const encoded = encodeURIComponent(orderSummary);
    window.open(`https://wa.me/919894261291?text=${encoded}`, '_blank');
  };

  const handleSimulatedCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phoneNumber || !deliveryAddress) {
      alert('Please fill in your Name, Phone Number, and Address.');
      return;
    }

    setOrderConfirmed(true);
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#DD3724', '#E5A338', '#E08E79', '#1E100D'],
    });
  };

  const handleCloseAndReset = () => {
    setOrderConfirmed(false);
    clearCart();
    closeCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-truffle/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream-50 shadow-2xl flex flex-col justify-between overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-brand-200/80 bg-white sticky top-0 z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-50 text-brand-500">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-truffle">Your Cake Box</h2>
                <p className="text-xs text-truffle/60">
                  {items.length} {items.length === 1 ? 'creation' : 'creations'} selected
                </p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-2 rounded-full text-truffle/60 hover:text-truffle hover:bg-cream-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="p-6 space-y-6 flex-1">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-500 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif text-lg font-bold text-truffle">
                  Your cake box is empty
                </h3>
                <p className="text-xs text-truffle/60 max-w-xs mx-auto">
                  Explore our signature creations or craft a custom multi-tier cake in 3D.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-full bg-brand-500 text-white font-semibold text-xs shadow-warm-sm hover:bg-brand-600 transition-all"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                {/* List of Items */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white border border-brand-200/80 shadow-warm-sm flex gap-3"
                    >
                      {item.image && (
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-cream-100">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-serif text-sm font-bold text-truffle truncate">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-truffle/40 hover:text-brand-500 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-truffle/70">
                          <span className="font-semibold text-brand-600">{item.weight}</span>
                          <span>•</span>
                          <span>{item.isEggless ? '🌱 Eggless' : '🥚 Egg'}</span>
                        </div>

                        {item.customPipingText && (
                          <div className="mt-1 text-[11px] bg-brand-50/70 text-brand-700 px-2 py-0.5 rounded-md italic truncate">
                            "{item.customPipingText}"
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-brand-100/60">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded-full bg-cream-100 text-truffle flex items-center justify-center hover:bg-brand-100 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-truffle w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded-full bg-cream-100 text-truffle flex items-center justify-center hover:bg-brand-100 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-serif text-sm font-bold text-brand-500">
                            {formatINR(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Information Accordion / Inputs */}
                <div className="p-4 rounded-2xl bg-white border border-brand-200/80 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-truffle uppercase tracking-wide">
                    <MapPin className="w-3.5 h-3.5 text-brand-500" />
                    <span>Delivery Details (Coimbatore)</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Full Name *"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-cream-50 border border-brand-200 focus:outline-none focus:border-brand-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="tel"
                        placeholder="Phone / WhatsApp *"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-cream-50 border border-brand-200 focus:outline-none focus:border-brand-500"
                      />

                      <select
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-cream-50 border border-brand-200 focus:outline-none focus:border-brand-500"
                      >
                        {COIMBATORE_LOCALITIES.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <textarea
                        rows={2}
                        placeholder="Complete Street Address / Apartment *"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-cream-50 border border-brand-200 focus:outline-none focus:border-brand-500 text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-truffle/60 block mb-0.5">
                          Delivery Date:
                        </label>
                        <input
                          type="date"
                          value={deliveryDate}
                          onChange={(e) => setDeliveryDate(e.target.value)}
                          className="w-full px-2 py-1.5 rounded-xl bg-cream-50 border border-brand-200 text-xs focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-truffle/60 block mb-0.5">
                          Time Slot:
                        </label>
                        <select
                          value={deliverySlot}
                          onChange={(e) => setDeliverySlot(e.target.value)}
                          className="w-full px-2 py-1.5 rounded-xl bg-cream-50 border border-brand-200 text-xs focus:outline-none"
                        >
                          <option value="Morning (10 AM - 1 PM)">10 AM - 1 PM</option>
                          <option value="Evening (4 PM - 7 PM)">4 PM - 7 PM</option>
                          <option value="Midnight Special (11 PM - 12 AM)">
                            11 PM - 12 AM (Midnight)
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="p-4 rounded-2xl bg-cream-100/60 border border-brand-200/60 space-y-2 text-xs">
                  <div className="flex justify-between text-truffle/70">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-truffle">{formatINR(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-truffle/70">
                    <span>Delivery (Coimbatore):</span>
                    <span className="font-semibold text-truffle">
                      {deliveryFee === 0 ? (
                        <span className="text-green-600 font-bold">FREE (Orders &gt; ₹1,500)</span>
                      ) : (
                        formatINR(deliveryFee)
                      )}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-brand-200 flex justify-between items-center text-sm font-bold text-truffle">
                    <span>Grand Total:</span>
                    <span className="font-serif text-xl text-brand-500">{formatINR(total)}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Buttons */}
          {items.length > 0 && (
            <div className="p-6 border-t border-brand-200/80 bg-white space-y-2.5 sticky bottom-0 z-10">
              {/* WhatsApp Checkout Button (Primary Recommended) */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#25D366] text-white font-bold text-sm hover:bg-[#1EBE5D] transition-all shadow-warm-sm group"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Order via WhatsApp (+91 9894261291)</span>
              </button>

              {/* Instant Online Simulation Button */}
              <button
                onClick={handleSimulatedCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-brand-500 text-white font-bold text-sm hover:bg-brand-600 transition-all shadow-warm-sm"
              >
                <span>Direct Checkout ({formatINR(total)})</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-truffle/60 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                <span>100% Freshness Guarantee • Hygienic Sealed Packaging</span>
              </div>
            </div>
          )}

          {/* Confirmation Modal */}
          {orderConfirmed && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-brand-200">
                <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-500 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-brand-500 animate-bounce" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-truffle">
                    Order Received!
                  </h3>
                  <p className="text-xs text-truffle/70">
                    Thank you, <span className="font-semibold text-brand-600">{customerName}</span>! Our head pastry chef is preparing your fresh order for delivery to {locality}.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-cream-50 text-left text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-truffle/60">Order Total:</span>
                    <span className="font-bold text-brand-600">{formatINR(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-truffle/60">Date & Slot:</span>
                    <span className="font-medium text-truffle">{deliveryDate} ({deliverySlot})</span>
                  </div>
                </div>

                <button
                  onClick={handleCloseAndReset}
                  className="w-full py-3 rounded-full bg-brand-500 text-white font-bold text-xs hover:bg-brand-600 transition-all shadow-warm-sm"
                >
                  Done & Back to Bakery
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
