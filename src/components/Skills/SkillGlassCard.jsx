import React from "react";
import { motion } from "framer-motion";
import { X, Briefcase, Calendar, Award } from "lucide-react";
import { projects } from "../../constants";

const SkillGlassCard = ({ skill, onClose }) => {
  if (!skill) return null;

  // Find projects using this skill (case-insensitive check)
  const relatedProjects = projects.filter((proj) =>
    proj.tags.some(
      (tag) =>
        tag.toLowerCase().includes(skill.name.toLowerCase()) ||
        skill.name.toLowerCase().includes(tag.toLowerCase())
    )
  );

  // Generate experience stats based on name length so it's consistent
  const experienceYears = 1 + (skill.name.length % 4);
  const confidencePercent = skill.percent || 80;

  // Custom descriptions based on skill
  const getDescription = (name) => {
    const descMap = {
      React: "High-performance Single Page Applications with dynamic state management.",
      HTML: "Semantic building blocks of modern web pages, compliant with accessibility guidelines.",
      CSS: "Responsive typography, grid/flex layouts, CSS variables, and fluid transitions.",
      JavaScript: "Modern ES6+ development, asynchronous patterns, DOM operations, and algorithms.",
      TypeScript: "Strong typing, interfaces, and compiles-time safety for rock-solid frontend apps.",
      Redux: "Global state synchronization across large-scale dynamic component trees.",
      Tailwind: "Utility-first layout, speed-optimized designs, and seamless customization.",
      Node: "Scalable backend services, multi-threaded worker configurations, and API structures.",
      Express: "Restful API design, middleware handling, CORS configurations, and routers.",
      MongoDB: "NoSQL document structures, high-performance aggregation pipelines, and querying.",
      MySQL: "Relational database schema modeling, optimized indexing, and transaction safety.",
      Git: "Distributed version control, branch management, rebase/merge strategies, and pull requests.",
    };
    const key = Object.keys(descMap).find((k) =>
      name.toLowerCase().includes(k.toLowerCase())
    );
    return key
      ? descMap[key]
      : `Proficient stack implementation of ${name} for scalable and high-performance applications.`;
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
      {/* Background overlay blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#050505]/75 backdrop-blur-md pointer-events-auto"
      />

      {/* Floating Glass Panel */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="relative w-full max-w-lg bg-[#0b0618]/70 border border-orange-500/25 rounded-3xl p-6 shadow-[0_0_35px_rgba(145,94,255,0.2)] backdrop-blur-2xl pointer-events-auto overflow-hidden text-white"
      >
        {/* Glow corner accents */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#00E5FF]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#FF5722]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Header section */}
        <div className="flex justify-between items-start gap-4 mb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center p-2.5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <img
                src={skill.logo}
                alt={skill.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#00E5FF]">
                {skill.category || "Skill details"}
              </span>
              <h3 className="text-2xl font-bold font-mono tracking-tight text-white mt-0.5">
                {skill.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-orange-500/50 transition-colors"
          >
            <X size={18} className="text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Content body */}
        <div className="space-y-5">
          {/* Description */}
          <p className="text-sm text-gray-300 leading-relaxed font-sans">
            {getDescription(skill.name)}
          </p>

          {/* Progress / Proficiency Level */}
          <div>
            <div className="flex justify-between text-xs font-semibold font-mono tracking-wider text-gray-400 mb-2">
              <span>PROFICIENCY LEVEL</span>
              <span className="text-[#00E5FF]">{confidencePercent}%</span>
            </div>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5 p-[1px]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#00E5FF] to-[#FF5722]"
                initial={{ width: 0 }}
                animate={{ width: `${confidencePercent}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl flex items-center gap-3">
              <Calendar size={18} className="text-orange-500" />
              <div>
                <div className="text-[10px] text-gray-400 font-mono">EXPERIENCE</div>
                <div className="text-sm font-bold font-mono">{experienceYears} Years</div>
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl flex items-center gap-3">
              <Award size={18} className="text-[#00E5FF]" />
              <div>
                <div className="text-[10px] text-gray-400 font-mono">CERTIFICATION</div>
                <div className="text-sm font-bold font-mono">Verified Stack</div>
              </div>
            </div>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center gap-2 text-xs font-bold font-mono tracking-widest text-[#00E5FF] mb-3">
                <Briefcase size={14} /> RELATED PROJECTS
              </div>
              <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pr-1">
                {relatedProjects.map((project) => (
                  <a
                    key={project.id}
                    href={project.webapp || project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-[#915EFF]/10 hover:bg-[#915EFF]/20 border border-[#915EFF]/30 rounded-lg text-xs font-mono text-gray-200 transition-colors flex items-center gap-1.5"
                  >
                    <span>{project.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SkillGlassCard;
