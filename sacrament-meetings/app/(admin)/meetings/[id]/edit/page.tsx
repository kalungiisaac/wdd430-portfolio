import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Meeting',
};

export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <section>
      <h1 className="font-serif text-2xl font-semibold text-foreground">
        Edit Meeting (id {id}) — Coming in Week 04
      </h1>
    </section>
  );
}
