import React, { useEffect, useRef , useState} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import { projects } from "../../constants";
import { ExternalLink, Github, FolderKanban } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Project metadata details mapping
const projectMetadata = {
  0: { role: "Lead Full Stack Developer", duration: "3 Months", status: "Production Ready", features: ["Dual Payment Gateways", "Admin dashboard control", "Responsive layout"] },
  1: { role: "MERN Stack Engineer", duration: "2 Months", status: "Live", features: ["Real-time messaging", "JWT Auth & Session handling", "Cloudinary integration"] },
  2: { role: "Frontend UI Developer", duration: "1 Month", status: "Completed", features: ["Online Appointment Booking", "Responsive doctors catalog", "Schedule management"] },
  4: { role: "Full Stack Engineer", duration: "2 Months", status: "Live", features: ["Shareable snippets links", "Syntax highlighted input", "Snippet version control"] },
  6: { role: "React Developer", duration: "1 Month", status: "Completed", features: ["Image search API", "Instant downloads engine", "Query filtering filters"] },
  7: { role: "React Developer", duration: "1 Month", status: "Completed", features: ["Background removal API", "Download transparent image", "Canvas render canvas"] },
};

// Reusable Subcomponent: Project Info Detail Block
const ProjectInfo = React.memo(({ project, index, totalProjects, meta }) => {
  return (
    <div className="w-full md:w-5/12 flex flex-col justify-between space-y-4 text-white z-10">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#00E5FF]">
            Project {index + 1} of {totalProjects}
          </span>
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{meta.duration}</span>
        </div>

        <h3 className="text-2xl font-bold font-mono tracking-tight text-white group-hover:text-orange-400 transition-colors">
          {project.title}
        </h3>

        <span className="inline-block text-[11px] font-mono text-[#915EFF] font-bold uppercase tracking-wider">
          {meta.role}
        </span>

        <p className="text-xs text-gray-300 leading-relaxed line-clamp-3 font-sans">
          {project.description}
        </p>
      </div>

      {/* Key Features */}
      <div className="space-y-1.5">
        <span className="text-[9px] uppercase font-mono tracking-widest text-gray-500">Key Features</span>
        <ul className="text-[10px] font-mono text-gray-400 space-y-1">
          {meta.features.map((feature, fIdx) => (
            <li key={fIdx} className="flex items-center gap-1.5">
              <span className="text-[#00E5FF]">✦</span> {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="space-y-1.5">
        <span className="text-[9px] uppercase font-mono tracking-widest text-gray-500">Tech Stack</span>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((tag, idx) => (
            <span
              key={idx}
              className="text-[9px] bg-white/[0.03] text-gray-300 px-2 py-1 rounded-md border border-white/5 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

// Reusable Subcomponent: Project Visual Showcase & CTAs
const ProjectImage = React.memo(({ project, meta }) => {
  return (
    <div className="w-full md:w-7/12 flex flex-col justify-between gap-4 z-10">
      <div className="relative flex-1 rounded-2xl overflow-hidden border border-white/5 group/img min-h-[200px] md:min-h-0">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0618]/90 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Active status indicator */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#050505]/85 border border-[#00E5FF]/30 text-[9px] font-bold font-mono tracking-widest text-[#00E5FF] uppercase shadow-[0_0_10px_rgba(0,229,255,0.15)] animate-pulse">
          {meta.status}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-1 py-3 bg-white/5 border border-white/10 text-xs text-white rounded-xl font-bold font-mono flex items-center justify-center gap-1.5 hover:bg-white/10 hover:border-[#915EFF]/50 transition-all hover:-translate-y-0.5"
        >
          <Github size={14} /> Repository
        </a>
        <a
          href={project.webapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-1 py-3 bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-xs text-[#00E5FF] rounded-xl font-bold font-mono flex items-center justify-center gap-1.5 hover:bg-[#00E5FF]/20 hover:border-[#00E5FF]/50 transition-all hover:-translate-y-0.5 shadow-[0_0_15px_rgba(0,229,255,0.05)]"
        >
          <ExternalLink size={14} /> Live Demo
        </a>
      </div>
    </div>
  );
});

// Reusable Subcomponent: Interactive Project Card Wrapper
const ProjectCard = React.forwardRef(({ project, index, totalProjects }, ref) => {
  const innerRef = useRef(null);

  // Mouse 3D hover tilt dynamics (Framer Motion does not cause parent React re-renders)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { damping: 25, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { damping: 25, stiffness: 200 });

  const handleMouseMove = (e) => {
    if (!innerRef.current) return;
    const rect = innerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const meta = projectMetadata[project.id] || { role: "Software Developer", duration: "Ongoing", status: "Live", features: ["Scalable architecture"] };

  // Combine standard ref with GSAP target ref
  const setRefs = (node) => {
    innerRef.current = node;
    if (ref) {
      if (typeof ref === "function") ref(node);
      else ref.current = node;
    }
  };

  return (
    <motion.div
      ref={setRefs}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        willChange: "transform, opacity, filter",
        zIndex: totalProjects - index,
      }}
      className="project-card absolute w-[90vw] max-w-[1400px] h-[80vh] bg-[#0b0618]/85 border border-white/5 hover:border-orange-500/35 rounded-[28px] p-6 lg:p-8 flex flex-col md:flex-row gap-8 shadow-[0_30px_60px_rgba(0,0,0,0.85)] backdrop-blur-3xl transition-shadow duration-300 group overflow-hidden cursor-pointer"
    >
      {/* Glow corner accents */}
      <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#915EFF]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#915EFF]/15 transition-all" />
      <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#00E5FF]/15 transition-all" />

      <ProjectInfo project={project} index={index} totalProjects={totalProjects} meta={meta} />
      <ProjectImage project={project} meta={meta} />
    </motion.div>
  );
});

// Reusable Subcomponent: Project Stack Deck Scene
const ProjectStack = ({ cardRefs }) => {
  return (
    <div className="relative w-[90vw] max-w-[1400px] mx-auto h-[80vh] flex items-center justify-center overflow-visible">
      {projects.map((project, idx) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={idx}
          totalProjects={projects.length}
          ref={(el) => (cardRefs.current[idx] = el)}
        />
      ))}
    </div>
  );
};

const Work = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const hudProgressRef = useRef(null);

  useEffect(() => {
    // Detect mobile viewports to disable GSAP ScrollTrigger completely
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return;

    // 1. Initial Stack State
    gsap.set(cards, (i) => {
      const scale = Math.max(0.88, 1 - i * 0.03);
      const y = i * 30;
      const opacity = Math.max(0.7, 1 - i * 0.1);
      const blur = `blur(${i}px)`;
      return { scale, y, opacity, filter: blur };
    });

    // 2. Master GSAP ScrollTrigger Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${(projects.length - 1) * 100}%`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        snap: {
          snapTo: "labels",
          duration: { min: 0.2, max: 0.5 },
          delay: 0.1,
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          // Dynamic HUD page counter update directly on DOM to prevent React re-renders
          if (hudProgressRef.current) {
            const calculatedIndex = Math.min(
              Math.floor(self.progress * (projects.length - 1)),
              projects.length - 1
            );
            hudProgressRef.current.innerText = String(calculatedIndex + 1).padStart(2, "0");
          }
        },
      },
    });

    // 3. Staggered card shifts transitions
    for (let i = 0; i < cards.length - 1; i++) {
      const label = `card${i + 1}`;
      tl.addLabel(label);

      // Animate active card up and out of the viewport
      tl.to(
        cards[i],
        {
          y: "-110vh",
          scale: 1.05,
          opacity: 0,
          rotate: -2,
          filter: "blur(4px)",
          ease: "none",
        },
        label
      );

      // Shift subsequent cards forward in the stack
      for (let j = i + 1; j < cards.length; j++) {
        const slotIdx = j - (i + 1);
        const nextScale = Math.max(0.88, 1 - slotIdx * 0.03);
        const nextY = slotIdx * 30;
        const nextOpacity = Math.max(0.7, 1 - slotIdx * 0.1);
        const nextBlur = `blur(${slotIdx}px)`;

        tl.to(
          cards[j],
          {
            scale: nextScale,
            y: nextY,
            opacity: nextOpacity,
            filter: nextBlur,
            ease: "none",
          },
          label
        );
      }
    }
    // Add final label for snapping the last card
    tl.addLabel(`card${cards.length}`);

    // 4. Synchronize ScrollTrigger with Lenis ticker
    const syncScroll = () => {
      ScrollTrigger.update();
    };
    gsap.ticker.add(syncScroll);

    return () => {
      // Cleanup GSAP listeners and timelines
      gsap.ticker.remove(syncScroll);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Check viewport width for layout swap
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobileLayout(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative w-full bg-[#050505] overflow-visible"
      style={{
        minHeight: "100vh",
      }}
    >
      {/* Immersive background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(145,94,255,0.03),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,229,255,0.02),transparent_50%)] pointer-events-none" />

      {isMobileLayout ? (
        // Mobile Layout: Swipeable Horizontal Carousel
        <div className="py-24 px-6 space-y-12">
          {/* Header */}
          <div className="text-center relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#915EFF]/10 border border-[#915EFF]/30 text-xs text-gray-300 font-mono">
              <FolderKanban size={14} className="text-[#915EFF]" /> My Portfolio
            </div>
            <h2 className="text-2xl font-bold font-mono tracking-tight text-white mt-4">
              Featured Work
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#915EFF] to-[#00E5FF] mx-auto mt-3 rounded-full" />
          </div>

          {/* Horizontal scroll container */}
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-thin">
            {projects.map((project, idx) => {
              const meta = projectMetadata[project.id] || { role: "Developer", duration: "Ongoing", status: "Live" };
              return (
                <div
                  key={project.id}
                  className="w-[85vw] shrink-0 snap-center bg-[#0b0618]/90 border border-white/5 rounded-2xl p-5 space-y-4"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover rounded-xl border border-white/5"
                  />
                  <h3 className="text-lg font-bold text-white font-mono">{project.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-3 font-sans leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex gap-2.5">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 bg-white/5 border border-white/10 text-[10px] text-white rounded-lg font-bold font-mono flex items-center justify-center gap-1"
                    >
                      Repository
                    </a>
                    <a
                      href={project.webapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[10px] text-[#00E5FF] rounded-lg font-bold font-mono flex items-center justify-center gap-1"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // Desktop Layout: GSAP-Pinned Stack
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden z-10 px-6 lg:px-16">
          {/* Header inside Sticky Container */}
          <div className="text-center mb-8 relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#915EFF]/10 border border-[#915EFF]/30 text-sm text-gray-300 font-mono">
              <FolderKanban size={16} className="text-[#915EFF]" /> My Portfolio
            </div>
            <h2 className="section-title mt-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#00E5FF] font-mono tracking-tight shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#915EFF] to-[#00E5FF] mx-auto mt-4 rounded-full shadow-[0_0_8px_rgba(0,229,255,0.3)]" />
          </div>

          {/* Absolute Stack Container */}
          <ProjectStack cardRefs={cardRefs} />

          {/* Scroll Progress HUD */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 text-xs font-mono text-gray-500 z-20">
            <span>PROJECT</span>
            <span ref={hudProgressRef} className="text-[#00E5FF] font-bold">
              01
            </span>
            <span>/</span>
            <span>{String(projects.length).padStart(2, "0")}</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Work;