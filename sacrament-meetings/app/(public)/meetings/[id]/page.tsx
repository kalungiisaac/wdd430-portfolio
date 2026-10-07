import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';
import { formatMeetingDate, meetingTypeLabel } from '@/lib/format';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const idNum = Number(id);

  if (!Number.isInteger(idNum)) {
    return {
      title: 'Meeting Not Found',
      description: 'The requested sacrament meeting program could not be found.',
    };
  }

  const meeting = await getMeetingById(idNum);

  if (!meeting) {
    return {
      title: 'Meeting Not Found',
      description: 'The requested sacrament meeting program could not be found.',
    };
  }

  const dateLabel = formatMeetingDate(meeting.date);
  const typeLabel = meetingTypeLabel(meeting.meetingType);
  const description = `${typeLabel} held ${dateLabel}. Presiding: ${meeting.presiding}. Conducting: ${meeting.conducting}.`;

  return {
    title: dateLabel,
    description,
    // Deliberately no `openGraph` key: redeclaring it in a child segment would
    // replace the root layout's `openGraph` and drop the inherited og:image
    // from app/opengraph-image.tsx. `title`/`description` feed og:title and
    // og:description automatically.
  };
}

export default async function MeetingDetailPage({ params }: Props) {
  const { id } = await params;
  const idNum = Number(id);

  if (!Number.isInteger(idNum)) {
    notFound();
  }

  const meeting = await getMeetingById(idNum);

  if (!meeting) {
    notFound();
  }

  return (
    <div className="px-4 py-8 sm:px-0">
      <MeetingDetail meeting={meeting} />
    </div>
  );
}
