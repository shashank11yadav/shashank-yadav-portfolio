'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Calendar, Building } from 'lucide-react';
import { experiences } from '@/data/portfolio';
import { useTheme } from '@/contexts/ThemeContext';

function ExperienceCard({ experience, index }: { experience: any; index: number }) {
  const { isDark } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      className={`flex gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Timeline connector */}
      <div className="flex flex-col items-center">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
          isDark 
            ? 'bg-gradient-to-r from-cyan-500 to-purple-500'
            : 'bg-gradient-to-r from-cyan-600 to-purple-600'
        }`}>
          <Building size={20} className="text-white" />
        </div>
        {index < experiences.length && (
          <div className="w-0.5 h-24 bg-gradient-to-b from-cyan-500 to-purple-500 mt-4" />
        )}
      </div>

      {/* Experience card */}
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        className={`flex-1 backdrop-blur-sm rounded-xl p-6 border hover:border-cyan-400/50 transition-all duration-300 ${
          isDark 
            ? 'bg-slate-800/50 border-slate-700' 
            : 'bg-white/80 border-slate-200'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h3 className={`text-xl font-bold mb-1 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>{experience.title}</h3>
            <div className={`flex items-center gap-2 mb-2 transition-colors duration-300 ${
              isDark ? 'text-cyan-400' : 'text-cyan-600'
            }`}>
              <span className="font-semibold">{experience.company}</span>
              {experience.website && (
                <a
                  href={experience.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors ${
                    isDark ? 'hover:text-cyan-300' : 'hover:text-cyan-700'
                  }`}
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
          <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <Calendar size={16} />
            <span>{experience.period}</span>
          </div>
        </div>

        <p className={`mb-4 leading-relaxed transition-colors duration-300 ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {experience.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech: string) => (
            <span
              key={tech}
              className={`px-3 py-1 text-sm rounded-full border border-cyan-400/30 transition-colors duration-300 ${
                isDark 
                  ? 'bg-slate-700 text-cyan-400'
                  : 'bg-slate-100 text-cyan-600'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const { isDark } = useTheme();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section 
      id="experience" 
      className={`py-20 px-6 transition-all duration-700 ${
        isDark ? 'relative bg-slate-900/40' : ''
      }`}
      style={{
        background: !isDark 
          ? 'linear-gradient(135deg, #f8fafc 0%, #ddd6fe 50%, #e0e7ff 100%)'
          : undefined
      }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent mb-4 ${
            isDark 
              ? 'bg-gradient-to-r from-cyan-400 to-purple-500'
              : 'bg-gradient-to-r from-cyan-600 to-purple-600'
          }`}>
            Experience Journey
          </h2>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            My professional journey through different roles and organizations
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>

        {/* Career highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className={`mt-16 backdrop-blur-sm rounded-2xl p-8 border transition-colors duration-300 ${
            isDark 
              ? 'bg-slate-800/30 border-slate-700'
              : 'bg-slate-100/50 border-slate-200'
          }`}
        >
          <h3 className={`text-2xl font-bold mb-6 text-center transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>Career Highlights</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                isDark ? 'text-cyan-400' : 'text-cyan-600'
              }`}>25+</div>
              <div className={`text-sm transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-700'
              }`}>LLM Providers</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                isDark ? 'text-purple-400' : 'text-purple-500'
              }`}>20GB</div>
              <div className={`text-sm transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-700'
              }`}>Zero-Downtime Migration</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                isDark ? 'text-green-400' : 'text-green-600'
              }`}>99.9%</div>
              <div className={`text-sm transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-700'
              }`}>System Uptime</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                isDark ? 'text-yellow-400' : 'text-yellow-600'
              }`}>25%</div>
              <div className={`text-sm transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-700'
              }`}>Cost Reduction</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}