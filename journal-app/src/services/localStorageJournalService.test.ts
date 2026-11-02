import { beforeEach, describe, expect, it } from 'vitest'
import {
  JOURNAL_STORAGE_KEY,
  LocalStorageJournalService,
} from './localStorageJournalService'

class MemoryStorage implements Storage {
  private readonly data = new Map<string, string>()

  get length(): number {
    return this.data.size
  }
  clear(): void {
    this.data.clear()
  }
  getItem(key: string): string | null {
    return this.data.get(key) ?? null
  }
  key(index: number): string | null {
    return [...this.data.keys()][index] ?? null
  }
  removeItem(key: string): void {
    this.data.delete(key)
  }
  setItem(key: string, value: string): void {
    this.data.set(key, value)
  }
}

describe('LocalStorageJournalService', () => {
  let storage: MemoryStorage
  let service: LocalStorageJournalService

  beforeEach(() => {
    storage = new MemoryStorage()
    service = new LocalStorageJournalService(storage)
  })

  it('creates an entry and reads it back', async () => {
    await service.saveEntry({
      date: '2024-05-01',
      mood: 'good',
      text: ' Hello ',
    })
    const entry = await service.getEntry('2024-05-01')
    expect(entry).toMatchObject({
      date: '2024-05-01',
      mood: 'good',
      text: 'Hello',
    })
  })

  it('keeps one entry per day by updating on the same date', async () => {
    const first = await service.saveEntry({
      date: '2024-05-01',
      mood: 'good',
      text: 'One',
    })
    const second = await service.saveEntry({
      date: '2024-05-01',
      mood: 'low',
      text: 'Two',
    })
    const entries = await service.listEntries()
    expect(entries).toHaveLength(1)
    expect(entries[0]).toMatchObject({ mood: 'low', text: 'Two' })
    expect(second.createdAt).toBe(first.createdAt)
  })

  it('lists newest date first', async () => {
    await service.saveEntry({ date: '2024-05-01', mood: 'good', text: 'a' })
    await service.saveEntry({ date: '2024-05-03', mood: 'good', text: 'b' })
    await service.saveEntry({ date: '2024-05-02', mood: 'good', text: 'c' })
    const dates = (await service.listEntries()).map((entry) => entry.date)
    expect(dates).toEqual(['2024-05-03', '2024-05-02', '2024-05-01'])
  })

  it('deletes an entry', async () => {
    await service.saveEntry({ date: '2024-05-01', mood: 'good', text: 'a' })
    await service.deleteEntry('2024-05-01')
    expect(await service.getEntry('2024-05-01')).toBeNull()
  })

  it('rejects invalid input', async () => {
    await expect(
      service.saveEntry({ date: 'nope', mood: 'good', text: 'a' }),
    ).rejects.toThrow('valid date')
    await expect(
      service.saveEntry({ date: '2024-05-01', mood: 'good', text: '   ' }),
    ).rejects.toThrow('write something')
    await expect(
      service.saveEntry({ date: '2999-01-01', mood: 'good', text: 'a' }),
    ).rejects.toThrow('future')
  })

  it('reports corrupted storage instead of failing silently', async () => {
    storage.setItem(JOURNAL_STORAGE_KEY, '{not json')
    await expect(service.listEntries()).rejects.toThrow('corrupted')
  })
})
