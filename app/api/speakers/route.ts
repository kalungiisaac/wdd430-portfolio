import { getSpeakers } from '@/lib/speakers-db';

export async function GET() {
  const speakers = await getSpeakers();
  return Response.json(speakers);
}