<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main class="m-2">
	<h1 class="text-xl font-bold mb-2">Overview</h1>
	{#each data.devices as device}
		<a href="device">{device.name}</a>
	{/each}
</main>
