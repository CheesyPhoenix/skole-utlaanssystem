<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main class="m-4 pt-2 max-w-2xl">
	<p>{data.teacher.name}</p>
</main>
