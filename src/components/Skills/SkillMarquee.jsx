import React, { useMemo } from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { SkillsInfo } from "../../constants";

const SkillMarquee = ({ onSelectSkill }) => {
  // Extract all unique skills across categories
  const { row1, row2 } = useMemo(() => {
    const uniqueSkills = [];
    const seen = new Set();

    SkillsInfo.forEach((category) => {
      category.skills.forEach((skill) => {
        if (!seen.has(skill.name)) {
          seen.add(skill.name);
          uniqueSkills.push({
            ...skill,
            category: category.title,
          });
        }
      });
    });

    // Split into two distinct rows
    const half = Math.ceil(uniqueSkills.length / 2);
    return {
      row1: uniqueSkills.slice(0, half),
      row2: uniqueSkills.slice(half),
    };
  }, []);

  const handlePillClick = (skill) => {
    // Scroll to the main skills section container
    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: "smooth" });
    }
    // Select the skill to zoom and focus in the 3D network
    onSelectSkill(skill);
  };

  const Pill = ({ skill }) => (
    <div
      onClick={() => handlePillClick(skill)}
      className="group flex items-center gap-2.5 px-5 py-2.5 mx-3 bg-[#0b0618]/45 border border-white/5 hover:border-orange-500/50 rounded-full cursor-pointer transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,87,34,0.25)] hover:bg-[#0b0618]/80 select-none backdrop-blur-md"
    >
      <img
        src={skill.logo}
        alt={skill.name}
        className="w-5 h-5 object-contain group-hover:rotate-12 transition-transform duration-300"
      />
      <span className="text-xs font-mono font-bold text-gray-300 group-hover:text-white tracking-wide transition-colors">
        {skill.name}
      </span>
      <span className="text-[10px] text-[#00E5FF] opacity-40 group-hover:opacity-100 group-hover:animate-pulse transition-opacity">
        ✦
      </span>
    </div>
  );

  return (
    <div className="w-full mt-24 relative space-y-6">
      {/* Heading */}
      <div className="text-center mb-8 relative">
        <span className="text-[9px] uppercase font-mono tracking-widest text-[#00E5FF]">
          System Integrations
        </span>
        <h3 className="text-lg font-bold font-mono tracking-wide text-white mt-1">
          TECHNOLOGIES I WORK WITH
        </h3>
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mt-2" />
      </div>

      {/* Marquee Tracks with side fading mask */}
      <div className="relative w-full overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]">
        {/* Row 1: Left to Right */}
        <Marquee
          direction="right"
          speed={35}
          pauseOnHover={true}
          gradient={false}
          className="py-2"
        >
          {row1.map((skill, idx) => (
            <Pill key={`r1-${idx}`} skill={skill} />
          ))}
        </Marquee>

        {/* Row 2: Right to Left */}
        <Marquee
          direction="left"
          speed={35}
          pauseOnHover={true}
          gradient={false}
          className="py-2"
        >
          {row2.map((skill, idx) => (
            <Pill key={`r2-${idx}`} skill={skill} />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default SkillMarquee;
