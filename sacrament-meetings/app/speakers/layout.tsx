import type { ReactNode } from 'react';
import Link from 'next/link';

export default function SpeakersLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <nav
        aria-label="Speaker section navigation"
        className="mb-8 flex flex-wrap items-center gap-2 border-b border-border pb-4 text-sm"
      >
        <h2 className="mr-2 font-serif text-lg font-semibold text-foreground">
          Speakers
        </h2>
        <Link
          href="/speakers"
          className="rounded-full px-3 py-1 font-medium text-foreground/70 transition-colors hover:bg-foreground/5"
        >
          All speakers
        </Link>
      </nav>
      {children}
    </div>
  );
}