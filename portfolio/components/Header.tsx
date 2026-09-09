import Link from "next/link";

export default function Header() {
  return (
    
    <header className="border-b border-ink/15 bg-paper">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5" aria-label="Main navigation">
        <Link id="main-logo" href="/" className="font-display text-xl font-bold tracking-tight text-ink">
          Kalungi Isaac<span className="text-moss">.</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-bold text-ink/70">
          <Link href="/" className="transition-colors hover:text-moss">Home</Link>
          <Link href="/about" className="transition-colors hover:text-moss">About</Link>

        </div>
      </nav>
    </header>
    
    
  );
}
