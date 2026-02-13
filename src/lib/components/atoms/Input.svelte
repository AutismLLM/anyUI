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

<div class="anyui-input-wrapper {className}">
	{#if label}
		<label for={inputId} class="anyui-input-label">
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
		<p class="anyui-input-error-text">
			{error}
		</p>
	{/if}
</div>

<style>
	.anyui-input-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--any-input-label-gap, 0.375rem);
	}

	.anyui-input-label {
		font-size: var(--any-input-label-size, 0.875rem);
		font-weight: 500;
		color: var(--any-color-fg, #0f172a);
	}

	.anyui-input {
		padding: var(--any-input-padding, 0.5rem 0.75rem);
		border: var(--any-input-border-width, 1px) solid var(--any-color-border, #e2e8f0);
		border-radius: var(--any-input-radius, var(--any-radius-md, 0.5rem));
		background: var(--any-input-bg, var(--any-color-surface, #ffffff));
		color: var(--any-color-fg, #0f172a);
		font-family: var(--any-font-sans, inherit);
		font-size: var(--any-input-font-size, 0.875rem);
		outline: none;
		transition:
			border-color 150ms ease,
			box-shadow 150ms ease;
		width: 100%;
	}

	.anyui-input::placeholder {
		color: var(--any-color-muted, #64748b);
	}

	.anyui-input:focus {
		border-color: var(--any-input-focus-color, var(--any-color-primary, #3b82f6));
		box-shadow: 0 0 0 var(--any-input-focus-ring-width, 3px) var(--any-input-focus-ring-color, rgba(59, 130, 246, 0.15));
	}

	.anyui-input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.anyui-input-glass {
		background: rgba(
			var(--any-glass-tint-r, 255),
			var(--any-glass-tint-g, 255),
			var(--any-glass-tint-b, 255),
			var(--any-input-glass-opacity, 0.1)
		);
		backdrop-filter: blur(var(--any-input-glass-blur, 8px));
		-webkit-backdrop-filter: blur(var(--any-input-glass-blur, 8px));
		border-color: rgba(
			var(--any-glass-tint-r, 255),
			var(--any-glass-tint-g, 255),
			var(--any-glass-tint-b, 255),
			0.2
		);
	}

	.anyui-input-error {
		border-color: var(--any-input-error-color, #ef4444);
	}

	.anyui-input-error:focus {
		border-color: var(--any-input-error-color, #ef4444);
		box-shadow: 0 0 0 var(--any-input-focus-ring-width, 3px) rgba(239, 68, 68, 0.15);
	}

	.anyui-input-error-text {
		font-size: var(--any-input-error-size, 0.8rem);
		color: var(--any-input-error-color, #ef4444);
		margin: 0;
	}
</style>
