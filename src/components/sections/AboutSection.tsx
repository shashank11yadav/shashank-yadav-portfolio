'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
import { personalInfo } from '@/data/portfolio';
import { useTheme } from '@/contexts/ThemeContext';

export default function AboutSection() {
  const { isDark } = useTheme();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const handleTileMouseOver = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const tile = e.currentTarget;
    const circle = circleRefs.current[index];
    if (circle) {
      const rect = tile.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      circle.style.left = x + 'px';
      circle.style.top = y + 'px';
    }
  };

  const handleTileMouseOut = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const tile = e.currentTarget;
    const circle = circleRefs.current[index];
    if (circle) {
      const rect = tile.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      circle.style.left = x + 'px';
      circle.style.top = y + 'px';
    }
  };

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
    <section 
      id="about" 
      className="py-20 px-6 relative"
    >
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
              className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500'
                  : 'bg-gradient-to-r from-cyan-600 to-purple-600'
              }`}
            >
              About <span className="hover-effect-word">Me</span>
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
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className={`text-lg leading-relaxed transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {personalInfo.bio}
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className={`text-xl font-semibold transition-colors duration-300 ${
                isDark ? 'text-cyan-400' : 'text-cyan-600'
              }`}>What I Do</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <style jsx>{`
                  @keyframes shake {
                    25% {
                      transform: rotate(calc(var(--angle) * -1));
                    }
                    50% {
                      transform: rotate(var(--angle));
                    }
                    100% {
                      transform: rotate(0deg);
                    }
                  }

                  .hover-tile {
                    --width: 100%;
                    --time: 0.7s;

                    position: relative;
                    display: inline-block;
                    padding: 1em;
                    color: white;
                    background: ${isDark ? '#4a5568' : '#9ca3af'};
                    overflow: hidden;
                    border-radius: 8px;
                    text-decoration: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                  }

                  .hover-tile .tile-content {
                    position: relative;
                    z-index: 5;
                    transition: color var(--time);
                  }

                  .hover-tile:hover .tile-content {
                    color: ${isDark ? '#222' : '#374151'};
                  }

                  .hover-tile .circle-effect {
                    position: absolute;
                    display: block;
                    content: "";
                    z-index: 0;
                    width: 0;
                    height: 0;
                    border-radius: 100%;
                    background: ${isDark ? '#fff' : '#f8fafc'};
                    transform: translate(-50%, -50%);
                    transition: width var(--time), padding-top var(--time);
                  }

                  .hover-tile:hover .circle-effect {
                    width: calc(var(--width) * 2.25);
                    padding-top: calc(var(--width) * 2.25);
                  }

                  .hover-tile.purple {
                    background: ${isDark ? '#9f7aea' : '#b794f6'};
                  }

                  .hover-tile.purple .circle-effect {
                    background: ${isDark ? '#ddd6fe' : '#e9d5ff'};
                  }

                  .hover-tile.cyan {
                    background: ${isDark ? '#4fd1c7' : '#22d3ee'};
                  }

                  .hover-tile.cyan .circle-effect {
                    background: ${isDark ? '#cffafe' : '#e6fffa'};
                  }

                  .hover-tile.green {
                    background: ${isDark ? '#48bb78' : '#10b981'};
                  }

                  .hover-tile.green .circle-effect {
                    background: ${isDark ? '#d1fae5' : '#ecfdf5'};
                  }

                  .hover-tile.yellow {
                    background: ${isDark ? '#ed8936' : '#f6ad55'};
                  }

                  .hover-tile.yellow .circle-effect {
                    background: ${isDark ? '#fef3c7' : '#fffbeb'};
                  }

                  .animated {
                    --angle: 5deg;
                    animation: shake 0.3s;
                  }
                `}</style>

                <div 
                  className="hover-tile purple"
                  onMouseOver={(e) => handleTileMouseOver(e, 0)}
                  onMouseOut={(e) => handleTileMouseOut(e, 0)}
                >
                  <span className="circle-effect" ref={el => { circleRefs.current[0] = el; }}></span>
                  <div className="tile-content">
                    <h4 className="font-semibold mb-1 text-base">
                      🚀 Full-Stack Development
                    </h4>
                    <p className="text-xs opacity-90">
                      Building scalable web applications with modern frameworks
                    </p>
                  </div>
                </div>

                <div 
                  className="hover-tile cyan"
                  onMouseOver={(e) => handleTileMouseOver(e, 1)}
                  onMouseOut={(e) => handleTileMouseOut(e, 1)}
                >
                  <span className="circle-effect" ref={el => { circleRefs.current[1] = el; }}></span>
                  <div className="tile-content">
                    <h4 className="font-semibold mb-1 text-base">
                      🤖 AI/ML Solutions
                    </h4>
                    <p className="text-xs opacity-90">
                      Creating intelligent systems and machine learning models
                    </p>
                  </div>
                </div>

                <div 
                  className="hover-tile green"
                  onMouseOver={(e) => handleTileMouseOver(e, 2)}
                  onMouseOut={(e) => handleTileMouseOut(e, 2)}
                >
                  <span className="circle-effect" ref={el => { circleRefs.current[2] = el; }}></span>
                  <div className="tile-content">
                    <h4 className="font-semibold mb-1 text-base">
                      ☁️ Cloud Architecture
                    </h4>
                    <p className="text-xs opacity-90">
                      Designing and deploying cloud-native applications
                    </p>
                  </div>
                </div>

                <div 
                  className="hover-tile yellow"
                  onMouseOver={(e) => handleTileMouseOver(e, 3)}
                  onMouseOut={(e) => handleTileMouseOut(e, 3)}
                >
                  <span className="circle-effect" ref={el => { circleRefs.current[3] = el; }}></span>
                  <div className="tile-content">
                    <h4 className="font-semibold mb-1 text-base">
                      🎨 UI/UX Design
                    </h4>
                    <p className="text-xs opacity-90">
                      Creating beautiful and intuitive user experiences
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* Right side - Interactive stats */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-end">
              <div className="bird-button-container">
                <style jsx>{`
                  .bird-button-container {
                    position: relative;
                    display: inline-block;
                  }

                  .bird {
                    position: absolute;
                    top: -10px;
                    width: 32px;
                    height: 20px;
                    z-index: 10;
                    transition: all 0.4s ease;
                  }

                  .bird.bird-1 {
                    left: 20%;
                    transform: translateX(-50%) scale(2);
                  }

                  .bird.bird-2 {
                    left: 50%;
                    transform: translateX(-50%) scale(2);
                  }

                  .bird.bird-3 {
                    left: 80%;
                    transform: translateX(-50%) scale(2.0);
                  }

                  /* Bird body */
                  .bird::before {
                    content: '';
                    position: absolute;
                    top: 8px;
                    left: 8px;
                    width: 16px;
                    height: 12px;
                    background: ${isDark ? '#22d3ee' : '#06b6d4'};
                    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                    transition: all 0.4s ease;
                  }

                  /* Bird head */
                  .bird::after {
                    content: '';
                    position: absolute;
                    top: 6px;
                    left: 18px;
                    width: 10px;
                    height: 10px;
                    background: ${isDark ? '#22d3ee' : '#06b6d4'};
                    border-radius: 50%;
                    transition: all 0.4s ease;
                  }

                  /* Bird beak */
                  .bird-beak {
                    position: absolute;
                    top: 9px;
                    left: 26px;
                    width: 0;
                    height: 0;
                    border-top: 2px solid transparent;
                    border-bottom: 2px solid transparent;
                    border-left: 4px solid ${isDark ? '#fbbf24' : '#f59e0b'};
                    transition: all 0.4s ease;
                  }

                  /* Bird eye */
                  .bird-eye {
                    position: absolute;
                    top: 8px;
                    left: 23px;
                    width: 3px;
                    height: 3px;
                    background: ${isDark ? '#1f2937' : '#374151'};
                    border-radius: 50%;
                    transition: all 0.4s ease;
                  }

                  /* Bird wings - sitting position */
                  .bird-wing-left {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    width: 8px;
                    height: 6px;
                    background: ${isDark ? '#0891b2' : '#0284c7'};
                    border-radius: 50% 20% 80% 50%;
                    transform: rotate(-15deg);
                    transition: all 0.4s ease;
                  }

                  .bird-wing-right {
                    position: absolute;
                    top: 10px;
                    left: 14px;
                    width: 8px;
                    height: 6px;
                    background: ${isDark ? '#0891b2' : '#0284c7'};
                    border-radius: 20% 50% 50% 80%;
                    transform: rotate(15deg);
                    transition: all 0.4s ease;
                  }

                  /* Bird legs - sitting */
                  .bird-legs {
                    position: absolute;
                    top: 18px;
                    left: 14px;
                    width: 2px;
                    height: 4px;
                    background: ${isDark ? '#fbbf24' : '#f59e0b'};
                    transition: all 0.4s ease;
                  }

                  .bird-legs::after {
                    content: '';
                    position: absolute;
                    left: 2px;
                    top: 0;
                    width: 2px;
                    height: 4px;
                    background: ${isDark ? '#fbbf24' : '#f59e0b'};
                  }

                  /* Standing animation on hover */
                  .bird-button-container:hover .bird.bird-1 {
                    top: -25px;
                    transform: translateX(-50%) scale(2.0);
                    animation: birdStand 0.5s ease forwards;
                  }

                  .bird-button-container:hover .bird.bird-2 {
                    top: -25px;
                    transform: translateX(-50%) scale(2.0);
                    animation: birdStand 0.5s ease 0.1s forwards;
                  }

                  /* Bird 3 stays static - no hover animation */
                  .bird.bird-3 {
                    left: 80%;
                    transform: translateX(-50%) scale(2.0);
                  }

                  .bird-button-container:hover .bird::before {
                    transform: scaleY(1.2);
                  }

                  .bird-button-container:hover .bird-wing-left {
                    transform: rotate(-25deg) translateY(-2px);
                    animation: flapLeft 0.6s ease infinite;
                  }

                  .bird-button-container:hover .bird-wing-right {
                    transform: rotate(25deg) translateY(-2px);
                    animation: flapRight 0.6s ease infinite;
                  }

                  .bird-button-container:hover .bird-legs {
                    height: 8px;
                    top: 16px;
                  }

                  .bird-button-container:hover .bird-eye {
                    animation: birdBlink 2s ease infinite;
                  }

                  @keyframes birdStand {
                    0% {
                      transform: translateX(-50%) scale(2.0);
                    }
                    50% {
                      transform: translateX(-50%) scale(2.1) rotate(-5deg);
                    }
                    100% {
                      transform: translateX(-50%) scale(2.0) rotate(0deg);
                    }
                  }

                  @keyframes flapLeft {
                    0%, 100% {
                      transform: rotate(-25deg) translateY(-2px);
                    }
                    50% {
                      transform: rotate(-35deg) translateY(-4px);
                    }
                  }

                  @keyframes flapRight {
                    0%, 100% {
                      transform: rotate(25deg) translateY(-2px);
                    }
                    50% {
                      transform: rotate(35deg) translateY(-4px);
                    }
                  }

                  @keyframes birdBlink {
                    0%, 90%, 100% {
                      transform: scaleY(1);
                    }
                    95% {
                      transform: scaleY(0.1);
                    }
                  }

                  .animated-download-btn {
                    position: relative;
                    width: 200px;
                    height: 60px;
                    background: ${isDark 
                      ? 'linear-gradient(to right, #06b6d4, #8b5cf6)'
                      : 'linear-gradient(to right, #0891b2, #7c3aed)'
                    };
                    border: none;
                    border-radius: 12px;
                    cursor: pointer;
                    overflow: visible;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    margin-top: 20px;
                  }

                  .animated-download-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 30px ${isDark 
                      ? 'rgba(6, 182, 212, 0.4)'
                      : 'rgba(8, 145, 178, 0.4)'
                    };
                  }

                  .animated-download-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: ${isDark 
                      ? 'linear-gradient(to right, #22d3ee, #a855f7)'
                      : 'linear-gradient(to right, #06b6d4, #8b5cf6)'
                    };
                    opacity: 0;
                    border-radius: 12px;
                    transition: opacity 0.3s ease;
                  }

                  .animated-download-btn:hover::before {
                    opacity: 1;
                  }

                  .btn-content {
                    position: relative;
                    z-index: 1;
                    color: white;
                    font-weight: 600;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.3s ease;
                  }

                  .download-icon {
                    width: 16px;
                    height: 16px;
                    transition: transform 0.3s ease;
                  }

                  .animated-download-btn:hover .download-icon {
                    transform: translateY(2px);
                  }

                  .btn-text {
                    transition: all 0.3s ease;
                  }

                  .animated-download-btn:hover .btn-text {
                    transform: translateX(2px);
                  }
                `}</style>

                <div className="bird bird-1">
                  <div className="bird-beak"></div>
                  <div className="bird-eye"></div>
                  <div className="bird-wing-left"></div>
                  <div className="bird-wing-right"></div>
                  <div className="bird-legs"></div>
                </div>

                <div className="bird bird-2">
                  <div className="bird-beak"></div>
                  <div className="bird-eye"></div>
                  <div className="bird-wing-left"></div>
                  <div className="bird-wing-right"></div>
                  <div className="bird-legs"></div>
                </div>

                <div className="bird bird-3">
                  <div className="bird-beak"></div>
                  <div className="bird-eye"></div>
                  <div className="bird-wing-left"></div>
                  <div className="bird-wing-right"></div>
                  <div className="bird-legs"></div>
                </div>

                <a
                  href={personalInfo.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animated-download-btn"
                >
                  <div className="btn-content">
                    <span className="btn-text">Download Resume</span>
                    <svg className="download-icon" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                  </div>
                </a>
              </div>
            </motion.div>
            <div className={`backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 ${
              isDark 
                ? 'bg-slate-800/30 border border-slate-700' 
                : 'bg-slate-100/40 border border-slate-200'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 text-center transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent'
              }`}>
                Quick Stats
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                    isDark ? 'text-cyan-400' : 'text-cyan-600'
                  }`}>3.8</div>
                  <div className={`text-sm transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-700'
                  }`}>Master's GPA</div>
                </motion.div>
                
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                    isDark ? 'text-purple-400' : 'text-purple-500'
                  }`}>700+</div>
                  <div className={`text-sm transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-700'
                  }`}>LeetCode Problems</div>
                </motion.div>
                
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                    isDark ? 'text-green-400' : 'text-green-600'
                  }`}>35%</div>
                  <div className={`text-sm transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-700'
                  }`}>Performance Boost</div>
                </motion.div>
                
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                    isDark ? 'text-yellow-400' : 'text-yellow-600'
                  }`}>99.9%</div>
                  <div className={`text-sm transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-700'
                  }`}>System Uptime</div>
                </motion.div>
              </div>

              {/* Learning new things */}
              <div className={`mt-8 pt-6 border-t transition-colors duration-300 ${
                isDark ? 'border-slate-600' : 'border-slate-300'
              }`}>
                <h4 className={`text-lg font-semibold mb-4 text-center transition-colors duration-300 ${
                  isDark ? 'text-gray-200' : 'text-gray-800'
                }`}>Learning new things</h4>
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
                      className={`px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-sm rounded-full border border-cyan-400/30 hover:border-cyan-400/60 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 cursor-pointer ${
                        isDark ? 'text-white' : 'text-gray-800'
                      }`}
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