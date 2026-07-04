# Generic Design System (GDS)

An open source design system that's fully customizable and agent ready.

Built on **Lit Web Components** and **TypeScript** — framework-agnostic, works with React, Vue, Angular, Svelte, or vanilla HTML.

## Quick Start

### Install

```bash
npm install @gds/core @gds/theme-neutral
npm install -D @gds/cli
```

### Add the theme CSS

```css
@import '@gds/core/reset.css';
@import '@gds/core/gds.css';
@import '@gds/theme-neutral/theme.css';
```

### Use components

```html
<script type="module">
 import '@gds/core/button';
 import '@gds/core/layout';
</script>

<gds-vstack gap="2">
 <gds-button label="Hello GDS"></gds-button>
</gds-vstack>
```

### Agent setup

```bash
npx gds init --features agents
```

This generates `CLAUDE.md`, `AGENTS.md`, or `.cursorrules` with full component docs, conventions, and CLI reference.

## Packages

| Package | Description |
|---------|-------------|
| `@gds/core` | 73 components, theme system, utilities |
| `@gds/cli` | CLI: component docs, templates, scaffolding, agent docs |
| `@gds/theme-neutral` | Neutral Light (muted, minimal, sans-serif) |
| `@gds/theme-dark` | Neutral Dark (dark mode companion) |
| `@gds/theme-warm` | Neutral Warm (earthy, serif typography) |
| `@gds/theme-gothic` | Gothic (dark-only, moody, electric purple) |
| `@gds/theme-y2k` | Y2K (retro-futurist, hot pink, playful) |
| `@gds/theme-stone` | Stone (natural, earthy, warm gray) |
| `@gds/theme-ocean` | Ocean (cool, aquatic, deep blue) |

## 73 Components

| Category | Components |
|----------|-----------|
| Action (10) | Button, ButtonGroup, IconButton, Link, DropdownMenu, MoreMenu, SegmentedControl, ToggleButton, ToggleButtonGroup, Toolbar |
| Layout (8) | VStack, HStack, Stack, Grid, Container, AspectRatio, Divider, Spacer |
| Content (10) | Avatar, AvatarGroup, Badge, Blockquote, Citation, Icon, Thumbnail, Heading, Text, Code |
| Container (6) | Card, ClickableCard, SelectableCard, Collapsible, Carousel, Banner |
| Form (12) | TextInput, TextArea, NumberInput, Checkbox, Radio, Switch, Slider, Select, Field, FileInput, DateInput, TimeInput |
| Feedback (7) | Toast, Spinner, Progressbar, Skeleton, StatusDot, Tooltip, EmptyState |
| Navigation (6) | Tabs, Breadcrumbs, Pagination, Navigation, AppShell, CommandPalette |
| Overlay (4) | Dialog, Popover, HoverCard, ContextMenu |
| Data (4) | Table, List, Item, TreeList |
| Chat (4) | ChatMessage, ChatComposer, ChatLayout, ChatToolCalls |
| Utility (2) | Kbd, VisuallyHidden |

## Principles

1. **Components over primitives** — use components for everything they cover
2. **Semantic tokens over hardcoded values** — colors and spacing named by purpose
3. **Theme-agnostic code** — app code never references specific colors
4. **Open internals** — every primitive is exported and composable
5. **One system for humans and AI** — same API, same docs, same conventions

## CLI Commands

| Command | Purpose |
|---------|---------|
| `gds init --features agents` | Generate agent docs (CLAUDE.md, AGENTS.md, .cursorrules) |
| `gds component --list` | List all 73 components |
| `gds component Button` | Show Button props + examples |
| `gds template --list` | List 6 page templates |
| `gds template dashboard --skeleton` | Show dashboard layout skeleton |
| `gds docs theme` | Show theming guide |
| `gds docs tokens` | Show design tokens reference |
| `gds docs styling` | Show styling guide |
| `gds docs layout` | Show layout guide |

## Testing

```bash
pnpm test
```

Uses `@web/test-runner` with `@open-wc/testing` for component testing in a real browser environment.

## GitHub

**https://github.com/DavidBudzik/generic-design-system**

## License

MIT