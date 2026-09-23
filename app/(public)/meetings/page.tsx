import type { Metadata } from 'next';
import { Suspense } from 'react';
import MeetingCard from '@/components/MeetingCard';
import { MeetingSearch } from '@/components/MeetingSearch';
import { Pagination } from '@/components/Pagination';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'All Meetings',
};

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const currentPage = Math.max(1, Number(searchParams?.page) || 1);

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <section>
      <h1 className="sr-only">All Sacrament Meetings</h1>
      <Suspense fallback={<div className="mb-6 h-10 w-full rounded-xl bg-foreground/5" />}>
        <MeetingSearch />
      </Suspense>
      {meetings.length === 0 ? (
        <p className="text-foreground/70">No meetings match your search.</p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </ul>
      )}
      <Suspense fallback={null}>
        <Pagination totalPages={totalPages} />
      </Suspense>
    </section>
  );
}
