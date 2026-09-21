'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export type CakeFlavorId = 'raspberry-mousse' | 'belgian-truffle' | 'red-velvet' | 'royal-rasamalai';

interface CakeModelProps {
  flavor: CakeFlavorId;
  sliceProgress: number; // 0 (whole) to 1 (fully extracted slice)
  isHovered?: boolean;
}

const FLAVOR_CONFIGS: Record<
  CakeFlavorId,
  {
    name: string;
    frostingColor: string;
    dripColor: string;
    spongeColor: string;
    fillingColor: string;
    berryColor: string;
    roughness: number;
    metalness: number;
    sparkleColor: string;
  }
> = {
  'raspberry-mousse': {
    name: 'Exotic Raspberry Mousse',
    frostingColor: '#FFFDF9',
    dripColor: '#DD3724',
    spongeColor: '#F5DEB3',
    fillingColor: '#C41E3A',
    berryColor: '#D82B42',
    roughness: 0.35,
    metalness: 0.05,
    sparkleColor: '#DD3724',
  },
  'belgian-truffle': {
    name: 'Belgian Chocolate Truffle',
    frostingColor: '#20110E',
    dripColor: '#120806',
    spongeColor: '#3A1E18',
    fillingColor: '#190B08',
    berryColor: '#7D3C1B',
    roughness: 0.22,
    metalness: 0.15,
    sparkleColor: '#E5A338',
  },
  'red-velvet': {
    name: 'Classic Red Velvet Glaze',
    frostingColor: '#FCF8F2',
    dripColor: '#C02816',
    spongeColor: '#961B14',
    fillingColor: '#FCF8F2',
    berryColor: '#B82218',
    roughness: 0.38,
    metalness: 0.02,
    sparkleColor: '#C02816',
  },
  'royal-rasamalai': {
    name: 'Royal Rasamalai Saffron',
    frostingColor: '#FEF3D6',
    dripColor: '#F39C12',
    spongeColor: '#FDEBD0',
    fillingColor: '#F5B041',
    berryColor: '#27AE60', // Pistachio accent
    roughness: 0.3,
    metalness: 0.1,
    sparkleColor: '#F1C40F',
  },
};

export const ArtisanalCakeModel: React.FC<CakeModelProps> = ({
  flavor,
  sliceProgress,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const sliceGroupRef = useRef<THREE.Group>(null);

  const config = FLAVOR_CONFIGS[flavor] || FLAVOR_CONFIGS['raspberry-mousse'];

  // Gentle float & slow idle spin
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.08;
      // Idle rotate when sliceProgress is near 0
      if (sliceProgress < 0.1) {
        groupRef.current.rotation.y += delta * 0.35;
      }
    }

    // Animate slice extraction
    if (sliceGroupRef.current) {
      const targetDist = sliceProgress * 1.4;
      const angle = -Math.PI / 4; // 45 degrees outward
      sliceGroupRef.current.position.x = THREE.MathUtils.lerp(
        sliceGroupRef.current.position.x,
        Math.cos(angle) * targetDist,
        0.1
      );
      sliceGroupRef.current.position.z = THREE.MathUtils.lerp(
        sliceGroupRef.current.position.z,
        Math.sin(angle) * targetDist,
        0.1
      );
      sliceGroupRef.current.position.y = THREE.MathUtils.lerp(
        sliceGroupRef.current.position.y,
        sliceProgress * 0.15,
        0.1
      );
    }
  });

  // Rosettes positions around top rim (8 swirls)
  const rosettePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const count = 10;
    const radius = 1.35;
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      positions.push([Math.cos(theta) * radius, 0.95, Math.sin(theta) * radius]);
    }
    return positions;
  }, []);

  // Droplet drip positions
  const dripPositions = useMemo(() => {
    const drips: { pos: [number, number, number]; scale: [number, number, number] }[] = [];
    const count = 16;
    const radius = 1.52;
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      // random-looking drip lengths
      const length = 0.2 + (Math.sin(i * 3.7) + 1) * 0.15;
      drips.push({
        pos: [Math.cos(theta) * radius, 0.85 - length / 2, Math.sin(theta) * radius],
        scale: [0.12, length, 0.12],
      });
    }
    return drips;
  }, []);

  // Topping Berries (Raspberries / Cherries on top)
  const berryPositions = useMemo(() => {
    const berries: [number, number, number][] = [
      [0, 1.05, 0],
      [0.45, 1.02, 0.25],
      [-0.4, 1.02, 0.35],
      [0.2, 1.02, -0.5],
      [-0.35, 1.02, -0.3],
    ];
    return berries;
  }, []);

  // Golden leaf flakes on top
  const goldFlakes = useMemo(() => {
    const flakes: { pos: [number, number, number]; rot: [number, number, number] }[] = [];
    for (let i = 0; i < 14; i++) {
      const r = 0.3 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      flakes.push({
        pos: [Math.cos(theta) * r, 0.96, Math.sin(theta) * r],
        rot: [Math.random() * 0.2, Math.random() * Math.PI, Math.random() * 0.2],
      });
    }
    return flakes;
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* ================= PEDESTAL / CAKE STAND ================= */}
      <group position={[0, -0.5, 0]}>
        {/* Porcelain Stand Top Plate */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[1.85, 1.85, 0.08, 48]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.05} />
        </mesh>
        {/* Gold Rim on Stand */}
        <mesh position={[0, -0.05, 0]}>
          <torusGeometry args={[1.85, 0.02, 16, 48]} />
          <meshStandardMaterial color="#E5A338" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Stand Base Stem */}
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.35, 0.8, 0.55, 32]} />
          <meshStandardMaterial color="#FAF5EE" roughness={0.2} metalness={0.05} />
        </mesh>
        <mesh position={[0, -0.65, 0]}>
          <cylinderGeometry args={[0.9, 1.05, 0.1, 32]} />
          <meshStandardMaterial color="#FAF5EE" roughness={0.2} metalness={0.05} />
        </mesh>
      </group>

      {/* ================= MAIN CAKE BODY (300 DEGREE ARC) ================= */}
      <group>
        {/* Main Base Cylinder Frosting (Outer) */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry
            args={[1.5, 1.5, 1.4, 48, 1, false, Math.PI / 6, (Math.PI * 5) / 3]}
          />
          <meshStandardMaterial
            color={config.frostingColor}
            roughness={config.roughness}
            metalness={config.metalness}
          />
        </mesh>

        {/* Top Glaze Cap (300 degree) */}
        <mesh position={[0, 0.955, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.51, 48, Math.PI / 6, (Math.PI * 5) / 3]} />
          <meshStandardMaterial
            color={config.dripColor}
            roughness={0.18}
            metalness={0.12}
          />
        </mesh>

        {/* Drip Droplets along the perimeter of the main body */}
        {dripPositions.slice(0, 13).map((drip, idx) => (
          <mesh key={`drip-${idx}`} position={drip.pos} scale={drip.scale}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color={config.dripColor}
              roughness={0.2}
              metalness={0.1}
            />
          </mesh>
        ))}

        {/* Rosettes around rim */}
        {rosettePositions.slice(0, 8).map((pos, idx) => (
          <mesh key={`rosette-${idx}`} position={pos}>
            <sphereGeometry args={[0.13, 16, 16]} />
            <meshStandardMaterial
              color={config.frostingColor}
              roughness={0.4}
            />
          </mesh>
        ))}

        {/* ================= CUTAWAY WALLS (Cross-section internal layers) ================= */}
        {/* Wall 1 (Angle PI/6) */}
        <group rotation={[0, Math.PI / 6, 0]}>
          <mesh position={[0.75, 0.25, 0]}>
            <boxGeometry args={[1.5, 1.38, 0.02]} />
            <meshStandardMaterial color={config.spongeColor} roughness={0.6} />
          </mesh>
          {/* Internal Fruit Filling Stripe 1 */}
          <mesh position={[0.75, 0.45, 0.015]}>
            <boxGeometry args={[1.45, 0.12, 0.02]} />
            <meshStandardMaterial color={config.fillingColor} roughness={0.3} />
          </mesh>
          {/* Internal Fruit Filling Stripe 2 */}
          <mesh position={[0.75, 0.05, 0.015]}>
            <boxGeometry args={[1.45, 0.12, 0.02]} />
            <meshStandardMaterial color={config.fillingColor} roughness={0.3} />
          </mesh>
        </group>

        {/* Wall 2 (Angle 11*PI/6) */}
        <group rotation={[0, (Math.PI * 11) / 6, 0]}>
          <mesh position={[0.75, 0.25, 0]}>
            <boxGeometry args={[1.5, 1.38, 0.02]} />
            <meshStandardMaterial color={config.spongeColor} roughness={0.6} />
          </mesh>
          {/* Internal Fruit Filling Stripe 1 */}
          <mesh position={[0.75, 0.45, 0.015]}>
            <boxGeometry args={[1.45, 0.12, 0.02]} />
            <meshStandardMaterial color={config.fillingColor} roughness={0.3} />
          </mesh>
          {/* Internal Fruit Filling Stripe 2 */}
          <mesh position={[0.75, 0.05, 0.015]}>
            <boxGeometry args={[1.45, 0.12, 0.02]} />
            <meshStandardMaterial color={config.fillingColor} roughness={0.3} />
          </mesh>
        </group>

        {/* Top Fresh Berries */}
        {berryPositions.slice(0, 4).map((pos, idx) => (
          <group key={`berry-${idx}`} position={pos}>
            <mesh>
              <sphereGeometry args={[0.16, 24, 24]} />
              <meshStandardMaterial
                color={config.berryColor}
                roughness={0.25}
                metalness={0.1}
              />
            </mesh>
            {/* Tiny gold speck on berry */}
            <mesh position={[0, 0.14, 0.05]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial color="#E5A338" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        ))}

        {/* Gold flakes on top */}
        {goldFlakes.slice(0, 10).map((flake, idx) => (
          <mesh key={`flake-${idx}`} position={flake.pos} rotation={flake.rot}>
            <planeGeometry args={[0.08, 0.06]} />
            <meshStandardMaterial
              color="#F1C40F"
              metalness={0.95}
              roughness={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>

      {/* ================= THE EXTRACTABLE SLICE (60 DEGREE WEDGE) ================= */}
      <group ref={sliceGroupRef}>
        {/* Slice Outer Arc Frosting */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry
            args={[1.5, 1.5, 1.4, 16, 1, false, -Math.PI / 6, Math.PI / 3]}
          />
          <meshStandardMaterial
            color={config.frostingColor}
            roughness={config.roughness}
            metalness={config.metalness}
          />
        </mesh>

        {/* Slice Top Glaze */}
        <mesh position={[0, 0.955, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.51, 16, -Math.PI / 6, Math.PI / 3]} />
          <meshStandardMaterial
            color={config.dripColor}
            roughness={0.18}
            metalness={0.12}
          />
        </mesh>

        {/* Slice Inner Wall Left */}
        <group rotation={[0, -Math.PI / 6, 0]}>
          <mesh position={[0.75, 0.25, 0]}>
            <boxGeometry args={[1.5, 1.38, 0.02]} />
            <meshStandardMaterial color={config.spongeColor} roughness={0.6} />
          </mesh>
          <mesh position={[0.75, 0.45, 0.015]}>
            <boxGeometry args={[1.45, 0.12, 0.02]} />
            <meshStandardMaterial color={config.fillingColor} roughness={0.3} />
          </mesh>
          <mesh position={[0.75, 0.05, 0.015]}>
            <boxGeometry args={[1.45, 0.12, 0.02]} />
            <meshStandardMaterial color={config.fillingColor} roughness={0.3} />
          </mesh>
        </group>

        {/* Slice Inner Wall Right */}
        <group rotation={[0, Math.PI / 6, 0]}>
          <mesh position={[0.75, 0.25, 0]}>
            <boxGeometry args={[1.5, 1.38, 0.02]} />
            <meshStandardMaterial color={config.spongeColor} roughness={0.6} />
          </mesh>
          <mesh position={[0.75, 0.45, 0.015]}>
            <boxGeometry args={[1.45, 0.12, 0.02]} />
            <meshStandardMaterial color={config.fillingColor} roughness={0.3} />
          </mesh>
          <mesh position={[0.75, 0.05, 0.015]}>
            <boxGeometry args={[1.45, 0.12, 0.02]} />
            <meshStandardMaterial color={config.fillingColor} roughness={0.3} />
          </mesh>
        </group>

        {/* Slice Top Berry */}
        <group position={[1.0, 1.04, 0]}>
          <mesh>
            <sphereGeometry args={[0.15, 20, 20]} />
            <meshStandardMaterial
              color={config.berryColor}
              roughness={0.25}
              metalness={0.1}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
};
