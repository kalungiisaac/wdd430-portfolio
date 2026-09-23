import type { Speaker } from '@/lib/types';
import Link from 'next/link';

export default function SpeakerDetail({ speaker }: { speaker: Speaker }) {
  return (
    <article className="rounded-xl border border-border bg-card px-6 py-8 shadow-sm sm:px-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            {speaker.name}
          </h1>
          <p className="mt-2 text-sm font-medium uppercase tracking-wide text-accent-foreground">
            {speaker.title}
          </p>
        </div>
      </div>

      <dl className="mt-6 grid gap-2 text-sm">
        <div className="flex gap-2">
          <dt className="font-medium text-foreground/60">Calling:</dt>
          <dd>{speaker.calling}</dd>
        </div>
      </dl>

      <div className="mt-8">
        <h2 className="font-serif text-xl font-semibold text-foreground">Biography</h2>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-foreground/85">
          {speaker.bio}
        </p>
      </div>

      <p className="mt-10 text-center text-xs text-foreground/50">
        <Link href="/speakers" className="underline underline-offset-2">
          Back to all speakers
        </Link>
      </p>
    </article>
  );
}