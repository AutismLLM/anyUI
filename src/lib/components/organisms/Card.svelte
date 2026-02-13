<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type CardVariant = 'elevated' | 'outlined' | 'glass';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		variant?: CardVariant;
		padding?: 'none' | 'sm' | 'md' | 'lg';
		children: Snippet;
		header?: Snippet;
		footer?: Snippet;
	}

	let {
		variant = 'glass',
		padding = 'md',
		children,
		header,
		footer,
		class: className = '',
		...restProps
	}: Props = $props();

	const paddingMap: Record<string, string> = {
		none: '0',
		sm: 'var(--any-card-padding-sm, 0.75rem)',
		md: 'var(--any-card-padding-md, 1.25rem)',
		lg: 'var(--any-card-padding-lg, 2rem)',
	};

	const variantMap: Record<CardVariant, string> = {
		elevated: 'anyui-card-elevated',
		outlined: 'anyui-card-outlined',
		glass: 'glass glass-card',
	};

	let pad = $derived(paddingMap[padding]);
</script>

<div
	class="anyui-card {variantMap[variant]} {className}"
	style="--card-pad: {pad};"
	{...restProps}
>
	{#if header}
		<div class="anyui-card-header">
			{@render header()}
		</div>
	{/if}

	<div class="anyui-card-body">
		{@render children()}
	</div>

	{#if footer}
		<div class="anyui-card-footer">
			{@render footer()}
		</div>
	{/if}
</div>

<style>
	.anyui-card {
		font-family: var(--any-font-sans, inherit);
		color: var(--any-color-fg, #0f172a);
		display: flex;
		flex-direction: column;
		gap: var(--any-card-gap, 0px);
	}

	.anyui-card-header {
		padding: var(--card-pad);
		padding-bottom: var(--any-card-header-pb, var(--card-pad));
		border-bottom: var(--any-card-divider-width, 1px) solid
			rgba(
				var(--any-glass-tint-r, 255),
				var(--any-glass-tint-g, 255),
				var(--any-glass-tint-b, 255),
				var(--any-card-divider-opacity, 0.12)
			);
	}

	.anyui-card-body {
		padding: var(--card-pad);
	}

	/* When header is present, reduce body top padding slightly to tighten spacing */
	.anyui-card-header + .anyui-card-body {
		padding-top: calc(var(--card-pad) * var(--any-card-header-body-ratio, 0.7));
	}

	.anyui-card-footer {
		padding: var(--card-pad);
		padding-top: var(--any-card-footer-pt, var(--card-pad));
		border-top: var(--any-card-divider-width, 1px) solid
			rgba(
				var(--any-glass-tint-r, 255),
				var(--any-glass-tint-g, 255),
				var(--any-glass-tint-b, 255),
				var(--any-card-divider-opacity, 0.12)
			);
		margin-top: auto;
	}

	/* ── Elevated ── */
	:global(.anyui-card-elevated) {
		background: var(--any-card-elevated-bg, var(--any-color-surface, #ffffff));
		border-radius: var(--any-card-radius, var(--any-radius-lg, 0.75rem));
		box-shadow: var(--any-card-shadow, var(--any-shadow-md, 0 4px 6px rgba(0, 0, 0, 0.07)));
		border: var(--any-card-border-width, 1px) solid
			rgba(
				var(--any-glass-tint-r, 255),
				var(--any-glass-tint-g, 255),
				var(--any-glass-tint-b, 255),
				var(--any-card-border-opacity, 0.12)
			);
	}

	/* ── Outlined ── */
	:global(.anyui-card-outlined) {
		background: var(--any-card-outlined-bg, transparent);
		border-radius: var(--any-card-radius, var(--any-radius-lg, 0.75rem));
		border: var(--any-card-border-width, 1px) solid
			rgba(
				var(--any-glass-tint-r, 255),
				var(--any-glass-tint-g, 255),
				var(--any-glass-tint-b, 255),
				var(--any-card-border-opacity, 0.2)
			);
	}
</style>
