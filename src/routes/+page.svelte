<script lang="ts">
	import LinkButton from "$lib/components/LinkButton.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main class="m-2">
	<h1 class="text-xl font-bold mb-2">Utlånssystem</h1>
	{#if data.userType === "UNAUTHENTICATED"}
		<LinkButton href="/auth/login">Login</LinkButton>
		<LinkButton href="/auth/register">Register</LinkButton>
	{:else}
		<LinkButton href="/orders"
			>{data.userType === "NORMAL" ? "My Orders" : "Orders"}</LinkButton
		>
		<LinkButton href="/overview">Equipment Overview</LinkButton>
		<LinkButton href="/account">Manage Account</LinkButton>
	{/if}
</main>
