import { sql } from '@vercel/postgres';

/**
 * Owner-only account table. Deliberately minimal: this project uses a
 * single-owner model (see AGENTS.md / course guidance), not multi-user
 * ownership, so we only store what Auth.js needs to verify a login.
 */
export interface OwnerUser {
  id: number;
  email: string;
  name: string;
  passwordHash: string;
}

export async function getUserByEmail(
  email: string
): Promise<OwnerUser | null> {
  const rows = await sql`
    SELECT id, email, name, password_hash AS "passwordHash"
    FROM users
    WHERE lower(email) = lower(${email})
    LIMIT 1
  `;
  return (rows.rows[0] as unknown as OwnerUser) ?? null;
}
