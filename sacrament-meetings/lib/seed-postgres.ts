import { config } from 'dotenv';
import { sql } from '@vercel/postgres';

config({ path: '.env.local' });

const createTable = `
CREATE TABLE IF NOT EXISTS meetings (
  id             SERIAL        PRIMARY KEY,
  date           DATE          NOT NULL UNIQUE,
  meeting_type   VARCHAR(20)   NOT NULL
                               CHECK (meeting_type IN
                                 ('testimony','regular','stake','general','special')),
  presiding      VARCHAR(255)  NOT NULL,
  conducting     VARCHAR(255)  NOT NULL,
  announcements  TEXT[]        DEFAULT '{}',
  opening_hymn   JSONB         NOT NULL,
  opening_prayer VARCHAR(255)  NOT NULL,
  ward_business  JSONB         DEFAULT '[]',
  stake_business BOOLEAN       DEFAULT false,
  sacrament_hymn JSONB         NOT NULL,
  speakers       JSONB         DEFAULT '[]',
  closing_hymn   JSONB         NOT NULL,
  closing_prayer VARCHAR(255)  NOT NULL
);
`;

const seed = `
INSERT INTO meetings (
  date, meeting_type, presiding, conducting, announcements,
  opening_hymn, opening_prayer, ward_business, stake_business,
  sacrament_hymn, speakers, closing_hymn, closing_prayer
) VALUES
(
  '2026-01-04','testimony','Bishop Thompson','Brother Nakamura',
  ARRAY[]::TEXT[],
  '{"number":134,"title":"I Believe in Christ"}','Sister Park',
  '[]',false,
  '{"number":175,"title":"God, Our Father, Hear Us Pray"}',
  '[]',
  '{"number":219,"title":"Because I Have Been Given Much"}','Brother Alvarez'
),
(
  '2026-01-11','regular','Bishop Thompson','Brother Nakamura',
  ARRAY['Ward temple night: Jan 30'],
  '{"number":2,"title":"The Spirit of God"}','Sister Ramirez',
  '[{"description":"Sustaining of new Sunday School president"}]',true,
  '{"number":169,"title":"In Remembrance of Thy Suffering"}',
  '[{"name":"Sister Chen","topic":"The Sacrament","type":"speaker"},
    {"name":"Brother Osei","topic":"Covenant Keeping","type":"speaker"}]',
  '{"number":31,"title":"O God, Our Help in Ages Past"}','Brother Lewis'
),
(
  '2026-01-18','regular','Bishop Thompson','Sister Torres',
  ARRAY['Ministering interviews this week'],
  '{"number":85,"title":"How Firm a Foundation"}','Brother Kim',
  '[{"description":"Release - Sister Martinez - Primary Teacher"},{"description":"Sustain - Sister Agbavor - Primary Teacher"},{"description":"Sustain - Sister Mukiwa - RS 2nd Counselor"}]',false,
  '{"number":173,"title":"While of These Emblems We Partake"}',
  '[{"name":"Sister Nakamura","topic":"Personal Revelation","type":"speaker"},
    {"name":"Youth Choir","topic":"","type":"musical-number"},
    {"name":"Brother Santos","topic":"Temple Covenants","type":"speaker"}]',
  '{"number":226,"title":"Improve the Shining Moments"}','Sister Jensen'
),
(
  '2026-01-25','stake','President Gimenez','Bishop Thompson',
  ARRAY[]::TEXT[],
  '{"number":66,"title":"The Lord Is My Shepherd"}','Sister Park',
  '[]',true,
  '{"number":169,"title":"In Remembrance of Thy Suffering"}',
  '[{"name":"President Gimenez","topic":"Covenant Path","type":"speaker"},
    {"name":"Stake Choir","topic":"","type":"musical-number"}]',
  '{"number":219,"title":"Because I Have Been Given Much"}','Brother Alvarez'
),
(
  '2026-02-01','regular','Bishop Thompson','Brother Osei',
  ARRAY['Ward temple night: Jan 30 was a success'],
  '{"number":107,"title":"Love One Another"}','Sister Chen',
  '[{"description":"Sustain - Brother Adams - Ward Mission Leader"}]',false,
  '{"number":175,"title":"God, Our Father, Hear Us Pray"}',
  '[{"name":"Brother Smith","topic":"Faith and Works","type":"speaker"},
    {"name":"Sister Smith","topic":"Gratitude","type":"speaker"}]',
  '{"number":230,"title":"We Thank Thee, O God, for a Prophet"}','Brother Nakamura'
),
(
  '2026-02-08','testimony','Bishop Thompson','Sister Torres',
  ARRAY[]::TEXT[],
  '{"number":134,"title":"I Believe in Christ"}','Brother Kim',
  '[]',false,
  '{"number":175,"title":"God, Our Father, Hear Us Pray"}',
  '[{"name":"Members of the congregation","topic":"Testimonies","type":"speaker"}]',
  '{"number":219,"title":"Because I Have Been Given Much"}','Sister Park'
),
(
  '2026-02-15','general','President Gimenez','Sister Torres',
  ARRAY['General conference next month'],
  '{"number":2,"title":"The Spirit of God"}','Brother Santos',
  '[]',true,
  '{"number":173,"title":"While of These Emblems We Partake"}',
  '[{"name":"General Authority","topic":"Charity","type":"speaker"},
    {"name":"Sister Chen","topic":"Missionary Work","type":"speaker"}]',
  '{"number":31,"title":"O God, Our Help in Ages Past"}','Brother Osei'
),
(
  '2026-02-22','special','Bishop Thompson','Brother Nakamura',
  ARRAY['Farewell for the Smith family'],
  '{"number":85,"title":"How Firm a Foundation"}','Sister Ramirez',
  '[{"description":"Farewell - Smith family - moving to Utah"}]',false,
  '{"number":169,"title":"In Remembrance of Thy Suffering"}',
  '[{"name":"Brother Smith","topic":"Moving Forward in Faith","type":"speaker"}]',
  '{"number":230,"title":"We Thank Thee, O God, for a Prophet"}','Sister Chen'
),
(
  '2026-09-20','regular','Bishop Thompson','Brother Nakamura',
  ARRAY['Ward conference next month'],
  '{"number":107,"title":"Love One Another"}','Sister Ramirez',
  '[{"description":"Sustain - Sister Chen - Relief Society pianist"}]',false,
  '{"number":175,"title":"God, Our Father, Hear Us Pray"}',
  '[{"name":"Brother Smith","topic":"Daily Discipleship","type":"speaker"},
    {"name":"Sister Park","topic":"Service in the Ward","type":"speaker"}]',
  '{"number":230,"title":"We Thank Thee, O God, for a Prophet"}','Brother Alvarez'
)
ON CONFLICT (date) DO NOTHING;
`;

async function main() {
  await sql.query(createTable);
  console.log('Table meetings created (or already exists)');
  await sql.query(seed);
  const count = await sql`SELECT COUNT(*)::int AS count FROM meetings`;
  console.log(`meetings table now has ${count.rows[0].count} rows`);
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
