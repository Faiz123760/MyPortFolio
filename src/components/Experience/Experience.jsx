import React, { useRef, useMemo, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { experiences } from "../../constants";
import { Briefcase, Calendar, Star, Circle, ChevronRight } from "lucide-react";

// Individual Experience Card Component
const ExperienceCard = React.memo(({ exp, index }) => {
  const isEven = index % 2 === 0;
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateY = ((x - cx) / cx) * 4;
    const rotateX = -((y - cy) / cy) * 4;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current)
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  }, []);

  // Variants for scroll entrance animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)", rotate: isEven ? -4 : 4 },
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", rotate: 0,
      transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={cardVariants}
      className={`relative w-full md:w-[calc(50%-3.5rem)] my-6 ${
        isEven ? "md:mr-auto text-left" : "md:ml-auto text-left"
      }`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full transition-transform duration-200 ease-out"
        style={{ willChange: "transform" }}
      >
        <div className="glass-card p-8 border border-white/5 hover:border-[#915EFF]/50 rounded-[24px] shadow-[0_20px_50px_rgba(11,6,24,0.4)] relative group transition-all duration-300">
          {/* Animated Purple Gradient Light reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#915EFF]/0 via-[#A855F7]/0 to-[#00E5FF]/5 opacity-0 group-hover:opacity-100 rounded-[24px] transition-opacity duration-500 pointer-events-none" />

          {/* Job details */}
          <div className="space-y-4 relative z-10">
            {/* Logo and title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Floating circular company logo badge */}
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 p-1 flex items-center justify-center shadow-lg group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out shrink-0 bg-gradient-to-br from-[#0b0618] to-[#050505]">
                  <img src={exp.img} alt={exp.company} className="w-full h-full object-contain rounded-full" loading="lazy" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white group-hover:text-[#00E5FF] transition-colors">{exp.role}</h3>
                  <p className="text-sm text-[#915EFF] font-semibold">{exp.company}</p>
                </div>
              </div>

              {/* Date tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#915EFF]/10 border border-[#915EFF]/30 text-[#00E5FF] font-mono text-[10px] rounded-full self-start sm:self-auto shadow-[0_0_10px_rgba(145,94,255,0.1)]">
                <Calendar size={12} /> {exp.date}
              </div>
            </div>

            {/* Role details / description */}
            <p className="text-sm text-gray-300 leading-relaxed font-light">{exp.desc}</p>

            {/* Subheading for Tech Stack */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="text-xs font-semibold text-[#00E5FF] uppercase tracking-wider">Technologies Mastered</div>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-[9px] bg-[#915EFF]/5 text-white px-2.5 py-1 rounded-full border border-white/5 hover:border-[#00E5FF]/40 hover:bg-[#915EFF]/10 transition-all font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connection arrow pointing to the node */}
      <div
        className={`hidden md:block absolute top-8 w-6 h-[2px] bg-gradient-to-r from-[#915EFF]/50 to-[#00E5FF]/50 pointer-events-none ${
          isEven ? "left-full" : "right-full"
        }`}
      />
    </motion.div>
  );
});


const Experience = () => {
  const containerRef = useRef(null);

  // Track page scroll to expand/grow the timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full min-h-screen py-28 px-6 lg:px-16 bg-[#050505] flex items-center overflow-hidden"
    >
      {/* Decorative Interactive Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Neon blue and purple blurred ambient glow circles */}
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-[#915EFF]/5 blur-[80px]" style={{ contain: "paint" }} />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-[#00E5FF]/5 blur-[80px]" style={{ contain: "paint" }} />
        
        {/* Technological Grid Lines */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-6xl mx-auto w-full z-10 space-y-20">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#915EFF]/10 border border-[#915EFF]/30 text-sm text-gray-300 font-mono shadow-[0_0_15px_rgba(145,94,255,0.15)]">
            <Briefcase size={16} className="text-[#00E5FF] animate-pulse" /> Professional Path
          </div>
          <h2 className="section-title">Work Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#915EFF] to-[#00E5FF] mx-auto rounded-full shadow-[0_0_10px_#915EFF]" />
        </div>

        {/* Timeline body wrapper */}
        <div className="relative w-full">
          {/* Centered Timeline Line (Desktop) / Left Timeline Line (Mobile) */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-[3px] bg-white/5 rounded-full">
            {/* Progressing overlay line */}
            <motion.div
              style={{ scaleY }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#915EFF] via-[#A855F7] to-[#00E5FF] origin-top shadow-[0_0_15px_#915EFF] rounded-full"
            />
          </div>

          {/* Timeline Nodes & Cards */}
          <div className="space-y-16 relative">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={exp.id} className="relative flex flex-col md:flex-row items-center w-full">
                  {/* Glowing Node Component */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="relative w-10 h-10 rounded-full bg-[#050505] border-2 border-[#915EFF] flex items-center justify-center shadow-[0_0_20px_rgba(145,94,255,0.4)] group cursor-pointer"
                    >
                      {/* Pulse Circle core */}
                      <Circle size={10} className="text-[#00E5FF] fill-[#00E5FF] group-hover:scale-150 transition-transform duration-300" />
                      
                      {/* Outer ripple rings */}
                      <div className="absolute -inset-2 rounded-full border border-[#00E5FF]/20 animate-ping opacity-75 pointer-events-none" />
                    </motion.div>
                  </div>

                  {/* Experience Detail Card */}
                  <ExperienceCard exp={exp} index={index} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;