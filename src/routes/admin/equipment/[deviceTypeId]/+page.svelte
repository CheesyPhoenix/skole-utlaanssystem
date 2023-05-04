<script lang="ts">
	import { page } from "$app/stores";
	import LinkButton from "$lib/components/LinkButton.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<LinkButton href="/../" relative>Go back</LinkButton>

<h2 class="mb-4 mt-4">{data.device.name}</h2>

{#each data.device.Devices as device}
	<a
		href={$page.url.pathname + "/" + device.id}
		class="card card-hover p-4 mb-2 block"
		>{data.device.name} <span>#{device.id}</span></a
	>
{/each}
