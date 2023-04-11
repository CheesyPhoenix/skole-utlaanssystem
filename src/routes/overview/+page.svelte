<script lang="ts">
	import { page } from "$app/stores";
	import { trpc } from "$lib/trpc/client";
	import { onMount } from "svelte";

	onMount(async () => {
		const devices = await trpc($page).devices.list.query();
	});
</script>

<main class="m-2">
	<h1 class="text-xl font-bold mb-2">Overview</h1>
</main>
