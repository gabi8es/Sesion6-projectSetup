---
applyTo: "**/*.tsx,**/*.ts,**/*.css"
---

# UI/UX Design Standards

This document establishes the foundational design principles for the application. All user interfaces must prioritize clarity, simplicity, and usability, ensuring a predictable and accessible experience for all users. These rules are framework-agnostic and dictate the "why" and "what" of our design decisions.

## Core Principles

*   **Clarity Over Decoration:** Every visual element must serve a functional purpose. Avoid purely decorative elements that distract from the user's primary tasks.
*   **Simplicity:** Reduce cognitive load by presenting only the necessary information at any given time. Use progressive disclosure for complex tasks.
*   **Predictability:** Interaction patterns must remain consistent throughout the application. A user should never have to guess how a component works.

## Layout & Composition

*   **Grid and Alignment:** Maintain strict alignment along a predictable grid layout. Elements should visually connect to one another through shared axes.
*   **Visual Hierarchy:** Guide the user's eye naturally from the most important information to the least. Use size, weight, and placement to establish importance.
*   **Responsive Behavior:** Layouts must fluidly adapt to different screen sizes. Prioritize stacking and scrolling on smaller viewports while utilizing horizontal space on larger displays.

## Spacing System

*   **Predictable Scale:** Utilize a standardized spacing scale (e.g., based on an 8pt or 4pt base unit) for all margins, padding, and gaps.
*   **Meaningful Whitespace:** Use negative space to group related elements and separate unrelated ones. Whitespace is a primary tool for reducing cognitive load and defining structure.
*   **Density:** Avoid overly dense UI. Ensure elements have enough breathing room to prevent accidental clicks and improve readability.

## Typography Hierarchy

*   **Clear Scale:** Establish a clear typographic scale with distinct sizes for headings, subheadings, body text, and microcopy.
*   **Legibility First:** Choose legible font weights and line heights. Body text must have sufficient line height (e.g., 1.5) for comfortable reading.
*   **Limited Styles:** Restrict the number of font families and weights used simultaneously. Rely on size and weight contrast rather than multiple typefaces.

## Color Usage

*   **Semantic Meaning:** Use colors purposefully to communicate status and intent (e.g., red for destructive actions/errors, green for success).
*   **Restrained Palette:** Rely primarily on a neutral background and text palette, reserving brand or primary colors for interactive elements, primary calls-to-action (CTAs), and key highlights.
*   **Dark/Light Mode Adaptation:** Ensure color palettes translate functionally between themes without losing semantic meaning or contrast.

## Component Consistency

*   **Standardized States:** All interactive components (buttons, inputs, links) must have clearly defined and visually distinct states: default, hover, active (pressed), focus, and disabled.
*   **Reusability:** Design generic, reusable patterns rather than one-off solutions for specific pages. A primary button should look and behave identically everywhere.
*   **Feedback Loops:** Components must provide immediate visual feedback upon interaction (e.g., a loading spinner on a submitted form button).

## Accessibility (UI/UX)

*   **Contrast Ratios:** All text and critical UI components must meet or exceed WCAG AA contrast standards against their backgrounds.
*   **Touch Targets:** Ensure interactive elements have a minimum physical size (e.g., 44x44 pixels) to accommodate touch inputs comfortably.
*   **Form Usability:** Form inputs must always have visible, persistent labels. Avoid relying solely on placeholder text, which disappears upon interaction.