import type { IsoDate } from '../types/journal'
import {
  formatLongDate,
  formatShortDate,
  getRecentIsoDates,
} from '../utils/date'

const RECENT_DAYS_COUNT = 7

interface RecentDatePickerProps {
  readonly today: IsoDate
  readonly selectedDate: IsoDate
  readonly onSelect: (date: IsoDate) => void
}

export function RecentDatePicker({
  today,
  selectedDate,
  onSelect,
}: RecentDatePickerProps) {
  const recentDates = getRecentIsoDates(today, RECENT_DAYS_COUNT)

  return (
    <div role="group" aria-label="Last 7 days" className="flex flex-wrap gap-2">
      {recentDates.map((date) => {
        const isSelected = date === selectedDate
        return (
          <button
            key={date}
            type="button"
            aria-pressed={isSelected}
            aria-label={formatLongDate(date)}
            title={formatLongDate(date)}
            onClick={() => onSelect(date)}
            className={`min-h-11 min-w-14 flex-1 rounded-lg border px-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none sm:flex-none ${
              isSelected
                ? 'border-indigo-700 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-700 dark:border-indigo-400 dark:bg-indigo-950 dark:text-indigo-100'
                : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {formatShortDate(date)}
          </button>
        )
      })}
    </div>
  )
}
