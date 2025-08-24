'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface AnimatedIconProps {
  size?: number;
  color?: string;
  className?: string;
  animate?: boolean;
}

// Social Media Icons
export const AnimatedGitHub = ({ size = 24, color = "currentColor", className = "", animate = true }: AnimatedIconProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.path
        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"
        fill={color}
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      {isHovered && (
        <motion.circle
          cx="12"
          cy="12"
          r="11"
          stroke={color}
          strokeWidth="1"
          fill="none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.svg>
  );
};

export const AnimatedLinkedIn = ({ size = 24, color = "currentColor", className = "", animate = true }: AnimatedIconProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="4"
        stroke={color}
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.path
        d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 00-4 0"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
      />
      {isHovered && (
        <motion.path
          d="M12 16v-5M16 16v-3a2 2 0 00-4 0"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.svg>
  );
};

export const AnimatedTwitter = ({ size = 24, color = "currentColor", className = "", animate = true }: AnimatedIconProps) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.path
        d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />
      <motion.circle
        cx="18"
        cy="6"
        r="2"
        fill={color}
        initial={{ scale: 0 }}
        animate={animate ? { scale: [0, 1.2, 1] } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
      />
    </motion.svg>
  );
};

export const AnimatedMail = ({ size = 24, color = "currentColor", className = "", animate = true }: AnimatedIconProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="2"
        stroke={color}
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <motion.path
        d="M22 7l-10 5L2 7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
      />
      {isHovered && (
        <motion.circle
          cx="12"
          cy="12"
          r="2"
          fill={color}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{ duration: 0.4 }}
        />
      )}
    </motion.svg>
  );
};

export const AnimatedInstagram = ({ size = 24, color = "currentColor", className = "", animate = true }: AnimatedIconProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="6"
        stroke={color}
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.circle
        cx="12"
        cy="12"
        r="4"
        stroke={color}
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
      />
      <motion.circle
        cx="18"
        cy="6"
        r="1"
        fill={color}
        initial={{ scale: 0 }}
        animate={animate ? { scale: [0, 1.5, 1] } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
      />
      {isHovered && (
        <motion.circle
          cx="12"
          cy="12"
          r="2"
          fill={color}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.4 }}
        />
      )}
    </motion.svg>
  );
};

// Skill Category Icons
export const AnimatedCode = ({ size = 24, color = "currentColor", className = "", animate = true }: AnimatedIconProps) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.path
        d="M16 18l6-6-6-6M8 6l-6 6 6 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.path
        d="M12 2l-2 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
      />
    </motion.svg>
  );
};

export const AnimatedDatabase = ({ size = 24, color = "currentColor", className = "", animate = true }: AnimatedIconProps) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.ellipse
        cx="12"
        cy="5"
        rx="9"
        ry="3"
        stroke={color}
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <motion.path
        d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"
        stroke={color}
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
      />
      <motion.path
        d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"
        stroke={color}
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
      />
    </motion.svg>
  );
};

export const AnimatedCloud = ({ size = 24, color = "currentColor", className = "", animate = true }: AnimatedIconProps) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      whileHover={{ scale: 1.1, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.path
        d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.circle
        cx="12"
        cy="15"
        r="1"
        fill={color}
        initial={{ scale: 0, opacity: 0 }}
        animate={animate ? { scale: [0, 1.5, 1], opacity: [0, 1, 1] } : {}}
        transition={{ duration: 0.5, delay: 1.5, repeat: Infinity, repeatDelay: 2 }}
      />
    </motion.svg>
  );
};

export const AnimatedMobile = ({ size = 24, color = "currentColor", className = "", animate = true }: AnimatedIconProps) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      whileHover={{ scale: 1.1, rotate: 2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.rect
        x="5"
        y="2"
        width="14"
        height="20"
        rx="2"
        ry="2"
        stroke={color}
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      <motion.path
        d="M12 18h.01"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: [0, 1, 0, 1] } : {}}
        transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 1 }}
      />
    </motion.svg>
  );
};

// Navigation Icons
export const AnimatedMenu = ({ size = 24, color = "currentColor", className = "", animate = true }: AnimatedIconProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      onClick={() => setIsOpen(!isOpen)}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.path
        d="M3 12h18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      <motion.path
        d="M3 6h18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: animate ? 1 : 0,
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 6 : 0,
        }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
      />
      <motion.path
        d="M3 18h18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: animate ? 1 : 0,
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -6 : 0,
        }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
      />
    </motion.svg>
  );
};

export const AnimatedArrowDown = ({ size = 24, color = "currentColor", className = "", animate = true }: AnimatedIconProps) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      whileHover={{ scale: 1.1 }}
      animate={animate ? { y: [0, 5, 0] } : {}}
      transition={{
        y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
        hover: { type: "spring", stiffness: 300, damping: 20 }
      }}
    >
      <motion.path
        d="M7 13l5 5 5-5M7 6l5 5 5-5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </motion.svg>
  );
};

// Project Type Icons
export const AnimatedWebsite = ({ size = 24, color = "currentColor", className = "", animate = true }: AnimatedIconProps) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.path
        d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
        stroke={color}
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
      />
    </motion.svg>
  );
};

export const AnimatedAI = ({ size = 24, color = "currentColor", className = "", animate = true }: AnimatedIconProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Main processor chip outline */}
      <motion.rect
        x="6"
        y="6"
        width="12"
        height="12"
        rx="2"
        stroke={color}
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      
      {/* Inner circuit pattern */}
      <motion.rect
        x="8"
        y="8"
        width="8"
        height="8"
        rx="1"
        stroke={color}
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      />
      
      {/* Central processing core */}
      <motion.circle
        cx="12"
        cy="12"
        r="2"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.6 }}
      />
      
      {/* AI "eyes" - two processing units */}
      <motion.circle
        cx="10"
        cy="11"
        r="0.8"
        fill={color}
        initial={{ scale: 0, opacity: 0 }}
        animate={animate ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.4 }}
      />
      <motion.circle
        cx="14"
        cy="11"
        r="0.8"
        fill={color}
        initial={{ scale: 0, opacity: 0 }}
        animate={animate ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.4 }}
      />
      
      {/* Circuit pins on left side */}
      <motion.rect
        x="2"
        y="8"
        width="4"
        height="1.5"
        fill={color}
        initial={{ scaleX: 0 }}
        animate={animate ? { scaleX: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.3 }}
      />
      <motion.rect
        x="2"
        y="10.5"
        width="4"
        height="1.5"
        fill={color}
        initial={{ scaleX: 0 }}
        animate={animate ? { scaleX: 1 } : {}}
        transition={{ delay: 0.9, duration: 0.3 }}
      />
      <motion.rect
        x="2"
        y="13"
        width="4"
        height="1.5"
        fill={color}
        initial={{ scaleX: 0 }}
        animate={animate ? { scaleX: 1 } : {}}
        transition={{ delay: 1.0, duration: 0.3 }}
      />
      
      {/* Circuit pins on right side */}
      <motion.rect
        x="18"
        y="8"
        width="4"
        height="1.5"
        fill={color}
        initial={{ scaleX: 0 }}
        animate={animate ? { scaleX: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.3 }}
      />
      <motion.rect
        x="18"
        y="10.5"
        width="4"
        height="1.5"
        fill={color}
        initial={{ scaleX: 0 }}
        animate={animate ? { scaleX: 1 } : {}}
        transition={{ delay: 0.9, duration: 0.3 }}
      />
      <motion.rect
        x="18"
        y="13"
        width="4"
        height="1.5"
        fill={color}
        initial={{ scaleX: 0 }}
        animate={animate ? { scaleX: 1 } : {}}
        transition={{ delay: 1.0, duration: 0.3 }}
      />
      
      {/* Data flow animation on hover */}
      {isHovered && (
        <>
          <motion.path
            d="M10 12 Q8 12, 6 12"
            stroke={color}
            strokeWidth="2"
            fill="none"
            strokeDasharray="2,2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "loop" }}
          />
          <motion.path
            d="M14 12 Q16 12, 18 12"
            stroke={color}
            strokeWidth="2"
            fill="none"
            strokeDasharray="2,2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "loop", delay: 0.2 }}
          />
          <motion.circle
            cx="12"
            cy="12"
            r="3"
            stroke={color}
            strokeWidth="1"
            fill="none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </>
      )}
    </motion.svg>
  );
};

export const AnimatedTools = ({ size = 24, color = "currentColor", className = "", animate = true }: AnimatedIconProps) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.path
        d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.77 3.77z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.svg>
  );
};

export default {
  AnimatedGitHub,
  AnimatedLinkedIn,
  AnimatedTwitter,
  AnimatedInstagram,
  AnimatedMail,
  AnimatedCode,
  AnimatedDatabase,
  AnimatedCloud,
  AnimatedMobile,
  AnimatedMenu,
  AnimatedArrowDown,
  AnimatedWebsite,
  AnimatedAI,
  AnimatedTools,
};