<script lang="ts">
	import { goto, invalidate } from "$app/navigation";
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	onMount(async () => {
		await invalidate("app:userType");

		const callback = $page.url.searchParams.get("callback");
		await goto($page.url.origin + (callback !== null ? callback : ""));
	});
</script>
