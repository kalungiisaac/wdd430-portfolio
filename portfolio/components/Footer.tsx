export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-ink/15 px-6 py-8 text-sm text-ink/60 sm:flex-row sm:items-center sm:justify-between">
      <p>Built with curiosity and Next.js.</p>
      <p>&copy; {new Date().getFullYear()} Kalungi Isaac | All rights reserved</p>
    </footer>
  );
}
