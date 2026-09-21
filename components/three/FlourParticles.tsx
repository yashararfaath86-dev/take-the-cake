'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const FlourParticles: React.FC<{ count?: number; color?: string }> = ({
  count = 65,
  color = '#DD3724',
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 1.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const y = -0.6 + Math.random() * 2.8;

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius;

      sc[i] = Math.random() * 0.04 + 0.02;
    }
    return [pos, sc];
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
      pointsRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={color}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};
