// src/components/Skills/Skills.jsx
import React, { useState } from "react";
import { SkillsInfo } from "../../constants";
import Tilt from "react-parallax-tilt";
import { 
  Code2, 
  Cpu, 
  Brain, 
  Gauge,
  ChevronRight,
  Star
} from "lucide-react";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  // Skill category icons mapping
  const categoryIcons = {
    "Frontend": <Code2 className="w-6 h-6" />,
    "Backend": <Cpu className="w-6 h-6" />,
    "Languages": <Brain className="w-6 h-6" />,
    "Tools": <Gauge className="w-6 h-6" />
  };

  // Category colors
  const categoryColors = {
    "Frontend": "from-blue-500 to-cyan-500",
    "Backend": "from-green-500 to-emerald-500",
    "Languages": "from-purple-500 to-pink-500",
    "Tools": "from-orange-500 to-red-500"
  };

  return (
    <section
      id="skills"
      className="section-alternate py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 font-poppins min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-6 py-2 rounded-full border border-purple-500/30 mb-4">
            <Code2 className="text-purple-400" size={18} />
            <span className="text-sm font-medium text-gray-300">Technical Expertise</span>
          </div>
          
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold mt-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          
          {/* Divider */}
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
          
          {/* Description */}
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
            A collection of my technical skills and expertise honed through 
            various projects and real-world experiences
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SkillsInfo.map((category, categoryIndex) => {
            const isActive = activeCategory === category.title;
            const colorGradient = categoryColors[category.title] || "from-purple-500 to-pink-500";
            
            return (
              <div
                key={category.title}
                className="group"
                onMouseEnter={() => setActiveCategory(category.title)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                {/* Category Card */}
                <div className="relative bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10">
                  
                  {/* Header with Icon */}
                  <div className="flex items-center gap-4 mb-8">
                    {/* Icon Container */}
                    <div className={`relative w-14 h-14 bg-gradient-to-br ${colorGradient} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                      {categoryIcons[category.title] || <Code2 className="w-6 h-6" />}
                    </div>
                    
                    {/* Title and Count */}
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {category.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">
                          {category.skills.length} Technologies
                        </span>
                        {isActive && (
                          <ChevronRight className="w-4 h-4 text-purple-400 animate-pulse" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <Tilt
                    tiltMaxAngleX={5}
                    tiltMaxAngleY={5}
                    perspective={1000}
                    scale={1.02}
                    transitionSpeed={1500}
                    className="w-full"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {category.skills.map((skill, skillIndex) => (
                        <div
                          key={skill.name}
                          className="group/skill relative"
                        >
                          {/* Skill Card */}
                          <div className="relative p-4 bg-gray-700/30 rounded-xl border border-gray-600 hover:border-purple-500 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20">
                            
                            {/* Skill Logo */}
                            <div className="flex justify-center mb-3">
                              <div className="relative">
                                <img
                                  src={skill.logo}
                                  alt={`${skill.name} logo`}
                                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform duration-300 group-hover/skill:scale-110"
                                />
                              </div>
                            </div>
                            
                            {/* Skill Name */}
                            <div className="text-center">
                              <span className="text-sm sm:text-base font-medium text-gray-300 group-hover/skill:text-white transition-colors duration-300">
                                {skill.name}
                              </span>
                            </div>

                            {/* Hover Indicator */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300">
                              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tilt>

                  {/* Category Footer */}
                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Proficiency</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4].map((star) => (
                          <Star
                            key={star}
                            className="w-4 h-4 text-yellow-400 fill-yellow-400"
                          />
                        ))}
                        <Star className="w-4 h-4 text-gray-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Code2 size={20} />, label: 'Technologies', value: '30+' },
            { icon: <Cpu size={20} />, label: 'Projects Built', value: '25+' },
            { icon: <Brain size={20} />, label: 'Learning Hours', value: '1000+' },
            { icon: <Gauge size={20} />, label: 'Years Experience', value: '2+' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="group relative text-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 rounded-xl transition-all duration-500"></div>
              
              <div className="relative">
                <div className="text-purple-400 text-xl mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-gray-400 mt-1">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            <span>Frontend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
            <span>Backend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            <span>Languages</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
            <span>Tools</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;