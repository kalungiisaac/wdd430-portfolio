import type { Metadata } from 'next';
import LoginForm from '@/components/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In',
  description:
    'Sign in to create, edit, or delete sacrament meeting programs for the Riverside Ward.',
  robots: { index: false, follow: false },
};

/**
 * Only accept same-origin relative paths as post-login destinations.
 * Anything else (absolute URLs, protocol-relative `//host`, backslash tricks)
 * falls back to /meetings so this can't be used as an open redirect.
 */
function safeCallbackUrl(raw: string | undefined): string {
  if (!raw) return '/meetings';
  const value = raw.trim();
  if (!value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) {
    return '/meetings';
  }
  return value;
}

export default async function LoginPage(props: {
  searchParams?: Promise<{ callbackUrl?: string }>;
}) {
  const searchParams = await props.searchParams;
  const redirectTo = safeCallbackUrl(searchParams?.callbackUrl);

  return (
    <section className="mx-auto w-full max-w-sm px-4 py-12">
      <h1 className="font-serif text-2xl font-semibold text-foreground">
        Sign In
      </h1>
      <p className="mt-2 text-sm text-foreground/70">
        Management of meeting programs is limited to the ward administrator.
      </p>
      <div className="mt-8">
        <LoginForm redirectTo={redirectTo} />
      </div>
    </section>
  );
}
