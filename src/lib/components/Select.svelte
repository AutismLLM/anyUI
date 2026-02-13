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

	let open = $state(false);
	let focusedIndex = $state(-1);
	let triggerEl: HTMLButtonElement | undefined = $state();
	let listEl: HTMLDivElement | undefined = $state();
	let dropdownStyle = $state('');

	const fallbackId = `anyui-select-${crypto.randomUUID().slice(0, 8)}`;

	let selectedLabel = $derived(
		options.find((o) => o.value === value)?.label ?? ''
	);

	function positionDropdown() {
		if (!triggerEl) return;
		const rect = triggerEl.getBoundingClientRect();
		dropdownStyle = `top: ${rect.bottom + 4}px; left: ${rect.left}px; width: ${rect.width}px;`;
	}

	function toggle() {
		if (disabled) return;
		open = !open;
		if (open) {
			focusedIndex = options.findIndex((o) => o.value === value);
			if (focusedIndex === -1) focusedIndex = 0;
			positionDropdown();
		}
	}

	function select(opt: SelectOption) {
		value = opt.value;
		open = false;
		triggerEl?.focus();
	}

	function onkeydown(e: KeyboardEvent) {
		if (disabled) return;

		switch (e.key) {
			case 'Enter':
			case ' ':
				e.preventDefault();
				if (open && focusedIndex >= 0) {
					select(options[focusedIndex]);
				} else {
					toggle();
				}
				break;
			case 'ArrowDown':
				e.preventDefault();
				if (!open) { open = true; focusedIndex = 0; positionDropdown(); }
				else { focusedIndex = Math.min(focusedIndex + 1, options.length - 1); }
				break;
			case 'ArrowUp':
				e.preventDefault();
				if (open) { focusedIndex = Math.max(focusedIndex - 1, 0); }
				break;
			case 'Escape':
				e.preventDefault();
				open = false;
				triggerEl?.focus();
				break;
			case 'Tab':
				open = false;
				break;
		}
	}

	function onclickoutside(e: MouseEvent) {
		if (!triggerEl?.contains(e.target as Node) && !listEl?.contains(e.target as Node)) {
			open = false;
		}
	}

	$effect(() => {
		if (open) {
			document.addEventListener('click', onclickoutside, true);
			window.addEventListener('scroll', positionDropdown, true);
			window.addEventListener('resize', positionDropdown);
			return () => {
				document.removeEventListener('click', onclickoutside, true);
				window.removeEventListener('scroll', positionDropdown, true);
				window.removeEventListener('resize', positionDropdown);
			};
		}
	});

	// Scroll focused option into view
	$effect(() => {
		if (open && focusedIndex >= 0 && listEl) {
			const item = listEl.children[focusedIndex] as HTMLElement | undefined;
			item?.scrollIntoView({ block: 'nearest' });
		}
	});
</script>

<div class="anyui-select-wrapper {className}">
	{#if label}
		<span class="anyui-select-label" id="{fallbackId}-label">{label}</span>
	{/if}

	<button
		type="button"
		bind:this={triggerEl}
		class="anyui-select-trigger"
		class:anyui-select-glass={variant === 'glass'}
		class:anyui-select-open={open}
		aria-haspopup="listbox"
		aria-expanded={open}
		aria-labelledby={label ? `${fallbackId}-label` : undefined}
		{disabled}
		{onkeydown}
		onclick={toggle}
	>
		<span class="anyui-select-text" class:anyui-select-placeholder-text={!value}>
			{selectedLabel || placeholder}
		</span>
		<span class="anyui-select-chevron" class:anyui-select-chevron-open={open}>
			<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
				<path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</span>
	</button>
</div>

<!-- Portal: dropdown rendered at body level to escape overflow:hidden -->
{#if open}
	<div
		bind:this={listEl}
		class="anyui-select-dropdown"
		class:anyui-select-dropdown-glass={variant === 'glass'}
		role="listbox"
		aria-labelledby={label ? `${fallbackId}-label` : undefined}
		style="{dropdownStyle} position: fixed; z-index: 9999;"
	>
		{#each options as opt, i}
			<button
				type="button"
				class="anyui-select-option"
				class:anyui-select-option-selected={opt.value === value}
				class:anyui-select-option-focused={i === focusedIndex}
				role="option"
				aria-selected={opt.value === value}
				onclick={() => select(opt)}
				onmouseenter={() => (focusedIndex = i)}
			>
				{opt.label}
				{#if opt.value === value}
					<svg class="anyui-select-check" width="14" height="14" viewBox="0 0 14 14" fill="none">
						<path d="M3 7L6 10L11 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				{/if}
			</button>
		{/each}
	</div>
{/if}

<style>
	.anyui-select-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--any-select-label-gap, 0.375rem);
		width: 100%;
	}

	.anyui-select-label {
		font-size: var(--any-select-label-size, 0.875rem);
		font-weight: 500;
		color: var(--any-color-fg, #0f172a);
	}

	/* ── Trigger button ── */
	.anyui-select-trigger {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding: var(--any-select-padding, 0.5rem 0.75rem);
		border: 1px solid var(--any-color-border, #e2e8f0);
		border-radius: var(--any-select-radius, var(--any-radius-md, 0.5rem));
		background: var(--any-color-surface, #ffffff);
		color: var(--any-color-fg, #0f172a);
		font-family: var(--any-font-sans, inherit);
		font-size: var(--any-select-font-size, 0.875rem);
		text-align: left;
		outline: none;
		cursor: pointer;
		transition: border-color 150ms ease, box-shadow 150ms ease;
	}

	.anyui-select-trigger:focus-visible {
		border-color: var(--any-color-primary, #3b82f6);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
	}

	.anyui-select-trigger:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.anyui-select-glass {
		background: rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), 0.1);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border-color: rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), 0.2);
	}

	.anyui-select-open {
		border-color: var(--any-color-primary, #3b82f6);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
	}

	.anyui-select-text {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.anyui-select-placeholder-text {
		color: var(--any-color-muted, #64748b);
	}

	/* ── Chevron ── */
	.anyui-select-chevron {
		display: flex;
		align-items: center;
		color: var(--any-color-muted, #64748b);
		transition: transform 200ms ease;
		flex-shrink: 0;
	}

	.anyui-select-chevron-open {
		transform: rotate(180deg);
	}

	/* ── Dropdown (portal, fixed position) ── */
	.anyui-select-dropdown {
		max-height: var(--any-select-dropdown-max-h, 240px);
		overflow-y: auto;
		border-radius: var(--any-select-radius, var(--any-radius-md, 0.5rem));
		border: 1px solid var(--any-color-border, #e2e8f0);
		background: var(--any-color-surface, #ffffff);
		box-shadow: var(--any-shadow-lg, 0 10px 15px rgba(0, 0, 0, 0.1));
		padding: var(--any-select-dropdown-pad, 0.25rem);
		animation: anyui-select-appear 150ms ease;
	}

	.anyui-select-dropdown-glass {
		background: rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), var(--any-select-dropdown-opacity, 0.82));
		backdrop-filter: blur(var(--any-select-dropdown-blur, 24px)) saturate(1.4);
		-webkit-backdrop-filter: blur(var(--any-select-dropdown-blur, 24px)) saturate(1.4);
		border-color: rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), 0.25);
		box-shadow:
			0 10px 40px rgba(0, 0, 0, 0.18),
			inset 0 1px 0 rgba(255, 255, 255, 0.15);
	}

	@keyframes anyui-select-appear {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* ── Options ── */
	.anyui-select-option {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding: var(--any-select-option-padding, 0.5rem 0.625rem);
		border: none;
		border-radius: calc(var(--any-select-radius, var(--any-radius-md, 0.5rem)) - 2px);
		background: transparent;
		color: var(--any-color-fg, #0f172a);
		font-family: var(--any-font-sans, inherit);
		font-size: var(--any-select-font-size, 0.875rem);
		text-align: left;
		cursor: pointer;
		transition: background 100ms ease;
	}

	.anyui-select-option-focused {
		background: rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), 0.12);
	}

	.anyui-select-option-selected {
		color: var(--any-color-primary, #3b82f6);
		font-weight: 600;
	}

	.anyui-select-check {
		flex-shrink: 0;
		color: var(--any-color-primary, #3b82f6);
	}

	/* scrollbar */
	.anyui-select-dropdown::-webkit-scrollbar {
		width: 6px;
	}

	.anyui-select-dropdown::-webkit-scrollbar-track {
		background: transparent;
	}

	.anyui-select-dropdown::-webkit-scrollbar-thumb {
		background: rgba(var(--any-glass-tint-r, 255), var(--any-glass-tint-g, 255), var(--any-glass-tint-b, 255), 0.2);
		border-radius: 3px;
	}
</style>
