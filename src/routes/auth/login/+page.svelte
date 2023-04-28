<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { tAuthSafe } from "$lib/trpc-client/autoRedirect";
	import type { PageData } from "./$types";

	let username = "";
	let password = "";

	let result: { message: string; success: boolean } | undefined = undefined;

	export let data: PageData;

	async function submit() {
		await tAuthSafe($page, async (trpc) => {
			const res = await trpc.auth.login.query({
				password,
				username,
			});

			if (typeof res === "string") {
				await goto(
					"/api/setSessionKey/" +
						res +
						"?callback=" +
						(data.callback === null ? "" : data.callback)
				);
			} else {
				result = res;
			}
		});
	}
</script>

<div class="card p-4 m-auto max-w-md text-token mt-16">
	<form on:submit|preventDefault={submit}>
		<label class="label">
			<span>Username</span>
			<input
				class="input"
				type="text"
				placeholder="Username..."
				bind:value={username}
			/>
		</label>

		<label class="label">
			<span>Password</span>
			<input
				type="password"
				class="input"
				placeholder="Password..."
				bind:value={password}
			/>
		</label>

		{#if result}
			<p class={result.success ? "bg-green-600" : "bg-red-600"}>
				{result.message}
			</p>
		{/if}

		<button type="submit" class="btn variant-filled-primary mt-4"
			>Login</button
		>

		<a href="/auth/register" class="btn variant-soft-primary">Register</a>
	</form>
</div>
