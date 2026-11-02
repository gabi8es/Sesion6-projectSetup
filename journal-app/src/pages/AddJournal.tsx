import { useId } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { EntryForm } from '../components/EntryForm'
import { ErrorState } from '../components/ErrorState'
import { LoadingState } from '../components/LoadingState'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useJournalEntry } from '../hooks/useJournalEntry'
import { useSaveJournalEntry } from '../hooks/useSaveJournalEntry'
import type { IsoDate, JournalEntryInput } from '../types/journal'
import { formatLongDate, getTodayIsoDate, isIsoDate } from '../utils/date'

const DATE_PARAM = 'date'

function resolveDate(rawDate: string | null, today: IsoDate): IsoDate {
  if (rawDate === null || !isIsoDate(rawDate) || rawDate > today) {
    return today
  }
  return rawDate
}

export function AddJournal() {
  useDocumentTitle('Daily Journal - Add Journal')
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { isSaving, error, save } = useSaveJournalEntry()
  const dateId = useId()

  const today = getTodayIsoDate()
  const date = resolveDate(searchParams.get(DATE_PARAM), today)
  const entryState = useJournalEntry(date)

  async function handleSubmit(input: JournalEntryInput): Promise<void> {
    const result = await save(input)
    if (result.ok) {
      navigate('/journals')
    }
  }

  function handleDateChange(nextDate: string): void {
    if (!isIsoDate(nextDate)) {
      return
    }
    setSearchParams({ [DATE_PARAM]: nextDate }, { replace: true })
  }

  const existingEntry = entryState.status === 'success' ? entryState.data : null

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">
          {existingEntry ? 'Edit journal entry' : 'Add new journal'}
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
          One entry per day. Saving on a date that already has an entry updates
          it.
        </p>
      </header>

      <Card>
        <div className="mb-6 flex flex-col gap-2">
          <label htmlFor={dateId} className="text-sm font-semibold">
            Date
          </label>
          <input
            id={dateId}
            type="date"
            value={date}
            max={today}
            required
            onChange={(event) => handleDateChange(event.target.value)}
            className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-900 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none sm:w-60 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
          />
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {formatLongDate(date)}
          </p>
        </div>

        {entryState.status === 'loading' ? (
          <LoadingState label="Checking this date…" />
        ) : null}
        {entryState.status === 'error' ? (
          <ErrorState message={entryState.message} />
        ) : null}
        {entryState.status === 'success' ? (
          <>
            {existingEntry ? (
              <p
                role="status"
                className="mb-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-100"
              >
                An entry already exists for this date. Saving will update it.
              </p>
            ) : null}
            <EntryForm
              key={`${date}:${existingEntry?.updatedAt ?? 'new'}`}
              date={date}
              initialMood={existingEntry?.mood ?? null}
              initialText={existingEntry?.text ?? ''}
              submitLabel={existingEntry ? 'Update entry' : 'Save entry'}
              isSaving={isSaving}
              error={error}
              onSubmit={handleSubmit}
            />
          </>
        ) : null}
      </Card>
    </div>
  )
}
