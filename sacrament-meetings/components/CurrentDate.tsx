'use client';

import { useEffect, useRef } from 'react';

export default function CurrentDate() {
  const dateRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (dateRef.current) {
      dateRef.current.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  }, []);

  return (
    <p
      ref={dateRef}
      className="text-sm text-white/80"
      suppressHydrationWarning
    />
  );
}
