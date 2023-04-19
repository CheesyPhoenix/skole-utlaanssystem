<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;

	async function deleteAccount() {
		// TODO
	}
</script>

<main class="m-2">
	<h1 class="text-xl font-bold mb-2">Account</h1>
	<h2 class="text-lg mb-2">Hello {data.user.name}!</h2>

	<form on:submit|preventDefault={deleteAccount}>
		<button type="submit">Delete my account</button>
	</form>
</main>
