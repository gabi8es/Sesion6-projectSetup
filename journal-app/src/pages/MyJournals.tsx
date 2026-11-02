import { useState } from 'react'
import { ButtonLink } from '../components/ButtonLink'
import { EmptyState } from '../components/EmptyState'
import { EntryListItem } from '../components/EntryListItem'
import { ErrorState } from '../components/ErrorState'
import { LoadingState } from '../components/LoadingState'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useJournalEntries } from '../hooks/useJournalEntries'
import type { IsoDate, JournalEntry } from '../types/journal'

export function MyJournals() {
  useDocumentTitle('Daily Journal - My Journal')
  const { state, deleteEntry } = useJournalEntries()
  const [deletingDate, setDeletingDate] = useState<IsoDate | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  async function handleDelete(entry: JournalEntry): Promise<void> {
    setDeletingDate(entry.date)
    setDeleteError(null)
    const result = await deleteEntry(entry.date)
    setDeletingDate(null)
    if (!result.ok) {
      setDeleteError(result.message)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold sm:text-3xl">My Journals</h1>
        <ButtonLink to="/journals/new">Add new journal</ButtonLink>
      </header>

      {deleteError ? <ErrorState message={deleteError} /> : null}

      {state.status === 'loading' ? (
        <LoadingState label="Loading your journals…" />
      ) : null}
      {state.status === 'error' ? <ErrorState message={state.message} /> : null}
      {state.status === 'success' && state.data.length === 0 ? (
        <EmptyState
          title="No entries yet"
          description="Your past entries will show up here."
          action={
            <ButtonLink to="/journals/new">Write your first entry</ButtonLink>
          }
        />
      ) : null}
      {state.status === 'success' && state.data.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {state.data.map((entry) => (
            <EntryListItem
              key={entry.date}
              entry={entry}
              isDeleting={deletingDate === entry.date}
              onDelete={(target) => void handleDelete(target)}
            />
          ))}
        </ul>
      ) : null}
    </div>
  )
}
