import React, { useState } from "react";
import { projects } from "../../constants";
import { 
  Code, 
  ExternalLink, 
  Github, 
  X, 
  Eye, 
  Star, 
  GitBranch,
  Calendar,
  FolderKanban,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import Tilt from 'react-parallax-tilt';

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("all");

  // Get unique tags for filtering
  const allTags = ["all", ...new Set(projects.flatMap(project => project.tags))];

  // Filter projects based on selected tag
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.tags.includes(filter));

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  // Prevent card click when clicking on buttons
  const handleButtonClick = (e, url) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Handle card click with proper event delegation
  const handleCardClick = (e, project) => {
    // Check if the click target is a button or inside a button
    if (e.target.closest('button')) {
      return; // Don't open modal if button was clicked
    }
    handleOpenModal(project);
  };

  return (
    <section
      id="work"
      className="section-alternate relative py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 font-poppins min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-6 py-2 rounded-full border border-purple-500/30 mb-4">
            <FolderKanban className="text-purple-400" size={18} />
            <span className="text-sm font-medium text-gray-300">My Portfolio</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mt-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
          
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
            A showcase of the projects I have worked on, highlighting my skills
            and experience in various technologies
          </p>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === tag
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
              {filter === tag && <Sparkles className="inline ml-2 w-3 h-3" />}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Tilt
              key={project.id}
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              perspective={1000}
              scale={1.02}
              transitionSpeed={1500}
              className="w-full h-full"
            >
              <div
                onClick={(e) => handleCardClick(e, project)}
                className="group relative h-full cursor-pointer"
              >
                {/* Card Border Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
                
                {/* Main Card */}
                <div className="relative h-full bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-transparent transition-all duration-500">
                  
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-48">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay Icons */}
                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                      <div className="bg-black/50 backdrop-blur-sm p-2 rounded-full border border-white/10">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Project Type Badge */}
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg">
                        {project.tags[0]}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-purple-500/10 text-purple-400 px-2 py-1 rounded-full border border-purple-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-xs bg-gray-700/50 text-gray-400 px-2 py-1 rounded-full">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons - Code and Live Demo */}
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={(e) => handleButtonClick(e, project.github)}
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-gray-600 hover:border-purple-500/50 group/btn"
                      >
                        <Github className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                        <span>Code</span>
                      </button>
                      <button
                        onClick={(e) => handleButtonClick(e, project.webapp)}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500 hover:to-pink-500 text-purple-400 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-purple-500/30 hover:border-transparent group/btn"
                      >
                        <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        <span>Live Demo</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          ))}
        </div>

        {/* Project Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <FolderKanban size={20} />, label: 'Total Projects', value: projects.length + '+' },
            { icon: <Code size={20} />, label: 'Technologies Used', value: '30+' },
            { icon: <Star size={20} />, label: 'GitHub Stars', value: '50+' },
            { icon: <GitBranch size={20} />, label: 'Repo Forks', value: '55+' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="group relative text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
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
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div 
            className="relative w-full max-w-4xl bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Close Button */}
            <div className="absolute top-4 right-4 z-30">
              <button
                onClick={handleCloseModal}
                className="bg-black/50 backdrop-blur-sm p-2 rounded-full border border-white/10 hover:border-purple-500/50 transition-all duration-300 group"
              >
                <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="lg:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                
                {/* Tags Overlay */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-black/50 backdrop-blur-sm text-xs font-semibold text-purple-400 px-3 py-1 rounded-full border border-purple-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Details Section */}
              <div className="lg:w-1/2 p-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  {selectedProject.title}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Project Features (if available) */}
                {selectedProject.features && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-300 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-400">
                          <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl transition-all duration-300 group"
                  >
                    <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span>Code</span>
                  </a>
                  <a
                    href={selectedProject.webapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl transition-all duration-300 group"
                  >
                    <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Live Demo</span>
                  </a>
                </div>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Completed 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    <span>Full Stack</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Work;