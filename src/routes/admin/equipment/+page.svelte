<script lang="ts">
	import type { PageData } from "./$types";

	import { page } from "$app/stores";

	export let data: PageData;
</script>

<main class="m-2">
	<h2 class="mb-4">Equipment</h2>

	{#each data.devices as device}
		<a
			href={$page.url.pathname + "/" + device.id}
			class="card card-hover p-4 mb-2 block"
			>{device.name} <span>#{device.id}</span></a
		>
	{/each}
</main>
