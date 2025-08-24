'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personalInfo } from '@/data/portfolio';

export default function AboutSection() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left side - Text content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
            >
              About Me
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-300 leading-relaxed"
            >
              {personalInfo.bio}
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-semibold text-cyan-400">What I Do</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <motion.div 
                  className="group p-4 bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-700 hover:border-purple-400/50 hover:bg-slate-700/50 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.h4 
                    className="font-semibold text-purple-400 mb-2 group-hover:text-purple-300 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    🚀 Full-Stack Development
                  </motion.h4>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Building scalable web applications with modern frameworks</p>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  </div>
                </motion.div>
                <motion.div 
                  className="group p-4 bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-700 hover:border-cyan-400/50 hover:bg-slate-700/50 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.h4 
                    className="font-semibold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    🤖 AI/ML Solutions
                  </motion.h4>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Creating intelligent systems and machine learning models</p>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  </div>
                </motion.div>
                <motion.div 
                  className="group p-4 bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-700 hover:border-green-400/50 hover:bg-slate-700/50 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.h4 
                    className="font-semibold text-green-400 mb-2 group-hover:text-green-300 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    ☁️ Cloud Architecture
                  </motion.h4>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Designing and deploying cloud-native applications</p>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </motion.div>
                <motion.div 
                  className="group p-4 bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-700 hover:border-yellow-400/50 hover:bg-slate-700/50 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.h4 
                    className="font-semibold text-yellow-400 mb-2 group-hover:text-yellow-300 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    🎨 UI/UX Design
                  </motion.h4>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Creating beautiful and intuitive user experiences</p>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </motion.div>

          {/* Right side - Interactive stats */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-end">
              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 transform hover:scale-105"
              >
                📄 Download Resume
              </a>
            </motion.div>
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Quick Stats
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold text-cyan-400 mb-2">3.8</div>
                  <div className="text-sm text-gray-400">Master's GPA</div>
                </motion.div>
                
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold text-purple-400 mb-2">700+</div>
                  <div className="text-sm text-gray-400">LeetCode Problems</div>
                </motion.div>
                
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold text-green-400 mb-2">35%</div>
                  <div className="text-sm text-gray-400">Performance Boost</div>
                </motion.div>
                
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold text-yellow-400 mb-2">99.9%</div>
                  <div className="text-sm text-gray-400">System Uptime</div>
                </motion.div>
              </div>

              {/* Learning new things */}
              <div className="mt-8 pt-6 border-t border-slate-600">
                <h4 className="text-lg font-semibold mb-4 text-center">Learning new things</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['WebAssembly', 'Retrieval-Augmented Generation', 'Kubernetes', 'Vector Databases', 'LangChain'].map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.1, 
                        y: -2,
                        boxShadow: "0 4px 20px rgba(6, 182, 212, 0.3)"
                      }}
                      className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-sm rounded-full border border-cyan-400/30 hover:border-cyan-400/60 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 cursor-pointer"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}