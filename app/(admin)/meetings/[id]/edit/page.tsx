import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import { updateMeeting } from '@/lib/actions';
import { formatMeetingDate } from '@/lib/format';
import { getMeetingById } from '@/lib/meetings-db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Edit Meeting',
};

export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idNum = Number(id);

  if (!Number.isInteger(idNum) || idNum <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(idNum);

  if (!meeting) {
    notFound();
  }

  return (
    <section>
      <h1 className="font-serif text-2xl font-semibold text-foreground">
        Edit Meeting
      </h1>
      <p className="mt-2 text-sm text-foreground/70">
        Update the program for {formatMeetingDate(meeting.date)}.
      </p>
      <div className="mt-8">
        <MeetingForm
          action={updateMeeting.bind(null, meeting.id)}
          meeting={meeting}
        />
      </div>
    </section>
  );
}
