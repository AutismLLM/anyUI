<script lang="ts">
	interface Props {
		checked?: boolean;
		label?: string;
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		class?: string;
	}

	let {
		checked = $bindable(false),
		label,
		size = 'md',
		disabled = false,
		class: className = '',
	}: Props = $props();

	const sizes = {
		sm: { track: 'width: 32px; height: 18px;', thumb: 'width: 14px; height: 14px;', translate: 'translateX(14px)' },
		md: { track: 'width: 44px; height: 24px;', thumb: 'width: 20px; height: 20px;', translate: 'translateX(20px)' },
		lg: { track: 'width: 56px; height: 30px;', thumb: 'width: 26px; height: 26px;', translate: 'translateX(26px)' },
	};

	function toggle() {
		if (!disabled) checked = !checked;
	}

	function onkeydown(e: KeyboardEvent) {
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault();
			toggle();
		}
	}
</script>

<div class="anyui-toggle-wrapper {className}">
	<button
		type="button"
		role="switch"
		aria-checked={checked}
		aria-label={label}
		{disabled}
		class="anyui-toggle-track"
		class:anyui-toggle-checked={checked}
		class:anyui-toggle-disabled={disabled}
		style={sizes[size].track}
		onclick={toggle}
		{onkeydown}
	>
		<span
			class="anyui-toggle-thumb"
			style="{sizes[size].thumb} {checked ? `transform: ${sizes[size].translate};` : 'transform: translateX(0);'}"
		></span>
	</button>
	{#if label}
		<span class="anyui-toggle-label" class:anyui-toggle-label-disabled={disabled}>{label}</span>
	{/if}
</div>

<style>
	.anyui-toggle-wrapper {
		display: inline-flex;
		align-items: center;
		gap: 0.625rem;
	}

	.anyui-toggle-track {
		position: relative;
		border-radius: var(--any-radius-full, 9999px);
		background: rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), 0.12);
		border: 1px solid rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), 0.2);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		cursor: pointer;
		padding: 0;
		transition: all 200ms ease;
		flex-shrink: 0;
	}

	.anyui-toggle-track:focus-visible {
		outline: 2px solid var(--any-color-primary, #3b82f6);
		outline-offset: 2px;
	}

	.anyui-toggle-checked {
		background: var(--any-color-primary, #3b82f6);
		border-color: var(--any-color-primary, #3b82f6);
	}

	.anyui-toggle-disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.anyui-toggle-thumb {
		display: block;
		border-radius: 50%;
		background: white;
		box-shadow:
			0 1px 3px rgba(0, 0, 0, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.5);
		transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
		margin: 1px;
	}

	.anyui-toggle-label {
		font-size: 0.875rem;
		color: var(--any-color-fg, #0f172a);
		user-select: none;
	}

	.anyui-toggle-label-disabled {
		opacity: 0.4;
	}
</style>
