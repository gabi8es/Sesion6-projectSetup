import type { IsoDate, JournalEntry, JournalEntryInput } from '../types/journal'
import { isIsoDate } from '../utils/date'
import { isMood } from '../utils/moods'
import { JournalServiceError } from './journalService'
import type { JournalService } from './journalService'
import { validateEntryInput } from './validateEntryInput'

export const JOURNAL_STORAGE_KEY = 'daily-journal:entries'

function isJournalEntry(value: unknown): value is JournalEntry {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const candidate = value as Record<string, unknown>
  return (
    isIsoDate(candidate.date) &&
    isMood(candidate.mood) &&
    typeof candidate.text === 'string' &&
    typeof candidate.createdAt === 'string' &&
    typeof candidate.updatedAt === 'string'
  )
}

function sortNewestFirst(
  entries: Iterable<JournalEntry>,
): ReadonlyArray<JournalEntry> {
  return [...entries].sort((a, b) => b.date.localeCompare(a.date))
}

export class LocalStorageJournalService implements JournalService {
  private readonly storage: Storage

  constructor(storage: Storage = window.localStorage) {
    this.storage = storage
  }

  async listEntries(): Promise<ReadonlyArray<JournalEntry>> {
    return sortNewestFirst(this.readEntries().values())
  }

  async getEntry(date: IsoDate): Promise<JournalEntry | null> {
    return this.readEntries().get(date) ?? null
  }

  async saveEntry(input: JournalEntryInput): Promise<JournalEntry> {
    const valid = validateEntryInput(input)
    const entries = this.readEntries()
    const existing = entries.get(valid.date)
    const now = new Date().toISOString()
    const entry: JournalEntry = {
      ...valid,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    }
    entries.set(entry.date, entry)
    this.writeEntries(entries)
    return entry
  }

  async deleteEntry(date: IsoDate): Promise<void> {
    const entries = this.readEntries()
    if (entries.delete(date)) {
      this.writeEntries(entries)
    }
  }

  // Keyed by date so a duplicate date can never exist in memory.
  private readEntries(): Map<IsoDate, JournalEntry> {
    const raw = this.storage.getItem(JOURNAL_STORAGE_KEY)
    if (raw === null) {
      return new Map()
    }
    let parsed: unknown
    try {
      parsed = JSON.parse(raw)
    } catch (error) {
      throw new JournalServiceError(
        'Stored journal data is corrupted and could not be read.',
        {
          cause: error,
        },
      )
    }
    if (!Array.isArray(parsed)) {
      throw new JournalServiceError(
        'Stored journal data has an unexpected format.',
      )
    }
    const entries = new Map<IsoDate, JournalEntry>()
    for (const item of parsed as ReadonlyArray<unknown>) {
      if (isJournalEntry(item)) {
        entries.set(item.date, item)
      } else {
        console.warn('Skipping invalid journal entry found in storage.', item)
      }
    }
    return entries
  }

  private writeEntries(entries: ReadonlyMap<IsoDate, JournalEntry>): void {
    try {
      this.storage.setItem(
        JOURNAL_STORAGE_KEY,
        JSON.stringify([...entries.values()]),
      )
    } catch (error) {
      throw new JournalServiceError(
        'Could not save your journal. Browser storage may be full.',
        {
          cause: error,
        },
      )
    }
  }
}
