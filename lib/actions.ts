'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  addMeeting,
  deleteMeeting as deleteMeetingRecord,
  updateMeeting as updateMeetingRecord,
} from './meetings-db';
import type {
  MeetingFormState,
  MeetingType,
  SacramentMeeting,
  SpeakerItem,
} from './types';

const MEETING_TYPES = [
  'testimony',
  'regular',
  'stake',
  'general',
  'special',
] as const satisfies readonly MeetingType[];

const rawMeetingSchema = z.object({
  date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter a date in YYYY-MM-DD format.'),
  meetingType: z.enum(MEETING_TYPES, {
    error: 'Choose a valid meeting type.',
  }),
  presiding: z
    .string()
    .trim()
    .min(1, 'Presiding leader is required.')
    .max(255, 'Keep this under 255 characters.'),
  conducting: z
    .string()
    .trim()
    .min(1, 'Conducting leader is required.')
    .max(255, 'Keep this under 255 characters.'),
  announcements: z.string().max(4000, 'Keep announcements under 4000 characters.'),
  openingHymnNumber: z.coerce
    .number({ error: 'Enter an opening hymn number.' })
    .int('Use a whole number.')
    .min(1, 'Hymn numbers start at 1.')
    .max(341, 'Hymn numbers go up to 341.'),
  openingHymnTitle: z
    .string()
    .trim()
    .min(1, 'Opening hymn title is required.')
    .max(255, 'Keep this under 255 characters.'),
  openingPrayer: z
    .string()
    .trim()
    .min(1, 'Opening prayer is required.')
    .max(255, 'Keep this under 255 characters.'),
  wardBusiness: z.string().max(4000, 'Keep ward business under 4000 characters.'),
  stakeBusiness: z.boolean(),
  sacramentHymnNumber: z.coerce
    .number({ error: 'Enter a sacrament hymn number.' })
    .int('Use a whole number.')
    .min(1, 'Hymn numbers start at 1.')
    .max(341, 'Hymn numbers go up to 341.'),
  sacramentHymnTitle: z
    .string()
    .trim()
    .min(1, 'Sacrament hymn title is required.')
    .max(255, 'Keep this under 255 characters.'),
  speakers: z.string().max(4000, 'Keep speakers under 4000 characters.'),
  closingHymnNumber: z.coerce
    .number({ error: 'Enter a closing hymn number.' })
    .int('Use a whole number.')
    .min(1, 'Hymn numbers start at 1.')
    .max(341, 'Hymn numbers go up to 341.'),
  closingHymnTitle: z
    .string()
    .trim()
    .min(1, 'Closing hymn title is required.')
    .max(255, 'Keep this under 255 characters.'),
  closingPrayer: z
    .string()
    .trim()
    .min(1, 'Closing prayer is required.')
    .max(255, 'Keep this under 255 characters.'),
});

const MeetingFormSchema = rawMeetingSchema.transform(
  (raw): Omit<SacramentMeeting, 'id'> => ({
    date: raw.date,
    meetingType: raw.meetingType,
    presiding: raw.presiding,
    conducting: raw.conducting,
    announcements: splitLines(raw.announcements),
    openingHymn: {
      number: raw.openingHymnNumber,
      title: raw.openingHymnTitle,
    },
    openingPrayer: raw.openingPrayer,
    wardBusiness: splitLines(raw.wardBusiness).map((description) => ({
      description,
    })),
    stakeBusiness: raw.stakeBusiness,
    sacramentHymn: {
      number: raw.sacramentHymnNumber,
      title: raw.sacramentHymnTitle,
    },
    speakers: parseSpeakers(raw.speakers),
    closingHymn: {
      number: raw.closingHymnNumber,
      title: raw.closingHymnTitle,
    },
    closingPrayer: raw.closingPrayer,
  })
);

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value : '';
}

function buildFormInput(formData: FormData) {
  return {
    date: readString(formData, 'date'),
    meetingType: readString(formData, 'meetingType'),
    presiding: readString(formData, 'presiding'),
    conducting: readString(formData, 'conducting'),
    announcements: readString(formData, 'announcements'),
    openingHymnNumber: readString(formData, 'openingHymnNumber'),
    openingHymnTitle: readString(formData, 'openingHymnTitle'),
    openingPrayer: readString(formData, 'openingPrayer'),
    wardBusiness: readString(formData, 'wardBusiness'),
    stakeBusiness: formData.get('stakeBusiness') === 'on',
    sacramentHymnNumber: readString(formData, 'sacramentHymnNumber'),
    sacramentHymnTitle: readString(formData, 'sacramentHymnTitle'),
    speakers: readString(formData, 'speakers'),
    closingHymnNumber: readString(formData, 'closingHymnNumber'),
    closingHymnTitle: readString(formData, 'closingHymnTitle'),
    closingPrayer: readString(formData, 'closingPrayer'),
  };
}

function splitLines(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function parseSpeakers(value: string): SpeakerItem[] {
  return splitLines(value).map((line) => {
    if (line.toLowerCase().startsWith('music:')) {
      return {
        name: line.slice('music:'.length).trim(),
        topic: '',
        type: 'musical-number' as const,
      };
    }

    const [name, ...topicParts] = line.split('|');
    return {
      name: name.trim(),
      topic: topicParts.join('|').trim(),
      type: 'speaker' as const,
    };
  });
}

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code?: unknown }).code === '23505'
  );
}

function validationState(error: z.ZodError): MeetingFormState {
  return {
    message: 'Please fix the highlighted fields and try again.',
    errors: z.flattenError(error).fieldErrors,
  };
}

export async function createMeeting(
  _prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const parsed = MeetingFormSchema.safeParse(buildFormInput(formData));

  if (!parsed.success) {
    return validationState(parsed.error);
  }

  try {
    await addMeeting(parsed.data);
  } catch (error) {
    console.error('Failed to create meeting:', error);
    if (isUniqueViolation(error)) {
      return {
        message: 'A meeting already exists on that date.',
        errors: { date: ['A meeting already exists on this date.'] },
      };
    }
    throw new Error('We could not save the meeting. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  _prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const parsed = MeetingFormSchema.safeParse(buildFormInput(formData));

  if (!parsed.success) {
    return validationState(parsed.error);
  }

  try {
    const updated = await updateMeetingRecord(id, parsed.data);
    if (!updated) {
      return {
        message: 'That meeting could not be found. It may have been deleted.',
      };
    }
  } catch (error) {
    console.error('Failed to update meeting:', error);
    if (isUniqueViolation(error)) {
      return {
        message: 'A meeting already exists on that date.',
        errors: { date: ['A meeting already exists on this date.'] },
      };
    }
    throw new Error('We could not update the meeting. Please try again.');
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect('/meetings');
}

export async function deleteMeeting(formData: FormData): Promise<void> {
  const id = Number(formData.get('id'));

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('A valid meeting id is required to delete a meeting.');
  }

  let deleted = false;

  try {
    deleted = await deleteMeetingRecord(id);
  } catch (error) {
    console.error('Failed to delete meeting:', error);
    throw new Error('We could not delete the meeting. Please try again.');
  }

  if (!deleted) {
    throw new Error('That meeting could not be found. It may already be deleted.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}
