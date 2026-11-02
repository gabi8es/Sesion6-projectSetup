import { useCallback, useState } from 'react'
import { journalService } from '../services'
import type { MutationResult } from '../types/async'
import type { JournalEntry, JournalEntryInput } from '../types/journal'
import { getErrorMessage } from '../utils/getErrorMessage'

interface UseSaveJournalEntryResult {
  readonly isSaving: boolean
  readonly error: string | null
  readonly save: (
    input: JournalEntryInput,
  ) => Promise<MutationResult<JournalEntry>>
}

/** Creates the entry, or updates it when one already exists for that date. */
export function useSaveJournalEntry(): UseSaveJournalEntryResult {
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const save = useCallback(
    async (input: JournalEntryInput): Promise<MutationResult<JournalEntry>> => {
      setIsSaving(true)
      setError(null)
      try {
        const entry = await journalService.saveEntry(input)
        return { ok: true, value: entry }
      } catch (caught) {
        const message = getErrorMessage(caught)
        setError(message)
        return { ok: false, message }
      } finally {
        setIsSaving(false)
      }
    },
    [],
  )

  return { isSaving, error, save }
}
