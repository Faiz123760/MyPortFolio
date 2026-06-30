import React, { useRef, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { SkillsInfo } from "../../constants";

const SkillGalaxy = () => {
  const galaxyRef = useRef();
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const { mouse } = useThree();

  // Process skills into orbit data
  const orbitalSkills = useMemo(() => {
    const list = [];
    let skillIndex = 0;
    
    SkillsInfo.forEach((category, catIndex) => {
      const radius = 1.4 + catIndex * 0.7; // Concentric rings
      const speed = 0.15 + (4 - catIndex) * 0.05; // Orbit speed
      
      category.skills.forEach((skill, idx) => {
        const total = category.skills.length;
        const offsetAngle = (idx / total) * Math.PI * 2;
        
        list.push({
          id: `${catIndex}-${idx}`,
          name: skill.name,
          logo: skill.logo,
          category: category.title,
          radius,
          speed,
          offsetAngle,
          // Generate realistic skill confidence percentages
          percent: 75 + Math.floor(Math.sin(skillIndex * 3) * 15 + 5),
          color: catIndex === 0 ? "#00E5FF" : catIndex === 1 ? "#915EFF" : catIndex === 2 ? "#A855F7" : "#FFCC00"
        });
        skillIndex++;
      });
    });
    
    return list;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate overall galaxy based on mouse coordinates
    if (galaxyRef.current) {
      galaxyRef.current.rotation.x = THREE.MathUtils.lerp(galaxyRef.current.rotation.x, -mouse.y * 0.4 + 0.3, 0.05);
      galaxyRef.current.rotation.y = THREE.MathUtils.lerp(galaxyRef.current.rotation.y, mouse.x * 0.4, 0.05);
    }
  });

  return (
    <group ref={galaxyRef} rotation={[0.4, 0, 0]}>
      {/* Central Core Sun */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#0B0618"
          emissive="#915EFF"
          emissiveIntensity={2.5}
          roughness={0.1}
        />
        <pointLight intensity={3} distance={5} color="#915EFF" />
      </mesh>

      {/* Galaxy Particles dust */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array(
                Array.from({ length: 600 }, () => (Math.random() - 0.5) * 8)
              ),
              3,
            ]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#00E5FF" sizeWrite={false} depthWrite={false} transparent opacity={0.6} />
      </points>

      {/* Render Orbit Rings & Skills */}
      {orbitalSkills.map((skill) => (
        <OrbitNode
          key={skill.id}
          skill={skill}
          isHovered={hoveredSkill?.id === skill.id}
          onHover={(hover) => setHoveredSkill(hover ? skill : null)}
        />
      ))}
    </group>
  );
};

// Sub-component for individual orbiting nodes
const OrbitNode = ({ skill, isHovered, onHover }) => {
  const nodeRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const currentAngle = skill.offsetAngle + time * skill.speed;
    
    // Calculate 3D position along circular orbit
    const x = Math.cos(currentAngle) * skill.radius;
    const z = Math.sin(currentAngle) * skill.radius;
    const y = Math.sin(currentAngle * 2) * 0.15; // Vertical wobble

    if (nodeRef.current) {
      nodeRef.current.position.set(x, y, z);
    }
  });

  return (
    <group ref={nodeRef}>
      {/* Node Sphere */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(false);
        }}
      >
        <sphereGeometry args={[isHovered ? 0.16 : 0.1, 16, 16]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={isHovered ? 2.0 : 0.8}
        />
      </mesh>

      {/* Skill Label Tooltip */}
      <Html distanceFactor={4} position={[0, 0.25, 0]} center>
        <div
          className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold font-mono transition-all duration-300 pointer-events-none select-none whitespace-nowrap ${
            isHovered
              ? "bg-[#0b0618] text-[#00E5FF] border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.4)] scale-110"
              : "bg-[#050505]/70 text-gray-400 border-white/10 scale-95"
          }`}
        >
          {skill.name}
          {isHovered && (
            <div className="w-16 h-1 bg-gray-900 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#915EFF] to-[#00E5FF]"
                style={{ width: `${skill.percent}%` }}
              />
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

export default SkillGalaxy;
