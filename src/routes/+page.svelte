<script lang="ts">
	import LinkButton from "$lib/components/LinkButton.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<div class="m-auto flex flex-col items-center mt-12">
	<img src="/favicon.svg" alt="logo" class="h-28" />
	<h1 class="font-semibold">Utlånssystem</h1>
	<p>Keep track of your inventory</p>

	<div class="mt-2">
		{#if data.user.type === "UNAUTHENTICATED"}
			<LinkButton href="/auth/login">Login</LinkButton>
			<LinkButton href="/auth/register">Register</LinkButton>
		{:else}
			<LinkButton href="/orders"
				>{data.user.type === "NORMAL"
					? "My Orders"
					: "Orders"}</LinkButton
			>
			<LinkButton href="/overview">Equipment Overview</LinkButton>
			<LinkButton href="/account">Manage Account</LinkButton>
		{/if}
	</div>
</div>
