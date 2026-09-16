import type { ReactNode } from 'react';
import Link from 'next/link';

export default function MeetingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <nav
        aria-label="Meeting section navigation"
        className="mb-8 flex flex-wrap items-center gap-2 border-b border-border pb-4 text-sm"
      >
        <h2 className="mr-2 font-serif text-lg font-semibold text-foreground">
          Sacrament Meetings
        </h2>
        <Link
          href="/meetings"
          className="rounded-full px-3 py-1 font-medium text-foreground/70 transition-colors hover:bg-foreground/5"
        >
          All meetings
        </Link>
        <Link
          href="/meetings/current"
          className="rounded-full px-3 py-1 font-medium text-foreground/70 transition-colors hover:bg-foreground/5"
        >
          Current meeting
        </Link>
      </nav>
      {children}
    </div>
  );
}