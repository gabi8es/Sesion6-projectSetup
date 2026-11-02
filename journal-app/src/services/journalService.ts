import type { IsoDate, JournalEntry, JournalEntryInput } from '../types/journal'

/**
 * Contract for journal persistence. Implementations must guarantee at most one
 * entry per calendar day: `saveEntry` creates the entry or updates the existing
 * one for that date. Methods are async so a remote backend (e.g. Supabase) can
 * replace the localStorage implementation without touching hooks or components.
 */
export interface JournalService {
  /** Returns all entries, newest date first. */
  listEntries(): Promise<ReadonlyArray<JournalEntry>>
  getEntry(date: IsoDate): Promise<JournalEntry | null>
  /** Upsert keyed by `input.date`. */
  saveEntry(input: JournalEntryInput): Promise<JournalEntry>
  deleteEntry(date: IsoDate): Promise<void>
}

export class JournalServiceError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'JournalServiceError'
  }
}
