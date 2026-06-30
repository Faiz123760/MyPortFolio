import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const EarthModel = () => {
  const earthRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (earthRef.current) {
      earthRef.current.rotation.y = time * 0.12;
      earthRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -time * 0.2;
      ringRef.current.rotation.y = Math.cos(time * 0.08) * 0.1;
    }
  });

  return (
    <group scale={[1.8, 1.8, 1.8]}>
      {/* Glow aura backplane */}
      <mesh>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial color="#915EFF" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>

      {/* Earth Wireframe Core */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.0, 24, 24]} />
        <meshStandardMaterial
          color="#0b0618"
          emissive="#6D28D9"
          emissiveIntensity={0.6}
          wireframe
          roughness={0.9}
        />
        {/* Glowing node sites */}
        <mesh position={[0.5, 0.6, 0.6]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#00E5FF" />
        </mesh>
        <mesh position={[-0.4, 0.7, -0.5]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#915EFF" />
        </mesh>
        <mesh position={[0.1, -0.8, 0.5]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#00E5FF" />
        </mesh>
      </mesh>

      {/* Satellite Connectivity Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0.2, 0]}>
        <torusGeometry args={[1.35, 0.015, 8, 64]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  );
};

export default EarthModel;
