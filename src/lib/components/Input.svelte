<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		value?: string;
		label?: string;
		error?: string;
		variant?: 'default' | 'glass';
	}

	let {
		value = $bindable(''),
		label,
		error,
		variant = 'default',
		id,
		class: className = '',
		...restProps
	}: Props = $props();

	const fallbackId = `anyui-input-${crypto.randomUUID().slice(0, 8)}`;
	let inputId = $derived(id ?? fallbackId);
</script>

<div class="anyui-input-wrapper flex flex-col gap-1.5 {className}">
	{#if label}
		<label for={inputId} class="text-sm font-medium" style="color: var(--any-color-fg, #0f172a)">
			{label}
		</label>
	{/if}

	<input
		id={inputId}
		bind:value
		class="anyui-input"
		class:anyui-input-glass={variant === 'glass'}
		class:anyui-input-error={!!error}
		{...restProps}
	/>

	{#if error}
		<p class="text-sm" style="color: #ef4444">
			{error}
		</p>
	{/if}
</div>

<style>
	.anyui-input {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--any-color-border, #e2e8f0);
		border-radius: var(--any-radius-md, 0.5rem);
		background: var(--any-color-surface, #ffffff);
		color: var(--any-color-fg, #0f172a);
		font-family: var(--any-font-sans, inherit);
		font-size: var(--any-text-base, 1rem);
		outline: none;
		transition:
			border-color 150ms ease,
			box-shadow 150ms ease;
		width: 100%;
	}

	.anyui-input:focus {
		border-color: var(--any-color-primary, #3b82f6);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
	}

	.anyui-input-glass {
		background: rgba(
			var(--any-glass-tint-r, 255),
			var(--any-glass-tint-g, 255),
			var(--any-glass-tint-b, 255),
			var(--any-glass-bg-opacity, 0.12)
		);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}

	.anyui-input-error {
		border-color: #ef4444;
	}
</style>
