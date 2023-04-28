<script lang="ts">
	import { page } from "$app/stores";
	import { tAuthSafe } from "$lib/trpc-client/autoRedirect";
	import type { trpc } from "$lib/trpc-client/client";
	import { modalStore } from "@skeletonlabs/skeleton";
	import { slide } from "svelte/transition";

	let result:
		| Awaited<
				ReturnType<
					ReturnType<typeof trpc>["users"]["changePass"]["mutate"]
				>
		  >
		| undefined = undefined;
	let newPassword: string;
	let repeatPassword: string;

	async function update() {
		await tAuthSafe($page, async (trpc) => {
			const res = await trpc.users.changePass.mutate({
				newPassword,
			});
			result = res;

			if (res.success) {
				modalStore.close();
			}
		});
	}
</script>

<form on:submit|preventDefault={update} class="card p-4">
	<h3 class="mb-2">Change Password</h3>

	<label class="label">
		New password
		<input
			type="password"
			class="input"
			placeholder="New password..."
			required
			bind:value={newPassword}
		/>
	</label>

	<label class="label mt-2">
		Repeat password
		<input
			type="password"
			class="input"
			placeholder="Repeat password..."
			required
			bind:value={repeatPassword}
		/>
	</label>

	{#if result || newPassword !== repeatPassword}
		<aside
			class="{newPassword === repeatPassword && result && result.success
				? 'variant-filled-success'
				: 'variant-filled-error'}
						alert mt-2
					"
			in:slide
			out:slide
		>
			<div class="alert-message">
				{result ? result.message : "Passwords do not match"}
			</div>
		</aside>
	{/if}

	<button
		type="submit"
		class="btn variant-filled-primary mt-4"
		disabled={newPassword !== repeatPassword}
	>
		Submit
	</button>

	<button
		type="button"
		class="btn variant-ghost-surface"
		on:click={modalStore.close}>Cancel</button
	>
</form>
