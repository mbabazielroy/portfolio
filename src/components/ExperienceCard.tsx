import type { Experience } from '../types';

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 border border-gray-100 dark:border-gray-700">
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{experience.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {experience.company} · {experience.location}
            </p>
          </div>
          <span className="flex-shrink-0 text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-100 border border-blue-200/70 dark:border-blue-800/60 shadow-sm leading-tight">
            {experience.period}
          </span>
        </div>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5">
          {experience.bullets.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        {experience.tags && experience.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {experience.tags.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-[11px] font-medium bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {experience.technologies && experience.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {experience.technologies.slice(0, 8).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
