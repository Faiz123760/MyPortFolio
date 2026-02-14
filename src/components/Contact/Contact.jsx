import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  Mail, 
  User, 
  MessageSquare, 
  Send, 
  Sparkles,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Globe,
  ArrowRight,
  Loader2
} from "lucide-react";
import Tilt from 'react-parallax-tilt';

const Contact = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        "service_qme3bm4",  // Replace with your EmailJS Service ID
        "template_umjq77n",  // Replace with your EmailJS Template ID
        form.current,
        "6hieIdj53rZ7OWBgM"  // Replace with your EmailJS Public Key
      )
      .then(
        () => {
          form.current.reset();
          toast.success(
            <div className="flex items-center gap-3">
              <CheckCircle className="w-20 h-20 text-green-400" />
              <div>
                <p className="font-semibold">Message sent successfully!</p>
                <p className="text-xs opacity-90">I'll get back to you soon.</p>
              </div>
            </div>,
            {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
              icon: false,
            }
          );
        },
        (error) => {
          console.error("Error sending message:", error);
          toast.error(
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 text-red-400">!</div>
              <div>
                <p className="font-semibold">Failed to send message</p>
                <p className="text-xs opacity-90">Please try again later.</p>
              </div>
            </div>,
            {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
              icon: false,
            }
          );
        }
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  const contactInfo = [
    { icon: <Mail size={18} />, label: 'Email', value: 'faiz47532@gmail.com', link: 'mailto:faiz47532@gmail.com' },
    { icon: <Phone size={18} />, label: 'Phone', value: '+91 8795412711', link: 'tel:+918795412711' },
    { icon: <MapPin size={18} />, label: 'Location', value: 'India', link: null },
    { icon: <Globe size={18} />, label: 'Working Hours', value: 'Mon-Fri, 9AM-6PM IST', link: null }
  ];

  return (
    <section
      id="contact"
      className="section-alternate relative py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 font-poppins min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600 rounded-full opacity-5 blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-6 py-2 rounded-full border border-purple-500/30 mb-4">
            <Sparkles className="text-purple-400" size={18} />
            <span className="text-sm font-medium text-gray-300">Get In Touch</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mt-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Contact Me
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
          
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
            I'd love to hear from you—reach out for any opportunities or questions!
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Contact Info Cards */}
          <div className="space-y-6">
            <Tilt
              tiltMaxAngleX={3}
              tiltMaxAngleY={3}
              perspective={1000}
              scale={1.02}
              transitionSpeed={1500}
              className="w-full"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Clock className="text-purple-400" />
                  Quick Contact Info
                </h3>
                
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="group">
                      {item.link ? (
                        <a
                          href={item.link}
                          className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-xl border border-white/5 hover:border-purple-500/50 transition-all duration-300 hover:bg-gray-700/50"
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-300">
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-gray-400">{item.label}</p>
                            <p className="text-sm text-white group-hover:text-purple-400 transition-colors duration-300">
                              {item.value}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300" />
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-xl border border-white/5">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center text-purple-400">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">{item.label}</p>
                            <p className="text-sm text-white">{item.value}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Tilt>

            {/* Availability Badge */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-white">Available for opportunities</span> — Let's talk!
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <Tilt
            tiltMaxAngleX={3}
            tiltMaxAngleY={3}
            perspective={1000}
            scale={1.02}
            transitionSpeed={1500}
            className="w-full"
          >
            <div className="relative group">
              {/* Border Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
              
              {/* Form Container */}
              <div className="relative bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <MessageSquare className="text-purple-400" />
                  Send a Message
                </h3>

                <form ref={form} onSubmit={sendEmail} className="space-y-5">
                  {/* Name Input */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      name="user_name"
                      placeholder="Your Name"
                      required
                      className="w-full pl-12 pr-4 py-3 bg-gray-700/50 rounded-xl text-white placeholder-gray-400 border border-white/10 focus:border-purple-500 focus:outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      name="user_email"
                      placeholder="Your Email"
                      required
                      className="w-full pl-12 pr-4 py-3 bg-gray-700/50 rounded-xl text-white placeholder-gray-400 border border-white/10 focus:border-purple-500 focus:outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Subject Input */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <MessageSquare size={18} />
                    </div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      required
                      className="w-full pl-12 pr-4 py-3 bg-gray-700/50 rounded-xl text-white placeholder-gray-400 border border-white/10 focus:border-purple-500 focus:outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="relative">
                    <div className="absolute left-4 top-4 text-gray-400">
                      <MessageSquare size={18} />
                    </div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows="5"
                      required
                      className="w-full pl-12 pr-4 py-3 bg-gray-700/50 rounded-xl text-white placeholder-gray-400 border border-white/10 focus:border-purple-500 focus:outline-none transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full relative overflow-hidden group/btn"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold">
                      {isSending ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                          <span>Send Message</span>
                        </>
                      )}
                    </div>
                  </button>

                  {/* Form Footer */}
                  <p className="text-xs text-center text-gray-400 mt-4">
                    I'll get back to you within 24-48 hours.
                  </p>
                </form>
              </div>
            </div>
          </Tilt>
        </div>
      </div>

      {/* Toast Container Customization */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: '#1f2937',
          color: '#fff',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '12px',
          padding: '16px',
        }}
        progressStyle={{
          background: 'linear-gradient(to right, #8b5cf6, #ec4899)',
        }}
      />
    </section>
  );
};

export default Contact;