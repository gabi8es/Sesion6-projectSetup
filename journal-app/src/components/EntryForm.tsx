import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import type { IsoDate, JournalEntryInput, Mood } from '../types/journal'
import { Button } from './Button'
import { ErrorState } from './ErrorState'
import { MoodPicker } from './MoodPicker'

interface EntryFormProps {
  readonly date: IsoDate
  readonly initialMood: Mood | null
  readonly initialText: string
  readonly submitLabel: string
  readonly isSaving: boolean
  readonly error: string | null
  readonly onSubmit: (input: JournalEntryInput) => Promise<void>
}

const MOOD_REQUIRED_MESSAGE = 'Please choose a mood.'
const TEXT_REQUIRED_MESSAGE = 'Please write something in your journal entry.'

/** Remount with a new `key` to reset the fields from new initial values. */
export function EntryForm({
  date,
  initialMood,
  initialText,
  submitLabel,
  isSaving,
  error,
  onSubmit,
}: EntryFormProps) {
  const [mood, setMood] = useState<Mood | null>(initialMood)
  const [text, setText] = useState(initialText)
  const [validationError, setValidationError] = useState<string | null>(null)
  const textId = useId()

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()
    if (mood === null) {
      setValidationError(MOOD_REQUIRED_MESSAGE)
      return
    }
    if (text.trim().length === 0) {
      setValidationError(TEXT_REQUIRED_MESSAGE)
      return
    }
    setValidationError(null)
    await onSubmit({ date, mood, text })
  }

  const message = validationError ?? error

  return (
    <form
      onSubmit={(event) => void handleSubmit(event)}
      className="flex flex-col gap-4"
      noValidate
    >
      <MoodPicker value={mood} onChange={setMood} />
      <div className="flex flex-col gap-2">
        <label
          htmlFor={textId}
          className="text-sm font-semibold text-slate-900 dark:text-slate-100"
        >
          Journal entry
        </label>
        <textarea
          id={textId}
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={8}
          className="w-full rounded-lg border border-slate-300 bg-white p-3 leading-relaxed text-slate-900 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
        />
      </div>
      {message ? <ErrorState message={message} /> : null}
      <Button type="submit" disabled={isSaving} className="self-start">
        {isSaving ? 'Saving…' : submitLabel}
      </Button>
    </form>
  )
}
