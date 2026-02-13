<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'solid' | 'outline' | 'ghost' | 'glass';
	type Size = 'sm' | 'md' | 'lg';

	interface Props extends HTMLButtonAttributes {
		variant?: Variant;
		size?: Size;
		children?: Snippet;
		icon?: Snippet;
	}

	let {
		variant = 'solid',
		size = 'md',
		disabled = false,
		children,
		icon,
		class: className = '',
		...restProps
	}: Props = $props();

	let iconOnly = $derived(icon && !children);

	const sizeClasses: Record<Size, string> = {
		sm: 'text-sm gap-1.5',
		md: 'text-base gap-2',
		lg: 'text-lg gap-2.5',
	};

	const variantClasses: Record<Variant, string> = {
		solid: 'btn-solid',
		outline: 'btn-outline',
		ghost: 'btn-ghost',
		glass: 'btn-glass',
	};
</script>

<button
	class="anyui-btn {sizeClasses[size]} {variantClasses[variant]} {className}"
	class:anyui-btn-icon-only={iconOnly}
	class:anyui-btn-sm={size === 'sm'}
	class:anyui-btn-md={size === 'md'}
	class:anyui-btn-lg={size === 'lg'}
	{disabled}
	{...restProps}
>
	{#if icon}
		<span class="anyui-btn-icon inline-flex items-center shrink-0">
			{@render icon()}
		</span>
	{/if}
	{#if children}
		<span class="anyui-btn-label">
			{@render children()}
		</span>
	{/if}
</button>

<style>
	.anyui-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		border-radius: var(--any-radius-md, 0.5rem);
		transition: all 180ms ease;
		cursor: pointer;
		outline: none;
		font-family: var(--any-font-sans, inherit);
		line-height: 1;
		position: relative;
	}

	.anyui-btn-sm { padding: 0.5rem 0.875rem; }
	.anyui-btn-md { padding: 0.625rem 1.25rem; }
	.anyui-btn-lg { padding: 0.75rem 1.75rem; }

	.anyui-btn-icon-only.anyui-btn-sm { padding: 0.5rem; }
	.anyui-btn-icon-only.anyui-btn-md { padding: 0.625rem; }
	.anyui-btn-icon-only.anyui-btn-lg { padding: 0.75rem; }

	.anyui-btn:focus-visible {
		outline: 2px solid var(--any-color-primary, #3b82f6);
		outline-offset: 2px;
	}

	.anyui-btn:active:not(:disabled) {
		transform: scale(0.97);
	}

	.anyui-btn:disabled {
		opacity: 0.45;
		cursor: not-allowed;
		pointer-events: none;
	}

	/* ── Solid ── */
	:global(.btn-solid) {
		background: linear-gradient(135deg, var(--any-color-primary, #3b82f6), var(--any-color-primary-600, #2563eb));
		color: white;
		border: 1px solid transparent;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15);
	}
	:global(.btn-solid:hover:not(:disabled)) {
		filter: brightness(1.1);
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15);
	}

	/* ── Outline ── */
	:global(.btn-outline) {
		background: transparent;
		color: var(--any-color-primary, #3b82f6);
		border: 1.5px solid var(--any-color-primary, #3b82f6);
	}
	:global(.btn-outline:hover:not(:disabled)) {
		background: var(--any-color-primary, #3b82f6);
		color: white;
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
	}

	/* ── Ghost ── */
	:global(.btn-ghost) {
		background: transparent;
		color: var(--any-color-fg, #0f172a);
		border: 1px solid transparent;
	}
	:global(.btn-ghost:hover:not(:disabled)) {
		background: rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), 0.1);
	}

	/* ── Glass ── */
	:global(.btn-glass) {
		background: rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), 0.12);
		color: var(--any-color-fg, #0f172a);
		border: 1px solid rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), 0.25);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 2px 8px rgba(0, 0, 0, 0.08);
	}
	:global(.btn-glass:hover:not(:disabled)) {
		background: rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), 0.2);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 4px 16px rgba(0, 0, 0, 0.12);
	}
</style>
