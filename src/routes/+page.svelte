<script lang="ts">
	import { Button, Card, Input } from '$lib/index.js';

	let name = $state('');

	// Live glass configurator state
	let blur = $state(24);
	let bgOpacity = $state(20);
	let borderOpacity = $state(30);
	let radius = $state(20);
	let edgeOpacity = $state(80);
	let glassEnabled = $state(true);
	let tintR = $state(255);
	let tintG = $state(255);
	let tintB = $state(255);

	// Font configurator state
	const fontPresets = [
		{ name: 'Inter', family: 'Inter, system-ui, sans-serif', url: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' },
		{ name: 'Space Grotesk', family: 'Space Grotesk, system-ui, sans-serif', url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap' },
		{ name: 'Outfit', family: 'Outfit, system-ui, sans-serif', url: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap' },
		{ name: 'DM Sans', family: 'DM Sans, system-ui, sans-serif', url: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap' },
		{ name: 'Sora', family: 'Sora, system-ui, sans-serif', url: 'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap' },
		{ name: 'Plus Jakarta Sans', family: 'Plus Jakarta Sans, system-ui, sans-serif', url: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap' },
	];
	let selectedFontIndex = $state(0);
	let selectedFont = $derived(fontPresets[selectedFontIndex]);

	// Load font dynamically
	$effect(() => {
		if (typeof document === 'undefined') return;
		const url = selectedFont.url;
		if (document.querySelector(`link[href="${url}"]`)) return;
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = url;
		document.head.appendChild(link);
	});

	let liveStyle = $derived(
		glassEnabled
			? `--glass-blur: ${blur}px; --glass-bg-opacity: ${bgOpacity / 100}; --glass-border-opacity: ${borderOpacity / 100}; --glass-radius: ${radius}px; --glass-edge-opacity: ${edgeOpacity / 100}; --glass-tint-r: ${tintR}; --glass-tint-g: ${tintG}; --glass-tint-b: ${tintB}; --glass-shadow: 0 8px 32px rgba(0,0,0,0.12); --glass-inset-shadow: inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(255,255,255,0.1), inset 0 0 16px 8px rgba(255,255,255,${(bgOpacity / 100) * 0.3});`
			: '',
	);

	let fontStyle = $derived(`font-family: ${selectedFont.family};`);

	function resetDefaults() {
		blur = 24;
		bgOpacity = 20;
		borderOpacity = 30;
		radius = 20;
		edgeOpacity = 80;
		tintR = 255;
		tintG = 255;
		tintB = 255;
		glassEnabled = true;
		selectedFontIndex = 0;
	}
</script>

<h1 class="text-3xl font-bold mb-2">anyUI</h1>
<p class="text-lg opacity-60 mb-10">Glassmorphism-first component library for Svelte 5</p>

<!-- ─── LIVE GLASS CONFIGURATOR ─── -->
<section class="mb-16">
	<h2 class="text-2xl font-bold mb-6">Live Glass Configurator</h2>

	<div class="config-layout">
		<!-- Controls Panel -->
		<div class="glass glass-card config-panel">
			<h3 class="text-lg font-semibold mb-4">Glass Parameters</h3>

			<div class="config-grid">
				<label class="config-label">
					<span>Blur: {blur}px</span>
					<input type="range" min="0" max="50" bind:value={blur} class="config-slider" />
				</label>

				<label class="config-label">
					<span>BG Opacity: {bgOpacity}%</span>
					<input type="range" min="0" max="100" bind:value={bgOpacity} class="config-slider" />
				</label>

				<label class="config-label">
					<span>Border Opacity: {borderOpacity}%</span>
					<input type="range" min="0" max="100" bind:value={borderOpacity} class="config-slider" />
				</label>

				<label class="config-label">
					<span>Radius: {radius}px</span>
					<input type="range" min="0" max="40" bind:value={radius} class="config-slider" />
				</label>

				<label class="config-label">
					<span>Edge Glow: {edgeOpacity}%</span>
					<input type="range" min="0" max="100" bind:value={edgeOpacity} class="config-slider" />
				</label>

				<div class="config-label">
					<span>Tint RGB</span>
					<div class="flex gap-2">
						<input type="number" min="0" max="255" bind:value={tintR} class="config-number" />
						<input type="number" min="0" max="255" bind:value={tintG} class="config-number" />
						<input type="number" min="0" max="255" bind:value={tintB} class="config-number" />
					</div>
				</div>

				<label class="config-label checkbox-row">
					<input type="checkbox" bind:checked={glassEnabled} />
					<span>Glass Enabled</span>
				</label>

				<div class="config-label">
					<span>Font: {selectedFont.name}</span>
					<select class="config-select" bind:value={selectedFontIndex}>
						{#each fontPresets as preset, i}
							<option value={i}>{preset.name}</option>
						{/each}
					</select>
				</div>
			</div>

			<button class="config-reset" onclick={resetDefaults}>Reset Defaults</button>

			<div class="config-code">
				<code class="text-xs">
					glass-blur-{blur} glass-opacity-{bgOpacity} glass-radius-{radius}
				</code>
				<code class="text-xs config-code-font">
					font: {selectedFont.name}
				</code>
			</div>
		</div>

		<!-- Live Preview -->
		<div class="config-preview" style={fontStyle}>
			<div
				class="glass preview-card"
				class:glass-disabled={!glassEnabled}
				style={liveStyle}
			>
				<h3 class="text-xl font-bold mb-2">Live Preview</h3>
				<p class="text-sm opacity-70 mb-4">
					Adjust the sliders to see how glass parameters affect the look. All values are configurable per-tenant.
				</p>
				<p class="text-sm opacity-50 mb-4">
					The quick brown fox jumps over the lazy dog. 0123456789
				</p>
				<div class="flex gap-2">
					<Button variant="glass">Glass Button</Button>
					<Button variant="solid" size="sm">Solid</Button>
				</div>
			</div>

			<div class="flex gap-4 mt-4">
				<div class="glass glass-subtle preview-mini" style={liveStyle}>
					<span class="text-sm font-medium">Subtle</span>
				</div>
				<div class="glass glass-card preview-mini" style={liveStyle}>
					<span class="text-sm font-medium">Card</span>
				</div>
				<div class="glass glass-modal preview-mini" style={liveStyle}>
					<span class="text-sm font-medium">Modal</span>
				</div>
				<div class="glass glass-heavy preview-mini" style={liveStyle}>
					<span class="text-sm font-medium">Heavy</span>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ─── FONT PREVIEW ─── -->
<section class="mb-16">
	<h2 class="text-2xl font-bold mb-6">Font Preview</h2>
	<div class="font-grid">
		{#each fontPresets as preset, i}
			<button
				class="glass glass-subtle font-preview-card"
				class:font-active={i === selectedFontIndex}
				style="font-family: {preset.family};"
				onclick={() => (selectedFontIndex = i)}
			>
				<span class="text-lg font-semibold">{preset.name}</span>
				<span class="text-sm opacity-60">Aa Bb Cc 0123</span>
				<span class="text-xs opacity-40">The quick brown fox jumps over the lazy dog</span>
			</button>
		{/each}
	</div>
	<p class="text-sm opacity-50 mt-4">
		Fonts are loaded from Google Fonts. Each tenant can specify different fontFamily and fontUrls in their config.
		Switch to "Dark SaaS" tenant above to see Space Grotesk in action.
	</p>
</section>

<!-- ─── COMPONENTS ─── -->
<section class="mb-12">
	<h2 class="text-2xl font-bold mb-6">Components</h2>

	<div class="flex flex-col gap-10 max-w-4xl">
		<!-- Buttons -->
		<div>
			<h3 class="text-lg font-semibold mb-4">Buttons</h3>
			<div class="flex gap-4 flex-wrap items-center">
				<Button variant="solid">Solid</Button>
				<Button variant="outline">Outline</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="glass">Glass</Button>
				<Button variant="solid" size="sm">Small</Button>
				<Button variant="solid" size="lg">Large</Button>
				<Button variant="solid" disabled>Disabled</Button>
			</div>
		</div>

		<!-- Cards -->
		<div>
			<h3 class="text-lg font-semibold mb-4">Cards</h3>
			<div class="card-grid">
				<Card variant="glass">
					{#snippet header()}
						<h4 class="text-base font-semibold">Glass Card</h4>
					{/snippet}
					<p class="text-sm opacity-70">Real glassmorphism with inset shadows, light-edge gradients, and configurable backdrop blur.</p>
				</Card>

				<Card variant="glass" padding="lg">
					{#snippet header()}
						<h4 class="text-base font-semibold">Glass Large</h4>
					{/snippet}
					<p class="text-sm opacity-70">Same glass effect with large padding. All values inherit from the tenant config.</p>
				</Card>

				<Card variant="elevated">
					{#snippet header()}
						<h4 class="text-base font-semibold">Elevated Card</h4>
					{/snippet}
					<p class="text-sm opacity-70">Traditional card with shadow and border. Non-glass variant for when you need solid backgrounds.</p>
				</Card>

				<Card variant="outlined" padding="lg">
					<p class="text-sm opacity-70">Outlined card — transparent with a border. Minimal footprint.</p>
				</Card>
			</div>
		</div>

		<!-- Inputs -->
		<div>
			<h3 class="text-lg font-semibold mb-4">Inputs</h3>
			<div class="flex flex-col gap-4 max-w-sm">
				<Input label="Your name" bind:value={name} placeholder="Type here..." variant="glass" />
				<Input label="Default input" placeholder="Solid background..." />
				<Input label="With error" variant="glass" error="This field is required" />
				{#if name}
					<p class="text-sm opacity-60">Hello, {name}!</p>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.config-layout {
		display: grid;
		grid-template-columns: 360px 1fr;
		gap: 2rem;
		align-items: start;
	}

	@media (max-width: 900px) {
		.config-layout {
			grid-template-columns: 1fr;
		}
	}

	.config-panel {
		padding: 1.5rem;
	}

	.config-grid {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.config-label {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		font-size: 0.875rem;
	}

	.config-label.checkbox-row {
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
	}

	.config-slider {
		width: 100%;
		accent-color: var(--any-color-primary, #3b82f6);
		height: 6px;
		cursor: pointer;
	}

	.config-number {
		width: 60px;
		padding: 0.25rem 0.5rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.08);
		color: inherit;
		font-size: 0.8rem;
		text-align: center;
	}

	.config-select {
		width: 100%;
		padding: 0.375rem 0.5rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.08);
		color: inherit;
		font-size: 0.8rem;
		cursor: pointer;
	}

	.config-select option {
		background: #1a1a2e;
		color: #e2e8f0;
	}

	.config-reset {
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.06);
		color: inherit;
		font-size: 0.8rem;
		cursor: pointer;
		transition: background 150ms;
	}

	.config-reset:hover {
		background: rgba(255, 255, 255, 0.12);
	}

	.config-code {
		margin-top: 1rem;
		padding: 0.75rem;
		border-radius: 8px;
		background: rgba(0, 0, 0, 0.15);
		font-family: var(--any-font-mono, monospace);
		word-break: break-all;
	}

	.config-code-font {
		display: block;
		margin-top: 0.25rem;
		opacity: 0.6;
	}

	.preview-card {
		padding: 2rem;
		min-height: 200px;
	}

	.preview-mini {
		flex: 1;
		padding: 1.25rem;
		text-align: center;
		min-height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.font-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
	}

	.font-preview-card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1.25rem;
		cursor: pointer;
		text-align: left;
		color: inherit;
		transition: all 150ms ease;
	}

	.font-preview-card:hover {
		--glass-bg-opacity: 0.15;
	}

	.font-preview-card.font-active {
		--glass-border-opacity: 0.5;
		--glass-bg-opacity: 0.2;
		outline: 2px solid var(--any-color-primary, #3b82f6);
		outline-offset: -2px;
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
	}
</style>
