<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLInputAttributes, 'value'> {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		label?: string;
		showValue?: boolean;
		variant?: 'default' | 'glass';
	}

	let {
		value = $bindable(0),
		min = 0,
		max = 100,
		step = 1,
		label,
		showValue = true,
		variant = 'glass',
		class: className = '',
		...restProps
	}: Props = $props();

	let progress = $derived(((value - min) / (max - min)) * 100);
</script>

<div class="anyui-slider-wrapper {className}">
	{#if label || showValue}
		<div class="anyui-slider-header">
			{#if label}
				<span class="anyui-slider-label">{label}</span>
			{/if}
			{#if showValue}
				<span class="anyui-slider-value">{value}</span>
			{/if}
		</div>
	{/if}
	<div class="anyui-slider-track-outer" class:anyui-slider-glass={variant === 'glass'}>
		<div class="anyui-slider-track">
			<div class="anyui-slider-fill" style="width: {progress}%"></div>
		</div>
		<input
			type="range"
			bind:value
			{min}
			{max}
			{step}
			class="anyui-slider-input"
			{...restProps}
		/>
	</div>
</div>

<style>
	.anyui-slider-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--any-slider-label-gap, 0.375rem);
		width: 100%;
	}

	.anyui-slider-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: var(--any-slider-label-size, 0.875rem);
	}

	.anyui-slider-label {
		font-weight: 500;
		color: var(--any-color-fg, #0f172a);
	}

	.anyui-slider-value {
		font-family: var(--any-font-mono, monospace);
		font-size: 0.75rem;
		opacity: 0.7;
		background: rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), 0.1);
		padding: 0.1rem 0.425rem;
		border-radius: var(--any-radius-full, 9999px);
	}

	/* Outer container: holds track + input, provides padding for thumb overflow */
	.anyui-slider-track-outer {
		position: relative;
		height: var(--any-slider-height, 28px);
		display: flex;
		align-items: center;
	}

	.anyui-slider-glass {
		border-radius: var(--any-slider-track-radius, 3px);
	}

	/* Visual track bar */
	.anyui-slider-track {
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		height: var(--any-slider-track-height, 5px);
		border-radius: var(--any-slider-track-radius, 3px);
		background: rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), 0.12);
		overflow: hidden;
	}

	.anyui-slider-glass .anyui-slider-track {
		background: rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), 0.15);
	}

	.anyui-slider-fill {
		height: 100%;
		border-radius: var(--any-slider-track-radius, 3px);
		background: linear-gradient(90deg, var(--any-color-primary, #3b82f6), var(--any-color-primary-400, #60a5fa));
		transition: width 50ms ease;
	}

	/* Native range input sits on top for interaction */
	.anyui-slider-input {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
		cursor: pointer;
		margin: 0;
		padding: 0;
	}

	.anyui-slider-input::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: var(--any-slider-thumb-size, 16px);
		height: var(--any-slider-thumb-size, 16px);
		border-radius: 50%;
		background: var(--any-color-primary, #3b82f6);
		border: 2px solid rgba(255, 255, 255, 0.9);
		box-shadow:
			0 1px 4px rgba(0, 0, 0, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
		cursor: grab;
		transition: transform 150ms ease, box-shadow 150ms ease;
	}

	.anyui-slider-input::-webkit-slider-thumb:hover {
		transform: scale(1.15);
		box-shadow:
			0 2px 8px rgba(0, 0, 0, 0.25),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
	}

	.anyui-slider-input::-webkit-slider-thumb:active {
		cursor: grabbing;
		transform: scale(1.05);
	}

	.anyui-slider-input::-moz-range-thumb {
		width: var(--any-slider-thumb-size, 16px);
		height: var(--any-slider-thumb-size, 16px);
		border-radius: 50%;
		background: var(--any-color-primary, #3b82f6);
		border: 2px solid rgba(255, 255, 255, 0.9);
		box-shadow:
			0 1px 4px rgba(0, 0, 0, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
		cursor: grab;
		transition: transform 150ms ease;
	}

	.anyui-slider-input::-moz-range-thumb:hover {
		transform: scale(1.15);
	}

	.anyui-slider-input::-moz-range-track {
		background: transparent;
		border: none;
	}

	.anyui-slider-input:focus-visible {
		outline: none;
	}

	.anyui-slider-input:focus-visible::-webkit-slider-thumb {
		outline: 2px solid var(--any-color-primary, #3b82f6);
		outline-offset: 2px;
	}
</style>
