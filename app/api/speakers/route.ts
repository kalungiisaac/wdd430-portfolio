import { getSpeakers } from '@/lib/speakers-db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const speakers = await getSpeakers();
  return Response.json(speakers);
}