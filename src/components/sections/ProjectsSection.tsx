'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles } from 'lucide-react';
import { projects } from '@/data/portfolio';
import { Project } from '@/types';
import { 
  AnimatedWebsite, 
  AnimatedMobile, 
  AnimatedAI, 
  AnimatedGitHub 
} from '@/components/icons/AnimatedIcons';

const categories = ['all', 'web', 'mobile', 'ai'] as const;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-400/50 transition-all duration-500"
    >
        {/* Project image/preview */}
        <div className="relative h-48 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
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
                className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 flex flex-col items-center justify-center gap-4"
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
                    className="relative z-10 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-cyan-500/25 font-semibold"
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
              project.category === 'web' ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30' :
              project.category === 'mobile' ? 'bg-green-500/20 text-green-400 border border-green-400/30' :
              project.category === 'ai' ? 'bg-purple-500/20 text-purple-400 border border-purple-400/30' :
              'bg-gray-500/20 text-gray-400 border border-gray-400/30'
            }`}>
              {project.category}
            </span>
          </div>
        </div>

        {/* Project content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-gray-300 mb-4 line-clamp-2">
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
                className="px-3 py-1 bg-gradient-to-r from-slate-700 to-slate-600 text-cyan-400 text-xs rounded-full border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 font-medium hover:shadow-lg hover:shadow-cyan-400/20"
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-3 py-1 bg-gradient-to-r from-slate-700 to-slate-600 text-gray-400 text-xs rounded-full font-medium">
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
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold hover:from-cyan-400 hover:to-purple-400 hover:scale-105 transition-all duration-300 text-sm transform hover:shadow-lg hover:shadow-cyan-500/25"
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
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('all');
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="projects" className="py-20 px-6 bg-slate-900/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
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
              className="text-gray-400 max-w-2xl mx-auto"
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
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-800/70 backdrop-blur-sm text-gray-300 hover:bg-slate-700 border border-slate-600 hover:border-cyan-400/50'
                }`}
              >
                {/* Active indicator */}
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
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
          className="mt-16 bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700"
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-white">Project Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-cyan-400 mb-2">{projects.length}</div>
              <div className="text-sm text-gray-400">Total Projects</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-purple-400 mb-2">{featuredProjects.length}</div>
              <div className="text-sm text-gray-400">Featured</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-green-400 mb-2">
                {[...new Set(projects.flatMap(p => p.technologies))].length}
              </div>
              <div className="text-sm text-gray-400">Technologies</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">100%</div>
              <div className="text-sm text-gray-400">Open Source</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}