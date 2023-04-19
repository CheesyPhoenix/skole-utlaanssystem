<script lang="ts">
	import type { PageData } from "./$types";

	import { page } from "$app/stores";

	export let data: PageData;
</script>

<main class="m-2">
	<h1 class="text-xl font-bold mb-2">Equipment</h1>
	{#each data.devices as device}
		<a href="{$page.url.href}/{device.id}">{device.id}: {device.name}</a>
	{/each}
</main>
