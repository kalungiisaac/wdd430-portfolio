import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';
import { formatMeetingDate, meetingTypeLabel } from '@/lib/format';
import PrintButton from './PrintButton';

function HymnRow({ label, hymn }: { label: string; hymn: { number: number; title: string } }) {
  return (
    <li className="flex items-baseline justify-between gap-4 border-b border-border py-3">
      <span className="font-medium">{label}</span>
      <span className="text-right text-foreground/80">
        #{hymn.number} &mdash; {hymn.title}
      </span>
    </li>
  );
}

export default function MeetingDetail({ meeting }: { meeting: SacramentMeeting }) {
  return (
    <article className="rounded-xl border border-border bg-card px-6 py-8 shadow-sm sm:px-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            {formatMeetingDate(meeting.date)}
          </h1>
          <p className="mt-2 text-sm font-medium uppercase tracking-wide text-accent-foreground">
            {meetingTypeLabel(meeting.meetingType)}
          </p>
        </div>
        <PrintButton />
      </div>

      <dl className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
        <div className="flex gap-2">
          <dt className="font-medium text-foreground/60">Presiding:</dt>
          <dd>{meeting.presiding}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-medium text-foreground/60">Conducting:</dt>
          <dd>{meeting.conducting}</dd>
        </div>
      </dl>

      <div className="mt-8">
        <h2 className="font-serif text-xl font-semibold text-foreground">Program</h2>
        <ol className="mt-2">
          <HymnRow label="Opening Hymn" hymn={meeting.openingHymn} />
          <li className="flex items-baseline justify-between gap-4 border-b border-border py-3">
            <span className="font-medium">Invocation</span>
            <span className="text-right text-foreground/80">{meeting.openingPrayer}</span>
          </li>
        </ol>
      </div>

      {meeting.wardBusiness.length > 0 && (
        <section className="mt-8" aria-label="Ward business">
          <h2 className="font-serif text-xl font-semibold text-foreground">Ward Business</h2>
          <ul className="mt-2 space-y-2 text-sm text-foreground/85">
            {meeting.wardBusiness.map((item, index) => (
              <li key={item.description} className="flex gap-3">
                <span className="font-medium text-foreground/60">{index + 1}.</span>
                <span>{item.description}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {meeting.stakeBusiness && (
        <section className="mt-8" aria-label="Stake business">
          <h2 className="font-serif text-xl font-semibold text-foreground">Stake Business</h2>
          <p className="mt-2 text-sm text-foreground/85">
            Conducted by the stake presidency as appropriate.
          </p>
        </section>
      )}

      <div className="mt-8">
        <h2 className="font-serif text-xl font-semibold text-foreground">Sacrament</h2>
        <ol className="mt-2">
          <HymnRow label="Sacrament Hymn" hymn={meeting.sacramentHymn} />
        </ol>
      </div>

      <section className="mt-8" aria-label="Speakers and musical numbers">
        <h2 className="font-serif text-xl font-semibold text-foreground">Speakers</h2>
        <ol className="mt-2">
          {meeting.speakers.map((speaker, index) =>
            speaker.type === 'musical-number' ? (
              <li
                key={`${speaker.name}-${index}`}
                className="flex items-baseline justify-between gap-4 border-b border-border py-3"
              >
                <span className="font-medium">Musical Number</span>
                <span className="text-right text-foreground/80">{speaker.name}</span>
              </li>
            ) : (
              <li
                key={`${speaker.name}-${index}`}
                className="flex items-baseline justify-between gap-4 border-b border-border py-3"
              >
                <span className="font-medium">{speaker.name}</span>
                <span className="text-right text-foreground/80">{speaker.topic}</span>
              </li>
            ),
          )}
        </ol>
      </section>

      <div className="mt-8">
        <h2 className="font-serif text-xl font-semibold text-foreground">Conclusion</h2>
        <ol className="mt-2">
          <HymnRow label="Closing Hymn" hymn={meeting.closingHymn} />
          <li className="flex items-baseline justify-between gap-4 border-b border-border py-3">
            <span className="font-medium">Benediction</span>
            <span className="text-right text-foreground/80">{meeting.closingPrayer}</span>
          </li>
        </ol>
      </div>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <section className="mt-8" aria-label="Announcements">
          <h2 className="font-serif text-xl font-semibold text-foreground">Announcements</h2>
          <ul className="mt-2 space-y-2 text-sm text-foreground/85">
            {meeting.announcements.map((announcement) => (
              <li key={announcement} className="flex gap-3">
                <span aria-hidden="true">&bull;</span>
                <span>{announcement}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-10 text-center text-xs text-foreground/50 print:mt-6">
        <Link href="/meetings" className="print:hidden underline underline-offset-2">
          Back to all meetings
        </Link>
        <span className="print:inline hidden">Riverside Ward &bull; Sacrament Meeting Program</span>
      </p>
    </article>
  );
}