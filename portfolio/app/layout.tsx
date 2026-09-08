import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kalungi Isaac | Portfolio",
  description: "A small collection of thoughtful web projects.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-ink/15 bg-paper">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5" aria-label="Main navigation">
            <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink">
              KI<span className="text-moss">.</span>
            </Link>
            <div className="flex items-center gap-6 text-sm font-bold text-ink/70">
              <Link href="/" className="transition-colors hover:text-moss">Home</Link>
              <Link href="/about" className="transition-colors hover:text-moss">About</Link>
            </div>
          </nav>
        </header>
        {children}
        <footer className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-ink/15 px-6 py-8 text-sm text-ink/60 sm:flex-row sm:items-center sm:justify-between">
          <p>Built with curiosity and Next.js.</p>
          <p>(c) {new Date().getFullYear()} Kalungi Isaac</p>
        </footer>
      </body>
    </html>
  );
}
