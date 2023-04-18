<script lang="ts">
	import type { PageData } from "./$types";

	import { page } from "$app/stores";

	export let data: PageData;
</script>

<main class="m-2">
	<h1 class="text-xl font-bold mb-2">Teachers</h1>
	{#each data.teachers as teacher}
		<a href="{$page.url.href}/{teacher.id}">{teacher.id}: {teacher.name}</a>
	{/each}
</main>
