# GitHub Copilot Instructions: Daily Journal & Mood Tracker

## Context
You are an expert AI coding assistant helping to build a "Daily Journal with Mood Tracker" web application.
The technology stack for this project is **Vite**, **React**, and **Supabase**.

## Language & React Patterns
- **TypeScript First:** Always use TypeScript with strict typing enabled. Define clear `type` or `interface` contracts for all Component props, states, and function arguments.
- **Functional Components:** Write modern React using functional components and hooks (`useState`, `useEffect`, etc.). Do not use class components.
- **Supabase Integration:** Strongly type all Supabase client interactions. Use try/catch blocks for async data fetching and explicitly handle loading and error states for database interactions (like saving a journal entry or fetching mood history).
- **Naming Conventions:** Use `PascalCase` for component files and names (e.g., `MoodTracker.tsx`), and `camelCase` for utilities, hooks, and variables (e.g., `useAuth.ts`).

## Styling (Tailwind CSS)
- **Primary Styling:** Use **Tailwind CSS** utility classes for all styling. 
- **Avoid Custom CSS:** Do not generate inline styles (`style={{}}`) or standard CSS/SCSS files unless absolutely necessary (e.g., complex keyframe animations that Tailwind cannot handle natively).
- **Responsiveness & UI:** Build with a mobile-first approach using Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`).

## File Structure & Organization
Strictly adhere to the following type-based file structure within the `src/` directory:
- `src/components/`: Reusable, generic UI components (e.g., `Button.tsx`, `Card.tsx`, `MoodIcon.tsx`).
- `src/pages/`: Top-level route components (e.g., `Home.tsx`, `JournalEditor.tsx`, `History.tsx`).
- `src/hooks/`: Custom React hooks containing reusable stateful logic (e.g., `useJournal.ts`, `useSupabase.ts`).
- `src/utils/`: Stateless helper functions (e.g., date formatting for journal entries).
- `src/lib/`: Configuration and third-party library initialization (e.g., the Supabase client instance `supabase.ts`).
- `src/types/`: Global TypeScript definitions, including Supabase Database schema types.

## General Best Practices
- **Clean Code:** Prioritize early returns to avoid deep nesting. Keep functions pure where possible.
- **Accessibility:** Ensure UI components use proper semantic HTML and ARIA attributes, especially for interactive mood selection elements.
- **Conciseness:** Provide direct, accurate code completions without unnecessary boilerplate.