import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PaperPlaneModel = ({ isSending, isSuccess }) => {
  const planeRef = useRef();
  const trailRef = useRef();
  const glowRef = useRef();
  const { mouse } = useThree();

  // Custom detailed geometry for a 3D folded paper plane
  const planeGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      // Center folds / body
      0, 0, 0.5,
      0, 0, -0.5,
      0.1, -0.08, -0.5,

      0, 0, 0.5,
      0, 0, -0.5,
      -0.1, -0.08, -0.5,

      // Left Wing fold
      0, 0, -0.5,
      -0.5, 0.08, -0.4,
      0, 0, 0.5,

      // Right Wing fold
      0, 0, -0.5,
      0.5, 0.08, -0.4,
      0, 0, 0.5,
    ]);

    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  // Float trail coordinates array
  const trailCount = 40;
  const trailPositions = useMemo(() => new Float32Array(trailCount * 3), []);
  const trailProgress = useRef(Array.from({ length: trailCount }, () => ({ x: 0, y: 0, z: 0 })));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (planeRef.current) {
      if (isSuccess) {
        // 1. Launch / Send animation (Shoot off screen leaving trail)
        const t = (time % 3) * 3; // Reset loop time for smooth return
        const xPos = Math.sin(t * 4) * (t * 0.4);
        const yPos = t * 1.5;
        const zPos = -t * 4.5;
        
        planeRef.current.position.set(xPos, yPos, zPos);
        planeRef.current.rotation.set(0.6, t * 2, t);
        planeRef.current.scale.setScalar(Math.max(0.1, 1 - t * 0.25));

        // Point light glow pulse
        if (glowRef.current) {
          glowRef.current.intensity = Math.max(0, 5 - t * 1.2);
        }
      } else {
        // 2. Idle / Follow Mouse movement state
        const targetX = mouse.x * 0.6;
        const targetY = mouse.y * 0.4;
        
        // Lerp position towards mouse coordinates for parallax
        planeRef.current.position.x = THREE.MathUtils.lerp(planeRef.current.position.x, targetX, 0.08);
        planeRef.current.position.y = THREE.MathUtils.lerp(
          planeRef.current.position.y,
          targetY + Math.sin(time * 2.0) * 0.15, // Include slow float
          0.08
        );
        planeRef.current.position.z = THREE.MathUtils.lerp(planeRef.current.position.z, 0, 0.08);

        // Rotation responds to mouse coordinate shifts
        planeRef.current.rotation.y = THREE.MathUtils.lerp(planeRef.current.rotation.y, mouse.x * 0.8 + time * 0.1, 0.05);
        planeRef.current.rotation.x = THREE.MathUtils.lerp(planeRef.current.rotation.x, -mouse.y * 0.4 + 0.2, 0.05);
        planeRef.current.scale.setScalar(1.0);

        if (glowRef.current) {
          glowRef.current.intensity = 2.0 + Math.sin(time * 3) * 0.5;
        }
      }

      // 3. Update trailing neon sparks positions
      if (trailRef.current) {
        const positions = trailRef.current.geometry.attributes.position.array;
        const px = planeRef.current.position.x;
        const py = planeRef.current.position.y;
        const pz = planeRef.current.position.z;

        // Shift positions history list
        for (let i = trailCount - 1; i > 0; i--) {
          trailProgress.current[i] = { ...trailProgress.current[i - 1] };
        }
        trailProgress.current[0] = { x: px, y: py - 0.05, z: pz - 0.2 };

        trailProgress.current.forEach((pt, idx) => {
          positions[idx * 3] = pt.x + (Math.random() - 0.5) * 0.05;
          positions[idx * 3 + 1] = pt.y + (Math.random() - 0.5) * 0.05;
          positions[idx * 3 + 2] = pt.z - idx * 0.08;
        });

        trailRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  return (
    <group>
      {/* Glow ambient light inside model */}
      <pointLight ref={glowRef} intensity={2} distance={6} color="#00E5FF" />

      {/* 3D Paper Plane Mesh */}
      <mesh ref={planeRef} geometry={planeGeometry}>
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#915EFF"
          emissiveIntensity={1.5}
          roughness={0.15}
          metalness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Dynamic trailing neon particles path */}
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[trailPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#FF5722"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

export default PaperPlaneModel;
