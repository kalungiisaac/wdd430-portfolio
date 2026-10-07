import { logout } from '@/lib/auth-actions';

export default function SignOutButton({
  variant = 'default',
}: {
  variant?: 'default' | 'header';
}) {
  return (
    <form action={logout}>
      <button
        type="submit"
        className={
          variant === 'header'
            ? 'rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/60'
            : 'rounded-full border border-border px-3 py-1 font-medium text-foreground/70 transition-colors hover:bg-foreground/5 focus:outline-none focus:ring-2 focus:ring-primary/40'
        }
      >
        Sign Out
      </button>
    </form>
  );
}
