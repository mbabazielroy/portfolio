import { Github, Link } from 'lucide-react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Get the appropriate properties based on which format is used
  const technologies = project.technologies || project.tags || [];
  const githubUrl = project.githubUrl || project.github || '';
  const liveUrl = project.liveUrl || project.demo || '';
  const fallbackImage = 'https://images.unsplash.com/photo-1504272017915-28c4bc1d4f59?auto=format&fit=crop&q=80&w=1600';
  const isLive = !!liveUrl;

  return (
    <div className="group bg-white/90 dark:bg-gray-900/70 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 backdrop-blur">
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            if (e.currentTarget.src !== fallbackImage) {
              e.currentTarget.src = fallbackImage;
            }
          }}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
          {isLive && (
            <span className="flex items-center gap-1 px-2 py-1 text-[11px] rounded-full bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-200 border border-green-200/60 dark:border-green-800/60">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live
            </span>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-semibold bg-gradient-to-r from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4 pt-2">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View code for ${project.title}`}
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Github className="mr-1" size={16} />
              <span>Code</span>
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo of ${project.title}`}
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Link className="mr-1" size={16} />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
