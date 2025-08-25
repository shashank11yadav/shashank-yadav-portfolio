'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative inline-flex items-center w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #374151 0%, #1f2937 100%)' 
          : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Toggle track */}
      <div className="absolute inset-0 rounded-full shadow-inner" />
      
      {/* Toggle thumb */}
      <motion.div
        className="relative inline-block w-5 h-5 bg-white rounded-full shadow-lg transform transition-all duration-300 flex items-center justify-center"
        animate={{
          x: isDark ? 28 : 4,
          rotate: isDark ? 180 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        {/* Sun/Moon icons */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.5 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Sun rays */}
          <div className="relative">
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-1 bg-yellow-400 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transformOrigin: 'center 8px',
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg)`
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Moon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.5
          }}
          transition={{ duration: 0.2, delay: isDark ? 0.1 : 0 }}
        >
          <div className="relative">
            <div className="w-2.5 h-2.5 bg-slate-300 rounded-full" />
            {/* Moon crater */}
            <div className="absolute top-0.5 left-1 w-0.5 h-0.5 bg-slate-400 rounded-full opacity-60" />
            <div className="absolute top-1 right-0.5 w-0.5 h-0.5 bg-slate-400 rounded-full opacity-40" />
          </div>
        </motion.div>
      </motion.div>

      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isDark 
            ? '0 0 20px rgba(59, 130, 246, 0.3)' 
            : '0 0 20px rgba(251, 191, 36, 0.4)'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}