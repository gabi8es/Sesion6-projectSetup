import type { Mood } from '../types/journal'
import { getMoodOption } from '../utils/moods'

interface MoodBadgeProps {
  readonly mood: Mood
}

export function MoodBadge({ mood }: MoodBadgeProps) {
  const { emoji, label } = getMoodOption(mood)
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-900 dark:bg-indigo-950 dark:text-indigo-100">
      <span aria-hidden="true">{emoji}</span>
      {label}
    </span>
  )
}
