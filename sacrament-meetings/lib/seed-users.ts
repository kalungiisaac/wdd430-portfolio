import { config } from 'dotenv';
import bcrypt from 'bcryptjs';
import { sql } from '@vercel/postgres';

// Next.js loads .env for the app, but this script runs outside the server.
config({ path: '.env' });

const createUsers = `
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL        PRIMARY KEY,
  email         VARCHAR(255)  NOT NULL UNIQUE,
  name          VARCHAR(255)  NOT NULL,
  password_hash VARCHAR(255)  NOT NULL
);
`;

async function main() {
  const email = process.env.AUTH_OWNER_EMAIL;
  const password = process.env.AUTH_OWNER_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'AUTH_OWNER_EMAIL and AUTH_OWNER_PASSWORD must be set in .env before seeding users.'
    );
  }

  await sql.query(createUsers);
  console.log('Table users created (or already exists)');

  const passwordHash = await bcrypt.hash(password, 10);

  await sql`
    INSERT INTO users (email, name, password_hash)
    VALUES (${email}, 'Ward Admin', ${passwordHash})
    ON CONFLICT (email) DO UPDATE SET
      name          = EXCLUDED.name,
      password_hash = EXCLUDED.password_hash
  `;

  const count = await sql`SELECT COUNT(*)::int AS count FROM users`;
  console.log(`users table now has ${count.rows[0].count} row(s)`);
  console.log(`Owner account ready: ${email}`);
}

main().catch((err) => {
  console.error('User seed failed:', err);
  process.exit(1);
});
