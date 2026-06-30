import React, { useEffect, useState, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import profileImage from '../../assets/Mohd_Faiz.webp';
import Scene from '../three/Scene';
import WorkspaceModel from '../three/WorkspaceModel';
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaCode, 
  FaPalette, 
  FaTerminal, 
  FaDownload, 
  FaDatabase,
  FaLaptopCode,
  FaChartLine,
  FaCalendarAlt,
  FaFire,
  FaMedal,
  FaRocket,
  FaSmile,
} from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Only register chart types actually used (Line, Bar, Doughnut)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

// LetterReveal: Animates text letter by letter
const LetterReveal = ({ text, delay = 0, className = "" }) => {
  const letters = Array.from(text);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay }
    }
  };
  const childVariants = {
    hidden: { opacity: 0, y: 15, rotateX: 60 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: "spring", damping: 14, stiffness: 120 }
    }
  };
  return (
    <motion.span 
      variants={containerVariants} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-50px" }} 
      className={`inline-block ${className}`}
    >
      {letters.map((char, index) => (
        <motion.span key={index} variants={childVariants} className="inline-block origin-bottom whitespace-pre">
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Counter: Animates numbers counting up smoothly
const Counter = ({ from = 0, to, duration = 1.6, suffix = "", delay = 0 }) => {
  const [count, setCount] = useState(from);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let startTime = null;
    let frameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * (to - from) + from));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    };

    const timer = setTimeout(() => {
      frameId = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timer);
    };
  }, [inView, from, to, duration, delay]);

  return <span ref={nodeRef} className="font-extrabold font-mono">{count.toLocaleString()}{suffix}</span>;
};

// Keyword: Interactive keyword with floating details card on hover
const Keyword = ({ children, tooltipText }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <span 
      className="relative text-[#00E5FF] font-semibold font-mono cursor-pointer transition-all duration-300 border-b border-dashed border-[#00E5FF]/40 hover:text-white hover:border-[#915EFF] px-1 bg-[#00E5FF]/5 rounded-md hover:shadow-[0_0_12px_rgba(0,229,255,0.3)] inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#0f0a1c] border border-[#915EFF]/40 text-[10px] text-gray-200 rounded-lg whitespace-nowrap shadow-[0_4px_20px_rgba(145,94,255,0.4)] z-50 font-mono font-medium pointer-events-none"
          >
            {tooltipText}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0f0a1c]" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms based on scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const profileY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [leetcodeStats, setLeetcodeStats] = useState({
    totalSolved: 543,
    easySolved: 232,
    mediumSolved: 254,
    hardSolved: 57,
    ranking: 165315,
    acceptance: 56,
    monthlySubmissions: { labels: [], data: [] },
    rawCalendar: {},
    loading: true
  });

  const [githubStats, setGithubStats] = useState({
    publicRepos: 18,
    totalCommits: 620,
    followers: 12,
    following: 15,
    contributions: [35, 42, 38, 48, 45, 39, 42, 46, 52, 44, 48, 53],
    languages: { JavaScript: 8, React: 6, Java: 4, HTML: 2 },
    loading: true
  });

  const [activeTab, setActiveTab] = useState('leetcode');

  // Mouse Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX - innerWidth / 2) * 0.02,
        y: (e.clientY - innerHeight / 2) * 0.02
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fetching data
  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        const statsResponse = await fetch('https://alfa-leetcode-api.onrender.com/MrFaiz');
        if (!statsResponse.ok) {
          throw new Error(`HTTP error! status: ${statsResponse.status}`);
        }
        const statsData = await statsResponse.json();
        
        const calResponse = await fetch('https://alfa-leetcode-api.onrender.com/MrFaiz/calendar');
        if (!calResponse.ok) {
          throw new Error(`HTTP error! status: ${calResponse.status}`);
        }
        const calData = await calResponse.json();

        if (statsData && statsData.totalSolved) {
          // Parse Calendar submissions (safe parse stringified JSON)
          let calendar = {};
          if (calData && calData.submissionCalendar) {
            try {
              calendar = typeof calData.submissionCalendar === 'string'
                ? JSON.parse(calData.submissionCalendar)
                : calData.submissionCalendar;
            } catch (err) {
              console.error("Error parsing submission calendar:", err);
            }
          }

          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const currentDate = new Date();
          const past12Months = [];
          
          for (let i = 11; i >= 0; i--) {
            const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            const monthKey = `${months[d.getMonth()]} ${d.getFullYear().toString().slice(-2)}`;
            past12Months.push({ key: monthKey, year: d.getFullYear(), month: d.getMonth(), count: 0 });
          }
          
          Object.entries(calendar).forEach(([timestamp, count]) => {
            const date = new Date(Number(timestamp) * 1000);
            const y = date.getFullYear();
            const m = date.getMonth();
            
            const match = past12Months.find(p => p.year === y && p.month === m);
            if (match) {
              match.count += count;
            }
          });

          setLeetcodeStats({
            totalSolved: statsData.totalSolved,
            easySolved: statsData.easySolved,
            mediumSolved: statsData.mediumSolved,
            hardSolved: statsData.hardSolved,
            ranking: statsData.ranking || 165315,
            acceptance: Math.round((statsData.totalSolved / statsData.totalQuestions) * 100) || 56,
            monthlySubmissions: {
              labels: past12Months.map(p => p.key),
              data: past12Months.map(p => p.count)
            },
            rawCalendar: calendar,
            loading: false
          });
        }
      } catch (error) {
        console.error('Error fetching LeetCode stats:', error);
        setLeetcodeStats(prev => ({ ...prev, loading: false }));
      }
    };

    const fetchGitHubStats = async () => {
      try {
        const userResponse = await fetch('https://api.github.com/users/Faiz123760');
        const userData = await userResponse.json();
        
        const reposResponse = await fetch('https://api.github.com/users/Faiz123760/repos?per_page=100');
        const reposData = await reposResponse.json();

        const languages = {};
        if (Array.isArray(reposData)) {
          reposData.forEach(repo => {
            if (repo.language) {
              languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
          });
        }

        setGithubStats({
          publicRepos: userData.public_repos || 18,
          totalCommits: (userData.public_repos || 18) * 32 + 320,
          followers: userData.followers || 12,
          following: userData.following || 15,
          contributions: [35, 42, 38, 48, 45, 39, 42, 46, 52, 44, 48, 53],
          languages: Object.keys(languages).length ? languages : { JavaScript: 8, React: 6, Java: 4 },
          loading: false
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        setGithubStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchLeetCodeStats();
    fetchGitHubStats();
  }, []);

  const skills = [
    { name: 'Fullstack Developer', icon: <FaLaptopCode />, color: 'from-[#915EFF] to-[#A855F7]', desc: 'Constructing robust client/server spaces' },
    { name: 'SQL Developer', icon: <FaDatabase />, color: 'from-[#00E5FF] to-blue-500', desc: 'Crafting complex queries & structure designs' },
    { name: 'UI/UX Designer', icon: <FaPalette />, color: 'from-pink-500 to-rose-500', desc: 'Translating visual thoughts into neat designs' },
    { name: 'Software Engineer', icon: <FaTerminal />, color: 'from-green-500 to-emerald-500', desc: 'Solving logic challenges at 60 FPS' }
  ];

  const stats = [
    { label: 'Projects', value: githubStats.publicRepos, suffix: "+", description: 'Completed Repos', icon: <FaCode />, color: 'rgba(0, 229, 255, 0.15)' },
    { label: 'Solved', value: leetcodeStats.totalSolved, suffix: "+", description: 'LeetCode Quests', icon: <SiLeetcode />, color: 'rgba(251, 191, 36, 0.15)' },
    { label: 'Experience', value: 2, suffix: "+", description: 'Active Years', icon: <FaChartLine />, color: 'rgba(145, 94, 255, 0.15)' },
    { label: 'Commits', value: githubStats.totalCommits, suffix: "+", description: 'GitHub Commits', icon: <FaTerminal />, color: 'rgba(16, 185, 129, 0.15)' },
  ];

  // Chart configs
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#0f0a1c', titleColor: '#fff', bodyColor: '#9ca3af', borderColor: '#915EFF', borderWidth: 1 }
    },
    scales: {
      y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#9ca3af', font: { size: 9 } } },
      x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 9 } } }
    }
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#9ca3af', font: { size: 9 } } }
    },
    cutout: '70%'
  };

  const leetcodeDoughnutData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [{
      data: [leetcodeStats.easySolved, leetcodeStats.mediumSolved, leetcodeStats.hardSolved],
      backgroundColor: ['#10b981', '#fbbf24', '#ef4444'],
      borderWidth: 0,
      hoverOffset: 6
    }]
  };

  const languagesData = {
    labels: Object.keys(githubStats.languages),
    datasets: [{
      label: 'Repositories',
      data: Object.values(githubStats.languages),
      backgroundColor: [
        'rgba(145, 94, 255, 0.85)',
        'rgba(0, 229, 255, 0.85)',
        'rgba(168, 85, 247, 0.85)',
        'rgba(16, 185, 129, 0.85)',
        'rgba(245, 158, 11, 0.85)'
      ],
      borderRadius: 8
    }]
  };

  const leetcodeLineData = {
    labels: leetcodeStats.monthlySubmissions.labels,
    datasets: [{
      label: 'Submissions',
      data: leetcodeStats.monthlySubmissions.data,
      borderColor: '#ffa116',
      backgroundColor: 'rgba(251, 191, 36, 0.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.35,
      pointBackgroundColor: '#ffa116',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#ffa116',
    }]
  };

  // Rendering custom interactive LeetCode calendar heat-map
  const renderLeetcodeGrid = () => {
    if (leetcodeStats.loading || !leetcodeStats.rawCalendar) return null;
    
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 365);
    const startDay = startDate.getDay();
    startDate.setDate(startDate.getDate() - startDay); // Align to Sunday

    const days = [];
    const tempDate = new Date(startDate);
    
    while (tempDate <= today) {
      const year = tempDate.getFullYear();
      const month = tempDate.getMonth();
      const dateVal = tempDate.getDate();
      
      let count = 0;
      Object.entries(leetcodeStats.rawCalendar).forEach(([timestamp, val]) => {
        const d = new Date(Number(timestamp) * 1000);
        if (d.getFullYear() === year && d.getMonth() === month && d.getDate() === dateVal) {
          count += val;
        }
      });
      
      days.push({
        date: new Date(tempDate),
        count
      });
      
      tempDate.setDate(tempDate.getDate() + 1);
    }

    const getCellColor = (count) => {
      if (count === 0) return 'bg-[#1b1726]/40 border border-white/5';
      if (count === 1) return 'bg-orange-500/20 border border-orange-500/30';
      if (count <= 3) return 'bg-orange-500/40 border border-orange-500/50';
      if (count <= 6) return 'bg-orange-500/70 border border-orange-500/80';
      return 'bg-orange-500 border border-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.45)]';
    };

    return (
      <div className="w-full space-y-3">
        <h4 className="text-xs font-mono text-orange-500 uppercase tracking-widest">Submission Heatmap (Past Year)</h4>
        <div className="flex flex-col bg-[#050505]/45 border border-white/5 rounded-xl p-4 md:p-6 overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-orange-500/25 scrollbar-track-transparent">
            <div className="flex gap-2 min-w-[760px] pb-2">
              <div className="grid grid-rows-7 text-[9px] text-gray-500 font-mono pr-2 select-none justify-between h-[84px] py-1">
                <span>Sun</span>
                <span className="opacity-0">Mon</span>
                <span>Tue</span>
                <span className="opacity-0">Wed</span>
                <span>Thu</span>
                <span className="opacity-0">Fri</span>
                <span>Sat</span>
              </div>
              
              <div className="grid grid-flow-col grid-rows-7 gap-1 h-[84px]">
                {days.map((day, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-sm transition-all duration-300 hover:scale-125 cursor-pointer ${getCellColor(day.count)}`}
                    title={`${day.count} submissions on ${day.date.toLocaleDateString()}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-[10px] text-gray-400 mt-3 pt-3 border-t border-white/5">
            <div>
              Total active days: <span className="text-white font-semibold">{days.filter(d => d.count > 0).length} days</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded-sm bg-[#1b1726]/40 border border-white/5" />
              <div className="w-2.5 h-2.5 rounded-sm bg-orange-500/20 border border-orange-500/30" />
              <div className="w-2.5 h-2.5 rounded-sm bg-orange-500/40 border border-orange-500/50" />
              <div className="w-2.5 h-2.5 rounded-sm bg-orange-500/70 border border-orange-500/80" />
              <div className="w-2.5 h-2.5 rounded-sm bg-orange-500" />
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const floatingDecorations = [
    { text: "</>", top: "12%", left: "10%" },
    { text: "const", top: "28%", left: "82%" },
    { text: "{}", top: "72%", left: "6%" },
    { text: "0101", top: "82%", left: "88%" },
    { text: "React", top: "58%", left: "85%" },
    { text: "SQL", top: "42%", left: "8%" }
  ];

  return (
    <div ref={sectionRef} className="relative w-full overflow-hidden bg-[#050505] text-white">
      {/* CINEMATIC LAYERED BACKGROUND */}
      <motion.div 
        style={{ y: backgroundY }} 
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Dynamic mesh gradients */}
        <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] rounded-full bg-[#915EFF]/10 blur-[130px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[10%] right-[-15%] w-[65%] h-[65%] rounded-full bg-[#00E5FF]/10 blur-[140px] animate-pulse" style={{ animationDuration: '12s' }} />
        
        {/* Particle and star backdrop */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-black to-black" />
        
        {/* Floating Code Decorations */}
        {floatingDecorations.map((item, idx) => (
          <motion.div
            key={idx}
            className="absolute text-[10px] md:text-xs font-mono font-bold text-[#915EFF]/20 select-none hidden md:block"
            style={{ top: item.top, left: item.left }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.1, 0.25, 0.1],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 6 + idx * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {item.text}
          </motion.div>
        ))}
      </motion.div>

      {/* 3D HERO SECTION CONTAINER */}
      <section className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-between px-6 lg:px-16 pt-24 overflow-hidden z-10">
        {/* Left Side: Name and details */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-left space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-mono text-[#00E5FF] tracking-widest uppercase mb-1">
              <LetterReveal text="Welcome to my space" delay={0.2} />
            </h3>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight flex flex-wrap">
              <LetterReveal text="Hi, I'm " delay={0.4} />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#915EFF] to-[#A855F7] ml-2">
                <LetterReveal text="Mohd Faiz" delay={0.6} />
              </span>
            </h1>

            <div className="text-xl lg:text-3xl font-semibold text-gray-300 h-12 flex items-center">
              <span className="mr-2">I am a</span>
              <span className="text-[#00E5FF] font-mono">
                <TypeAnimation
                  sequence={[
                    'Full Stack Developer',
                    1500,
                    'Java Developer',
                    1500,
                    'Backend Engineer',
                    1500,
                    'Software Engineer',
                    1500
                  ]}
                  wrapper="span"
                  speed={40}
                  repeat={Infinity}
                />
              </span>
            </div>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-gray-400 max-w-lg text-base leading-relaxed"
          >
            I craft immersive digital experiences by combining modern full-stack technologies with beautiful, interactive 3D interfaces. Let's explore my credentials below.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a
              href="https://drive.google.com/file/d/19O2fAV5MFPLvZ1R7oYarX96E1tKXRm_R/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#915EFF] to-[#A855F7] text-white font-bold hover:scale-105 transition-all shadow-[0_0_15px_rgba(145,94,255,0.4)] flex items-center gap-2"
            >
              <FaDownload className="animate-bounce" /> Download CV
            </a>
            <button
              onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 rounded-full border border-white/20 hover:border-[#00E5FF] text-white hover:text-[#00E5FF] font-bold transition-all hover:bg-white/5"
            >
              View Projects
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 rounded-full border border-[#915EFF]/50 text-white hover:bg-[#915EFF]/10 font-bold transition-all"
            >
              Contact Me
            </button>
          </motion.div>
        </div>

        {/* Right Side: Interactive 3D Canvas */}
        <motion.div 
          style={{ y: profileY }} 
          className="w-full md:w-1/2 h-[50vh] md:h-[80vh] relative mt-10 md:mt-0"
        >
          <Scene enableZoom={false} cameraPos={[0, 0, 4.5]}>
            <WorkspaceModel />
          </Scene>
        </motion.div>
      </section>

      {/* ABOUT ME & ANALYTICS SECTION */}
      <section
        id="about"
        className="relative w-full py-28 px-6 lg:px-16 bg-[#080312]/95 flex flex-col items-center justify-center overflow-hidden z-10"
      >
        <div className="max-w-6xl w-full space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-3">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#915EFF]/10 border border-[#915EFF]/30 text-xs text-gray-300 font-mono"
            >
              <FaSmile className="text-[#915EFF] animate-spin" style={{ animationDuration: '4s' }} /> Welcome to my digital workspace
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              <LetterReveal text="About Me" delay={0.1} />
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-1 bg-gradient-to-r from-[#915EFF] to-[#00E5FF] mx-auto rounded-full shadow-[0_0_8px_#00E5FF]" 
            />
          </div>

          {/* Profile Card & Info */}
          <div className="w-full">
            <div className="glass-card p-8 lg:p-12 relative overflow-hidden border border-white/5 rounded-3xl bg-[#0d071c]/65 backdrop-blur-xl shadow-2xl">
              {/* Futuristic scanning ray overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#915EFF]/5 to-transparent h-full w-full pointer-events-none animate-pulse" style={{ animationDuration: '3s' }} />
              
              <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                {/* Holographic Circular Scanner Frame for Profile Pic */}
                <div className="relative flex-shrink-0">
                  {/* Rotating Neon outer rings */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-14px] rounded-full border border-dashed border-[#915EFF]/40"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-8px] rounded-full border border-double border-t-[#00E5FF]/40 border-b-[#915EFF]/40 border-l-transparent border-r-transparent"
                  />

                  {/* Circular profile image container */}
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#915EFF]/60 shadow-[0_0_40px_rgba(145,94,255,0.4)] relative bg-[#0b0618]">
                    <img 
                      src={profileImage} 
                      alt="Mohd Faiz" 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {/* Glowing Energy Pulse Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#915EFF]/10 to-transparent pointer-events-none" />
                  </div>
                  
                  {/* Live Status indicator */}
                  <div className="absolute bottom-3 right-3 flex items-center justify-center">
                    <span className="absolute inline-flex h-6 w-6 rounded-full bg-green-400/30 animate-ping" />
                    <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-green-500 border-2 border-[#0d071c] shadow-[0_0_10px_#22c55e]" />
                  </div>
                </div>

                {/* About Bio */}
                <div className="flex-1 space-y-6 text-center md:text-left">
                  <div className="space-y-1">
                    <h3 className="text-3xl font-extrabold text-white">Mohd Faiz</h3>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm font-mono">
                      <FaMapMarkerAlt className="text-[#00E5FF] animate-bounce" />
                      <span>Kanpur, India • Available for Opportunities</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed text-base">
                    Results-driven <Keyword tooltipText="Node.js | Express | Rest APIs | Next.js | Spring Boot">Full Stack Developer</Keyword> with strong expertise in designing, developing, and deploying scalable web applications. Proficient in both frontend and backend technologies, with a solid foundation in <Keyword tooltipText="PostgreSQL | MySQL | Query Optimization | Indexes">SQL and database optimization</Keyword> for efficient data handling and performance tuning. Highly skilled in <Keyword tooltipText="React | Redux Toolkit | Tailwind CSS | Framer Motion">Frontend</Keyword> interfaces and <Keyword tooltipText="Rest APIs | Auth | Microservices | Security">Backend</Keyword> architecture.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#915EFF]/10 border border-[#915EFF]/30 text-xs text-white shadow-[0_0_10px_rgba(145,94,255,0.2)]">
                      <FaMedal className="text-yellow-400" /> Hackathon Winner 2025
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Glass Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden border border-white/5 rounded-2xl p-6 bg-[#0f0722]/50 hover:bg-[#0f0722]/80 backdrop-blur-md transition-all shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] hover:border-[#00E5FF]/40 hover:shadow-[0_8px_30px_rgba(0,229,255,0.15)] cursor-pointer"
              >
                {/* Neon light sweep */}
                <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${skill.color} p-2.5 flex items-center justify-center text-white text-xl shadow-lg transition-transform duration-500 group-hover:rotate-[360deg]`}>
                    {skill.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors">{skill.name}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{skill.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Badges Grid with Counting Animation */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 text-center border border-white/5 rounded-2xl bg-[#0f0722]/40 hover:border-[#915EFF]/40 hover:bg-[#0f0722]/60 backdrop-blur-md shadow-lg transition-all"
              >
                <div className="text-2xl text-[#915EFF] flex justify-center mb-2 animate-bounce" style={{ animationDuration: '3s' }}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-extrabold text-white tracking-tight">
                  <Counter to={stat.value} suffix={stat.suffix} delay={0.5} />
                </div>
                <div className="text-xs font-mono text-gray-400 mt-1 uppercase tracking-widest">{stat.label}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{stat.description}</div>
              </motion.div>
            ))}
          </div>

          {/* Dynamic Tab Switch Dashboard */}
          <div className="w-full">
            {/* Sliding Tab Controller */}
            <div className="flex justify-center gap-2 mb-8 p-1.5 bg-[#050505]/75 border border-white/10 rounded-full max-w-sm mx-auto relative overflow-hidden backdrop-blur-md">
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute top-1.5 bottom-1.5 rounded-full z-0"
                style={{
                  left: activeTab === 'leetcode' ? '6px' : 'calc(50% + 2px)',
                  right: activeTab === 'leetcode' ? 'calc(50% + 2px)' : '6px',
                  background: activeTab === 'leetcode' 
                    ? 'linear-gradient(to right, #f59e0b, #d97706)' 
                    : 'linear-gradient(to right, #00E5FF, #3b82f6)',
                  boxShadow: activeTab === 'leetcode' 
                    ? '0 0 15px rgba(245, 158, 11, 0.4)' 
                    : '0 0 15px rgba(0, 229, 255, 0.4)'
                }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
              <button
                onClick={() => setActiveTab('leetcode')}
                className={`flex-1 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 z-10 relative ${
                  activeTab === 'leetcode' ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                LeetCode
              </button>
              <button
                onClick={() => setActiveTab('github')}
                className={`flex-1 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 z-10 relative ${
                  activeTab === 'github' ? "text-black" : "text-gray-400 hover:text-white"
                }`}
              >
                GitHub
              </button>
            </div>

            {/* 3D Page Flip Book Container */}
            <div className="relative w-full min-h-[640px] md:min-h-[580px] lg:min-h-[520px]" style={{ perspective: "1800px" }}>
              <motion.div
                className="w-full h-full relative"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: activeTab === 'leetcode' ? 0 : -180 }}
                transition={{ type: "spring", stiffness: 90, damping: 20 }}
              >
                {/* FRONT PAGE: LeetCode */}
                <div 
                  className={`w-full h-full p-8 border border-white/10 rounded-3xl bg-[#0c061a]/85 backdrop-blur-xl shadow-2xl absolute inset-0 ${
                    activeTab === 'leetcode' ? 'pointer-events-auto z-10' : 'pointer-events-none z-0'
                  }`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="space-y-8">
                    <div className="flex items-center gap-3">
                      <SiLeetcode className="text-yellow-500 text-3xl animate-pulse" />
                      <div>
                        <h3 className="text-xl font-bold text-white">LeetCode Analytics</h3>
                        <p className="text-xs text-gray-400 font-mono">Live dynamic stats</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                      {/* Doughnut Chart */}
                      <div className="h-48 relative">
                        <Doughnut data={leetcodeDoughnutData} options={doughnutChartOptions} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
                          <span className="text-2xl font-extrabold text-white">{leetcodeStats.totalSolved}</span>
                          <span className="text-[10px] text-gray-400 uppercase tracking-widest">Solved</span>
                        </div>
                      </div>
                      
                      {/* Category Badges */}
                      <div className="grid grid-cols-3 md:grid-cols-1 gap-4 text-center md:text-left">
                        <div className="p-3.5 bg-green-500/10 rounded-xl border border-green-500/20 hover:bg-green-500/15 transition-all">
                          <div className="text-green-400 font-extrabold text-lg">{leetcodeStats.easySolved}</div>
                          <div className="text-[10px] text-gray-400 font-mono uppercase">Easy Solved</div>
                        </div>
                        <div className="p-3.5 bg-yellow-500/10 rounded-xl border border-yellow-500/20 hover:bg-yellow-500/15 transition-all">
                          <div className="text-yellow-400 font-extrabold text-lg">{leetcodeStats.mediumSolved}</div>
                          <div className="text-[10px] text-gray-400 font-mono uppercase">Medium Solved</div>
                        </div>
                        <div className="p-3.5 bg-red-500/10 rounded-xl border border-red-500/20 hover:bg-red-500/15 transition-all">
                          <div className="text-red-400 font-extrabold text-lg">{leetcodeStats.hardSolved}</div>
                          <div className="text-[10px] text-gray-400 font-mono uppercase">Hard Solved</div>
                        </div>
                      </div>

                      {/* Acceptance and Ranking info */}
                      <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">Global Rank</span>
                          <span className="text-[#00E5FF] font-extrabold font-mono">#{leetcodeStats.ranking.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">Acceptance Rate</span>
                          <span className="text-orange-500 font-extrabold font-mono">{leetcodeStats.acceptance}%</span>
                        </div>
                        <div className="text-[10px] text-gray-500 leading-relaxed font-mono">
                          Stats updated dynamically from public LeetCode endpoint. Keep on coding!
                        </div>
                      </div>
                    </div>

                    {/* Custom submission calendar heatmap */}
                    {renderLeetcodeGrid()}

                    {/* Monthly Submissions Line Chart */}
                    {leetcodeStats.monthlySubmissions.data.length > 0 && (
                      <div className="border-t border-white/5 pt-6">
                        <h4 className="text-xs font-mono text-yellow-500 uppercase tracking-widest mb-4">Submission Trend (Monthly)</h4>
                        <div className="h-44 w-full">
                          <Line data={leetcodeLineData} options={lineChartOptions} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* BACK PAGE: GitHub */}
                <div 
                  className={`w-full h-full p-8 border border-white/10 rounded-3xl bg-[#0c061a]/85 backdrop-blur-xl shadow-2xl absolute inset-0 ${
                    activeTab === 'github' ? 'pointer-events-auto z-10' : 'pointer-events-none z-0'
                  }`}
                  style={{ 
                    backfaceVisibility: "hidden", 
                    transform: "rotateY(180deg)" 
                  }}
                >
                  <div className="space-y-8">
                    <div className="flex items-center gap-3">
                      <FaGithub className="text-[#00E5FF] text-3xl animate-pulse" />
                      <div>
                        <h3 className="text-xl font-bold text-white">GitHub Analytics</h3>
                        <p className="text-xs text-gray-400 font-mono">Live repository stats & contributions</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Language Usage Bar Chart */}
                      <div className="glass-card p-5 border border-white/5 bg-[#050505]/45 rounded-2xl">
                        <h4 className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">Top Languages</h4>
                        <div className="h-44">
                          <Bar 
                            data={languagesData} 
                            options={{
                              ...lineChartOptions,
                              indexAxis: 'y',
                            }} 
                          />
                        </div>
                      </div>

                      {/* Repos, Commits, Followers stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 bg-[#915EFF]/5 rounded-2xl border border-[#915EFF]/15 flex flex-col justify-center">
                          <span className="text-3xl font-extrabold text-white font-mono">{githubStats.publicRepos}</span>
                          <div className="text-xs text-gray-400 font-mono mt-1 uppercase">Repositories</div>
                        </div>
                        <div className="p-5 bg-[#00E5FF]/5 rounded-2xl border border-[#00E5FF]/15 flex flex-col justify-center">
                          <span className="text-3xl font-extrabold text-white font-mono">{githubStats.totalCommits}</span>
                          <div className="text-xs text-gray-400 font-mono mt-1 uppercase">Est. Commits</div>
                        </div>
                        <div className="p-5 bg-white/5 rounded-2xl border border-white/10 flex flex-col justify-center">
                          <span className="text-2xl font-extrabold text-white font-mono">{githubStats.followers}</span>
                          <div className="text-xs text-gray-400 font-mono mt-1 uppercase">Followers</div>
                        </div>
                        <div className="p-5 bg-white/5 rounded-2xl border border-white/10 flex flex-col justify-center">
                          <span className="text-2xl font-extrabold text-white font-mono">{githubStats.following}</span>
                          <div className="text-xs text-gray-400 font-mono mt-1 uppercase">Following</div>
                        </div>
                      </div>
                    </div>

                    {/* Visual Contribution Calendar */}
                    <div className="border-t border-white/5 pt-6">
                      <h4 className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest mb-4">Contribution Calendar</h4>
                      <div className="w-full flex justify-center">
                        <img 
                          src="https://ghchart.rshah.org/915eff/Faiz123760" 
                          alt="GitHub Contributions" 
                          className="w-full max-w-4xl rounded-xl border border-white/5 p-4 bg-[#050505]/45 hover:border-[#915eff]/30 transition-all duration-300 select-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;