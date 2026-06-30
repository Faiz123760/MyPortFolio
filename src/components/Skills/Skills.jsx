import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkillsInfo } from "../../constants";
import SkillNeuralNetwork from "./SkillNeuralNetwork";
import SkillGlassCard from "./SkillGlassCard";
import SkillMarquee from "./SkillMarquee";
import { Code2, Cpu, Brain, Gauge } from "lucide-react";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(SkillsInfo[0].title);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const categoryIcons = {
    "Frontend": <Code2 className="w-5 h-5 text-[#00E5FF]" />,
    "Backend": <Cpu className="w-5 h-5 text-[#915EFF]" />,
    "Languages": <Brain className="w-5 h-5 text-[#A855F7]" />,
    "Tools": <Gauge className="w-5 h-5 text-yellow-500" />
  };

  const activeSkills = SkillsInfo.find((c) => c.title === activeCategory)?.skills || [];

  return (
    <section
      id="skills"
      className="relative w-full min-h-screen py-24 px-6 lg:px-16 bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background gradients and neon grids */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,229,255,0.04),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#915EFF]/10 border border-[#915EFF]/30 text-sm text-gray-300 font-mono"
          >
            <Code2 size={16} className="text-[#915EFF] animate-pulse" /> Neural Core System
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mt-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#00E5FF] font-mono tracking-tight"
          >
            Expertise & Tech Stack
          </motion.h2>
          <p className="text-xs lg:text-sm text-gray-400 max-w-lg mx-auto mt-3 font-sans">
            Technologies I use to build modern, scalable, and high-performance applications.
          </p>
          <div className="w-24 h-[2px] bg-gradient-to-r from-[#915EFF] via-[#00E5FF] to-transparent mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
        </div>

        {/* Content Box */}
        <div className="flex flex-col lg:flex-row items-stretch gap-10">
          {/* Left Side: Category Navigator & Fallback lists */}
          <div className="w-full lg:w-4/12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white font-mono tracking-wider mb-2">Categories</h3>
              <div className="flex flex-wrap lg:flex-col gap-3">
                {SkillsInfo.map((cat) => (
                  <button
                    key={cat.title}
                    onClick={() => {
                      setActiveCategory(cat.title);
                      setSelectedSkill(null); // Reset detail card when switching category
                    }}
                    className={`flex items-center gap-3 px-5 py-4 rounded-xl border transition-all text-left w-full sm:w-auto lg:w-full ${
                      activeCategory === cat.title
                        ? "bg-[#915EFF]/15 border-[#915EFF] text-white shadow-[0_0_20px_rgba(145,94,255,0.25)]"
                        : "bg-[#0b0618]/50 border-white/5 text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {categoryIcons[cat.title]}
                    <span className="font-semibold text-sm font-mono tracking-wide">{cat.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick List panel */}
            <div className="glass-card p-6 border border-white/5 bg-[#0b0618]/30 backdrop-blur-md rounded-2xl">
              <h4 className="text-xs font-semibold text-[#00E5FF] uppercase tracking-widest mb-4 flex items-center gap-2 font-mono">
                {activeCategory} Stack list
              </h4>
              <div className="grid grid-cols-2 gap-2.5">
                {activeSkills.map((skill) => (
                  <button
                    key={skill.name}
                    onClick={() => setSelectedSkill(skill)}
                    className="p-2.5 bg-[#050505]/50 border border-white/5 hover:border-orange-500/40 rounded-xl flex items-center gap-2.5 hover:-translate-y-0.5 transition-all text-left"
                  >
                    <img src={skill.logo} alt={skill.name} className="w-6 h-6 object-contain" />
                    <span className="text-[10px] font-medium text-gray-300 font-mono truncate">{skill.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Interactive 3D Spider Web / Neural Network Canvas */}
          <div className="w-full lg:w-8/12 min-h-[450px] lg:min-h-[550px] relative border border-white/5 rounded-3xl bg-[#0b0618]/25 backdrop-blur-sm overflow-hidden flex items-center justify-center shadow-[inset_0_0_30px_rgba(145,94,255,0.05)]">
            <SkillNeuralNetwork
              selectedSkill={selectedSkill}
              onSelectSkill={setSelectedSkill}
            />

            <div className="absolute bottom-4 left-6 text-[10px] text-gray-500 font-mono pointer-events-none uppercase tracking-widest z-20">
              Drag to Orbit • Click node to inspect details
            </div>

            {/* Render Floating detail glassmorphic overlay card */}
            <AnimatePresence>
              {selectedSkill && (
                <SkillGlassCard
                  skill={selectedSkill}
                  onClose={() => setSelectedSkill(null)}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dual Infinite Skills Marquee */}
        <SkillMarquee onSelectSkill={setSelectedSkill} />
      </div>
    </section>
  );
};

export default Skills;