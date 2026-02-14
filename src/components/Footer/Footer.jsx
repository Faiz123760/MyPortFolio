import React from "react";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaYoutube,
  FaGithub,
  FaHeart,
  FaArrowUp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPaperPlane
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
  // Smooth scroll function
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle email click
  const handleEmailClick = () => {
    window.location.href = "mailto:faiz47532@gmail.com?subject=Hello%20Faiz&body=I%20would%20like%20to%20connect%20with%20you";
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-8 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-pink-600 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-1">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Mohd Faiz
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Crafting digital experiences with passion and precision. Full-stack developer dedicated to building beautiful and functional web applications.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaHeart className="text-pink-400 animate-pulse" />
              <span>Available for opportunities</span>
            </div>
            
            {/* Email Contact Button */}
            <button
              onClick={handleEmailClick}
              className="mt-4 w-full group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 p-[2px] rounded-xl"
            >
              <div className="relative flex items-center justify-center gap-2 bg-gray-900 rounded-xl px-4 py-3 transition-all duration-300 group-hover:bg-transparent">
                <FaEnvelope className="text-purple-400 group-hover:text-white transition-colors duration-300" />
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                  Send me an email
                </span>
                <FaPaperPlane className="text-pink-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
            </h3>
            <nav className="flex flex-col space-y-3">
              {[
                { name: "About", id: "about" },
                { name: "Skills", id: "skills" },
                { name: "Education", id: "education" },
                { name: "Experience", id: "experience" },
                { name: "Projects", id: "projects" },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleScroll(item.id)}
                  className="text-gray-400 hover:text-purple-400 text-sm transition-all duration-300 text-left hover:translate-x-2"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
              Contact Info
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-300 group">
                <FaEnvelope className="text-purple-400" />
                <a href="mailto:faiz47532@gmail.com" className="text-sm">
                  faiz47532@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-300">
                <FaPhoneAlt className="text-purple-400" />
                <a href="tel:+918795412711" className="text-sm">
                  +91 8795412711
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FaMapMarkerAlt className="text-purple-400" />
                <span className="text-sm">India</span>
              </div>
            </div>

            {/* Quick Contact Hint */}
            <div className="mt-4 text-xs text-gray-500">
              <span>Click email to send a message</span>
            </div>
          </div>

          {/* Quote Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
              Quote
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
            </h3>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <p className="text-gray-300 text-sm italic">
                "Code is like humor. When you have to explain it, it's bad."
              </p>
              <p className="text-gray-400 text-xs mt-2">- Cory House</p>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright Section */}
        <div className="relative pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {[
                { icon: <FaLinkedinIn />, link: "https://www.linkedin.com/in/mohd-faiz-0493bb2a7/", label: "LinkedIn" },
                { icon: <FaInstagram />, link: "https://www.instagram.com/mr_faiz_.official", label: "Instagram" },
                { icon: <FaGithub />, link: "https://github.com/Faiz123760/", label: "GitHub" },
                { icon: <SiLeetcode />, link: "https://leetcode.com/u/MrFaiz/", label: "LeetCode" }
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative w-10 h-10 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 group-hover:text-white border border-white/10 group-hover:border-transparent transition-all duration-300 hover:scale-110">
                    {item.icon}
                  </div>
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-400 order-first md:order-none">
              © {new Date().getFullYear()} Mohd Faiz. Crafted with 
              <FaHeart className="inline mx-1 text-pink-400 animate-pulse" /> 
              All rights reserved.
            </p>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="group relative w-10 h-10 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-110"
              aria-label="Back to top"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
              <FaArrowUp className="relative text-gray-300 group-hover:text-white transition-colors duration-300" />
            </button>
          </div>

          {/* Bottom Decoration */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-full opacity-50"></div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;