# Daily Journal

A browser-based journal where you write one entry per day and tag it with a mood. Entries are stored in the browser's `localStorage`; no backend is required.

## Features

- **One entry per day.** Saving on a date that already has an entry updates it ([AddJournal.tsx](src/pages/AddJournal.tsx)).
- **Mood tracking.** Choose one of five moods: Great, Good, Okay, Low, Awful ([moods.ts](src/utils/moods.ts)).
- **Quick add on the home page.** Write or update today's entry and see stats: total entries, entries this month, day streak, and most common mood ([Home.tsx](src/pages/Home.tsx), [journalStats.ts](src/utils/journalStats.ts)).
- **Past dates.** Pick a date with the buttons for the last 7 days ([RecentDatePicker.tsx](src/components/RecentDatePicker.tsx)) or with the date input. Future dates are rejected ([validateEntryInput.ts](src/services/validateEntryInput.ts)).
- **Entry list.** Browse entries newest first and delete them ([MyJournals.tsx](src/pages/MyJournals.tsx)).

## Tech stack

- React 19 and TypeScript (strict mode)
- Vite 8
- React Router 7 (`react-router-dom`)
- Tailwind CSS 4
- Vitest 5 for tests
- oxlint for linting and Prettier for formatting

## Getting started

Requirements: Node.js with npm.

```bash
npm install
npm run dev
```

Open the URL that Vite prints in the terminal.

## Scripts

| Script              | Command                | Description                                         |
| ------------------- | ---------------------- | --------------------------------------------------- |
| `npm run dev`       | `vite`                 | Starts the development server                       |
| `npm run build`     | `tsc -b && vite build` | Type-checks and builds for production into `dist/`  |
| `npm run preview`   | `vite preview`         | Serves the production build locally                 |
| `npm run typecheck` | `tsc -b`               | Runs the TypeScript compiler without emitting files |
| `npm run lint`      | `oxlint`               | Lints the source code                               |
| `npm run format`    | `prettier --write .`   | Formats the project                                 |
| `npm run test`      | `vitest run`           | Runs the test suite once                            |

## Project structure

```
src/
├── components/  Reusable UI components (Card, EntryForm, MoodPicker, RecentDatePicker, ...)
├── hooks/       Stateful logic for pages (useJournalEntries, useJournalEntry, useSaveJournalEntry)
├── pages/       Route components (Home, AddJournal, MyJournals)
├── services/    Journal data access (JournalService interface and its localStorage implementation)
├── types/       Shared TypeScript types (Mood, IsoDate, JournalEntry)
└── utils/       Stateless helpers (date handling, moods, statistics)
```

## Architecture

- **Routes** are defined in [App.tsx](src/App.tsx): `/` (Home), `/journals` (My Journals), `/journals/new` (Add New Journal). Any other path renders Home.
- **Data access** goes through the `JournalService` interface. [services/index.ts](src/services/index.ts) exports the single instance used by the app, so swapping the storage backend only requires changing that file.
- **Storage format.** Entries are saved as a JSON array under the `localStorage` key `daily-journal:entries` ([localStorageJournalService.ts](src/services/localStorageJournalService.ts)). Each entry is keyed by its `YYYY-MM-DD` date.
- **Validation** is shared by all service implementations ([validateEntryInput.ts](src/services/validateEntryInput.ts)): the date must be valid and not in the future, a mood is required, and the text cannot be empty after trimming.
- **Corrupted data.** Malformed stored JSON throws a `JournalServiceError` with a user-facing message. Invalid individual items are skipped and logged with `console.warn`.

## Limitations

- Entries exist only in the browser where they were written. Clearing site data deletes them, and they do not sync across devices.
- If browser storage is full, saving fails with an explicit error message.

## Testing

```bash
npm run test
```

Tests live next to the code they cover: [localStorageJournalService.test.ts](src/services/localStorageJournalService.test.ts) and [journalStats.test.ts](src/utils/journalStats.test.ts).
