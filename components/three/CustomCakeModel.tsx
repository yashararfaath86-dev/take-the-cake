'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export interface CustomCakeConfig {
  tiers: number; // 1, 2, or 3
  baseFlavor: string; // 'chocolate', 'vanilla', 'red-velvet', 'pistachio', 'saffron'
  frostingColor: string;
  hasDrip: boolean;
  dripColor: string;
  toppings: string[]; // 'berries', 'macarons', 'gold', 'flowers'
  pipingText: string;
  pipingColor: string;
}

const BASE_COLOR_MAP: Record<string, { sponge: string; frosting: string; drip: string }> = {
  chocolate: {
    sponge: '#2C1713',
    frosting: '#3D201A',
    drip: '#170A08',
  },
  vanilla: {
    sponge: '#FBE8C8',
    frosting: '#FFFBF5',
    drip: '#DD3724',
  },
  'red-velvet': {
    sponge: '#961B14',
    frosting: '#FCF8F2',
    drip: '#C02816',
  },
  pistachio: {
    sponge: '#D1E7B7',
    frosting: '#E6F3D4',
    drip: '#88B04B',
  },
  saffron: {
    sponge: '#FDEBD0',
    frosting: '#FEF3D6',
    drip: '#F39C12',
  },
};

export const CustomCakeModel: React.FC<{ config: CustomCakeConfig }> = ({ config }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Slow smooth rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  const colors = BASE_COLOR_MAP[config.baseFlavor] || BASE_COLOR_MAP.chocolate;
  const frostingCol = config.frostingColor || colors.frosting;
  const dripCol = config.dripColor || colors.drip;

  // Tier 1 (Base): height 0.9, radius 1.5
  // Tier 2: height 0.8, radius 1.05
  // Tier 3: height 0.7, radius 0.65
  const tierHeight = 0.9;
  const tier2Height = 0.8;
  const tier3Height = 0.7;

  // Macaron positions
  const macaronPositions = useMemo(() => {
    const arr: { pos: [number, number, number]; col: string }[] = [];
    const colorsList = ['#E08E79', '#DD3724', '#F4BF5C', '#88B04B'];
    if (config.toppings.includes('macarons')) {
      const count = config.tiers > 1 ? 8 : 5;
      const radius = config.tiers > 1 ? 1.35 : 1.25;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        arr.push({
          pos: [Math.cos(angle) * radius, tierHeight + 0.08, Math.sin(angle) * radius],
          col: colorsList[i % colorsList.length],
        });
      }
    }
    return arr;
  }, [config.toppings, config.tiers]);

  // Berries positions
  const berryPositions = useMemo(() => {
    const arr: [number, number, number][] = [];
    if (config.toppings.includes('berries')) {
      // Top tier center
      const topY =
        config.tiers === 1
          ? tierHeight + 0.12
          : config.tiers === 2
          ? tierHeight + tier2Height + 0.12
          : tierHeight + tier2Height + tier3Height + 0.12;

      const topRadius = config.tiers === 1 ? 0.7 : config.tiers === 2 ? 0.5 : 0.35;
      for (let i = 0; i < 6; i++) {
        const theta = (i / 6) * Math.PI * 2;
        arr.push([Math.cos(theta) * topRadius, topY, Math.sin(theta) * topRadius]);
      }
      arr.push([0, topY + 0.05, 0]);
    }
    return arr;
  }, [config.toppings, config.tiers]);

  // Gold flakes
  const goldFlakes = useMemo(() => {
    const arr: [number, number, number][] = [];
    if (config.toppings.includes('gold')) {
      for (let i = 0; i < 16; i++) {
        const r = Math.random() * 1.2;
        const a = Math.random() * Math.PI * 2;
        arr.push([Math.cos(a) * r, tierHeight + 0.02, Math.sin(a) * r]);
      }
    }
    return arr;
  }, [config.toppings]);

  // Top surface Y
  const topSurfaceY =
    config.tiers === 1
      ? tierHeight
      : config.tiers === 2
      ? tierHeight + tier2Height
      : tierHeight + tier2Height + tier3Height;

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* Porcelain Stand */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[1.75, 1.75, 0.08, 48]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.05} />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <torusGeometry args={[1.75, 0.025, 16, 48]} />
        <meshStandardMaterial color="#E5A338" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* ================= TIER 1 (BASE) ================= */}
      <group position={[0, tierHeight / 2, 0]}>
        <mesh>
          <cylinderGeometry args={[1.45, 1.45, tierHeight, 48]} />
          <meshStandardMaterial color={frostingCol} roughness={0.35} />
        </mesh>
        {/* Tier 1 decorative border ring */}
        <mesh position={[0, -tierHeight / 2 + 0.05, 0]}>
          <torusGeometry args={[1.46, 0.035, 16, 48]} />
          <meshStandardMaterial color="#FAF4EB" roughness={0.5} />
        </mesh>
        {config.hasDrip && (
          <mesh position={[0, tierHeight / 2 - 0.05, 0]}>
            <torusGeometry args={[1.46, 0.04, 16, 48]} />
            <meshStandardMaterial color={dripCol} roughness={0.15} metalness={0.1} />
          </mesh>
        )}
      </group>

      {/* ================= TIER 2 (IF >= 2) ================= */}
      {config.tiers >= 2 && (
        <group position={[0, tierHeight + tier2Height / 2, 0]}>
          <mesh>
            <cylinderGeometry args={[1.05, 1.05, tier2Height, 48]} />
            <meshStandardMaterial color={frostingCol} roughness={0.35} />
          </mesh>
          <mesh position={[0, -tier2Height / 2 + 0.05, 0]}>
            <torusGeometry args={[1.06, 0.03, 16, 48]} />
            <meshStandardMaterial color="#FAF4EB" roughness={0.5} />
          </mesh>
          {config.hasDrip && (
            <mesh position={[0, tier2Height / 2 - 0.05, 0]}>
              <torusGeometry args={[1.06, 0.035, 16, 48]} />
              <meshStandardMaterial color={dripCol} roughness={0.15} metalness={0.1} />
            </mesh>
          )}
        </group>
      )}

      {/* ================= TIER 3 (IF 3) ================= */}
      {config.tiers >= 3 && (
        <group position={[0, tierHeight + tier2Height + tier3Height / 2, 0]}>
          <mesh>
            <cylinderGeometry args={[0.65, 0.65, tier3Height, 48]} />
            <meshStandardMaterial color={frostingCol} roughness={0.35} />
          </mesh>
          <mesh position={[0, -tier3Height / 2 + 0.05, 0]}>
            <torusGeometry args={[0.66, 0.025, 16, 48]} />
            <meshStandardMaterial color="#FAF4EB" roughness={0.5} />
          </mesh>
          {config.hasDrip && (
            <mesh position={[0, tier3Height / 2 - 0.05, 0]}>
              <torusGeometry args={[0.66, 0.03, 16, 48]} />
              <meshStandardMaterial color={dripCol} roughness={0.15} metalness={0.1} />
            </mesh>
          )}
        </group>
      )}

      {/* ================= MACARONS TOPPING ================= */}
      {macaronPositions.map((m, idx) => (
        <group key={`macaron-${idx}`} position={m.pos}>
          {/* Top half shell */}
          <mesh position={[0, 0.03, 0]}>
            <sphereGeometry args={[0.08, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={m.col} roughness={0.5} />
          </mesh>
          {/* Cream filling */}
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.075, 0.075, 0.02, 16]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          </mesh>
          {/* Bottom half shell */}
          <mesh position={[0, 0.01, 0]} rotation={[Math.PI, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={m.col} roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* ================= BERRIES TOPPING ================= */}
      {berryPositions.map((pos, idx) => (
        <mesh key={`top-berry-${idx}`} position={pos}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color="#DD3724" roughness={0.25} metalness={0.1} />
        </mesh>
      ))}

      {/* ================= GOLD FLAKES ================= */}
      {goldFlakes.map((pos, idx) => (
        <mesh key={`gold-${idx}`} position={pos} rotation={[0.1, idx * 0.4, 0]}>
          <planeGeometry args={[0.06, 0.04]} />
          <meshStandardMaterial
            color="#F1C40F"
            metalness={0.95}
            roughness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* ================= CUSTOM PIPING TEXT PLAQUE ================= */}
      {config.pipingText && (
        <group position={[0, topSurfaceY + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          {/* White / Gold chocolate plaque */}
          <mesh position={[0, 0, 0.005]}>
            <planeGeometry args={[1.2, 0.35]} />
            <meshStandardMaterial
              color="#FAF5EE"
              roughness={0.2}
              transparent
              opacity={0.92}
            />
          </mesh>
          {/* Plaque border */}
          <mesh position={[0, 0, 0.006]}>
            <planeGeometry args={[1.22, 0.37]} />
            <meshBasicMaterial color="#E5A338" wireframe />
          </mesh>

          {/* 3D Rendered Piping Inscription */}
          <Text
            position={[0, 0, 0.012]}
            fontSize={0.075}
            color={config.pipingColor || '#DD3724'}
            maxWidth={1.1}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
          >
            {config.pipingText}
          </Text>
        </group>
      )}
    </group>
  );
};
