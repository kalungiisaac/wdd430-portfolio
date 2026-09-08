import ProfileNote from "../../components/ProfileNote";

export default function AboutPage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-14 px-6 py-20 md:grid-cols-[1fr_0.8fr] md:py-32">
      <section aria-labelledby="about-heading">
        <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-moss">A little context</p>
        <h1 id="about-heading" className="font-display text-6xl font-bold leading-none tracking-tight text-ink sm:text-7xl">About me</h1>
        <div className="mt-10 max-w-xl space-y-6 text-lg leading-8 text-ink/70">
          <p>I&apos;m a student developer who enjoys the space where design, writing, and technology meet. My best work usually starts with a question and ends with a simpler experience.</p>
          <p>Right now, I&apos;m strengthening my React and Next.js skills while practicing the habits that make products accessible, maintainable, and pleasant to use.</p>
        </div>
      </section>
      <div className="self-start md:pt-20">
        <ProfileNote label="A note from the developer" />
      </div>
    </main>
  );
}
