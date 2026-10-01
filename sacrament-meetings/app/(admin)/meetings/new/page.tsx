import type { Metadata } from 'next';
import MeetingForm from '@/components/MeetingForm';
import { createMeeting } from '@/lib/actions';

export const metadata: Metadata = {
  title: 'Create Meeting',
};

export default function NewMeetingPage() {
  return (
    <section>
      <h1 className="font-serif text-2xl font-semibold text-foreground">
        Create Meeting
      </h1>
      <p className="mt-2 text-sm text-foreground/70">
        Enter the program details for a new sacrament meeting. Required fields are
        marked and validated on the server.
      </p>
      <div className="mt-8">
        <MeetingForm action={createMeeting} />
      </div>
    </section>
  );
}
