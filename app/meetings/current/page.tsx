import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';
import { toIsoDate } from '@/lib/format';

export const dynamic = 'force-dynamic';

export default async function CurrentMeetingPage() {
  const today = new Date();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay());

  const iso = toIsoDate(sunday);
  const matches = await getMeetings(iso);

  if (matches.length > 0) {
    redirect(`/meetings/${matches[0].id}`);
  }

  redirect('/meetings');
}