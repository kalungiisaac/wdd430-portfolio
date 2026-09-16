import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SpeakerDetail from '@/components/SpeakerDetail';
import { getSpeakerById } from '@/lib/speakers-db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Speaker',
};

export default async function SpeakerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idNum = Number(id);

  if (!Number.isInteger(idNum)) {
    notFound();
  }

  const speaker = await getSpeakerById(idNum);

  if (!speaker) {
    notFound();
  }

  return (
    <div className="px-4 py-8 sm:px-0">
      <SpeakerDetail speaker={speaker} />
    </div>
  );
}