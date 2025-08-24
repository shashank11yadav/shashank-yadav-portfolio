'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { skills } from '@/data/portfolio';
import { Skill } from '@/types';
import SkillSphere from '@/components/3d/SkillSphere';
import { 
  AnimatedCode, 
  AnimatedDatabase, 
  AnimatedCloud, 
  AnimatedMobile, 
  AnimatedAI, 
  AnimatedTools
} from '@/components/icons/AnimatedIcons';

const categories = ['all', 'frontend', 'backend', 'mobile', 'ai', 'database', 'cloud', 'tools', 'other'] as const;

const getCategoryIcon = (category: string) => {
  const iconProps = { size: 18, color: "currentColor", animate: true };
  
  switch (category) {
    case 'frontend':
    case 'backend':
      return <AnimatedCode {...iconProps} />;
    case 'database':
      return <AnimatedDatabase {...iconProps} />;
    case 'cloud':
      return <AnimatedCloud {...iconProps} />;
    case 'mobile':
      return <AnimatedMobile {...iconProps} />;
    case 'ai':
      return <AnimatedAI {...iconProps} />;
    case 'tools':
    case 'other':
      return <AnimatedTools {...iconProps} />;
    default:
      return null;
  }
};

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{skill.icon}</span>
          <span className="font-semibold text-white">{skill.name}</span>
        </div>
        <span className="text-sm text-cyan-400 font-semibold">{skill.level}%</span>
      </div>
      
      {/* Skill level bar */}
      <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
        />
      </div>
      
      {/* Category badge */}
      {/* <div className="mt-3">
        <span className={`px-2 py-1 text-xs rounded-full ${
          skill.category === 'frontend' ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30' :
          skill.category === 'backend' ? 'bg-green-500/20 text-green-400 border border-green-400/30' :
          skill.category === 'ai' ? 'bg-purple-500/20 text-purple-400 border border-purple-400/30' :
          skill.category === 'mobile' ? 'bg-pink-500/20 text-pink-400 border border-pink-400/30' :
          skill.category === 'database' ? 'bg-orange-500/20 text-orange-400 border border-orange-400/30' :
          skill.category === 'cloud' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' :
          skill.category === 'tools' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30' :
          'bg-gray-500/20 text-gray-400 border border-gray-400/30'
        }`}>
          {skill.category}
        </span>
      </div> */}
    </motion.div>
  );
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('all');
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'sphere'>('grid');
  const [randomizedSkills, setRandomizedSkills] = useState<Skill[]>([]);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    setRandomizedSkills([...skills].sort(() => Math.random() - 0.5));
  }, []);

  const filteredSkills = activeCategory === 'all' 
    ? randomizedSkills.length > 0 ? randomizedSkills : skills
    : skills.filter(skill => skill.category === activeCategory);

  const skillsPerRow = 3;
  const defaultRows = 2;
  const defaultSkillsCount = skillsPerRow * defaultRows;
  const visibleSkills = isExpanded ? filteredSkills : filteredSkills.slice(0, defaultSkillsCount);
  const hasMoreSkills = filteredSkills.length > defaultSkillsCount;

  return (
    <section id="skills" className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
            <div className="mb-4 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                Skills & Technologies
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl">
                A comprehensive toolkit for building modern, scalable applications
              </p>
            </div>
            
            {/* View Toggle Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-2 border border-slate-600 flex">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 text-sm ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <span className="text-base">📊</span>
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('sphere')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ml-2 text-sm ${
                    viewMode === 'sphere'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <span className="text-base">🌐</span>
                  3D
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Category Filter - only show in grid view */}
        {viewMode === 'grid' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-600'
                }`}
              >
                {getCategoryIcon(category)}
                <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Conditional View Rendering */}
        {viewMode === 'sphere' ? (
          /* 3D Skills Visualization */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-12"
          >
            <div className="bg-slate-800/20 backdrop-blur-sm rounded-2xl border border-slate-700 p-4">
              <SkillSphere />
            </div>
          </motion.div>
        ) : (
          <>
            {/* Skills Grid - Traditional View */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visibleSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </motion.div>

            {/* Expand/Collapse Button */}
            {hasMoreSkills && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex justify-center mt-8"
              >
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm rounded-xl border border-slate-600 hover:border-cyan-400/50 transition-all duration-300 text-gray-300 hover:text-cyan-400"
                >
                  {isExpanded ? (
                    <>
                      <span>Show Less</span>
                      <ChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      <span>Show More ({filteredSkills.length - defaultSkillsCount} more)</span>
                      <ChevronDown size={20} />
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </>
        )}

        {/* Core Expertise */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700"
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-white">
            Technical Proficiency
          </h3>

          {/* Skill Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {skills.filter(s => s.level >= 90).length}
              </div>
              <div className="text-sm text-gray-400">Expert (90%+)</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {skills.filter(s => s.level >= 80 && s.level < 90).length}
              </div>
              <div className="text-sm text-gray-400">Advanced (80%+)</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-green-400 mb-2">
                {[...new Set(skills.map(s => s.category))].length}
              </div>
              <div className="text-sm text-gray-400">Categories</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {skills.length}
              </div>
              <div className="text-sm text-gray-400">Total Skills</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}