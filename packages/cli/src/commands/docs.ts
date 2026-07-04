import type { CLICommand } from '../types.js';

const docs: Record<string, string> = {
 theme: `# GDS Theming Guide

## How Themes Work

GDS themes are CSS custom property overrides. The core package defines all tokens
with defaults; a theme package overrides them.

## Setup

\`\`\`css
@import '@gds/core/reset.css';
@import '@gds/core/gds.css';
@import '@gds/theme-neutral/theme.css';
\`\`\`

## Switching Themes

Change the theme import:

\`\`\`css
/* Light (default) */
@import '@gds/theme-neutral/theme.css';

/* Dark */
@import '@gds/theme-dark/theme.css';

/* Warm */
@import '@gds/theme-warm/theme.css';
\`\`\`

## Customizing a Theme

Override any token after the theme import:

\`\`\`css
@import '@gds/theme-neutral/theme.css';

:root {
 --gds-color-primary: #your-brand-color;
 --gds-color-primary-hover: #darker-shade;
 --gds-radius-md: 6px;
}
\`\`\`

## Dark Mode

Use a media query or data attribute:

\`\`\`css
@import '@gds/theme-neutral/theme.css';
@import '@gds/theme-dark/theme.css' layer(dark);

@media (prefers-color-scheme: dark) {
 @layer dark {
  :root {
   color-scheme: dark;
  }
 }
}
\`\`\`

Or use a class:

\`\`\`css
[data-theme="dark"] {
 /* override tokens here */
}
\`\`\`

## Available Themes

| Theme | Mode | Aesthetic |
|-------|------|-----------|
| @gds/theme-neutral | Light | Muted, minimal, sans-serif |
| @gds/theme-dark | Dark | Dark mode companion to neutral |
| @gds/theme-warm | Light | Earthy, warm tones, serif typography |

## Token Categories

- **Color**: bg, surface, border, text, primary, secondary, accent, status (success/warning/danger/info)
- **Spacing**: 0-16 (0 to 4rem, 4px base)
- **Radius**: sm (4px), md (8px), lg (12px), xl (16px), full (9999px)
- **Typography**: font-sans, font-mono, font-size (xs-2xl), font-weight, line-height
- **Elevation**: shadow-sm through shadow-xl
- **Motion**: duration (fast/normal/slow), ease
- **Z-index**: base, dropdown, sticky, overlay, modal, toast`,

 tokens: `# GDS Design Tokens Reference

## Color Tokens

### Background
- --gds-color-bg: Page background
- --gds-color-bg-elevated: Elevated surfaces (modals, popovers)
- --gds-color-bg-muted: Muted background (sidebar, code blocks)

### Surface
- --gds-color-surface: Card/panel background
- --gds-color-surface-hover: Hover state for surfaces

### Border
- --gds-color-border: Default border color
- --gds-color-border-strong: Stronger border for emphasis

### Text
- --gds-color-text: Primary text
- --gds-color-text-muted: Secondary/muted text
- --gds-color-text-subtle: Tertiary/subtle text
- --gds-color-text-inverse: Text on colored backgrounds

### Primary/Secondary/Accent
- --gds-color-primary, -hover, -active
- --gds-color-secondary, -hover
- --gds-color-accent, -hover

### Status
- --gds-color-success, --gds-color-warning, --gds-color-danger, --gds-color-info

### On-colors (text on colored bg)
- --gds-color-on-primary, --gds-color-on-secondary, --gds-color-on-accent

## Spacing Tokens (4px base)
- --gds-space-0: 0
- --gds-space-1: 0.25rem (4px)
- --gds-space-2: 0.5rem (8px)
- --gds-space-3: 0.75rem (12px)
- --gds-space-4: 1rem (16px)
- --gds-space-5: 1.25rem (20px)
- --gds-space-6: 1.5rem (24px)
- --gds-space-8: 2rem (32px)
- --gds-space-10: 2.5rem (40px)
- --gds-space-12: 3rem (48px)
- --gds-space-16: 4rem (64px)

## Radius Tokens
- --gds-radius-sm: 4px
- --gds-radius-md: 8px
- --gds-radius-lg: 12px
- --gds-radius-xl: 16px
- --gds-radius-full: 9999px

## Typography Tokens
- --gds-font-sans: Sans-serif font family
- --gds-font-mono: Monospace font family
- --gds-font-size-xs: 0.75rem through --gds-font-size-2xl: 1.5rem
- --gds-font-weight-normal: 400, -medium: 500, -semibold: 600, -bold: 700
- --gds-line-height-tight: 1.25, -normal: 1.5, -relaxed: 1.75

## Elevation Tokens
- --gds-shadow-sm, -md, -lg, -xl

## Motion Tokens
- --gds-duration-fast: 150ms, -normal: 200ms, -slow: 300ms
- --gds-ease-default: cubic-bezier(0.4, 0, 0.2, 1)

## Z-index Tokens
- --gds-z-base: 0, -dropdown: 100, -sticky: 200, -overlay: 1000, -modal: 1100, -toast: 1200`,

 styling: `# GDS Styling Guide

## Approach

GDS components use CSS custom properties for all visual properties.
Override at the component level, page level, or theme level.

## Component Styling

### Via CSS Custom Properties (recommended)

\`\`\`css
gds-button {
 /* Override the primary color for this specific button */
 --gds-color-primary: #ff6600;
}
\`\`\`

### Via CSS Parts

Components expose CSS parts for targeted styling:

\`\`\`css
gds-card::part(header) {
 border-bottom: 1px solid var(--gds-color-border);
}
\`\`\`

### Via Inline Styles (for one-offs)

\`\`\`html
<gds-button style="margin-top: var(--gds-space-4)">Save</gds-button>
\`\`\`

## Rules

1. **Always use tokens** — never hardcode colors, spacing, or radii
2. **CSS custom properties** for colors, not hex values
3. **var(--gds-space-N)** for spacing, not px
4. **var(--gds-radius-N)** for border radius
5. **var(--gds-font-size-N)** for font sizes

## Tailwind Integration

GDS works alongside Tailwind. Use Tailwind utilities for layout/positioning,
GDS tokens for design properties:

\`\`\`html
<div class="flex items-center gap-2">
 <gds-button label="Save"></gds-button>
 <gds-button label="Cancel" variant="ghost"></gds-button>
</div>
\`\`\`

## CSS Framework Integration

GDS components use shadow DOM, so external CSS won't leak in.
Style via:
1. Component props (preferred)
2. CSS custom properties (theme-level overrides)
3. CSS parts (for specific elements)
4. Inline styles (for one-offs)`,

 layout: `# GDS Layout Guide

## Frame-First Approach

Pick the layout shell before writing content:

1. **AppShell** — for app pages with sidebar + header
2. **Container** — for centered content pages (settings, auth, profile)
3. **Grid** — for multi-column layouts
4. **VStack/HStack** — for vertical/horizontal arrangements

## Layout Components

### VStack — Vertical Stack
\`\`\`html
<gds-vstack gap="4" align="stretch" justify="start">
 <child-1 />
 <child-2 />
</gds-vstack>
\`\`\`

### HStack — Horizontal Stack
\`\`\`html
<gds-hstack gap="3" align="center" justify="between" wrap>
 <child-1 />
 <child-2 />
</gds-hstack>
\`\`\`

### Grid — CSS Grid
\`\`\`html
<gds-grid columns="3" gap="4">
 <child-1 />
 <child-2 />
 <child-3 />
</gds-grid>
\`\`\`

### Container — Centered Max-Width
\`\`\`html
<gds-container max-width="lg" padding="6">
 <content />
</gds-container>
\`\`\`

### AppShell — App Layout
\`\`\`html
<gds-appshell sidebar-open sidebar-width="240">
 <nav slot="sidebar">...</nav>
 <header slot="header">...</header>
 <main>...</main>
</gds-appshell>
\`\`\`

## Decision Guide

| Use Case | Component |
|----------|-----------|
| App page with sidebar | AppShell |
| Settings/profile page | Container (max-width: lg) |
| Auth page | Container (max-width: sm) |
| Stats grid | Grid (columns: 3-4) |
| Form fields | VStack (gap: 4) |
| Action bar | HStack (justify: between) |
| Dense data | Table (edge-to-edge, with dividers) |
| Widgets/galleries | Card grid |

## Anti-Pattern: Card Everywhere

Don't wrap everything in cards. Cards are for:
- Widgets
- Settings groups
- Image galleries
- Content blocks

NOT for:
- Dense data (use Table or List)
- Page sections (use VStack or Container)
- Navigation (use Navigation or Tabs)`,
};

export const docsCommand: CLICommand = {
 name: 'docs',
 description: 'Read GDS documentation (theme, tokens, styling, layout)',
 usage: 'gds docs <topic>',
 args: [
  { name: 'topic', description: 'Topic: theme, tokens, styling, or layout', required: true },
 ],
 options: [],
 run: (args) => {
  const topic = args[0];
  if (!topic) {
   console.log('\nAvailable topics:\n');
   console.log(' theme  — How theming works, switching, customizing');
   console.log(' tokens  — Full design token reference');
   console.log(' styling  — How to style components (CSS props, parts, Tailwind)');
   console.log(' layout  — Layout patterns and component selection guide');
   console.log();
   return;
  }

  const content = docs[topic];
  if (!content) {
   console.error(`Topic "${topic}" not found. Available: ${Object.keys(docs).join(', ')}`);
   process.exit(1);
  }

  console.log(content);
 },
};