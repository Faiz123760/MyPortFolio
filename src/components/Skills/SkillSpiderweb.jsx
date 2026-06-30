import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SkillSpiderweb = ({ skills, categoryTitle }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Center and dimensions of our SVG viewBox
  const size = 450;
  const center = size / 2;
  const maxRadius = 160;

  // Concentric rings (web lines)
  const webLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Map skills to include stable levels/percentages
  const processedSkills = useMemo(() => {
    return skills.map((skill, index) => {
      // Create a stable percentage value based on the name length & index
      const basePercent = 70 + ((skill.name.length * 7 + index * 13) % 26);
      return {
        ...skill,
        percent: basePercent,
        value: basePercent / 100,
      };
    });
  }, [skills]);

  const numPoints = processedSkills.length;

  // Calculate coordinates for a given index, radius ratio, and total points
  const getCoordinates = (index, radiusRatio) => {
    const angle = (index * 2 * Math.PI) / numPoints - Math.PI / 2;
    const r = maxRadius * radiusRatio;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      angle,
    };
  };

  // Generate web level polygons (concentric grid lines)
  const gridPolygons = webLevels.map((level) => {
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const { x, y } = getCoordinates(i, level);
      points.push(`${x},${y}`);
    }
    return points.join(" ");
  });

  // Coordinates for the radiating axis lines
  const axes = useMemo(() => {
    const list = [];
    for (let i = 0; i < numPoints; i++) {
      const start = { x: center, y: center };
      const end = getCoordinates(i, 1.0);
      list.push({ start, end });
    }
    return list;
  }, [numPoints]);

  // Points path for the filled proficiency polygon
  const proficiencyPoints = useMemo(() => {
    const points = [];
    processedSkills.forEach((skill, index) => {
      const { x, y } = getCoordinates(index, skill.value);
      points.push(`${x},${y}`);
    });
    return points.join(" ");
  }, [processedSkills, numPoints]);

  // Specific color theme: blue to orange gradient
  const themeGradients = {
    Frontend: {
      from: "#00E5FF", // Cyan/Blue
      to: "#FF5722",   // Orange
      glow: "rgba(0, 229, 255, 0.4)",
    },
    Backend: {
      from: "#915EFF", // Purple/Blue
      to: "#FF9800",   // Orange
      glow: "rgba(145, 94, 255, 0.4)",
    },
    Languages: {
      from: "#3B82F6", // Blue
      to: "#F97316",   // Orange
      glow: "rgba(59, 130, 246, 0.4)",
    },
    Tools: {
      from: "#00E5FF", // Blue/Cyan
      to: "#FF8F00",   // Warm Orange
      glow: "rgba(0, 229, 255, 0.4)",
    },
  };

  const colors = themeGradients[categoryTitle] || themeGradients.Frontend;

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#07030e]/40 p-4 rounded-3xl overflow-visible select-none">
      {/* SVG Spiderweb Chart */}
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full max-w-[400px] lg:max-w-[440px] drop-shadow-[0_0_25px_rgba(0,0,0,0.8)] overflow-visible"
      >
        <defs>
          {/* Main Area Fill Gradient */}
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.from} stopOpacity={0.4} />
            <stop offset="100%" stopColor={colors.to} stopOpacity={0.4} />
          </linearGradient>

          {/* Glowing Stroke Gradient */}
          <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.from} />
            <stop offset="100%" stopColor={colors.to} />
          </linearGradient>

          {/* Web grid line gradient */}
          <radialGradient id="webGrid" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.03)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.08)" />
          </radialGradient>

          {/* Filter for glow effect */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Concentric Spiderweb Polygons */}
        {gridPolygons.map((points, idx) => (
          <polygon
            key={idx}
            points={points}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
            className="transition-all duration-500"
          />
        ))}

        {/* Radiating Axes lines */}
        {axes.map((axis, idx) => (
          <line
            key={idx}
            x1={axis.start.x}
            y1={axis.start.y}
            x2={axis.end.x}
            y2={axis.end.y}
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}

        {/* Outer Circular Web Accents */}
        <circle
          cx={center}
          cy={center}
          r={maxRadius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.03)"
          strokeWidth="1"
        />

        {/* Filled and Animated Proficiency Web */}
        <motion.polygon
          points={proficiencyPoints}
          fill="url(#areaGradient)"
          stroke="url(#strokeGradient)"
          strokeWidth="2.5"
          initial={{ scale: 0.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          style={{ transformOrigin: `${center}px ${center}px` }}
          filter="url(#glow)"
        />

        {/* Axis Labels (Skill Names) */}
        {processedSkills.map((skill, idx) => {
          const { x, y, angle } = getCoordinates(idx, 1.22);
          const isHovered = hoveredIndex === idx;

          // Align text based on angle
          let textAnchor = "middle";
          if (Math.cos(angle) > 0.1) textAnchor = "start";
          else if (Math.cos(angle) < -0.1) textAnchor = "end";

          return (
            <g key={skill.name} className="cursor-pointer">
              <text
                x={x}
                y={y + 4}
                textAnchor={textAnchor}
                className={`text-[10px] font-semibold tracking-wider transition-all duration-300 font-mono ${
                  isHovered ? "fill-orange-400 font-bold scale-110" : "fill-gray-400"
                }`}
                style={{ transformOrigin: `${x}px ${y}px` }}
              >
                {skill.name}
              </text>
            </g>
          );
        })}

        {/* Skill Value Nodes */}
        {processedSkills.map((skill, idx) => {
          const { x, y } = getCoordinates(idx, skill.value);
          const isHovered = hoveredIndex === idx;

          return (
            <g key={`node-${idx}`}>
              {/* Outer glow ring on hover */}
              <circle
                cx={x}
                cy={y}
                r={isHovered ? 12 : 6}
                fill={isHovered ? colors.from : "transparent"}
                opacity={isHovered ? 0.25 : 0}
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              />

              {/* Node Point */}
              <motion.circle
                cx={x}
                cy={y}
                r={isHovered ? 6 : 4}
                fill={isHovered ? colors.to : colors.from}
                stroke="#07030e"
                strokeWidth={1.5}
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  filter: isHovered ? "drop-shadow(0px 0px 8px var(--colors-to))" : "none",
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Central Display / Floating Tooltip */}
      <div className="absolute pointer-events-none flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {hoveredIndex !== null ? (
            <motion.div
              key={`tooltip-${hoveredIndex}`}
              initial={{ opacity: 0, scale: 0.8, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0b0618]/90 border border-orange-500/30 p-4 rounded-2xl shadow-[0_0_20px_rgba(255,87,34,0.15)] flex flex-col items-center w-36 backdrop-blur-md"
            >
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center p-2 mb-2 border border-white/10">
                <img
                  src={processedSkills[hoveredIndex].logo}
                  alt={processedSkills[hoveredIndex].name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-white text-xs font-bold font-mono tracking-wide truncate max-w-full">
                {processedSkills[hoveredIndex].name}
              </span>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00E5FF] to-[#FF5722]"
                  initial={{ width: 0 }}
                  animate={{ width: `${processedSkills[hoveredIndex].percent}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              <span className="text-[10px] text-orange-400 font-semibold font-mono mt-1">
                {processedSkills[hoveredIndex].percent}%
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="center-default"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center p-4"
            >
              <div className="w-10 h-10 rounded-full border border-dashed border-[#00E5FF]/40 flex items-center justify-center animate-spin-slow mb-1">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
              </div>
              <span className="text-[9px] uppercase tracking-widest text-gray-500 font-mono">
                Hover Nodes
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkillSpiderweb;
