import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll and change navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ["about", "education", "skills", "experience", "work"];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuItemClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsOpen(false);

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "work", label: "Projects" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-[99] transition-all duration-500 ${
        isScrolled 
          ? "glass-navbar py-3 shadow-[0_8px_32px_rgba(11,6,24,0.6)]" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo with futuristic styling */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-2xl font-bold cursor-pointer group tracking-wider select-none font-mono"
          >
            <span className="text-[#915EFF] transition-colors group-hover:text-[#00E5FF]">&lt;</span>
            <span className="text-white">Mohd</span>
            <span className="text-[#915EFF]">/</span>
            <span className="text-white">Faiz</span>
            <span className="text-[#915EFF] transition-colors group-hover:text-[#00E5FF]">&gt;</span>
          </div>

          {/* Desktop Menu with active underline */}
          <ul className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-[#00E5FF] text-neon-blue"
                      : "text-gray-300 hover:text-white hover:scale-105"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#915EFF] to-[#00E5FF] rounded-full shadow-[0_0_8px_#00E5FF]"></span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://github.com/Faiz123760/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#00E5FF] transition-all hover:scale-110 p-1.5"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/mohd-faiz-0493bb2a7/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#915EFF] transition-all hover:scale-110 p-1.5"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-[#915EFF]/10 border border-[#915EFF]/20 hover:bg-[#915EFF]/20 transition-all focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX className="text-2xl text-[#00E5FF]" /> : <FiMenu className="text-2xl text-[#915EFF]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full md:hidden px-4 py-2">
          <div className="bg-[#0b0618]/95 border border-[#915EFF]/30 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl p-4 space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuItemClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                  activeSection === item.id
                    ? "bg-[#915EFF]/20 text-[#00E5FF] border-l-4 border-[#00E5FF]"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center justify-center space-x-6 pt-4 border-t border-white/10">
              <a
                href="https://github.com/Faiz123760/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#00E5FF]"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/mohd-faiz-0493bb2a7/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#915EFF]"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;