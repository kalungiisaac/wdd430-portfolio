interface ProfileNoteProps {
  label: string;
}

export default function ProfileNote({ label }: ProfileNoteProps) {
  return (
    <aside className="border-l-4 border-lime bg-moss p-6 text-paper shadow-[6px_6px_0_#16231f]">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime">{label}</p>
      <p className="mt-4 font-display text-2xl leading-snug">
        I like building clear, useful interfaces that feel a little more human.
      </p>
    </aside>
  );
}
