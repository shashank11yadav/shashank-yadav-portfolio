'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function FloatingCube({ position, color, speed }: { position: [number, number, number], color: string, speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.02;
      meshRef.current.rotation.y += speed * 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.7} 
          emissive={color}
          emissiveIntensity={0.05}
        />
      </mesh>
    </Float>
  );
}

function FloatingSphere({ position, color, speed }: { position: [number, number, number], color: string, speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.01;
      meshRef.current.rotation.z += speed * 0.005;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.6} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.6} 
          emissive={color}
          emissiveIntensity={0.05}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus({ position, color, speed }: { position: [number, number, number], color: string, speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.015;
      meshRef.current.rotation.y += speed * 0.02;
      meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * speed) * 0.1;
    }
  });

  return (
    <Float speed={speed * 1.2} rotationIntensity={0.8} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.7, 0.3, 16, 100]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.8} 
          emissive={color}
          emissiveIntensity={0.05}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingElements() {
  const elements = useMemo(() => [
    { type: 'cube', position: [-2, 2, -4] as [number, number, number], color: '#a855f7', speed: 0.3 }, // cyan cube - moved to top left
    { type: 'sphere', position: [7, 2, -4] as [number, number, number], color: '#8b5cf6', speed: 0.2 }, // purple sphere
    { type: 'torus', position: [-9, -9, -7] as [number, number, number], color: '#8b5cf6', speed: 0.25 }, // purple donut - left bottom corner
    { type: 'cube', position: [8, 6, -4] as [number, number, number], color: '#06b6d4', speed: 0.225 }, // purple cube
    { type: 'sphere', position: [1, -5, -3] as [number, number, number], color: '#06b6d4', speed: 0.275 }, // cyan sphere
    // { type: 'sphere', position: [-10, 5, -4] as [number, number, number], color: '#06b6d4', speed: 0.275 }, // cyan sphere
    { type: 'torus', position: [13, -6, -8] as [number, number, number], color: '#8b5cf6', speed: 0.25 }, // purple donut - moved to bottom right
  ], []);

  return (
    <Canvas
      className="absolute inset-0 pointer-events-none"
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#06b6d4" />
      <pointLight position={[10, 10, 10]} intensity={0.4} color="#8b5cf6" />

      {elements.map((element, index) => {
        switch (element.type) {
          case 'cube':
            return (
              <FloatingCube
                key={index}
                position={element.position}
                color={element.color}
                speed={element.speed}
              />
            );
          case 'sphere':
            return (
              <FloatingSphere
                key={index}
                position={element.position}
                color={element.color}
                speed={element.speed}
              />
            );
          case 'torus':
            return (
              <FloatingTorus
                key={index}
                position={element.position}
                color={element.color}
                speed={element.speed}
              />
            );
          default:
            return null;
        }
      })}
    </Canvas>
  );
}