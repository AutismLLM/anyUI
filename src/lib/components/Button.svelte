<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'solid' | 'outline' | 'ghost' | 'glass';
	type Size = 'sm' | 'md' | 'lg';

	interface Props extends HTMLButtonAttributes {
		variant?: Variant;
		size?: Size;
		children: Snippet;
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

	const sizeClasses: Record<Size, string> = {
		sm: 'px-3 py-1.5 text-sm gap-1.5',
		md: 'px-4 py-2 text-base gap-2',
		lg: 'px-6 py-3 text-lg gap-2.5',
	};

	const variantClasses: Record<Variant, string> = {
		solid: 'btn-solid',
		outline: 'btn-outline',
		ghost: 'btn-ghost',
		glass: 'glass glass-subtle',
	};
</script>

<button
	class="anyui-btn inline-flex items-center justify-center font-semibold {sizeClasses[size]} {variantClasses[variant]} {className}"
	{disabled}
	{...restProps}
>
	{#if icon}
		<span class="anyui-btn-icon inline-flex items-center shrink-0">
			{@render icon()}
		</span>
	{/if}
	<span class="anyui-btn-label">
		{@render children()}
	</span>
</button>

<style>
	.anyui-btn {
		border-radius: var(--any-radius-md, 0.5rem);
		transition: all 150ms ease;
		cursor: pointer;
		outline: none;
		font-family: var(--any-font-sans, inherit);
		line-height: 1;
	}

	.anyui-btn:focus-visible {
		outline: 2px solid var(--any-color-primary, #3b82f6);
		outline-offset: 2px;
	}

	.anyui-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	:global(.btn-solid) {
		background: var(--any-color-primary, #3b82f6);
		color: white;
		border: 1px solid transparent;
	}
	:global(.btn-solid:hover:not(:disabled)) {
		background: var(--any-color-primary-600, #2563eb);
	}

	:global(.btn-outline) {
		background: transparent;
		color: var(--any-color-primary, #3b82f6);
		border: 1px solid var(--any-color-primary, #3b82f6);
	}
	:global(.btn-outline:hover:not(:disabled)) {
		background: var(--any-color-primary, #3b82f6);
		color: white;
	}

	:global(.btn-ghost) {
		background: transparent;
		color: var(--any-color-fg, #0f172a);
		border: 1px solid transparent;
	}
	:global(.btn-ghost:hover:not(:disabled)) {
		background: var(--any-color-primary-50, #eff6ff);
	}
</style>
