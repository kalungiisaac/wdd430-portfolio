import { getDb } from './mongodb';
import type { SacramentMeeting } from './types';

const COLLECTION = 'meetings';

function toMeeting(doc: Record<string, unknown>): SacramentMeeting {
  return {
    id: doc.id as number,
    date: doc.date as string,
    meetingType: doc.meetingType as SacramentMeeting['meetingType'],
    presiding: doc.presiding as string,
    conducting: doc.conducting as string,
    announcements: doc.announcements as string[] | undefined,
    openingHymn: doc.openingHymn as SacramentMeeting['openingHymn'],
    openingPrayer: doc.openingPrayer as string,
    wardBusiness: doc.wardBusiness as SacramentMeeting['wardBusiness'],
    stakeBusiness: doc.stakeBusiness as boolean,
    sacramentHymn: doc.sacramentHymn as SacramentMeeting['sacramentHymn'],
    speakers: doc.speakers as SacramentMeeting['speakers'],
    closingHymn: doc.closingHymn as SacramentMeeting['closingHymn'],
    closingPrayer: doc.closingPrayer as string,
  };
}

export async function getMeetings(date?: string | null): Promise<SacramentMeeting[]> {
  const db = await getDb();
  const filter: Record<string, unknown> = {};
  if (date) filter.date = date;
  const docs = await db.collection(COLLECTION).find(filter).sort({ date: 1 }).toArray();
  return docs.map(toMeeting);
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  const db = await getDb();
  const doc = await db.collection(COLLECTION).findOne({ id });
  return doc ? toMeeting(doc) : null;
}

export async function insertMeetings(meetings: SacramentMeeting[]): Promise<void> {
  const db = await getDb();
  const count = await db.collection(COLLECTION).countDocuments();
  if (count === 0) {
    await db.collection(COLLECTION).insertMany(meetings);
  }
}