import React from "react";
import { FaLinkedinIn, FaInstagram, FaGithub, FaHeart, FaArrowUp } from "react-icons/fa";
import { SiLeetcode as LeetcodeIcon } from "react-icons/si";
import { motion } from "framer-motion";
import Scene from "../three/Scene";
import EarthModel from "../three/EarthModel";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <footer className="relative bg-[#0b0618] text-white pt-20 pb-8 px-6 lg:px-16 overflow-hidden border-t border-white/5">
      {/* Soft background ambient gradient lights */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-[#915EFF]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-[#00E5FF]/4 blur-[100px] pointer-events-none" />

      <motion.div 
        className="max-w-6xl mx-auto z-10 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo Brand info */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h2 className="text-3xl font-black bg-gradient-to-r from-[#915EFF] via-[#A855F7] to-[#00E5FF] bg-clip-text text-transparent uppercase tracking-wider">
              Mohd Faiz
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Crafting high-fidelity, interactive digital products. Dedicated to delivering optimized code and cinematic user experiences.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#00E5FF] font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF]"></span>
              </span>
              <span>Available globally for opportunities</span>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#915EFF] font-mono">Quick Nav</h3>
            <ul className="space-y-2.5 text-xs text-gray-400">
              {["about", "education", "skills", "experience", "work"].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                    className="hover:text-[#00E5FF] hover:translate-x-1 transition-all duration-300 capitalize flex items-center gap-1 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-[#00E5FF] transition-all duration-300" />
                    <span>{id === "work" ? "projects" : id}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social connections */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#915EFF] font-mono">Let's Connect</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <FaLinkedinIn size={18} />, link: "https://www.linkedin.com/in/mohd-faiz-0493bb2a7/", label: "LinkedIn" },
                { icon: <FaInstagram size={18} />, link: "https://www.instagram.com/mr_faiz_.official", label: "Instagram" },
                { icon: <FaGithub size={18} />, link: "https://github.com/Faiz123760/", label: "GitHub" },
                { icon: <LeetcodeIcon size={18} />, link: "https://leetcode.com/u/MrFaiz/", label: "LeetCode" }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#00E5FF] hover:border-[#00E5FF] transition-all shadow-lg hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* 3D Earth representation */}
          <motion.div className="w-full h-44 relative bg-[#050505]/40 border border-white/5 rounded-2xl overflow-hidden group/canvas" variants={itemVariants}>
            <Scene enableZoom={false} cameraPos={[0, 0, 3]}>
              <EarthModel />
            </Scene>
            <div className="absolute bottom-2 left-2 text-[9px] text-gray-500 font-mono pointer-events-none uppercase tracking-wider group-hover/canvas:text-[#00E5FF] transition-colors">
              Global Network
            </div>
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div 
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4"
          variants={itemVariants}
        >
          <p className="text-xs text-gray-500 font-light text-center md:text-left">
            © {new Date().getFullYear()} Mohd Faiz. Made with <FaHeart className="inline text-[#915EFF] mx-0.5 animate-pulse" /> & Optimizations.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#00E5FF] hover:border-[#00E5FF] transition-all shadow-md"
            aria-label="Scroll to top"
          >
            <FaArrowUp size={16} />
          </motion.button>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;