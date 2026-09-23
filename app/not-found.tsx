import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-md px-4 py-16 text-center">
      <h1 className="font-serif text-2xl font-semibold text-foreground">Meeting not found</h1>
      <p className="mt-2 text-sm text-foreground/70">
        The meeting you were looking for does not exist or the ID is invalid.
      </p>
      <Link
        href="/meetings"
        className="mt-6 inline-block rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
      >
        View all meetings
      </Link>
    </section>
  );
}