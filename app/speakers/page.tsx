import type { Metadata } from 'next';
import SpeakerCard from '@/components/SpeakerCard';
import { getSpeakers } from '@/lib/speakers-db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'All Speakers',
};

export default async function SpeakersPage() {
  const speakers = await getSpeakers();

  if (speakers.length === 0) {
    return <p className="text-foreground/70">No speakers available.</p>;
  }

  return (
    <section>
      <h1 className="sr-only">All Speakers</h1>
      <ul className="grid gap-5 sm:grid-cols-2">
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.id} speaker={speaker} />
        ))}
      </ul>
    </section>
  );
}