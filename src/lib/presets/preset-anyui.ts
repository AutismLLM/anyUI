import type { Preset } from 'unocss';

export interface AnyUIPresetOptions {
	/** Prefix for CSS custom properties (default: 'any') */
	prefix?: string;
}

export function presetAnyUI(options: AnyUIPresetOptions = {}): Preset {
	const p = options.prefix ?? 'any';

	return {
		name: 'preset-anyui',

		layers: {
			'anyui-tokens': -3,
			'anyui-base': -2,
			'anyui-components': -1,
		},

		rules: [
			// ──────────────────────────────────────────
			// GLASSMORPHISM — Core surface
			// Usage: class="glass"
			// ──────────────────────────────────────────
			[
				/^glass$/,
				() => ({
					'--glass-blur': `var(--${p}-glass-blur, 12px)`,
					'--glass-bg-opacity': `var(--${p}-glass-bg-opacity, 0.12)`,
					'--glass-border-opacity': `var(--${p}-glass-border-opacity, 0.2)`,
					'--glass-tint-r': `var(--${p}-glass-tint-r, 255)`,
					'--glass-tint-g': `var(--${p}-glass-tint-g, 255)`,
					'--glass-tint-b': `var(--${p}-glass-tint-b, 255)`,
					'--glass-shadow': `var(--${p}-glass-shadow, 0 8px 32px rgba(0,0,0,0.1))`,
					'--glass-radius': `var(--${p}-glass-radius, 16px)`,
					'background':
						'rgba(var(--glass-tint-r), var(--glass-tint-g), var(--glass-tint-b), var(--glass-bg-opacity))',
					'backdrop-filter': 'blur(var(--glass-blur))',
					'-webkit-backdrop-filter': 'blur(var(--glass-blur))',
					'border':
						'1px solid rgba(var(--glass-tint-r), var(--glass-tint-g), var(--glass-tint-b), var(--glass-border-opacity))',
					'border-radius': 'var(--glass-radius)',
					'box-shadow': 'var(--glass-shadow)',
				}),
				{ layer: 'anyui-components' },
			],

			// ──────────────────────────────────────────
			// GLASSMORPHISM — Intensity variants
			// ──────────────────────────────────────────
			[
				/^glass-subtle$/,
				() => ({
					'--glass-blur': '8px',
					'--glass-bg-opacity': '0.06',
					'--glass-border-opacity': '0.1',
					'--glass-shadow': '0 4px 16px rgba(0,0,0,0.05)',
				}),
				{ layer: 'anyui-components' },
			],
			[
				/^glass-card$/,
				() => ({
					'--glass-blur': '12px',
					'--glass-bg-opacity': '0.15',
					'--glass-border-opacity': '0.2',
					'--glass-shadow': '0 8px 32px rgba(0,0,0,0.1)',
					'--glass-radius': '16px',
				}),
				{ layer: 'anyui-components' },
			],
			[
				/^glass-modal$/,
				() => ({
					'--glass-blur': '20px',
					'--glass-bg-opacity': '0.25',
					'--glass-border-opacity': '0.3',
					'--glass-shadow': '0 16px 48px rgba(0,0,0,0.15)',
					'--glass-radius': '24px',
				}),
				{ layer: 'anyui-components' },
			],
			[
				/^glass-heavy$/,
				() => ({
					'--glass-blur': '32px',
					'--glass-bg-opacity': '0.4',
					'--glass-border-opacity': '0.35',
					'--glass-shadow': '0 24px 64px rgba(0,0,0,0.2)',
				}),
				{ layer: 'anyui-components' },
			],

			// ──────────────────────────────────────────
			// GLASSMORPHISM — Dynamic parameter overrides
			// Usage: glass-blur-20, glass-opacity-30, glass-radius-12
			// ──────────────────────────────────────────
			[/^glass-blur-(\d+)$/, ([, v]) => ({ '--glass-blur': `${v}px` })],
			[/^glass-opacity-(\d+)$/, ([, v]) => ({ '--glass-bg-opacity': `${Number(v) / 100}` })],
			[
				/^glass-border-opacity-(\d+)$/,
				([, v]) => ({ '--glass-border-opacity': `${Number(v) / 100}` }),
			],
			[/^glass-radius-(\d+)$/, ([, v]) => ({ '--glass-radius': `${v}px` })],

			// ──────────────────────────────────────────
			// GLASSMORPHISM — Toggle off (falls back to solid bg)
			// ──────────────────────────────────────────
			[
				/^glass-disabled$/,
				() => ({
					'backdrop-filter': 'none',
					'-webkit-backdrop-filter': 'none',
					'background':
						'rgba(var(--glass-tint-r, 255), var(--glass-tint-g, 255), var(--glass-tint-b, 255), 0.95)',
				}),
				{ layer: 'anyui-components' },
			],
		],

		shortcuts: [
			['glass-card-sm', 'glass glass-card glass-radius-12 p-4'],
			['glass-card-lg', 'glass glass-card glass-radius-20 p-8'],
			['glass-nav', 'glass glass-subtle glass-radius-0'],
		],

		preflights: [
			{
				getCSS: () => `
/* anyUI: fallback for browsers without backdrop-filter */
@supports not (backdrop-filter: blur(1px)) {
  [class*="glass"] {
    background: rgba(var(--${p}-glass-tint-r, 255), var(--${p}-glass-tint-g, 255), var(--${p}-glass-tint-b, 255), 0.92) !important;
  }
}

/* anyUI: reduce motion — disable blur for accessibility */
@media (prefers-reduced-motion: reduce) {
  [class*="glass"] {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    transition: none !important;
  }
}
`,
				layer: 'anyui-base',
			},
		],
	};
}
