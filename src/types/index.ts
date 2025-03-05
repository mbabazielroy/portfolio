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
  image: string;
  // Make both property sets optional but ensure at least one set exists
  // First format properties
  tags?: string[];
  github?: string;
  demo?: string;
  // Second format properties
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
