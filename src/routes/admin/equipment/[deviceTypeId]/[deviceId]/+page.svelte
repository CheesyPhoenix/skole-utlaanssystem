<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<div class="card p-4 mt-2">
	<h3 class="mb-2">
		{data.device.name}<span class="opacity-70 float-right"
			>#{data.device.id}</span
		>
	</h3>
</div>
