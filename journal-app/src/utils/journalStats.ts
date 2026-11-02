import type { IsoDate, JournalEntry, Mood } from '../types/journal'
import { addDays, getMonthKey } from './date'

export interface JournalStats {
  readonly totalEntries: number
  readonly entriesThisMonth: number
  readonly currentStreak: number
  readonly topMood: Mood | null
}

function countCurrentStreak(
  dates: ReadonlySet<IsoDate>,
  today: IsoDate,
): number {
  // A streak stays alive until the end of today, so start from yesterday if today is empty.
  let cursor = dates.has(today) ? today : addDays(today, -1)
  let streak = 0
  while (dates.has(cursor)) {
    streak += 1
    cursor = addDays(cursor, -1)
  }
  return streak
}

function findTopMood(entries: ReadonlyArray<JournalEntry>): Mood | null {
  const counts = new Map<Mood, number>()
  for (const entry of entries) {
    counts.set(entry.mood, (counts.get(entry.mood) ?? 0) + 1)
  }
  let topMood: Mood | null = null
  let topCount = 0
  for (const [mood, count] of counts) {
    if (count > topCount) {
      topMood = mood
      topCount = count
    }
  }
  return topMood
}

export function computeJournalStats(
  entries: ReadonlyArray<JournalEntry>,
  today: IsoDate,
): JournalStats {
  const dates = new Set(entries.map((entry) => entry.date))
  const currentMonth = getMonthKey(today)
  return {
    totalEntries: entries.length,
    entriesThisMonth: entries.filter(
      (entry) => getMonthKey(entry.date) === currentMonth,
    ).length,
    currentStreak: countCurrentStreak(dates, today),
    topMood: findTopMood(entries),
  }
}
