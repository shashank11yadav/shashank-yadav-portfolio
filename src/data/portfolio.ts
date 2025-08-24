import { PersonalInfo, Experience, Project, Education, Skill } from '@/types';

export const personalInfo: PersonalInfo = {
  name: "Shashank Yadav",
  title: "Software Development Engineer",
  bio: "Passionate software engineer with a Master's in Computer Science, specializing in AI-driven solutions and scalable web applications. Currently building enterprise-grade AI platforms at ModelEarth, with expertise in full-stack development, machine learning, and modern web technologies.",
  avatar: "/images/Profile_image.jpg",
  resume: "https://drive.google.com/file/d/1snhoAl2qE-RtV797FtQCy2SIOwR_2YRu/view",
  contact: {
    email: "yadav.shashank1201@gmail.com",
    location: "San Jose, CA",
    social: {
      github: "https://github.com/shashank11yadav",
      linkedin: "https://www.linkedin.com/in/shashank-yadav-cs",
      twitter: "https://x.com/Shashankyadav30",
      instagram: "https://www.instagram.com/shashankyadav3032",
      leetcode: "https://leetcode.com/u/Shashank-yadav"
    }
  }
};

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Software Development Engineer",
    company: "ModelEarth",
    period: "JULY 2025 — PRESENT",
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
    description: "Led 8 cohorts (90+ students) through advanced circuit analysis and MATLAB simulations. Provided actionable feedback on 70+ lab reports within 24 hours, improving problem-solving skills for 85% of student pairs.",
    technologies: ["MATLAB", "Multisim", "Circuit Analysis", "Teaching"],
    logo: "/logos/umb.png",
    website: "https://umb.edu"
  },
  {
    id: "3",
    title: "Software Engineer",
    company: "Tata Consultancy Services",
    period: "AUG 2022 — AUG 2023",
    description: "Engineered and shipped 7 Java/Spring features for a core banking platform; built 120+ JUnit tests and Jenkins CI pipelines to boost reliability, lifting daily transaction capacity by 35% and sustaining 99.9% uptime. Led zero-downtime migration from Oracle to PostgreSQL (20 GB), refactored 15K LOC reducing critical page loads by 4s and cutting licensing costs by 25%.",
    technologies: ["Java", "Spring", "SQL", "Jenkins", "JUnit"],
    logo: "/logos/tcs.png",
    website: "https://www.tcs.com/what-we-do/products-platforms/tcs-bancs"
  }
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Pitch Perfect",
    description: "Developed a full-stack web application enabling users to learn and practice sales skills, integrating user authentication and profile management for personalized learning. Implemented interactive roleplay and active learning features, allowing users to engage in real-time sales training simulations with AI-driven feedback.",
    longDescription: "A comprehensive sales training platform that revolutionizes how people learn sales skills. Built with the MERN stack, it features user authentication, personalized learning paths, interactive roleplay scenarios, and AI-driven feedback systems. The platform includes employer and learner workflows, facilitating career opportunities and connections through advanced skill assessments.",
    image: "/projects/pitch-perfect.jpg",
    technologies: ["Python", "MongoDB", "Express", "React", "Node.js", "AI", "Authentication"],
    github: "https://github.com/shashank11yadav/pitch-perfect",
    featured: true,
    category: "web"
  },
  {
    id: "2",
    title: "AccuScan",
    description: "Developed an OCR model using DonutProcessor and Vision Encoder Decoder Model for document text extraction. Integrated Gradual Augmentation Strategy, enhancing model robustness. Optimized training pipeline with PyTorch Lightning, and implemented AdamW optimizer with learning rate scheduling for efficiency.",
    longDescription: "An advanced Optical Character Recognition (OCR) system built with state-of-the-art deep learning models. Uses DonutProcessor and Vision Encoder Decoder architecture for accurate text extraction from various document types. Features robust training pipeline optimization and gradual augmentation strategies for improved performance.",
    image: "/projects/accuscan.jpg",
    technologies: ["Python", "PyTorch", "Transformers", "OCR", "Deep Learning", "Computer Vision", "PyTorch Lightning"],
    github: "https://github.com/shashank11yadav/AccuScan",
    featured: true,
    category: "ai"
  },
  {
    id: "3",
    title: "GestureSign",
    description: "Developed a real-time Sign Language Recognition System using Recurrent Neural Networks (RNNs). Implemented hand landmark detection and an adaptive feature extraction pipeline, optimizing gesture recognition across various hand visibility scenarios.",
    longDescription: "A cutting-edge real-time sign language recognition system that bridges communication gaps. Built with RNNs and advanced computer vision techniques, it features robust hand landmark detection, adaptive feature extraction, and optimized gesture recognition that works across various lighting and visibility conditions.",
    image: "/projects/gesturesign.jpg",
    technologies: ["Python", "RNN", "Computer Vision", "Deep Learning", "Hand Detection", "Feature Extraction", "Google Colab"],
    github: "https://github.com/shashank11yadav/GestureSign",
    featured: false,
    category: "ai"
  },
  {
    id: "4",
    title: "LipNet",
    description: "Developed an AI-driven sentence-level lipreading model for real-time speech-to-text conversion from lip movements. Integrated Spatiotemporal Convolutions and Recurrent Neural Networks (RNNs) to enhance visual feature extraction and sequence modeling for improved text prediction.",
    longDescription: "An innovative AI system that converts lip movements to text in real-time. Combines spatiotemporal convolutions with RNNs for advanced visual feature extraction and sequence modeling. This breakthrough technology enables communication assistance for hearing-impaired individuals and silent speech recognition.",
    image: "/projects/lipnet.jpg",
    technologies: ["Python", "AI", "Lip-Reading", "Speech-to-Text", "RNN", "Spatiotemporal Convolutions", "Deep Learning"],
    github: "https://github.com/shashank11yadav/Lipnet",
    featured: true,
    category: "ai"
  },
  {
    id: "5",
    title: "Buzz Room",
    description: "Developed a high-performance Android chat application with real-time messaging, image sharing, and OTP-based authentication, enhancing user security and engagement. Integrated advanced features such as status updates, message reactions, profile customization, and group/individual chat.",
    longDescription: "A feature-rich Android chat application that provides seamless communication experience. Built with Java and Firebase, it includes real-time messaging, secure OTP authentication, image sharing, status updates, message reactions, profile customization, and both group and individual chat capabilities with responsive UI/UX design.",
    image: "/projects/buzzroom.jpg",
    technologies: ["Java", "Android Studio", "Firebase", "Real-Time Messaging", "OTP Authentication", "UI/UX Design"],
    github: "https://github.com/shashank11yadav/BuzzRoom",
    featured: false,
    category: "mobile"
  },
  {
    id: "6",
    title: "India Corona Tracker",
    description: "Developed an Android application for real-time COVID-19 statistics, integrating APIs to provide state-wise updates on active cases, deaths, and recoveries.",
    longDescription: "A comprehensive COVID-19 tracking application for India that provides real-time statistics and updates. Features state-wise data visualization, API integration for live updates, and intuitive interface for tracking active cases, deaths, and recoveries across different Indian states and territories.",
    image: "/projects/corona-tracker.jpg",
    technologies: ["Java", "Android Studio", "API Integration", "Data Visualization", "Mobile Development"],
    github: "https://github.com/shashank11yadav/India-Corona-Tracker",
    featured: false,
    category: "mobile"
  },
  {
    id: "7",
    title: "Snake Game",
    description: "Implemented a classic Snake Game using JavaScript and HTML5 Canvas, featuring dynamic snake movement, food spawning, score tracking, and game over alerts.",
    longDescription: "A modern implementation of the classic Snake game using vanilla JavaScript and HTML5 Canvas. Features smooth snake movement mechanics, dynamic food spawning, real-time score tracking, game over detection, and responsive controls. Built with clean code architecture and engaging visual design.",
    image: "/projects/snake-game.jpg",
    technologies: ["JavaScript", "HTML5 Canvas", "CSS", "Game Development", "Event Handling"],
    github: "https://github.com/shashank11yadav/Snake-game",
    featured: false,
    category: "web"
  },
  {
    id: "8",
    title: "Sudoku Solver",
    description: "Developed a web-based Sudoku Solver with puzzle generation and solving capabilities, utilizing HTML, CSS, JavaScript, and Bootstrap. Implemented a backtracking algorithm for puzzle solutions and AJAX for API requests.",
    longDescription: "An intelligent web-based Sudoku solver that can both generate and solve puzzles automatically. Features a clean Bootstrap interface, implements advanced backtracking algorithms for puzzle solving, includes AJAX for seamless API communication, and provides an intuitive user experience for Sudoku enthusiasts.",
    image: "/projects/sudoku.jpg",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "AJAX", "Backtracking Algorithm"],
    github: "https://github.com/shashank11yadav/Sudoku",
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
  { name: "React.js", level: 95, category: "frontend", icon: "⚛️" },
  { name: "Next.js", level: 90, category: "frontend", icon: "▲" },
  { name: "TypeScript", level: 88, category: "frontend", icon: "📘" },
  { name: "JavaScript", level: 92, category: "frontend", icon: "🟨" },
  { name: "HTML", level: 95, category: "frontend", icon: "🌐" },
  { name: "CSS", level: 90, category: "frontend", icon: "🎨" },
  
  // Backend
  { name: "Node.js", level: 90, category: "backend", icon: "🟢" },
  { name: "Express.js", level: 88, category: "backend", icon: "🚀" },
  { name: "Python", level: 90, category: "backend", icon: "🐍" },
  { name: "Java", level: 85, category: "backend", icon: "☕" },
  { name: "C++", level: 94, category: "backend", icon: "🔧" },
  { name: "C", level: 80, category: "backend", icon: "📝" },
  
  // Mobile
  { name: "Kotlin", level: 75, category: "mobile", icon: "📱" },
  { name: "Android Studio", level: 75, category: "mobile", icon: "🤖" },
  
  // AI/ML
  { name: "PyTorch", level: 91, category: "ai", icon: "🔥" },
  { name: "TensorFlow", level: 80, category: "ai", icon: "🧠" },
  { name: "Keras", level: 78, category: "ai", icon: "🎯" },
  { name: "scikit-learn", level: 82, category: "ai", icon: "📊" },
  { name: "XGBoost", level: 80, category: "ai", icon: "🚀" },
  { name: "OpenCV", level: 80, category: "ai", icon: "👁️" },
  
  // Database
  { name: "PostgreSQL", level: 85, category: "database", icon: "🐘" },
  { name: "MySQL", level: 82, category: "database", icon: "🐬" },
  { name: "MongoDB", level: 80, category: "database", icon: "🍃" },
  { name: "Redis", level: 81, category: "database", icon: "🔴" },
  { name: "SQL", level: 95, category: "database", icon: "🗃️" },
  
  // Cloud
  { name: "AWS", level: 80, category: "cloud", icon: "☁️" },
  { name: "Docker", level: 85, category: "cloud", icon: "🐳" },
  { name: "Kubernetes", level: 75, category: "cloud", icon: "⚙️" },
  { name: "Firebase", level: 90, category: "cloud", icon: "🔥" },
  
  // Tools
  { name: "Git", level: 95, category: "tools", icon: "📚" },
  { name: "GitHub", level: 90, category: "tools", icon: "🐱" },
  { name: "Jenkins", level: 80, category: "tools", icon: "🔧" },
  { name: "JUnit", level: 82, category: "tools", icon: "✅" },
  { name: "Postman", level: 85, category: "tools", icon: "📮" },
  { name: "MATLAB", level: 80, category: "tools", icon: "📐" },
  
  // Other
  { name: "Rust", level: 70, category: "other", icon: "🦀" },
  { name: "Spring Boot", level: 92, category: "other", icon: "🌱" },
  { name: "REST APIs", level: 90, category: "other", icon: "🔗" },
  { name: "Bootstrap", level: 85, category: "other", icon: "🅱️" },
  { name: "Hugging Face", level: 78, category: "other", icon: "🤗" },
  { name: "CUDA", level: 80, category: "other", icon: "⚡" }
];