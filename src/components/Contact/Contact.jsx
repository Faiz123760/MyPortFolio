import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Scene from "../three/Scene";
import PaperPlaneModel from "../three/PaperPlaneModel";
import { Mail, User, MessageSquare, Send, Sparkles, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Zod Form Schema Validation
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Contact = () => {
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setIsSending(true);
    setIsSuccess(false);

    try {
      const backendBaseUrl = import.meta.env.PROD 
        ? "https://myportfolio-backend-kw19.onrender.com" 
        : "";
      const response = await fetch(`${backendBaseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to dispatch email.");
      }

      setIsSuccess(true);
      reset();
      toast.success("Connection secure. Message transmitted!", {
        theme: "dark",
        position: "top-right",
      });

      // Reset plane launch state after animation finishes
      setTimeout(() => {
        setIsSuccess(false);
      }, 4000);

    } catch (error) {
      console.error("SMTP contact error:", error);
      toast.error(error.message || "Failed to establish connection. Retry.", {
        theme: "dark",
        position: "top-right",
      });
    } finally {
      setIsSending(false);
    }
  };

  const socialLinks = [
    { icon: <Mail className="w-5 h-5 text-[#00E5FF]" />, label: "Email", value: "faiz47532@gmail.com", href: "mailto:faiz47532@gmail.com" },
    { icon: <Phone className="w-5 h-5 text-orange-500" />, label: "Phone", value: "+91-8795412711", href: "tel:+918795412711" },
    { icon: <MapPin className="w-5 h-5 text-[#915EFF]" />, label: "Location", value: "Kanpur, India", href: "#" },
    { icon: <Linkedin className="w-5 h-5 text-[#00E5FF]" />, label: "LinkedIn", value: "Mohd Faiz", href: "https://www.linkedin.com/in/mohd-faiz-0493bb2a7/" },
    { icon: <Github className="w-5 h-5 text-white" />, label: "GitHub", value: "Faiz123760", href: "https://github.com/Faiz123760" },
  ];

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen py-24 px-6 lg:px-16 bg-[#050505] flex items-center overflow-hidden"
    >
      {/* Cybersecurity foggy grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(124,58,237,0.05),transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full z-10 space-y-16">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#915EFF]/10 border border-[#915EFF]/30 text-sm text-gray-300 font-mono">
            <Sparkles size={16} className="text-[#915EFF] animate-pulse" /> Connection Portal
          </div>
          <h2 className="section-title mt-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#00E5FF] font-mono tracking-tight">
            CONTACT ME
          </h2>
          <p className="text-xs lg:text-sm text-gray-400 max-w-md mx-auto mt-3 font-sans">
            Let's build something amazing together.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#915EFF] to-[#00E5FF] mx-auto mt-4 rounded-full shadow-[0_0_8px_rgba(0,229,255,0.3)]" />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Column: 3D Flight Scene */}
          <div className="w-full min-h-[300px] lg:min-h-[450px] relative border border-white/5 rounded-3xl bg-[#0b0618]/25 backdrop-blur-sm overflow-hidden flex items-center justify-center shadow-[inset_0_0_30px_rgba(145,94,255,0.05)]">
            <Scene enableZoom={false} cameraPos={[0, 0, 2.5]}>
              <PaperPlaneModel isSending={isSending} isSuccess={isSuccess} />
            </Scene>
            
            <div className="absolute bottom-4 left-6 text-[9px] text-gray-500 font-mono uppercase tracking-widest pointer-events-none z-10">
              Interactive 3D Comms Hub • Drag to orbit
            </div>

            {/* Holographic MESSAGE SENT overlay */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#050505]/70 backdrop-blur-sm flex flex-col items-center justify-center z-20"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-orange-500/50 flex items-center justify-center animate-spin-slow mb-4 shadow-[0_0_20px_rgba(255,87,34,0.3)]">
                    <Send className="w-6 h-6 text-[#00E5FF]" />
                  </div>
                  <span className="text-sm font-bold font-mono tracking-widest text-[#00E5FF] uppercase animate-pulse">
                    MESSAGE DISPATCHED
                  </span>
                  <span className="text-[10px] text-gray-400 mt-2 font-mono">
                    Return coordinates established.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Premium Contact Form */}
          <div className="flex flex-col justify-between space-y-8">
            <div className="glass-card p-8 border border-white/5 bg-[#0b0618]/30 backdrop-blur-md rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] relative overflow-hidden">
              <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2 font-mono tracking-tight">
                <Mail className="text-[#00E5FF]" /> TRANSMIT MESSAGE
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    {...register("name")}
                    placeholder=" "
                    className={`block py-3 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-[#00E5FF] peer transition-colors ${
                      errors.name ? "border-red-500" : ""
                    }`}
                  />
                  <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#00E5FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex items-center gap-2">
                    <User size={14} /> Name
                  </label>
                  {errors.name && (
                    <span className="text-[10px] text-red-400 font-mono mt-1 block">{errors.name.message}</span>
                  )}
                </div>

                {/* Email */}
                <div className="relative z-0 w-full group">
                  <input
                    type="email"
                    {...register("email")}
                    placeholder=" "
                    className={`block py-3 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-[#00E5FF] peer transition-colors ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#00E5FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex items-center gap-2">
                    <Mail size={14} /> Email Address
                  </label>
                  {errors.email && (
                    <span className="text-[10px] text-red-400 font-mono mt-1 block">{errors.email.message}</span>
                  )}
                </div>

                {/* Subject */}
                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    {...register("subject")}
                    placeholder=" "
                    className={`block py-3 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-[#00E5FF] peer transition-colors ${
                      errors.subject ? "border-red-500" : ""
                    }`}
                  />
                  <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#00E5FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex items-center gap-2">
                    <MessageSquare size={14} /> Subject
                  </label>
                  {errors.subject && (
                    <span className="text-[10px] text-red-400 font-mono mt-1 block">{errors.subject.message}</span>
                  )}
                </div>

                {/* Message */}
                <div className="relative z-0 w-full group">
                  <textarea
                    {...register("message")}
                    rows="3"
                    placeholder=" "
                    className={`block py-3 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-[#00E5FF] peer transition-colors resize-none ${
                      errors.message ? "border-red-500" : ""
                    }`}
                  />
                  <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#00E5FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Write Message details...
                  </label>
                  {errors.message && (
                    <span className="text-[10px] text-red-400 font-mono mt-1 block">{errors.message.message}</span>
                  )}
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3.5 bg-gradient-to-r from-[#915EFF] to-[#A855F7] hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(145,94,255,0.4)] transition-all text-white font-bold font-mono rounded-xl shadow-[0_0_15px_rgba(145,94,255,0.25)] flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  <Send size={15} /> {isSending ? "ENCRYPTING & SENDING..." : "DISPATCH SYSTEM"}
                </button>
              </form>
            </div>

            {/* Social Grid cards below form */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-[#0b0618]/25 border border-white/5 hover:border-orange-500/30 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all hover:-translate-y-1 hover:bg-[#0b0618]/50 shadow-[0_4px_10px_rgba(0,0,0,0.2)] group"
                >
                  <div className="p-2 bg-white/[0.03] group-hover:bg-[#FF5722]/10 rounded-xl transition-colors">
                    {link.icon}
                  </div>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-gray-500 group-hover:text-gray-300">
                    {link.label}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono truncate max-w-full">
                    {link.value}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Contact;