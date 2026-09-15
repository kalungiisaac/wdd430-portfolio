import { getMeetingById } from '@/lib/meetings-db';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const idNum = Number(id);

  if (!Number.isInteger(idNum) || idNum <= 0) {
    return Response.json({ error: 'Meeting id must be a positive integer' }, { status: 400 });
  }

  const meeting = await getMeetingById(idNum);

  if (!meeting) {
    return Response.json({ error: 'Meeting not found' }, { status: 404 });
  }

  return Response.json(meeting);
}