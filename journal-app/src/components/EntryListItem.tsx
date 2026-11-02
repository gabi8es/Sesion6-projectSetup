// Modified by @gabi8es: Replaced inline delete confirmation buttons with ConfirmDialog modal
import { useState } from 'react'
import type { JournalEntry } from '../types/journal'
import { formatDateTime, formatLongDate } from '../utils/date'
import { Button } from './Button'
import { ButtonLink } from './ButtonLink'
import { Card } from './Card'
import { ConfirmDialog } from './ConfirmDialog'
import { MoodBadge } from './MoodBadge'

interface EntryListItemProps {
  readonly entry: JournalEntry
  readonly isDeleting: boolean
  readonly onDelete: (entry: JournalEntry) => void
}

export function EntryListItem({
  entry,
  isDeleting,
  onDelete,
}: EntryListItemProps) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)

  return (
    <li>
      <Card>
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col items-start gap-2">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                <time dateTime={entry.date}>{formatLongDate(entry.date)}</time>
              </h2>
              <MoodBadge mood={entry.mood} />
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <ButtonLink
                variant="secondary"
                to={`/journals/new?date=${entry.date}`}
              >
                Edit
              </ButtonLink>
              <Button
                variant="secondary"
                onClick={() => setIsConfirmingDelete(true)}
              >
                Delete
              </Button>
            </div>
          </div>
          <p className="leading-relaxed whitespace-pre-wrap text-slate-700 dark:text-slate-200">
            {entry.text}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Last edited:{' '}
            <time dateTime={entry.updatedAt}>
              {formatDateTime(entry.updatedAt)}
            </time>
          </p>
        </div>
      </Card>

      <ConfirmDialog
        isOpen={isConfirmingDelete}
        title="Delete journal entry"
        description={`Are you sure you want to delete the entry for ${formatLongDate(entry.date)}? This action cannot be undone.`}
        confirmLabel="Delete"
        isConfirming={isDeleting}
        onConfirm={() => onDelete(entry)}
        onCancel={() => setIsConfirmingDelete(false)}
      />
    </li>
  )
}
