import type { ReactNode } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  // Secure server-side check. proxy.ts's `authorized` callback is a path
  // deny-list, so a newly added (admin) route would otherwise render its full
  // HTML to anonymous visitors. Mutations are separately guarded by
  // requireOwnerSession(), but the page itself should never render.
  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <nav
        aria-label="Admin navigation"
        className="mb-8 flex flex-wrap items-center gap-2 border-b border-border pb-4 text-sm"
      >
        <h2 className="mr-2 font-serif text-lg font-semibold text-foreground">
          Admin
        </h2>
        <Link
          href="/meetings"
          className="rounded-full px-3 py-1 font-medium text-foreground/70 transition-colors hover:bg-foreground/5"
        >
          Back to meetings
        </Link>
        <Link
          href="/meetings/new"
          className="rounded-full px-3 py-1 font-medium text-foreground/70 transition-colors hover:bg-foreground/5"
        >
          New meeting
        </Link>
        {session?.user ? (
          <span className="ml-auto">
            <span className="text-xs text-foreground/60">
              Signed in as {session.user.name ?? session.user.email}
            </span>
          </span>
        ) : (
          <Link
            href="/login"
            className="ml-auto rounded-full bg-primary px-3 py-1 font-medium text-white transition-colors hover:bg-primary-dark"
          >
            Sign In
          </Link>
        )}
      </nav>
      {children}
    </div>
  );
}
