export default function Footer() {
  return (
    <footer className="border-t border-ink/15 bg-ink px-6 py-10 text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-block h-2 w-2 rounded-full bg-lime" aria-hidden="true" />
          <p className="font-display text-lg font-bold tracking-wide">Kalungi Isaac Portfolio</p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-paper/70 sm:items-end">
          <p className="uppercase tracking-[0.2em]">Learning through digital craft</p>
          <p>&copy; {new Date().getFullYear()} Kalungi Isaac | All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
