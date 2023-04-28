<script lang="ts">
	import { page } from "$app/stores";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main class="m-2 max-w-2xl">
	<h1 class="text-xl font-bold mb-2">Overview</h1>
	{#each data.deviceTypes as deviceType}
		<a
			href="{$page.url.href}/{deviceType.id}"
			class="card p-4 block mb-2 card-hover"
			>{deviceType.name}
			<span class="float-right opacity-70"
				>{deviceType.Devices.length}</span
			></a
		>
	{/each}
</main>
