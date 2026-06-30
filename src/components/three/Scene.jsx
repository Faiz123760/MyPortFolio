import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

/**
 * Scene — Three.js canvas wrapper with:
 * - Visibility gating: canvas only mounts when in viewport (saves GPU when off-screen)
 * - Lower DPR (max 1.0 instead of 1.5) to halve GPU pixel-fill work
 * - antialias disabled on mobile
 * - frameloop="demand" mode available via prop
 */
const Scene = ({
  children,
  enableZoom = false,
  cameraPos = [0, 0, 5],
  autoRotate = false,
  frameloop = "always",
}) => {
  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05, rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Detect mobile to skip antialiasing
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div ref={wrapperRef} className="w-full h-full absolute inset-0 z-0">
      {isVisible && (
        <Canvas
          frameloop={frameloop}
          shadows={false}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={1} // fixed at 1x — avoids 2x GPU load on HiDPI
        >
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={cameraPos} fov={50} />

            {/* Ambient light for base visibility */}
            <ambientLight intensity={0.4} />

            {/* Main directional light — no shadows (saves shadow pass) */}
            <directionalLight position={[5, 10, 5]} intensity={1.2} />

            {/* Purple neon rim light */}
            <pointLight position={[-10, 5, -5]} intensity={1.5} color="#915EFF" />

            {/* Blue accent light */}
            <pointLight position={[10, -5, 5]} intensity={1.5} color="#00E5FF" />

            {children}

            <OrbitControls
              enableZoom={enableZoom}
              enablePan={false}
              autoRotate={autoRotate}
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default Scene;
