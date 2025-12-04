import type { Education, Project } from '../types';

export const education: Education[] = [
  {
    school: "University of Washington Tacoma",
    degree: "BS in Computer Science and Systems, Minor in Mathematics",
    location: "Tacoma, WA, USA",
    period: "2022 - Present",
    image: "https://washingtontechnology.org/wp-content/uploads/2014/09/5385797307_a8bc2335f1_b.jpg"
  },
  {
    school: "Tacoma Community College",
    degree: "Associate's Degree in  Computer Engineering",
    location: "Tacoma, WA, USA",
    period: "2019 - 2022",
    image: "https://websterart.com/tcc/images/15-1big.jpg"
  },
  {
    school: "St. Mary's College Kisubi",
    degree: "O-Level Education",
    location: "Kisubi, Uganda",
    period: "2015 - 2018",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-XGwiuflevzAjJhmPC3LqN_1dK-LN58IGgGweHSM29DRzgrKCvA2OdQRDRsBGP5wrx9nuu4h216_O6S0AdSLVuz3QHKtiBRfTZIM0miOX_SQLsVwg_G3K4P2ahGHMaXD33xpHhh6DhMdn/s1600/Slide10.JPG"
  },
  {
    school: "St. Augustine's College Wakiso",
    degree: "A-Level Education",
    location: "Wakiso, Uganda",
    period: "2019",
    image: "https://ayoma.co.ug/wp-content/uploads/2023/04/St.-Augustines-College-Wakiso-2.jpg.webp"
  }
];

export const projects: Project[] = [
  {
    title: "Bgcdllc - General Contractor",
    description: "Construction services site for a general contractor with services list and contact form.",
    technologies: ["React", "TailwindCSS", "Next.js"],
    githubUrl: "https://github.com/mbabazielroy/bgcd1",
    liveUrl: "https://bgcdllc.com",
    image: "https://images.unsplash.com/photo-1451471016731-e963a8588be8?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Shine&Demure - cleaning products and services",
    description: "Cleaning products and services site with offering overview and contact options.",
    technologies: ["React", "TailwindCSS", "Next.js"],
    githubUrl: "https://github.com/mbabazielroy/shinedemure",
    liveUrl: "https://shinedemure.com",
    image: "https://images.unsplash.com/photo-1581574209469-6c9c5c5c8696?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "PaintManager",
    description: "Java app to organize painting projects and color selections.",
    technologies: ["Java"],
    githubUrl: "https://github.com/mbabazielroy/Paint-Manager",
    liveUrl: "",
    image: "https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "AI Travel Planner",
    description: "Next.js 14 travel planner that generates and saves itineraries with Firebase auth, Firestore, and OpenAI.",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Firebase", "OpenAI API"],
    githubUrl: "https://github.com/mbabazielroy/ai-travel-planner",
    liveUrl: "",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Email Tracker",
    description: "Next.js + Prisma starter for email event tracking and link analytics.",
    technologies: ["Next.js", "TypeScript", "Prisma", "TailwindCSS"],
    githubUrl: "https://github.com/mbabazielroy/email-tracker",
    liveUrl: "",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Expo Travel Companion",
    description: "Expo Router mobile client that uses the travel planner backend for auth and itineraries.",
    technologies: ["React Native", "Expo", "TypeScript", "Firebase"],
    githubUrl: "https://github.com/mbabazielroy/mobile",
    liveUrl: "",
    image: "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Portfolio Site",
    description: "This portfolio built with React, TypeScript, and TailwindCSS plus an AI project recommender.",
    technologies: ["React", "TypeScript", "TailwindCSS", "Vite"],
    githubUrl: "https://github.com/mbabazielroy/portfolio",
    liveUrl: "https://portfolio-fawn-iota-57.vercel.app",
    image: "/protfolio.png"
  },
  {
    title: "Maze Runner AI",
    description: "Python BFS, DFS, and A* solver that finds paths in maze layouts for course 435.",
    technologies: ["Python", "Search Algorithms"],
    githubUrl: "https://github.com/mbabazielroy/435_Assignment",
    liveUrl: "",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Naive Sentiment Analyzer",
    description: "Rule based wordlist sentiment scorer for positive, negative, or neutral text.",
    technologies: ["Python", "NLP"],
    githubUrl: "https://github.com/mbabazielroy/Naive_SA",
    liveUrl: "",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Multi-Channel CNN Sentiment",
    description: "Multi channel CNN notebook that classifies movie review sentiment with varied kernel sizes.",
    technologies: ["Python", "CNN", "NLP"],
    githubUrl: "https://github.com/mbabazielroy/SA_nCC",
    liveUrl: "",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Spreadsheet ADT",
    description: "Java spreadsheet ADT with expression tree formula parsing and computed cell values.",
    technologies: ["Java", "Data Structures"],
    githubUrl: "https://github.com/mbabazielroy/Spreadsheet-ADT-master",
    liveUrl: "",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Student Budget Planner",
    description: "Java MVC desktop budget tracker with JSON storage and exportable reports.",
    technologies: ["Java", "JSON"],
    githubUrl: "https://github.com/mbabazielroy/TeamProject-master",
    liveUrl: "",
    image: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "TicTacToe",
    description: "Java TicTacToe with win detection and two player UI.",
    technologies: ["Java"],
    githubUrl: "https://github.com/mbabazielroy/TicTacToe",
    liveUrl: "",
    image: "/TicTacToe.png"
  },
];
