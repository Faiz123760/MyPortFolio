import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import Lenis from "lenis";
// Eager (needed immediately)
import Navbar from "./components/Navbar/Navbar.jsx";
import LoadingScreen from "./components/Loading/LoadingScreen.jsx";
import CustomCursor from "./components/Cursor/CustomCursor.jsx";
// Lazy-loaded (deferred until first render)
const About = lazy(() => import("./components/About/About.jsx"));
const Skills = lazy(() => import("./components/Skills/Skills.jsx"));
const Experience = lazy(() => import("./components/Experience/Experience.jsx"));
const Work = lazy(() => import("./components/Work/Work.jsx"));
const Education = lazy(() => import("./components/Education/Education.jsx"));
const Contact = lazy(() => import("./components/Contact/Contact.jsx"));
const Footer = lazy(() => import("./components/Footer/Footer.jsx"));

// Lightweight, high-performance Canvas Stars Background
const StarsBackground = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Generate stars — reduced to 60 for performance
    const stars = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5,
      speed: Math.random() * 0.05 + 0.02,
      opacity: Math.random()
    }));
    let frameCount = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      frameCount++;
      // Skip every other frame — stars move slowly, 30fps is fine
      if (frameCount % 2 !== 0) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
        ctx.fillStyle = `rgba(255,255,255,${Math.sin(star.opacity) * 0.5 + 0.5})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.opacity += 0.01;
      }
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none" />;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, [isLoading]);

  return (
    <>
      <CustomCursor />
      
      {isLoading ? (
        <LoadingScreen onFinished={() => setIsLoading(false)} />
      ) : (
        <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden">
          {/* Background particles */}
          <StarsBackground />

          {/* Futuristic ambient light blobs — reduced blur for GPU savings */}
          <div className="fixed top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-[#915EFF]/8 blur-[80px] pointer-events-none z-0" style={{ contain: "paint" }} />
          <div className="fixed bottom-[10%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-[#00E5FF]/4 blur-[80px] pointer-events-none z-0" style={{ contain: "paint" }} />

          {/* App sections wrapped with layout z-index */}
          <div className="relative z-10 w-full">
            <Navbar />
            <Suspense fallback={null}>
              <About />
              <Education />
              <Skills />
              <Experience />
              <Work />
              <Contact />
              <Footer />
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
};

export default App;