import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-ink/15 bg-[#b9b99d] text-ink">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5" aria-label="Main navigation">
        <Link id="main-logo" href="/" className="font-display text-xl font-bold tracking-tight text-ink transition-colors duration-300 hover:text-moss">
          Kalungi Isaac<span className="text-ink">.</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-bold uppercase tracking-[0.14em] text-ink/80">
          <Link href="/" className="transition-colors duration-300 hover:text-moss">Home</Link>
          <Link href="/about" className="transition-colors duration-300 hover:text-moss">About</Link>
        </div>
      </nav>
    </header>
  );
}
