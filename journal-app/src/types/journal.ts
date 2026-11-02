export type Mood = 'great' | 'good' | 'okay' | 'low' | 'awful'

/** Calendar day in `YYYY-MM-DD` form, in the user's local time zone. */
export type IsoDate = string

export interface JournalEntry {
  readonly date: IsoDate
  readonly mood: Mood
  readonly text: string
  readonly createdAt: string
  readonly updatedAt: string
}

export interface JournalEntryInput {
  readonly date: IsoDate
  readonly mood: Mood
  readonly text: string
}
