<script lang="ts">
	import { page } from "$app/stores";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main class="m-2 max-w-2xl">
	<a href="/">Oh sh*t, go back</a>

	<h1 class="text-xl font-bold mb-2">Overview</h1>
	{#each data.devices as device}
		<a
			href="{$page.url.href}/{device.id}"
			class="block p-2 bg-slate-700 mb-2 rounded-lg hover:bg-slate-600 active:bg-slate-800 duration-200"
			>{device.name} - {device.id}</a
		>
	{/each}
</main>
