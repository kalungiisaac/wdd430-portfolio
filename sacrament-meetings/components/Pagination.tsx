'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  if (totalPages <= 1) return null;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-center gap-4 text-sm"
    >
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-lg border border-border bg-card px-4 py-2 font-medium text-foreground shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
        >
          Previous
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="cursor-not-allowed rounded-lg border border-border bg-card px-4 py-2 font-medium text-foreground/40"
        >
          Previous
        </span>
      )}
      <span aria-current="page" className="font-medium text-foreground">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-lg border border-border bg-card px-4 py-2 font-medium text-foreground shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
        >
          Next
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="cursor-not-allowed rounded-lg border border-border bg-card px-4 py-2 font-medium text-foreground/40"
        >
          Next
        </span>
      )}
    </nav>
  );
}
