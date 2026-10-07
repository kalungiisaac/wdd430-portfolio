import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-md px-4 py-16 text-center">
      <h1 className="font-serif text-2xl font-semibold text-foreground">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-foreground/70">
        The page you were looking for does not exist, or the address is
        incorrect.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/meetings"
          className="inline-block rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          View all meetings
        </Link>
        <Link
          href="/speakers"
          className="inline-block rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/5"
        >
          View all speakers
        </Link>
      </div>
    </section>
  );
}