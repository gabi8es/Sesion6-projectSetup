# AI Agent Instructions (AGENTS.md)

This document defines the rules, boundaries, and expectations for all AI agents, coding assistants, and automated tools interacting with this repository.

## 1. Project Context
* **Stack:** Vite, React, TypeScript, Supabase.
* **Styling:** Tailwind CSS.
* **Architecture:** Clean architecture (strict separation of `services`, `components`, and `hooks`).

## 2. Sources of Truth & Rule Priority
Do not hallucinate coding standards. Refer to the existing instruction files in the repository for specific domain rules. If a conflict occurs, resolve it using the following priority (1 being highest):

1. **User Prompt:** Immediate explicit instructions from the user.
2. **`typescript-react.instructions.md`:** Strict TypeScript and React component rules.
3. **`design.instructions.md`:** UI/UX, spacing, and layout principles.
4. **`general.instructions.md`:** Naming, architecture, and universal engineering standards.
5. **`copilot-instructions.md`:** General Copilot behavioral guidelines.

## 3. Workflow Expectations
* **Incremental Changes:** Propose small, iterative changes. Do not attempt large-scale refactors unless explicitly instructed.
* **Follow Existing Patterns:** Match the surrounding code style, naming conventions, and architectural separation.
* **Clean Up:** Remove any unused imports, variables, or dead code created during your modifications.

## 4. Security & Hard Boundaries
* **Strict TypeScript:** **NEVER** weaken TypeScript configurations. Do not use `any`, `@ts-ignore`, or `@ts-nocheck`.
* **No Secrets:** **NEVER** output, log, or commit passwords, API keys, database URLs, or secret tokens. 
* **Authentication/Authorization:** **NEVER** bypass or weaken Supabase Row Level Security (RLS) policies or authentication checks.

## 5. Restricted Files
AI agents must **NOT** modify the following files or directories unless explicitly commanded to run a package update or generation script:
* `dist/` or `build/`
* `node_modules/`
* Lockfiles (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`)
* Auto-generated type files (e.g., Supabase database schema types), unless using the official Supabase CLI generation command.

## 6. Common Commands
Use the following standard commands when building, testing, or verifying code:
* **Install:** `npm install`
* **Development:** `npm run dev`
* **Build:** `npm run build`
* **Typecheck:** `npm run typecheck`
* **Lint:** `npm run lint`
* **Format:** `npm run format`
* **Test:** `npm run test`

## 7. Reporting Changes
When concluding a task or returning code to the user, strictly format your response:
1. State exactly what files were created or modified.
2. Provide a 1-2 sentence summary of the "Why" and "What" of the change.
3. List any new dependencies added or required subsequent actions (e.g., "Run `npm run typecheck` to verify").