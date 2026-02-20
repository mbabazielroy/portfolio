import type { Education, Experience, Project } from '../types';

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

export const experience: Experience[] = [
  {
    title: "Founder & CEO",
    company: "Mbabazi Technologies Inc.",
    location: "Ontario, Canada",
    period: "2024 - Present",
    bullets: [
      "Founded Mbabazi Technologies Inc., an Ontario-incorporated company building software focused on trust, safety, and usability in everyday digital systems.",
      "Created Sendly end-to-end — a mobile money platform for East Africa that replaces phone numbers with usernames and adds recipient confirmation to reduce transaction errors.",
      "Running user testing and applying to startup incubators and validation programs while iterating on the MVP."
    ],
    tags: ["Engineering", "Product"],
    technologies: ["React Native", "TypeScript", "Firebase", "Product Design", "Startup"]
  },
  {
    title: "Freelance Full-Stack Developer",
    company: "Self-employed",
    location: "Remote",
    period: "2023 - Present",
    bullets: [
      "Built and launched production web apps for small businesses, owning UX, frontend, backend, and deployment.",
      "Integrated payment, auth, and analytics stacks to deliver end-to-end flows with clear dashboards for clients.",
      "Scoped projects with stakeholders, translated goals into milestones, and shipped iteratively with fast feedback."
    ],
    tags: ["Engineering", "Product"],
    technologies: ["React", "Next.js", "TypeScript", "TailwindCSS", "Firebase", "Node.js"]
  },
  {
    title: "Software Engineering Projects",
    company: "Academic & Personal",
    location: "Tacoma, WA",
    period: "2021 - 2023",
    bullets: [
      "Developed Java desktop apps (TicTacToe, Spreadsheet ADT, Budget Planner) with MVC patterns and automated tests.",
      "Built Python ML/NLP projects (sentiment models, search algorithms) emphasizing clean data pipelines and evaluation.",
      "Collaborated with peers on version control, code reviews, and documentation to deliver maintainable features."
    ],
    tags: ["Engineering"],
    technologies: ["Java", "Python", "C/C++", "React", "Data Structures", "ML/NLP"]
  },
  {
    title: "Student Vice President of Legislation",
    company: "Tacoma Community College",
    location: "Tacoma, WA",
    period: "2020 - 2021",
    bullets: [
      "Represented student interests to college leadership; coordinated policy updates and campus feedback loops.",
      "Led forums and surveys to surface student needs, summarizing findings into actionable recommendations.",
      "Partnered with faculty and peers to improve engagement and transparency on key legislative priorities."
    ],
    tags: ["Leadership", "Policy"],
    technologies: ["Leadership", "Stakeholder Management", "Public Speaking", "Policy Advocacy"]
  },
  {
    title: "Student Vice President of Finance",
    company: "Tacoma Community College",
    location: "Tacoma, WA",
    period: "2021 - 2022",
    bullets: [
      "Managed budgeting and allocation for student initiatives, improving clarity on spend and impact.",
      "Introduced simple reporting cadences and dashboards to track usage and outcomes for funded programs.",
      "Collaborated with student orgs to prioritize funds toward high-impact events and services."
    ],
    tags: ["Leadership", "Operations"],
    technologies: ["Budgeting", "Financial Reporting", "Cross-team Collaboration", "Operations"]
  },
  {
    title: "Research Assistant, Office of Equity, Inclusion & Diversity",
    company: "University of Washington Tacoma",
    location: "Tacoma, WA",
    period: "2022 - 2023",
    bullets: [
      "Supported the Vice Chancellor’s office with qualitative and quantitative research on equity initiatives.",
      "Compiled reports and presentations to surface findings to leadership and student groups.",
      "Collaborated with cross-functional stakeholders to gather feedback and highlight gaps in inclusion efforts."
    ],
    tags: ["Research", "Equity"],
    technologies: ["Research", "Data Analysis", "Reporting", "Stakeholder Engagement"]
  }
];

export const projects: Project[] = [
  {
    title: "Sendly",
    description: "Mobile money platform for East Africa that reduces transaction errors by replacing phone numbers with usernames and adding recipient confirmation before funds are sent.",
    technologies: ["React Native", "TypeScript", "Firebase", "Expo"],
    githubUrl: "",
    liveUrl: "",
    image: "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?auto=format&fit=crop&q=80&w=1600"
  },
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
    image: "/paintmanger.png"
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
    image: "/NSA.png"
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
    image: "/SpreadsheetADT.png"
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
