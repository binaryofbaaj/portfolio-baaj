export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  features: string[];
  github: string;
  live: string;
  color: string;
  comingSoon?: boolean;
}

export interface Skill {
  name: string;
}

export interface SkillCategory {
  title: string;
  command: string;
  items: Skill[];
  color: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  points: string[];
  color: string;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  cgpa?: string;
  status?: string;
  color: string;
}

export interface Achievement {
  title: string;
  description: string;
  icon: string;
}

export const personalInfo = {
  name: "Gurman Singh",
  fullName: "Gurman Singh Budhiraja",
  title: "AI/ML Engineer | Full Stack Developer",
  email: "gurmansingh9837@gmail.com",
  degree: "B.Tech CSE",
  cgpa: "8.32",
  university: "Graphic Era University",
  description:
    "I am a B.Tech Computer Science graduate from Graphic Era Deemed to be University (Class of 2025) with a CGPA of 8.32. I will be joining UPES Dehradun in July 2026 for further studies. I am an aspiring AI/ML Engineer focused on building intelligent, data-driven systems and solving real-world problems. I have a strong foundation in full-stack development, which I leverage to create scalable and practical applications. Alongside this, I have a growing interest in cybersecurity, particularly in understanding system vulnerabilities, security fundamentals, and how modern systems can be made more resilient. I focus on building real-world projects with clean architecture, performance optimization, and strong user experience.",
  social: {
    github: "https://github.com/binaryofbaaj/graph-algorithm-visualizer",
    linkedin: "https://www.linkedin.com/in/gurman-singh-2032b0244/",
  },
};

export const skills: SkillCategory[] = [
  {
    title: "Languages",
    command: "cat ~/skills/languages.txt",
    items: [{ name: "Python" }, { name: "Java" }],
    color: "var(--accent-green)",
  },
  {
    title: "Web Technologies",
    command: "cat ~/skills/web.txt",
    items: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "TailwindCSS" },
      { name: "React" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "Socket.IO" },
    ],
    color: "var(--accent-cyan)",
  },
  {
    title: "Tools & Platforms",
    command: "cat ~/skills/tools.txt",
    items: [
      { name: "GitHub" },
      { name: "Docker" },
      { name: "VS Code" },
      { name: "FastAPI" },
    ],
    color: "var(--accent-purple)",
  },
  {
    title: "Databases",
    command: "cat ~/skills/databases.txt",
    items: [{ name: "MySQL" }],
    color: "#ff6b00",
  },
];

export const projects: Project[] = [
  {
    title: "Standard Electricals",
    description:
      "A full-stack generator rental and enquiry management platform built to streamline booking workflows and fleet management.",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "EmailJS"],
    features: [
      "Fleet catalog with KVA ratings and pricing",
      "Dynamic rental cost calculator",
      "Prisma + PostgreSQL for data handling",
      "EmailJS integration for instant enquiry notifications",
    ],
    github: "https://github.com/binaryofbaaj",
    live: "https://ms-generators-2m86.vercel.app/",
    color: "var(--accent-green)",
  },
  {
    title: "Retro 3D Portfolio",
    description:
      "An interactive 3D portfolio featuring a cinematic globe, terminal-based navigation, and a gamified spin-to-play audio system.",
    tech: ["Next.js 15", "Three.js (R3F)", "Framer Motion", "Tailwind CSS", "EmailJS"],
    features: [
      "Built using Three.js with real-time rendering",
      "Custom terminal interface with command system",
      "Dual-theme UI with micro-interactions",
    ],
    github: "https://github.com/binaryofbaaj/portfolio-baaj",
    live: "https://baaj-portfolio.netlify.app/",
    color: "var(--accent-cyan)",
  },
  {
    title: "Graph Algorithm Visualizer",
    description:
      "An interactive visualization tool for understanding graph algorithms through real-time animations.",
    tech: ["HTML", "CSS", "JavaScript"],
    features: [
      "Step-by-step algorithm visualization",
      "Interactive user inputs",
      "Optimized rendering performance",
    ],
    github: "https://github.com/binaryofbaaj/graph-algorithm-visualizer",
    live: "https://binaryofbaaj.github.io/graph-algorithm-visualizer/",
    color: "var(--accent-purple)",
  },
  {
    title: "Visually — Algorithm Visualizer",
    description:
      "An interactive algorithm visualization platform with step-by-step animations and source code in C++, Java, and Python.",
    tech: ["HTML5", "CSS3", "Vanilla JavaScript", "Canvas API"],
    features: [
      "20 Algorithm Visualizations across 7 categories",
      "Step-by-step animations with play/pause and speed control",
      "Source code with syntax highlighting",
      "Dark & Light themes with smooth transitions"
    ],
    github: "https://github.com/binaryofbaaj/Visually",
    live: "https://binaryofbaaj.github.io/Visually/",
    color: "var(--accent-orange)",
  },
  {
    title: "Unify — Academic Operating System",
    description:
      "A comprehensive, modern Academic Operations System designed to bridge the gap between Students, Teachers, and Administration.",
    tech: ["Next.js 15", "Tailwind CSS", "MongoDB", "NextAuth.js", "Shadcn UI"],
    features: [
      "Unified Dashboard and Assignment Tracking for students",
      "Test Center, Grades Hub, and Announcement Management for teachers",
      "Secure Server-Side Session Validation with Role-based JWTs",
      "Shadow-routed System Administration with Bulk CSV Import"
    ],
    github: "https://github.com/binaryofbaaj/Unify.git",
    live: "#",
    color: "var(--accent-green)",
    comingSoon: true,
  },
];

export const education: Education[] = [
  {
    school: "Graphic Era Deemed to be University",
    degree: "B.Tech in Computer Science",
    period: "2021 – 2025",
    cgpa: "8.32",
    color: "var(--accent-green)",
  },
  {
    school: "UPES Dehradun",
    degree: "M.Tech",
    status: "Upcoming",
    period: "Starting: July 2026",
    color: "var(--accent-cyan)",
  },
];

export const experience: Experience[] = [
  {
    role: "Cloud Computing Intern",
    company: "Amazon Web Services (AWS)",
    period: "2024",
    points: [
      "Learned EC2 instance setup and management",
      "Configured IAM roles, policies, and permissions",
      "Gained hands-on experience with virtual infrastructure",
      "Explored cloud architecture and deployment fundamentals",
    ],
    color: "var(--accent-orange)",
  },
];

export const achievements: Achievement[] = [
  {
    title: "TEDx Participant",
    description:
      "Participated in TEDx events, engaging with thought leaders and innovative ideas that shaped a broader perspective on technology and society.",
    icon: "🎤",
  },
  {
    title: "World Congress on Disaster Management",
    description:
      "Attended the World Congress on Disaster Management, gaining insights into technology's role in crisis response and resilience building.",
    icon: "🌍",
  },
];


export const defaultTracks: Track[] = [
  {
    id: "1",
    title: "Praise God",
    artist: "Kanye West",
    url: "https://files.cvaultx.com/wp-content/uploads/music/2021/09/Kanye_West_-_Praise_God_CeeNaija.com_.mp3",
  },
  {
    id: "2",
    title: "Every Breath You Take",
    artist: "The Police",
    url: "https://pagallworlds.com/wp-content/uploads/2023/11/Every-Breath-You-Take.mp3",
  },
  {
    id: "3",
    title: "Synthwave Dreams",
    artist: "Cyberman",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "4",
    title: "Neon Nights",
    artist: "HackerOne",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "5",
    title: "Digital Horizon",
    artist: "GridRunner",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

export const terminalCommands: Record<string, string> = {
  help: `Available commands:
  about      - Learn about me
  skills     - View my tech stack
  projects   - Browse my projects
  experience - See my work history
  contact    - Get in touch
  theme      - Toggle terminal theme
  music      - Play background music
  clear      - Clear terminal
  neofetch   - System info
  sudo rm -rf / - Don't even try 😏`,
  about: `┌──────────────────────────────────────┐
│  GURMAN SINGH BUDHIRAJA             │
│  ──────────────────────────────────  │
│  Role:  AI/ML Engineer & Dev        │
│  Degree: B.Tech CSE (8.32 CGPA)    │
│  Univ:  Graphic Era & UPES          │
│                                     │
│  Focused on AI/ML systems and        │
│  full-stack web applications.      │
│  Cybersecurity aspirant.            │
└──────────────────────────────────────┘`,
  skills: `> Languages:    Python, Java
> Web:          HTML, CSS, TailwindCSS, React,
                Node.js, Express.js, Socket.IO
> Tools:        GitHub, Docker, VS Code, FastAPI
> Databases:    MySQL`,
  projects: `[1] Standard Electricals - Generator Rental System
[2] Retro 3D Portfolio   - Interactive Workspace
[3] AlgoVisualizer       - Graph Visualizer
[4] Visually             - Algorithm Visualizer
[5] Unify                - Academic OS

Type 'projects <number>' for details.`,
  experience: `┌─ AWS Cloud Computing Intern (2024) ─┐
│  • EC2 instance management          │
│  • IAM roles & permissions          │
│  • Virtual infrastructure setup     │
│  • Cloud architecture fundamentals  │
└─────────────────────────────────────┘`,
  contact: `📧 Email:    gurmansingh9837@gmail.com
🐙 GitHub:   github.com/binaryofbaaj
💼 LinkedIn: linkedin.com/in/gurman-singh-2032b0244/`,
  neofetch: `        ██████╗ ███████╗
       ██╔════╝ ██╔════╝     gurman@portfolio
       ██║  ███╗███████╗     ──────────────────
       ██║   ██║╚════██║     OS: Portfolio v1.0
       ╚██████╔╝███████║     Shell: Next.js 16
        ╚═════╝ ╚══════╝     Terminal: Custom
                              Uptime: Always
   Gurman Singh               Theme: Retro Hacker
                              Packages: 420
                              Memory: ∞ motivation`,
  music: `🎶 Music Commands:
[1] Praise God             - Kanye West
[2] Every Breath You Take  - The Police
[3] Synthwave Dreams       - Cyberman
[4] Neon Nights            - HackerOne
[5] Digital Horizon        - GridRunner

Scroll to ~/music section to play and add tracks!`,
  "sudo rm -rf /": `Nice try, hacker! 🚫
Permission denied. This portfolio is indestructible. 💪`,
};
