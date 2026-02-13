<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { TenantConfigInput } from '../types/theme.js';
	import { resolveTenantConfig } from './merge.js';
	import { tokensToCSS } from './css-vars.js';
	import { setThemeContext } from './context.svelte.js';

	interface Props {
		tenant: TenantConfigInput;
		global?: boolean;
		children: Snippet;
	}

	let { tenant, global: applyGlobal = false, children }: Props = $props();

	let resolved = $derived(resolveTenantConfig(tenant));
	let cssVars = $derived(tokensToCSS(resolved.tokens));

	// Set up reactive context ref during init
	const themeRef = setThemeContext();

	// Keep context in sync reactively
	$effect(() => {
		themeRef.current = { config: resolved, cssVars };
	});

	// Build inline style string for the wrapper element
	let styleString = $derived(
		Object.entries(cssVars)
			.map(([prop, val]) => `${prop}: ${val}`)
			.join('; '),
	);

	// If global mode, apply CSS vars to :root
	$effect(() => {
		if (!applyGlobal || typeof document === 'undefined') return;

		const root = document.documentElement;
		const currentVars = cssVars;
		for (const [prop, val] of Object.entries(currentVars)) {
			root.style.setProperty(prop, val);
		}

		return () => {
			for (const prop of Object.keys(currentVars)) {
				root.style.removeProperty(prop);
			}
		};
	});
</script>

{#if applyGlobal}
	{@render children()}
{:else}
	<div class="anyui-theme-root" style={styleString} data-tenant={resolved.id}>
		{@render children()}
	</div>
{/if}

<style>
	.anyui-theme-root {
		display: contents;
	}
</style>
