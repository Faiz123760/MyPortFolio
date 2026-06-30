import React, { useEffect, useRef } from "react";

// Runs a single RAF loop — no React state re-renders at all.
// Cursor dot/ring are moved via direct style.transform (no setState).
// Particles are drawn on a canvas — zero DOM elements spawned/destroyed.
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);
  const stateRef = useRef({
    mouse: { x: -200, y: -200 },
    ring: { x: -200, y: -200 },
    particles: [],
    lastFrame: 0,
    isHovered: false,
    isMobile: false,
    rafId: null,
  });

  useEffect(() => {
    const s = stateRef.current;

    // --- Device check ---
    s.isMobile =
      window.matchMedia("(max-width: 768px)").matches ||
      !window.matchMedia("(hover: hover)").matches;
    if (s.isMobile) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // --- Throttled mousemove (max 60fps = ~16ms between updates) ---
    let lastMoveTime = 0;
    const handleMouseMove = (e) => {
      const now = performance.now();
      if (now - lastMoveTime < 14) return; // ~72fps cap
      lastMoveTime = now;

      s.mouse.x = e.clientX;
      s.mouse.y = e.clientY;

      // Spawn particle (35% chance, but cheap — just push to array)
      if (Math.random() < 0.35) {
        s.particles.push({
          x: e.clientX,
          y: e.clientY,
          life: 1.0, // 1.0 → 0.0 over time
          size: Math.random() * 3 + 1,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
        });
        // Cap particles to prevent unbounded growth
        if (s.particles.length > 40) s.particles.shift();
      }
    };

    const handleMouseOver = (e) => {
      s.isHovered =
        e.target.tagName === "A" ||
        e.target.tagName === "BUTTON" ||
        !!e.target.closest("button") ||
        !!e.target.closest("a") ||
        e.target.classList.contains("interactive");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    // --- Single unified RAF loop ---
    const loop = (timestamp) => {
      s.rafId = requestAnimationFrame(loop);

      // Skip frames > 120fps to avoid doing too much work
      if (timestamp - s.lastFrame < 8) return;
      s.lastFrame = timestamp;

      // 1. Move dot instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${s.mouse.x - 4}px, ${
          s.mouse.y - 4
        }px)`;
      }

      // 2. Lerp ring toward mouse
      s.ring.x += (s.mouse.x - s.ring.x) * 0.14;
      s.ring.y += (s.mouse.y - s.ring.y) * 0.14;
      if (ringRef.current) {
        const size = s.isHovered ? 36 : 24;
        ringRef.current.style.transform = `translate(${s.ring.x - size / 2}px, ${
          s.ring.y - size / 2
        }px)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
      }

      // 3. Draw particles on canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      s.particles = s.particles.filter((p) => p.life > 0.01);
      for (const p of s.particles) {
        p.life -= 0.04;
        p.x += p.vx;
        p.y += p.vy;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(145, 94, 255, ${p.life * 0.6})`;
        ctx.fill();
      }
    };

    s.rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(s.rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Don't render on mobile
  if (
    typeof window !== "undefined" &&
    (window.innerWidth <= 768 || !window.matchMedia("(hover: hover)").matches)
  ) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999]">
      {/* Canvas for particle trail — zero React re-renders */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Inner dot — position set via ref, not state */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-white z-10"
        style={{ willChange: "transform" }}
      />

      {/* Outer ring — position + size set via ref */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 rounded-full border border-[#915EFF] z-10 transition-[width,height] duration-150"
        style={{ willChange: "transform", width: 24, height: 24 }}
      />
    </div>
  );
};

export default CustomCursor;
