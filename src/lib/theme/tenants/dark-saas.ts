import type { TenantConfigInput } from '../../types/theme.js';

export const darkSaasTenant: TenantConfigInput = {
	id: 'dark-saas',
	name: 'Dark SaaS',
	tokens: {
		colors: {
			primary: { 500: '#8b5cf6', DEFAULT: '#8b5cf6' },
			background: '#0f0f14',
			foreground: '#e2e8f0',
			muted: '#94a3b8',
			border: '#1e293b',
			surface: { DEFAULT: '#18181b', 50: '#1e1e24', 100: '#27272a', 500: '#52525b' },
		},
		glass: {
			tint: [15, 15, 20],
			bgOpacity: 0.2,
			borderOpacity: 0.15,
			blur: 16,
		},
	},
};
