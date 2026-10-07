import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

/**
 * Next.js 16 renamed the `middleware` file convention to `proxy`.
 * See node_modules/next/dist/docs/.../proxy.md — "The middleware file
 * convention is deprecated and has been renamed to proxy."
 *
 * This runs on every matched request before rendering and performs the
 * optimistic (cookie-only) session check. The secure checks live in the
 * server actions.
 */
export default NextAuth(authConfig).auth;

export const config = {
  // Run on all routes except API routes and static assets.
  matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js)$).*)'],
};
