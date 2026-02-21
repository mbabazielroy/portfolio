interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="space-y-2 mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
        {title}
      </h2>
      {subtitle && (
        <p className="text-zinc-500 dark:text-zinc-400 text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
