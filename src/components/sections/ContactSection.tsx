'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, MessageSquare, Instagram, Code } from 'lucide-react';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';
import { personalInfo } from '@/data/portfolio';
import { useTheme } from '@/contexts/ThemeContext';

export default function ContactSection() {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // EmailJS configuration from old portfolio
  const SERVICE_ID = "service_vzx1309";
  const TEMPLATE_ID = "template_38052va";
  const USER_ID = "16wFkhh9-QEl71Ass";

  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Show loading toast
    const loadingToast = toast.loading("Sending message...", {
      duration: Infinity,
    });

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target as HTMLFormElement, USER_ID);

      // Clear form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      // Dismiss loading and show success
      toast.dismiss(loadingToast);
      toast.success("Message successfully sent! 🚀", {
        duration: 4000,
      });
    } catch (error) {
      // Dismiss loading and show error
      toast.dismiss(loadingToast);
      toast.error("Failed to send message. Please try again.", {
        duration: 4000,
      });
      console.error("Email sending failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section 
      id="contact" 
      className={`py-20 px-6 transition-all duration-700 ${
        isDark ? 'relative bg-slate-900/30' : ''
      }`}
      style={{
        background: !isDark 
          ? 'linear-gradient(135deg, #f8fafc 0%, #ddd6fe 50%, #e0e7ff 100%)'
          : undefined
      }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent mb-4 ${
            isDark 
              ? 'bg-gradient-to-r from-cyan-400 to-purple-500'
              : 'bg-gradient-to-r from-cyan-600 to-purple-600'
          }`}>
            Let's <span className="hover-effect-word">Connect</span>
            <style jsx>{`
              .hover-effect-word {
                background-image: linear-gradient(
                  to right,
                  ${isDark ? '#06b6d4' : '#0891b2'},
                  ${isDark ? '#06b6d4' : '#0891b2'} 50%,
                  ${isDark ? '#8b5cf6' : '#7c3aed'} 50%
                );
                background-size: 200% 100%;
                background-position: -100%;
                display: inline-block;
                padding: 5px 0;
                position: relative;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                transition: all 0.3s ease-in-out;
                cursor: pointer;
              }

              .hover-effect-word:before {
                content: '';
                background: ${isDark ? '#06b6d4' : '#0891b2'};
                display: block;
                position: absolute;
                bottom: -3px;
                left: 0;
                width: 0;
                height: 3px;
                transition: all 0.3s ease-in-out;
              }

              .hover-effect-word:hover {
                background-position: 0;
              }

              .hover-effect-word:hover::before {
                width: 100%;
              }
            `}</style>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Ready to bring your ideas to life? Let's discuss your next project
          </p>
        </motion.div>

        {/* Contact Form with 3D Cubes */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - 3D Cubes */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="hidden lg:flex flex-col justify-center items-center"
              >
                {/* Funny heading for the cubes */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="mb-60 text-center -mt-55"
                >
                  <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 flex items-center justify-center gap-3 ${
                    isDark ? 'text-cyan-400' : 'text-cyan-600'
                  }`}>
                    <svg 
                      width="32" 
                      height="32" 
                      viewBox="0 0 100 100" 
                      className="inline-block translate-y-1"
                    >
                      {/* Top face */}
                      <g transform="translate(50,15) skewY(-30) scale(0.8)">
                        <rect x="-15" y="-15" width="10" height="10" fill="#ff4444" stroke="#333" strokeWidth="0.5"/>
                        <rect x="-5" y="-15" width="10" height="10" fill="#ffff44" stroke="#333" strokeWidth="0.5"/>
                        <rect x="5" y="-15" width="10" height="10" fill="#44ff44" stroke="#333" strokeWidth="0.5"/>
                        <rect x="-15" y="-5" width="10" height="10" fill="#4444ff" stroke="#333" strokeWidth="0.5"/>
                        <rect x="-5" y="-5" width="10" height="10" fill="#ff44ff" stroke="#333" strokeWidth="0.5"/>
                        <rect x="5" y="-5" width="10" height="10" fill="#44ffff" stroke="#333" strokeWidth="0.5"/>
                        <rect x="-15" y="5" width="10" height="10" fill="#ffaa44" stroke="#333" strokeWidth="0.5"/>
                        <rect x="-5" y="5" width="10" height="10" fill="#aaaaaa" stroke="#333" strokeWidth="0.5"/>
                        <rect x="5" y="5" width="10" height="10" fill="#aa44aa" stroke="#333" strokeWidth="0.5"/>
                      </g>
                      
                      {/* Left face */}
                      <g transform="translate(25,40) skewX(-30) scale(0.8,1)">
                        <rect x="-15" y="-15" width="10" height="10" fill="#ff8844" stroke="#222" strokeWidth="0.5"/>
                        <rect x="-5" y="-15" width="10" height="10" fill="#44aa44" stroke="#222" strokeWidth="0.5"/>
                        <rect x="5" y="-15" width="10" height="10" fill="#8844ff" stroke="#222" strokeWidth="0.5"/>
                        <rect x="-15" y="-5" width="10" height="10" fill="#ffff88" stroke="#222" strokeWidth="0.5"/>
                        <rect x="-5" y="-5" width="10" height="10" fill="#ff4488" stroke="#222" strokeWidth="0.5"/>
                        <rect x="5" y="-5" width="10" height="10" fill="#44ffaa" stroke="#222" strokeWidth="0.5"/>
                        <rect x="-15" y="5" width="10" height="10" fill="#aa88ff" stroke="#222" strokeWidth="0.5"/>
                        <rect x="-5" y="5" width="10" height="10" fill="#88aaaa" stroke="#222" strokeWidth="0.5"/>
                        <rect x="5" y="5" width="10" height="10" fill="#ffaa88" stroke="#222" strokeWidth="0.5"/>
                      </g>
                      
                      {/* Right face */}
                      <g transform="translate(75,40) skewX(30) scale(0.8,1)">
                        <rect x="-15" y="-15" width="10" height="10" fill="#4488ff" stroke="#111" strokeWidth="0.5"/>
                        <rect x="-5" y="-15" width="10" height="10" fill="#ff8888" stroke="#111" strokeWidth="0.5"/>
                        <rect x="5" y="-15" width="10" height="10" fill="#88ff44" stroke="#111" strokeWidth="0.5"/>
                        <rect x="-15" y="-5" width="10" height="10" fill="#aa4488" stroke="#111" strokeWidth="0.5"/>
                        <rect x="-5" y="-5" width="10" height="10" fill="#88ff88" stroke="#111" strokeWidth="0.5"/>
                        <rect x="5" y="-5" width="10" height="10" fill="#ffaa44" stroke="#111" strokeWidth="0.5"/>
                        <rect x="-15" y="5" width="10" height="10" fill="#4444aa" stroke="#111" strokeWidth="0.5"/>
                        <rect x="-5" y="5" width="10" height="10" fill="#aa8844" stroke="#111" strokeWidth="0.5"/>
                        <rect x="5" y="5" width="10" height="10" fill="#88aaff" stroke="#111" strokeWidth="0.5"/>
                      </g>
                    </svg>
                    Hypnotic Productivity Cubes
                  </h3>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Scientifically proven* to boost message sending by 47%!
                  </p>
                  <p className={`text-xs italic mt-1 transition-colors duration-300 ${
                    isDark ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    *Not actually scientifically proven 😄
                  </p>
                </motion.div>
                <div className="cube-container">
                  <style jsx>{`
                    @keyframes animate {
                      0% {
                        filter: hue-rotate(0deg);
                      }
                      100% {
                        filter: hue-rotate(360deg);
                      }
                    }

                    .cube-container {
                      position: relative;
                      top: -80px;
                      transform: skewY(-20deg);
                      animation: animate 8s linear infinite;
                    }

                    .cube {
                      position: relative;
                      z-index: 2;
                    }

                    .cube:nth-child(2) {
                      z-index: 1;
                      translate: -60px -60px;
                    }

                    .cube:nth-child(3) {
                      z-index: 3;
                      translate: 60px 60px;
                    }

                    .cube div {
                      position: absolute;
                      display: flex;
                      flex-direction: column;
                      gap: 30px;
                      translate: calc(-70px * var(--x)) calc(-60px * var(--y));
                    }

                    .cube span {
                      position: relative;
                      display: inline-block;
                      width: 50px;
                      height: 50px;
                      background: #dcdcdc;
                      z-index: calc(1 * var(--i));
                      transition: 1.5s;
                    }

                    .cube span:hover {
                      transition: 0s;
                      background: ${isDark ? '#06b6d4' : '#0891b2'};
                      filter: drop-shadow(0 0 30px ${isDark ? '#06b6d4' : '#0891b2'});
                    }

                    .cube span:hover:before,
                    .cube span:hover:after {
                      transition: 0s;
                      background: ${isDark ? '#06b6d4' : '#0891b2'};
                    }

                    .cube span:before {
                      content: "";
                      position: absolute;
                      left: -40px;
                      width: 40px;
                      height: 100%;
                      background: #fff;
                      transform-origin: right;
                      transform: skewY(45deg);
                      transition: 1.5s;
                    }

                    .cube span:after {
                      content: "";
                      position: absolute;
                      top: -40px;
                      left: 0px;
                      width: 100%;
                      height: 40px;
                      background: #f2f2f2;
                      transform-origin: bottom;
                      transform: skewX(45deg);
                      transition: 1.5s;
                    }
                  `}</style>
                  
                  <div className="cube">
                    <div style={{ "--x": -1, "--y": 0 } as React.CSSProperties}>
                      <span style={{ "--i": 3 } as React.CSSProperties}></span>
                      <span style={{ "--i": 2 } as React.CSSProperties}></span>
                      <span style={{ "--i": 1 } as React.CSSProperties}></span>
                    </div>
                    <div style={{ "--x": 0, "--y": 0 } as React.CSSProperties}>
                      <span style={{ "--i": 3 } as React.CSSProperties}></span>
                      <span style={{ "--i": 2 } as React.CSSProperties}></span>
                      <span style={{ "--i": 1 } as React.CSSProperties}></span>
                    </div>
                    <div style={{ "--x": 1, "--y": 0 } as React.CSSProperties}>
                      <span style={{ "--i": 3 } as React.CSSProperties}></span>
                      <span style={{ "--i": 2 } as React.CSSProperties}></span>
                      <span style={{ "--i": 1 } as React.CSSProperties}></span>
                    </div>
                  </div>
                  
                  <div className="cube">
                    <div style={{ "--x": -1, "--y": 0 } as React.CSSProperties}>
                      <span style={{ "--i": 3 } as React.CSSProperties}></span>
                      <span style={{ "--i": 2 } as React.CSSProperties}></span>
                      <span style={{ "--i": 1 } as React.CSSProperties}></span>
                    </div>
                    <div style={{ "--x": 0, "--y": 0 } as React.CSSProperties}>
                      <span style={{ "--i": 3 } as React.CSSProperties}></span>
                      <span style={{ "--i": 2 } as React.CSSProperties}></span>
                      <span style={{ "--i": 1 } as React.CSSProperties}></span>
                    </div>
                    <div style={{ "--x": 1, "--y": 0 } as React.CSSProperties}>
                      <span style={{ "--i": 3 } as React.CSSProperties}></span>
                      <span style={{ "--i": 2 } as React.CSSProperties}></span>
                      <span style={{ "--i": 1 } as React.CSSProperties}></span>
                    </div>
                  </div>
                  
                  <div className="cube">
                    <div style={{ "--x": -1, "--y": 0 } as React.CSSProperties}>
                      <span style={{ "--i": 3 } as React.CSSProperties}></span>
                      <span style={{ "--i": 2 } as React.CSSProperties}></span>
                      <span style={{ "--i": 1 } as React.CSSProperties}></span>
                    </div>
                    <div style={{ "--x": 0, "--y": 0 } as React.CSSProperties}>
                      <span style={{ "--i": 3 } as React.CSSProperties}></span>
                      <span style={{ "--i": 2 } as React.CSSProperties}></span>
                      <span style={{ "--i": 1 } as React.CSSProperties}></span>
                    </div>
                    <div style={{ "--x": 1, "--y": 0 } as React.CSSProperties}>
                      <span style={{ "--i": 3 } as React.CSSProperties}></span>
                      <span style={{ "--i": 2 } as React.CSSProperties}></span>
                      <span style={{ "--i": 1 } as React.CSSProperties}></span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right side - Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="w-full"
              >
            <div className={`backdrop-blur-xl rounded-3xl p-8 border shadow-2xl transition-colors duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 border-slate-600/50'
                : 'bg-gradient-to-br from-slate-100/80 via-slate-50/60 to-slate-200/80 border-slate-300/50'
            }`}>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-400/30 mb-4">
                  <MessageSquare className={`transition-colors duration-300 ${
                    isDark ? 'text-cyan-400' : 'text-cyan-600'
                  }`} size={28} />
                </div>
                <h3 className={`text-2xl font-bold bg-clip-text text-transparent mb-2 ${
                  isDark 
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500'
                    : 'bg-gradient-to-r from-cyan-600 to-purple-600'
                }`}>Let's Work Together</h3>
                <p className={`transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>Have a project in mind? I'd love to hear about it.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="hidden"
                  name="to_email"
                  value={personalInfo.contact.email}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 ${
                        isDark 
                          ? 'bg-slate-700/70 border-slate-600 text-white placeholder-gray-400'
                          : 'bg-white/80 border-slate-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 ${
                        isDark 
                          ? 'bg-slate-700/70 border-slate-600 text-white placeholder-gray-400'
                          : 'bg-white/80 border-slate-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 ${
                      isDark 
                        ? 'bg-slate-700/70 border-slate-600 text-white placeholder-gray-400'
                        : 'bg-white/80 border-slate-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Project inquiry, collaboration, etc."
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none ${
                      isDark 
                        ? 'bg-slate-700/70 border-slate-600 text-white placeholder-gray-400'
                        : 'bg-white/80 border-slate-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Tell me about your project..."
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="animated-send-btn"
                  >
                    <style jsx>{`
                      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap');

                      .animated-send-btn {
                        display: flex;
                        padding: 12px 35px;
                        text-decoration: none;
                        font-family: 'Inter', sans-serif;
                        font-size: 18px;
                        color: white;
                        background: ${isDark ? '#06b6d4' : '#0891b2'};
                        transition: 1s;
                        box-shadow: 6px 6px 0 ${isDark ? '#1f2937' : '#374151'};
                        transform: skewX(-15deg);
                        border: none;
                        cursor: pointer;
                        position: relative;
                        overflow: hidden;
                      }

                      .animated-send-btn:focus {
                        outline: none; 
                      }

                      .animated-send-btn:hover {
                        transition: 0.5s;
                        box-shadow: 10px 10px 0 ${isDark ? '#8b5cf6' : '#7c3aed'};
                      }

                      .animated-send-btn:disabled {
                        opacity: 0.6;
                        cursor: not-allowed;
                        pointer-events: none;
                      }

                      .btn-content {
                        display: flex;
                        align-items: center;
                        transform: skewX(15deg);
                      }

                      .btn-text {
                        transition: 0.5s;
                        margin-right: 0px;
                      }

                      .animated-send-btn:hover .btn-text {
                        transition: 0.5s;
                        margin-right: 45px;
                      }

                      .btn-icon {
                        width: 52px;
                        height: 34px;
                        margin-left: 25px;
                        position: relative;
                        top: 1px;
                        transition: 0.5s;
                      }

                      .animated-send-btn:hover .btn-icon {
                        margin-left: 10px;
                      }

                      .loading-spinner {
                        width: 24px;
                        height: 24px;
                        border: 3px solid rgba(255, 255, 255, 0.3);
                        border-top: 3px solid white;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin-right: 10px;
                      }

                      @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                      }

                      /* SVG Path animations */
                      .arrow-path-one {
                        transition: 0.4s;
                        transform: translateX(-60%);
                      }

                      .arrow-path-two {
                        transition: 0.5s;
                        transform: translateX(-30%);
                      }

                      .animated-send-btn:hover .arrow-path-three {
                        animation: color_anim 1s infinite 0.2s;
                      }

                      .animated-send-btn:hover .arrow-path-one {
                        transform: translateX(0%);
                        animation: color_anim 1s infinite 0.6s;
                      }

                      .animated-send-btn:hover .arrow-path-two {
                        transform: translateX(0%);
                        animation: color_anim 1s infinite 0.4s;
                      }

                      @keyframes color_anim {
                        0% {
                          fill: white;
                        }
                        50% {
                          fill: ${isDark ? '#8b5cf6' : '#7c3aed'};
                        }
                        100% {
                          fill: white;
                        }
                      }
                    `}</style>
                    
                    <div className="btn-content">
                      {isSubmitting ? (
                        <>
                          <div className="loading-spinner"></div>
                          <span>SENDING</span>
                        </>
                      ) : (
                        <>
                          <span className="btn-text">SEND</span>
                          <svg className="btn-icon" width="66px" height="43px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                              <path className="arrow-path-one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                              <path className="arrow-path-two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                              <path className="arrow-path-three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
                            </g>
                          </svg>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </form>
            </div>
              </motion.div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}