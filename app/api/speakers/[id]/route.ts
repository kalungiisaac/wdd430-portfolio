import { getSpeakerById } from '@/lib/speakers-db';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const idNum = Number(id);

  if (!Number.isInteger(idNum) || idNum <= 0) {
    return Response.json({ error: 'Speaker id must be a positive integer' }, { status: 400 });
  }

  const speaker = await getSpeakerById(idNum);

  if (!speaker) {
    return Response.json({ error: 'Speaker not found' }, { status: 404 });
  }

  return Response.json(speaker);
}