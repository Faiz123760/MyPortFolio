import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll and change navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ["about", "education", "skills", "experience", "work"];
      const scrollPosition = window.scrollY + 100;

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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Smooth scroll function
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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#0a0a1f] bg-opacity-80 backdrop-blur-md shadow-lg py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-white flex justify-between items-center">
          {/* Logo with hover effect */}
          <div className="text-xl font-bold cursor-pointer group">
            <span className="text-[#9d6eff] group-hover:text-[#b48aff] transition-colors">&lt;</span>
            <span className="text-white group-hover:text-gray-200 transition-colors">Mohd</span>
            <span className="text-[#9d6eff] group-hover:text-[#b48aff] transition-colors">/</span>
            <span className="text-white group-hover:text-gray-200 transition-colors">Faiz</span>
            <span className="text-[#9d6eff] group-hover:text-[#b48aff] transition-colors">&gt;</span>
          </div>

          {/* Desktop Menu with enhanced styling */}
          <ul className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-[#9d6eff] bg-white/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-[#9d6eff] rounded-full"></span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop Social Icons */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="https://github.com/Faiz123760/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
              aria-label="GitHub"
            >
              <FaGithub size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/mohd-faiz-0493bb2a7/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={22} />
            </a>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            className="md:hidden menu-button relative w-10 h-10 flex items-center justify-center rounded-lg bg-[#9d6eff]/10 hover:bg-[#9d6eff]/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#9d6eff] focus:ring-offset-2 focus:ring-offset-[#0a0a1f]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <FiX className="text-2xl text-[#9d6eff]" />
            ) : (
              <FiMenu className="text-2xl text-[#9d6eff]" />
            )}
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full md:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="mobile-menu bg-[#0f0f25] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Menu Items */}
            <ul className="py-3">
              {menuItems.map((item, index) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuItemClick(item.id)}
                    className={`w-full text-left px-6 py-4 transition-all duration-300 ${
                      activeSection === item.id
                        ? "bg-[#9d6eff]/10 text-[#9d6eff] border-l-4 border-[#9d6eff]"
                        : "text-gray-300 hover:bg-white/5 hover:text-white border-l-4 border-transparent"
                    }`}
                    style={{
                      animation: isOpen ? `slideIn 0.3s ease-out ${index * 0.05}s both` : 'none'
                    }}
                  >
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Social Icons for Mobile */}
            <div className="flex items-center justify-center space-x-4 py-6 border-t border-white/10 bg-[#0a0a1f]/50">
              <a
                href="https://github.com/Faiz123760/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-[#9d6eff]/20 rounded-xl transition-all duration-300 group"
                aria-label="GitHub"
              >
                <FaGithub size={24} className="text-gray-300 group-hover:text-[#9d6eff] transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/mohd-faiz-0493bb2a7/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-[#9d6eff]/20 rounded-xl transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} className="text-gray-300 group-hover:text-[#9d6eff] transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;