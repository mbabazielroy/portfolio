export interface Education {
  school: string;
  degree: string;
  location: string;
  period: string;
  image: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}