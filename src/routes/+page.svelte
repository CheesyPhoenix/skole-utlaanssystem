<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main class="m-2">
	<h1 class="text-xl font-bold mb-2">Utlånssystem</h1>

	<h2>Docs:</h2>

	<ul>
		{#each data.docs as doc}
			<li>
				- <a href={doc.url} target="_blank">{doc.name}</a>
			</li>
		{/each}
	</ul>
</main>

<style lang="postcss">
	a {
		@apply underline;
	}

	li {
		@apply ml-2;
	}
</style>
