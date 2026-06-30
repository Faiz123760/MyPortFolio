import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const WorkspaceModel = () => {
  const groupRef = useRef();
  const { mouse } = useThree();

  // Create canvas texture for the code display simulation on the laptop
  const canvasTexture = React.useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0b0618";
    ctx.fillRect(0, 0, 512, 512);
    ctx.font = "bold 20px Courier New";
    ctx.fillStyle = "#00e5ff";
    
    // Draw some mock code lines
    const lines = [
      "const Developer = () => {",
      "  const skills = ['MERN', 'Three.js'];",
      "  const status = 'Building 3D models';",
      "  console.log('Rendering scene...');",
      "  return <Canvas />;",
      "};",
      "export default Developer;",
      "",
      "// System booting successful",
      "// Connection pool established",
      "// 60 FPS verified",
      "// Ready to compile..."
    ];

    lines.forEach((line, index) => {
      ctx.fillText(line, 40, 50 + index * 30);
    });

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  useFrame((state) => {
    // Subtle desk floating animation
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.12 - 0.5;
      
      // Rotate workspace slightly based on mouse movement
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.3,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.y * 0.15,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={[1.2, 1.2, 1.2]}>
      {/* High-tech Glowing Desk */}
      <mesh receiveShadow position={[0, -0.1, 0]}>
        <boxGeometry args={[4, 0.1, 2.5]} />
        <meshStandardMaterial color="#0B0618" roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Desk Border Neon Blue Line */}
      <mesh position={[0, -0.05, 1.26]}>
        <boxGeometry args={[4.02, 0.02, 0.02]} />
        <meshBasicMaterial color="#00E5FF" />
      </mesh>

      {/* Ultrawide Monitor Stand */}
      <mesh position={[0, 0.3, -0.8]}>
        <cylinderGeometry args={[0.08, 0.08, 0.8, 8]} />
        <meshStandardMaterial color="#333333" metalness={0.9} />
      </mesh>
      <mesh position={[0, -0.02, -0.8]}>
        <cylinderGeometry args={[0.3, 0.35, 0.05, 8]} />
        <meshStandardMaterial color="#222222" metalness={0.9} />
      </mesh>

      {/* Curved Ultrawide Monitor Screen */}
      <group position={[0, 0.8, -0.75]} rotation={[0.05, 0, 0]}>
        {/* Frame */}
        <mesh>
          <boxGeometry args={[2.8, 1.1, 0.15]} />
          <meshStandardMaterial color="#1a0b2e" roughness={0.5} />
        </mesh>
        {/* Glow Screen Panel */}
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[2.7, 1.0, 0.01]} />
          <meshStandardMaterial
            color="#09041a"
            emissive="#915EFF"
            emissiveIntensity={1.2}
            roughness={0.1}
          />
        </mesh>
        {/* Monitor Tech Lines */}
        <mesh position={[0, 0, 0.09]}>
          <boxGeometry args={[2.6, 0.02, 0.005]} />
          <meshBasicMaterial color="#00e5ff" />
        </mesh>
      </group>

      {/* Stylized Laptop */}
      <group position={[-1.0, 0.15, 0.3]} rotation={[0, 0.4, 0]}>
        {/* Base */}
        <mesh position={[0, -0.08, 0]}>
          <boxGeometry args={[0.9, 0.03, 0.6]} />
          <meshStandardMaterial color="#222222" metalness={0.8} />
        </mesh>
        {/* Keyboard Area Indicator */}
        <mesh position={[0, -0.06, 0.05]}>
          <boxGeometry args={[0.8, 0.01, 0.38]} />
          <meshStandardMaterial color="#111" emissive="#915EFF" emissiveIntensity={0.2} />
        </mesh>
        {/* Screen Hinge / Opened Screen */}
        <group position={[0, -0.07, -0.28]} rotation={[-1.15, 0, 0]}>
          {/* Cover */}
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.9, 0.6, 0.02]} />
            <meshStandardMaterial color="#222222" metalness={0.8} />
          </mesh>
          {/* Display */}
          <mesh position={[0, 0.3, 0.012]}>
            <planeGeometry args={[0.86, 0.56]} />
            <meshBasicMaterial map={canvasTexture} />
          </mesh>
        </group>
      </group>

      {/* Mechanical RGB Keyboard */}
      <group position={[0, 0.02, 0.5]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 0.04, 0.45]} />
          <meshStandardMaterial color="#1f1a3a" roughness={0.8} />
        </mesh>
        {/* Keys Glow */}
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[1.15, 0.03, 0.4]} />
          <meshStandardMaterial
            color="#0b0618"
            emissive="#00E5FF"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      {/* Coffee Mug */}
      <group position={[1.2, 0.15, 0.4]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.26, 8]} />
          <meshStandardMaterial color="#915EFF" roughness={0.2} />
        </mesh>
        {/* Coffee Liquid */}
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.10, 0.10, 0.02, 8]} />
          <meshStandardMaterial color="#3d2314" roughness={0.1} />
        </mesh>
        {/* Handle */}
        <mesh position={[0.12, 0, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.08, 0.02, 6, 10]} />
          <meshStandardMaterial color="#915EFF" />
        </mesh>
      </group>

      {/* Desk Decoration Plant Pot */}
      <group position={[1.3, 0.25, -0.6]}>
        {/* Pot */}
        <mesh position={[0, -0.1, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.14, 0.25, 8]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        {/* Plant Spheres */}
        <mesh position={[0, 0.1, 0]} castShadow>
          <sphereGeometry args={[0.18, 6, 6]} />
          <meshStandardMaterial color="#00FF88" roughness={0.9} />
        </mesh>
        <mesh position={[-0.1, 0.16, 0.05]} castShadow>
          <sphereGeometry args={[0.12, 5, 5]} />
          <meshStandardMaterial color="#00DD77" roughness={0.9} />
        </mesh>
        <mesh position={[0.08, 0.18, -0.05]} castShadow>
          <sphereGeometry args={[0.14, 5, 5]} />
          <meshStandardMaterial color="#11EE88" roughness={0.9} />
        </mesh>
      </group>

      {/* Floating Circuit Lines Grid Overlay */}
      <gridHelper args={[6, 10, "#915EFF", "#1a0b2e"]} position={[0, -0.04, 0]} />
    </group>
  );
};

export default WorkspaceModel;
