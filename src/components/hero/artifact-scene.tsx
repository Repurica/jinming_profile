"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

const panes = [
  { position: [-1.55, 0.55, 0] as const, rotation: [0.08, -0.24, -0.08] as const, size: [1.65, 1.05] as const, color: "#e4512b" },
  { position: [1.3, 0.8, -0.4] as const, rotation: [-0.04, 0.28, 0.12] as const, size: [1.4, 1.85] as const, color: "#775cff" },
  { position: [0.35, -0.75, 0.35] as const, rotation: [0.12, -0.1, -0.04] as const, size: [2.25, 0.9] as const, color: "#087f68" },
  { position: [-0.25, 0.15, -0.8] as const, rotation: [0, 0.08, 0.02] as const, size: [3.1, 2.15] as const, color: "#3b82f6" },
];

function ArtifactAssembly() {
  const group = useRef<Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const { invalidate } = useThree();

  useFrame(() => {
    const node = group.current;
    if (!node) return;
    node.rotation.x += (target.current.y * 0.1 - node.rotation.x) * 0.08;
    node.rotation.y += (target.current.x * 0.14 - node.rotation.y) * 0.08;
    if (Math.abs(target.current.x * 0.14 - node.rotation.y) > 0.001) invalidate();
  });

  return (
    <group
      ref={group}
      onPointerMove={(event) => {
        target.current = { x: event.pointer.x, y: event.pointer.y };
        invalidate();
      }}
      onPointerLeave={() => {
        target.current = { x: 0, y: 0 };
        invalidate();
      }}
    >
      {panes.map((pane, index) => (
        <mesh key={index} position={pane.position} rotation={pane.rotation}>
          <boxGeometry args={[pane.size[0], pane.size[1], 0.045]} />
          <meshStandardMaterial color="#f1efe9" roughness={0.88} metalness={0.02} />
          <Edges color={pane.color} threshold={15} />
        </mesh>
      ))}
      <mesh position={[0, 0, -1.15]}>
        <torusGeometry args={[2.25, 0.012, 6, 100]} />
        <meshBasicMaterial color="#8d8a82" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

export default function ArtifactScene() {
  return (
    <div className="artifact-canvas" aria-hidden="true">
      <Canvas
        frameloop="demand"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={2.2} />
        <directionalLight position={[4, 5, 6]} intensity={2.4} />
        <ArtifactAssembly />
      </Canvas>
    </div>
  );
}
