import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:py-20">
        <div className="relative mx-auto mb-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-border shadow-sm">
          <Image
            src="/hero.svg"
            alt="Stylized illustration of a chapel with a tall steeple resting on green hills under a soft sky"
            width={800}
            height={400}
            priority
            className="h-auto w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white drop-shadow">
            <h1 className="font-serif text-2xl font-semibold sm:text-3xl">
              Sacrament Meeting Planner
            </h1>
            <p className="mt-2 max-w-xl text-sm text-white/90">
              Riverside Ward · The Church of Jesus Christ of Latter-day Saints
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          <Link
            href="/meetings"
            className="rounded-xl border border-border bg-card px-6 py-5 shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <h2 className="font-serif text-lg font-semibold text-foreground">
              All Meetings
            </h2>
            <p className="mt-2 text-sm text-foreground/75">
              Browse sacrament meeting agendas, speakers, hymns, and ward business.
            </p>
          </Link>
          <Link
            href="/meetings/current"
            className="rounded-xl border border-border bg-card px-6 py-5 shadow-sm transition-colors hover:border-accent/50 hover:bg-accent/5"
          >
            <h2 className="font-serif text-lg font-semibold text-foreground">
              Current Meeting
            </h2>
            <p className="mt-2 text-sm text-foreground/75">
              Jump straight to this Sunday&apos;s sacrament meeting program.
            </p>
          </Link>
        </div>

        <div className="mx-auto mt-10 max-w-3xl text-sm leading-relaxed text-foreground/70">
          <p>
            This planner provides an easy way for members to view upcoming sacrament meeting
            information and print a simplified program for those who prefer a physical copy.
          </p>
        </div>
      </div>
    </section>
  );
}