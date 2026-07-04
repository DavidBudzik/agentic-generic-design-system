# Generic Design System (GDS) — Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Build a production-grade, open source design system with 50+ Lit Web Components, 3 themes, a CLI with agent docs, page templates, and a Storybook docs site.

**Architecture:** pnpm monorepo. `packages/core` contains all components built with Lit + TypeScript. Themes are CSS custom property overrides. CLI generates agent context files (CLAUDE.md, AGENTS.md, .cursorrules). Docs site uses Storybook for interactive component demos.

**Tech Stack:** Lit 3, TypeScript 5, Vite 5, pnpm 10, Storybook 8, Node 22

---

## Project Structure

```
generic-design-system/
 pnpm-workspace.yaml
 package.json
 tsconfig.json
 packages/
  core/      # All components, tokens, reset, utilities
  cli/      # CLI tool: docs, templates, agent setup
  theme-neutral/ # Neutral Light theme
  theme-dark/   # Neutral Dark theme
  theme-warm/   # Neutral Warm theme
 apps/
  docs/      # Storybook docs site
  demo/      # Demo app using all components
 templates/     # Page templates (dashboard, settings, auth)
 internal/
   test-utils/   # Shared test utilities
```

## Component Inventory (50+)

### Action (10)
Button, ButtonGroup, IconButton, Link, DropdownMenu, MoreMenu, SegmentedControl, ToggleButton, ToggleButtonGroup, Toolbar

### Layout (8)
VStack, HStack, Stack, Grid, Container, AspectRatio, Divider, Spacer

### Content (10)
Avatar, AvatarGroup, Badge, Blockquote, Citation, Icon, Thumbnail, Heading, Text, Code

### Container (6)
Card, ClickableCard, SelectableCard, Collapsible, Carousel, Banner

### Form (12)
TextInput, TextArea, NumberInput, Checkbox, Radio, Switch, Slider, Select, Field, FileInput, DateInput, TimeInput

### Feedback (6)
Toast, Spinner, Progressbar, Skeleton, StatusDot, Tooltip

### Navigation (6)
Tabs, Breadcrumbs, Pagination, Navigation, AppShell, CommandPalette

### Overlay (4)
Dialog, Popover, HoverCard, ContextMenu

### Data (4)
Table, List, Item, TreeList

### Chat (4)
ChatMessage, ChatComposer, ChatLayout, ChatToolCalls

### Utility (4)
Spinner, EmptyState, Kbd, VisuallyHidden

## Task List

### Phase 1: Scaffold (Tasks 1-5)
1. Create pnpm workspace + root config
2. Create `@gds/core` package with tsconfig + vite
3. Create theme packages (neutral, dark, warm)
4. Create `@gds/cli` package
5. Create docs (Storybook) + demo app

### Phase 2: Token System (Tasks 6-8)
6. Build design tokens (color, spacing, radius, typography, elevation)
7. Build reset.css + gds.css base styles
8. Create 3 theme CSS files

### Phase 3: Core Components (Tasks 9-20)
9-20. Build all 50+ components in category batches

### Phase 4: CLI (Tasks 21-24)
21. CLI scaffold + init command
22. Component docs command
23. Template command
24. Agent docs generation

### Phase 5: Templates + Docs (Tasks 25-28)
25. Page templates (dashboard, settings, auth, profile)
26. Storybook configuration
27. Stories for all components
28. Agent docs (CLAUDE.md, AGENTS.md, .cursorrules)