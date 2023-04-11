<script lang="ts">
	import { page } from "$app/stores";
	import { tAuthSafe } from "$lib/trpc/autoRedirect";
	import { onMount } from "svelte";

	onMount(async () => {
		const devices = await tAuthSafe($page, async (trpc) => {
			return trpc.devices.list.query();
		});
	});
</script>

<main class="m-2">
	<h1 class="text-xl font-bold mb-2">Overview</h1>
</main>
