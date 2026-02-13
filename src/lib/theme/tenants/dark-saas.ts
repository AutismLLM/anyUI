import type { TenantConfigInput } from '../../types/theme.js';

export const darkSaasTenant: TenantConfigInput = {
	id: 'dark-saas',
	name: 'Dark SaaS',
	tokens: {
		typography: {
			fontFamily: {
				sans: 'Space Grotesk, ui-sans-serif, system-ui, sans-serif',
				mono: 'Fira Code, ui-monospace, monospace',
			},
			fontUrls: [],
		},
		colors: {
			primary: { 500: '#8b5cf6', DEFAULT: '#8b5cf6' },
			background: '#0f0f14',
			foreground: '#e2e8f0',
			muted: '#94a3b8',
			border: '#1e293b',
			surface: { DEFAULT: '#18181b', 50: '#1e1e24', 100: '#27272a', 500: '#52525b' },
		},
		glass: {
			tint: [30, 30, 45],
			bgOpacity: 0.22,
			borderOpacity: 0.18,
			blur: 24,
			insetShadow:
				'inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(255,255,255,0.05), inset 0 0 16px 4px rgba(139,92,246,0.03)',
			edgeOpacity: 0.4,
		},
	},
};
