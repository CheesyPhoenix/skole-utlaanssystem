<script lang="ts">
	import { goto, invalidate, invalidateAll } from "$app/navigation";
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	onMount(async () => {
		await invalidate("app:user");

		const callback = $page.url.searchParams.get("callback");
		await goto(callback !== null ? callback : "/");
	});
</script>
