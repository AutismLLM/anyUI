<script lang="ts">
	import { Button, Card, Input, Slider, Toggle, Select, Badge } from '$lib/index.js';

	let name = $state('');

	// ─── Live Glass Configurator State ───
	let blur = $state(24);
	let bgOpacity = $state(20);
	let borderOpacity = $state(30);
	let radius = $state(20);
	let edgeOpacity = $state(80);
	let glassEnabled = $state(true);
	let tintR = $state(255);
	let tintG = $state(255);
	let tintB = $state(255);

	// ─── Font Configurator State ───
	const fontPresets = [
		{ name: 'Inter', family: 'Inter, system-ui, sans-serif' },
		{ name: 'Space Grotesk', family: 'Space Grotesk, system-ui, sans-serif' },
		{ name: 'Outfit', family: 'Outfit, system-ui, sans-serif' },
		{ name: 'DM Sans', family: 'DM Sans, system-ui, sans-serif' },
		{ name: 'Sora', family: 'Sora, system-ui, sans-serif' },
		{ name: 'Plus Jakarta Sans', family: 'Plus Jakarta Sans, system-ui, sans-serif' },
	];
	let selectedFontIndex = $state(0);
	let selectedFont = $derived(fontPresets[selectedFontIndex]);
	let fontSelectValue = $state('0');
	$effect(() => {
		selectedFontIndex = parseInt(fontSelectValue, 10);
	});

	const fontOptions = fontPresets.map((p, i) => ({ label: p.name, value: String(i) }));

	// ─── Configurator Demo ───
	let demoSlider = $state(42);
	let demoToggle = $state(true);
	let demoSelect = $state('svelte');
	const frameworkOptions = [
		{ label: 'Svelte 5', value: 'svelte' },
		{ label: 'React', value: 'react' },
		{ label: 'Vue', value: 'vue' },
		{ label: 'Solid', value: 'solid' },
	];

	// ─── Derived Styles ───
	let liveStyle = $derived(
		glassEnabled
			? `--glass-blur: ${blur}px; --glass-bg-opacity: ${bgOpacity / 100}; --glass-border-opacity: ${borderOpacity / 100}; --glass-radius: ${radius}px; --glass-edge-opacity: ${edgeOpacity / 100}; --glass-tint-r: ${tintR}; --glass-tint-g: ${tintG}; --glass-tint-b: ${tintB}; --glass-shadow: 0 8px 32px rgba(0,0,0,0.12); --glass-inset-shadow: inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(255,255,255,0.1), inset 0 0 16px 8px rgba(255,255,255,${(bgOpacity / 100) * 0.3});`
			: '',
	);

	let fontStyle = $derived(`font-family: ${selectedFont.family};`);

	// ─── Tenant Config Output ───
	let tenantConfig = $derived(`const myTenant: TenantConfigInput = {
  id: 'custom',
  name: 'My Theme',
  tokens: {
    glass: {
      enabled: ${glassEnabled},
      blur: ${blur},
      bgOpacity: ${(bgOpacity / 100).toFixed(2)},
      borderOpacity: ${(borderOpacity / 100).toFixed(2)},
      tint: [${tintR}, ${tintG}, ${tintB}],
      edgeOpacity: ${(edgeOpacity / 100).toFixed(2)},
      radius: ${radius},
    },
    typography: {
      fontFamily: {
        sans: '${selectedFont.family}',
      },
    },
  },
};`);

	let copied = $state(false);
	function copyConfig() {
		navigator.clipboard.writeText(tenantConfig);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

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
		fontSelectValue = '0';
	}
</script>

<h1 class="text-4xl font-bold mb-2">anyUI</h1>
<p class="text-lg opacity-60 mb-12">Glassmorphism-first component library for Svelte 5</p>

<!-- ─── LIVE GLASS CONFIGURATOR ─── -->
<section class="mb-16">
	<h2 class="text-2xl font-bold mb-6">Live Glass Configurator</h2>

	<div class="config-layout">
		<!-- Controls Panel -->
		<Card variant="glass" padding="md">
			<h3 class="text-lg font-semibold mb-5">Glass Parameters</h3>

			<div class="flex flex-col gap-4">
				<Slider label="Blur" bind:value={blur} min={0} max={50} />
				<Slider label="BG Opacity" bind:value={bgOpacity} min={0} max={100} />
				<Slider label="Border Opacity" bind:value={borderOpacity} min={0} max={100} />
				<Slider label="Radius" bind:value={radius} min={0} max={40} />
				<Slider label="Edge Glow" bind:value={edgeOpacity} min={0} max={100} />

				<div class="flex flex-col gap-1">
					<span class="text-sm font-medium">Tint RGB</span>
					<div class="flex gap-2">
						<input type="number" min="0" max="255" bind:value={tintR} class="config-number" />
						<input type="number" min="0" max="255" bind:value={tintG} class="config-number" />
						<input type="number" min="0" max="255" bind:value={tintB} class="config-number" />
					</div>
				</div>

				<Toggle bind:checked={glassEnabled} label="Glass Enabled" />

				<Select label="Font" options={fontOptions} bind:value={fontSelectValue} variant="glass" />
			</div>

			<div class="mt-4">
				<Button variant="ghost" size="sm" onclick={resetDefaults}>Reset Defaults</Button>
			</div>
		</Card>

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
				<div class="flex gap-2 flex-wrap">
					<Button variant="glass">Glass Button</Button>
					<Button variant="solid" size="sm">Solid</Button>
					<Badge variant="glass" color="primary">Preview</Badge>
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

			<!-- Tenant Config Output -->
			<Card variant="glass" padding="sm" class="mt-4">
				<div class="flex items-center justify-between mb-2">
					<span class="text-sm font-semibold">Tenant Config</span>
					<Button variant="ghost" size="sm" onclick={copyConfig}>
						{copied ? 'Copied!' : 'Copy'}
					</Button>
				</div>
				<pre class="config-output">{tenantConfig}</pre>
			</Card>
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
				onclick={() => { selectedFontIndex = i; fontSelectValue = String(i); }}
			>
				<span class="text-lg font-semibold">{preset.name}</span>
				<span class="text-sm opacity-60">Aa Bb Cc 0123</span>
				<span class="text-xs opacity-40">The quick brown fox jumps over the lazy dog</span>
			</button>
		{/each}
	</div>
	<p class="text-sm opacity-50 mt-4">
		All fonts are bundled as woff2 — no external requests. Each tenant can specify different fontFamily in their config.
	</p>
</section>

<!-- ─── COMPONENTS ─── -->
<section class="mb-12">
	<h2 class="text-2xl font-bold mb-8">Components</h2>

	<div class="flex flex-col gap-12">
		<!-- Buttons -->
		<Card variant="glass" padding="lg">
			<h3 class="text-lg font-semibold mb-1">Buttons</h3>
			<p class="text-sm opacity-50 mb-5">Solid, outline, ghost, and glass variants with active/hover states.</p>
			<div class="flex gap-3 flex-wrap items-center">
				<Button variant="solid">Solid</Button>
				<Button variant="outline">Outline</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="glass">Glass</Button>
				<Button variant="solid" size="sm">Small</Button>
				<Button variant="solid" size="lg">Large</Button>
				<Button variant="solid" disabled>Disabled</Button>
			</div>
		</Card>

		<!-- Badges -->
		<Card variant="glass" padding="lg">
			<h3 class="text-lg font-semibold mb-1">Badges</h3>
			<p class="text-sm opacity-50 mb-5">Inline labels in solid, outline, subtle, and glass variants.</p>
			<div class="flex gap-3 flex-wrap items-center">
				<Badge variant="solid" color="primary">Primary</Badge>
				<Badge variant="solid" color="accent">Accent</Badge>
				<Badge variant="solid" color="success">Success</Badge>
				<Badge variant="solid" color="warning">Warning</Badge>
				<Badge variant="solid" color="error">Error</Badge>
			</div>
			<div class="flex gap-3 flex-wrap items-center mt-3">
				<Badge variant="outline" color="primary">Outline</Badge>
				<Badge variant="subtle" color="accent">Subtle</Badge>
				<Badge variant="glass" color="primary">Glass</Badge>
				<Badge variant="glass" color="success" size="md">Medium</Badge>
			</div>
		</Card>

		<!-- Toggle & Slider -->
		<Card variant="glass" padding="lg">
			<h3 class="text-lg font-semibold mb-1">Toggle & Slider</h3>
			<p class="text-sm opacity-50 mb-5">Interactive controls with glass styling.</p>
			<div class="flex flex-col gap-5 max-w-md">
				<Toggle bind:checked={demoToggle} label="Enable feature" />
				<Toggle checked={false} label="Disabled toggle" disabled />
				<Toggle bind:checked={demoToggle} label="Small toggle" size="sm" />
				<Slider label="Volume" bind:value={demoSlider} min={0} max={100} />
				<Slider label="Opacity" value={65} min={0} max={100} variant="default" />
			</div>
		</Card>

		<!-- Select -->
		<Card variant="glass" padding="lg">
			<h3 class="text-lg font-semibold mb-1">Select</h3>
			<p class="text-sm opacity-50 mb-5">Styled dropdown with native accessibility.</p>
			<div class="flex flex-col gap-4 max-w-xs">
				<Select label="Framework" options={frameworkOptions} bind:value={demoSelect} variant="glass" />
				{#if demoSelect}
					<p class="text-sm opacity-60">Selected: {demoSelect}</p>
				{/if}
			</div>
		</Card>

		<!-- Cards -->
		<Card variant="glass" padding="lg">
			<h3 class="text-lg font-semibold mb-1">Cards</h3>
			<p class="text-sm opacity-50 mb-5">Glass, elevated, and outlined variants with header/footer support.</p>
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
					<p class="text-sm opacity-70">Traditional card with shadow and border. Non-glass variant for solid backgrounds.</p>
				</Card>

				<Card variant="outlined" padding="lg">
					<p class="text-sm opacity-70">Outlined card — transparent with a border. Minimal footprint.</p>
				</Card>
			</div>
		</Card>

		<!-- Inputs -->
		<Card variant="glass" padding="lg">
			<h3 class="text-lg font-semibold mb-1">Inputs</h3>
			<p class="text-sm opacity-50 mb-5">Text inputs with glass and default variants.</p>
			<div class="flex flex-col gap-4 max-w-sm">
				<Input label="Your name" bind:value={name} placeholder="Type here..." variant="glass" />
				<Input label="Default input" placeholder="Solid background..." />
				<Input label="With error" variant="glass" error="This field is required" />
				{#if name}
					<p class="text-sm opacity-60">Hello, {name}!</p>
				{/if}
			</div>
		</Card>
	</div>
</section>

<style>
	.config-layout {
		display: grid;
		grid-template-columns: 380px 1fr;
		gap: 2rem;
		align-items: start;
	}

	@media (max-width: 900px) {
		.config-layout {
			grid-template-columns: 1fr;
		}
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

	.config-output {
		font-family: var(--any-font-mono, monospace);
		font-size: 0.75rem;
		line-height: 1.5;
		padding: 0.75rem;
		border-radius: 8px;
		background: rgba(0, 0, 0, 0.15);
		overflow-x: auto;
		white-space: pre;
		margin: 0;
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
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 1rem;
	}
</style>
