import { useId } from 'react'
import type { Mood } from '../types/journal'
import { MOOD_OPTIONS } from '../utils/moods'

interface MoodPickerProps {
  readonly value: Mood | null
  readonly onChange: (mood: Mood) => void
}

export function MoodPicker({ value, onChange }: MoodPickerProps) {
  const groupName = useId()

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
        How are you feeling?
      </legend>
      <div className="grid grid-cols-5 gap-2">
        {MOOD_OPTIONS.map((option) => (
          <label key={option.value} className="block">
            <input
              type="radio"
              name={groupName}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <span className="flex min-h-16 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-slate-300 bg-white px-1 py-2 text-xs font-medium text-slate-800 peer-checked:border-indigo-700 peer-checked:bg-indigo-50 peer-checked:ring-2 peer-checked:ring-indigo-700 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-600 peer-focus-visible:ring-offset-2 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:peer-checked:bg-indigo-950 dark:hover:bg-slate-700">
              <span aria-hidden="true" className="text-2xl">
                {option.emoji}
              </span>
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
