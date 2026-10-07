'use client';

import MeetingsError from '@/components/MeetingsError';

export default function MeetingsErrorPage({
  error,
  retry,
  reset,
}: {
  error: Error & { digest?: string };
  retry?: () => void;
  reset?: () => void;
}) {
  return <MeetingsError error={error} retry={retry} reset={reset} />;
}
