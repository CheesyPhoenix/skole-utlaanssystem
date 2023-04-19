<script lang="ts">
	import { page } from "$app/stores";
	import { tAuthSafe } from "$lib/trpc/autoRedirect";
	import type { PageData } from "./$types";

	export let data: PageData;

	let newPassword: string;

	let result: { message: string; success: boolean } | undefined = undefined;

	async function update() {
		await tAuthSafe($page, async (trpc) => {
			const res = await trpc.users.changePass.mutate({
				newPassword,
			});
			result = res;
		});
	}

	async function deleteAccount() {
		// TODO
	}
</script>

<main class="m-2">
	<h1 class="text-xl font-bold mb-2">Account</h1>
	<h2 class="text-lg mb-2">Hello {data.user.name}!</h2>

	<h2 class="text-lg mb-2">Change password</h2>
	<form on:submit|preventDefault={update}>
		<label for="newPassword">New password</label>
		<input type="password" name="newPassword" bind:value={newPassword} />
		<br />
		<button type="submit">Submit</button>
	</form>

	{#if result}
		<p class={result.success ? "bg-green-600" : "bg-red-600"}>
			{result.message}
		</p>
	{/if}

	<h2 class="text-lg mb2">
		WARNING! This button will delete your account! Deleteing your account is
		a permanent action, and all your orders will be cancelled. You can
		always re-register at a later date.
	</h2>
	<form on:submit|preventDefault={deleteAccount}>
		<button type="submit" class="block bg-red-700 p-2 rounded-lg mt-2"
			>Delete my account</button
		>
	</form>
</main>

<style lang="postcss">
	input {
		@apply text-slate-900;
	}
</style>
