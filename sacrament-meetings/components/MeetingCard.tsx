import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';
import { formatMeetingDate, meetingTypeLabel } from '@/lib/format';

export default function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
  return (
      
   <li>
      <Link
        href={`/meetings/${meeting.id}`}
        className="block rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-serif text-lg font-semibold text-foreground">
            {formatMeetingDate(meeting.date)}
          </h2>
          <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground">
            {meetingTypeLabel(meeting.meetingType)}
          </span>
        </div>
        <dl className="mt-3 grid gap-1 text-sm text-foreground/80 sm:grid-cols-2">
          <div className="flex gap-1.5">
            <dt className="font-medium text-foreground/60">Presiding:</dt>
            <dd>{meeting.presiding}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt className="font-medium text-foreground/60">Conducting:</dt>
            <dd>{meeting.conducting}</dd>
          </div>
        </dl>
        <p className="mt-3 text-sm text-foreground/70">
          {meeting.speakers.length} speaker{meeting.speakers.length === 1 ? '' : 's'}
          {' · '}
          Opening hymn #{meeting.openingHymn.number}
        </p>
      </Link>
  </li>
  );
}