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
import ExperienceCard from './components/ExperienceCard';
import Navbar from './components/Navbar';
import SectionHeading from './components/SectionHeading';
import SkillCard from './components/SkillCard';
import { experience, projects } from './data';
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

const CURATED_PROJECT_TITLES = [
  'Sendly',
  'Bgcdllc - General Contractor',
  'Shine&Demure - cleaning products and services',
  'AI Travel Planner',
  'Portfolio Site',
];

function MainContent() {
  const [activeExperienceTag, setActiveExperienceTag] = useState<string>('All');

  const experienceTags = useMemo(() => {
    const tagSet = new Set<string>();
    experience.forEach((exp) => {
      exp.tags?.forEach((t) => tagSet.add(t));
    });
    return ['All', ...Array.from(tagSet).sort()];
  }, []);

  const filteredExperience = useMemo(() => {
    if (activeExperienceTag === 'All') return experience;
    return experience.filter((exp) => exp.tags?.includes(activeExperienceTag));
  }, [activeExperienceTag]);

  const curatedProjects = useMemo(
    () => CURATED_PROJECT_TITLES.map((t) => projects.find((p) => p.title === t)).filter(Boolean),
    []
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <HeroLazy />
      </Suspense>

      {/* About Section — merged with education summary + how I work */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="About Me"
            subtitle="Building software that earns trust"
          />
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: bio + education summary + socials */}
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
                startup incubators and validation programs.
              </p>
              {/* Education — compact */}
              <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Education</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">BS Computer Science & Systems</span> — University of Washington Tacoma (2022–Present)
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">AS Computer Engineering</span> — Tacoma Community College (2019–2022)
                </p>
              </div>
              <div className="flex gap-4">
                <a href="https://github.com/mbabazielroy" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:scale-110 transition-transform">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/elroy-mbabazi/" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:scale-110 transition-transform">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:mbabazielroy@yahoo.com" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </a>
                <a href="tel:+14372210664" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Right: skills + process + testimonials */}
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <SkillCard key={skill.name} {...skill} />
                ))}
              </div>
              <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">How I Work</p>
                <ol className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-semibold">1. Discovery</span> — define scope, goals, and success criteria.</li>
                  <li><span className="font-semibold">2. Plan</span> — architecture, milestones, and risk log.</li>
                  <li><span className="font-semibold">3. Build</span> — iterative delivery with demos and async updates.</li>
                  <li><span className="font-semibold">4. Launch</span> — handoff, docs, and light training if needed.</li>
                </ol>
              </div>
              <div className="space-y-3">
                <p className="text-sm italic text-gray-600 dark:text-gray-400 border-l-4 border-blue-500 pl-3">
                  "Clear communication, fast iterations, and reliable delivery on our web app." — Small business client
                </p>
                <p className="text-sm italic text-gray-600 dark:text-gray-400 border-l-4 border-blue-500 pl-3">
                  "Collaborative and thoughtful, especially around stakeholder needs and reporting." — Campus leadership
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I'm Building — immediately after About */}
      <section id="building" className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What I'm Building"
            subtitle="Current focus — Sendly"
          />
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Mobile money in East Africa is widely used but prone to a specific, costly error:
                funds sent to a wrong number complete instantly with no built-in way to reverse them.
                A single mistyped digit is enough.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                <strong className="text-gray-800 dark:text-gray-200">Sendly</strong> replaces phone
                numbers with usernames and adds a recipient confirmation step before any funds move.
                The goal is to make every transaction feel deliberate — and to build the kind of trust
                that keeps people coming back to a platform.
              </p>
              <a
                href="mailto:mbabazielroy@yahoo.com?subject=Sendly%20Inquiry"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Contact me about Sendly
              </a>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm space-y-5">
              <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                Progress & Signals
              </h4>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Mbabazi Technologies Inc. incorporated</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Ontario, Canada — active corporation</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Sendly MVP built end-to-end</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">User testing in progress</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Incubator applications in progress</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      LevelUP Validate · DMZ Pre-Incubator · Techstars Founder Catalyst
                    </p>
                  </div>
                </li>
              </ul>
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

      {/* Projects Section — curated top 5 */}
      <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Projects"
            subtitle="Client builds, active products, and selected work"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {curatedProjects.map((project) => (
              <Suspense key={project!.title} fallback={<div>Loading...</div>}>
                <ProjectCardLazy project={project!} />
              </Suspense>
            ))}
          </div>
          <div className="text-center">
            <a
              href="https://github.com/mbabazielroy"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Github className="w-4 h-4" />
              View all projects on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Contact Me"
            subtitle="Let's work together"
          />
          <div className="grid lg:grid-cols-2 gap-12">
            <Suspense fallback={<div>Loading...</div>}>
              <ContactFormLazy />
            </Suspense>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <a href="mailto:mbabazielroy@yahoo.com" className="hover:text-blue-600">
                    mbabazielroy@yahoo.com
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <a href="tel:+14372210664" className="hover:text-blue-600">
                    +1 (437) 221-0664
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
                    <Github className="w-5 h-5 text-blue-600" />
                  </div>
                  <a href="https://github.com/mbabazielroy" className="hover:text-blue-600">
                    github.com/mbabazielroy
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
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
