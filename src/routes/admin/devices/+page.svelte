<script lang="ts">
	import type { PageData } from "./$types";

	import { page } from "$app/stores";
	import LinkButton from "$lib/components/LinkButton.svelte";

	export let data: PageData;
</script>

<LinkButton href="/../" relative>Go back</LinkButton>

<h2 class="mb-4 mt-4">Device Management</h2>

{#each data.devices as device}
	<a
		href={$page.url.pathname + "/" + device.id}
		class="card card-hover p-4 mb-2 block">{device.name}</a
	>
{/each}

<LinkButton href="/add" relative>+ Add device type</LinkButton>
