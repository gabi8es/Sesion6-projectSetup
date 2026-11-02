import { describe, expect, it } from 'vitest'
import type { JournalEntry } from '../types/journal'
import { addDays, isIsoDate, toIsoDate } from './date'
import { computeJournalStats } from './journalStats'

function makeEntry(
  date: string,
  mood: JournalEntry['mood'] = 'good',
): JournalEntry {
  return { date, mood, text: 'x', createdAt: date, updatedAt: date }
}

describe('date utils', () => {
  it('validates real calendar dates only', () => {
    expect(isIsoDate('2024-02-29')).toBe(true)
    expect(isIsoDate('2023-02-29')).toBe(false)
    expect(isIsoDate('2024-5-1')).toBe(false)
  })

  it('adds days across month boundaries', () => {
    expect(addDays('2024-03-01', -1)).toBe('2024-02-29')
    expect(toIsoDate(new Date(2024, 0, 5))).toBe('2024-01-05')
  })
})

describe('computeJournalStats', () => {
  const today = '2024-05-10'

  it('counts a streak ending today', () => {
    const entries = [
      makeEntry('2024-05-10'),
      makeEntry('2024-05-09'),
      makeEntry('2024-05-07'),
    ]
    expect(computeJournalStats(entries, today).currentStreak).toBe(2)
  })

  it('keeps the streak alive when only yesterday is written', () => {
    const entries = [makeEntry('2024-05-09'), makeEntry('2024-05-08')]
    expect(computeJournalStats(entries, today).currentStreak).toBe(2)
  })

  it('reports totals, month count, and top mood', () => {
    const entries = [
      makeEntry('2024-05-02', 'great'),
      makeEntry('2024-05-01', 'great'),
      makeEntry('2024-04-30', 'low'),
    ]
    expect(computeJournalStats(entries, today)).toMatchObject({
      totalEntries: 3,
      entriesThisMonth: 2,
      topMood: 'great',
    })
  })
})
