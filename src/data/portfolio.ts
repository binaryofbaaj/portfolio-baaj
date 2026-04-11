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

export interface Achievement {
  title: string;
  description: string;
  icon: string;
}

export const personalInfo = {
  name: "Gurman Singh",
  fullName: "Gurman Singh Budhiraja",
  title: "Full Stack Developer | AI Enthusiast",
  email: "gurmansingh9837@gmail.com",
  degree: "B.Tech CSE",
  cgpa: "8.32",
  university: "Graphic Era University",
  description:
    "Passionate developer with a focus on full-stack and AI-based applications. Strong problem-solving mindset with experience building scalable, real-time systems. I love turning complex ideas into elegant, user-friendly software.",
  social: {
    github: "https://github.com/binaryofbaaj",
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
      "Professional generator rental and enquiry management platform built for Standard Electricals. Features a fleet catalog, smart calculator, and automated EmailJS booking notifications.",
    tech: ["Next.js 14", "Tailwind CSS", "TypeScript", "Prisma", "PostgreSQL", "EmailJS"],
    features: [
      "Fleet Catalog with KVA ratings & daily pricing",
      "Smart Calculator for dynamic rental costs",
      "Automated Database Enquiries via Prisma",
      "Instant Email Alerts targeting owners via EmailJS",
    ],
    github: "https://github.com/binaryofbaaj",
    live: "https://ms-generators-2m86.vercel.app",
    color: "var(--accent-green)",
  },
  {
    title: "Chit-Chat",
    description:
      "Real-time chat application with a rich feature set including group chats, file sharing, and emoji support — built for seamless communication.",
    tech: ["MongoDB", "Express.js", "React", "Node.js", "Socket.IO"],
    features: [
      "JWT authentication & authorization",
      "Real-time group chat with Socket.IO",
      "File sharing capabilities",
      "Emoji support & rich messaging",
    ],
    github: "https://github.com/binaryofbaaj",
    live: "#",
    color: "var(--accent-cyan)",
  },
  {
    title: "AlgoVisualizer",
    description:
      "Interactive sorting algorithm visualizer that brings algorithms to life with step-by-step animations, helping learners understand how sorting works.",
    tech: ["HTML", "CSS", "JavaScript"],
    features: [
      "Bubble Sort visualization",
      "Selection Sort visualization",
      "Quick Sort visualization",
      "Merge Sort visualization",
      "Step-by-step animation controls",
    ],
    github: "https://github.com/binaryofbaaj",
    live: "https://binaryofbaaj.github.io/graph-algorithm-visualizer/",
    color: "var(--accent-purple)",
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
    title: "Synthwave Dreams",
    artist: "Cyberman",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "2",
    title: "Neon Nights",
    artist: "HackerOne",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "3",
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
│  Role:  Full Stack Developer        │
│  Degree: B.Tech CSE (8.32 CGPA)    │
│  Univ:  Graphic Era University      │
│                                     │
│  Passionate developer focused on    │
│  full-stack + AI applications.      │
│  Strong problem-solving mindset.    │
└──────────────────────────────────────┘`,
  skills: `> Languages:    Python, Java
> Web:          HTML, CSS, TailwindCSS, React,
                Node.js, Express.js, Socket.IO
> Tools:        GitHub, Docker, VS Code, FastAPI
> Databases:    MySQL`,
  projects: `[1] Standard Electricals - Generator Rental System
[2] Chit-Chat      - Real-time Chat Application
[3] AlgoVisualizer - Sorting Algorithm Visualizer

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
[1] Synthwave Dreams - Cyberman
[2] Neon Nights      - HackerOne
[3] Digital Horizon  - GridRunner

Scroll to ~/music section to play and add tracks!`,
  "sudo rm -rf /": `Nice try, hacker! 🚫
Permission denied. This portfolio is indestructible. 💪`,
};
