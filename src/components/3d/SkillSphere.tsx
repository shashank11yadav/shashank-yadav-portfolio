'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { skills } from '@/data/portfolio';
import { useTheme } from '@/contexts/ThemeContext';

interface SkillNodeProps {
  skill: typeof skills[0];
  position: [number, number, number];
  onHover: (skill: typeof skills[0] | null) => void;
  isDark: boolean;
}

function SkillNode({ skill, position, onHover, isDark }: SkillNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      const scale = hovered ? 1.2 : 1;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, scale, 0.1));
    }
    
    // Make text face the camera
    if (textRef.current) {
      textRef.current.lookAt(camera.position);
    }
  });

  const color = useMemo(() => {
    if (skill.level >= 90) return isDark ? '#06b6d4' : '#0891b2'; // Cyan for expert
    if (skill.level >= 80) return isDark ? '#8b5cf6' : '#7c3aed'; // Purple for advanced
    return isDark ? '#64748b' : '#475569'; // Gray for others
  }, [skill.level, isDark]);

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => {
          setHovered(true);
          onHover(skill);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
        }}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={hovered ? 0.5 : 0.4}
          emissive={color}
          emissiveIntensity={hovered ? 0.7 : 0.6}
        />
      </mesh>
      <Text
        ref={textRef}
        position={[0, 0, 0]}
        fontSize={0.12}
        color={isDark ? "white" : "#1f2937"}
        anchorX="center"
        anchorY="middle"
        maxWidth={1.2}
      >
        {skill.name}
      </Text>
    </group>
  );
}

interface SkillSphereProps {
  className?: string;
}

export default function SkillSphere({ className = "" }: SkillSphereProps) {
  const { isDark } = useTheme();
  const [hoveredSkill, setHoveredSkill] = useState<typeof skills[0] | null>(null);
  
  const allSkills = useMemo(() => {
    return skills.sort((a, b) => b.level - a.level);
  }, []);

  const skillPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const radius = 4;
    
    allSkills.forEach((_, index) => {
      const phi = Math.acos(1 - 2 * (index + 0.5) / allSkills.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions.push([x, y, z]);
    });
    
    return positions;
  }, [allSkills]);

  return (
    <div className={`relative w-full h-[700px] ${className}`}>
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ 
          background: isDark 
            ? 'radial-gradient(circle, rgba(30,41,59,0.3) 0%, rgba(15,23,42,0.8) 100%)'
            : 'radial-gradient(circle, rgba(248,250,252,0.8) 0%, rgba(226,232,240,0.9) 100%)'
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.0} />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#06b6d4" />
        
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={15}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
        
        {allSkills.map((skill, index) => (
          <SkillNode
            key={skill.name}
            skill={skill}
            position={skillPositions[index]}
            onHover={setHoveredSkill}
            isDark={isDark}
          />
        ))}
      </Canvas>
      
      {/* Skill info overlay */}
      {hoveredSkill && (
        <div className={`absolute bottom-4 left-4 backdrop-blur-sm rounded-lg p-4 border max-w-xs transition-colors duration-300 ${
          isDark 
            ? 'bg-slate-800/90 border-slate-600' 
            : 'bg-white/90 border-slate-300'
        }`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{hoveredSkill.icon}</span>
            <div>
              <h4 className={`font-semibold transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>{hoveredSkill.name}</h4>
              <div className={`text-sm capitalize transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>{hoveredSkill.category}</div>
            </div>
          </div>
        </div>
      )}
      
      <div className="absolute top-4 right-4 text-right">
        <div className={`text-sm px-3 py-2 rounded-lg backdrop-blur-sm transition-colors duration-300 ${
          isDark 
            ? 'text-gray-400 bg-slate-800/70' 
            : 'text-gray-600 bg-white/70'
        }`}>
          🎯 Interactive 3D Skills<br/>
          Drag to rotate • Scroll to zoom
        </div>
      </div>
      
      <div className="absolute top-4 left-4">
        <div className={`text-xs px-3 py-2 rounded-lg backdrop-blur-sm transition-colors duration-300 ${
          isDark 
            ? 'text-gray-400 bg-slate-800/70' 
            : 'text-gray-600 bg-white/70'
        }`}>
          All {allSkills.length} Skills • Hover for details
        </div>
      </div>
    </div>
  );
}