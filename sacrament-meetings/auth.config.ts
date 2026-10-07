import type { NextAuthConfig } from 'next-auth';

/**
 * Auth.js config that is safe to run inside proxy.ts.
 *
 * IMPORTANT: this file is executed on the request path before the app boots,
 * so it must not import Node-only modules (bcryptjs) or database clients
 * (@vercel/postgres). Providers and credential verification live in auth.ts.
 */

// Routes that require a signed-in owner.
const PROTECTED_PREFIXES = ['/meetings/new'] as const;

/**
 * `/meetings/[id]/edit` is the one dynamic protected route. Rather than a
 * regex over the raw path (which the activity's `/dashboard` example gets for
 * free), we match the trailing `/edit` segment explicitly so `/meetings`
 * and `/meetings/current` stay public.
 */
function isProtectedPath(pathname: string): boolean {
  if (PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))) return true;
  return /^\/meetings\/[^/]+\/edit\/?$/.test(pathname);
}

export const authConfig = {
  // Must live in this SHARED config, not only in auth.ts: proxy.ts builds its
  // own NextAuth(authConfig) instance, and without this flag a production
  // self-hosted build (NODE_ENV=production, no VERCEL/AUTH_URL) resolves
  // trustHost=false, makes the proxy fail closed to an anonymous session, and
  // locks you out of /meetings/new in an apparent login loop.
  trustHost: true,
  pages: {
    signIn: '/login', // use your own login page instead of the Auth.js default
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      // Protect the meetings management area (create + edit).
      if (isProtectedPath(pathname)) {
        return isLoggedIn; // false redirects to /login
      }

      // Redirect already-logged-in users away from the login page.
      if (isLoggedIn && pathname === '/login') {
        return Response.redirect(new URL('/meetings', nextUrl));
      }

      return true;
    },
  },
  providers: [], // providers are added in auth.ts
} satisfies NextAuthConfig;
