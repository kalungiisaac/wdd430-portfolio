import { getMeetings } from '@/lib/meetings-db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get('date');
  // paginate=false keeps the original API contract: all rows unless filtered by date
  const meetings = await getMeetings('', 1, date, false);
  return Response.json(meetings);
}