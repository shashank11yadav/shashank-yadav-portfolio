'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface TerminalTextProps {
  lines: string[];
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export default function TerminalText({ 
  lines, 
  speed = 50, 
  className = '', 
  onComplete 
}: TerminalTextProps) {
  const { isDark } = useTheme();
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const currentLine = lines[currentLineIndex];
    const targetText = currentLine;

    if (currentText.length < targetText.length) {
      const timer = setTimeout(() => {
        setCurrentText(targetText.slice(0, currentText.length + 1));
      }, speed);

      return () => clearTimeout(timer);
    } else {
      // Move to next line after a pause
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentText('');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentText, currentLineIndex, lines, speed, onComplete]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className={`font-mono transition-colors duration-300 ${isDark ? 'text-green-400' : 'text-green-400'} ${className}`}>
      {lines.slice(0, currentLineIndex).map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-2"
        >
          <span className={`transition-colors duration-300 ${
            isDark ? 'text-gray-500' : 'text-gray-200'
          }`}>$ </span>
          {line}
        </motion.div>
      ))}
      
      {currentLineIndex < lines.length && (
        <div className="mb-2">
          <span className={`transition-colors duration-300 ${
            isDark ? 'text-gray-500' : 'text-gray-200'
          }`}>$ </span>
          {currentText}
          {showCursor && <span className="animate-pulse">|</span>}
        </div>
      )}
      
      {isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-4 transition-colors duration-300 ${
            isDark ? 'text-cyan-300' : 'text-cyan-400'
          }`}
        >
          <span className={`transition-colors duration-300 ${
            isDark ? 'text-gray-500' : 'text-gray-200'
          }`}>$ </span>
          Welcome to my portfolio! 🚀
          {showCursor && <span className="animate-pulse">|</span>}
        </motion.div>
      )}
    </div>
  );
}