interface SkillCardProps {
  name: string;
  icon: React.ReactNode;
}

export default function SkillCard({ name, icon }: SkillCardProps) {
  return (
    <div className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl group-hover:scale-110 transition-transform duration-200">
          {icon}
        </div>
        <span className="font-medium">{name}</span>
      </div>
    </div>
  );
}