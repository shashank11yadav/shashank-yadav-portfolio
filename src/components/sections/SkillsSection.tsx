'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, ChevronUp, Layers, Award, Target, TrendingUp } from 'lucide-react';
import { skills } from '@/data/portfolio';
import { Skill } from '@/types';
import SkillSphere from '@/components/3d/SkillSphere';
import { useTheme } from '@/contexts/ThemeContext';
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
  const { isDark } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`backdrop-blur-sm rounded-xl p-6 border hover:border-cyan-400/50 transition-all duration-300 ${
        isDark 
          ? 'bg-slate-800/50 border-slate-700' 
          : 'bg-slate-100/60 border-slate-200'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{skill.icon}</span>
          <span className={`font-semibold transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-700'
          }`}>{skill.name}</span>
        </div>
        <span className={`text-sm font-semibold transition-colors duration-300 ${
          isDark ? 'text-cyan-400' : 'text-cyan-600'
        }`}>{skill.level}%</span>
      </div>
      
      {/* Skill level bar */}
      <div className={`w-full rounded-full h-2 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-slate-700' : 'bg-slate-300'
      }`}>
        <motion.div
          className={`h-full rounded-full ${
            isDark 
              ? 'bg-gradient-to-r from-cyan-400 to-purple-500'
              : 'bg-gradient-to-r from-cyan-600 to-purple-600'
          }`}
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
          skill.category === 'ai' ? `bg-purple-500/20 border border-purple-400/30 ${
            isDark ? 'text-purple-400' : 'text-purple-500'
          }` :
          skill.category === 'mobile' ? 'bg-pink-500/20 text-pink-400 border border-pink-400/30' :
          skill.category === 'database' ? 'bg-orange-500/20 text-orange-400 border border-orange-400/30' :
          skill.category === 'cloud' ? `bg-cyan-500/20 border border-cyan-400/30 ${
            isDark ? 'text-cyan-400' : 'text-cyan-600'
          }` :
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
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('all');
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'sphere'>('grid');
  const [randomizedSkills, setRandomizedSkills] = useState<Skill[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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
    <section 
      id="skills" 
      className={`py-20 px-6 transition-all duration-700 ${
        isDark ? 'relative bg-slate-900/50' : ''
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
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
            <div className="mb-4 md:mb-0">
              <h2 className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent mb-2 ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500'
                  : 'bg-gradient-to-r from-cyan-600 to-purple-600'
              }`}>
                Skills & <span className="hover-effect-word">Technologies</span>
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
              <p className={`text-lg max-w-2xl transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                A comprehensive toolkit for building modern, scalable applications
              </p>
            </div>
            
            {/* View Toggle Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className={`backdrop-blur-sm rounded-xl p-2 border flex transition-colors duration-300 ${
                isDark 
                  ? 'bg-slate-800/50 border-slate-600' 
                  : 'bg-slate-100/60 border-slate-300'
              }`}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 text-sm ${
                    viewMode === 'grid'
                      ? isDark 
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                        : 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg'
                      : isDark 
                        ? 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-slate-300/70 cursor-pointer'
                  }`}
                >
                  <span className="text-base">📊</span>
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('sphere')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ml-2 text-sm ${
                    viewMode === 'sphere'
                      ? isDark 
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                        : 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg'
                      : isDark 
                        ? 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-slate-300/70 cursor-pointer'
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
                    ? isDark 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white'
                    : isDark 
                      ? 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-600'
                      : 'bg-slate-100 text-gray-700 hover:bg-slate-200 border border-slate-300'
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
            <div className={`backdrop-blur-sm rounded-2xl border p-4 transition-colors duration-300 ${
              isDark 
                ? 'bg-slate-800/20 border-slate-700' 
                : 'bg-slate-100/30 border-slate-300'
            }`}>
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
                  className={`flex items-center gap-2 px-6 py-3 backdrop-blur-sm rounded-xl border hover:border-cyan-400/50 transition-all duration-300 ${
                    isDark ? 'hover:text-cyan-400' : 'hover:text-cyan-600'
                  } ${
                    isDark 
                      ? 'bg-slate-800/50 hover:bg-slate-700/50 border-slate-600 text-gray-300'
                      : 'bg-slate-100/50 hover:bg-slate-200/50 border-slate-300 text-gray-600'
                  }`}
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
          className={`mt-16 backdrop-blur-sm rounded-2xl p-8 border transition-colors duration-300 ${
            isDark 
              ? 'bg-slate-800/30 border-slate-700' 
              : 'bg-slate-100/40 border-slate-300'
          }`}
        >
          <h3 className={`text-2xl font-bold mb-8 text-center transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            Technical Proficiency
          </h3>

          {/* Skill Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: skills.filter(s => s.level >= 90).length, label: 'Expert (90%+)', icon: Award, color: 'cyan', bgLight: 'bg-cyan-50', bgDark: 'bg-cyan-500/10', borderLight: 'border-cyan-200', borderDark: 'border-cyan-400/30', textLight: 'text-cyan-700', textDark: 'text-cyan-400' },
              { value: skills.filter(s => s.level >= 80 && s.level < 90).length, label: 'Advanced (80%+)', icon: TrendingUp, color: 'purple', bgLight: 'bg-purple-50', bgDark: 'bg-purple-500/10', borderLight: 'border-purple-200', borderDark: 'border-purple-400/30', textLight: 'text-purple-700', textDark: 'text-purple-400' },
              { value: [...new Set(skills.map(s => s.category))].length, label: 'Categories', icon: Layers, color: 'green', bgLight: 'bg-emerald-50', bgDark: 'bg-emerald-500/10', borderLight: 'border-emerald-200', borderDark: 'border-emerald-400/30', textLight: 'text-emerald-700', textDark: 'text-emerald-400' },
              { value: skills.length, label: 'Total Skills', icon: Target, color: 'yellow', bgLight: 'bg-amber-50', bgDark: 'bg-amber-500/10', borderLight: 'border-amber-200', borderDark: 'border-amber-400/30', textLight: 'text-amber-700', textDark: 'text-amber-400' }
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