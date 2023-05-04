<script lang="ts">
	let deviceName: string;

	async function submit() {
		// TODO
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

		<button type="submit" class="btn variant-filled-primary mt-4"
			>Add</button
		>
	</form>
</div>
