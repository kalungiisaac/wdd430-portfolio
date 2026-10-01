'use client';

import Link from 'next/link';
import { useEffect } from 'react';

type MeetingsErrorProps = {
  error: Error & { digest?: string };
  retry?: () => void;
  reset?: () => void;
};

export default function MeetingsError({ error, retry, reset }: MeetingsErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const recover = retry ?? reset;

  return (
    <section className="rounded-xl border border-border bg-card px-6 py-12 text-center shadow-sm sm:px-10">
      <h1 className="font-serif text-2xl font-semibold text-foreground">
        Something went wrong
      </h1>
      <p className="mt-3 text-sm text-foreground/70">
        We ran into an unexpected problem while loading the meetings. Please try
        again, or return to the meetings list.
      </p>
      {error.digest && (
        <p className="mt-2 text-xs text-foreground/50">
          Reference: {error.digest}
        </p>
      )}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {recover && (
          <button
            type="button"
            onClick={() => recover()}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            Try again
          </button>
        )}
        <Link
          href="/meetings"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5 focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          Back to all meetings
        </Link>
      </div>
    </section>
  );
}
