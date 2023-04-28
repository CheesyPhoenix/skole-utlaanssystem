<script lang="ts">
	import type { PageData } from "./$types";

	import LinkButton from "$lib/components/LinkButton.svelte";

	export let data: PageData;
</script>

<main class="m-2">
	<h1 class="text-xl font-bold mb-2">Equipment</h1>

	{#each data.devices as device}
		<LinkButton href="/{device.id}" relative
			>{device.id}: {device.name}</LinkButton
		>
	{/each}
</main>
