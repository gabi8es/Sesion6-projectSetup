import type { JournalEntryInput } from '../types/journal'
import { getTodayIsoDate, isIsoDate } from '../utils/date'
import { isMood } from '../utils/moods'
import { JournalServiceError } from './journalService'

/** Shared by every JournalService implementation so rules stay identical across backends. */
export function validateEntryInput(
  input: JournalEntryInput,
): JournalEntryInput {
  if (!isIsoDate(input.date)) {
    throw new JournalServiceError('Please choose a valid date.')
  }
  if (input.date > getTodayIsoDate()) {
    throw new JournalServiceError('Entries cannot be dated in the future.')
  }
  if (!isMood(input.mood)) {
    throw new JournalServiceError('Please choose a mood.')
  }
  const text = input.text.trim()
  if (text.length === 0) {
    throw new JournalServiceError(
      'Please write something in your journal entry.',
    )
  }
  return { date: input.date, mood: input.mood, text }
}
