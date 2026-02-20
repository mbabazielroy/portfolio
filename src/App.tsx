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
import ExperienceCard from './components/ExperienceCard';
import Navbar from './components/Navbar';
import SectionHeading from './components/SectionHeading';
import SkillCard from './components/SkillCard';
import { education, experience, projects } from './data';
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
  const [sortOption, setSortOption] = useState<string>('live');
  const [activeExperienceTag, setActiveExperienceTag] = useState<string>('All');

  const experienceTags = useMemo(() => {
    const tagSet = new Set<string>();
    experience.forEach((exp) => {
      exp.tags?.forEach((t) => tagSet.add(t));
    });
    return ['All', ...Array.from(tagSet).sort()];
  }, []);

  const featuredProjects = useMemo(() => {
    const withLive = projects.filter((p) => p.liveUrl);
    return withLive.length ? withLive.slice(0, 3) : projects.slice(0, 3);
  }, []);

  const filteredExperience = useMemo(() => {
    if (activeExperienceTag === 'All') return experience;
    return experience.filter((exp) => exp.tags?.includes(activeExperienceTag));
  }, [activeExperienceTag]);

  const orderedProjects = useMemo(() => {
    const base = projects.filter((p) => !featuredProjects.find((f) => f.title === p.title));
    const sorted = [...base].sort((a, b) => {
      if (sortOption === 'live') {
        const aLive = a.liveUrl ? 1 : 0;
        const bLive = b.liveUrl ? 1 : 0;
        if (aLive !== bLive) return bLive - aLive;
        return a.title.localeCompare(b.title);
      }
      if (sortOption === 'az') return a.title.localeCompare(b.title);
      if (sortOption === 'za') return b.title.localeCompare(a.title);
      return 0;
    });
    return sorted;
  }, [featuredProjects, sortOption]);

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
                I'm a founder and product builder based in Canada, building software
                focused on trust, safety, and usability in everyday systems. I'm the
                founder of <strong className="text-gray-800 dark:text-gray-200">Mbabazi Technologies Inc.</strong>, an Ontario-incorporated company,
                and the creator of <strong className="text-gray-800 dark:text-gray-200">Sendly</strong> — a mobile money platform designed for East
                Africa that reduces transaction errors by replacing phone numbers with
                usernames and recipient confirmation.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                I have lived experience using mobile money systems in East Africa and
                am deeply familiar with their limitations, which informs a builder-first,
                problem-driven approach to product design. I've built Sendly's MVP
                end-to-end and am currently running user testing while applying to
                startup incubators and validation programs. My long-term focus is on
                building reliable digital infrastructure that improves trust and
                confidence in essential services.
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

      {/* How I Work & Testimonials */}
      <section id="how-i-work" className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How I Work"
            subtitle="Process, communication, and what to expect"
          />
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm space-y-4">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">Process</h4>
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li>Discovery → define scope, goals, timeline, and success criteria.</li>
                <li>Plan → architecture, milestones, and risk/assumption log.</li>
                <li>Build → iterative delivery with demos and async updates.</li>
                <li>Launch → handoff, docs, and light training if needed.</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm space-y-4">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">Testimonials & Trust</h4>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <p className="border-l-4 border-blue-500 pl-3">
                  “Clear communication, fast iterations, and reliable delivery on our web app.” — Small business client
                </p>
                <p className="border-l-4 border-blue-500 pl-3">
                  “Collaborative and thoughtful, especially around stakeholder needs and reporting.” — Campus leadership
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  References available on request. Happy to share more context in a call.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Experience"
            subtitle="Where I've applied my skills and delivered outcomes"
          />
          <div className="flex flex-wrap gap-2 mb-6">
            {experienceTags.map((tag) => {
              const isActive = activeExperienceTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveExperienceTag(tag)}
                  aria-pressed={isActive}
                  className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {filteredExperience.map((exp, index) => (
              <ExperienceCard key={index} experience={exp} />
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
          <div className="flex items-center gap-3 mb-6">
            <label className="text-sm text-gray-600 dark:text-gray-400" htmlFor="sort-projects">
              Sort by
            </label>
            <select
              id="sort-projects"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="live">Live demos first</option>
              <option value="az">Alphabetical A–Z</option>
              <option value="za">Alphabetical Z–A</option>
            </select>
          </div>
          {sortOption === 'live' && (
            <div className="mb-10">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Featured</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Live and polished builds you can click through.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredProjects.map((project, index) => (
                  <Suspense key={`featured-${index}`} fallback={<div>Loading...</div>}>
                    <ProjectCardLazy project={project} />
                  </Suspense>
                ))}
              </div>
            </div>
          )}
          {orderedProjects.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              No projects match that technology yet. Try a different filter.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {orderedProjects.map((project) => (
                <Suspense key={project.title} fallback={<div>Loading...</div>}>
                  <ProjectCardLazy project={project} />
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
