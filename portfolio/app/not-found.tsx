import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-32">
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-moss">404</p>
      <h1 className="mt-4 font-display text-6xl font-bold text-ink">Page not found.</h1>
      <Link href="/" className="mt-8 inline-block border-b-2 border-moss pb-1 font-bold text-moss">Return home -&gt;</Link>
    </main>
  );
}
