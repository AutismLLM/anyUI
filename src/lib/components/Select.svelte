<script lang="ts">
	interface SelectOption {
		label: string;
		value: string;
	}

	interface Props {
		value?: string;
		options: SelectOption[];
		label?: string;
		placeholder?: string;
		variant?: 'default' | 'glass';
		disabled?: boolean;
		class?: string;
	}

	let {
		value = $bindable(''),
		options,
		label,
		placeholder = 'Select...',
		variant = 'glass',
		disabled = false,
		class: className = '',
	}: Props = $props();

	const fallbackId = `anyui-select-${crypto.randomUUID().slice(0, 8)}`;
</script>

<div class="anyui-select-wrapper {className}">
	{#if label}
		<label for={fallbackId} class="anyui-select-label">{label}</label>
	{/if}
	<div class="anyui-select-container" class:anyui-select-glass={variant === 'glass'}>
		<select
			id={fallbackId}
			bind:value
			{disabled}
			class="anyui-select"
			class:anyui-select-placeholder={!value}
		>
			{#if placeholder}
				<option value="" disabled>{placeholder}</option>
			{/if}
			{#each options as opt}
				<option value={opt.value}>{opt.label}</option>
			{/each}
		</select>
		<span class="anyui-select-chevron">
			<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
				<path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</span>
	</div>
</div>

<style>
	.anyui-select-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		width: 100%;
	}

	.anyui-select-label {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--any-color-fg, #0f172a);
	}

	.anyui-select-container {
		position: relative;
		display: flex;
		align-items: center;
	}

	.anyui-select {
		width: 100%;
		padding: 0.5rem 2rem 0.5rem 0.75rem;
		border: 1px solid var(--any-color-border, #e2e8f0);
		border-radius: var(--any-radius-md, 0.5rem);
		background: var(--any-color-surface, #ffffff);
		color: var(--any-color-fg, #0f172a);
		font-family: var(--any-font-sans, inherit);
		font-size: 0.875rem;
		outline: none;
		cursor: pointer;
		-webkit-appearance: none;
		appearance: none;
		transition: border-color 150ms ease, box-shadow 150ms ease;
	}

	.anyui-select:focus {
		border-color: var(--any-color-primary, #3b82f6);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
	}

	.anyui-select:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.anyui-select-placeholder {
		color: var(--any-color-muted, #64748b);
	}

	.anyui-select-glass .anyui-select {
		background: rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), 0.1);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border-color: rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), 0.2);
	}

	.anyui-select option {
		background: var(--any-color-surface, #1a1a2e);
		color: var(--any-color-fg, #e2e8f0);
	}

	.anyui-select-chevron {
		position: absolute;
		right: 0.75rem;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
		color: var(--any-color-muted, #64748b);
		display: flex;
		align-items: center;
	}
</style>
