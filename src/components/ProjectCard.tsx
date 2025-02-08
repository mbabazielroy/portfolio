import { Github, Link } from 'lucide-react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200">
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4 pt-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:scale-110 transition-transform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:scale-110 transition-transform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Link className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}