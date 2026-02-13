# anyUI

Glassmorphism-first component library for Svelte 5, powered by UnoCSS.

**Live Demo:** [css.anybet.fi](https://css.anybet.fi)

## What is anyUI?

A Svelte 5 component library built around real glassmorphism — frosted glass surfaces with backdrop blur, inset shadows, light-edge gradients, and configurable opacity. Every glass parameter is a CSS custom property, adjustable per-tenant at runtime.

Built for B2B SaaS products where each customer (tenant) gets their own branded theme without separate builds.

## Key Features

- **Real Glassmorphism** — backdrop-filter blur, inset shadows, ::before/::after light edges, not just "transparent background with border"
- **Live Configurable** — every glass parameter (blur, opacity, radius, tint, edge glow) adjustable via CSS custom properties or UnoCSS utility classes
- **Multi-Tenant Theming** — define tenant configs in TypeScript, ThemeProvider applies them as CSS custom properties at runtime
- **Per-Tenant Fonts** — each tenant can specify different Google Fonts via `fontUrls`, dynamically loaded by ThemeProvider
- **UnoCSS Preset** — custom `presetAnyUI` with glass rules, intensity variants, and dynamic overrides
- **Svelte 5 Runes** — `$props()`, `$state`, `$derived`, `$bindable`, snippets throughout
- **Zero Consumer Dependencies** — UnoCSS svelte-scoped preprocessor embeds styles into components at build time. Consumers just `npm install` and import

## Glass Utilities

```html
<!-- Base glass surface -->
<div class="glass">...</div>

<!-- Intensity variants -->
<div class="glass glass-subtle">Light frost</div>
<div class="glass glass-card">Standard card</div>
<div class="glass glass-modal">Heavy overlay</div>
<div class="glass glass-heavy">Maximum frost</div>

<!-- Dynamic overrides -->
<div class="glass glass-blur-30 glass-opacity-25 glass-radius-16">
  Custom parameters
</div>

<!-- Disable glass (solid fallback) -->
<div class="glass glass-disabled">No blur</div>
```

## Architecture

```
src/lib/
  presets/preset-anyui.ts     UnoCSS preset: glass rules, shortcuts, preflights
  types/theme.ts              DesignTokens, GlassConfig, TenantConfig types
  theme/
    tokens.ts                 Default design tokens
    merge.ts                  Deep merge + resolveTenantConfig()
    css-vars.ts               Tokens → CSS custom properties
    context.svelte.ts         Svelte 5 reactive theme context
    ThemeProvider.svelte       Runtime theming (global or scoped)
    tenants/                  Tenant preset files
  components/
    Button.svelte             solid / outline / ghost / glass
    Card.svelte               glass / elevated / outlined
    Input.svelte              glass variant, $bindable value
```

## Tenant Config

```typescript
import type { TenantConfigInput } from '@autismllm/anyui';

const myTenant: TenantConfigInput = {
  id: 'acme',
  name: 'Acme Corp',
  tokens: {
    colors: {
      primary: { 500: '#ff6b35', DEFAULT: '#ff6b35' },
      background: '#0a0a0f',
      foreground: '#f1f5f9',
    },
    typography: {
      fontFamily: {
        sans: 'Outfit, system-ui, sans-serif',
      },
      fontUrls: [
        'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap',
      ],
    },
    glass: {
      blur: 28,
      bgOpacity: 0.22,
      tint: [20, 20, 30],
      edgeOpacity: 0.6,
    },
  },
};
```

```svelte
<ThemeProvider tenant={myTenant} global>
  <slot />
</ThemeProvider>
```

## Tech Stack

- **Svelte 5** with runes
- **UnoCSS** with svelte-scoped preprocessor
- **TypeScript** throughout
- **@sveltejs/package** for library builds

## License

MIT
