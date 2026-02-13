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
					'--glass-blur': `var(--${p}-glass-blur, 20px)`,
					'--glass-bg-opacity': `var(--${p}-glass-bg-opacity, 0.18)`,
					'--glass-border-opacity': `var(--${p}-glass-border-opacity, 0.3)`,
					'--glass-tint-r': `var(--${p}-glass-tint-r, 255)`,
					'--glass-tint-g': `var(--${p}-glass-tint-g, 255)`,
					'--glass-tint-b': `var(--${p}-glass-tint-b, 255)`,
					'--glass-shadow': `var(--${p}-glass-shadow, 0 8px 32px rgba(0,0,0,0.12))`,
					'--glass-inset-shadow': `var(--${p}-glass-inset-shadow, inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(255,255,255,0.1), inset 0 0 16px 4px rgba(255,255,255,0.05))`,
					'--glass-edge-opacity': `var(--${p}-glass-edge-opacity, 0.8)`,
					'--glass-radius': `var(--${p}-glass-radius, 20px)`,
					'position': 'relative',
					'overflow': 'hidden',
					'background':
						'rgba(var(--glass-tint-r), var(--glass-tint-g), var(--glass-tint-b), var(--glass-bg-opacity))',
					'backdrop-filter': 'blur(var(--glass-blur))',
					'-webkit-backdrop-filter': 'blur(var(--glass-blur))',
					'border':
						'1px solid rgba(var(--glass-tint-r), var(--glass-tint-g), var(--glass-tint-b), var(--glass-border-opacity))',
					'border-radius': 'var(--glass-radius)',
					'box-shadow': 'var(--glass-shadow), var(--glass-inset-shadow)',
				}),
				{ layer: 'anyui-components' },
			],

			// ──────────────────────────────────────────
			// GLASSMORPHISM — Intensity variants
			// ──────────────────────────────────────────
			[
				/^glass-subtle$/,
				() => ({
					'--glass-blur': '12px',
					'--glass-bg-opacity': '0.08',
					'--glass-border-opacity': '0.15',
					'--glass-shadow': '0 4px 16px rgba(0,0,0,0.06)',
					'--glass-inset-shadow':
						'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(255,255,255,0.05)',
					'--glass-edge-opacity': '0.5',
				}),
				{ layer: 'anyui-components' },
			],
			[
				/^glass-card$/,
				() => ({
					'--glass-blur': '24px',
					'--glass-bg-opacity': '0.2',
					'--glass-border-opacity': '0.3',
					'--glass-shadow': '0 8px 32px rgba(0,0,0,0.12)',
					'--glass-inset-shadow':
						'inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(255,255,255,0.1), inset 0 0 16px 8px rgba(255,255,255,0.06)',
					'--glass-edge-opacity': '0.8',
					'--glass-radius': '20px',
				}),
				{ layer: 'anyui-components' },
			],
			[
				/^glass-modal$/,
				() => ({
					'--glass-blur': '32px',
					'--glass-bg-opacity': '0.28',
					'--glass-border-opacity': '0.35',
					'--glass-shadow': '0 16px 48px rgba(0,0,0,0.18)',
					'--glass-inset-shadow':
						'inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(255,255,255,0.15), inset 0 0 24px 8px rgba(255,255,255,0.08)',
					'--glass-edge-opacity': '0.9',
					'--glass-radius': '24px',
				}),
				{ layer: 'anyui-components' },
			],
			[
				/^glass-heavy$/,
				() => ({
					'--glass-blur': '40px',
					'--glass-bg-opacity': '0.35',
					'--glass-border-opacity': '0.4',
					'--glass-shadow': '0 24px 64px rgba(0,0,0,0.22)',
					'--glass-inset-shadow':
						'inset 0 2px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(255,255,255,0.2), inset 0 0 32px 12px rgba(255,255,255,0.1)',
					'--glass-edge-opacity': '1',
				}),
				{ layer: 'anyui-components' },
			],

			// ──────────────────────────────────────────
			// GLASSMORPHISM — Dynamic parameter overrides
			// ──────────────────────────────────────────
			[/^glass-blur-(\d+)$/, ([, v]) => ({ '--glass-blur': `${v}px` })],
			[/^glass-opacity-(\d+)$/, ([, v]) => ({ '--glass-bg-opacity': `${Number(v) / 100}` })],
			[
				/^glass-border-opacity-(\d+)$/,
				([, v]) => ({ '--glass-border-opacity': `${Number(v) / 100}` }),
			],
			[/^glass-radius-(\d+)$/, ([, v]) => ({ '--glass-radius': `${v}px` })],
			[
				/^glass-edge-(\d+)$/,
				([, v]) => ({ '--glass-edge-opacity': `${Number(v) / 100}` }),
			],

			// ──────────────────────────────────────────
			// GLASSMORPHISM — Toggle off
			// ──────────────────────────────────────────
			[
				/^glass-disabled$/,
				() => ({
					'backdrop-filter': 'none',
					'-webkit-backdrop-filter': 'none',
					'box-shadow': 'none',
					'background':
						'rgba(var(--glass-tint-r, 255), var(--glass-tint-g, 255), var(--glass-tint-b, 255), 0.95)',
				}),
				{ layer: 'anyui-components' },
			],
		],

		shortcuts: [
			['glass-card-sm', 'glass glass-card glass-radius-12 p-4'],
			['glass-card-lg', 'glass glass-card glass-radius-24 p-8'],
			['glass-nav', 'glass glass-subtle glass-radius-0'],
		],

		preflights: [
			{
				getCSS: () => `
/* anyUI: glass pseudo-element light edges */
.glass::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, var(--glass-edge-opacity, 0.8)),
    transparent
  );
  pointer-events: none;
  z-index: 1;
}

.glass::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, var(--glass-edge-opacity, 0.8)),
    transparent,
    rgba(255, 255, 255, calc(var(--glass-edge-opacity, 0.8) * 0.4))
  );
  pointer-events: none;
  z-index: 1;
}

/* anyUI: fallback for browsers without backdrop-filter */
@supports not (backdrop-filter: blur(1px)) {
  [class*="glass"] {
    background: rgba(var(--${p}-glass-tint-r, 255), var(--${p}-glass-tint-g, 255), var(--${p}-glass-tint-b, 255), 0.92) !important;
    box-shadow: var(--glass-shadow, 0 8px 32px rgba(0,0,0,0.12)) !important;
  }
  .glass::before, .glass::after {
    display: none !important;
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
