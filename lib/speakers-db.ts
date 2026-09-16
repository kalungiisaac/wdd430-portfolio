import { getDb } from './mongodb';
import type { Speaker } from './types';

const COLLECTION = 'speakers';

function toSpeaker(doc: Record<string, unknown>): Speaker {
  return {
    id: doc.id as number,
    name: doc.name as string,
    title: doc.title as string,
    calling: doc.calling as string,
    bio: doc.bio as string,
  };
}

export async function getSpeakers(): Promise<Speaker[]> {
  const db = await getDb();
  const docs = await db.collection(COLLECTION).find().sort({ name: 1 }).toArray();
  return docs.map(toSpeaker);
}

export async function getSpeakerById(id: number): Promise<Speaker | null> {
  const db = await getDb();
  const doc = await db.collection(COLLECTION).findOne({ id });
  return doc ? toSpeaker(doc) : null;
}