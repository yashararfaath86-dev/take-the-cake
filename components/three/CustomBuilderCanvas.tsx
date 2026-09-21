'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import { CustomCakeModel, CustomCakeConfig } from './CustomCakeModel';
import { FlourParticles } from './FlourParticles';
import { Rotate3d, Sparkles } from 'lucide-react';

interface CustomBuilderCanvasProps {
  config: CustomCakeConfig;
}

export const CustomBuilderCanvas: React.FC<CustomBuilderCanvasProps> = ({ config }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Adjust camera distance based on tiers
  const cameraZ = config.tiers === 3 ? 5.8 : config.tiers === 2 ? 5.0 : 4.5;
  const cameraY = config.tiers === 3 ? 2.8 : 2.2;

  return (
    <div className="relative w-full h-[450px] md:h-[550px] lg:h-[600px] rounded-3xl overflow-hidden glass-card bg-gradient-to-b from-white/95 via-cream-100/70 to-brand-50/50 border border-brand-200/60 shadow-warm-lg">
      {mounted ? (
        <Canvas
          camera={{ position: [0, cameraY, cameraZ], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          className="cursor-grab active:cursor-grabbing"
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 8, 5]} intensity={1.8} />
          <directionalLight position={[-4, 4, -2]} intensity={0.6} color="#FFF8F0" />
          <pointLight position={[0, -0.5, 2]} intensity={0.4} color="#E08E79" />

          <Suspense fallback={null}>
            <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.15}>
              <CustomCakeModel config={config} />
            </Float>
            <FlourParticles count={40} color="#E5A338" />
            <ContactShadows
              position={[0, -0.95, 0]}
              opacity={0.4}
              scale={5.5}
              blur={2.5}
              far={3.5}
              color="#1E100D"
            />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4.5}
            maxPolarAngle={Math.PI / 2.05}
            dampingFactor={0.05}
          />
        </Canvas>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
            <span className="text-xs font-serif text-brand-600">Loading 3D Studio...</span>
          </div>
        </div>
      )}

      {/* Live 3D Overlay Indicators */}
      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-brand-200 shadow-sm pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-accent-gold animate-pulse" />
        <span className="text-[11px] font-semibold text-truffle tracking-wide uppercase">
          Live 3D Preview • {config.tiers}-Tier Architecture
        </span>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-truffle/90 backdrop-blur-md text-cream-100 text-[11px] shadow-sm pointer-events-none">
        <Rotate3d className="w-3.5 h-3.5 text-brand-400" />
        <span>Rotate to inspect 360°</span>
      </div>
    </div>
  );
};
