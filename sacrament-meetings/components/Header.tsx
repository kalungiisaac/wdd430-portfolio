import { auth } from '@/auth';
import SignOutButton from './SignOutButton';
import CurrentDate from './CurrentDate';
import NavLinks from './NavLinks';

export default async function Header() {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <header className="print:hidden bg-primary text-white shadow-sm">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-lg font-semibold leading-tight sm:text-xl">
            Riverside Ward
          </p>
          <CurrentDate />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <NavLinks isAuthenticated={isAuthenticated} />
          {isAuthenticated && <SignOutButton variant="header" />}
        </div>
      </div>
    </header>
  );
}