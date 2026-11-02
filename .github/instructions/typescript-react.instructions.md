---
applyTo: "**/*.ts,**/*.tsx"
---

# TypeScript & React Engineering Standards

This document establishes the production-grade standards for all TypeScript and React code in this repository. 

## Strict TypeScript Standards

*   **Strict Mode Assumption:** All code must compile with `strict: true` in `tsconfig.json`. Ensure strict null checks and strict bind/call/apply are adhered to.
*   **Zero `any` Tolerance:** The use of `any` is strictly prohibited. Use `unknown` for data with an unknown shape, and use type guards/narrowing to safely access it.
*   **Immutability by Default:** Enforce immutability at the type level. Use `readonly` for interface properties, `ReadonlyArray<T>`, and `Readonly<T>` utility types for props and state.
*   **Discriminated Unions:** Use discriminated unions to model mutually exclusive states (e.g., success, error, loading) rather than a single interface with multiple optional properties.
*   **Type vs Interface:** Use `type` for unions, intersections, and primitive aliases. Use `interface` for object shapes and component props.

## React Component Standards

*   **Functional Components Only:** Exclusively write functional components. Class components are prohibited.
*   **Explicit Typing:** Explicitly define the shape of component props using an interface or type alias. Avoid relying on `React.FC` or `React.FunctionComponent`; type the props directly in the function signature.
*   **Component Size:** Keep components small, focused, and single-responsibility. If a component exceeds 150-200 lines, extract UI pieces into sub-components or logic into custom hooks.
*   **Rules of Hooks:** Strictly adhere to React's Rules of Hooks. Never call hooks conditionally or inside loops. Ensure dependency arrays (`useEffect`, `useCallback`, `useMemo`) are exhaustive.
*   **Identify changes:** Always write a comment at the top of the file or near the relevant code to identify the user who changed the code.

## State Management Philosophy

*   **Locality Principle:** Keep state as close to where it is needed as possible. Avoid prematurely lifting state to context or global stores to prevent unnecessary re-renders.
*   **Derived State:** Avoid syncing state when values can be calculated from existing state or props during rendering.
*   **Memoization:** Use `useMemo` and `useCallback` only when necessary for referential equality (e.g., passing props to heavily memoized child components) or truly expensive calculations.
*   **Immutable Updates:** Always update state immutably. Never mutate state objects or arrays directly before passing them to a setter function.

## Error Handling & Data Fetching

*   **Error Boundaries:** Use Error Boundaries at critical route or layout levels to catch rendering errors and prevent the entire application from crashing.
*   **Explicit Async Handling:** Wrap all asynchronous operations in `try/catch` blocks. Handle both the success and failure branches explicitly.
*   **UI States:** Always provide explicit UI handling for `loading`, `error`, and `empty` states for any data-fetching component. Do not fail silently.
*   **Type-Safe APIs:** Validate API responses against expected shapes at the application boundary (e.g., using Zod or custom type guards) before passing the data into components.