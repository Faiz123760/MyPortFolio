import React, { useState, useRef, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { education } from "../../constants";
import { GraduationCap, Award, Calendar, BookOpen, Layers, X, Download, ShieldCheck, HelpCircle, Laptop, Settings, Smartphone } from "lucide-react";

// Counter: Animates numbers counting up smoothly
const Counter = ({ from = 0, to, duration = 1.5, suffix = "", delay = 0 }) => {
  const [count, setCount] = useState(from);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let startTime = null;
    let frameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease Out Cubic
      setCount(easeProgress * (to - from) + from);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    };

    const timer = setTimeout(() => {
      frameId = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timer);
    };
  }, [inView, from, to, duration, delay]);

  const formattedCount = count % 1 === 0 ? Math.floor(count) : count.toFixed(2);

  return <span ref={nodeRef} className="font-extrabold font-mono">{formattedCount}{suffix}</span>;
};

// Academic Certificate Card Component
const EducationCard = React.memo(({ edu, isActive, onClick, index, styleProps }) => {
  const isBTech = edu.degree.includes("B.Tech");

  const floatVariants = {
    animate: {
      y: isActive ? [0, -8, 0] : [0, -4, 0],
      transition: {
        duration: isActive ? 4 : 5,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  const scoreLabel = isBTech ? "CGPA" : "Percentage";
  const rawScore = isBTech ? 8.44 : (edu.id === 1 ? 79 : 79.83); // Real values from constants
  const scoreSuffix = isBTech ? "" : "%";

  const cardCoursework = isBTech 
    ? ["Data Structures", "DBMS", "Operating Systems", "AI & ML"]
    : ["Physics", "Chemistry", "Mathematics", "Computer Science"];

  return (
    <motion.div
      variants={floatVariants}
      animate="animate"
      whileHover={{ scale: isActive ? 1.04 : 1.02, zIndex: 40 }}
      onClick={onClick}
      className={`relative w-56 md:w-64 h-[400px] rounded-[24px] border cursor-pointer select-none transition-all duration-500 origin-center flex-shrink-0 ${
        isActive 
          ? "border-[#a855f7]/80 bg-[#0d071c]/80 shadow-[0_0_35px_rgba(168,85,247,0.3)] opacity-100 pointer-events-auto" 
          : "border-white/5 bg-[#0b0617]/40 opacity-40 hover:opacity-75 pointer-events-auto"
      }`}
      style={{
        transform: `translateY(${styleProps.y}px) rotateY(${styleProps.rotateY}deg) rotate(${styleProps.rotate}deg) scale(${styleProps.scale})`,
        filter: styleProps.filter,
        zIndex: styleProps.zIndex,
        transformStyle: "preserve-3d",
        marginTop: styleProps.y > 0 ? `${styleProps.y}px` : 0,
        opacity: styleProps.opacity,
      }}
    >
      {/* Light Sweep reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#915EFF]/0 via-white/5 to-[#00E5FF]/5 rounded-[24px] pointer-events-none" />

      {/* Content wrapper */}
      <div className="p-6 h-full flex flex-col justify-between items-center text-center relative z-10" style={{ transform: "translateZ(30px)" }}>
        
        {/* Top Header */}
        <div className="flex flex-col items-center space-y-3.5">
          <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 p-1 flex items-center justify-center bg-gradient-to-br from-[#0b0618] to-[#050505] shadow-lg shrink-0">
            {isBTech ? (
              <img src={edu.img} alt={edu.school} className="w-full h-full object-contain rounded-full" />
            ) : (
              <GraduationCap className="text-[#00E5FF] w-6 h-6" />
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-xs font-extrabold text-white tracking-tight leading-tight">
              {isBTech ? "B.Tech in Computer Science & Engineering" : edu.degree.replace("UP Board - ", "")}
            </h3>
            <p className="text-[9px] text-gray-400 font-medium max-w-[170px] leading-relaxed line-clamp-2">
              {isBTech ? "Allenhouse Institute of Technology" : "S.F. Inter College"}
            </p>
          </div>
          
          <div className="text-[9px] text-gray-500 font-mono tracking-wider">
            {isBTech ? "2022 - 2026" : (edu.id === 1 ? "2020 - 2022" : "2019 - 2020")}
          </div>
        </div>

        {/* Center score */}
        <div className="space-y-1 my-2">
          <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full">
            {scoreLabel}
          </span>
          <div className="text-xl font-black text-[#00E5FF] tracking-tight pt-1 font-mono">
            {isActive ? (
              <Counter to={rawScore} suffix={scoreSuffix} delay={0.3} />
            ) : (
              `${rawScore}${scoreSuffix}`
            )}
          </div>
        </div>

        {/* Bottom tags */}
        <div className="w-full space-y-2">
          {isBTech ? (
            <div className="flex flex-wrap justify-center gap-1">
              {cardCoursework.map((tag, i) => (
                <span key={i} className="text-[8px] font-mono text-gray-300 bg-white/5 border border-white/5 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <span className="text-[8px] text-gray-500 font-mono uppercase tracking-wider block">Board</span>
              <span className="text-xs text-white font-bold">UP Board</span>
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
});

const Education = () => {
  const containerRef = useRef(null);
  
  // Left = Intermediate (idx 0), Center = B.Tech (idx 1), Right = High School (idx 2)
  const orderedEducation = useMemo(() => {
    return [education[1], education[0], education[2]];
  }, []);

  const [activeId, setActiveId] = useState(education[0].id);
  const [panelOpen, setPanelOpen] = useState(true);

  const activeCard = education.find(e => e.id === activeId) || education[0];

  // Mouse Parallax coordinates
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX - innerWidth / 2) * 0.012;
    const y = (clientY - innerHeight / 2) * -0.012;
    setRotateX(y);
    setRotateY(x);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // 3D Perspective layout matching reference mockup:
  // Left card angled right, center card facing forward and larger, right card angled left
  const getCardStyles = (idx) => {
    const activeIdx = orderedEducation.findIndex(e => e.id === activeId);
    const diff = idx - activeIdx;
    
    if (diff === 0) {
      return {
        y: -10,
        rotateY: 0,
        rotate: 0,
        scale: 1.0,
        opacity: 1,
        filter: "none",
        zIndex: 30
      };
    }
    
    if (diff === -1 || diff === 2) { // Left card (Intermediate)
      return {
        y: 30,
        rotateY: 12,
        rotate: -4,
        scale: 0.85,
        opacity: 0.75,
        filter: "none",
        zIndex: 10
      };
    }
    
    // Right card (High School)
    return {
      y: 30,
      rotateY: -12,
      rotate: 4,
      scale: 0.85,
      opacity: 0.75,
      filter: "none",
      zIndex: 10
    };
  };

  const courseworkList = useMemo(() => {
    if (activeCard.degree.includes("B.Tech")) {
      return [
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Operating Systems",
        "Computer Networks",
        "Software Engineering",
        "Web Development",
        "Artificial Intelligence"
      ];
    }
    return [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Computer Science",
      "English Language",
      "Social Studies"
    ];
  }, [activeCard.degree]);

  const academicAchievements = useMemo(() => {
    if (activeCard.degree.includes("B.Tech")) {
      return [
        "Consistent Academic Performance",
        "Multiple Hackathon Participant",
        "Project Leader",
        "Active in Technical Communities"
      ];
    }
    return [
      "Top Performer in Science Stream",
      "Active Participant in School Olympiads",
      "Excellent Discipline Records"
    ];
  }, [activeCard.degree]);

  return (
    <section
      id="education"
      className="relative w-full min-h-screen py-24 px-6 lg:px-12 bg-[#05030a] flex items-center overflow-hidden text-white"
    >
      {/* Volumetric nebula and stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-[#915EFF]/10 blur-[130px] animate-pulse" />
        <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-[#00E5FF]/5 blur-[150px]" />
        
        {/* Constellation dots grid overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] bg-[size:28px_28px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: DESIGN SYSTEM SPECIFICATIONS SIDEBAR (Mockup aligned) */}
        <div className="lg:col-span-3 bg-[#0d071d]/45 border border-white/5 p-6 rounded-[24px] space-y-6 text-xs text-gray-400 font-sans backdrop-blur-md">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#00E5FF] font-bold">Education Section</span>
            <h4 className="text-sm font-black text-white uppercase tracking-wider">Floating 3D Cards</h4>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-[10px] font-mono uppercase tracking-wider text-[#915EFF] font-bold">Concept</h5>
            <p className="leading-relaxed text-gray-400 font-light">
              Instead of a timeline, each educational qualification is a floating 3D glass card. Cards float gently in 3D space, tilt with mouse movement, glow on hover and reveal more information.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="text-[10px] font-mono uppercase tracking-wider text-[#915EFF] font-bold">Tech Stack</h5>
            <ul className="space-y-1 font-mono text-[10px] text-gray-300">
              <li>• React + TypeScript</li>
              <li>• Three.js / React Three Fiber (for 3D)</li>
              <li>• GSAP + ScrollTrigger</li>
              <li>• Framer Motion (micro interactions)</li>
              <li>• Tailwind CSS (styling)</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="text-[10px] font-mono uppercase tracking-wider text-[#915EFF] font-bold">Animations Overview</h5>
            <ol className="space-y-1 leading-relaxed text-[10px] text-gray-300">
              <li>1. Section enters → camera moves in, particles & lights appear</li>
              <li>2. Cards float up from below with blur → become sharp</li>
              <li>3. Mouse move → entire card group tilts</li>
              <li>4. Hover a card → lift up, glow, logo rotates, details panel expands</li>
            </ol>
          </div>

          <div className="space-y-2">
            <h5 className="text-[10px] font-mono uppercase tracking-wider text-[#915EFF] font-bold">Card States</h5>
            <div className="space-y-1.5 font-light">
              <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gray-500" /><span><strong>Idle</strong>: Subtle float, soft glow, slight rotation</span></div>
              <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#915EFF]" /><span><strong>Hover</strong>: Lift up, stronger glow, logo rotates</span></div>
              <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" /><span><strong>Active</strong>: Sharper, brighter, more contrast</span></div>
              <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-500" /><span><strong>Inactive</strong>: Blurred, lower opacity, farther back</span></div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CORE WORKSPACE */}
        <div className="lg:col-span-9 flex flex-col justify-between min-h-[85vh] space-y-10">
          
          {/* Main Title Headers */}
          <div className="text-center space-y-2">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase">Education</h2>
            <p className="text-xs text-gray-400 font-mono tracking-widest uppercase">My academic journey and achievements</p>
            <div className="w-16 h-0.5 bg-[#915EFF]/50 mx-auto rounded-full" />
          </div>

          {/* Interactive 3D Showcase — flex row so all cards are always visible */}
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full flex justify-center items-end gap-4 md:gap-6 pb-4 pt-6"
            style={{ perspective: "1400px" }}
          >
            <motion.div 
              style={{
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d",
              }}
              className="flex items-end justify-center gap-4 md:gap-6 w-full"
            >
              {orderedEducation.map((edu, index) => (
                <EducationCard 
                  key={edu.id}
                  edu={edu}
                  index={index}
                  isActive={activeId === edu.id}
                  onClick={() => {
                    setActiveId(edu.id);
                    setPanelOpen(true);
                  }}
                  styleProps={getCardStyles(index)}
                />
              ))}
            </motion.div>
          </div>

          {/* Bottom Expanded Detail Panel */}
          <AnimatePresence>
            {panelOpen && (
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                className="glass-card p-6 md:p-8 border border-white/10 rounded-[24px] bg-[#0d071c]/65 backdrop-blur-xl shadow-2xl relative overflow-hidden w-full"
              >
                {/* Glowing neon side bar indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#915EFF] to-[#00E5FF]" />

                {/* Close Button 'X' */}
                <button 
                  onClick={() => setPanelOpen(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10 text-xs">
                  {/* Left Column: Logo & Degree title */}
                  <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 md:border-r border-white/5 pr-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 p-1 flex items-center justify-center bg-gradient-to-br from-[#0b0618] to-[#050505] shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                      {activeCard.degree.includes("B.Tech") ? (
                        <img src={activeCard.img} alt={activeCard.school} className="w-full h-full object-contain rounded-full" />
                      ) : (
                        <GraduationCap className="text-[#00E5FF] w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white leading-tight">
                        {activeCard.degree.includes("B.Tech") ? "B.Tech in Computer Science & Engineering" : activeCard.degree.replace("UP Board - ", "")}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-mono mt-1">
                        {activeCard.school}
                      </p>
                    </div>
                  </div>

                  {/* Second Column: About Course */}
                  <div className="space-y-2 md:border-r border-white/5 pr-4">
                    <h5 className="text-[10px] font-bold text-[#915EFF] uppercase tracking-widest font-mono flex items-center gap-1">
                      <Layers size={10} className="text-[#00E5FF]" /> About Course
                    </h5>
                    <p className="text-[11px] text-gray-300 leading-relaxed font-light">{activeCard.desc}</p>
                  </div>

                  {/* Third Column: Key Subjects */}
                  <div className="space-y-2 md:border-r border-white/5 pr-4">
                    <h5 className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-widest font-mono flex items-center gap-1">
                      <BookOpen size={10} className="text-[#915EFF]" /> Key Subjects
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {courseworkList.slice(0, 5).map((course, index) => (
                        <span 
                          key={index} 
                          className="text-[8px] bg-white/5 text-gray-300 border border-white/5 px-2 py-0.5 rounded-full font-mono flex items-center gap-1"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#915EFF] shadow-[0_0_5px_#915EFF]" /> {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Fourth Column: Achievements */}
                  <div className="space-y-2">
                    <h5 className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest font-mono flex items-center gap-1">
                      <Award size={10} className="text-yellow-500" /> Achievements
                    </h5>
                    <ul className="space-y-1 text-gray-400 font-light">
                      {academicAchievements.map((ach, index) => (
                        <li key={index} className="flex items-center gap-1 text-[10px]">
                          <ShieldCheck size={12} className="text-green-500 shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer details (descriptive badges and tips layout matching reference) */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-6 text-gray-500 text-[10px]">
            {/* Additional effects badges */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <span className="flex items-center gap-1.5 uppercase font-mono"><Layers size={12} className="text-[#915EFF]" /> Purple light reflection</span>
              <span className="flex items-center gap-1.5 uppercase font-mono"><Laptop size={12} className="text-[#00E5FF]" /> Glassmorphism with blur</span>
              <span className="flex items-center gap-1.5 uppercase font-mono"><Settings size={12} className="text-gray-500" /> Particles floating</span>
              <span className="flex items-center gap-1.5 uppercase font-mono"><Smartphone size={12} className="text-gray-500" /> Smooth 3D parallax</span>
            </div>

            {/* Performance tips rocket box */}
            <div className="p-3 bg-[#a855f7]/5 border border-[#a855f7]/15 rounded-xl flex items-center gap-2 max-w-xs shrink-0">
              <Award size={14} className="text-[#a855f7] animate-bounce shrink-0" />
              <div className="text-[9px] leading-snug">
                <strong>Performance Tips:</strong> Use will-change, transform3d, and optimize animations for 60 FPS.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Education;