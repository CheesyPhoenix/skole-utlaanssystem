<script lang="ts">
	import type { PageData } from "./$types";

	import LinkButton from "$lib/components/LinkButton.svelte";

	export let data: PageData;
</script>

<main class="m-2">
	<h1 class="text-xl font-bold mb-2">Teachers</h1>
	{#each data.teachers as teacher}
		<LinkButton href="/{teacher.id}" relative
			>Name:{teacher.name}</LinkButton
		>
	{/each}
</main>
