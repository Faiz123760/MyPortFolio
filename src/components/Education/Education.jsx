import React, { useState } from "react";
import { education } from "../../constants";
import { 
  GraduationCap, 
  Calendar, 
  Award, 
  MapPin, 
  BookOpen, 
  Star, 
  Trophy,
  Sparkles,
  Rocket,
  Crown,
  Target,
  CircleDot
} from "lucide-react";
import Tilt from 'react-parallax-tilt';

const Education = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    

    <section
      id="education"
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
            <GraduationCap className="text-purple-400 animate-pulse" size={18} />
            <span className="text-sm font-medium text-gray-300">Academic Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
            My educational path has been a continuous journey of discovery, 
            growth, and academic excellence.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Animated Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 bg-white opacity-30 blur-sm"></div>
          </div>

          {/* Education Timeline Items */}
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className={`relative flex flex-col md:flex-row items-start mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot with Icon */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50 z-20">
                <GraduationCap className="w-5 h-5 text-white" />
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
                    onMouseEnter={() => setHoveredId(edu.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Animated Border */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000 ${hoveredId === edu.id ? 'animate-spin-slow' : ''}`}></div>
                    
                    {/* Card Content */}
                    <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-transparent transition-all duration-500">
                      
                      {/* Decorative Elements */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-bl-2xl rounded-tr-2xl"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-tr-2xl rounded-bl-2xl"></div>
                      
                      {/* Year Badge */}
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
                        {edu.date}
                      </div>

                      {/* Card Header */}
                      <div className="flex items-start gap-4 mb-4">
                        {/* School Logo */}
                        <div className="relative flex-shrink-0">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-50"></div>
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20">
                            <img
                              src={edu.img}
                              alt={edu.school}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Title and School */}
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400">
                            {edu.degree}
                          </h3>
                          <h4 className="text-sm text-gray-300">{edu.school}</h4>
                        </div>
                      </div>

                      {/* Grade Badge */}
                      <div className="mb-4 inline-flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                        <Award className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-300">Grade:</span>
                        <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                          {edu.grade}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {edu.desc}
                      </p>

                      {/* Achievement Tags */}
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full border border-purple-500/30 flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Academic Excellence
                        </span>
                        <span className="text-xs bg-pink-500/20 text-pink-300 px-2 py-1 rounded-full border border-pink-500/30 flex items-center gap-1">
                          <Rocket className="w-3 h-3" />
                          Top Performer
                        </span>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </div>

              {/* Mobile Date Indicator */}
              <div className="md:hidden mt-2 ml-12 text-xs text-gray-400 flex items-center gap-2">
                <Calendar className="w-3 h-3 text-purple-400" />
                <span>{edu.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <GraduationCap size={20} />, label: 'Years of Learning', value: '12+' },
            { icon: <Award size={20} />, label: 'Achievements', value: '12+' },
            { icon: <BookOpen size={20} />, label: 'Subjects Mastered', value: '40+' },
            { icon: <Star size={20} />, label: 'Overall Score', value: '85%' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="group relative text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/20 group-hover:to-pink-600/20 rounded-xl transition-all duration-500"></div>
              
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

export default Education;