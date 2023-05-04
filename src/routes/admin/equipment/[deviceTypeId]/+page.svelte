<script lang="ts">
	import { page } from "$app/stores";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<h2 class="mb-4">{data.device.name}</h2>

{#each data.device.Devices as device}
	<a
		href={$page.url.pathname + "/" + device.id}
		class="card card-hover p-4 mb-2 block"
		>{data.device.name} <span>#{device.id}</span></a
	>
{/each}
