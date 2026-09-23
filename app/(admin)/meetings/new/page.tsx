import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Meeting',
};

export default function NewMeetingPage() {
  return (
    <section>
      <h1 className="font-serif text-2xl font-semibold text-foreground">
        Create Meeting — Coming in Week 04
      </h1>
    </section>
  );
}
