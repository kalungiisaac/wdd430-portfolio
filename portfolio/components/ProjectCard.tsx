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
    <article className="group flex h-full flex-col justify-between border border-ink/15 bg-white p-6 shadow-[5px_5px_0_#d6ef8b] transition-transform hover:-translate-y-1">
      <div>
        <div className="mb-8 flex items-start justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-moss">Featured work</span>
          <span className="text-2xl text-ink/30 transition-colors group-hover:text-moss" aria-hidden="true">-&gt;</span>
        </div>
        <h2 className="font-display text-3xl font-bold leading-tight text-ink">{title}</h2>
        <p className="mt-4 leading-7 text-ink/70">{description}</p>
      </div>
      <div className="mt-8">
        <ul className="flex flex-wrap gap-2" aria-label={`${title} technologies`}>
          {technologies.map((technology) => (
            <li key={technology} className="bg-paper px-3 py-1 text-xs font-bold text-moss">
              {technology}
            </li>
          ))}
        </ul>
        {link && (
          <a href={link} className="mt-6 inline-block border-b-2 border-moss pb-1 text-sm font-bold text-moss hover:border-ink hover:text-ink">
            View project <span aria-hidden="true">-&gt;</span>
          </a>
        )}
      </div>
    </article>
  );
}
