'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize2, Maximize2, Terminal as TerminalIcon } from 'lucide-react';
import { personalInfo, experiences, projects, skills } from '@/data/portfolio';

interface Command {
  input: string;
  output: string | React.ReactElement;
  timestamp: Date;
}

interface TerminalState {
  isOpen: boolean;
  isMinimized: boolean;
  input: string;
  history: Command[];
  commandHistory: string[];
  historyIndex: number;
}

const COMMANDS = {
  help: {
    description: 'Show available commands',
    execute: () => (
      <div className="space-y-3">
        <div className="text-cyan-300 font-semibold text-lg">📚 Available Commands</div>
        
        {/* Portfolio Commands */}
        <div>
          <div className="text-yellow-400 font-semibold mb-2">👤 Portfolio & Info:</div>
          <div className="grid grid-cols-1 gap-1 text-sm ml-2">
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">about</span>
              <span className="text-gray-300">Display information about me</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">skills</span>
              <span className="text-gray-300">List technical skills</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">projects</span>
              <span className="text-gray-300">Show recent projects</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">contact</span>
              <span className="text-gray-300">Get contact information</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">resume</span>
              <span className="text-gray-300">View and download resume</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">experience</span>
              <span className="text-gray-300">Show work experience</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">hire</span>
              <span className="text-gray-300">Information about hiring me</span>
            </div>
          </div>
        </div>

        {/* Navigation & Search */}
        <div>
          <div className="text-blue-400 font-semibold mb-2">🧭 Navigation & Search:</div>
          <div className="grid grid-cols-1 gap-1 text-sm ml-2">
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">nav &lt;section&gt;</span>
              <span className="text-gray-300">Navigate to section (about|skills|projects|contact)</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">grep &lt;term&gt;</span>
              <span className="text-gray-300">Search through skills and projects</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">stats</span>
              <span className="text-gray-300">Show portfolio statistics</span>
            </div>
          </div>
        </div>

        {/* System Commands */}
        <div>
          <div className="text-purple-400 font-semibold mb-2">💻 System Commands:</div>
          <div className="grid grid-cols-1 gap-1 text-sm ml-2">
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">ls</span>
              <span className="text-gray-300">List portfolio sections</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">pwd</span>
              <span className="text-gray-300">Print working directory</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">whoami</span>
              <span className="text-gray-300">Display current user</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">date</span>
              <span className="text-gray-300">Show current date and time</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">echo &lt;text&gt;</span>
              <span className="text-gray-300">Display text</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">clear</span>
              <span className="text-gray-300">Clear terminal output</span>
            </div>
          </div>
        </div>

        {/* Developer Tools */}
        <div>
          <div className="text-pink-400 font-semibold mb-2">🛠️ Developer Tools:</div>
          <div className="grid grid-cols-1 gap-1 text-sm ml-2">
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">git status</span>
              <span className="text-gray-300">Show git repository status</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">git log</span>
              <span className="text-gray-300">Show commit history</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">seo</span>
              <span className="text-gray-300">Show SEO and performance metrics</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">theme</span>
              <span className="text-gray-300">Display current theme info</span>
            </div>
          </div>
        </div>

        {/* Fun & Interactive Commands */}
        <div>
          <div className="text-orange-400 font-semibold mb-2">🎉 Fun & Interactive Commands:</div>
          <div className="grid grid-cols-1 gap-1 text-sm ml-2">
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">joke</span>
              <span className="text-gray-300">Get a random programming joke</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">fact</span>
              <span className="text-gray-300">Display a random tech fact</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">quiz</span>
              <span className="text-gray-300">Take a quick tech quiz</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">time</span>
              <span className="text-gray-300">Show current time with timezone info</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">ps</span>
              <span className="text-gray-300">Show running "processes"</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">npm install</span>
              <span className="text-gray-300">NPM package manager with easter eggs</span>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 font-mono w-20">sudo &lt;cmd&gt;</span>
              <span className="text-gray-300">Execute commands with "elevated" privileges</span>
            </div>
          </div>
          
          {/* Sudo Examples */}
          <div className="mt-3 ml-2 p-3 bg-slate-800/30 rounded-lg border-l-2 border-orange-400">
            <div className="text-orange-300 font-semibold mb-2 text-xs">🔥 Try these sudo commands:</div>
            <div className="grid grid-cols-1 gap-1 text-xs">
              <div className="text-gray-400">• <span className="text-green-300 font-mono">sudo rm -rf /</span> - AI security protection</div>
              <div className="text-gray-400">• <span className="text-green-300 font-mono">sudo apt install girlfriend</span> - Package manager humor</div>
              <div className="text-gray-400">• <span className="text-green-300 font-mono">sudo make coffee</span> - Hardware not found</div>
              <div className="text-gray-400">• <span className="text-green-300 font-mono">sudo give me job</span> - Instant job offer!</div>
              <div className="text-gray-400">• <span className="text-green-300 font-mono">sudo hack pentagon</span> - FBI wants your location</div>
              <div className="text-gray-400">• <span className="text-green-300 font-mono">sudo shutdown</span> - Can't stop the awesome</div>
            </div>
          </div>
          
          {/* NPM Examples */}
          <div className="mt-3 ml-2 p-3 bg-slate-700/30 rounded-lg border-l-2 border-blue-400">
            <div className="text-blue-300 font-semibold mb-2 text-xs">📦 Try installing these packages:</div>
            <div className="grid grid-cols-1 gap-1 text-xs">
              <div className="text-gray-400">• <span className="text-green-300 font-mono">npm install motivation</span> - Boost productivity</div>
              <div className="text-gray-400">• <span className="text-green-300 font-mono">npm install coffee</span> - Restore energy</div>
              <div className="text-gray-400">• <span className="text-green-300 font-mono">npm install skills</span> - Become 10x developer</div>
              <div className="text-gray-400">• <span className="text-green-300 font-mono">npm install confidence</span> - Defeat imposter syndrome</div>
            </div>
          </div>
        </div>

        <div className="text-gray-400 text-xs mt-4 border-t border-gray-700 pt-2">
          💡 <strong>Pro Tips:</strong> Use Tab for autocomplete • ↑/↓ for command history • Ctrl+` to toggle terminal
        </div>
      </div>
    )
  },
  about: {
    description: 'Display information about me',
    execute: () => (
      <div className="space-y-2">
        <div className="text-cyan-300 font-semibold">{personalInfo.name}</div>
        <div className="text-gray-300">🎯 {personalInfo.title}</div>
        <div className="text-gray-300">📍 {personalInfo.contact.location}</div>
        <div className="text-gray-300">🎓 Master's in Computer Science</div>
        <div className="text-gray-300">💻 Full-Stack Developer & AI Enthusiast</div>
        <div className="text-gray-300">🚀 Passionate about building scalable applications</div>
        <div className="text-gray-300">🌟 700+ LeetCode problems solved</div>
      </div>
    )
  },
  skills: {
    description: 'List technical skills',
    execute: () => (
      <div className="space-y-2">
        <div className="text-cyan-300 font-semibold">Technical Arsenal:</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm">
          <div><span className="text-yellow-400">Frontend:</span> React, Next.js, TypeScript, Tailwind</div>
          <div><span className="text-green-400">Backend:</span> Node.js, Python, Java, Express</div>
          <div><span className="text-blue-400">Database:</span> PostgreSQL, MongoDB, Redis</div>
          <div><span className="text-purple-400">AI/ML:</span> TensorFlow, PyTorch, OpenCV, LangChain</div>
          <div><span className="text-cyan-400">Cloud:</span> AWS, Docker, Kubernetes</div>
          <div><span className="text-pink-400">Tools:</span> Git, VS Code, Figma, Linux</div>
        </div>
      </div>
    )
  },
  projects: {
    description: 'Show recent projects',
    execute: () => (
      <div className="space-y-2">
        <div className="text-cyan-300 font-semibold">Featured Projects:</div>
        <div className="space-y-1 text-sm">
          <div>
            <span className="text-green-400">1. Pitch Perfect</span> - AI presentation coaching platform
          </div>
          <div>
            <span className="text-blue-400">2. AccuScan</span> - Advanced OCR document processing system
          </div>
          <div>
            <span className="text-purple-400">3. LipNet</span> - Lip reading neural network implementation
          </div>
        </div>
        <div className="text-gray-400 text-xs mt-2">💡 Use 'nav projects' to view the projects section</div>
      </div>
    )
  },
  contact: {
    description: 'Get contact information',
    execute: () => (
      <div className="space-y-2">
        <div className="text-cyan-300 font-semibold">Let's Connect:</div>
        <div className="space-y-1 text-sm">
          <div className="text-gray-300">📧 {personalInfo.contact.email}</div>
          <div className="text-gray-300">💼 {personalInfo.contact.social.linkedin}</div>
          <div className="text-gray-300">🐙 {personalInfo.contact.social.github}</div>
          <div className="text-gray-300">🐦 {personalInfo.contact.social.twitter}</div>
          <div className="text-gray-300">📸 {personalInfo.contact.social.instagram}</div>
          <div className="text-gray-300">💻 {personalInfo.contact.social.leetcode}</div>
          <div className="text-gray-300">📍 {personalInfo.contact.location}</div>
        </div>
        <div className="text-gray-400 text-xs mt-2">💡 Use 'nav contact' to open the contact form</div>
      </div>
    )
  },
  resume: {
    description: 'View and download resume',
    execute: () => (
      <div className="space-y-2">
        <div className="text-cyan-300 font-semibold">📄 Resume</div>
        <div className="text-gray-300">Resume is available for download.</div>
        <div className="text-blue-400 underline cursor-pointer hover:text-blue-300">
          <a href={personalInfo.resume} target="_blank" rel="noopener noreferrer">
            🔗 Download Resume (Google Drive)
          </a>
        </div>
        <div className="text-gray-400 text-xs mt-2">💡 Click the link above to open in new tab</div>
      </div>
    )
  },
  experience: {
    description: 'Show work experience',
    execute: () => (
      <div className="space-y-3">
        <div className="text-cyan-300 font-semibold">💼 Work Experience</div>
        {experiences.map((exp, index) => (
          <div key={exp.id} className="border-l-2 border-gray-600 pl-4 space-y-1">
            <div className="text-green-400 font-semibold">{exp.title}</div>
            <div className="text-yellow-400">{exp.company}</div>
            <div className="text-gray-400 text-sm">{exp.period}</div>
            <div className="text-gray-300 text-sm">{exp.description}</div>
            <div className="flex flex-wrap gap-1 mt-2">
              {exp.technologies.slice(0, 5).map(tech => (
                <span key={tech} className="text-xs bg-slate-700 text-cyan-400 px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
              {exp.technologies.length > 5 && (
                <span className="text-xs text-gray-500">+{exp.technologies.length - 5} more</span>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  },
  stats: {
    description: 'Show portfolio statistics',
    execute: () => {
      const totalProjects = projects.length;
      const featuredProjects = projects.filter(p => p.featured).length;
      const totalSkills = skills.length;
      const expertSkills = skills.filter(s => s.level >= 90).length;
      const advancedSkills = skills.filter(s => s.level >= 80 && s.level < 90).length;
      const totalYears = new Date().getFullYear() - 2022; // Adjust based on your start year
      const categories = [...new Set(skills.map(s => s.category))].length;

      return (
        <div className="space-y-2">
          <div className="text-cyan-300 font-semibold">📊 Portfolio Statistics</div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <div className="text-green-400">Projects: <span className="text-white">{totalProjects}</span></div>
              <div className="text-yellow-400">Featured: <span className="text-white">{featuredProjects}</span></div>
              <div className="text-purple-400">Skills: <span className="text-white">{totalSkills}</span></div>
              <div className="text-cyan-400">Categories: <span className="text-white">{categories}</span></div>
            </div>
            <div className="space-y-1">
              <div className="text-green-400">Expert (90%+): <span className="text-white">{expertSkills}</span></div>
              <div className="text-blue-400">Advanced (80%+): <span className="text-white">{advancedSkills}</span></div>
              <div className="text-pink-400">Experience: <span className="text-white">{totalYears}+ years</span></div>
              <div className="text-orange-400">LeetCode: <span className="text-white">700+</span></div>
            </div>
          </div>
        </div>
      );
    }
  },
  grep: {
    description: 'Search through skills and projects: grep <term>',
    execute: (args: string[]) => {
      const searchTerm = args.join(' ').toLowerCase();
      if (!searchTerm) {
        return 'Usage: grep <search_term>';
      }

      const matchingSkills = skills.filter(skill => 
        skill.name.toLowerCase().includes(searchTerm) || 
        skill.category.toLowerCase().includes(searchTerm)
      );

      const matchingProjects = projects.filter(project => 
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
      );

      if (matchingSkills.length === 0 && matchingProjects.length === 0) {
        return `No matches found for "${searchTerm}"`;
      }

      return (
        <div className="space-y-3">
          <div className="text-cyan-300 font-semibold">🔍 Search Results for "{searchTerm}"</div>
          
          {matchingSkills.length > 0 && (
            <div>
              <div className="text-green-400 font-semibold mb-1">Skills ({matchingSkills.length}):</div>
              {matchingSkills.map(skill => (
                <div key={skill.name} className="text-gray-300 ml-2">
                  • {skill.name} ({skill.level}%) - {skill.category}
                </div>
              ))}
            </div>
          )}

          {matchingProjects.length > 0 && (
            <div>
              <div className="text-blue-400 font-semibold mb-1">Projects ({matchingProjects.length}):</div>
              {matchingProjects.map(project => (
                <div key={project.id} className="text-gray-300 ml-2">
                  • {project.title} - {project.description.substring(0, 80)}...
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
  },
  git: {
    description: 'Show git repository status',
    execute: (args: string[]) => {
      const subcommand = args[0];
      
      if (!subcommand || subcommand === 'status') {
        return (
          <div className="space-y-1 font-mono text-sm">
            <div className="text-green-400">On branch main</div>
            <div className="text-green-400">Your branch is up to date with 'origin/main'.</div>
            <div className="mt-2">Changes not staged for commit:</div>
            <div className="text-red-400 ml-2">modified:   skills/NextJS.tsx (level increased to 95%)</div>
            <div className="text-red-400 ml-2">modified:   projects/new_project.tsx</div>
            <div className="mt-2">Untracked files:</div>
            <div className="text-red-400 ml-2">achievements/aws_certified.json</div>
            <div className="text-red-400 ml-2">experience/modelearth_promotion.md</div>
            <div className="mt-2 text-gray-400">
              no changes added to commit (use "git add" to track changes)
            </div>
          </div>
        );
      }
      
      if (subcommand === 'log') {
        return (
          <div className="space-y-1 font-mono text-sm">
            <div className="text-yellow-400">commit a1b2c3d (HEAD -{'>'} main)</div>
            <div className="text-gray-300">Author: {personalInfo.name} {'<'}{personalInfo.contact.email}{'>'}</div>
            <div className="text-gray-300">Date: {new Date().toDateString()}</div>
            <div className="text-gray-300 ml-4">feat: Add advanced 3D animations and terminal CLI</div>
            <div className="text-yellow-400 mt-2">commit d4e5f6g</div>
            <div className="text-gray-300">Date: {new Date(Date.now() - 86400000).toDateString()}</div>
            <div className="text-gray-300 ml-4">fix: Optimize project filtering animations</div>
          </div>
        );
      }
      
      return `git: '${subcommand}' is not a git command. Try 'git status' or 'git log'`;
    }
  },
  sudo: {
    description: 'Execute commands with elevated privileges',
    execute: (args: string[]) => {
      const command = args.join(' ');
      
      if (!command) {
        return 'Usage: sudo <command>';
      }
      
      // Fun responses for common sudo commands
      const responses: Record<string, string> = {
        'rm -rf /': '🚫 Permission denied: Nice try! This portfolio is protected by advanced AI security.',
        'shutdown': '🚫 Permission denied: Cannot shutdown awesome portfolio.',
        'apt install girlfriend': '📦 Package \'girlfriend\' not found in repositories. Try \'sudo apt install confidence\' first.',
        'make coffee': '☕ Error: Coffee machine not connected to this terminal.',
        'chmod 777 *': '🔒 Permission denied: Some things are better left secure.',
        'give me job': '💼 Job offer generated! Check the \'hire\' command for more details.',
        'hack pentagon': '🛡️ FBI wants to know your location. Just kidding! Focus on coding instead.',
      };
      
      if (responses[command.toLowerCase()]) {
        return responses[command.toLowerCase()];
      }
      
      return `🔐 [sudo] password for ${personalInfo.name.toLowerCase().replace(' ', '')}: Permission denied. This is a portfolio, not a real terminal!`;
    }
  },
  seo: {
    description: 'Show SEO and performance metrics',
    execute: () => (
      <div className="space-y-2">
        <div className="text-cyan-300 font-semibold">🚀 SEO & Performance Metrics</div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <div className="text-green-400">Lighthouse Score</div>
            <div className="text-white ml-2">Performance: 98/100 ⚡</div>
            <div className="text-white ml-2">Accessibility: 100/100 ♿</div>
            <div className="text-white ml-2">Best Practices: 100/100 ✅</div>
            <div className="text-white ml-2">SEO: 100/100 📈</div>
          </div>
          <div className="space-y-1">
            <div className="text-blue-400">Tech Stack</div>
            <div className="text-white ml-2">• Next.js 14 (SSR)</div>
            <div className="text-white ml-2">• TypeScript</div>
            <div className="text-white ml-2">• Tailwind CSS</div>
            <div className="text-white ml-2">• Three.js</div>
            <div className="text-white ml-2">• Framer Motion</div>
          </div>
        </div>
        <div className="text-gray-400 text-xs mt-2">
          📊 Built for performance and user experience
        </div>
      </div>
    )
  },
  joke: {
    description: 'Get a random programming joke',
    execute: () => {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
        "Why don't programmers like nature? It has too many bugs! 🌲",
        "A programmer's wife tells him: 'Run to the store and pick up a loaf of bread. If they have eggs, get a dozen.' The programmer comes home with 12 loaves of bread. 🍞",
        "Why did the programmer quit his job? He didn't get arrays! 📊",
        "There are only 10 types of people in the world: those who understand binary and those who don't. 💾",
        "Why do Java developers wear glasses? Because they don't C#! 👓",
        "A SQL query goes into a bar, walks up to two tables and asks: 'Can I join you?' 🍻",
        "Why did the developer go broke? Because he used up all his cache! 💸",
        "How do you comfort a JavaScript bug? You console it! 🖥️",
        "Why do programmers hate the outdoors? There are too many bugs and the sun causes glare on their screens! ☀️",
        "What's the object-oriented way to become wealthy? Inheritance! 💰",
        "Why do Python programmers prefer snakes? Because they don't like Java! 🐍",
        "How do you tell HTML from HTML5? Try it out in Internet Explorer. Did it work? No? It's HTML5. 🌐",
        "Why did the programmer use the entire bottle of shampoo? Because the instructions said 'lather, rinse, repeat' and they're still stuck in an infinite loop! 🧴",
        "What did the Java code say to the C code? You've got no class! 🎭",
        "Why don't programmers like to go outside? The sun is too bright and it hurts their IDE! 🕶️"
      ];
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      return randomJoke;
    }
  },
  fact: {
    description: 'Display a random tech fact',
    execute: () => {
      const facts = [
        "🚀 The first computer bug was an actual bug - a moth stuck in a Harvard Mark II computer in 1947!",
        "💾 The term 'debugging' was coined by Grace Hopper when she found that moth!",
        "🌐 The first website ever created is still online: http://info.cern.ch/hypertext/WWW/TheProject.html",
        "📱 More people have mobile phones than have access to clean drinking water.",
        "⌨️ The QWERTY keyboard was designed to slow down typing to prevent typewriter jams!",
        "🔐 The first computer password was used in 1961 at MIT for the Compatible Time-Sharing System.",
        "📧 The '@' symbol was chosen for email addresses because it was the only preposition available on the keyboard!",
        "💻 The term 'computer' originally referred to people who performed calculations by hand.",
        "🎮 The first video game was 'Tennis for Two' created in 1958 on an oscilloscope.",
        "🔢 Binary code was invented by Gottfried Leibniz in 1679, long before computers existed!",
        "🖱️ The computer mouse was invented in 1964 by Douglas Engelbart and was originally called an 'X-Y Position Indicator'!",
        "💿 The first 1GB hard drive was released by IBM in 1980 and cost $40,000 (that's $81 per MB)!",
        "🌍 The internet was originally called ARPANET and connected just 4 computers in 1969.",
        "🎯 JavaScript was created in just 10 days by Brendan Eich at Netscape in 1995!",
        "🔑 The first computer virus was called 'Creeper' and was created in 1971 as an experiment.",
        "📺 The term 'bug' in programming existed before Grace Hopper's famous moth - it was used in engineering since the 1870s!",
        "⚡ WiFi doesn't stand for anything - it's just a made-up name that sounds like 'Hi-Fi'!"
      ];
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      return randomFact;
    }
  },
  quiz: {
    description: 'Take a quick tech quiz',
    execute: () => {
      const questions = [
        {
          q: "What does 'HTML' stand for?",
          a: "HyperText Markup Language",
          options: ["A) Hyperlink Text Management Language", "B) HyperText Markup Language", "C) Home Tool Markup Language"]
        },
        {
          q: "Which company created JavaScript?",
          a: "Netscape",
          options: ["A) Microsoft", "B) Netscape", "C) Google"]
        },
        {
          q: "What does 'API' stand for?",
          a: "Application Programming Interface",
          options: ["A) Application Programming Interface", "B) Advanced Programming Integration", "C) Automated Program Interaction"]
        },
        {
          q: "Which is NOT a JavaScript framework?",
          a: "Laravel",
          options: ["A) React", "B) Vue", "C) Laravel"]
        }
      ];
      
      const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
      
      return (
        <div className="space-y-3">
          <div className="text-cyan-300 font-semibold">🧠 Tech Quiz Time!</div>
          <div className="text-white font-semibold">{randomQuestion.q}</div>
          <div className="space-y-1 text-sm">
            {randomQuestion.options.map(option => (
              <div key={option} className="text-gray-300">{option}</div>
            ))}
          </div>
          <div className="text-green-400 text-sm">Answer: {randomQuestion.a}</div>
          <div className="text-gray-400 text-xs">💡 Run 'quiz' again for another question!</div>
        </div>
      );
    }
  },
  time: {
    description: 'Show current time with timezone info',
    execute: () => {
      const now = new Date();
      return (
        <div className="space-y-2">
          <div className="text-cyan-300 font-semibold">⏰ Current Time</div>
          <div className="font-mono space-y-1">
            <div className="text-green-400">Local Time: {now.toLocaleTimeString()}</div>
            <div className="text-blue-400">UTC Time: {now.toUTCString()}</div>
            <div className="text-purple-400">Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</div>
            <div className="text-yellow-400">Unix Timestamp: {Math.floor(now.getTime() / 1000)}</div>
          </div>
        </div>
      );
    }
  },
  ps: {
    description: 'Show running "processes"',
    execute: () => (
      <div className="space-y-2">
        <div className="text-cyan-300 font-semibold">📊 Running Processes</div>
        <div className="font-mono text-xs space-y-1">
          <div className="grid grid-cols-4 gap-4 text-gray-400 border-b border-gray-600 pb-1">
            <span>PID</span>
            <span>PROCESS</span>
            <span>CPU%</span>
            <span>STATUS</span>
          </div>
          <div className="grid grid-cols-4 gap-4 text-green-400">
            <span>1337</span>
            <span>awesome_portfolio</span>
            <span>98.5%</span>
            <span>Running</span>
          </div>
          <div className="grid grid-cols-4 gap-4 text-blue-400">
            <span>2048</span>
            <span>skill_renderer</span>
            <span>15.2%</span>
            <span>Active</span>
          </div>
          <div className="grid grid-cols-4 gap-4 text-purple-400">
            <span>4096</span>
            <span>3d_animations</span>
            <span>22.8%</span>
            <span>Running</span>
          </div>
          <div className="grid grid-cols-4 gap-4 text-yellow-400">
            <span>8192</span>
            <span>terminal_cli</span>
            <span>5.1%</span>
            <span>Active</span>
          </div>
          <div className="grid grid-cols-4 gap-4 text-cyan-400">
            <span>1024</span>
            <span>coffee_maker</span>
            <span>0.0%</span>
            <span>Sleeping</span>
          </div>
        </div>
      </div>
    )
  },
  npm: {
    description: 'NPM package manager: npm install <package>',
    execute: (args: string[]) => {
      const subcommand = args[0];
      const packageName = args[1];
      
      if (subcommand === 'install' && packageName) {
        const packages: Record<string, string> = {
          'motivation': '✅ motivation@latest installed! Your productivity increased by 200%',
          'coffee': '☕ coffee@dark-roast installed! Energy levels restored',
          'skills': '🚀 skills@expert installed! You are now a 10x developer',
          'luck': '🍀 luck@maximum installed! RNG is now in your favor',
          'patience': '😌 patience@zen installed! Debugging is now meditation',
          'react': '⚛️ react@18.2.0 installed! 2847 packages added in 45.3s',
          'typescript': '📘 typescript@5.0.0 installed! Type safety engaged!',
          'nextjs': '🔺 next@14.0.0 installed! The future is now!',
          'three': '🎲 three@0.158.0 installed! 3D magic enabled!',
          'confidence': '💪 confidence@unlimited installed! Imposter syndrome defeated!'
        };
        
        return packages[packageName] || `📦 Installing ${packageName}... \n✅ ${packageName}@latest installed successfully!`;
      }
      
      if (!subcommand) {
        return (
          <div className="space-y-2">
            <div className="text-cyan-300 font-semibold">📦 NPM Package Manager</div>
            <div className="text-gray-300">Usage: npm install {'<package>'}</div>
            <div className="text-yellow-400 text-sm">Try installing: motivation, coffee, skills, luck, patience, react, typescript</div>
          </div>
        );
      }
      
      return `npm: command not found: ${subcommand}. Try 'npm install <package>'`;
    }
  },
  hire: {
    description: 'Information about hiring me',
    execute: () => (
      <div className="space-y-3">
        <div className="text-cyan-300 font-semibold">💼 Ready to Hire Shashank?</div>
        <div className="space-y-2">
          <div className="text-green-400 font-semibold">🎯 What I Bring:</div>
          <div className="text-gray-300 ml-2">• Master's in Computer Science</div>
          <div className="text-gray-300 ml-2">• Full-Stack Development (React, Node.js, Python)</div>
          <div className="text-gray-300 ml-2">• AI/ML Expertise (TensorFlow, PyTorch)</div>
          <div className="text-gray-300 ml-2">• Cloud Architecture (AWS, Docker, Kubernetes)</div>
          <div className="text-gray-300 ml-2">• 700+ LeetCode problems solved</div>
          
          <div className="text-blue-400 font-semibold mt-3">🚀 Current Status:</div>
          <div className="text-gray-300 ml-2">✅ Open to new opportunities</div>
          <div className="text-gray-300 ml-2">✅ Available for full-time positions</div>
          <div className="text-gray-300 ml-2">✅ Remote/Hybrid/On-site flexible</div>
          
          <div className="text-purple-400 font-semibold mt-3">📞 Let's Connect:</div>
          <div className="text-gray-300 ml-2">📧 {personalInfo.contact.email}</div>
          <div className="text-gray-300 ml-2">💼 {personalInfo.contact.social.linkedin}</div>
          <div className="text-gray-300 ml-2">📄 Use 'resume' command for full details</div>
          
          <div className="text-yellow-400 text-sm mt-3">
            💡 Pro tip: Type 'nav contact' to open the contact form!
          </div>
        </div>
      </div>
    )
  },
  nav: {
    description: 'Navigate to section: nav [about|skills|projects|contact]',
    execute: (args: string[]) => {
      const section = args[0];
      const validSections = ['about', 'skills', 'projects', 'contact'];
      
      if (!section) {
        return `Usage: nav [${validSections.join('|')}]`;
      }
      
      if (!validSections.includes(section)) {
        return `❌ Invalid section. Available: ${validSections.join(', ')}`;
      }
      
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return `🧭 Navigating to ${section} section...`;
      }
      
      return `❌ Section '${section}' not found`;
    }
  },
  clear: {
    description: 'Clear terminal output',
    execute: () => 'CLEAR_TERMINAL'
  },
  whoami: {
    description: 'Display current user',
    execute: () => 'visitor@shashank-portfolio.dev'
  },
  pwd: {
    description: 'Print working directory',
    execute: () => '/home/shashank/portfolio'
  },
  ls: {
    description: 'List portfolio sections',
    execute: () => (
      <div className="grid grid-cols-2 gap-2 font-mono text-sm">
        <div className="text-blue-400">📁 about/</div>
        <div className="text-green-400">📁 skills/</div>
        <div className="text-purple-400">📁 projects/</div>
        <div className="text-cyan-400">📁 contact/</div>
      </div>
    )
  },
  date: {
    description: 'Show current date and time',
    execute: () => new Date().toLocaleString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  },
  echo: {
    description: 'Display text: echo <message>',
    execute: (args: string[]) => args.length > 0 ? args.join(' ') : 'Usage: echo <message>'
  },
  theme: {
    description: 'Display current theme info',
    execute: () => (
      <div className="space-y-1 text-sm">
        <div className="text-cyan-300">🎨 Current Theme: Cyberpunk Dark</div>
        <div className="text-gray-300">• Primary: Cyan (#06b6d4)</div>
        <div className="text-gray-300">• Secondary: Purple (#8b5cf6)</div>
        <div className="text-gray-300">• Background: Slate (#0f172a)</div>
      </div>
    )
  }
} as const;

export default function Terminal() {
  const [state, setState] = useState<TerminalState>({
    isOpen: false,
    isMinimized: false,
    input: '',
    history: [],
    commandHistory: [],
    historyIndex: -1
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const addToHistory = useCallback((command: Command) => {
    setState(prev => ({
      ...prev,
      history: [...prev.history, command],
      commandHistory: command.input.trim() ? [...prev.commandHistory, command.input] : prev.commandHistory
    }));
  }, []);

  const executeCommand = useCallback((input: string) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const parts = trimmedInput.split(' ');
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output: string | React.ReactElement = '';

    if (commandName === 'clear') {
      setState(prev => ({ ...prev, history: [], input: '' }));
      return;
    }

    if (COMMANDS[commandName as keyof typeof COMMANDS]) {
      const command = COMMANDS[commandName as keyof typeof COMMANDS];
      output = command.execute(args as any);
    } else {
      output = (
        <div className="text-red-400">
          Command not found: <span className="font-mono">{commandName}</span>
          <div className="text-gray-400 text-sm mt-1">Type 'help' for available commands</div>
        </div>
      );
    }

    const newCommand: Command = {
      input: trimmedInput,
      output,
      timestamp: new Date()
    };

    addToHistory(newCommand);
    setState(prev => ({ ...prev, input: '', historyIndex: -1 }));
  }, [addToHistory]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(state.input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (state.commandHistory.length > 0) {
        const newIndex = state.historyIndex === -1 
          ? state.commandHistory.length - 1 
          : Math.max(0, state.historyIndex - 1);
        setState(prev => ({
          ...prev,
          historyIndex: newIndex,
          input: state.commandHistory[newIndex]
        }));
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (state.historyIndex !== -1) {
        const newIndex = state.historyIndex + 1;
        if (newIndex >= state.commandHistory.length) {
          setState(prev => ({ ...prev, historyIndex: -1, input: '' }));
        } else {
          setState(prev => ({
            ...prev,
            historyIndex: newIndex,
            input: state.commandHistory[newIndex]
          }));
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matchingCommands = Object.keys(COMMANDS).filter(cmd => 
        cmd.startsWith(state.input.toLowerCase().split(' ')[0])
      );
      if (matchingCommands.length === 1) {
        setState(prev => ({ ...prev, input: matchingCommands[0] + ' ' }));
      }
    }
  }, [state.input, state.historyIndex, state.commandHistory, executeCommand]);

  // Focus input when terminal opens
  useEffect(() => {
    if (state.isOpen && !state.isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.isOpen, state.isMinimized]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [state.history]);

  // Global keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Welcome message
  useEffect(() => {
    if (state.isOpen && state.history.length === 0) {
      const welcomeCommand: Command = {
        input: '',
        output: (
          <div className="space-y-2">
            <div className="text-cyan-300 font-bold text-lg">🚀 Welcome to {personalInfo.name}'s Portfolio Terminal</div>
            <div className="text-gray-300">Type <span className="text-green-400 font-mono">help</span> to see available commands.</div>
            <div className="text-gray-400 text-sm">
              💡 Tips: Use Tab for autocomplete, ↑/↓ for history, Ctrl+` to toggle
            </div>
          </div>
        ),
        timestamp: new Date()
      };
      addToHistory(welcomeCommand);
    }
  }, [state.isOpen, state.history.length, addToHistory]);

  return (
    <>
      {/* Terminal Toggle Button */}
      <motion.button
        onClick={() => setState(prev => ({ 
          ...prev, 
          isOpen: true, 
          isMinimized: false 
        }))}
        className="fixed bottom-6 right-6 z-50 bg-slate-900/90 backdrop-blur-sm border border-slate-600 rounded-full p-4 hover:bg-slate-800/90 transition-all duration-300 group shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Open Terminal (Ctrl + `)"
      >
        <TerminalIcon className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      </motion.button>

      {/* Terminal Window */}
      <AnimatePresence>
        {state.isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ 
              opacity: 1, 
              scale: state.isMinimized ? 0.1 : 1, 
              y: state.isMinimized ? 500 : 0 
            }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`fixed inset-4 md:inset-6 lg:inset-8 z-50 bg-slate-950/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl overflow-hidden ${
              state.isMinimized ? 'pointer-events-none' : ''
            }`}
            style={{
              maxHeight: '80vh',
              minHeight: '400px'
            }}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900/80 border-b border-slate-700">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center gap-2">
                  <TerminalIcon className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-200 font-mono font-semibold">
                    shashank@portfolio-terminal
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setState(prev => ({ ...prev, isMinimized: !prev.isMinimized }))}
                  className="p-2 hover:bg-slate-700 rounded-md transition-colors"
                  title="Minimize"
                >
                  <Minimize2 className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={() => setState(prev => ({ ...prev, isMinimized: false }))}
                  className="p-2 hover:bg-slate-700 rounded-md transition-colors"
                  title="Maximize"
                >
                  <Maximize2 className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={() => setState(prev => ({ ...prev, isOpen: false }))}
                  className="p-2 hover:bg-red-600 rounded-md transition-colors"
                  title="Close"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-white" />
                </button>
              </div>
            </div>

            {/* Terminal Content */}
            {!state.isMinimized && (
              <div className="flex flex-col h-full">
                {/* Output Area */}
                <div 
                  ref={outputRef}
                  className="flex-1 p-6 overflow-y-auto font-mono text-sm leading-relaxed space-y-4"
                  style={{ maxHeight: 'calc(100% - 120px)' }}
                >
                  {state.history.map((cmd, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="space-y-2"
                    >
                      {cmd.input && (
                        <div className="flex items-center gap-2 text-gray-300">
                          <span className="text-green-400 font-bold">➜</span>
                          <span className="text-cyan-400">~</span>
                          <span className="text-gray-200">{cmd.input}</span>
                          <span className="text-gray-500 text-xs ml-auto">
                            {cmd.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      )}
                      <div className="ml-6 text-gray-200">{cmd.output}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="p-6 border-t border-slate-700 bg-slate-900/50">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-green-400 font-bold">➜</span>
                    <span className="text-cyan-400">~</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={state.input}
                      onChange={(e) => setState(prev => ({ ...prev, input: e.target.value }))}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent text-gray-200 outline-none text-sm"
                      placeholder="Type a command..."
                      autoComplete="off"
                      spellCheck="false"
                    />
                    <motion.div 
                      className="w-2 h-5 bg-cyan-400 rounded-sm"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-3 flex items-center justify-between">
                    <span>Press Ctrl+` to close</span>
                    <span>Tab: autocomplete | ↑/↓: history</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}