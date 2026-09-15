import NavLinks from './NavLinks';

export default function Header() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="print:hidden bg-primary text-white shadow-sm">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-lg font-semibold leading-tight sm:text-xl">
            Riverside Ward
          </p>
          <p className="text-sm text-white/80">{formattedDate}</p>
        </div>
        <NavLinks />
      </div>
    </header>
  );
}