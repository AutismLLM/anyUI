// Components
export { Button, Card, Input } from './components/index.js';

// Theme
export { ThemeProvider } from './theme/index.js';
export { getThemeContext } from './theme/context.svelte.js';
export { defaultTokens } from './theme/tokens.js';
export { resolveTenantConfig } from './theme/merge.js';

// Types
export type {
	DesignTokens,
	TenantConfig,
	TenantConfigInput,
	GlassConfig,
	ColorScale,
	DeepPartial,
} from './types/theme.js';

// Tenant presets
export { defaultTenant } from './theme/tenants/default.js';
export { darkSaasTenant } from './theme/tenants/dark-saas.js';
