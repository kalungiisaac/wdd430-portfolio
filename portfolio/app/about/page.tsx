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
              <li>Basic Chinese</li>
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

        <section className="mt-14 rounded-none border border-moss/30 bg-paper p-8">
          <h2 className="font-display text-3xl font-bold text-ink">Reflection Questions</h2>

          <div className="mt-7 space-y-8">
            <article>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-moss">Question 1</p>
              <p className="mt-2 text-lg font-semibold leading-8 text-ink">
                What is the purpose of the <span className="font-display">layout.tsx</span> file?
              </p>
              <p className="mt-3 leading-7 text-ink/70">
                The layout file sets up the global HTML structure for the portfolio and wraps every page with shared elements like the header, page contents, and footer. It also loads the global styles and metadata so the whole site stays consistent.
              </p>
            </article>

            <article>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-moss">Question 2</p>
              <p className="mt-2 text-lg font-semibold leading-8 text-ink">
                Why are Server Components used by default in the App Router?
              </p>
              <p className="mt-3 leading-7 text-ink/70">
                Server Components are the default in the App Router because they render on the server and keep the client bundle smaller. They also help with data fetching, security, and better performance for portfolio pages.
              </p>
            </article>
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
