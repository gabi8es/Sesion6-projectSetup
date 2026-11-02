import { useState } from 'react'
import { Card } from '../components/Card'
import { ButtonLink } from '../components/ButtonLink'
import { EmptyState } from '../components/EmptyState'
import { EntryForm } from '../components/EntryForm'
import { ErrorState } from '../components/ErrorState'
import { LoadingState } from '../components/LoadingState'
import { MoodBadge } from '../components/MoodBadge'
import { StatTile } from '../components/StatTile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useJournalEntries } from '../hooks/useJournalEntries'
import { useSaveJournalEntry } from '../hooks/useSaveJournalEntry'
import type { JournalEntryInput } from '../types/journal'
import { formatLongDate, getTodayIsoDate } from '../utils/date'
import { computeJournalStats } from '../utils/journalStats'
import { getMoodOption } from '../utils/moods'

export function Home() {
  useDocumentTitle('Daily Journal - Home')
  const { state, refresh } = useJournalEntries()
  const { isSaving, error, save } = useSaveJournalEntry()
  const [savedNotice, setSavedNotice] = useState<string | null>(null)

  if (state.status === 'loading') {
    return <LoadingState label="Loading your journal…" />
  }
  if (state.status === 'error') {
    return <ErrorState message={state.message} />
  }

  const today = getTodayIsoDate()
  const entries = state.data
  const todayEntry = entries.find((entry) => entry.date === today) ?? null
  const stats = computeJournalStats(entries, today)

  async function handleQuickAdd(input: JournalEntryInput): Promise<void> {
    setSavedNotice(null)
    const result = await save(input)
    if (!result.ok) {
      return
    }
    await refresh()
    setSavedNotice(
      todayEntry ? "Today's entry was updated." : "Today's entry was saved.",
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Welcome back</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
          {formatLongDate(today)}
        </p>
      </header>

      <Card>
        <h2 className="mb-4 text-lg font-semibold">Your journal at a glance</h2>
        {entries.length === 0 ? (
          <EmptyState
            title="No entries yet"
            description="Write your first entry below to start your journal."
          />
        ) : (
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatTile
              label="Total entries"
              value={String(stats.totalEntries)}
            />
            <StatTile
              label="This month"
              value={String(stats.entriesThisMonth)}
            />
            <StatTile label="Day streak" value={String(stats.currentStreak)} />
            <StatTile
              label="Most common mood"
              value={
                stats.topMood
                  ? `${getMoodOption(stats.topMood).emoji} ${getMoodOption(stats.topMood).label}`
                  : '—'
              }
            />
          </dl>
        )}
      </Card>

      <Card>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">
            {todayEntry ? "Update today's entry" : 'Quick add for today'}
          </h2>
          {todayEntry ? <MoodBadge mood={todayEntry.mood} /> : null}
        </div>
        <EntryForm
          key={todayEntry?.updatedAt ?? 'new'}
          date={today}
          initialMood={todayEntry?.mood ?? null}
          initialText={todayEntry?.text ?? ''}
          submitLabel={todayEntry ? 'Update entry' : 'Save entry'}
          isSaving={isSaving}
          error={error}
          onSubmit={handleQuickAdd}
        />
        {savedNotice ? (
          <p
            role="status"
            className="mt-4 text-sm font-medium text-green-800 dark:text-green-300"
          >
            {savedNotice}
          </p>
        ) : null}
      </Card>

      <ButtonLink to="/journals" variant="secondary" className="self-start">
        View all journals
      </ButtonLink>
    </div>
  )
}
