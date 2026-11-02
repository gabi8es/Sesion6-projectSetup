---
applyTo: "**/*.css,**/*.ts,**/*.tsx"
---

# Tailwind CSS Engineering Standards

This document defines the styling approach and conventions for all UI components in the repository, enforcing a strict Tailwind-first methodology.

## Tailwind-First Approach

* **Utility First:** Use Tailwind utility classes for all styling. Avoid creating custom CSS classes or using inline styles (`style={{...}}`) unless completely necessary.
* **Component Extraction:** For highly reused UI patterns (like buttons or cards), extract them into generic React components rather than relying heavily on Tailwind's `@apply` directive. 

## Class Organization

Order your Tailwind classes logically to improve readability. Prefer using an automated formatter like `prettier-plugin-tailwindcss`. If formatting manually, follow this general order:

1. **Base/Layout:** `block`, `flex`, `grid`, `absolute`, `relative`, `z-10`
2. **Spacing & Sizing:** `w-full`, `h-screen`, `m-4`, `p-2`
3. **Typography:** `text-lg`, `font-bold`, `tracking-wide`, `text-center`
4. **Visuals/Backgrounds:** `bg-blue-500`, `text-gray-900`, `border`, `rounded-md`, `shadow-sm`
5. **Interactive & State Variants:** `hover:bg-blue-600`, `active:scale-95`, `disabled:opacity-50`
6. **Responsive Variants:** `sm:p-4`, `md:flex-row`, `lg:w-1/2`

## Responsive Design

* **Mobile-First:** Always style for the smallest screen first using base classes. Use Tailwind's breakpoints (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) to progressively enhance the layout for larger screens.
* **Avoid Max-Width Media Queries:** Stick to standard min-width breakpoints to ensure consistent scaling and prevent breakpoint collisions.

## Accessibility (a11y) & Interactive States

* **Focus States:** Every interactive element must have a clear focus indicator. Prefer `focus-visible:` over `focus:` to avoid showing rings on mouse clicks (e.g., `focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none`).
* **Screen Readers:** Use the `sr-only` class to visually hide elements that should still be readable by screen readers (like icon-only button labels).
* **High Contrast:** Ensure color combinations pass WCAG AA contrast standards.

## Custom CSS Guidelines

Custom CSS is heavily restricted and should only be used in global stylesheets under the following conditions:

* **Complex Animations:** Keyframe animations that are too complex to model purely with Tailwind config extensions.
* **Dynamic Calculations:** Cases where `calc()` logic relies on deeply nested or highly dynamic CSS variables that cannot be handled inline.
* **Third-Party Overrides:** Styling third-party components (e.g., highly complex date pickers) that do not accept utility classes directly.
* **The `@apply` Directive:** Use `@apply` very sparingly. Reserve it for standardizing global HTML elements (e.g., setting base `h1`, `h2`, `p` styles in a typography layer).