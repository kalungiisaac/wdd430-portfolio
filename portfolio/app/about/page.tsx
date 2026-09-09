import ProfileNote from "../../components/ProfileNote";

export default function AboutPage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-14 px-6 py-20 md:grid-cols-[1fr_0.8fr] md:py-32">
      <section aria-labelledby="about-heading">
        <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-moss">A little context</p>
        <h1 id="about-heading" className="font-display text-6xl font-bold leading-none tracking-tight text-ink sm:text-7xl">About me</h1>

        <div className="mt-10 max-w-3xl space-y-6 text-lg leading-8 text-ink/70">
          <p>
            I&apos;m Kalungi Isaac, a web developer and student who enjoys turning ideas into useful,
            friendly digital experiences. I care about good structure, thoughtful design, and products
            that make everyday work easier.
          </p>
          <p>
            My learning path is built around the relationship between design and code. I like creating
            clean layouts, writing readable front-end solutions, and improving how information feels to
            people using a website.
          </p>
          <p>
            I&apos;m especially interested in Next.js, React, TypeScript, user experience, accessibility,
            and the process of turning creative goals into practical features.
          </p>
        </div>

        <section className="mt-12 grid gap-8 sm:grid-cols-2">
          <div className="rounded-none border border-moss/20 bg-paper p-6 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-ink">Languages</h2>
            <ul className="mt-4 space-y-2 text-ink/70">
              <li>English</li>
              <li>Luganda</li>
              <li>Swahili</li>
              <li>Chinese</li>
            </ul>
          </div>

          <div className="rounded-none border border-moss/20 bg-paper p-6 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-ink">Skills</h2>
            <ul className="mt-4 space-y-2 text-ink/70">
              <li>HTML, CSS, JavaScript</li>
              <li>TypeScript, React, Next.js</li>
              <li>Tailwind CSS, UI design</li>
              <li>Git, GitHub, project planning</li>
              <li>Accessibility and user-centered design</li>
            </ul>
          </div>
        </section>
      </section>

      <div className="self-start md:pt-20">
        <ProfileNote
          label="A note from the developer"
          body="I enjoy building digital spaces that are simple, useful, and kind to the people who use them."
        />
      </div>
    </main>
  );
}
