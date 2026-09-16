import Link from 'next/link';
import type { Speaker } from '@/lib/types';

export default function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <li>
      <Link
        href={`/speakers/${speaker.id}`}
        className="block rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
      >
        <h2 className="font-serif text-lg font-semibold text-foreground">
          {speaker.name}
        </h2>
        <p className="mt-1 text-sm text-foreground/70">{speaker.calling}</p>
        <p className="mt-2 line-clamp-2 text-sm text-foreground/80">
          {speaker.bio}
        </p>
      </Link>
    </li>
  );
}