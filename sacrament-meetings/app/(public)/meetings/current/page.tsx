import Link from 'next/link';
import MeetingDetail from '@/components/MeetingDetail';
import { getMeetings } from '@/lib/meetings-db';
import { toIsoDate } from '@/lib/format';

export const dynamic = 'force-dynamic';

export default async function CurrentMeetingPage() {
  const today = new Date();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay());

  const iso = toIsoDate(sunday);
  const matches = await getMeetings('', 1, iso);

  if (matches.length === 0) {
    return (
      <section className="rounded-xl border border-border bg-card px-6 py-10 text-center shadow-sm sm:px-10">
        <h1 className="font-serif text-2xl font-semibold text-foreground">
          No current meeting found
        </h1>
        <p className="mt-3 text-sm text-foreground/70">
          There is no meeting program recorded for this Sunday yet.
        </p>
        <Link
          href="/meetings"
          className="mt-6 inline-block rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
        >
          View all meetings
        </Link>
      </section>
    );
  }

  return <MeetingDetail meeting={matches[0]} />;
}