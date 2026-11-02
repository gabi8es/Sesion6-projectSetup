import { useCallback, useEffect, useState } from 'react'
import { journalService } from '../services'
import type { AsyncState, MutationResult } from '../types/async'
import type { IsoDate, JournalEntry } from '../types/journal'
import { getErrorMessage } from '../utils/getErrorMessage'

type EntriesState = AsyncState<ReadonlyArray<JournalEntry>>

interface UseJournalEntriesResult {
  readonly state: EntriesState
  readonly refresh: () => Promise<void>
  readonly deleteEntry: (date: IsoDate) => Promise<MutationResult>
}

async function fetchEntriesState(): Promise<EntriesState> {
  try {
    const entries = await journalService.listEntries()
    return { status: 'success', data: entries }
  } catch (error) {
    return { status: 'error', message: getErrorMessage(error) }
  }
}

export function useJournalEntries(): UseJournalEntriesResult {
  const [state, setState] = useState<EntriesState>({ status: 'loading' })

  const refresh = useCallback(async () => {
    setState(await fetchEntriesState())
  }, [])

  useEffect(() => {
    let isCancelled = false
    void fetchEntriesState().then((next) => {
      if (!isCancelled) {
        setState(next)
      }
    })
    return () => {
      isCancelled = true
    }
  }, [])

  const deleteEntry = useCallback(
    async (date: IsoDate): Promise<MutationResult> => {
      try {
        await journalService.deleteEntry(date)
        await refresh()
        return { ok: true, value: undefined }
      } catch (error) {
        return { ok: false, message: getErrorMessage(error) }
      }
    },
    [refresh],
  )

  return { state, refresh, deleteEntry }
}
