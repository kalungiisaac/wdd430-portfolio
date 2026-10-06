import { sql } from '@vercel/postgres';
import type { SacramentMeeting } from './types';

const ITEMS_PER_PAGE = 5;

export async function getMeetings(
  query: string = '',
  currentPage: number = 1,
  date?: string | null,
  paginate: boolean = true
): Promise<SacramentMeeting[]> {
  if (date) {
    const rows = await sql`
      SELECT
        id,
        to_char(date, 'YYYY-MM-DD') AS "date",
        meeting_type                AS "meetingType",
        presiding, conducting, announcements,
        opening_hymn                AS "openingHymn",
        opening_prayer              AS "openingPrayer",
        ward_business               AS "wardBusiness",
        stake_business              AS "stakeBusiness",
        sacrament_hymn              AS "sacramentHymn",
        speakers,
        closing_hymn                AS "closingHymn",
        closing_prayer              AS "closingPrayer"
      FROM meetings
      WHERE date = ${date}
      ORDER BY date DESC
    `;
    return rows.rows as unknown as SacramentMeeting[];
  }

  const searchTerm = `%${query}%`;
  const page = Math.max(1, Math.floor(currentPage) || 1);
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const rows = paginate
    ? await sql`
        SELECT
          id,
          to_char(date, 'YYYY-MM-DD') AS "date",
          meeting_type                AS "meetingType",
          presiding, conducting, announcements,
          opening_hymn                AS "openingHymn",
          opening_prayer              AS "openingPrayer",
          ward_business               AS "wardBusiness",
          stake_business              AS "stakeBusiness",
          sacrament_hymn              AS "sacramentHymn",
          speakers,
          closing_hymn                AS "closingHymn",
          closing_prayer              AS "closingPrayer"
        FROM meetings
        WHERE
          presiding     ILIKE ${searchTerm}
          OR conducting ILIKE ${searchTerm}
          OR meeting_type ILIKE ${searchTerm}
          OR speakers::text ILIKE ${searchTerm}
        ORDER BY date DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `
    : await sql`
        SELECT
          id,
          to_char(date, 'YYYY-MM-DD') AS "date",
          meeting_type                AS "meetingType",
          presiding, conducting, announcements,
          opening_hymn                AS "openingHymn",
          opening_prayer              AS "openingPrayer",
          ward_business               AS "wardBusiness",
          stake_business              AS "stakeBusiness",
          sacrament_hymn              AS "sacramentHymn",
          speakers,
          closing_hymn                AS "closingHymn",
          closing_prayer              AS "closingPrayer"
        FROM meetings
        WHERE
          presiding     ILIKE ${searchTerm}
          OR conducting ILIKE ${searchTerm}
          OR meeting_type ILIKE ${searchTerm}
          OR speakers::text ILIKE ${searchTerm}
        ORDER BY date DESC
      `;
  return rows.rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(
  query: string = ''
): Promise<number> {
  const searchTerm = `%${query}%`;
  const rows = await sql`
    SELECT COUNT(*) FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;
  return Math.ceil(Number(rows.rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings WHERE id = ${id}
  `;
  return (rows.rows[0] as unknown as SacramentMeeting) ?? null;
}

/**
 * Returns the meeting for the given date if one exists, otherwise the meeting
 * closest to that date (preferring a future meeting when equally far away).
 * Returns null only when the meetings table is empty.
 */
export async function getCurrentMeeting(
  targetDate: string
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    ORDER BY ABS(date - (${targetDate})::date) ASC, date DESC
    LIMIT 1
  `;
  return (rows.rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function addMeeting(
  data: Omit<SacramentMeeting, 'id'>
): Promise<SacramentMeeting> {
  const rows = await sql`
    INSERT INTO meetings (
      date, meeting_type, presiding, conducting, announcements,
      opening_hymn, opening_prayer, ward_business, stake_business,
      sacrament_hymn, speakers, closing_hymn, closing_prayer
    ) VALUES (
      ${data.date},
      ${data.meetingType},
      ${data.presiding},
      ${data.conducting},
      ARRAY(
        SELECT jsonb_array_elements_text(
          ${JSON.stringify(data.announcements ?? [])}::jsonb
        )
      ),
      ${JSON.stringify(data.openingHymn)}::jsonb,
      ${data.openingPrayer},
      ${JSON.stringify(data.wardBusiness ?? [])}::jsonb,
      ${data.stakeBusiness ?? false},
      ${JSON.stringify(data.sacramentHymn)}::jsonb,
      ${JSON.stringify(data.speakers ?? [])}::jsonb,
      ${JSON.stringify(data.closingHymn)}::jsonb,
      ${data.closingPrayer}
    )
    RETURNING
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
  `;

  return rows.rows[0] as unknown as SacramentMeeting;
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>
): Promise<SacramentMeeting | null> {
  const existing = await getMeetingById(id);
  if (!existing) {
    return null;
  }

  const merged = { ...existing, ...updates };

  const rows = await sql`
    UPDATE meetings SET
      date           = ${merged.date},
      meeting_type   = ${merged.meetingType},
      presiding      = ${merged.presiding},
      conducting     = ${merged.conducting},
      announcements  = ARRAY(
        SELECT jsonb_array_elements_text(
          ${JSON.stringify(merged.announcements ?? [])}::jsonb
        )
      ),
      opening_hymn   = ${JSON.stringify(merged.openingHymn)}::jsonb,
      opening_prayer = ${merged.openingPrayer},
      ward_business  = ${JSON.stringify(merged.wardBusiness ?? [])}::jsonb,
      stake_business = ${merged.stakeBusiness ?? false},
      sacrament_hymn = ${JSON.stringify(merged.sacramentHymn)}::jsonb,
      speakers       = ${JSON.stringify(merged.speakers ?? [])}::jsonb,
      closing_hymn   = ${JSON.stringify(merged.closingHymn)}::jsonb,
      closing_prayer = ${merged.closingPrayer}
    WHERE id = ${id}
    RETURNING
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
  `;

  return (rows.rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function deleteMeeting(id: number): Promise<boolean> {
  const result = await sql`DELETE FROM meetings WHERE id = ${id}`;
  return (result.rowCount ?? 0) > 0;
}
