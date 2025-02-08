import type { Education } from '../types';

interface EducationCardProps {
  education: Education;
}

export default function EducationCard({ education }: EducationCardProps) {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200">
      <div className="relative h-48 overflow-hidden">
        <img
          src={education.image}
          alt={education.school}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-xl font-bold mb-1">{education.school}</h3>
          <p className="text-sm text-gray-200">{education.location}</p>
        </div>
      </div>
      <div className="p-6 space-y-2">
        <p className="font-medium text-gray-900 dark:text-white">{education.degree}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{education.period}</p>
      </div>
    </div>
  );
}