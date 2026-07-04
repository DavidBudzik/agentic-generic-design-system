# Contributing to Generic Design System

We welcome contributions! Here's how to get started.

## Quick Start

```bash
# Clone the repo
git clone https://github.com/your-org/generic-design-system.git
cd generic-design-system

# Enable pnpm via corepack
corepack enable

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run the docs site
pnpm storybook
```

## Project Structure

```
packages/
 core/      — All components, tokens, reset, utilities
 cli/       — CLI: component docs, templates, agent docs
 theme-neutral/  — Neutral Light theme
 theme-dark/   — Neutral Dark theme
 theme-warm/   — Neutral Warm theme
apps/
 docs/      — Documentation site (Vite)
 demo/      — Demo app
```

## Component Guidelines

1. **Use the `gds-` tag prefix** for all custom elements
2. **Extend `GdsBaseElement`** for shared styles and utilities
3. **Use CSS custom properties** from the token system — never hardcode values
4. **Components are accessible** — include ARIA attributes and keyboard support
5. **Form inputs are controlled** — use `value` + dispatch `input`/`change` events
6. **Shadow DOM** for all components
7. **TypeScript strict mode** for all source

## Adding a New Component

1. Create `src/components/<category>/gds-<name>.ts`
2. Extend `GdsBaseElement`, use `@customElement('gds-<name>')`
3. Define props with `@property()` decorator
4. Add styles using `css`` template literal referencing tokens
5. Export from the category `index.ts` and the root `index.ts`
6. Add component docs to the CLI (`packages/cli/src/commands/component.ts`)
7. Add a demo to the docs site (`apps/docs/src/main.ts`)

## Commit Convention

We use conventional commits:

```
feat(component): add new Switch component
fix(form): correct value binding in TextInput
docs: update theming guide
chore: bump dependencies
```

## License

MIT — see [LICENSE](./LICENSE)