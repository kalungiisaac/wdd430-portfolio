import { headers } from 'next/headers';
import type { SacramentMeeting } from './types';

async function getBaseUrl(): Promise<string> {
  const headerStore = await headers();
  const host = headerStore.get('host');
  const protocol = headerStore.get('x-forwarded-proto') ?? 'http';
  return `${protocol}://${host ?? 'localhost:3000'}`;
}

export async function fetchMeetings(date?: string | null): Promise<SacramentMeeting[]> {
  const baseUrl = await getBaseUrl();
  const url = new URL('/api/meetings', baseUrl);
  if (date) url.searchParams.set('date', date);
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) return [];
  return response.json();
}

export async function fetchMeetingById(id: number): Promise<SacramentMeeting | null> {
  const baseUrl = await getBaseUrl();
  const response = await fetch(new URL(`/api/meetings/${id}`, baseUrl), { cache: 'no-store' });
  if (!response.ok) return null;
  return response.json();
}