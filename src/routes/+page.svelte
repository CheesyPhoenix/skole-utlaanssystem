<script lang="ts">
	import { page } from "$app/stores";
	export let data;
</script>

<main class="m-2">
	<h1 class="text-xl font-bold mb-2">Utlånssystem</h1>
	<a href="{$page.url.origin}/overview">Equipment Overview</a>
	{#if data.session === undefined}
		<a href="{$page.url.origin}/auth/login">Login</a>
		<a href="{$page.url.origin}/auth/register">Register</a>
	{/if}
</main>
