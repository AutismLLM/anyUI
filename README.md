# anyUI

Glassmorphism-first component library for Svelte 5, powered by UnoCSS.

**Live Demo:** [css.anybet.fi](https://css.anybet.fi)

## What is anyUI?

A Svelte 5 component library built around real glassmorphism — frosted glass surfaces with backdrop blur, inset shadows, light-edge gradients, and configurable opacity. Every parameter is a CSS custom property, adjustable per-tenant at runtime.

Built for B2B SaaS products where each customer (tenant) gets their own branded theme without separate builds.

## Architecture

Components are split by complexity:

```
src/lib/
  components/
    atoms/                  Smallest indivisible UI elements
      Button.svelte           solid / outline / ghost / glass
      Input.svelte            text input with glass variant
      Badge.svelte            inline label (solid/outline/subtle/glass)
      Toggle.svelte           on/off switch
      Slider.svelte           range input with glass track
      Select.svelte           custom dropdown with glass panel
    molecules/              Small groups of atoms working together
      (SearchBar, FormField, StatCard — coming soon)
    organisms/              Complex composed sections
      Card.svelte             glass / elevated / outlined with header/body/footer
    index.ts                Barrel exports
  theme/
    tokens.ts               Default design tokens (colors, glass, typography)
    merge.ts                Deep merge + resolveTenantConfig()
    css-vars.ts             Tokens → CSS custom properties
    context.svelte.ts       Svelte 5 reactive theme context
    ThemeProvider.svelte     Runtime theming (global or scoped)
    tenants/                Tenant preset files
  presets/
    preset-anyui.ts         UnoCSS preset: glass rules, shortcuts, preflights
  types/
    theme.ts                DesignTokens, GlassConfig, TenantConfig types
```

## CSS Custom Properties

Every component is fully configurable via `--any-*` CSS variables. Set them on `:root`, on a container, or per-tenant via ThemeProvider.

**Card:**
`--any-card-padding-sm/md/lg`, `--any-card-radius`, `--any-card-gap`, `--any-card-divider-width`, `--any-card-divider-opacity`, `--any-card-border-width`, `--any-card-border-opacity`, `--any-card-header-body-ratio`, `--any-card-shadow`

**Input:**
`--any-input-padding`, `--any-input-radius`, `--any-input-font-size`, `--any-input-bg`, `--any-input-glass-opacity`, `--any-input-glass-blur`, `--any-input-error-color`, `--any-input-focus-ring-width`, `--any-input-focus-ring-color`

**Slider:**
`--any-slider-height`, `--any-slider-track-height`, `--any-slider-track-radius`, `--any-slider-thumb-size`, `--any-slider-label-gap`, `--any-slider-label-size`

**Select:**
`--any-select-padding`, `--any-select-radius`, `--any-select-font-size`, `--any-select-dropdown-max-h`, `--any-select-dropdown-blur`, `--any-select-dropdown-opacity`, `--any-select-option-padding`

**Glass (global):**
`--any-glass-blur`, `--any-glass-bg-opacity`, `--any-glass-border-opacity`, `--any-glass-tint-r/g/b`, `--any-glass-edge-opacity`, `--any-glass-radius`, `--any-glass-shadow`, `--any-glass-inset-shadow`

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
      fontFamily: { sans: 'Outfit, system-ui, sans-serif' },
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

## Bundled Fonts

All fonts are bundled as woff2 (latin subset, variable weight). No external requests to Google Fonts.

Inter, Space Grotesk, Outfit, DM Sans, Sora, Plus Jakarta Sans.

## Tech Stack

- **Svelte 5** with runes (`$props`, `$state`, `$derived`, `$bindable`)
- **UnoCSS** with svelte-scoped preprocessor
- **TypeScript** throughout
- **@sveltejs/package** for library builds

## License

MIT
