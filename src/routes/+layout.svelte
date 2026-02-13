<script lang="ts">
	import { ThemeProvider } from '$lib/theme/index.js';
	import { defaultTenant } from '$lib/theme/tenants/default.js';
	import { darkSaasTenant } from '$lib/theme/tenants/dark-saas.js';
	import type { TenantConfigInput } from '$lib/types/theme.js';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	const tenants: TenantConfigInput[] = [defaultTenant, darkSaasTenant];
	let activeTenantIndex = $state(0);
	let activeTenant = $derived(tenants[activeTenantIndex]);
</script>

<div
	class="min-h-screen"
	style="background: var(--any-color-bg, #ffffff); color: var(--any-color-fg, #0f172a); font-family: var(--any-font-sans, system-ui)"
>
	<nav class="flex items-center gap-4 p-4" style="border-bottom: 1px solid var(--any-color-border, #e2e8f0)">
		<span class="text-sm font-bold" style="color: var(--any-color-muted, #64748b)">Tenant:</span>
		{#each tenants as t, i}
			<button
				class="px-3 py-1 rounded text-sm"
				style="
					background: {i === activeTenantIndex ? 'var(--any-color-primary, #3b82f6)' : 'transparent'};
					color: {i === activeTenantIndex ? 'white' : 'var(--any-color-fg, #0f172a)'};
					border: 1px solid {i === activeTenantIndex ? 'transparent' : 'var(--any-color-border, #e2e8f0)'};
				"
				onclick={() => (activeTenantIndex = i)}
			>
				{t.name ?? t.id}
			</button>
		{/each}
	</nav>

	<ThemeProvider tenant={activeTenant} global>
		<main class="p-8">
			{@render children()}
		</main>
	</ThemeProvider>
</div>
