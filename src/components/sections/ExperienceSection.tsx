'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Calendar, Building, MapPin, Users, TrendingUp, Award, ChevronRight, Star, Zap, Target, Briefcase } from 'lucide-react';
import { experiences } from '@/data/portfolio';
import { useTheme } from '@/contexts/ThemeContext';

// Professional skill badge component with smooth animations
function ProfessionalSkillBadge({ skill, index, delay }: { skill: string; index: number; delay: number }) {
  const { isDark } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        delay: delay + index * 0.05, 
        duration: 0.3,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-300 ${
        isDark 
          ? 'bg-slate-700/50 border-slate-600/50 text-cyan-300 hover:bg-slate-600/60 hover:border-cyan-400/40 hover:text-cyan-200'
          : 'bg-slate-100/60 border-slate-300/50 text-cyan-700 hover:bg-slate-200/70 hover:border-cyan-500/40 hover:text-cyan-800'
      }`}
    >
      {skill}
    </motion.div>
  );
}

// Professional timeline node
function TimelineNode({ 
  isActive, 
  onClick, 
  experience, 
  index 
}: { 
  isActive: boolean; 
  onClick: () => void; 
  experience: any; 
  index: number;
}) {
  const { isDark } = useTheme();
  
  return (
    <motion.div
      className="relative cursor-pointer group"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {/* Subtle ring effect */}
      <motion.div
        className={`absolute -inset-1 rounded-full ${
          isDark ? 'bg-cyan-400/10' : 'bg-cyan-500/10'
        }`}
        animate={{ 
          scale: isActive ? 1.2 : 1,
          opacity: isActive ? 0.6 : 0
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Main node */}
      <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
        isActive
          ? isDark 
            ? 'bg-cyan-400 border-cyan-400 shadow-md shadow-cyan-400/30'
            : 'bg-cyan-500 border-cyan-500 shadow-md shadow-cyan-500/30'
          : isDark
            ? 'bg-slate-700 border-slate-600 group-hover:border-cyan-400/60'
            : 'bg-slate-200 border-slate-300 group-hover:border-cyan-500/60'
      }`} />
      
    </motion.div>
  );
}

// Professional experience card with smooth interactions
function ModernExperienceCard({ 
  experience, 
  index, 
  isActive,
  onToggle 
}: { 
  experience: any; 
  index: number;
  isActive: boolean;
  onToggle: () => void;
}) {
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      className="relative group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Creative gradient border */}
      <motion.div
        className={`absolute -inset-0.5 rounded-2xl transition-all duration-500 ${
          isActive
            ? isDark
              ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500'
              : 'bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600'
            : isHovered
              ? isDark
                ? 'bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50'
                : 'bg-gradient-to-r from-cyan-600/50 via-purple-600/50 to-pink-600/50'
              : isDark
                ? 'bg-gradient-to-r from-slate-700/80 via-slate-600/80 to-slate-700/80'
                : 'bg-gradient-to-r from-slate-300/80 via-slate-200/80 to-slate-300/80'
        }`}
        animate={{ 
          opacity: isActive ? 1 : (isHovered ? 0.8 : 0.4),
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Decorative corner elements */}
      <motion.div
        className={`absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 transition-all duration-300 ${
          isActive 
            ? isDark ? 'border-cyan-400' : 'border-cyan-500'
            : isDark ? 'border-cyan-400/60' : 'border-cyan-500/60'
        }`}
        animate={{
          opacity: isActive ? 1 : (isHovered ? 0.8 : 0.5),
          scale: isActive ? 1.2 : (isHovered ? 1.1 : 1)
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className={`absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 transition-all duration-300 ${
          isActive 
            ? isDark ? 'border-purple-400' : 'border-purple-500'
            : isDark ? 'border-purple-400/60' : 'border-purple-500/60'
        }`}
        animate={{
          opacity: isActive ? 1 : (isHovered ? 0.8 : 0.5),
          scale: isActive ? 1.2 : (isHovered ? 1.1 : 1)
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className={`absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 transition-all duration-300 ${
          isActive 
            ? isDark ? 'border-emerald-400' : 'border-emerald-500'
            : isDark ? 'border-emerald-400/60' : 'border-emerald-500/60'
        }`}
        animate={{
          opacity: isActive ? 1 : (isHovered ? 0.8 : 0.5),
          scale: isActive ? 1.2 : (isHovered ? 1.1 : 1)
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className={`absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 transition-all duration-300 ${
          isActive 
            ? isDark ? 'border-pink-400' : 'border-pink-500'
            : isDark ? 'border-pink-400/60' : 'border-pink-500/60'
        }`}
        animate={{
          opacity: isActive ? 1 : (isHovered ? 0.8 : 0.5),
          scale: isActive ? 1.2 : (isHovered ? 1.1 : 1)
        }}
        transition={{ duration: 0.2 }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
        whileHover={{ 
          y: -4,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        className={`relative backdrop-blur-sm rounded-2xl p-6 border cursor-pointer transition-all duration-500 overflow-hidden ${
          isActive
            ? isDark 
              ? 'bg-slate-800/70 border-transparent shadow-xl'
              : 'bg-white/90 border-transparent shadow-xl'
            : isDark 
              ? 'bg-slate-800/40 border-slate-700/30 hover:bg-slate-800/50 hover:border-slate-600/40'
              : 'bg-white/60 border-slate-200/30 hover:bg-white/75 hover:border-slate-300/40'
        }`}
        onClick={onToggle}
      >
        {/* Header with company info */}
        <motion.div 
          className="flex items-start justify-between mb-4"
          layoutId={`header-${experience.id}`}
        >
          <div className="flex-1">
            <motion.h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              {experience.title}
            </motion.h3>
            
            <motion.div className="flex items-center gap-3 mb-2">
              <div className={`flex items-center gap-2 transition-colors duration-300 ${
                isDark ? 'text-cyan-300' : 'text-cyan-600'
              }`}>
                <Building size={16} />
                <span className="font-semibold">{experience.company}</span>
                {experience.website && (
                  <motion.a
                    href={experience.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    className={`transition-colors ${
                      isDark ? 'hover:text-cyan-200' : 'hover:text-cyan-700'
                    }`}
                  >
                    <ExternalLink size={14} />
                  </motion.a>
                )}
              </div>
            </motion.div>

            <div className={`flex items-center gap-4 text-sm transition-colors duration-300 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{experience.period}</span>
              </div>
              {experience.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{experience.location}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Expand indicator */}
          <motion.div
            animate={{ rotate: isActive ? 90 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isDark 
                ? 'text-gray-400 hover:text-cyan-300 hover:bg-slate-700/50' 
                : 'text-gray-600 hover:text-cyan-600 hover:bg-slate-100/50'
            }`}
          >
            <ChevronRight size={16} />
          </motion.div>
        </motion.div>

        {/* Description */}
        <motion.div 
          className={`mb-4 leading-relaxed transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          <p 
            className={`${!isActive ? 'overflow-hidden' : ''}`}
            style={!isActive ? {
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical'
            } : {}}
          >
            {experience.description}
          </p>
        </motion.div>

        {/* Expandable content */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 mb-4"
            >
              {/* Achievements */}
              {experience.achievements && (
                <div>
                  <h4 className={`text-sm font-semibold mb-2 flex items-center gap-2 transition-colors duration-300 ${
                    isDark ? 'text-green-400' : 'text-green-600'
                  }`}>
                    <Award size={16} />
                    Key Achievements
                  </h4>
                  <ul className="space-y-1">
                    {experience.achievements.map((achievement: string, i: number) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`text-sm flex items-start gap-2 transition-colors duration-300 ${
                          isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        <Star size={12} className={`mt-0.5 flex-shrink-0 ${
                          isDark ? 'text-yellow-400' : 'text-yellow-500'
                        }`} />
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Impact metrics */}
              {experience.metrics && (
                <div className="grid grid-cols-2 gap-3">
                  {experience.metrics.map((metric: any, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className={`p-3 rounded-lg text-center transition-all duration-300 ${
                        isDark 
                          ? 'bg-slate-700/50 border border-slate-600/30'
                          : 'bg-slate-50/80 border border-slate-200/50'
                      }`}
                    >
                      <div className={`text-lg font-bold ${
                        isDark ? 'text-cyan-400' : 'text-cyan-600'
                      }`}>{metric.value}</div>
                      <div className={`text-xs ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>{metric.label}</div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Professional skill badges */}
        <div className="flex flex-wrap gap-2">
          {experience.technologies.slice(0, isActive ? undefined : 6).map((tech: string, i: number) => (
            <ProfessionalSkillBadge key={tech} skill={tech} index={i} delay={index * 0.1} />
          ))}
          {!isActive && experience.technologies.length > 6 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: (index * 0.1) + (6 * 0.05) }}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors duration-300 ${
                isDark 
                  ? 'bg-slate-700/40 border-slate-600/40 text-gray-400'
                  : 'bg-slate-100/40 border-slate-300/40 text-gray-600'
              }`}
            >
              +{experience.technologies.length - 6} more
            </motion.div>
          )}
        </div>

      </motion.div>
    </motion.div>
  );
}

// SVG Timeline with animated path
function AnimatedTimeline({ experiences, activeIndex }: { experiences: any[]; activeIndex: number }) {
  const { isDark } = useTheme();
  
  return (
    <div className="absolute left-8 top-0 bottom-0 w-0.5">
      {/* Animated timeline path */}
      <svg className="absolute inset-0 w-full h-full" style={{ left: '-1px' }}>
        <motion.line
          x1="1"
          y1="0"
          x2="1"
          y2="100%"
          stroke={isDark ? 'url(#gradient-dark)' : 'url(#gradient-light)'}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="gradient-dark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="gradient-light" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="1" />
            <stop offset="100%" stopColor="#db2777" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Timeline nodes */}
      <div className="relative h-full">
        {experiences.map((exp, index) => (
          <div
            key={exp.id}
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{ top: `${(index / (experiences.length - 1)) * 100}%` }}
          >
            <TimelineNode
              experience={exp}
              index={index}
              isActive={activeIndex === index}
              onClick={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const { isDark } = useTheme();
  const [activeExperience, setActiveExperience] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const floatingY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <section 
      ref={sectionRef}
      id="experience" 
      className="relative py-20 px-6 overflow-hidden"
    >
      {/* Subtle background elements */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {/* Subtle gradient orbs */}
        <motion.div
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute top-1/3 left-1/5 w-96 h-96 rounded-full blur-3xl opacity-5 ${
            isDark 
              ? 'bg-gradient-to-br from-cyan-400 to-purple-500'
              : 'bg-gradient-to-br from-cyan-500 to-purple-600'
          }`}
        />
        
        <motion.div
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ 
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
          className={`absolute bottom-1/3 right-1/5 w-80 h-80 rounded-full blur-3xl opacity-3 ${
            isDark 
              ? 'bg-gradient-to-br from-purple-400 to-pink-500'
              : 'bg-gradient-to-br from-purple-500 to-pink-600'
          }`}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            style={{ y: floatingY }}
            className="inline-block"
          >
            <h2 className={`text-5xl md:text-6xl font-bold bg-clip-text text-transparent mb-6 ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500'
                : 'bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600'
            }`}>
              Professional <span className="hover-effect-word">Journey</span>
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
          </motion.div>
          
          <motion.p 
            className={`text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Crafting digital experiences and building scalable solutions across diverse industries
          </motion.p>
          
          {/* Interactive stats */}
          <motion.div
            className="flex justify-center gap-3 sm:gap-6 md:gap-8 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {[
              { icon: Briefcase, label: 'Years Experience', value: '2+' },
              { icon: TrendingUp, label: 'Projects Delivered', value: '15+' },
              { icon: Users, label: 'Teams Led', value: '3' }
            ].map((stat, index) => (
              <div key={stat.label} className="holographic-container">
                <div className={`holographic-card holographic-card-${index}`}>
                  <div className="holographic-content">
                    <stat.icon className="holographic-icon" size={24} />
                    <div className="holographic-value">{stat.value}</div>
                    <div className="holographic-label">{stat.label}</div>
                  </div>
                </div>
                
                <style jsx>{`
                  .holographic-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }

                  .holographic-card {
                    width: 95px;
                    height: 100px;
                    background: ${isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(248, 250, 252, 0.9)'};
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    overflow: hidden;
                    border-radius: 15px;
                    transition: all 0.5s ease;
                    border: 1px solid ${isDark ? 'rgba(6, 182, 212, 0.3)' : 'rgba(8, 145, 178, 0.4)'};
                  }

                  .holographic-content {
                    text-align: center;
                    position: relative;
                    z-index: 2;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                  }

                  .holographic-icon {
                    color: ${isDark ? '#06b6d4' : '#0891b2'};
                    margin-bottom: 6px;
                    filter: drop-shadow(0 0 8px ${isDark ? 'rgba(6, 182, 212, 0.6)' : 'rgba(8, 145, 178, 0.6)'});
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }

                  .holographic-value {
                    background: linear-gradient(135deg, ${isDark ? '#06b6d4' : '#0891b2'}, ${isDark ? '#8b5cf6' : '#7c3aed'});
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 2px;
                    filter: drop-shadow(0 0 10px ${isDark ? 'rgba(6, 182, 212, 0.4)' : 'rgba(8, 145, 178, 0.4)'});
                  }

                  .holographic-label {
                    color: ${isDark ? '#94a3b8' : '#64748b'};
                    font-size: 0.7rem;
                    font-weight: 500;
                    opacity: 0.9;
                    line-height: 1.1;
                    text-align: center;
                    padding: 0 2px;
                  }

                  .holographic-card::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(
                      0deg, 
                      transparent, 
                      transparent 30%, 
                      ${isDark ? 'rgba(6, 182, 212, 0.3)' : 'rgba(8, 145, 178, 0.3)'},
                      ${isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.2)'}
                    );
                    transform: rotate(-45deg);
                    transition: all 0.5s ease;
                    opacity: 0;
                  }

                  .holographic-card:hover {
                    transform: scale(1.05);
                    box-shadow: 0 0 25px ${isDark ? 'rgba(6, 182, 212, 0.4)' : 'rgba(8, 145, 178, 0.4)'};
                    border-color: ${isDark ? 'rgba(6, 182, 212, 0.6)' : 'rgba(8, 145, 178, 0.6)'};
                  }

                  .holographic-card:hover::before {
                    opacity: 1;
                    transform: rotate(-45deg) translateY(100%);
                  }

                  .holographic-card:hover .holographic-icon {
                    filter: drop-shadow(0 0 12px ${isDark ? 'rgba(6, 182, 212, 0.8)' : 'rgba(8, 145, 178, 0.8)'});
                    transform: scale(1.1);
                  }

                  .holographic-card:hover .holographic-value {
                    filter: drop-shadow(0 0 15px ${isDark ? 'rgba(6, 182, 212, 0.6)' : 'rgba(8, 145, 178, 0.6)'});
                    transform: scale(1.02);
                  }

                  .holographic-card:hover .holographic-label {
                    color: ${isDark ? '#06b6d4' : '#0891b2'};
                    transform: translateY(-2px);
                  }

                  @media (min-width: 640px) {
                    .holographic-card {
                      width: 120px;
                      height: 115px;
                    }
                    .holographic-value {
                      font-size: 1.625rem;
                    }
                    .holographic-label {
                      font-size: 0.75rem;
                    }
                  }

                  @media (min-width: 768px) {
                    .holographic-card {
                      width: 160px;
                      height: 130px;
                    }
                    .holographic-value {
                      font-size: 1.75rem;
                    }
                    .holographic-label {
                      font-size: 0.8rem;
                    }
                    .holographic-icon {
                      margin-bottom: 8px;
                    }
                  }

                  @media (min-width: 640px) {
                    .holographic-icon svg {
                      width: 28px;
                      height: 28px;
                    }
                  }

                  @media (min-width: 768px) {
                    .holographic-icon svg {
                      width: 32px;
                      height: 32px;
                    }
                  }
                `}</style>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Experience cards */}
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <ModernExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
              isActive={activeExperience === index}
              onToggle={() => setActiveExperience(
                activeExperience === index ? null : index
              )}
            />
          ))}
        </div>

        {/* Enhanced career highlights with interactive elements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className={`mt-24 backdrop-blur-xl rounded-3xl p-8 border relative overflow-hidden transition-all duration-300 ${
            isDark 
              ? 'bg-slate-800/20 border-slate-700/30'
              : 'bg-white/30 border-slate-200/30'
          }`}
        >
          {/* Background pattern */}
          <div className={`absolute inset-0 opacity-5 ${
            isDark ? 'bg-gradient-to-br from-cyan-400 to-purple-500' : 'bg-gradient-to-br from-cyan-500 to-purple-600'
          }`} />
          
          <motion.h3 
            className={`text-3xl font-bold mb-8 text-center transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Impact Highlights
          </motion.h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: '25+', label: 'LLM Providers', icon: Zap, color: 'cyan', bgLight: 'bg-cyan-50', bgDark: 'bg-cyan-500/10', borderLight: 'border-cyan-200', borderDark: 'border-cyan-400/30', textLight: 'text-cyan-700', textDark: 'text-cyan-400' },
              { value: '20GB', label: 'Zero-Downtime Migration', icon: Target, color: 'purple', bgLight: 'bg-purple-50', bgDark: 'bg-purple-500/10', borderLight: 'border-purple-200', borderDark: 'border-purple-400/30', textLight: 'text-purple-700', textDark: 'text-purple-400' },
              { value: '99.9%', label: 'System Uptime', icon: TrendingUp, color: 'green', bgLight: 'bg-emerald-50', bgDark: 'bg-emerald-500/10', borderLight: 'border-emerald-200', borderDark: 'border-emerald-400/30', textLight: 'text-emerald-700', textDark: 'text-emerald-400' },
              { value: '25%', label: 'Cost Reduction', icon: Award, color: 'yellow', bgLight: 'bg-amber-50', bgDark: 'bg-amber-500/10', borderLight: 'border-amber-200', borderDark: 'border-amber-400/30', textLight: 'text-amber-700', textDark: 'text-amber-400' }
            ].map((highlight, index) => {
              const isCurrentlyHovered = hoveredCard === index;
              const shouldBlur = hoveredCard !== null && hoveredCard !== index;

              return (
                <motion.div 
                  key={highlight.label}
                  className={`text-center cursor-pointer p-4 relative border-2 ${
                    isDark 
                      ? 'bg-slate-800/80 border-slate-700/50' 
                      : 'bg-gray-100 border-slate-300/50'
                  }`}
                  style={{
                    borderRadius: '0.5rem',
                    transition: 'all 150ms ease-in-out',
                    transform: isCurrentlyHovered ? 'translateY(-4px)' : shouldBlur ? 'scale(0.95)' : 'none',
                    filter: shouldBlur ? 'blur(4px)' : 'none',
                    opacity: shouldBlur ? 0.7 : 1,
                    boxShadow: isCurrentlyHovered 
                      ? isDark 
                        ? '0 10px 25px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)' 
                        : '0 10px 25px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)'
                      : isDark 
                        ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)' 
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Icon container */}
                  <div
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 transition-all duration-150 border-2 ${
                      isDark 
                        ? `${highlight.bgDark} ${highlight.borderDark}`
                        : `${highlight.bgLight} ${highlight.borderLight}`
                    }`}
                  >
                    <highlight.icon className={`transition-all duration-150 ${
                      isDark ? highlight.textDark : highlight.textLight
                    }`} size={18} />
                  </div>
                  
                  {/* Value */}
                  <div className={`text-xl font-bold mb-1 transition-colors duration-150 ${
                    isDark ? highlight.textDark : highlight.textLight
                  }`}>
                    {highlight.value}
                  </div>
                  
                  {/* Label */}
                  <div className={`text-sm transition-colors duration-150 ${
                    isDark ? 'text-gray-400' : 'text-gray-700'
                  }`}>
                    {highlight.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}