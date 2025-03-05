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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import EducationCard from './components/EducationCard';
import Navbar from './components/Navbar';
import SectionHeading from './components/SectionHeading';
import SkillCard from './components/SkillCard';
import { education, projects } from './data';
import ChatBot from './components/ChatBot';

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
                I am a senior Computer Science student at the University of Washington
                with a minor in Mathematics. My journey in technology has equipped me
                with strong programming skills in Python, Java, C, C++, and web
                technologies.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Through my academic journey across different continents, I've developed
                a unique perspective and adaptability that enhances my problem-solving
                abilities.
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
                  href="mbabazielroy@yahoo.com"
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:scale-110 transition-transform"
                >
                  <Mail className="w-6 h-6" />
                </a>
                <a
                  href="tel:+12526787959"
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Suspense key={index} fallback={<div>Loading...</div>}>
                <ProjectCardLazy key={index} project={project} />
              </Suspense>
            ))}
          </div>
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
                  <span>mbabazielroy@yahoo.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <span>+1 (253) 678-7959</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <Github className="w-5 h-5 text-blue-600" />
                  </div>
                  <a href="https://github.com/mbabazielroy" className="hover:text-blue-600">
                    github.com/username
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                  </div>
                  <a href="https://www.linkedin.com/in/elroy-mbabazi/" className="hover:text-blue-600">
                    linkedin.com/in/username
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
