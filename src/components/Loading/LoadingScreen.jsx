import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onFinished }) => {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const logMessages = [
    "Initializing portfolio environment...",
    "Configuring dark matter engine...",
    "Connecting to Vercel and GitHub APIs...",
    "Mounting React Fiber Three.js renderer...",
    "Loading 3D workspace assets...",
    "Calculating technological galaxy coordinates...",
    "Ready. Rendering portfolio. Welcome, Mohd Faiz."
  ];

  useEffect(() => {
    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < logMessages.length) {
        setLogs((prev) => [...prev, logMessages[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 450);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => {
              onFinished();
            }, 550);
          }, 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 150);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onFinished]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 bg-[#050505] z-[9999] flex flex-col items-center justify-center font-mono p-6 select-none"
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Laptop 3D Outline Animation */}
          <div className="mb-8 relative flex flex-col items-center">
            <motion.div
              initial={{ rotateX: 90, scale: 0.8 }}
              animate={{ rotateX: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-32 h-20 border-2 border-[#915EFF] rounded-t-md flex items-center justify-center bg-[#0b0618]/60 relative shadow-[0_0_25px_rgba(145,94,255,0.4)]"
            >
              <div className="text-xs text-[#00E5FF] animate-pulse">3D RUNNING</div>
              {/* Screen shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-t-md" />
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "160px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-2 bg-[#6d28d9] rounded-b-md relative shadow-[0_4px_10px_rgba(0,229,255,0.2)]"
            >
              {/* Laptop Notch */}
              <div className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#915EFF]" />
            </motion.div>
          </div>

          <div className="w-full max-w-lg bg-[#0b0618]/90 border border-[#915EFF]/30 rounded-lg p-5 shadow-[0_0_50px_rgba(11,6,24,0.8)]">
            {/* Terminal Header */}
            <div className="flex items-center space-x-2 border-b border-[#915EFF]/20 pb-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs text-gray-500 ml-2">system_terminal_v1.0.4</span>
            </div>

            {/* Terminal Output */}
            <div className="h-44 overflow-y-auto space-y-1.5 text-xs text-left mb-6 scrollbar-none">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={i === logMessages.length - 1 ? "text-[#00E5FF] font-bold" : "text-gray-300"}
                >
                  <span className="text-[#915EFF]">&gt; </span>
                  {log}
                </motion.div>
              ))}
            </div>

            {/* Progress Bar Container */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400">
                <span>SYSTEM BOOTING</span>
                <span>{Math.min(100, progress)}%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-900 rounded-full overflow-hidden border border-[#915EFF]/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#915EFF] to-[#00E5FF]"
                  style={{ width: `${Math.min(100, progress)}%` }}
                  layout
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
