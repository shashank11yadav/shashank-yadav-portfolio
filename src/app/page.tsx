'use client';

import dynamic from 'next/dynamic';
import Navigation from '@/components/ui/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import { useTheme } from '@/contexts/ThemeContext';

// Dynamically import 3D components to avoid SSR issues
const ParticleBackground = dynamic(
  () => import('@/components/3d/ParticleBackground'),
  { ssr: false }
);

export default function Home() {
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
      isDark ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* 3D Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* About Section */}
        <section id="about">
          <AboutSection />
        </section>

        {/* Skills Section */}
        <section id="skills">
          <SkillsSection />
        </section>

        {/* Experience Section */}
        <section id="experience">
          <ExperienceSection />
        </section>

        {/* Projects Section */}
        <section id="projects">
          <ProjectsSection />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactSection />
        </section>
      </main>

      {/* Footer */}
      <footer 
        className={`py-8 px-6 text-center transition-all duration-700 ${
          isDark ? 'text-gray-400 bg-slate-900/30' : 'text-gray-800'
        }`}
        style={{
          background: !isDark 
            ? 'linear-gradient(135deg, #f8fafc 0%, #ddd6fe 50%, #e0e7ff 100%)'
            : undefined
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className={`mb-4 transition-colors duration-300 ${
            isDark ? 'text-gray-400' : 'text-gray-700'
          }`}>
            Built with ❤️ using Next.js, TypeScript, and Framer Motion
          </p>
          <div className={`flex justify-center gap-6 text-sm transition-colors duration-300 ${
            isDark ? 'text-gray-500' : 'text-gray-800'
          }`}>
            <span>© 2025 Shashank Yadav</span>
            <span>•</span>
            <span>All rights reserved</span>
            <span>•</span>
            <span>Made with passion</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
