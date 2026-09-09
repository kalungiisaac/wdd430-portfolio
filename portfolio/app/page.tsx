import ProjectList from "@/components/ProjectList";

const projects = [
  {
    title: "Study Space",
    description: "A calm dashboard for turning scattered coursework into a clear weekly rhythm.",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Html", "CSS"],
    link: "https://github.com/",
  },
  {
    title: "Field Notes",
    description: "A lightweight journal experience for collecting ideas, observations, and small wins.",
    technologies: ["React", "CSS", "Accessibility"],
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-20 md:grid-cols-[1.2fr_0.8fr] md:items-end md:pt-32">
        <div>
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-moss">Web developer - Student</p>
          <h1 className="max-w-3xl font-display text-6xl font-bold leading-[0.95] tracking-tight text-ink sm:text-7xl md:text-8xl">
            Building <span className="text-moss">clean digital experiences</span> with purpose.
          </h1>
        </div>

        <div className="flex flex-col gap-6">
          <div className="border-l-2 border-lime pl-6 text-lg leading-8 text-ink/70">
            <img
              src="/images/profile.jpg"
              alt="Kalungi Isaac"
              className="mb-6 h-100 w-full object-cover object-center shadow-[8px_3px_0_#000]"
            />
            <p>I&apos;m Kalungi Isaac, a web developer and student focused on accessible design, strong front-end foundations, and practical digital products.</p>
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-moss">React • Next.js • TypeScript • UI Design</p>
          </div>
        </div>
      </section>

      <section className="bg-moss px-6 py-20 text-paper" aria-labelledby="work-heading">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-lime">Selected projects</p>
              <h2 id="work-heading" className="font-display text-4xl font-bold sm:text-5xl">A few things I&apos;ve made.</h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-paper/70">Small experiments, useful tools, and thoughtful details.</p>
          </div>
          <ProjectList projects={projects} />
        </div>
      </section>
    </main>
  );
}
