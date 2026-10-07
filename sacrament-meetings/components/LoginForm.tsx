'use client';

import Link from 'next/link';
import { useActionState, useState } from 'react';
import { authenticate } from '@/lib/actions';

const inputClasses =
  'mt-1 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20';

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="space-y-5">
      {/* Auth.js reads `redirectTo` straight off the submitted FormData, so the
          original destination survives the round-trip instead of falling back
          to the Referer (which is just /login). */}
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-foreground"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClasses}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-foreground"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            minLength={6}
            required
            className={`${inputClasses} pr-11`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 mt-1 flex items-center px-3 text-foreground/60 transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            {showPassword ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.2A10.7 10.7 0 0112 5c5 0 8.3 4.1 9.3 6-.4.8-1.3 2.1-2.8 3.4M6.2 6.2C4.4 7.4 3.2 9 2.7 11c1 1.9 4.3 6 9.3 6 1 0 1.9-.2 2.8-.5"
                />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.7 12s3.3-7 9.3-7 9.3 7 9.3 7-3.3 7-9.3 7-9.3-7-9.3-7z"
                />
                <circle cx="12" cy="12" r="2.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          aria-disabled={isPending}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? 'Signing in…' : 'Sign In'}
        </button>
        <Link
          href="/meetings"
          className="text-sm font-medium text-foreground/70 underline underline-offset-2 hover:text-foreground"
        >
          Cancel
        </Link>
      </div>

      {errorMessage && (
        <p role="alert" className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
