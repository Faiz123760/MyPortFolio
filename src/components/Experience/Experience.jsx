import React, { useState } from "react";
import { experiences } from "../../constants";
import { 
  Briefcase, 
  Calendar, 
  Award, 
  MapPin, 
  Code, 
  Star, 
  Trophy,
  Sparkles,
  Rocket,
  Crown,
  Target,
  CircleDot,
  Building,
  Users,
  GitBranch,
  Clock
} from "lucide-react";
import Tilt from 'react-parallax-tilt';

const Experience = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section
      id="experience"
      className="section-alternate relative py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 font-poppins min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-black"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-6 py-2 rounded-full border border-purple-500/30">
            <Briefcase className="text-purple-400 animate-pulse" size={18} />
            <span className="text-sm font-medium text-gray-300">Professional Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
            A collection of my work experience and the roles I have taken in
            various organizations
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Animated Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 bg-white opacity-30 blur-sm"></div>
          </div>

          {/* Experience Timeline Items */}
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={`relative flex flex-col md:flex-row items-start mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot with Icon */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50 z-20">
                <Briefcase className="w-5 h-5 text-white" />
              </div>

              {/* Content Card - Alternating Left and Right */}
              <div className={`relative w-full md:w-[calc(50%-3rem)] ml-12 md:ml-0 ${
                index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
              }`}>
                <Tilt
                  tiltMaxAngleX={3}
                  tiltMaxAngleY={3}
                  perspective={1000}
                  scale={1.02}
                  transitionSpeed={2000}
                  className="w-full"
                >
                  <div
                    className="relative group"
                    onMouseEnter={() => setHoveredId(experience.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Animated Border */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000 ${hoveredId === experience.id ? 'animate-spin-slow' : ''}`}></div>
                    
                    {/* Card Content */}
                    <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-transparent transition-all duration-500">
                      
                      {/* Decorative Elements */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-bl-2xl rounded-tr-2xl"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-tr-2xl rounded-bl-2xl"></div>
                      
                      {/* Duration Badge */}
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {experience.date}
                      </div>

                      {/* Card Header */}
                      <div className="flex items-start gap-4 mb-4">
                        {/* Company Logo */}
                        <div className="relative flex-shrink-0">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-50"></div>
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20">
                            <img
                              src={experience.img}
                              alt={experience.company}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Role and Company */}
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400">
                            {experience.role}
                          </h3>
                          <h4 className="text-sm text-gray-300 flex items-center gap-1">
                            <Building className="w-3 h-3 text-purple-400" />
                            {experience.company}
                          </h4>
                        </div>
                      </div>

                      {/* Experience Type Badge */}
                      <div className="mb-4 inline-flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-300">Role:</span>
                        <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                          {experience.role.split(' ')[0]} Level
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {experience.desc}
                      </p>

                      {/* Skills Tags */}
                      <div className="mt-4">
                        <h5 className="text-xs font-medium text-gray-300 mb-2 flex items-center gap-1">
                          <Code className="w-3 h-3 text-purple-400" />
                          Technologies & Skills
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {experience.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full border border-purple-500/30 flex items-center gap-1 hover:bg-purple-500/30 transition-colors duration-300"
                            >
                              <CircleDot className="w-2 h-2" />
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Achievement Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full border border-green-500/30 flex items-center gap-1">
                          <Rocket className="w-3 h-3" />
                          Full-time
                        </span>
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/30 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          Team Player
                        </span>
                        <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full border border-orange-500/30 flex items-center gap-1">
                          <GitBranch className="w-3 h-3" />
                          Git Pro
                        </span>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </div>

              {/* Mobile Date Indicator */}
              <div className="md:hidden mt-2 ml-12 text-xs text-gray-400 flex items-center gap-2">
                <Calendar className="w-3 h-3 text-purple-400" />
                <span>{experience.date}</span>
              </div>
            </div>
          ))}
        </div>

       
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out forwards;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Experience;