'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import { ArtisanalCakeModel, CakeFlavorId } from './ArtisanalCakeModel';
import { FlourParticles } from './FlourParticles';
import { Sparkles, Eye, Scissors, RotateCcw } from 'lucide-react';

interface HeroCakeCanvasProps {
  onFlavorChange?: (flavor: CakeFlavorId) => void;
}

export const HeroCakeCanvas: React.FC<HeroCakeCanvasProps> = ({ onFlavorChange }) => {
  const [flavor, setFlavor] = useState<CakeFlavorId>('raspberry-mousse');
  const [sliceProgress, setSliceProgress] = useState<number>(0);
  const [isSliced, setIsSliced] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFlavorSelect = (selected: CakeFlavorId) => {
    setFlavor(selected);
    onFlavorChange?.(selected);
  };

  const handleToggleSlice = () => {
    const next = !isSliced;
    setIsSliced(next);
    setSliceProgress(next ? 0.95 : 0);
  };

  const FLAVOR_BUTTONS: { id: CakeFlavorId; label: string; dot: string }[] = [
    { id: 'raspberry-mousse', label: 'Wild Berry', dot: '#DD3724' },
    { id: 'belgian-truffle', label: '70% Truffle', dot: '#2A1612' },
    { id: 'red-velvet', label: 'Red Velvet', dot: '#C02816' },
    { id: 'royal-rasamalai', label: 'Rasamalai', dot: '#E5A338' },
  ];

  return (
    <div className="relative w-full h-[520px] lg:h-[620px] rounded-3xl overflow-hidden glass-card bg-gradient-to-b from-white/90 via-cream-100/60 to-brand-50/40 p-4 border border-brand-200/50 shadow-warm-lg">
      {/* 3D Canvas Viewport */}
      {mounted ? (
        <Canvas
          camera={{ position: [0, 2.5, 4.8], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="cursor-grab active:cursor-grabbing"
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 8, 5]} intensity={1.8} castShadow />
          <directionalLight position={[-4, 4, -2]} intensity={0.7} color="#FFF8F0" />
          <pointLight position={[0, -1, 2]} intensity={0.5} color="#E08E79" />

          <Suspense fallback={null}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
              <ArtisanalCakeModel flavor={flavor} sliceProgress={sliceProgress} />
            </Float>
            <FlourParticles count={70} color="#DD3724" />
            <ContactShadows
              position={[0, -0.9, 0]}
              opacity={0.45}
              scale={6}
              blur={2.5}
              far={4}
              color="#1E100D"
            />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4.5}
            maxPolarAngle={Math.PI / 2.05}
            rotateSpeed={0.8}
            dampingFactor={0.05}
          />
        </Canvas>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
            <span className="text-xs font-serif text-brand-600">Preparing 3D Kitchen...</span>
          </div>
        </div>
      )}

      {/* Top Floating Badge & 360° indicator */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-brand-200 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-500" />
          <span className="text-[11px] font-semibold text-truffle tracking-wide uppercase">
            Interactive 3D Artisanal Cake
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-truffle/90 backdrop-blur-md text-cream-100 text-[11px] shadow-sm">
          <Eye className="w-3.5 h-3.5 text-accent-gold" />
          <span>Drag 360° to inspect</span>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none">
        {/* Flavor Switcher Chips */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-brand-200/80 shadow-warm-sm">
          {FLAVOR_BUTTONS.map((btn) => {
            const active = flavor === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => handleFlavorSelect(btn.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  active
                    ? 'bg-brand-500 text-white shadow-warm-sm scale-[1.03]'
                    : 'text-truffle hover:bg-brand-50'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-white/60"
                  style={{ backgroundColor: btn.dot }}
                />
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>

        {/* Slice Inside Reveal Button & Slider */}
        <div className="pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-200/80 shadow-warm-sm">
          <button
            onClick={handleToggleSlice}
            className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-all ${
              isSliced
                ? 'bg-brand-500 text-white'
                : 'text-brand-600 hover:bg-brand-50'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>{isSliced ? 'Reset Cake' : 'Slice Open Inside'}</span>
          </button>

          {isSliced && (
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={sliceProgress}
              onChange={(e) => setSliceProgress(parseFloat(e.target.value))}
              className="w-20 accent-brand-500 cursor-pointer h-1.5 bg-brand-100 rounded-lg"
              title="Slice separation distance"
            />
          )}
        </div>
      </div>
    </div>
  );
};
