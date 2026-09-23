'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); // always reset to page 1 on a new search
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <input
      type="search"
      placeholder="Search by speaker, leader, or meeting type..."
      defaultValue={searchParams.get('query')?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
      aria-label="Search meetings"
      className="mb-6 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground shadow-sm placeholder:text-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
    />
  );
}
