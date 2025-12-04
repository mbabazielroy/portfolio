import {
  Code,
  Database,
  FileCode,
  Github,
  Linkedin,
  Mail,
  Phone,
  Server
} from 'lucide-react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useMemo, useState } from 'react';
import EducationCard from './components/EducationCard';
import Navbar from './components/Navbar';
import SectionHeading from './components/SectionHeading';
import SkillCard from './components/SkillCard';
import { education, projects } from './data';
import ChatBot from './components/ChatBot';
import BackToTopButton from './components/BackToTopButton';

const skills = [
  { name: 'Frontend Development', icon: <FileCode className="w-6 h-6" /> },
  { name: 'Backend Development', icon: <Server className="w-6 h-6" /> },
  { name: 'Database Management', icon: <Database className="w-6 h-6" /> },
  { name: 'Software Engineering', icon: <Code className="w-6 h-6" /> },
];

const ContactFormLazy = lazy(() => import('./components/ContactForm'));
const AdminMessagesLazy = lazy(() => import('./components/AdminMessages'));
const HeroLazy = lazy(() => import('./components/Hero'));
const ProjectCardLazy = lazy(() => import('./components/ProjectCard'));

function MainContent() {
  const [activeTech, setActiveTech] = useState<string>('All');

  const techOptions = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((project) => {
      const stack = project.technologies || project.tags || [];
      stack.forEach((tech) => techSet.add(tech));
    });
    return ['All', ...Array.from(techSet).sort()];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeTech === 'All') return projects;
    return projects.filter((project) => {
      const stack = project.technologies || project.tags || [];
      return stack.includes(activeTech);
    });
  }, [activeTech]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <HeroLazy />
      </Suspense>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="About Me"
            subtitle="A passionate developer with a unique perspective"
          />
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                I am a Computer Science graduate from the University of Washington
                with a minor in Mathematics, actively seeking full-time roles. I build
                reliable end-to-end products across Python, Java, C/C++, and modern
                web stacks, with experience shipping to production and supporting users.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Having studied and worked across different continents, I bring a
                collaborative mindset, clear communication, and strong problem-solving
                skills. I thrive in teams that care about impact, quality, and fast
                iteration.
              </p>
              <div className="flex gap-6">
                <a
                  href="https://github.com/mbabazielroy"
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:scale-110 transition-transform"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/elroy-mbabazi/"
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:scale-110 transition-transform"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="mailto:mbabazielroy@yahoo.com"
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:scale-110 transition-transform"
                >
                  <Mail className="w-6 h-6" />
                </a>
                <a
                  href="tel:+14372210664"
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:scale-110 transition-transform"
                >
                  <Phone className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <SkillCard key={skill.name} {...skill} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Education"
            subtitle="My academic journey across continents"
          />
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <EducationCard key={index} education={edu} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Projects"
            subtitle="Some of my recent work"
          />
          <div className="flex flex-wrap gap-3 mb-8">
            {techOptions.map((tech) => {
              const isActive = activeTech === tech;
              return (
                <button
                  key={tech}
                  onClick={() => setActiveTech(tech)}
                  aria-pressed={isActive}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>
          {filteredProjects.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              No projects match that technology yet. Try a different filter.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <Suspense key={index} fallback={<div>Loading...</div>}>
                  <ProjectCardLazy key={index} project={project} />
                </Suspense>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Contact Me"
            subtitle="Let's work together"
          />
          <div className="grid lg:grid-cols-2 gap-12">
            <Suspense fallback={<div>Loading...</div>}>
              <ContactFormLazy />
            </Suspense>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <a href="mailto:mbabazielroy@yahoo.com" className="hover:text-blue-600">
                    mbabazielroy@yahoo.com
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <a href="tel:+14372210664" className="hover:text-blue-600">
                    +1 (437) 221-0664
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <Github className="w-5 h-5 text-blue-600" />
                  </div>
                  <a href="https://github.com/mbabazielroy" className="hover:text-blue-600">
                    github.com/mbabazielroy
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                  </div>
                  <a href="https://www.linkedin.com/in/elroy-mbabazi/" className="hover:text-blue-600">
                    linkedin.com/in/elroy-mbabazi/
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 dark:text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} Elroy Mbabazi. All rights reserved.</p>
        </div>
      </footer>

      <BackToTopButton />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/admin" element={
          <Suspense fallback={<div>Loading...</div>}>
            <AdminMessagesLazy />
          </Suspense>
        } />
      </Routes>

      {/* Add the ChatBot component */}
      <ChatBot projects={projects} />
    </Router>
  );
}
