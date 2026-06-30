import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Html } from "@react-three/drei";
import * as THREE from "three";
import { SkillsInfo } from "../../constants";

// Helper to interpolate vectors for camera movements
const tempTarget = new THREE.Vector3();
const tempPosition = new THREE.Vector3();

// Single connection line — no per-line useFrame (handled by parent batch loop)
const ConnectionLine = React.memo(({ start, end, isHighlighted, color, opacity }) => {
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end]);

  const lineGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial
        color={isHighlighted ? "#FF5722" : color}
        transparent
        opacity={opacity ?? (isHighlighted ? 0.8 : 0.15)}
      />
    </line>
  );
});

// Node component with logo, name, and interactions
const NetworkNode = ({ skill, position, isSelected, isHovered, onHover, onClick, color }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      // Gentle floating animation
      const floatOffset = Math.sin(time * 1.5 + position[0]) * 0.05;
      meshRef.current.position.y = position[1] + floatOffset;
      
      // Rotate node slightly
      meshRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(false);
        }}
      >
        <sphereGeometry args={[isSelected ? 0.15 : isHovered ? 0.12 : 0.08, 10, 10]} />
        <meshStandardMaterial
          color={isHovered || isSelected ? "#FF5722" : color}
          emissive={isHovered || isSelected ? "#FF5722" : color}
          emissiveIntensity={isHovered || isSelected ? 3.0 : 1.2}
          roughness={0.1}
        />
      </mesh>

      {/* Floating HTML label above node */}
      <Html
        position={[position[0], position[1] + 0.2, position[2]]}
        center
        distanceFactor={6}
        className="pointer-events-none select-none"
      >
        <div
          className={`px-2.5 py-1 rounded-md border text-[9px] font-bold font-mono tracking-wider transition-all duration-300 whitespace-nowrap ${
            isHovered || isSelected
              ? "bg-[#0b0618] text-[#00E5FF] border-[#FF5722] shadow-[0_0_12px_rgba(255,87,34,0.4)] scale-110"
              : "bg-[#050505]/85 text-gray-400 border-white/5"
          }`}
        >
          {skill.name}
        </div>
      </Html>
    </group>
  );
};

// Moving energy particles along connection lines
const ConnectionParticles = ({ connections }) => {
  const pointsRef = useRef();

  // Create list of particles, each traveling along a random connection line
  const particles = useMemo(() => {
    return Array.from({ length: 60 }, () => {
      const connIndex = Math.floor(Math.random() * connections.length);
      return {
        conn: connections[connIndex],
        progress: Math.random(),
        speed: 0.1 + Math.random() * 0.15,
      };
    });
  }, [connections]);

  const pPositions = useMemo(() => new Float32Array(particles.length * 3), [particles]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;

      particles.forEach((p, idx) => {
        // Increment progress along connection path
        p.progress += p.speed * delta;
        if (p.progress > 1.0) {
          p.progress = 0;
          // Pick a new random connection
          p.conn = connections[Math.floor(Math.random() * connections.length)];
        }

        const start = p.conn.start;
        const end = p.conn.end;

        // Linear interpolation between start and end vectors
        positions[idx * 3] = start[0] + (end[0] - start[0]) * p.progress;
        positions[idx * 3 + 1] = start[1] + (end[1] - start[1]) * p.progress;
        positions[idx * 3 + 2] = start[2] + (end[2] - start[2]) * p.progress;
      });

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[pPositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00E5FF"
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Main interactive simulation group
const NetworkGroup = ({ selectedSkill, onSelectSkill }) => {
  const { camera } = useThree();
  const groupRef = useRef();
  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  // Parse and position skills in 3D
  const { nodes, connections } = useMemo(() => {
    const nodeList = [];
    const connectionList = [];
    const centerNode = {
      id: "center",
      name: "Full Stack Developer",
      logo: "",
      position: [0, 0, 0],
      color: "#915EFF",
    };
    nodeList.push(centerNode);

    let skillIndex = 0;
    SkillsInfo.forEach((category, catIdx) => {
      // Radius and base angle for this category cluster
      const radius = 2.4 + catIdx * 0.4;
      const categoryAngle = (catIdx * Math.PI * 2) / SkillsInfo.length;
      
      const categoryColor =
        catIdx === 0
          ? "#00E5FF" // Frontend: Neon Blue
          : catIdx === 1
          ? "#915EFF" // Backend: Purple
          : catIdx === 2
          ? "#FF9800" // Languages: Orange
          : "#FFCC00"; // Tools: Yellow

      category.skills.forEach((skill, idx) => {
        const localAngle = ((idx - category.skills.length / 2) * 0.25);
        const theta = categoryAngle + localAngle;
        
        // Calculate 3D position
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        const y = (idx % 2 === 0 ? 0.35 : -0.35) * (catIdx + 1) * 0.8;

        const skillNode = {
          id: `${catIdx}-${idx}`,
          name: skill.name,
          logo: skill.logo,
          percent: 75 + Math.floor(Math.sin(skillIndex * 3) * 15 + 5),
          category: category.title,
          position: [x, y, z],
          color: categoryColor,
        };

        nodeList.push(skillNode);

        // Connect node to central brain node
        connectionList.push({
          start: centerNode.position,
          end: skillNode.position,
          startId: centerNode.id,
          endId: skillNode.id,
          color: categoryColor,
        });

        // Inter-node connections (neighbor ring lines for the spiderweb effect)
        if (idx > 0) {
          const prevNode = nodeList[nodeList.length - 2];
          connectionList.push({
            start: prevNode.position,
            end: skillNode.position,
            startId: prevNode.id,
            endId: skillNode.id,
            color: categoryColor,
          });
        }

        skillIndex++;
      });
    });

    return { nodes: nodeList, connections: connectionList };
  }, []);

  // Frame loop for camera interpolation, subtle rotation, and batch connection opacity
  const lineRefs = useRef([]);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rotate entire network gently based on mouse
    if (groupRef.current && !selectedSkill) {
      groupRef.current.rotation.y = state.pointer.x * 0.3;
      groupRef.current.rotation.x = -state.pointer.y * 0.2 + time * 0.03;
    }

    // Batch update all connection opacities in one RAF
    lineRefs.current.forEach((line, idx) => {
      if (!line) return;
      const conn = connections[idx];
      const isHighlighted = hoveredNodeId === conn.startId || hoveredNodeId === conn.endId;
      line.material.opacity = isHighlighted
        ? 0.8 + Math.sin(time * 10) * 0.15
        : 0.15 + Math.sin(time * 3 + conn.start[0]) * 0.05;
    });

    // Camera follow lerp
    if (selectedSkill) {
      const selectedNode = nodes.find((n) => n.name === selectedSkill.name);
      if (selectedNode) {
        const [nx, ny, nz] = selectedNode.position;
        // Position camera directly in front of the selected node
        tempPosition.set(nx * 1.5, ny, nz * 1.5 + 1.2);
        tempTarget.set(nx, ny, nz);
      }
    } else {
      // Normal orbit camera position
      tempPosition.set(0, 0.5, 5.5);
      tempTarget.set(0, 0, 0);
    }

    camera.position.lerp(tempPosition, 0.05);
    camera.lookAt(camera.position.x + (tempTarget.x - camera.position.x) * 0.1,
                  camera.position.y + (tempTarget.y - camera.position.y) * 0.1,
                  camera.position.z + (tempTarget.z - camera.position.z) * 0.1);
  });

  return (
    <group ref={groupRef}>
      {/* Central brain node */}
      <mesh>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          color="#FF5722"
          emissive="#FF5722"
          emissiveIntensity={2.5}
        />
        <pointLight intensity={3.5} distance={7} color="#915EFF" />
      </mesh>

      {/* Batch connection opacity update — single useFrame instead of one per line */}

      {/* Render connections — ref array fed to parent batch useFrame */}
      {connections.map((conn, idx) => {
        const isHighlighted =
          hoveredNodeId === conn.startId || hoveredNodeId === conn.endId;
        const pts = [
          new THREE.Vector3(...conn.start),
          new THREE.Vector3(...conn.end),
        ];
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        return (
          <line
            key={`conn-${idx}`}
            ref={(el) => { lineRefs.current[idx] = el; }}
            geometry={geo}
          >
            <lineBasicMaterial
              color={isHighlighted ? "#FF5722" : conn.color}
              transparent
              opacity={isHighlighted ? 0.8 : 0.15}
            />
          </line>
        );
      })}

      {/* Connection particle flows */}
      <ConnectionParticles connections={connections} />

      {/* Render nodes */}
      {nodes.map((node) => {
        if (node.id === "center") return null;
        return (
          <NetworkNode
            key={node.id}
            skill={node}
            position={node.position}
            color={node.color}
            isSelected={selectedSkill && selectedSkill.name === node.name}
            isHovered={hoveredNodeId === node.id}
            onHover={(h) => setHoveredNodeId(h ? node.id : null)}
            onClick={() => onSelectSkill(node)}
          />
        );
      })}
    </group>
  );
};

// Background space particle dust
const SpaceBackground = () => {
  const pointsRef = useRef();

  const particleData = useMemo(() => {
    const count = 200;
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      array[i * 3] = (Math.random() - 0.5) * 12;
      array[i * 3 + 1] = (Math.random() - 0.5) * 12;
      array[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return array;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <Points ref={pointsRef} positions={particleData} stride={3}>
      <PointMaterial
        transparent
        color="#7C3AED"
        size={0.035}
        sizeWrite={false}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
};

// Canvas wrapper with IntersectionObserver visibility gate
const SkillNeuralNetwork = ({ selectedSkill, onSelectSkill }) => {
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

  return (
    <div ref={wrapperRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing">
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0.5, 5.5], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={1}
        >
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#00E5FF" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#915EFF" />

          <SpaceBackground />

          <NetworkGroup
            selectedSkill={selectedSkill}
            onSelectSkill={onSelectSkill}
          />
        </Canvas>
      )}
    </div>
  );
};

export default SkillNeuralNetwork;
