import { PersonalInfo, Experience, Project, Education, Skill } from '@/types';

export const personalInfo: PersonalInfo = {
  name: "Shashank Yadav",
  title: "Software Development Engineer",
  bio: "Passionate software engineer specializing in AI-driven solutions and scalable web applications. Currently building enterprise-grade AI platforms at ModelEarth, with expertise in full-stack development, machine learning, and modern web technologies.",
  avatar: "/images/avatar.jpg",
  resume: "/resume.pdf",
  contact: {
    email: "shashank@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Jose, CA",
    social: {
      github: "https://github.com/shashank11yadav",
      linkedin: "https://linkedin.com/in/shashankyadav",
      twitter: "https://twitter.com/shashankyadav",
      instagram: "https://instagram.com/shashankyadav"
    }
  }
};

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Software Development Engineer",
    company: "ModelEarth",
    period: "MAY 2025 — PRESENT",
    description: "Built enterprise-grade AI chat platform with 1,700+ files across Node.js/React/Python/Rust stack. Integrated 25+ LLM providers, 9 vector databases, and comprehensive document processing pipeline supporting PDF/audio/video formats.",
    technologies: ["Node.js", "React", "Python", "Rust", "Docker", "Kubernetes", "AWS", "GCP", "Azure"],
    logo: "/logos/modelearth.png",
    website: "https://model.earth"
  },
  {
    id: "2",
    title: "Graduate Teaching Assistant",
    company: "University of Massachusetts Boston",
    period: "SEPT 2024 — MAY 2025",
    description: "Mentored 70+ students in circuit analysis, optimizing troubleshooting strategies, and simplifying complex EE concepts. Conducted lab sessions, guiding students through simulations in Multisim and MATLAB.",
    technologies: ["MATLAB", "Multisim", "Circuit Analysis", "Teaching"],
    logo: "/logos/umb.png",
    website: "https://umb.edu"
  },
  {
    id: "3",
    title: "Software Engineer",
    company: "Tata Consultancy Services",
    period: "AUG 2022 — AUG 2023",
    description: "Engineered and shipped 7 Java/Spring features for a core banking platform; built 120+ JUnit tests and Jenkins CI pipelines to boost reliability, lifting daily transaction capacity by 35%.",
    technologies: ["Java", "Spring", "SQL", "Jenkins", "JUnit"],
    logo: "/logos/tcs.png",
    website: "https://tcs.com"
  }
];

export const projects: Project[] = [
  {
    id: "1",
    title: "AI-Powered Portfolio Assistant",
    description: "Interactive 3D portfolio with AI chatbot assistant that can answer questions about my experience and projects.",
    longDescription: "This portfolio website features a 3D interactive environment built with Three.js and React Three Fiber. It includes an AI-powered chatbot that can answer questions about my background, experience, and projects using natural language processing.",
    image: "/projects/ai-portfolio.jpg",
    technologies: ["Next.js", "Three.js", "TypeScript", "OpenAI", "Framer Motion"],
    github: "https://github.com/shashank11yadav/ai-portfolio",
    demo: "https://shashank-portfolio-ai.vercel.app",
    featured: true,
    category: "web"
  },
  {
    id: "2",
    title: "Neural Network Visualizer",
    description: "Interactive web app for visualizing and training neural networks in real-time with customizable architectures.",
    longDescription: "A comprehensive tool for understanding neural networks through interactive visualizations. Users can build custom network architectures, train them on various datasets, and see the learning process in real-time.",
    image: "/projects/neural-viz.jpg",
    technologies: ["React", "TensorFlow.js", "D3.js", "Python", "Flask"],
    github: "https://github.com/shashank11yadav/neural-visualizer",
    demo: "https://neural-viz.vercel.app",
    featured: true,
    category: "ai"
  },
  {
    id: "3",
    title: "Blockchain Supply Chain",
    description: "Decentralized supply chain management system using Ethereum smart contracts and IPFS.",
    longDescription: "A complete supply chain traceability solution built on Ethereum blockchain. Features smart contracts for product lifecycle tracking, IPFS for document storage, and a React dashboard for stakeholders.",
    image: "/projects/blockchain-supply.jpg",
    technologies: ["Solidity", "Web3.js", "React", "IPFS", "Truffle"],
    github: "https://github.com/shashank11yadav/blockchain-supply",
    demo: "https://supply-chain-demo.vercel.app",
    featured: true,
    category: "blockchain"
  },
  {
    id: "4",
    title: "Real-time Chat App",
    description: "Modern chat application with real-time messaging, file sharing, and video calls.",
    longDescription: "A full-featured chat application built with modern web technologies. Includes real-time messaging, file sharing, video calls, user authentication, and responsive design.",
    image: "/projects/chat-app.jpg",
    technologies: ["Node.js", "Socket.io", "React", "MongoDB", "WebRTC"],
    github: "https://github.com/shashank11yadav/realtime-chat",
    demo: "https://chat-app-demo.vercel.app",
    featured: false,
    category: "web"
  },
  {
    id: "5",
    title: "Mobile Fitness Tracker",
    description: "Cross-platform mobile app for fitness tracking with AI-powered workout recommendations.",
    longDescription: "A comprehensive fitness tracking app that uses machine learning to provide personalized workout recommendations based on user goals, progress, and preferences.",
    image: "/projects/fitness-tracker.jpg",
    technologies: ["React Native", "Firebase", "TensorFlow", "Redux"],
    github: "https://github.com/shashank11yadav/fitness-tracker",
    featured: false,
    category: "mobile"
  },
  {
    id: "6",
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment processing and inventory management.",
    longDescription: "A complete e-commerce platform featuring product management, shopping cart, payment processing with Stripe, order tracking, and admin dashboard.",
    image: "/projects/ecommerce.jpg",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Tailwind"],
    github: "https://github.com/shashank11yadav/ecommerce-platform",
    demo: "https://ecommerce-demo.vercel.app",
    featured: false,
    category: "web"
  }
];

export const education: Education[] = [
  {
    id: "1",
    degree: "Master of Science in Computer Science",
    institution: "University of Massachusetts Boston",
    period: "SEPT 2023 - MAY 2025",
    gpa: "3.81/4.0",
    description: "Completed an advanced curriculum with a strong focus on Human-Computer Interaction and Web Technologies. Engaged in cutting-edge research on designing accessible user interfaces for diverse user groups.",
    courses: [
      "Neural Networks",
      "Applied Machine Learning",
      "Artificial Intelligence",
      "Analysis of Algorithms",
      "Computer Networks",
      "Database Application Development"
    ]
  },
  {
    id: "2",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    institution: "Graphic Era Hill University",
    period: "AUG 2018 - JUN 2022",
    gpa: "8.59/10.0",
    description: "Built a strong foundation in computer science with a specialization in modern web development and UI engineering. Gained hands-on experience in scalable software architectures.",
    courses: [
      "Data Structures & Algorithms",
      "Software Engineering",
      "Database Management Systems",
      "Web Technology",
      "Mobile Application Development",
      "Cloud Computing"
    ]
  }
];

export const skills: Skill[] = [
  // Frontend
  { name: "React", level: 95, category: "frontend", icon: "⚛️" },
  { name: "Next.js", level: 90, category: "frontend", icon: "▲" },
  { name: "TypeScript", level: 88, category: "frontend", icon: "📘" },
  { name: "JavaScript", level: 92, category: "frontend", icon: "🟨" },
  { name: "HTML5", level: 95, category: "frontend", icon: "🌐" },
  { name: "CSS3", level: 90, category: "frontend", icon: "🎨" },
  { name: "Tailwind CSS", level: 85, category: "frontend", icon: "💨" },
  { name: "Three.js", level: 75, category: "frontend", icon: "🎮" },
  
  // Backend
  { name: "Node.js", level: 90, category: "backend", icon: "🟢" },
  { name: "Python", level: 88, category: "backend", icon: "🐍" },
  { name: "Java", level: 85, category: "backend", icon: "☕" },
  { name: "Rust", level: 70, category: "backend", icon: "🦀" },
  { name: "PostgreSQL", level: 82, category: "backend", icon: "🐘" },
  { name: "MongoDB", level: 80, category: "backend", icon: "🍃" },
  { name: "Redis", level: 75, category: "backend", icon: "🔴" },
  
  // AI/ML
  { name: "TensorFlow", level: 80, category: "ai", icon: "🧠" },
  { name: "PyTorch", level: 78, category: "ai", icon: "🔥" },
  { name: "OpenAI APIs", level: 85, category: "ai", icon: "🤖" },
  { name: "Computer Vision", level: 75, category: "ai", icon: "👁️" },
  
  // Tools
  { name: "Docker", level: 82, category: "tools", icon: "🐳" },
  { name: "Kubernetes", level: 75, category: "tools", icon: "⚙️" },
  { name: "AWS", level: 80, category: "tools", icon: "☁️" },
  { name: "Git", level: 90, category: "tools", icon: "📚" },
  { name: "Jenkins", level: 75, category: "tools", icon: "🔧" }
];