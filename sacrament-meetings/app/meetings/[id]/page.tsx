import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Meeting',
};

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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