'use client';

import { useFormStatus } from 'react-dom';
import { deleteMeeting } from '@/lib/actions';

function DeleteSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      onClick={(event) => {
        if (!window.confirm('Delete this meeting? This cannot be undone.')) {
          event.preventDefault();
        }
      }}
      className="rounded-full px-3 py-1 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? 'Deleting…' : 'Delete'}
    </button>
  );
}

export default function DeleteMeetingButton({ meetingId }: { meetingId: number }) {
  return (
    <form action={deleteMeeting}>
      <input type="hidden" name="id" value={meetingId} />
      <DeleteSubmitButton />
    </form>
  );
}
