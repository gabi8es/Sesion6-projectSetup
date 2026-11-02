import type { Mood } from '../types/journal'

export interface MoodOption {
  readonly value: Mood
  readonly emoji: string
  readonly label: string
}

export const MOOD_OPTIONS: ReadonlyArray<MoodOption> = [
  { value: 'great', emoji: '😄', label: 'Great' },
  { value: 'good', emoji: '🙂', label: 'Good' },
  { value: 'okay', emoji: '😐', label: 'Okay' },
  { value: 'low', emoji: '😔', label: 'Low' },
  { value: 'awful', emoji: '😢', label: 'Awful' },
]

export function isMood(value: unknown): value is Mood {
  return MOOD_OPTIONS.some((option) => option.value === value)
}

export function getMoodOption(mood: Mood): MoodOption {
  const option = MOOD_OPTIONS.find((candidate) => candidate.value === mood)
  if (!option) {
    throw new Error(`Unknown mood: ${mood}`)
  }
  return option
}
