'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Folder, Star, Code, Zap } from 'lucide-react';
import { projects } from '@/data/portfolio';
import { Project } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  AnimatedWebsite, 
  AnimatedMobile, 
  AnimatedAI, 
  AnimatedGitHub 
} from '@/components/icons/AnimatedIcons';

const categories = ['all', 'web', 'mobile', 'ai'] as const;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative backdrop-blur-sm rounded-xl overflow-hidden border hover:border-cyan-400/50 transition-all duration-500 ${
        isDark 
          ? 'bg-slate-800/50 border-slate-700' 
          : 'bg-slate-100/60 border-slate-200'
      }`}
    >
        {/* Project image/preview */}
        <div className="relative h-48 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 overflow-hidden">
          {/* Animated background */}
          <div className={`absolute inset-0 transition-colors duration-300 ${
            isDark 
              ? 'bg-gradient-to-br from-slate-800 to-slate-900'
              : 'bg-gradient-to-br from-slate-100 to-slate-200'
          }`}>
            {/* Floating particles */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-4 left-4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="absolute top-8 right-6 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-300"></div>
              <div className="absolute bottom-6 left-8 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-500"></div>
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-700"></div>
            </div>
            
            {/* Main icon with enhanced animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ 
                  scale: isHovered ? 1.2 : 1,
                  rotate: isHovered ? 5 : 0
                }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="opacity-60">
                  {project.category === 'web' ? <AnimatedWebsite size={64} color="#06b6d4" /> : 
                   project.category === 'mobile' ? <AnimatedMobile size={64} color="#06b6d4" /> : 
                   project.category === 'ai' ? <AnimatedAI size={64} color="#06b6d4" /> : <AnimatedWebsite size={64} color="#06b6d4" />}
                </div>
                {/* Glowing ring effect */}
                {isHovered && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute inset-0 border-2 border-cyan-400/50 rounded-full animate-ping"
                  />
                )}
              </motion.div>
            </div>
          </div>
          
          {/* Enhanced Hover overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`absolute inset-0 flex flex-col items-center justify-center gap-4 ${
                  isDark 
                    ? 'bg-gradient-to-b from-black/40 via-black/60 to-black/80'
                    : 'bg-gradient-to-b from-white/60 via-white/70 to-white/80'
                }`}
              >
                {/* Ripple effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse"></div>
                
                {/* GitHub button with enhanced styling */}
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className={`relative z-10 flex items-center gap-2 px-6 py-3 rounded-full text-white transition-all duration-300 transform hover:scale-110 shadow-lg font-semibold ${
                      isDark 
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 hover:shadow-cyan-500/25'
                        : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 hover:shadow-cyan-600/25'
                    }`}
                  >
                    <AnimatedGitHub size={18} />
                    <span className="text-sm">View Code</span>
                  </motion.a>
                )}
                
                {/* Project info preview */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center px-4"
                >
                  <p className="text-xs text-gray-300 font-medium">
                    {project.technologies.slice(0, 3).join(' • ')}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              <Sparkles size={14} />
              Featured
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
              project.category === 'web' ? 
                isDark 
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30' 
                  : 'bg-blue-500/30 text-blue-700 border border-blue-500/50'
                :
              project.category === 'mobile' ? 
                isDark 
                  ? 'bg-green-500/20 text-green-400 border border-green-400/30' 
                  : 'bg-green-500/30 text-green-700 border border-green-500/50'
                :
              project.category === 'ai' ? 
                isDark 
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-400/30' 
                  : 'bg-purple-500/30 text-purple-700 border border-purple-500/50'
                :
                isDark 
                  ? 'bg-gray-500/20 text-gray-400 border border-gray-400/30'
                  : 'bg-gray-500/30 text-gray-700 border border-gray-500/50'
            }`}>
              {project.category}
            </span>
          </div>
        </div>

        {/* Project content */}
        <div className="p-6">
          <h3 className={`text-xl font-bold mb-2 transition-colors ${
            isDark ? 'group-hover:text-cyan-400' : 'group-hover:text-cyan-600'
          } ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {project.title}
          </h3>
          
          <p className={`mb-4 line-clamp-2 transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {project.description}
          </p>

          {/* Technologies with enhanced styling */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: techIndex * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`px-3 py-1 text-xs rounded-full border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 font-medium hover:shadow-lg hover:shadow-cyan-400/20 ${
                  isDark 
                    ? 'bg-gradient-to-r from-slate-700 to-slate-600 text-cyan-400'
                    : 'bg-gradient-to-r from-slate-100 to-slate-200 text-cyan-700'
                }`}
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 4 && (
              <span className={`px-3 py-1 text-xs rounded-full font-medium transition-colors duration-300 ${
                isDark 
                  ? 'bg-gradient-to-r from-slate-700 to-slate-600 text-gray-400'
                  : 'bg-gradient-to-r from-slate-100 to-slate-200 text-gray-600'
              }`}>
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>

          {/* Action button */}
          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300 text-sm transform hover:shadow-lg ${
                  isDark 
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 hover:shadow-cyan-500/25'
                    : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 hover:shadow-cyan-600/25'
                }`}
              >
                <AnimatedGitHub size={16} />
                View Code
              </a>
            )}
          </div>
        </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('all');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section 
      id="projects" 
      className={`py-20 px-6 transition-all duration-700 ${
        isDark ? 'relative bg-slate-900/30' : ''
      }`}
      style={{
        background: !isDark 
          ? 'linear-gradient(135deg, #f8fafc 0%, #ddd6fe 50%, #e0e7ff 100%)'
          : undefined
      }}
    >
      <div className="max-w-7xl mx-auto">
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
            Technical <span className="hover-effect-word">Projects</span>
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
            A showcase of my best work across different technologies and domains
          </p>
        </motion.div>

        {/* Featured projects showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <motion.h3 
              className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              ⭐ Featured Projects
            </motion.h3>
            <motion.p 
              className={`max-w-2xl mx-auto transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Highlighting my most impactful and innovative projects that showcase cutting-edge technologies and problem-solving skills
            </motion.p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Enhanced Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.button
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? isDark 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25'
                      : 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg shadow-cyan-600/25'
                    : isDark 
                      ? 'bg-slate-800/70 backdrop-blur-sm text-gray-300 hover:bg-slate-700 border border-slate-600 hover:border-cyan-400/50'
                      : 'bg-slate-100/70 backdrop-blur-sm text-gray-700 hover:bg-slate-200 border border-slate-300 hover:border-cyan-400/50'
                }`}
              >
                {/* Active indicator */}
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeCategory"
                    className={`absolute inset-0 rounded-full ${
                      isDark 
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500'
                        : 'bg-gradient-to-r from-cyan-600 to-purple-600'
                    }`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-lg">
                    {category === 'all' ? '🚀' :
                     category === 'web' ? '🌐' :
                     category === 'mobile' ? '📱' :
                     category === 'ai' ? '🤖' : '💻'}
                  </span>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  <span className="text-sm opacity-80 bg-black/20 px-2 py-0.5 rounded-full">
                    {category === 'all' ? projects.length : projects.filter(p => p.category === category).length}
                  </span>
                </span>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* All projects grid */}
        <AnimatePresence>
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Project stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className={`mt-16 backdrop-blur-sm rounded-2xl p-8 border transition-colors duration-300 ${
            isDark 
              ? 'bg-slate-800/30 border-slate-700' 
              : 'bg-slate-100/40 border-slate-300'
          }`}
        >
          <h3 className={`text-2xl font-bold mb-8 text-center transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>Project Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: projects.length, label: 'Total Projects', icon: Folder, color: 'cyan', bgLight: 'bg-cyan-50', bgDark: 'bg-cyan-500/10', borderLight: 'border-cyan-200', borderDark: 'border-cyan-400/30', textLight: 'text-cyan-700', textDark: 'text-cyan-400' },
              { value: featuredProjects.length, label: 'Featured', icon: Star, color: 'purple', bgLight: 'bg-purple-50', bgDark: 'bg-purple-500/10', borderLight: 'border-purple-200', borderDark: 'border-purple-400/30', textLight: 'text-purple-700', textDark: 'text-purple-400' },
              { value: [...new Set(projects.flatMap(p => p.technologies))].length, label: 'Technologies', icon: Code, color: 'green', bgLight: 'bg-emerald-50', bgDark: 'bg-emerald-500/10', borderLight: 'border-emerald-200', borderDark: 'border-emerald-400/30', textLight: 'text-emerald-700', textDark: 'text-emerald-400' },
              { value: '100%', label: 'Open Source', icon: Zap, color: 'yellow', bgLight: 'bg-amber-50', bgDark: 'bg-amber-500/10', borderLight: 'border-amber-200', borderDark: 'border-amber-400/30', textLight: 'text-amber-700', textDark: 'text-amber-400' }
            ].map((stat, index) => {
              const isCurrentlyHovered = hoveredCard === index;
              const shouldBlur = hoveredCard !== null && hoveredCard !== index;

              return (
                <motion.div 
                  key={stat.label}
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
                        ? `${stat.bgDark} ${stat.borderDark}`
                        : `${stat.bgLight} ${stat.borderLight}`
                    }`}
                  >
                    <stat.icon className={`transition-all duration-150 ${
                      isDark ? stat.textDark : stat.textLight
                    }`} size={18} />
                  </div>
                  
                  {/* Value */}
                  <div className={`text-xl font-bold mb-1 transition-colors duration-150 ${
                    isDark ? stat.textDark : stat.textLight
                  }`}>
                    {stat.value}
                  </div>
                  
                  {/* Label */}
                  <div className={`text-sm transition-colors duration-150 ${
                    isDark ? 'text-gray-400' : 'text-gray-700'
                  }`}>
                    {stat.label}
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