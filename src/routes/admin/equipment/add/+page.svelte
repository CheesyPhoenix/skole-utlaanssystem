<script lang="ts">
	import { page } from "$app/stores";
	import { tAuthSafe } from "$lib/trpc-client/autoRedirect";

	let deviceName: string;

	let result: { message: string; success: boolean } | undefined = undefined;

	async function submit() {
		await tAuthSafe($page, async (trpc) => {
			result = await trpc.devices.add.mutate({
				deviceName: deviceName,
			});
		});
	}
</script>

<div class="card p-4 m-auto max-w-md mt-16">
	<form on:submit|preventDefault={submit}>
		<label class="label">
			<span>Device type</span>
			<input
				class="input"
				type="text"
				placeholder="Some device with some version..."
				required
				bind:value={deviceName}
			/>
		</label>

		{#if result}
			<aside
				class="{result.success
					? 'variant-filled-success'
					: 'variant-filled-error'}
                    alert mt-2
                "
			>
				<div class="alert-message">
					{result.message}
				</div>
			</aside>
		{/if}

		<button type="submit" class="btn variant-filled-primary mt-4"
			>Add</button
		>
	</form>
</div>
