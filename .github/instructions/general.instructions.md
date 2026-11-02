---
applyTo: "**/*"
---

# Universal Engineering Standards

This document outlines the core, language-agnostic engineering standards for this repository. All code generated, modified, or reviewed must adhere to these principles.

## Naming Conventions
* **Descriptive & Clear:** Use intention-revealing names. Avoid abbreviations unless universally understood.
* **Contextual Consistency:** Follow the established casing conventions of the language/framework (e.g., camelCase for variables, PascalCase for classes/types, snake_case for database schemas).
* **Part of Speech:** Use nouns for classes, objects, and types. Use verbs or verb phrases for functions and methods (e.g., `getUser`, `calculateTotal`).
* **Booleans:** Prefix boolean variables with predicates like `is`, `has`, `should`, or `can`.

## File Structure & Organization
* **Single Responsibility:** Each file should have a single, clear purpose. Avoid "god files" that contain multiple unrelated components or utilities.
* **Logical Grouping:** Group files by feature, domain, or architectural layer rather than strictly by file type.
* **Discoverability:** Name files to exactly match the primary export or class they contain. 

## Readability & Code Quality
* **Human-First:** Write code optimized for human reading. Clarity overrides cleverness or extreme brevity.
* **Early Returns:** Prefer early returns (guard clauses) to reduce indentation and avoid deep nesting.
* **No Magic Strings/Numbers:** Extract hardcoded values into named constants, enums, or configuration files.
* **Immutability:** Favor immutable data structures and pure functions where applicable to minimize side effects.

## Comments & Documentation
* **Explain the "Why":** Code explains *what* and *how*. Comments should explain *why* a specific approach was taken, especially for complex or unintuitive logic.
* **Self-Documenting Code:** Rely on good naming and clean structure over inline comments. 
* **No Dead Code:** Delete unused code and commented-out code blocks. Rely on version control for history.
* **Docstrings:** Provide API-level documentation (e.g., JSDoc, Docstrings) for public functions, classes, and interfaces.

## Refactoring Discipline
* **The Boy Scout Rule:** Always leave the codebase cleaner than you found it.
* **Isolate Refactoring:** Separate structural changes (refactoring) from behavioral changes (new features/bug fixes) into distinct commits or PRs.
* **Test Coverage:** Ensure adequate test coverage is in place before and after refactoring to prevent regressions.

## Error Handling & Logging
* **Fail Fast:** Validate inputs at the boundaries and throw errors as early as possible.
* **Specific Exceptions:** Catch and handle specific errors rather than using generic catch-all blocks. 
* **No Silent Failures:** Never swallow errors. At a minimum, log them with sufficient context for debugging.
* **Meaningful Messages:** Write error messages that are actionable and clearly describe what went wrong and potentially how to fix it.

## Imports & Dependencies
* **Logical Grouping:** Organize imports consistently: standard library first, followed by third-party packages, and finally internal/local modules.
* **Explicit Over Implicit:** Prefer explicit imports over wildcard (`*`) imports to prevent namespace pollution.
* **No Circular Dependencies:** Architect modules to flow in a unidirectional dependency graph.

## Formatting & Linting
* **Automation-First:** Rely on automated formatters (e.g., Prettier, Black, Gofmt) and linters. Do not debate style in code reviews.
* **Strict Adherence:** Treat linter warnings as errors. Ensure the build fails if the code does not meet formatting standards.

## Collaboration & Version Control
* **Small, Focused PRs:** Keep Pull Requests small and scoped to a single feature, fix, or refactor.
* **Meaningful Commits:** Write clear, imperative commit messages (e.g., "Fix user login race condition" instead of "fixed bug").
* **Review for Logic:** Focus code reviews on architecture, logic, security, and performance, trusting automated tools for style.