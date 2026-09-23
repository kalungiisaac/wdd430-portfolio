'use client';

import { useEffect, useRef } from 'react';

export default function Footer() {
  const yearRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (yearRef.current) {
      yearRef.current.textContent = `© ${new Date().getFullYear()} Riverside Ward.`;
    }
  }, []);

  return (
    <footer className="print:hidden mt-12 border-t border-border bg-card">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-start justify-between gap-2 px-4 py-6 text-sm text-foreground/70 sm:flex-row sm:items-center">
        <p ref={yearRef} suppressHydrationWarning>© Riverside Ward.</p>
        <p>Sacrament Meeting Planner</p>
      </div>
    </footer>
  );
}