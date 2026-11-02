import type { IsoDate } from '../types/journal'

const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

function parseIsoDate(date: IsoDate): Date | null {
  const match = ISO_DATE_PATTERN.exec(date)
  if (!match) {
    return null
  }
  const [year, month, day] = [
    Number(match[1]),
    Number(match[2]),
    Number(match[3]),
  ]
  const parsed = new Date(year, month - 1, day)
  const isRealDate =
    parsed.getFullYear() === year &&
    parsed.getMonth() === month - 1 &&
    parsed.getDate() === day
  return isRealDate ? parsed : null
}

export function isIsoDate(value: unknown): value is IsoDate {
  return typeof value === 'string' && parseIsoDate(value) !== null
}

/** Formats using local calendar fields so the "day" matches what the user sees on their clock. */
export function toIsoDate(date: Date): IsoDate {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function getTodayIsoDate(): IsoDate {
  return toIsoDate(new Date())
}

export function addDays(date: IsoDate, amount: number): IsoDate {
  const parsed = parseIsoDate(date)
  if (!parsed) {
    throw new Error(`Invalid date: ${date}`)
  }
  parsed.setDate(parsed.getDate() + amount)
  return toIsoDate(parsed)
}

/** Returns the last `count` calendar days ending at `today`, oldest first. */
export function getRecentIsoDates(today: IsoDate, count: number): IsoDate[] {
  return Array.from({ length: count }, (_, index) =>
    addDays(today, index - (count - 1)),
  )
}

export function formatShortDate(date: IsoDate): string {
  const parsed = parseIsoDate(date)
  if (!parsed) {
    return date
  }
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    day: 'numeric',
  }).format(parsed)
}

export function formatLongDate(date: IsoDate): string {
  const parsed = parseIsoDate(date)
  if (!parsed) {
    return date
  }
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'full' }).format(
    parsed,
  )
}

export function formatDateTime(isoTimestamp: string): string {
  const parsed = new Date(isoTimestamp)
  if (Number.isNaN(parsed.getTime())) {
    return isoTimestamp
  }
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(parsed)
}

export function getMonthKey(date: IsoDate): string {
  return date.slice(0, 7)
}
