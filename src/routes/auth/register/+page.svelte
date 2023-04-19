<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { tAuthSafe } from "$lib/trpc-client/autoRedirect";
	import type { PageData } from "./$types";

	let userType: "STUDENT" | "TEACHER" = "STUDENT";
	let username: string;
	let password: string;

	let result: { message: string; success: boolean } | undefined = undefined;

	export let data: PageData;

	async function submit() {
		await tAuthSafe($page, async (trpc) => {
			const res = await trpc.auth.register.mutate({
				password,
				username,
				userType,
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

<form on:submit|preventDefault={submit}>
	<input type="radio" bind:group={userType} value="STUDENT" name="student" />
	<label for="student">Student</label>

	<br />

	<input type="radio" bind:group={userType} value="TEACHER" name="teacher" />
	<label for="teacher">Teacher</label>

	<br />

	<label for="username">Username</label>
	<input type="text" name="username" bind:value={username} />

	<br />

	<label for="password">Password</label>
	<input type="password" name="password" bind:value={password} />

	{#if result}
		<p class={result.success ? "bg-green-600" : "bg-red-600"}>
			{result.message}
		</p>
	{/if}

	<button type="submit" class="block bg-slate-600 p-2 rounded-lg mt-2"
		>Register</button
	>
</form>

<a href="{$page.url.origin}/auth/login">Already have an account? Log in here</a>

<style lang="postcss">
	input {
		@apply text-slate-900;
	}
</style>
