import { setContext, getContext } from 'svelte';
import type { TenantConfig } from '../types/theme.js';

const THEME_KEY = Symbol('anyui-theme');

export interface ThemeState {
	config: TenantConfig;
	cssVars: Record<string, string>;
}

export interface ThemeRef {
	current: ThemeState;
}

/** Call during component init. Returns the ref so the caller can update .current reactively. */
export function setThemeContext(): ThemeRef {
	const ref: ThemeRef = $state({ current: { config: null!, cssVars: {} } });
	setContext(THEME_KEY, ref);
	return ref;
}

/** Read theme context from a descendant component */
export function getThemeContext(): ThemeState {
	const ref = getContext<ThemeRef>(THEME_KEY);
	return ref.current;
}
