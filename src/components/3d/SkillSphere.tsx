'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { skills } from '@/data/portfolio';

interface SkillNodeProps {
  skill: typeof skills[0];
  position: [number, number, number];
  onHover: (skill: typeof skills[0] | null) => void;
}

function SkillNode({ skill, position, onHover }: SkillNodeProps) {
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
    if (skill.level >= 90) return '#06b6d4'; // Cyan for expert
    if (skill.level >= 80) return '#8b5cf6'; // Purple for advanced
    return '#64748b'; // Gray for others
  }, [skill.level]);

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
        color="white"
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
          background: 'radial-gradient(circle, rgba(30,41,59,0.3) 0%, rgba(15,23,42,0.8) 100%)'
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
          />
        ))}
      </Canvas>
      
      {/* Skill info overlay */}
      {hoveredSkill && (
        <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 border border-slate-600 max-w-xs">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{hoveredSkill.icon}</span>
            <div>
              <h4 className="font-semibold text-white">{hoveredSkill.name}</h4>
              <div className="text-sm text-gray-400 capitalize">{hoveredSkill.category}</div>
            </div>
          </div>
        </div>
      )}
      
      <div className="absolute top-4 right-4 text-right">
        <div className="text-sm text-gray-400 bg-slate-800/70 px-3 py-2 rounded-lg backdrop-blur-sm">
          🎯 Interactive 3D Skills<br/>
          Drag to rotate • Scroll to zoom
        </div>
      </div>
      
      <div className="absolute top-4 left-4">
        <div className="text-xs text-gray-400 bg-slate-800/70 px-3 py-2 rounded-lg backdrop-blur-sm">
          All {allSkills.length} Skills • Hover for details
        </div>
      </div>
    </div>
  );
}