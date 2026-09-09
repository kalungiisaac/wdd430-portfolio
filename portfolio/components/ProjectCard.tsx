interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  link,
}: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col justify-between border border-ink/15 bg-white p-6 shadow-[5px_5px_0_#d6ef8b] transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0_#7b8065]">
      <div>
        <div className="mb-8 flex items-start justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-moss">Project</span>
          <span className="text-2xl text-ink/30 transition-colors duration-300 group-hover:text-moss" aria-hidden="true">-&gt;</span>
        </div>
        <h2 className="font-display text-3xl font-bold leading-tight text-ink">{title}</h2>
        <p className="mt-4 leading-7 text-ink/70">{description}</p>
      </div>
      <div className="mt-8">
        <ul className="flex flex-wrap gap-2" aria-label={`${title} technologies`}>
          {technologies.map((technology) => (
            <li key={technology} className="bg-paper px-3 py-1 text-xs font-bold text-moss transition-colors duration-300 hover:bg-moss hover:text-paper">
              {technology}
            </li>
          ))}
        </ul>
        {link && (
          <a href={link} className="mt-6 inline-block border-b-2 border-moss pb-1 text-sm font-bold text-moss transition-colors duration-300 hover:border-ink hover:text-ink">
            Open project <span aria-hidden="true">-&gt;</span>
          </a>
        )}
      </div>
    </article>
  );
}
