'use client';

import dynamic from 'next/dynamic';
import Navigation from '@/components/ui/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';

// Dynamically import 3D components to avoid SSR issues
const ParticleBackground = dynamic(
  () => import('@/components/3d/ParticleBackground'),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
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
      <footer className="py-8 px-6 border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            Built with ❤️ using Next.js, TypeScript, and Framer Motion
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
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
