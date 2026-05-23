import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Icosahedron,
  MeshDistortMaterial,
  Points,
  PointMaterial,
  Torus,
  Stars,
  Trail,
  Sparkles,
  Environment,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Particle nebula                                                    */
/* ------------------------------------------------------------------ */
function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(2200 * 3);
    for (let i = 0; i < arr.length; i += 3) {
      const r = 5 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i] = r * Math.sin(phi) * Math.cos(theta);
      arr[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
      ref.current.rotation.x += delta * 0.012;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial transparent color="#a78bfa" size={0.022} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

/* ------------------------------------------------------------------ */
/*  Holographic rings                                                  */
/* ------------------------------------------------------------------ */
function HoloRings() {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!g.current) return;
    const t = s.clock.elapsedTime;
    g.current.rotation.x = Math.sin(t * 0.2) * 0.3;
    g.current.rotation.y = t * 0.18;
    g.current.rotation.z = Math.cos(t * 0.15) * 0.2;
  });
  return (
    <group ref={g}>
      <Torus args={[2.2, 0.012, 16, 200]}>
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.7} />
      </Torus>
      <Torus args={[2.55, 0.008, 16, 200]} rotation={[Math.PI / 2.2, 0, 0]}>
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.55} />
      </Torus>
      <Torus args={[2.9, 0.006, 16, 200]} rotation={[0, Math.PI / 2.4, Math.PI / 6]}>
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.4} />
      </Torus>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Orbiting comet with trail                                          */
/* ------------------------------------------------------------------ */
function OrbitComet({
  radius = 2.55,
  speed = 0.7,
  color = "#60a5fa",
  offset = 0,
  tilt = 0,
}: {
  radius?: number;
  speed?: number;
  color?: string;
  offset?: number;
  tilt?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 1.3) * tilt;
  });
  return (
    <Trail width={1.2} length={6} color={color} attenuation={(w) => w * w}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
}

/* ------------------------------------------------------------------ */
/*  Wireframe shell + distorted core "crest"                           */
/* ------------------------------------------------------------------ */
function Crest({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      // ease toward pointer
      group.current.rotation.y += (pointer.current.x * 0.6 - group.current.rotation.y) * 0.05;
      group.current.rotation.x += (-pointer.current.y * 0.4 - group.current.rotation.x) * 0.05;
    }
    if (inner.current) {
      inner.current.rotation.y = t * 0.35;
      inner.current.rotation.x = Math.sin(t * 0.4) * 0.25;
    }
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.15;
      shell.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.5}>
      <group ref={group}>
        {/* Outer wireframe shell */}
        <Icosahedron ref={shell} args={[1.95, 1]}>
          <meshBasicMaterial wireframe color="#3b82f6" transparent opacity={0.32} />
        </Icosahedron>
        {/* Mid wire layer */}
        <Icosahedron args={[1.55, 2]}>
          <meshBasicMaterial wireframe color="#a78bfa" transparent opacity={0.18} />
        </Icosahedron>
        {/* Distorted glowing core */}
        <mesh ref={inner}>
          <icosahedronGeometry args={[1.05, 6]} />
          <MeshDistortMaterial
            color="#7c3aed"
            roughness={0.1}
            metalness={0.85}
            distort={0.45}
            speed={1.8}
            emissive="#4c1d95"
            emissiveIntensity={0.55}
          />
        </mesh>
        {/* Inner sparkles */}
        <Sparkles count={40} size={2} scale={[3, 3, 3]} speed={0.6} color="#a78bfa" />
      </group>
    </Float>
  );
}

/* ------------------------------------------------------------------ */
/*  Scanning grid plane underneath                                     */
/* ------------------------------------------------------------------ */
function ScanGrid() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.elapsedTime;
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.08 + Math.sin(t * 0.8) * 0.04;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]}>
      <planeGeometry args={[30, 30, 40, 40]} />
      <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.12} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene                                                              */
/* ------------------------------------------------------------------ */
function Scene() {
  const pointer = useRef({ x: 0, y: 0 });

  useFrame(({ pointer: p }) => {
    pointer.current.x = p.x;
    pointer.current.y = p.y;
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.6} color="#a78bfa" />
      <pointLight position={[-5, -3, 4]} intensity={1.2} color="#3b82f6" />
      <pointLight position={[0, 0, -6]} intensity={0.6} color="#7c3aed" />

      <Stars radius={60} depth={40} count={1800} factor={3} saturation={0} fade speed={0.6} />
      <ParticleField />
      <ScanGrid />
      <HoloRings />
      <Crest pointer={pointer} />

      <OrbitComet radius={2.55} speed={0.9} color="#60a5fa" offset={0} tilt={0.4} />
      <OrbitComet radius={2.9} speed={-0.6} color="#a78bfa" offset={1.7} tilt={0.6} />
      <OrbitComet radius={2.2} speed={1.2} color="#7c3aed" offset={3.1} tilt={0.2} />

      <Environment preset="night" />
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.4, 6.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
