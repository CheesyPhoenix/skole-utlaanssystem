<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main class="m-2">
	<h1 class="text-xl font-bold mb-2">Account</h1>
	<p>{data.user}</p>
</main>
