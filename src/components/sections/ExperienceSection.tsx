'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Calendar, Building } from 'lucide-react';
import { experiences } from '@/data/portfolio';

function ExperienceCard({ experience, index }: { experience: any; index: number }) {
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
        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center z-10">
          <Building size={20} className="text-white" />
        </div>
        {index < experiences.length && (
          <div className="w-0.5 h-24 bg-gradient-to-b from-cyan-500 to-purple-500 mt-4" />
        )}
      </div>

      {/* Experience card */}
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        className="flex-1 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{experience.title}</h3>
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <span className="font-semibold">{experience.company}</span>
              {experience.website && (
                <a
                  href={experience.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar size={16} />
            <span>{experience.period}</span>
          </div>
        </div>

        <p className="text-gray-300 mb-4 leading-relaxed">
          {experience.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech: string) => (
            <span
              key={tech}
              className="px-3 py-1 bg-slate-700 text-cyan-400 text-sm rounded-full border border-cyan-400/30"
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
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Experience Journey
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
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
          className="mt-16 bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Career Highlights</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-cyan-400 mb-2">25+</div>
              <div className="text-sm text-gray-400">LLM Providers</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-purple-400 mb-2">20GB</div>
              <div className="text-sm text-gray-400">Zero-Downtime Migration</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
              <div className="text-sm text-gray-400">System Uptime</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">25%</div>
              <div className="text-sm text-gray-400">Cost Reduction</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}