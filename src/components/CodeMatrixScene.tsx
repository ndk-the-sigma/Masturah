import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial, Stars, Text, Sparkles } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/* Streaming code rain — vertical particle columns falling in 3D */
function CodeRain() {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 1800;
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = Math.random() * 18 - 9;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const geom = ref.current.geometry as THREE.BufferGeometry;
    const pos = geom.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] -= delta * (0.6 + ((i % 7) * 0.18));
      if (arr[i * 3 + 1] < -9) arr[i * 3 + 1] = 9;
    }
    pos.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial transparent color="#a78bfa" size={0.05} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

/* Floating monospace glyphs — drifting hex/binary tokens */
const GLYPHS = ["0x7F", "01", "10", "FF", "AE", "C2", "{ }", "</>", "SHA", "AES", "256", "0xDE", "TCP", "SYN", "ACK", "PWN"];

function FloatingGlyphs() {
  const items = useMemo(() => {
    return new Array(22).fill(0).map((_, i) => ({
      text: GLYPHS[i % GLYPHS.length],
      pos: [
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 9,
        -2 - Math.random() * 6,
      ] as [number, number, number],
      color: i % 3 === 0 ? "#60a5fa" : i % 3 === 1 ? "#a78bfa" : "#7c3aed",
      size: 0.18 + Math.random() * 0.22,
      speed: 0.4 + Math.random() * 0.6,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  return (
    <>
      {items.map((it, i) => (
        <Float key={i} speed={it.speed} rotationIntensity={0.3} floatIntensity={1.2}>
          <Text
            position={it.pos}
            fontSize={it.size}
            color={it.color}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.004}
            outlineColor="#0a0617"
          >
            {it.text}
          </Text>
        </Float>
      ))}
    </>
  );
}

/* Wireframe terminal grid floor */
function GridFloor() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.14 + Math.sin(s.clock.elapsedTime * 0.7) * 0.05;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2.1, 0, 0]} position={[0, -3.4, -2]}>
      <planeGeometry args={[40, 30, 60, 40]} />
      <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.18} />
    </mesh>
  );
}

/* Scanning horizontal line — hacker aesthetic */
function ScanLine() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.position.y = Math.sin(s.clock.elapsedTime * 0.4) * 4;
  });
  return (
    <mesh ref={ref} position={[0, 0, -3]}>
      <planeGeometry args={[24, 0.04]} />
      <meshBasicMaterial color="#a78bfa" transparent opacity={0.55} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 5]} intensity={1.2} color="#a78bfa" />
      <pointLight position={[-5, -2, 3]} intensity={1.0} color="#3b82f6" />

      <Stars radius={70} depth={40} count={1200} factor={2.5} fade speed={0.5} />
      <CodeRain />
      <FloatingGlyphs />
      <GridFloor />
      <ScanLine />
      <Sparkles count={80} size={2} scale={[14, 8, 6]} speed={0.5} color="#60a5fa" />
    </>
  );
}

export function CodeMatrixScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.5, 7], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
