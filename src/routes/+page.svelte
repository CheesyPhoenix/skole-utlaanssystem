<script lang="ts">
	import { page } from "$app/stores";
	import LinkButton from "$lib/components/LinkButton.svelte";
	export let data;
</script>

<main class="m-2">
	<h1 class="text-xl font-bold mb-2">Utlånssystem</h1>
	<LinkButton href="{$page.url.origin}/overview"
		>Equipment Overview</LinkButton
	>
	{#if data.session === undefined}
		<LinkButton href="{$page.url.origin}/auth/login">Login</LinkButton>
		<LinkButton href="{$page.url.origin}/auth/register">Register</LinkButton
		>
	{:else}
		<LinkButton href="{$page.url.origin}/account">Manage Account</LinkButton
		>
	{/if}
</main>
