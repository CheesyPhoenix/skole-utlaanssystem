<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { tAuthSafe } from "$lib/trpc-client/autoRedirect";
	import { Tab, TabGroup } from "@skeletonlabs/skeleton";
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

<div class="card p-4 m-auto max-w-md mt-16">
	<form on:submit|preventDefault={submit}>
		<TabGroup class="[&>div>label]:w-1/2 mb-2">
			<Tab bind:group={userType} name="STUDENT" value="STUDENT">
				Student
			</Tab>
			<Tab bind:group={userType} name="TEACHER" value="TEACHER">
				Teacher
			</Tab>
		</TabGroup>

		<label class="label">
			Username
			<input
				type="text"
				class="input"
				placeholder="Username..."
				required
				bind:value={username}
			/>
		</label>

		<label class="label">
			Password
			<input
				type="password"
				class="input"
				placeholder="Password..."
				required
				bind:value={password}
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
			>Register</button
		>

		<a href="/auth/login" class="btn variant-soft-primary">Login</a>
	</form>
</div>
