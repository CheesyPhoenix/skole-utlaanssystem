<script lang="ts">
	import { page } from "$app/stores";
	import { trpc } from "$lib/trpc/client";
	import { onMount } from "svelte";

	onMount(async () => {
		const devices = await trpc($page).devices.list.query();
	});
</script>
