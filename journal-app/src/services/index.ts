import type { JournalService } from './journalService'
import { LocalStorageJournalService } from './localStorageJournalService'

// Single swap point: replace with a Supabase-backed JournalService later.
export const journalService: JournalService = new LocalStorageJournalService()
