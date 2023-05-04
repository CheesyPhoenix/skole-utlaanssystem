<script lang="ts">
	import LinkButton from "$lib/components/LinkButton.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<LinkButton href="/../" relative>Go back</LinkButton>

<div class="card p-4 mt-6">
	<h3 class="mb-2">
		{data.device.name}<span class="opacity-70 float-right"
			>#{data.device.id}</span
		>
	</h3>
</div>
