'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import TerminalText from '@/components/animations/TerminalText';
import FloatingElements from '@/components/3d/FloatingElements';
import { personalInfo } from '@/data/portfolio';
import { getAssetPath } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  AnimatedGitHub, 
  AnimatedLinkedIn, 
  AnimatedTwitter, 
  AnimatedInstagram,
  AnimatedMail, 
  AnimatedCode,
  AnimatedArrowDown
} from '@/components/icons/AnimatedIcons';

const terminalLines = [
  'npm install awesome-developer',
  'Initializing portfolio...',
  'Loading skills: [■■■■■■■■■■] 100%',
  'Connecting to creativity...',
  'Ready to code the future!'
];

export default function HeroSection() {
  const [isExploding, setIsExploding] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [explosionKey, setExplosionKey] = useState(0);
  const [showNameReform, setShowNameReform] = useState(false);
  const { isDark } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNameClick = () => {
    if (isExploding) return; // Prevent multiple clicks during animation
    
    setIsExploding(true);
    setShowNameReform(false);
    setExplosionKey(prev => prev + 1); // Force re-render with new random values
    
    // After 8 seconds, start name reformation
    setTimeout(() => {
      setShowNameReform(true);
    }, 8000);
    
    // Reset explosion state after 12 seconds (when reformation completes)
    setTimeout(() => {
      setIsExploding(false);
      setShowNameReform(false);
    }, 8000);
  };

  const handleNameHover = () => {
    if (!isExploding) {
      setShowWarning(true);
    }
  };

  const handleNameLeave = () => {
    setShowWarning(false);
  };

  // Split name into individual letters for explosion animation
  const nameLetters = personalInfo.name.split('').map((letter, index) => ({
    letter: letter === ' ' ? '\u00A0' : letter, // Non-breaking space for spaces
    index,
    originalIndex: index
  }));

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient - responsive to theme */}
      <div 
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: isDark 
            ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #ddd6fe 50%, #e0e7ff 100%)'
        }}
      ></div>
      
      {/* 3D Floating Elements Background */}
      <div className="absolute inset-0 z-0">
        <FloatingElements />
      </div>

      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* Left Side - Profile Image, Name, Title */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left pt-8 sm:pt-0"
          >
            {/* Profile Image with Animated Outline */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-64 h-64 lg:w-80 lg:h-80 mb-8 relative flex items-center justify-center"
            >
              <style jsx>{`
                .profile-image-container {
                  --s: 16rem; /* 256px - w-64 */
                  --b: 8px;
                  --g: 14px;
                  --c: ${isDark ? '#06b6d4' : '#0891b2'};
                  
                  width: var(--s);
                  aspect-ratio: 1;
                  outline: calc(var(--s) / 2) solid rgba(0, 0, 0, 0.25);
                  outline-offset: calc(var(--s) / -2);
                  cursor: pointer;
                  transition: 0.3s;
                  border-radius: 50%;
                  overflow: hidden;
                  position: relative;
                }

                .profile-image-container:hover {
                  outline: var(--b) solid var(--c);
                  outline-offset: var(--g);
                }

                .profile-image-container.large {
                  --s: 20rem; /* 320px - lg:w-80 */
                }

                @media (min-width: 1024px) {
                  .profile-image-container {
                    --s: 20rem;
                  }
                }

                .profile-image {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  border-radius: 50%;
                }
              `}</style>

              <div className="profile-image-container">
                <img
                  src={getAssetPath(personalInfo.avatar)}
                  alt={personalInfo.name}
                  className="profile-image"
                  onError={(e) => {
                    // Hide broken image and show placeholder
                    console.log('Image failed to load:', personalInfo.avatar);
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    // Show placeholder
                    const placeholder = target.nextElementSibling as HTMLElement;
                    if (placeholder) {
                      placeholder.style.display = 'flex';
                    }
                  }}
                  onLoad={(e) => {
                    // Hide placeholder when image loads successfully
                    console.log('Image loaded successfully:', personalInfo.avatar);
                    const target = e.target as HTMLImageElement;
                    const placeholder = target.nextElementSibling as HTMLElement;
                    if (placeholder) {
                      placeholder.style.display = 'none';
                    }
                  }}
                />
                {/* Modern Placeholder - Shows when image fails to load */}
                <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden" style={{display: 'none'}}>
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-cyan-400/30 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-purple-400/30 rounded-full animate-pulse delay-300"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-pink-400/20 rounded-full animate-pulse delay-500"></div>
                    <div className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-blue-400/20 rounded-full animate-pulse delay-700"></div>
                  </div>
                  
                  {/* Main Content */}
                  <div className="relative z-10 text-center">
                    {/* Professional Avatar Container */}
                    <div className="relative mb-4">
                      <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-400/30 flex items-center justify-center backdrop-blur-sm overflow-hidden">
                        {/* Human-like avatar silhouette */}
                        <svg 
                          className="w-20 h-20 lg:w-24 lg:h-24 text-cyan-400/70" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                      {/* Animated status indicators */}
                      <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-90 flex items-center justify-center animate-pulse">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-80 flex items-center justify-center">
                        <span className="text-white text-xs">👨‍💻</span>
                      </div>
                    </div>
                    
                    {/* Professional Title */}
                    <div className={`text-xl lg:text-2xl font-bold bg-clip-text text-transparent mb-2 ${
                      isDark 
                        ? 'bg-gradient-to-r from-cyan-400 to-purple-500'
                        : 'bg-gradient-to-r from-cyan-600 to-purple-600'
                    }`}>
                      {personalInfo.name}
                    </div>
                    
                    {/* Status Indicator */}
                    <div className="text-xs lg:text-sm text-gray-400 font-medium">
                      <span className="inline-flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span>Available for opportunities</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Name and Title with Explosion Animation */}
            <div className="relative mb-4">
              {/* Warning tooltip - smaller size, positioned lower and right */}
              <AnimatePresence>
                {showWarning && !isExploding && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.7 }}
                    animate={{ opacity: 1, y: -12, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.7 }}
                    className="absolute -top-8 left-3/4 transform -translate-x-1/4 z-20"
                  >
                    <div className={`backdrop-blur-md rounded-md px-2 py-1 border whitespace-nowrap ${
                      isDark 
                        ? 'bg-slate-900/90 border-red-400/30'
                        : 'bg-white/90 border-red-500/40'
                    }`}>
                      <div className="flex items-center space-x-1">
                        <span className={`text-xs font-medium ${
                          isDark ? 'text-red-400' : 'text-red-600'
                        }`}>⚠️ Don't click me!</span>
                      </div>
                      {/* Tooltip arrow */}
                      <div className="absolute top-full left-1/4 transform -translate-x-1/2">
                        <div className={`w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent ${
                          isDark ? 'border-t-red-400/30' : 'border-t-red-500/40'
                        }`}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-4 cursor-pointer select-none relative"
                onClick={handleNameClick}
                onMouseEnter={handleNameHover}
                onMouseLeave={handleNameLeave}
              >
                {!isExploding ? (
                  // Normal state
                  <span className={`bg-clip-text text-transparent ${
                    isDark 
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-500'
                      : 'bg-gradient-to-r from-cyan-600 to-purple-600'
                  }`}>
                    {personalInfo.name}
                  </span>
                ) : showNameReform ? (
                  // Name reformation state - smooth fade in with longer duration
                  <motion.span
                    className={`bg-clip-text text-transparent ${
                      isDark 
                        ? 'bg-gradient-to-r from-cyan-400 to-purple-500'
                        : 'bg-gradient-to-r from-cyan-600 to-purple-600'
                    }`}
                    initial={{ opacity: 0, scale: 0.5, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      duration: 4, // Much longer reformation duration
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: "spring",
                      stiffness: 60, // Slower spring for more gradual effect
                      damping: 15
                    }}
                  >
                    {personalInfo.name}
                  </motion.span>
                ) : (
                  // Explosion state - natural physics-based letter scattering
                  <div className="relative inline-block">
                    <span className="invisible">{personalInfo.name}</span>
                    {nameLetters.map((letterObj, index) => {
                      // Natural explosion physics - each letter gets unique trajectory
                      // Use explosionKey to ensure new random values on each explosion
                      const randomSeed = explosionKey + index;
                      
                      // Ensure minimum distance - letters must scatter far from center
                      const explosionAngle = ((randomSeed * 37) % 100 / 100 - 0.5) * 2 * Math.PI;
                      const minForce = 600; // Minimum force to ensure all letters go far
                      const explosionForce = minForce + ((randomSeed * 71) % 100) * 8; // Force range: 600-1400px
                      
                      // Initial velocity components - ensure significant movement
                      const baseVelocityX = Math.cos(explosionAngle) * explosionForce;
                      const baseVelocityY = Math.sin(explosionAngle) * explosionForce;
                      
                      // Add extra distance bias to push letters farther from center
                      const centerBias = 300; // Additional force away from center
                      const initialVelocityX = baseVelocityX + (baseVelocityX > 0 ? centerBias : -centerBias);
                      const initialVelocityY = baseVelocityY - (300 + ((randomSeed * 13) % 100) * 3); // Strong upward bias
                      
                      // Calculate natural trajectory with gravity
                      const gravity = 700; // Strong gravity for dramatic fall
                      const timeToApex = Math.abs(initialVelocityY) / gravity;
                      
                      // Calculate peak positions - guaranteed far distances
                      const peakX = initialVelocityX * timeToApex * 0.85;
                      const peakY = (initialVelocityY * timeToApex) - (0.5 * gravity * timeToApex * timeToApex);
                      
                      // Final positions - very far landing spots
                      const landingX = peakX * 2.2 + ((randomSeed * 23) % 100 - 50) * 6; // Much farther spread
                      const landingY = 400 + ((randomSeed * 41) % 100) * 6; // Much farther fall: 400-1000px
                      
                      // Rotation physics
                      const rotationSpeed = ((randomSeed * 47) % 100 - 50) * 10;
                      const totalRotation = rotationSpeed * 4; // More dramatic rotation
                      
                      // Calculate letter's original position within the name
                      const letterWidth = 100 / nameLetters.length;
                      const letterPosition = (index * letterWidth) - 50;

                      return (
                        <motion.span
                          key={`${letterObj.letter}-${letterObj.index}-${explosionKey}`}
                          className="absolute top-0 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-bold"
                          initial={{ 
                            x: letterPosition,
                            y: 0, 
                            rotate: 0, 
                            scale: 1,
                            opacity: 1
                          }}
                          animate={{
                            x: isExploding ? [
                              letterPosition,                    // Start at original position
                              letterPosition + peakX,          // Peak of trajectory
                              letterPosition + landingX        // Landing position (stay there)
                            ] : letterPosition,
                            y: isExploding ? [
                              0,           // Start position
                              peakY,       // Peak height
                              landingY     // Landing position (stay there)
                            ] : 0,
                            rotate: isExploding ? [
                              0,
                              totalRotation * 0.6,  // Most rotation during flight
                              totalRotation         // Full rotation at landing (stay there)
                            ] : 0,
                            scale: isExploding ? [1, 1, 0.8] : 1, // Slightly shrink on landing
                            opacity: isExploding ? [
                              1,    // Visible at start
                              1,    // Visible during flight
                              0     // Disappear on landing
                            ] : 1
                          }}
                          transition={{
                            duration: isExploding ? 7 : 2, // 7 seconds for explosion + disappear
                            ease: isExploding ? [0.25, 0.46, 0.45, 0.94] : "easeInOut",
                            times: isExploding ? [0, 0.4, 1] : undefined // 40% flight, 60% fall + disappear
                          }}
                          style={{
                            transformOrigin: 'center center',
                            zIndex: 20 + index,
                            left: '50%',
                            transform: 'translateX(-50%)'
                          }}
                        >
                          {letterObj.letter}
                        </motion.span>
                      );
                    })}
                  </div>
                )}

              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className={`text-lg lg:text-xl xl:text-2xl mb-4 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {personalInfo.title}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className={`flex items-center gap-2 mb-8 transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-700'
              }`}
            >
              <MapPin size={20} />
              <a 
                href="#" 
                className="location-hover-effect" 
                data-replace="San Jose, CA"
                onClick={(e) => e.preventDefault()}
              >
                <span>San Jose, CA</span>
              </a>
              <style jsx>{`
                .location-hover-effect {
                  overflow: hidden;
                  position: relative;
                  display: inline-block;
                  text-decoration: none;
                  color: inherit;
                  font-weight: inherit;
                  vertical-align: top;
                }

                .location-hover-effect::before,
                .location-hover-effect::after {
                  content: '';
                  position: absolute;
                  width: 100%;
                  left: 0;
                }

                .location-hover-effect::before {
                  background-color: ${isDark ? '#06b6d4' : '#0891b2'};
                  height: 2px;
                  bottom: 0;
                  transform-origin: 100% 50%;
                  transform: scaleX(0);
                  transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
                }

                .location-hover-effect::after {
                  content: attr(data-replace);
                  height: 100%;
                  top: 0;
                  transform-origin: 100% 50%;
                  transform: translate3d(200%, 0, 0);
                  transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
                  color: ${isDark ? '#06b6d4' : '#0891b2'};
                  display: flex;
                  align-items: center;
                }

                .location-hover-effect:hover::before {
                  transform-origin: 0% 50%;
                  transform: scaleX(1);
                }

                .location-hover-effect:hover::after {
                  transform: translate3d(0, 0, 0);
                }

                .location-hover-effect span {
                  display: inline-block;
                  transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
                }

                .location-hover-effect:hover span {
                  transform: translate3d(-200%, 0, 0);
                }
              `}</style>
            </motion.div>
          </motion.div>

          {/* Right Side - Terminal, CTA Buttons, Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Terminal Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className={`ml-2 transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-100'
                  }`}>terminal</span>
                </div>
                <TerminalText lines={terminalLines} speed={80} />
              </div>
            </motion.div>

            {/* Bio Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className={`leading-relaxed text-lg transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className={`px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  isDark 
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 hover:shadow-cyan-500/25'
                    : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 hover:shadow-cyan-600/25'
                }`}
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`px-8 py-4 border-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isDark 
                    ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900'
                    : 'border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-slate-900'
                }`}
              >
                Get In Touch
              </button>
            </motion.div>

            {/* Social Links - Animated Expansion Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8 sm:mb-0"
            >
              <style jsx>{`
                .social-link {
                  position: relative;
                  list-style: none;
                  width: 45px;
                  height: 45px;
                  background: ${isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(241, 245, 249, 0.9)'};
                  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                  border-radius: 45px;
                  cursor: pointer;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  transition: 0.5s;
                  backdrop-filter: blur(10px);
                }

                .social-link::before {
                  content: "";
                  position: absolute;
                  inset: 0;
                  border-radius: 45px;
                  background: var(--gradient);
                  opacity: 0;
                  transition: 0.5s;
                }

                .social-link::after {
                  content: "";
                  position: absolute;
                  top: 8px;
                  width: 100%;
                  height: 100%;
                  border-radius: 45px;
                  background: var(--gradient);
                  transition: 0.5s;
                  filter: blur(12px);
                  z-index: -1;
                  opacity: 0;
                }

                .social-link:hover {
                  width: 140px;
                  box-shadow: 0 8px 20px rgba(0, 0, 0, 0);
                }

                .social-link:hover::before {
                  opacity: 1;
                }

                .social-link:hover::after {
                  opacity: 0.5;
                }

                .social-icon {
                  color: ${isDark ? '#9ca3af' : '#6b7280'};
                  font-size: 1.3em;
                  transition: 0.5s;
                  transition-delay: 0.25s;
                  z-index: 10;
                }

                .social-link:hover .social-icon {
                  transform: scale(0);
                  color: #fff;
                  transition-delay: 0s;
                }

                .social-title {
                  position: absolute;
                  color: #fff;
                  font-size: 0.9em;
                  letter-spacing: 0.05em;
                  text-transform: uppercase;
                  transform: scale(0);
                  transition: 0.5s;
                  transition-delay: 0s;
                  font-weight: 600;
                  z-index: 10;
                  white-space: nowrap;
                }

                .social-link:hover .social-title {
                  transform: scale(1);
                  transition-delay: 0.25s;
                }
              `}</style>

              <a
                href={personalInfo.contact.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                style={{ '--gradient': 'linear-gradient(45deg, #24292e, #6f42c1)' } as any}
              >
                <div className="social-icon">
                  <AnimatedGitHub size={20} />
                </div>
                <span className="social-title">GitHub</span>
              </a>

              <a
                href={personalInfo.contact.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                style={{ '--gradient': 'linear-gradient(45deg, #0077b5, #00a0dc)' } as any}
              >
                <div className="social-icon">
                  <AnimatedLinkedIn size={20} />
                </div>
                <span className="social-title">LinkedIn</span>
              </a>

              {personalInfo.contact.social.twitter && (
                <a
                  href={personalInfo.contact.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ '--gradient': 'linear-gradient(45deg, #000000, #333333)' } as any}
                >
                  <div className="social-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <span className="social-title">X</span>
                </a>
              )}

              {personalInfo.contact.social.instagram && (
                <a
                  href={personalInfo.contact.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ '--gradient': 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' } as any}
                >
                  <div className="social-icon">
                    <AnimatedInstagram size={20} />
                  </div>
                  <span className="social-title">Instagram</span>
                </a>
              )}

              {personalInfo.contact.social.leetcode && (
                <a
                  href={personalInfo.contact.social.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ '--gradient': 'linear-gradient(45deg, #ffa116, #f89500)' } as any}
                >
                  <div className="social-icon">
                    <AnimatedCode size={20} />
                  </div>
                  <span className="social-title">LeetCode</span>
                </a>
              )}

              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="social-link"
                style={{ '--gradient': 'linear-gradient(45deg, #ea4335, #fbbc05, #34a853, #4285f4)' } as any}
              >
                <div className="social-icon">
                  <AnimatedMail size={20} />
                </div>
                <span className="social-title">Email</span>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="cursor-pointer"
            onClick={() => scrollToSection('about')}
          >
            <AnimatedArrowDown size={32} color="#9ca3af" className="hover:text-cyan-400 transition-colors" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}