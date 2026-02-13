<script lang="ts">
	import { Button, Card, Input } from '$lib/index.js';

	let name = $state('');
</script>

<h1 class="text-3xl font-bold mb-8">anyUI Component Showcase</h1>

<section class="flex flex-col gap-8 max-w-2xl">
	<div>
		<h2 class="text-xl font-semibold mb-4">Buttons</h2>
		<div class="flex gap-4 flex-wrap">
			<Button variant="solid">Solid</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="glass">Glass</Button>
			<Button variant="solid" size="sm">Small</Button>
			<Button variant="solid" size="lg">Large</Button>
			<Button variant="solid" disabled>Disabled</Button>
		</div>
	</div>

	<div>
		<h2 class="text-xl font-semibold mb-4">Cards</h2>
		<div class="flex flex-col gap-4">
			<Card variant="glass">
				{#snippet header()}
					<h3 class="text-lg font-semibold">Glass Card</h3>
				{/snippet}
				<p>This card uses glassmorphism styling. Switch to "Dark SaaS" tenant to see it adapt.</p>
			</Card>

			<Card variant="elevated">
				{#snippet header()}
					<h3 class="text-lg font-semibold">Elevated Card</h3>
				{/snippet}
				<p>A traditional elevated card with shadow and border.</p>
			</Card>

			<Card variant="outlined" padding="lg">
				<p>Outlined card with large padding.</p>
			</Card>
		</div>
	</div>

	<div>
		<h2 class="text-xl font-semibold mb-4">Inputs</h2>
		<div class="flex flex-col gap-4 max-w-sm">
			<Input label="Your name" bind:value={name} placeholder="Type here..." />
			<Input label="Glass input" variant="glass" placeholder="Frosted..." />
			<Input label="With error" error="This field is required" />
			{#if name}
				<p class="text-sm" style="color: var(--any-color-muted)">Hello, {name}!</p>
			{/if}
		</div>
	</div>
</section>
