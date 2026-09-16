import type { Metadata } from 'next';
import MeetingCard from '@/components/MeetingCard';
import { getMeetings } from '@/lib/meetings-db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'All Meetings',
};

export default async function MeetingsPage() {
  const meetings = await getMeetings();

  if (meetings.length === 0) {
    return <p className="text-foreground/70">No meetings available.</p>;
  }

  return (
    <section>
      <h1 className="sr-only">All Sacrament Meetings</h1>
      <ul className="grid gap-5 sm:grid-cols-2">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </ul>
    </section>
  );
}