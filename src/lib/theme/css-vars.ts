import type { DesignTokens, ColorScale } from '../types/theme.js';

const PREFIX = 'any';

function colorScaleVars(name: string, scale: ColorScale): Record<string, string> {
	const vars: Record<string, string> = {};
	for (const [shade, value] of Object.entries(scale)) {
		if (value === undefined) continue;
		if (shade === 'DEFAULT') {
			vars[`--${PREFIX}-color-${name}`] = value;
		} else {
			vars[`--${PREFIX}-color-${name}-${shade}`] = value;
		}
	}
	return vars;
}

/** Convert resolved DesignTokens into a flat Record of CSS custom properties */
export function tokensToCSS(tokens: DesignTokens): Record<string, string> {
	const vars: Record<string, string> = {};

	// Colors
	Object.assign(vars, colorScaleVars('primary', tokens.colors.primary));
	Object.assign(vars, colorScaleVars('secondary', tokens.colors.secondary));
	Object.assign(vars, colorScaleVars('accent', tokens.colors.accent));
	Object.assign(vars, colorScaleVars('surface', tokens.colors.surface));
	vars[`--${PREFIX}-color-bg`] = tokens.colors.background;
	vars[`--${PREFIX}-color-fg`] = tokens.colors.foreground;
	vars[`--${PREFIX}-color-muted`] = tokens.colors.muted;
	vars[`--${PREFIX}-color-border`] = tokens.colors.border;

	// Glass
	vars[`--${PREFIX}-glass-blur`] = `${tokens.glass.blur}px`;
	vars[`--${PREFIX}-glass-bg-opacity`] = `${tokens.glass.bgOpacity}`;
	vars[`--${PREFIX}-glass-border-opacity`] = `${tokens.glass.borderOpacity}`;
	vars[`--${PREFIX}-glass-tint-r`] = `${tokens.glass.tint[0]}`;
	vars[`--${PREFIX}-glass-tint-g`] = `${tokens.glass.tint[1]}`;
	vars[`--${PREFIX}-glass-tint-b`] = `${tokens.glass.tint[2]}`;
	vars[`--${PREFIX}-glass-shadow`] = tokens.glass.shadow;
	vars[`--${PREFIX}-glass-radius`] = `${tokens.glass.radius}px`;

	// Typography
	vars[`--${PREFIX}-font-sans`] = tokens.typography.fontFamily.sans;
	vars[`--${PREFIX}-font-mono`] = tokens.typography.fontFamily.mono;
	for (const [key, val] of Object.entries(tokens.typography.fontSize)) {
		vars[`--${PREFIX}-text-${key}`] = val;
	}

	// Border radius
	for (const [key, val] of Object.entries(tokens.borderRadius)) {
		vars[`--${PREFIX}-radius-${key}`] = val;
	}

	// Shadows
	for (const [key, val] of Object.entries(tokens.shadows)) {
		vars[`--${PREFIX}-shadow-${key}`] = val;
	}

	return vars;
}

/** Convert tokens to an inline style string */
export function tokensToCSSString(tokens: DesignTokens): string {
	return Object.entries(tokensToCSS(tokens))
		.map(([prop, val]) => `${prop}: ${val}`)
		.join('; ');
}
