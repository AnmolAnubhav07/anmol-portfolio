// ---------------------------------------------------------------------------
// All editable portfolio content lives in this file.
// Update the values below — you shouldn't need to touch component files
// just to change text, links, or add a project/skill.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Anmol Anubhav",
  role: "Full Stack Developer",
  tagline: "AI & Web Applications",
  typingLines: [
    "Building AI-powered web experiences.",
    "Full Stack Developer.",
    "React • Next.js • Supabase • AI",
  ],
  email: "anmolanubhab02@gmail.com",
  github: "https://github.com/AnmolAnubhav07",
  githubHandle: "AnmolAnubhav07",
  resumeUrl: "/resume/Anmol_Anubhav_Resume.pdf",
  location: "India",
  availability: "Open to internships & freelance work",
};

export const about = {
  paragraphs: [
    `Hi, I'm Anmol Anubhav, a B.Tech Computer Science Engineering student at Future Institute of Engineering and Management (FIEM), graduating in 2028.`,
    `I'm passionate about Artificial Intelligence, Full Stack Development, and building modern web applications.`,
    `I enjoy transforming ideas into real products using modern technologies while continuously learning new AI tools and frameworks.`,
  ],
};

export const education = {
  institution: "Future Institute of Engineering and Management (FIEM)",
  degree: "B.Tech, Computer Science Engineering",
  years: "2024 – 2028",
  cgpa: "7.9",
};

export const stats = [
  { label: "CGPA", value: 7.9, suffix: "" },
  { label: "Hackathons", value: 5, suffix: "+" },
  { label: "Projects Built", value: 4, suffix: "+" },
  { label: "Technologies", value: 12, suffix: "+" },
];

export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    category: "Backend",
    skills: ["Supabase", "Firebase", "REST APIs", "Authentication"],
  },
  {
    category: "Database",
    skills: ["Supabase", "Firebase", "SQL"],
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "VS Code", "Vercel"],
  },
  {
    category: "AI",
    skills: [
      "Prompt Engineering",
      "AI Automation",
      "LLMs",
      "AI Website Development",
      "OpenAI APIs",
    ],
  },
  {
    category: "Other",
    skills: ["Trading", "Problem Solving", "Freelancing"],
  },
];

export type ExperienceItem = {
  title: string;
  meta: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    title: "Industrial Training",
    meta: "Current",
    points: [
      "Learning industry-standard full stack development",
      "Working on AI projects",
      "Building production-ready applications",
    ],
  },
  {
    title: "Freelancing",
    meta: "Ongoing",
    points: [
      "Developing websites for independent clients",
      "Building AI-assisted solutions",
      "Managing client projects end to end",
    ],
  },
  {
    title: "Hackathons",
    meta: "Multiple",
    points: [
      "Participated in multiple hackathons",
      "Built innovative AI projects under time pressure",
      "Worked in collaborative teams",
    ],
  },
];

export const journey = [
  { label: "Started Programming", state: "done" as const },
  { label: "Learned React", state: "done" as const },
  { label: "Built Full Stack Apps", state: "done" as const },
  { label: "Started Freelancing", state: "done" as const },
  { label: "Industrial Training", state: "active" as const },
  { label: "Learning AI", state: "active" as const },
  { label: "Future Goals", state: "upcoming" as const },
];

export type Project = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  image?: string;
  github?: string;
  demo?: string;
  status?: string;
};

export const projects: Project[] = [
  {
    slug: "ai-interview-platform",
    title: "Interviewer.AI",
    description:
      "An AI-powered mock interview platform — configure interview type, difficulty, and domain, then practice technical, coding, and behavioral rounds. Includes AI feedback, a resume analyzer, and a dedicated coding round.",
    stack: ["Next.js", "AI Feedback", "Resume Analyzer", "TypeScript"],
    image: "/images/project-interviewer.png",
    demo: "https://neo-interviewer.lovable.app",
    status: "Live",
  },
  {
    slug: "ai-website-builder",
    title: "WebdevsAI",
    description:
      "An AI website builder — describe an idea in plain language and it generates a full site, single-page or multi-page with shared navigation, ready to build on.",
    stack: ["React", "AI Generation", "Vercel"],
    image: "/images/project-webdevsai.png",
    demo: "https://build-from-thought.vercel.app",
    status: "Live",
  },
  {
    slug: "rd-pro",
    title: "RD-PRO",
    description:
      "An AI-powered business operating system — one dashboard for sales, orders, profit, inventory, and revenue tracking, built to help a business run its entire operation from a single platform.",
    stack: ["Next.js", "Dashboards", "Automation"],
    image: "/images/project-rdpro.png",
    demo: "https://rd-pro-elevate.vercel.app",
    status: "Live",
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    description:
      "This site — a Next.js + Supabase portfolio with a live visitor counter, dark/light mode, and a contact form wired to a real backend.",
    stack: ["Next.js", "Framer Motion", "Supabase", "Tailwind CSS"],
    github: profile.github,
    status: "Live",
  },
];

export type GalleryItem = {
  id: number;
  image?: string;
  label: string;
};

export const galleryPlaceholders: GalleryItem[] = [
  { id: 1, image: "/images/anmol.jpg", label: "Anmol Anubhav" },
  { id: 2, image: "/images/team.jpg", label: "Working session with the team" },
];
