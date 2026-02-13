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
	let isDark = $derived(activeTenantIndex === 1);
</script>

<div
	class="anyui-app min-h-screen"
	class:anyui-dark={isDark}
>
	<nav class="anyui-nav flex items-center gap-4 p-4">
		<span class="text-sm font-bold opacity-60">anyUI</span>
		<div class="flex-1"></div>
		<span class="text-sm opacity-50">Tenant:</span>
		{#each tenants as t, i}
			<button
				class="anyui-nav-btn px-3 py-1.5 rounded-lg text-sm font-medium"
				class:active={i === activeTenantIndex}
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

<style>
	.anyui-app {
		font-family: var(--any-font-sans, Inter, system-ui, sans-serif);
		color: var(--any-color-fg, #0f172a);
		background:
			radial-gradient(ellipse at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
			radial-gradient(ellipse at 80% 20%, rgba(255, 119, 198, 0.25) 0%, transparent 50%),
			radial-gradient(ellipse at 40% 80%, rgba(99, 179, 237, 0.25) 0%, transparent 50%),
			radial-gradient(ellipse at 90% 80%, rgba(251, 191, 36, 0.15) 0%, transparent 40%),
			linear-gradient(135deg, #e0e7ff 0%, #fce7f3 25%, #e0f2fe 50%, #fef3c7 75%, #ede9fe 100%);
		min-height: 100vh;
	}

	.anyui-app.anyui-dark {
		background:
			radial-gradient(ellipse at 20% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
			radial-gradient(ellipse at 80% 20%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
			radial-gradient(ellipse at 40% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
			linear-gradient(135deg, #0f0f14 0%, #1a1025 25%, #0f172a 50%, #1a1025 75%, #0f0f14 100%);
		color: #e2e8f0;
	}

	.anyui-nav {
		border-bottom: 1px solid rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		background: rgba(255, 255, 255, 0.08);
	}

	.anyui-dark .anyui-nav {
		background: rgba(0, 0, 0, 0.2);
		border-bottom-color: rgba(255, 255, 255, 0.08);
	}

	.anyui-nav-btn {
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.15);
		color: inherit;
		cursor: pointer;
		transition: all 150ms ease;
	}

	.anyui-nav-btn:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.anyui-nav-btn.active {
		background: var(--any-color-primary, #3b82f6);
		border-color: transparent;
		color: white;
	}
</style>
