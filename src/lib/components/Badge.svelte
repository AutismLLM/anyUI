<script lang="ts">
	import type { Snippet } from 'svelte';

	type BadgeVariant = 'solid' | 'outline' | 'glass' | 'subtle';
	type BadgeColor = 'primary' | 'accent' | 'success' | 'warning' | 'error';
	type BadgeSize = 'sm' | 'md';

	interface Props {
		variant?: BadgeVariant;
		color?: BadgeColor;
		size?: BadgeSize;
		children: Snippet;
		class?: string;
	}

	let {
		variant = 'solid',
		color = 'primary',
		size = 'sm',
		children,
		class: className = '',
	}: Props = $props();

	const colorMap: Record<BadgeColor, { bg: string; fg: string; border: string }> = {
		primary: { bg: 'var(--any-color-primary, #3b82f6)', fg: '#ffffff', border: 'var(--any-color-primary, #3b82f6)' },
		accent: { bg: 'var(--any-color-accent, #d946ef)', fg: '#ffffff', border: 'var(--any-color-accent, #d946ef)' },
		success: { bg: '#22c55e', fg: '#ffffff', border: '#22c55e' },
		warning: { bg: '#f59e0b', fg: '#000000', border: '#f59e0b' },
		error: { bg: '#ef4444', fg: '#ffffff', border: '#ef4444' },
	};

	let colors = $derived(colorMap[color]);
</script>

<span
	class="anyui-badge anyui-badge-{variant} anyui-badge-{size} {className}"
	style="--badge-bg: {colors.bg}; --badge-fg: {colors.fg}; --badge-border: {colors.border};"
>
	{@render children()}
</span>

<style>
	.anyui-badge {
		display: inline-flex;
		align-items: center;
		font-weight: 600;
		border-radius: var(--any-radius-full, 9999px);
		font-family: var(--any-font-sans, inherit);
		white-space: nowrap;
		line-height: 1;
	}

	.anyui-badge-sm {
		padding: 0.2rem 0.575rem;
		font-size: 0.7rem;
	}

	.anyui-badge-md {
		padding: 0.3rem 0.75rem;
		font-size: 0.8rem;
	}

	.anyui-badge-solid {
		background: var(--badge-bg);
		color: var(--badge-fg);
	}

	.anyui-badge-outline {
		background: transparent;
		color: var(--badge-bg);
		border: 1px solid var(--badge-border);
	}

	.anyui-badge-subtle {
		background: color-mix(in srgb, var(--badge-bg) 15%, transparent);
		color: var(--badge-bg);
	}

	.anyui-badge-glass {
		background: rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), 0.12);
		color: var(--badge-bg);
		border: 1px solid rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), 0.2);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}
</style>
