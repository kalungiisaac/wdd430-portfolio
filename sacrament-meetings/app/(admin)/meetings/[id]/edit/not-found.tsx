import Link from 'next/link';

export default function MeetingNotFound() {
  return (
    <section className="rounded-xl border border-border bg-card px-6 py-12 text-center shadow-sm sm:px-10">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent-foreground">
        404
      </p>
      <h1 className="mt-2 font-serif text-2xl font-semibold text-foreground">
        Meeting not found
      </h1>
      <p className="mt-3 text-sm text-foreground/70">
        We could not find a meeting with that id. It may have been deleted or the
        link may be incorrect.
      </p>
      <Link
        href="/meetings"
        className="mt-6 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/40"
      >
        Back to all meetings
      </Link>
    </section>
  );
}
