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
		none: '',
		sm: 'p-3',
		md: 'p-5',
		lg: 'p-8',
	};

	const variantMap: Record<CardVariant, string> = {
		elevated: 'anyui-card-elevated',
		outlined: 'anyui-card-outlined',
		glass: 'glass glass-card',
	};
</script>

<div class="anyui-card {variantMap[variant]} {className}" {...restProps}>
	{#if header}
		<div class="anyui-card-header {paddingMap[padding]}">
			{@render header()}
		</div>
	{/if}

	<div class="anyui-card-body {paddingMap[padding]}">
		{@render children()}
	</div>

	{#if footer}
		<div class="anyui-card-footer {paddingMap[padding]}">
			{@render footer()}
		</div>
	{/if}
</div>

<style>
	.anyui-card {
		overflow: hidden;
		font-family: var(--any-font-sans, inherit);
		color: var(--any-color-fg, #0f172a);
		display: flex;
		flex-direction: column;
	}

	.anyui-card-header {
		border-bottom: 1px solid rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), 0.12);
	}

	.anyui-card-header + .anyui-card-body {
		padding-top: 0;
	}

	.anyui-card-footer {
		border-top: 1px solid rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), 0.12);
		margin-top: auto;
	}

	:global(.anyui-card-elevated) {
		background: var(--any-color-surface, #ffffff);
		border-radius: var(--any-radius-lg, 0.75rem);
		box-shadow: var(--any-shadow-md, 0 4px 6px rgba(0, 0, 0, 0.07));
		border: 1px solid rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), 0.12);
	}

	:global(.anyui-card-outlined) {
		background: transparent;
		border-radius: var(--any-radius-lg, 0.75rem);
		border: 1px solid rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), 0.2);
	}
</style>
