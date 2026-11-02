import { useEffect, useState } from 'react'
import { journalService } from '../services'
import type { AsyncState } from '../types/async'
import type { IsoDate, JournalEntry } from '../types/journal'
import { getErrorMessage } from '../utils/getErrorMessage'

type EntryState = AsyncState<JournalEntry | null>

interface LoadedEntry {
  readonly date: IsoDate
  readonly state: EntryState
}

const LOADING: EntryState = { status: 'loading' }

/** Loads the entry for one date; `data` is `null` when no entry exists yet. */
export function useJournalEntry(date: IsoDate): EntryState {
  const [loaded, setLoaded] = useState<LoadedEntry | null>(null)

  useEffect(() => {
    let isCancelled = false

    async function load(): Promise<void> {
      try {
        const entry = await journalService.getEntry(date)
        if (!isCancelled) {
          setLoaded({ date, state: { status: 'success', data: entry } })
        }
      } catch (error) {
        if (!isCancelled) {
          setLoaded({
            date,
            state: { status: 'error', message: getErrorMessage(error) },
          })
        }
      }
    }

    void load()
    return () => {
      isCancelled = true
    }
  }, [date])

  // Derived: results for a previous date are treated as loading for the current one.
  return loaded?.date === date ? loaded.state : LOADING
}
