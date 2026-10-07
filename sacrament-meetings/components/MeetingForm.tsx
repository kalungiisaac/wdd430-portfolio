'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import type { MeetingFormState, SacramentMeeting, SpeakerItem } from '@/lib/types';

type MeetingFormProps = {
  action: (
    prevState: MeetingFormState,
    formData: FormData
  ) => Promise<MeetingFormState>;
  meeting?: SacramentMeeting;
};

const initialState: MeetingFormState = {};

const inputClasses =
  'mt-1 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20';

const labelClasses = 'block text-sm font-medium text-foreground';

const errorClasses = 'mt-1 min-h-5 text-sm text-red-700';

function describedBy(id: string, hint?: string): string {
  return [hint ? `${id}-hint` : null, `${id}-error`].filter(Boolean).join(' ');
}

type TextFieldProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  defaultValue?: string | number;
  hint?: string;
  error?: string;
  required?: boolean;
};

function TextField({
  id,
  name,
  label,
  type = 'text',
  defaultValue,
  hint,
  error,
  required,
}: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint)}
        className={inputClasses}
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-foreground/60">
          {hint}
        </p>
      )}
      <p id={`${id}-error`} aria-live="polite" className={errorClasses}>
        {error ?? ''}
      </p>
    </div>
  );
}

type TextAreaFieldProps = {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
  hint?: string;
  error?: string;
  rows?: number;
};

function TextAreaField({
  id,
  name,
  label,
  defaultValue,
  hint,
  error,
  rows = 3,
}: TextAreaFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint)}
        className={inputClasses}
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-foreground/60">
          {hint}
        </p>
      )}
      <p id={`${id}-error`} aria-live="polite" className={errorClasses}>
        {error ?? ''}
      </p>
    </div>
  );
}

type SelectFieldProps = {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
  error?: string;
};

function SelectField({
  id,
  name,
  label,
  defaultValue,
  options,
  error,
}: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id)}
        className={inputClasses}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p id={`${id}-error`} aria-live="polite" className={errorClasses}>
        {error ?? ''}
      </p>
    </div>
  );
}

function formatSpeakers(speakers?: SpeakerItem[]): string {
  if (!speakers || speakers.length === 0) {
    return '';
  }
  return speakers
    .map((speaker) =>
      speaker.type === 'musical-number'
        ? `music: ${speaker.name}`
        : speaker.topic
          ? `${speaker.name} | ${speaker.topic}`
          : speaker.name
    )
    .join('\n');
}

export default function MeetingForm({ action, meeting }: MeetingFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const errors = state.errors ?? {};

  return (
    <form action={formAction} noValidate className="space-y-6">
      {state.message && (
        <p
          role="alert"
          className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {state.message}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id="date"
          name="date"
          type="date"
          label="Meeting date"
          defaultValue={meeting?.date}
          error={errors.date?.[0]}
          required
        />
        <SelectField
          id="meetingType"
          name="meetingType"
          label="Meeting type"
          defaultValue={meeting?.meetingType ?? 'regular'}
          error={errors.meetingType?.[0]}
          options={[
            { value: 'regular', label: 'Regular meeting' },
            { value: 'testimony', label: 'Testimony meeting' },
            { value: 'stake', label: 'Stake conference' },
            { value: 'general', label: 'General conference' },
            { value: 'special', label: 'Special meeting' },
          ]}
        />
        <TextField
          id="presiding"
          name="presiding"
          label="Presiding"
          defaultValue={meeting?.presiding}
          error={errors.presiding?.[0]}
          required
        />
        <TextField
          id="conducting"
          name="conducting"
          label="Conducting"
          defaultValue={meeting?.conducting}
          error={errors.conducting?.[0]}
          required
        />
      </div>

      <TextAreaField
        id="announcements"
        name="announcements"
        label="Announcements"
        hint="One announcement per line. Leave blank if there are none."
        defaultValue={meeting?.announcements?.join('\n')}
        error={errors.announcements?.[0]}
      />

      <fieldset className="space-y-4 rounded-xl border border-border p-4">
        <legend className="px-1 text-sm font-semibold text-foreground">
          Opening
        </legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            id="openingHymnNumber"
            name="openingHymnNumber"
            type="number"
            label="Opening hymn number"
            defaultValue={meeting?.openingHymn.number}
            error={errors.openingHymnNumber?.[0]}
            required
          />
          <TextField
            id="openingHymnTitle"
            name="openingHymnTitle"
            label="Opening hymn title"
            defaultValue={meeting?.openingHymn.title}
            error={errors.openingHymnTitle?.[0]}
            required
          />
        </div>
        <TextField
          id="openingPrayer"
          name="openingPrayer"
          label="Opening prayer"
          defaultValue={meeting?.openingPrayer}
          error={errors.openingPrayer?.[0]}
          required
        />
      </fieldset>

      <fieldset className="space-y-4 rounded-xl border border-border p-4">
        <legend className="px-1 text-sm font-semibold text-foreground">
          Ward business
        </legend>
        <TextAreaField
          id="wardBusiness"
          name="wardBusiness"
          label="Ward business items"
          hint="One item per line (for example, a sustaining or release)."
          defaultValue={
            meeting?.wardBusiness.map((item) => item.description).join('\n')
          }
          error={errors.wardBusiness?.[0]}
        />
        <div className="flex items-center gap-3">
          <input
            id="stakeBusiness"
            name="stakeBusiness"
            type="checkbox"
            defaultChecked={meeting?.stakeBusiness ?? false}
            aria-describedby="stakeBusiness-error"
            className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
          />
          <label htmlFor="stakeBusiness" className="text-sm font-medium text-foreground">
            Stake business will be conducted
          </label>
        </div>
        <p id="stakeBusiness-error" aria-live="polite" className={errorClasses}>
          {errors.stakeBusiness?.[0] ?? ''}
        </p>
      </fieldset>

      <fieldset className="space-y-4 rounded-xl border border-border p-4">
        <legend className="px-1 text-sm font-semibold text-foreground">
          Sacrament
        </legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            id="sacramentHymnNumber"
            name="sacramentHymnNumber"
            type="number"
            label="Sacrament hymn number"
            defaultValue={meeting?.sacramentHymn.number}
            error={errors.sacramentHymnNumber?.[0]}
            required
          />
          <TextField
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            label="Sacrament hymn title"
            defaultValue={meeting?.sacramentHymn.title}
            error={errors.sacramentHymnTitle?.[0]}
            required
          />
        </div>
      </fieldset>

      <TextAreaField
        id="speakers"
        name="speakers"
        label="Speakers and musical numbers"
        hint="One per line. Use “Name | Topic” for a speaker, or “music: Group name” for a musical number."
        defaultValue={formatSpeakers(meeting?.speakers)}
        error={errors.speakers?.[0]}
      />

      <fieldset className="space-y-4 rounded-xl border border-border p-4">
        <legend className="px-1 text-sm font-semibold text-foreground">
          Closing
        </legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            id="closingHymnNumber"
            name="closingHymnNumber"
            type="number"
            label="Closing hymn number"
            defaultValue={meeting?.closingHymn.number}
            error={errors.closingHymnNumber?.[0]}
            required
          />
          <TextField
            id="closingHymnTitle"
            name="closingHymnTitle"
            label="Closing hymn title"
            defaultValue={meeting?.closingHymn.title}
            error={errors.closingHymnTitle?.[0]}
            required
          />
        </div>
        <TextField
          id="closingPrayer"
          name="closingPrayer"
          label="Closing prayer"
          defaultValue={meeting?.closingPrayer}
          error={errors.closingPrayer?.[0]}
          required
        />
      </fieldset>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? 'Saving…' : meeting ? 'Save changes' : 'Create meeting'}
        </button>
        <Link
          href="/meetings"
          className="text-sm font-medium text-foreground/70 underline underline-offset-2 hover:text-foreground"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
