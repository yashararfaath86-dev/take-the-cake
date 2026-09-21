'use client';

import React from 'react';
import Image from 'next/image';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  showTagline = true,
  size = 'md',
}) => {
  const heights = {
    sm: 'h-9',
    md: 'h-12',
    lg: 'h-16',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official TTC Monogram Badge */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-brand-500 shadow-warm-sm flex items-center justify-center border border-brand-400/30 transition-transform duration-300 group-hover:scale-105">
          <span className="font-serif italic font-bold text-white text-base md:text-lg tracking-tighter drop-shadow-sm">
            TtC
          </span>
        </div>
        {/* Ambient subtle glow */}
        <div className="absolute inset-0 rounded-full bg-brand-500/20 blur-md -z-10 animate-pulse-glow" />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-1.5">
          <span className="font-serif text-lg md:text-xl font-bold tracking-[0.14em] text-brand-500 uppercase">
            Take The Cake
          </span>
        </div>
        {showTagline && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="h-[1px] w-3 md:w-4 bg-brand-500/40" />
            <span className="text-[9px] md:text-[10px] tracking-[0.22em] text-brand-600/90 font-medium uppercase font-sans">
              Delight In Every Bite
            </span>
            <span className="h-[1px] w-3 md:w-4 bg-brand-500/40" />
          </div>
        )}
      </div>
    </div>
  );
};
