======================================================================
FILE: 05_UI_DESIGN_SYSTEM.md
LOCATION: /.ai/05_UI_DESIGN_SYSTEM.md
======================================================================

# 05_UI_DESIGN_SYSTEM.md — Web UI & Design Language

> **DOCUMENT STATUS:** Standard (Priority 4 - Web UI & Styling)
> **SCOPE:** Web Application (`/frontend-web`)
> **AUTHORITY:** Defines the visual constraints for all React components.

## 1. DESIGN PHILOSOPHY
- Visual Identity: Clean, modern, professional, trustworthy, and nature-inspired.
- Spacing over Clutter: Whitespace is strongly preferred over crowded layouts. Avoid visual clutter.
- Consistency over Decoration: Reuse existing patterns. Never design for unnecessary visual complexity.

## 2. TAILWIND DESIGN TOKENS
AI Assistants MUST restrict styling strictly to these approved Tailwind utility values.

### Color Palette
- Primary (Brand): `green-600` (Default), `green-700` / `green-800` (Hover/Active)
- Neutrals (Backgrounds & Text): `white`, `gray-50`, `gray-100`, `gray-200`, `gray-500`, `gray-700`, `gray-900`
- Semantic: `red-600` (Danger), `green-600` (Success), `amber-500` (Warning), `blue-600` (Info)
- Rule: NEVER introduce random colors or custom hex codes outside this spectrum.

### Typography
- Font Family: Default system font stack.
- Font Weights: `font-normal`, `font-medium`, `font-semibold`, `font-bold`. Avoid excessive weights.
- Text Hierarchy:
  - Page Heading: `text-3xl font-bold`
  - Section Heading: `text-2xl font-semibold`
  - Card Title: `text-lg font-semibold`
  - Body Text: `text-base`
  - Small Text: `text-sm`
  - Caption/Helper: `text-xs`

### Borders, Radius & Shadows
- Border Radius: `rounded-md` (Standard elements), `rounded-lg` (Large Cards), `rounded-xl` (Hero sections). NEVER mix random radius values.
- Shadows: `shadow-sm` (Default/Cards), `shadow-md` (Hover states/Modals), `shadow-lg` (Dropdowns). Avoid heavy or custom shadows.
- Borders: `border border-gray-200` or `border-gray-300`. Light borders only; avoid dark/heavy borders on structural containers.

## 3. STRUCTURAL LAYOUT RULES

### Main Container Structure
- ALWAYS use: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` for top-level page wrappers.
- NEVER use: Tailwind's `container` class or `max-w-screen-lg`.

### Spacing & Rhythm
- Prefer flex/grid layouts with standard gaps: `gap-2`, `gap-3`, `gap-4`, `gap-6`, `gap-8`, `gap-10`, `gap-12`.
- Maintain a consistent vertical rhythm. Avoid excessive nested `div` wrappers.

### Responsive Design
- ALWAYS use Mobile-First implementation. Breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.
- NEVER build desktop-only layouts.

## 4. CORE UI COMPONENT SPECIFICATIONS

### Buttons
- Primary: `bg-green-600 text-white hover:bg-green-700`
- Secondary: `bg-white text-gray-900 border border-gray-300 hover:bg-gray-50`
- Ghost: Transparent background, used for secondary actions or navigation.
- Danger: `bg-red-600 text-white hover:bg-red-700` (Strictly for destructive actions).
- Rule: NEVER generate random button styles. Always adhere to these variants.

### Forms & Inputs
- Inputs: `rounded-md border border-gray-300 shadow-sm`.
- Labels: Placed strictly ABOVE inputs.
- Validation Errors: Displayed below inputs in `text-red-600 text-sm`. NEVER hide validation errors.

### Cards
- Structure: `bg-white border border-gray-200 rounded-lg shadow-sm p-4` (padding can scale based on context).
- Usage: Cards MUST remain clean, self-contained, and reusable.

### Icons & Imagery
- Icons: Use `lucide-react` exclusively. DO NOT mix icon libraries. Keep icons decorative unless functionality requires them.
- Images: ALWAYS use `object-cover` and rounded corners (`rounded-md` or `rounded-lg`). Implement lazy loading where appropriate.

## 5. GLOBAL LAYOUT COMPONENTS

### Header
- MUST be: `sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm h-16`.
- Content must be constrained by the global `max-w-7xl` wrapper.

### Footer
- Structure: `bg-white border-t border-gray-200`.
- Layout: Responsive grid. Simple and readable. NO heavy/dark backgrounds.

## 6. UX & INTERACTION STANDARDS

### Transitions & Animations
- Animations MUST be subtle and functional.
- Allowed classes: `transition-colors`, `transition-shadow`, `transition-transform`, `duration-200`.
- Avoid flashy, bouncy, or delayed effects.

### Accessibility (A11Y)
- Interactive elements MUST support keyboard navigation and visible focus states (`focus:ring-2 focus:ring-green-600 focus:outline-none`).
- Use semantic HTML tags (`<nav>`, `<main>`, `<article>`, `<section>`).
- Provide `aria-label` for icon-only buttons and navigation.

## 7. STRICTLY FORBIDDEN PRACTICES
- NEVER import Tailwind CSS inside individual React components.
- NEVER write inline styles (`style={{ color: 'red' }}`).
- NEVER mix design systems. The use of Bootstrap, Material UI, Chakra UI, Ant Design, or Radix UI (unless unstyled) is strictly FORBIDDEN.
- NEVER use `<a>` tags for internal navigation. ALWAYS use React Router's `<Link>`.

## 8. AI GENERATION DIRECTIVES
Before generating UI components, AI MUST:
- Ensure the interface is minimal, production-ready, and aligns perfectly with this document.
- Reuse established patterns (Buttons, Cards, Inputs) instead of designing ad-hoc styles per page.