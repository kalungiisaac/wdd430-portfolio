import Link from 'next/link';
import type { Metadata } from 'next';
import MeetingDetail from '@/components/MeetingDetail';
import { getCurrentMeeting } from '@/lib/meetings-db';
import { formatMeetingDate, toIsoDate } from '@/lib/format';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Current Meeting',
};

function thisSunday(from: Date = new Date()): Date {
  const sunday = new Date(from);
  sunday.setDate(from.getDate() - from.getDay());
  return sunday;
}

export default async function CurrentMeetingPage() {
  const sunday = thisSunday();
  const iso = toIsoDate(sunday);

  const meeting = await getCurrentMeeting(iso);

  if (!meeting) {
    return (
      <section className="rounded-xl border border-border bg-card px-6 py-10 text-center shadow-sm sm:px-10">
        <h1 className="font-serif text-2xl font-semibold text-foreground">
          No meetings scheduled
        </h1>
        <p className="mt-3 text-sm text-foreground/70">
          There are no sacrament meeting programs on record yet.
        </p>
        <Link
          href="/meetings/new"
          className="mt-6 inline-block rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
        >
          Create the first meeting
        </Link>
      </section>
    );
  }

  const isThisSunday = meeting.date === iso;

  return (
    <div>
      {!isThisSunday && (
        <p className="mb-4 rounded-xl border border-border bg-foreground/5 px-4 py-3 text-sm text-foreground/70">
          No meeting is recorded for this Sunday (
          {formatMeetingDate(iso)}). Showing the closest meeting on{' '}
          {formatMeetingDate(meeting.date)} instead.
        </p>
      )}
      <MeetingDetail meeting={meeting} />
    </div>
  );
}
